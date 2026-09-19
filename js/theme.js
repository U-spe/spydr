// /js/theme.js

export default class ThemeManager {
    constructor(kernel) {
        this.kernel = kernel;

        this.themeConfigPath = "/assets/json/syfbau-neegy.json";
        this.themeFXConfigPath = "/assets/json/json.json";

        this.themes = {};
        this.themeFX = {};

        this.activeTheme = null;
        this.currentTheme = null;
        this.cleanupFX = null;
        this.customGradientFX = null;
        this.customGradientAnimation = null;
        this.themeGradient = null;
        this.themeGradientAnimation = null;

        this.starAnimationFrame = null;
        this.starResizeHandler = null;
        this.fxRequestId = 0;
        this.ready = false;
    }

    async init() {
        await this.loadThemeData();

        const settings = this.kernel.get("settings");
        let savedTheme = settings?.get("theme") || "spydr";

        if (savedTheme !== "custom" && !this.themes[savedTheme]) {
            savedTheme = "spydr";
            settings?.set("theme", savedTheme, { notify: false });
        }

        await this.applyTheme(savedTheme);
        this.ready = true;

        console.log(
            `spydr theme // ${this.activeTheme?.name || savedTheme} loaded`
        );
    }

    async loadThemeData() {
        const [themeResponse, fxResponse] = await Promise.all([
            fetch(this.themeConfigPath),
            fetch(this.themeFXConfigPath)
        ]);

        if (!themeResponse.ok) {
            throw new Error(
                `Failed to load theme configuration: ${themeResponse.status}`
            );
        }

        const themeData = await themeResponse.json();
        this.themes = themeData?.themes || {};

        if (Object.keys(this.themes).length === 0) {
            throw new Error("No themes were found in syfbau-neegy.json");
        }

        if (fxResponse.ok) {
            try {
                const fxData = await fxResponse.json();
                this.themeFX = fxData?.themeFX || {};
            } catch (error) {
                this.themeFX = {};
                console.warn("spydr theme // invalid FX configuration:", error);
            }
        } else {
            this.themeFX = {};
            console.warn(
                `spydr theme // FX configuration unavailable: ${fxResponse.status}`
            );
        }
    }

    async applyTheme(themeName) {
        if (themeName === "custom") {
            await this.applyCustomTheme();
            return true;
        }

        let selectedTheme = this.themes[themeName];

        if (!selectedTheme) {
            console.warn(
                `spydr theme // unknown theme "${themeName}", using spydr`
            );

            themeName = "spydr";
            selectedTheme = this.themes.spydr;
        }

        if (!selectedTheme) {
            throw new Error("The built-in Spydr theme is unavailable.");
        }

        this.activeTheme = selectedTheme;
        this.currentTheme = themeName;
        this.applyThemeColors(themeName, selectedTheme);

        const settings = this.kernel.get("settings");
        await this.applyBgStyle(settings?.get("bgStyle") || "stars");

        return true;
    }

    async applyCustomTheme() {
        const settings = this.kernel.get("settings");
        const savedCustom = settings?.get("customTheme") || {};

        const color1 = savedCustom.color1 || "#7c3aed";
        const color2 = savedCustom.color2 || "#3f5efb";
        const color3 = savedCustom.color3 || "#ff4fd8";
        const useColor3 = Boolean(savedCustom.useColor3);

        const customTheme = {
            name: "Custom",
            primary: color1,
            secondary: color2,
            background: "#080808",
            surface: "#111111",
            text: "#ffffff",
            muted: "#bdbdbd",
            border: color1,
            glow: this.colorWithAlpha(color1, 0.4)
        };

        this.activeTheme = customTheme;
        this.currentTheme = "custom";
        this.applyThemeColors("custom", customTheme);

        const root = document.documentElement;
        root.style.setProperty("--custom-color-1", color1);
        root.style.setProperty("--custom-color-2", color2);
        root.style.setProperty(
            "--custom-color-3",
            useColor3 ? color3 : color1
        );

        root.style.setProperty(
            "--theme-gradient-third",
            useColor3 ? color3 : color1
        );

        await this.applyBgStyle(settings?.get("bgStyle") || "stars");
        return true;
    }

    colorWithAlpha(color, alpha) {
        const hex = String(color).trim();
        const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);

        if (!match) {
            return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
        }

        const red = parseInt(match[1], 16);
        const green = parseInt(match[2], 16);
        const blue = parseInt(match[3], 16);

        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    applyThemeColors(themeName, theme) {
        const root = document.documentElement;
        const variables = {
            "--theme-primary": theme.primary,
            "--theme-secondary": theme.secondary,
            "--theme-background": theme.background,
            "--theme-surface": theme.surface,
            "--theme-text": theme.text,
            "--theme-muted": theme.muted,
            "--theme-border": theme.border,
            "--theme-glow": theme.glow,

            "--primary-color": theme.primary,
            "--secondary-color": theme.secondary,
            "--background-color": theme.background,
            "--surface-color": theme.surface,
            "--text-color": theme.text,
            "--muted-color": theme.muted,
            "--border-color": theme.border,
            "--accent-color": theme.primary,
            "--accent-glow": theme.glow,

            "--accent-blue": theme.primary,
            "--accent-purple": theme.secondary,
            "--bg-primary": theme.background,
            "--bg-secondary": theme.surface,
            "--card-bg": theme.surface,
            "--text-primary": theme.text,
            "--text-secondary": theme.muted,
            "--text-white": theme.text,
            "--text-gray": theme.muted,
            "--theme-gradient-third": theme.primary
        };

        for (const [name, value] of Object.entries(variables)) {
            root.style.setProperty(name, value);
        }

        root.dataset.theme = themeName;
        root.dataset.spydrTheme = themeName;

        if (document.body) {
            document.body.dataset.theme = themeName;
            document.body.dataset.spydrTheme = themeName;
            document.body.style.backgroundColor = theme.background;
        }
    }

    async applyBgStyle(requestedStyle) {
        const allowedStyles = new Set([
            "none",
            "stars",
            "fog",
            "gradient",
            "theme"
        ]);

        const style = allowedStyles.has(requestedStyle)
            ? requestedStyle
            : "stars";

        const requestId = ++this.fxRequestId;
        document.body.dataset.bgStyle = style;

        await this.cleanupBackgroundFX();

        if (requestId !== this.fxRequestId) {
            return;
        }

        if (style === "none" || style === "fog") {
            return;
        }

        if (style === "gradient") {
            this.enableThemeGradient();
            return;
        }

        if (style === "stars") {
            const starsEnabled =
                this.kernel.get("settings")?.get("starsEnabled") !== false;

            if (starsEnabled) {
                this.enableStars();
            }

            return;
        }

        this.enableThemeGradient();

        if (this.currentTheme === "spydr") {
            this.enableStars();
            return;
        }

        if (this.currentTheme === "custom") {
            return;
        }

        await this.applyThemeFX(this.currentTheme, requestId);
    }

    async cleanupBackgroundFX() {
        this.stopStars();
        this.disableCustomGradientFX();
        this.disableThemeGradient();

        const cleanup = this.cleanupFX;
        this.cleanupFX = null;

        if (typeof cleanup === "function") {
            try {
                await cleanup();
            } catch (error) {
                console.warn("spydr theme // FX cleanup failed:", error);
            }
        }

        document
            .querySelectorAll(".spydr-theme-fx")
            .forEach(element => element.remove());
    }

    enableStars() {
        const canvas = document.getElementById("stars-canvas");

        if (!canvas) {
            console.warn("spydr theme // stars canvas missing");
            return;
        }

        this.stopStars();
        canvas.style.display = "block";

        const context = canvas.getContext("2d");

        if (!context) {
            canvas.style.display = "none";
            return;
        }

        let width = 0;
        let height = 0;
        const stars = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        resize();

        for (let index = 0; index < 160; index += 1) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.7 + 0.3,
                speed: Math.random() * 0.25 + 0.05,
                alpha: Math.random() * 0.7 + 0.2
            });
        }

        const draw = () => {
            context.clearRect(0, 0, width, height);

            for (const star of stars) {
                star.y += star.speed;

                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }

                context.globalAlpha = star.alpha;
                context.fillStyle = "#ffffff";
                context.beginPath();
                context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                context.fill();
            }

            context.globalAlpha = 1;
            this.starAnimationFrame = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        this.starResizeHandler = resize;
        draw();
    }

    stopStars() {
        if (this.starAnimationFrame !== null) {
            cancelAnimationFrame(this.starAnimationFrame);
            this.starAnimationFrame = null;
        }

        if (this.starResizeHandler) {
            window.removeEventListener("resize", this.starResizeHandler);
            this.starResizeHandler = null;
        }

        const canvas = document.getElementById("stars-canvas");

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d");
        context?.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
    }

    toggleStars(enabled) {
        if (!enabled) {
            this.stopStars();
            return;
        }

        const style = this.kernel.get("settings")?.get("bgStyle");

        if (
            style === "stars" ||
            (style === "theme" && this.currentTheme === "spydr")
        ) {
            this.enableStars();
        }
    }

    enableCustomGradientFX() {
        this.enableThemeGradient();
    }

    disableCustomGradientFX() {
        this.customGradientAnimation?.cancel();
        this.customGradientAnimation = null;

        this.customGradientFX?.remove();
        this.customGradientFX = null;

        document.getElementById("custom-gradient-theme-fx")?.remove();
    }

    enableThemeGradient() {
        this.disableThemeGradient();

        const element = document.createElement("div");
        element.id = "theme-gradient-background";

        Object.assign(element.style, {
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            opacity: "0.82",
            background: [
                "radial-gradient(circle at 18% 20%,",
                "color-mix(in srgb, var(--theme-primary) 42%, transparent),",
                "transparent 42%),",
                "radial-gradient(circle at 82% 28%,",
                "color-mix(in srgb, var(--theme-secondary) 48%, transparent),",
                "transparent 46%),",
                "linear-gradient(135deg,",
                "var(--theme-background),",
                "var(--theme-primary),",
                "var(--theme-secondary),",
                "var(--theme-gradient-third),",
                "var(--theme-background))"
            ].join(" "),
            backgroundSize: "180% 180%, 180% 180%, 320% 320%"
        });

        const host =
            document.getElementById("bg-effects-container") || document.body;

        host.prepend(element);
        this.themeGradient = element;

        if (typeof element.animate === "function") {
            this.themeGradientAnimation = element.animate(
                [
                    { backgroundPosition: "0% 30%, 100% 20%, 0% 50%" },
                    { backgroundPosition: "30% 70%, 70% 80%, 100% 50%" },
                    { backgroundPosition: "0% 30%, 100% 20%, 0% 50%" }
                ],
                {
                    duration: 14000,
                    easing: "ease-in-out",
                    iterations: Infinity
                }
            );
        }
    }

    disableThemeGradient() {
        this.themeGradientAnimation?.cancel();
        this.themeGradientAnimation = null;

        this.themeGradient?.remove();
        this.themeGradient = null;

        document.getElementById("theme-gradient-background")?.remove();
    }

    async applyThemeFX(themeName, requestId = this.fxRequestId) {
        const fxConfig = this.themeFX[themeName];

        if (!fxConfig?.script) {
            return;
        }

        try {
            const module = await import(
                /* @vite-ignore */
                fxConfig.script
            );

            if (requestId !== this.fxRequestId) {
                return;
            }

            if (typeof module?.default !== "function") {
                throw new TypeError(
                    `FX module for "${themeName}" has no default initializer.`
                );
            }

            const assets = (fxConfig.assets || [])
                .map(asset => this.resolveAsset(asset))
                .filter(Boolean);

            const cleanup = await module.default({
                theme: this.themes[themeName],
                assets
            });

            if (requestId !== this.fxRequestId) {
                if (typeof cleanup === "function") {
                    await cleanup();
                }

                return;
            }

            this.cleanupFX =
                typeof cleanup === "function" ? cleanup : null;
        } catch (error) {
            console.error(
                `spydr theme // failed to load FX for "${themeName}":`,
                error
            );
        }
    }

    resolveAsset(asset) {
        if (!asset) {
            return null;
        }

        if (
            asset.startsWith("http://") ||
            asset.startsWith("https://") ||
            asset.startsWith("data:") ||
            asset.startsWith("/")
        ) {
            return asset;
        }

        return `/assets/images/themes/${asset}.png`;
    }

    applyAccent(accent) {
        const accents = {
            blue: "#3f5efb",
            purple: "#7c3aed"
        };

        const color = accents[accent] || accent;

        if (typeof color === "string" && color) {
            document.documentElement.style.setProperty("--accent-color", color);
        }
    }

    async setTheme(themeName) {
        if (themeName !== "custom" && !this.themes[themeName]) {
            console.warn(
                `spydr theme // cannot switch to unknown theme "${themeName}"`
            );
            return false;
        }

        this.kernel
            .get("settings")
            ?.set("theme", themeName, { notify: false });

        await this.applyTheme(themeName);
        return true;
    }

    getTheme(themeName) {
        return this.themes[themeName] || null;
    }

    getCurrentTheme() {
        return this.activeTheme;
    }

    getCurrentThemeName() {
        return this.currentTheme || "spydr";
    }

    getAllThemes() {
        return this.themes;
    }

    getThemeFX(themeName) {
        return this.themeFX[themeName] || null;
    }

    async destroy() {
        this.fxRequestId += 1;
        await this.cleanupBackgroundFX();

        this.activeTheme = null;
        this.currentTheme = null;
        this.ready = false;
    }
}
