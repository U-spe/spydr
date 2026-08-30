// /js/theme.js
//
// spydr Theme Manager
// Theme definitions:
//   /assets/json/syfbau-neegy.json
//
// Theme FX definitions:
//   /assets/json/json.json
//
// Rendering:
//   /js/global.themes.js

export default class ThemeManager {
    constructor(kernel) {
        this.kernel = kernel;

        this.themeConfigPath = "/assets/json/syfbau-neegy.json";
        this.themeFXConfigPath = "/assets/json/json.json";

        this.themes = {};
        this.themeFX = {};

        this.activeTheme = null;
        this.cleanupFX = null;
        this.customGradientFX = null;

        this.ready = false;
    }

    /*
     * =========================================================
     * INITIALIZATION
     * =========================================================
     */

    async init() {
        try {
            await this.loadThemeData();

            const settings = this.kernel.get("settings");

            const savedTheme =
                settings?.get("theme") || "spydr";

            await this.applyTheme(savedTheme);

            this.ready = true;

            console.log(
                `spydr theme // ${this.activeTheme?.name || savedTheme} loaded`
            );

        } catch (error) {
            console.error(
                "spydr theme // failed to initialize:",
                error
            );

            // Fall back to Neegy if the JSON files fail.
            try {
                if (this.themes.neegy) {
                    this.applyThemeColors(
                        "neegy",
                        this.themes.neegy
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


    /*
     * =========================================================
     * LOAD JSON CONFIGURATION
     * =========================================================
     */

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


    /*
     * =========================================================
     * APPLY THEME
     * =========================================================
     */

    async applyTheme(themeName) {
        if (themeName === "custom") {
            await this.applyCustomTheme();
            return;
        }

        let selectedTheme = this.themes[themeName];

        if (!selectedTheme) {
            console.warn(
                `spydr theme // unknown theme "${themeName}", using neegy`
            );

            themeName = "neegy";
            selectedTheme = this.themes[themeName];
        }

        if (!selectedTheme) {
            throw new Error(
                "Neegy theme is unavailable."
            );
        }

        this.activeTheme = selectedTheme;
        this.currentTheme = themeName;

        /*
         * Apply the actual color variables.
         */
        this.applyThemeColors(
            themeName,
            selectedTheme
        );

        /*
         * Save the selected theme.
         */
        const settings = this.kernel.get("settings");

        if (settings) {
            settings.set("theme", themeName);
        }

        /*
         * Apply Theme FX if configured.
         */
        await this.applyBgStyle(
            settings?.get("bgStyle") || "stars"
        );
    }
    
    /*
     * =========================================================
     * CUSTOM THEME HANDLER
     * =========================================================
     */

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
        ];
    
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
    
    
        root.style.setProperty(
            "--theme-primary",
            colors[0]
        );
    
        root.style.setProperty(
            "--theme-secondary",
            colors[1]
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
            colors[0]
        );
    
        root.style.setProperty(
            "--theme-glow",
            `${colors[0]}66`
        );
    
    
        root.style.setProperty(
            "--custom-color-1",
            colors[0]
        );
    
        root.style.setProperty(
            "--custom-color-2",
            colors[1]
        );
    
        root.style.setProperty(
            "--custom-color-3",
            colors[2] || colors[0]
        );
    
    
        document.documentElement.dataset.theme =
            "custom";
    
        document.body.dataset.theme =
            "custom";
    
    
        this.currentTheme =
            "custom";
    
    
        await this.applyBgStyle(
            this.kernel
                .get("settings")
                ?.get("bgStyle") || "stars"
        );
    }

    /*
     * =========================================================
     * CSS VARIABLE INJECTION
     * =========================================================
     */

    applyThemeColors(themeName, theme) {
        const root = document.documentElement;

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
         * Generic aliases.
         *
         * These allow existing Spydr CSS files to gradually
         * adopt the new theme system without needing every
         * stylesheet rewritten immediately.
         */

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

        /*
         * Theme identification.
         *
         * Useful for CSS selectors like:
         *
         * html[data-spydr-theme="christmas"] {}
         */

        root.dataset.spydrTheme = themeName;

        /*
         * Also expose the theme on body.
         * This makes theme-specific CSS easier later.
         */

        if (document.body) {
            document.body.dataset.spydrTheme = themeName;
        }

        /*
         * Direct background fallback.
         *
         * Existing pages can still override this if needed.
         */

        document.body.style.backgroundColor =
            theme.background;
    }


    /*
     * =========================================================
     * BACKGROUND FX & ROUTING
     * =========================================================
     */
    
    async applyBgStyle(style) {
        if (style === "theme") {

            const theme =
                this.currentTheme ||
                document.documentElement.dataset.theme;
        
        
            // SPYDR THEME FX = STARS
            if (theme === "spydr") {
                this.disableCustomGradientFX();
                if (typeof this.enableStars === "function") this.enableStars();
                return;
            }
        
        
            // CUSTOM THEME FX = MOVING GRADIENT
            if (theme === "custom") {
                this.enableCustomGradientFX();
                return;
            }
        
        
            // Normal image-based Theme FX
            this.disableCustomGradientFX();
            await this.applyThemeFX(theme);
        
            return;
        } else {
            this.disableCustomGradientFX();
            // Handle regular non-theme backgrounds here if needed
        }
    }
    
    enableCustomGradientFX() {
    
        this.disableCustomGradientFX();
    
    
        const fx =
            document.createElement("div");
    
        fx.id =
            "custom-gradient-theme-fx";
    
    
        document
            .getElementById("bg-effects-container")
            ?.appendChild(fx);
    
    
        this.customGradientFX =
            fx;
    }
    
    disableCustomGradientFX() {
    
        if (this.customGradientFX) {
            this.customGradientFX.remove();
            this.customGradientFX = null;
        }
    
        document
            .getElementById(
                "custom-gradient-theme-fx"
            )
            ?.remove();
    }


    /*
     * =========================================================
     * THEME FX
     * =========================================================
     */

    async applyThemeFX(themeName) {
        /*
         * Stop the previous FX engine first.
         */

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
        
        this.disableCustomGradientFX();

        const fxConfig = this.themeFX[themeName];

        if (!fxConfig) {
            return;
        }

        /*
         * The JSON specifies which script handles the FX.
         */

        const scriptPath = fxConfig.script;

        if (!scriptPath) {
            return;
        }

        try {
            const module = await import(
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

            /*
             * Convert the asset identifiers from json.json
             * into usable asset paths.
             *
             * If an asset is already a URL/path, leave it alone.
             */

            const assets = (fxConfig.assets || [])
                .map(asset => this.resolveAsset(asset))
                .filter(Boolean);

            /*
             * Start the FX renderer.
             */

            this.cleanupFX = await module.default({
                theme: this.themes[themeName],
                assets
            });

            /*
             * Always keep cleanup safe.
             */

            if (typeof this.cleanupFX !== "function") {
                this.cleanupFX = null;
            }

        } catch (error) {
            console.error(
                `spydr theme // failed to load FX for "${themeName}":`,
                error
            );
        }
    }


    /*
     * =========================================================
     * ASSET RESOLUTION
     * =========================================================
     *
     * json.json stores identifiers such as:
     *
     *   "money"
     *   "gold"
     *   "christmas-tree"
     *
     * The FX renderer needs actual image URLs.
     *
     * If an asset is already a URL, we don't touch it.
     *
     * Otherwise we use Spydr's theme asset directory.
     */

    resolveAsset(asset) {
        if (!asset) {
            return null;
        }

        /*
         * Already a complete URL.
         */

        if (
            asset.startsWith("http://") ||
            asset.startsWith("https://") ||
            asset.startsWith("data:") ||
            asset.startsWith("/")
        ) {
            return asset;
        }

        /*
         * Theme FX assets.
         */

        return `/assets/images/themes/${asset}.png`;
    }


    /*
     * =========================================================
     * CHANGE THEME
     * =========================================================
     */

    async setTheme(themeName) {
        if (!this.themes[themeName] && themeName !== "custom") {
            console.warn(
                `spydr theme // cannot switch to unknown theme "${themeName}"`
            );

            return false;
        }

        await this.applyTheme(themeName);

        return true;
    }


    /*
     * =========================================================
     * GETTERS
     * =========================================================
     */

    getTheme(themeName) {
        return this.themes[themeName] || null;
    }

    getCurrentTheme() {
        return this.activeTheme;
    }

    getCurrentThemeName() {
        return (
            document.documentElement.dataset.spydrTheme ||
            "neegy"
        );
    }

    getAllThemes() {
        return this.themes;
    }

    getThemeFX(themeName) {
        return this.themeFX[themeName] || null;
    }


    /*
     * =========================================================
     * CLEANUP
     * =========================================================
     */

    async destroy() {
        if (this.cleanupFX) {
            try {
                await this.cleanupFX();
            } catch (error) {
                console.warn(
                    "spydr theme // FX cleanup failed:",
                    error
                );
            }

            this.cleanupFX = null;
        }
        
        this.disableCustomGradientFX();

        this.activeTheme = null;
        this.ready = false;
    }
}
