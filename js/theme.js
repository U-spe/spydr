// /js/theme.js
//
// spydr Theme Manager
//
// Theme definitions:
//   /assets/json/syfbau-neegy.json
//
// Theme FX definitions:
//   /assets/json/json.json
//
// Theme FX renderer:
//   /js/global.themes.js
//
// Background behavior:
//   none     = normal theme background
//   stars    = star canvas over the normal theme background
//   fog      = fog over the normal theme background
//   gradient = animated gradient made from the ACTIVE THEME colors
//   theme    = animated theme-color gradient + that theme's FX images
//
// Special Theme FX:
//   spydr    = theme-color gradient + stars
//   custom   = custom 2/3-color gradient
//
// IMPORTANT:
// The entire background system lives inside #bg-effects-container.
// No background-layer z-index juggling is required.

export default class ThemeManager {
    constructor(kernel) {
        this.kernel = kernel;

        this.themeConfigPath = "/assets/json/syfbau-neegy.json";
        this.themeFXConfigPath = "/assets/json/json.json";

        this.themes = {};
        this.themeFX = {};

        this.activeTheme = null;
        this.currentTheme = "spydr";
        this.cleanupFX = null;

        // Stars
        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.starAnimationId = null;
        this.starResizeHandler = null;

        this.ready = false;
    }


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    async init() {
        try {
            this.settings = this.kernel.get("settings");

            await this.loadThemeData();

            this.setupCanvas();

            const savedTheme =
                this.settings?.get("theme") || "spydr";

            await this.applyTheme(savedTheme);

            const savedBgStyle =
                this.settings?.get("bgStyle") || "stars";

            await this.applyBgStyle(savedBgStyle);

            this.ready = true;

            console.log(
                `spydr theme // ${this.activeTheme?.name || savedTheme} loaded`
            );

        } catch (error) {
            console.error(
                "spydr theme // failed to initialize:",
                error
            );

            // Safe visual fallback.
            try {
                const fallback =
                    this.themes.spydr ||
                    this.themes.neegy ||
                    Object.values(this.themes)[0];

                if (fallback) {
                    this.applyThemeColors(
                        this.themes.spydr ? "spydr" : "neegy",
                        fallback
                    );
                }
            } catch (fallbackError) {
                console.error(
                    "spydr theme // fallback failed:",
                    fallbackError
                );
            }
        }
    }


    /* =========================================================
       LOAD CONFIG
       ========================================================= */

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

        if (!fxResponse.ok) {
            throw new Error(
                `Failed to load theme FX configuration: ${fxResponse.status}`
            );
        }

        const themeData = await themeResponse.json();
        const fxData = await fxResponse.json();

        this.themes = themeData?.themes || {};
        this.themeFX = fxData?.themeFX || {};

        if (Object.keys(this.themes).length === 0) {
            throw new Error(
                "No themes were found in syfbau-neegy.json"
            );
        }
    }


    /* =========================================================
       APPLY THEME
       ========================================================= */

    async applyTheme(themeName) {
        if (themeName === "custom") {
            await this.applyCustomTheme();
            return;
        }

        let selectedTheme = this.themes[themeName];

        if (!selectedTheme) {
            const fallbackName =
                this.themes.spydr ? "spydr" : "neegy";

            console.warn(
                `spydr theme // unknown theme "${themeName}", using ${fallbackName}`
            );

            themeName = fallbackName;
            selectedTheme = this.themes[themeName];
        }

        if (!selectedTheme) {
            throw new Error(
                "No fallback theme is available."
            );
        }

        this.activeTheme = selectedTheme;
        this.currentTheme = themeName;

        this.applyThemeColors(
            themeName,
            selectedTheme
        );

        if (this.settings) {
            this.settings.set("theme", themeName);
        }

        // If the user changes the theme while a theme-sensitive
        // background mode is already active, rebuild it immediately.
        const activeBg =
            document.body?.dataset?.bgStyle ||
            this.settings?.get("bgStyle") ||
            "stars";

        await this.applyBgStyle(activeBg);
    }


    /* =========================================================
       CUSTOM THEME
       ========================================================= */

    async applyCustomTheme() {
        const settings =
            this.kernel.get("settings");

        if (!settings) {
            return;
        }

        const custom =
            settings.get("customTheme");

        if (!custom) {
            return;
        }

        const colors = [
            custom.color1,
            custom.color2
        ].filter(Boolean);

        if (
            custom.useColor3 &&
            custom.color3
        ) {
            colors.push(custom.color3);
        }

        if (colors.length < 2) {
            console.warn(
                "spydr theme // Custom requires at least two colors."
            );
            return;
        }

        const root =
            document.documentElement;

        const color1 = colors[0];
        const color2 = colors[1];
        const color3 = colors[2] || colors[0];

        // Main UI colors.
        root.style.setProperty(
            "--theme-primary",
            color1
        );

        root.style.setProperty(
            "--theme-secondary",
            color2
        );

        root.style.setProperty(
            "--theme-background",
            "#080808"
        );

        root.style.setProperty(
            "--theme-surface",
            "#111111"
        );

        root.style.setProperty(
            "--theme-text",
            "#ffffff"
        );

        root.style.setProperty(
            "--theme-muted",
            "#bdbdbd"
        );

        root.style.setProperty(
            "--theme-border",
            color1
        );

        root.style.setProperty(
            "--theme-glow",
            `${color1}66`
        );

        // Exact custom colors used by the gradient renderer.
        root.style.setProperty(
            "--theme-gradient-1",
            color1
        );

        root.style.setProperty(
            "--theme-gradient-2",
            color2
        );

        root.style.setProperty(
            "--theme-gradient-3",
            color3
        );

        root.style.setProperty(
            "--custom-color-1",
            color1
        );

        root.style.setProperty(
            "--custom-color-2",
            color2
        );

        root.style.setProperty(
            "--custom-color-3",
            color3
        );

        // Legacy aliases.
        root.style.setProperty(
            "--accent-blue",
            color1
        );

        root.style.setProperty(
            "--accent-purple",
            color2
        );

        root.style.setProperty(
            "--bg-primary",
            "#080808"
        );

        root.style.setProperty(
            "--card-bg",
            "#111111"
        );

        root.style.setProperty(
            "--text-primary",
            "#ffffff"
        );

        root.style.setProperty(
            "--text-secondary",
            "#bdbdbd"
        );

        root.style.setProperty(
            "--border-color",
            color1
        );

        root.dataset.theme = "custom";
        root.dataset.spydrTheme = "custom";

        if (document.body) {
            document.body.dataset.theme = "custom";
            document.body.dataset.spydrTheme = "custom";
            document.body.style.backgroundColor = "#080808";
        }

        this.activeTheme = {
            name: "Custom",
            primary: color1,
            secondary: color2,
            background: "#080808",
            surface: "#111111",
            text: "#ffffff",
            muted: "#bdbdbd",
            border: color1,
            glow: `${color1}66`,
            gradient1: color1,
            gradient2: color2,
            gradient3: color3
        };

        this.currentTheme = "custom";

        settings.set("theme", "custom");

        const activeBg =
            document.body?.dataset?.bgStyle ||
            settings.get("bgStyle") ||
            "stars";

        await this.applyBgStyle(activeBg);
    }


    /* =========================================================
       CSS VARIABLE INJECTION
       ========================================================= */

    applyThemeColors(themeName, theme) {
        const root =
            document.documentElement;

        root.style.setProperty(
            "--theme-primary",
            theme.primary
        );

        root.style.setProperty(
            "--theme-secondary",
            theme.secondary
        );

        root.style.setProperty(
            "--theme-background",
            theme.background
        );

        root.style.setProperty(
            "--theme-surface",
            theme.surface
        );

        root.style.setProperty(
            "--theme-text",
            theme.text
        );

        root.style.setProperty(
            "--theme-muted",
            theme.muted
        );

        root.style.setProperty(
            "--theme-border",
            theme.border
        );

        root.style.setProperty(
            "--theme-glow",
            theme.glow
        );

        /*
         * These are the colors the animated background uses.
         *
         * A theme may optionally provide explicit gradient1/2/3
         * values in syfbau-neegy.json. If it does not, the
         * theme's normal colors are used automatically.
         */
        root.style.setProperty(
            "--theme-gradient-1",
            theme.gradient1 ||
            theme.primary ||
            theme.background
        );

        root.style.setProperty(
            "--theme-gradient-2",
            theme.gradient2 ||
            theme.secondary ||
            theme.primary
        );

        root.style.setProperty(
            "--theme-gradient-3",
            theme.gradient3 ||
            theme.background ||
            theme.primary
        );

        // Existing Spydr aliases.
        root.style.setProperty(
            "--accent-blue",
            theme.primary
        );

        root.style.setProperty(
            "--accent-purple",
            theme.secondary
        );

        root.style.setProperty(
            "--bg-primary",
            theme.background
        );

        root.style.setProperty(
            "--card-bg",
            theme.surface
        );

        root.style.setProperty(
            "--text-primary",
            theme.text
        );

        root.style.setProperty(
            "--text-secondary",
            theme.muted
        );

        root.style.setProperty(
            "--border-color",
            theme.border
        );

        root.dataset.theme = themeName;
        root.dataset.spydrTheme = themeName;

        if (document.body) {
            document.body.dataset.theme = themeName;
            document.body.dataset.spydrTheme = themeName;
            document.body.style.backgroundColor =
                theme.background;
        }
    }


    /* =========================================================
       BACKGROUND ROUTER
       ========================================================= */

    async applyBgStyle(style) {
        const validStyles = [
            "none",
            "stars",
            "fog",
            "gradient",
            "theme"
        ];

        if (!validStyles.includes(style)) {
            style = "stars";
        }

        if (this.settings) {
            this.settings.set(
                "bgStyle",
                style
            );
        }

        if (document.body) {
            document.body.dataset.bgStyle =
                style;
        }

        const select =
            document.getElementById(
                "bg-fx-variant"
            );

        if (select) {
            select.value = style;
        }

        // Kill every previous animated effect.
        this.stopStars();
        await this.stopThemeFX();

        // Reset visible FX elements.
        const canvas =
            document.getElementById(
                "stars-canvas"
            );

        const fog =
            document.getElementById(
                "fog-overlay"
            );

        const themeFXContainer =
            document.getElementById(
                "theme-fx-container"
            );

        if (canvas) {
            canvas.hidden = true;
        }

        if (fog) {
            fog.hidden = true;
        }

        if (themeFXContainer) {
            themeFXContainer.replaceChildren();
            themeFXContainer.hidden = true;
        }

        /*
         * NONE
         * Just the active theme's normal background.
         */
        if (style === "none") {
            return;
        }

        /*
         * STARS
         * Normal theme background + stars.
         */
        if (style === "stars") {
            this.enableStars();
            return;
        }

        /*
         * FOG
         * Normal theme background + fog.
         */
        if (style === "fog") {
            if (fog) {
                fog.hidden = false;
            }
            return;
        }

        /*
         * GRADIENT COLORS
         *
         * CSS sees data-bg-style="gradient" and makes
         * #bg-effects-container itself the animated gradient.
         *
         * No extra div and no extra stacking layer.
         */
        if (style === "gradient") {
            return;
        }

        /*
         * THEME FX
         *
         * CSS sees data-bg-style="theme" and makes
         * #bg-effects-container the SAME animated theme gradient.
         *
         * Then we simply place the falling image FX in that
         * background container.
         */

        const themeName =
            this.currentTheme ||
            document.documentElement.dataset.spydrTheme ||
            "spydr";

        // Default Spydr Theme FX is stars.
        // The theme gradient is still behind the stars.
        if (themeName === "spydr") {
            this.enableStars();
            return;
        }

        // Custom theme has no falling image set.
        // Its Theme FX is its animated 2/3-color gradient.
        if (themeName === "custom") {
            return;
        }

        await this.applyThemeFX(
            themeName
        );
    }


    /* =========================================================
       STAR ENGINE
       ========================================================= */

    setupCanvas() {
        this.canvas =
            document.getElementById(
                "stars-canvas"
            );

        if (!this.canvas) {
            return;
        }

        this.ctx =
            this.canvas.getContext("2d");

        if (!this.starResizeHandler) {
            this.starResizeHandler =
                () => this.resizeCanvas();

            window.addEventListener(
                "resize",
                this.starResizeHandler
            );
        }

        this.resizeCanvas();
    }

    resizeCanvas() {
        if (!this.canvas || !this.ctx) {
            return;
        }

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        this.canvas.width =
            Math.floor(width * dpr);

        this.canvas.height =
            Math.floor(height * dpr);

        this.canvas.style.width =
            `${width}px`;

        this.canvas.style.height =
            `${height}px`;

        this.ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        this.createStars();
    }

    createStars() {
        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        const area =
            width * height;

        const count =
            Math.max(
                55,
                Math.min(
                    180,
                    Math.round(area / 9500)
                )
            );

        this.stars =
            Array.from(
                { length: count },
                () => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: 0.35 + Math.random() * 1.25,
                    alpha: 0.2 + Math.random() * 0.8,
                    speed: 0.08 + Math.random() * 0.28,
                    drift:
                        (Math.random() - 0.5) * 0.04,
                    phase:
                        Math.random() * Math.PI * 2
                })
            );
    }

    enableStars() {
        if (!this.canvas || !this.ctx) {
            this.setupCanvas();
        }

        if (!this.canvas || !this.ctx) {
            return;
        }

        this.canvas.hidden = false;

        if (this.stars.length === 0) {
            this.createStars();
        }

        if (this.starAnimationId) {
            cancelAnimationFrame(
                this.starAnimationId
            );
        }

        const animate =
            timestamp => {
                if (!this.ctx || !this.canvas) {
                    return;
                }

                const width =
                    window.innerWidth;

                const height =
                    window.innerHeight;

                this.ctx.clearRect(
                    0,
                    0,
                    width,
                    height
                );

                for (const star of this.stars) {
                    star.y += star.speed;
                    star.x += star.drift;

                    if (star.y > height + 3) {
                        star.y = -3;
                        star.x =
                            Math.random() * width;
                    }

                    if (star.x > width + 3) {
                        star.x = -3;
                    }

                    if (star.x < -3) {
                        star.x = width + 3;
                    }

                    const twinkle =
                        0.65 +
                        Math.sin(
                            timestamp * 0.0018 +
                            star.phase
                        ) * 0.35;

                    this.ctx.beginPath();

                    this.ctx.arc(
                        star.x,
                        star.y,
                        star.r,
                        0,
                        Math.PI * 2
                    );

                    this.ctx.fillStyle =
                        `rgba(255,255,255,${
                            Math.max(
                                0.08,
                                star.alpha * twinkle
                            )
                        })`;

                    this.ctx.fill();
                }

                this.starAnimationId =
                    requestAnimationFrame(
                        animate
                    );
            };

        this.starAnimationId =
            requestAnimationFrame(
                animate
            );
    }

    stopStars() {
        if (this.starAnimationId) {
            cancelAnimationFrame(
                this.starAnimationId
            );

            this.starAnimationId = null;
        }

        if (this.ctx) {
            this.ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );
        }

        if (this.canvas) {
            this.canvas.hidden = true;
        }
    }


    /* =========================================================
       THEME FX
       ========================================================= */

    async applyThemeFX(themeName) {
        await this.stopThemeFX();

        const fxConfig =
            this.themeFX[themeName];

        if (!fxConfig) {
            return;
        }

        const scriptPath =
            fxConfig.script;

        if (!scriptPath) {
            return;
        }

        const container =
            document.getElementById(
                "theme-fx-container"
            );

        if (container) {
            container.hidden = false;
        }

        try {
            const module =
                await import(
                    /* @vite-ignore */
                    scriptPath
                );

            if (
                !module ||
                typeof module.default !== "function"
            ) {
                console.warn(
                    `spydr theme // FX module for "${themeName}" has no default initializer`
                );
                return;
            }

            const assets =
                (fxConfig.assets || [])
                    .map(
                        asset =>
                            this.resolveAsset(asset)
                    )
                    .filter(Boolean);

            this.cleanupFX =
                await module.default({
                    theme:
                        this.themes[themeName] ||
                        this.activeTheme,
                    assets,
                    container
                });

            if (
                typeof this.cleanupFX !==
                "function"
            ) {
                this.cleanupFX = null;
            }

        } catch (error) {
            console.error(
                `spydr theme // failed to load FX for "${themeName}":`,
                error
            );
        }
    }

    async stopThemeFX() {
        if (this.cleanupFX) {
            try {
                await this.cleanupFX();
            } catch (error) {
                console.warn(
                    "spydr theme // previous FX cleanup failed:",
                    error
                );
            }

            this.cleanupFX = null;
        }

        const container =
            document.getElementById(
                "theme-fx-container"
            );

        if (container) {
            container.replaceChildren();
            container.hidden = true;
        }
    }


    /* =========================================================
       ASSET RESOLUTION
       ========================================================= */

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


    /* =========================================================
       CHANGE THEME
       ========================================================= */

    async setTheme(themeName) {
        if (
            !this.themes[themeName] &&
            themeName !== "custom"
        ) {
            console.warn(
                `spydr theme // cannot switch to unknown theme "${themeName}"`
            );

            return false;
        }

        await this.applyTheme(
            themeName
        );

        return true;
    }


    /* =========================================================
       GETTERS
       ========================================================= */

    getTheme(themeName) {
        return (
            this.themes[themeName] ||
            null
        );
    }

    getCurrentTheme() {
        return this.activeTheme;
    }

    getCurrentThemeName() {
        return (
            this.currentTheme ||
            document.documentElement
                .dataset
                .spydrTheme ||
            "spydr"
        );
    }

    getAllThemes() {
        return this.themes;
    }

    getThemeFX(themeName) {
        return (
            this.themeFX[themeName] ||
            null
        );
    }


    /* =========================================================
       CLEANUP
       ========================================================= */

    async destroy() {
        this.stopStars();

        await this.stopThemeFX();

        if (this.starResizeHandler) {
            window.removeEventListener(
                "resize",
                this.starResizeHandler
            );

            this.starResizeHandler = null;
        }

        this.activeTheme = null;
        this.ready = false;
    }
}
