// js/theme.js

export default class ThemeManager {
    constructor(kernel) {
        this.kernel = kernel;

        // Star system
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.stars = [];

        // Theme system
        this.themes = {};
        this.themeFX = {};

        // Theme FX system
        this.currentFXScript = null;
        this.currentFXCleanup = null;

        // Current background FX
        this.currentBgStyle = 'none';
    }

    /* =========================================================
       INIT
    ========================================================== */

    async init() {
        this.settings = this.kernel.get('settings');

        // Star canvas
        this.canvas = document.getElementById('stars-canvas');

        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');

            window.addEventListener(
                'resize',
                () => this.resizeCanvas()
            );

            this.resizeCanvas();

            this.canvas.style.opacity = '0';
        }

        // Load theme data
        await this.loadThemes();

        // Load Theme FX data
        await this.loadThemeFX();

        // Apply current theme
        this.applyTheme(
            this.settings.get('theme')
        );

        // Apply accent
        this.applyAccent(
            this.settings.get('accent')
        );

        // Apply background FX
        await this.applyBgStyle(
            this.settings.get('bgStyle') || 'none'
        );

        console.log(
            'spydr themes // Theme Manager initialized'
        );
    }

    /* =========================================================
       LOAD THEMES
    ========================================================== */

    async loadThemes() {
        try {
            const response = await fetch(
                '/assets/json/syfbau-neegy.json?t=' + Date.now()
            );

            if (!response.ok) {
                throw new Error(
                    `Theme JSON failed: ${response.status}`
                );
            }

            const data = await response.json();

            this.themes = data.themes || {};

            console.log(
                `spydr themes // ${Object.keys(this.themes).length} themes loaded`
            );

        } catch (error) {
            console.error(
                'spydr themes // Failed to load:',
                error
            );

            this.themes = {};
        }
    }

    /* =========================================================
       LOAD THEME FX
    ========================================================== */

    async loadThemeFX() {
        try {
            const response = await fetch(
                '/assets/json/json.json?t=' + Date.now()
            );

            if (!response.ok) {
                throw new Error(
                    `Theme FX JSON failed: ${response.status}`
                );
            }

            const data = await response.json();

            this.themeFX = data.themeFX || {};

            console.log(
                `spydr fx // ${Object.keys(this.themeFX).length} Theme FX loaded`
            );

        } catch (error) {
            console.error(
                'spydr fx // Failed to load:',
                error
            );

            this.themeFX = {};
        }
    }

    /* =========================================================
       APPLY THEME
    ========================================================== */

    applyTheme(theme) {
        if (!theme || !this.themes[theme]) {
            theme = 'neegy';
        }

        const profile = this.themes[theme];

        const root = document.documentElement;

        root.setAttribute(
            'data-theme',
            theme
        );

        // Theme colors
        root.style.setProperty(
            '--theme-primary',
            profile.primary
        );

        root.style.setProperty(
            '--theme-secondary',
            profile.secondary
        );

        root.style.setProperty(
            '--theme-background',
            profile.background
        );

        root.style.setProperty(
            '--theme-surface',
            profile.surface
        );

        root.style.setProperty(
            '--theme-text',
            profile.text
        );

        root.style.setProperty(
            '--theme-muted',
            profile.muted
        );

        root.style.setProperty(
            '--theme-border',
            profile.border
        );

        root.style.setProperty(
            '--theme-glow',
            profile.glow
        );

        // Accent follows theme
        root.style.setProperty(
            '--accent-color',
            profile.primary
        );

        root.style.setProperty(
            '--accent-glow',
            profile.glow
        );

        /*
         * If Theme FX is currently active,
         * reload the FX using the new theme.
         */
        if (this.currentBgStyle === 'theme') {
            this.reloadThemeFX();
        }
    }

    /* =========================================================
       APPLY ACCENT
    ========================================================== */

    applyAccent(accent) {
        const root = document.documentElement;

        const currentTheme =
            root.getAttribute('data-theme');

        /*
         * Theme colors take priority over
         * the old standalone accent system.
         */
        if (
            currentTheme &&
            this.themes[currentTheme]
        ) {
            const profile =
                this.themes[currentTheme];

            root.style.setProperty(
                '--accent-color',
                profile.primary
            );

            root.style.setProperty(
                '--accent-glow',
                profile.glow
            );

            return;
        }

        if (accent === 'blue') {
            root.style.setProperty(
                '--accent-color',
                'var(--blue-accent)'
            );

            root.style.setProperty(
                '--accent-glow',
                'rgba(63, 94, 251, 0.4)'
            );
        }

        if (accent === 'purple') {
            root.style.setProperty(
                '--accent-color',
                'var(--purple-accent)'
            );

            root.style.setProperty(
                '--accent-glow',
                'rgba(124, 58, 237, 0.4)'
            );
        }
    }

    /* =========================================================
       BACKGROUND FX CONTROLLER
    ========================================================== */

    async applyBgStyle(style) {
        /*
         * Safety fallback
         */
        const validStyles = [
            'none',
            'stars',
            'fog',
            'gradient',
            'theme'
        ];

        if (!validStyles.includes(style)) {
            style = 'none';
        }

        this.currentBgStyle = style;

        document.body.setAttribute(
            'data-bg-style',
            style
        );

        /*
         * Stop EVERYTHING first.
         *
         * This prevents stars + fog + gradient +
         * Theme FX from stacking accidentally.
         */
        this.stopStars();

        await this.stopThemeFX();

        this.disableFog();
        this.disableGradient();

        /*
         * Hide stars canvas by default.
         */
        if (this.canvas) {
            this.canvas.style.opacity = '0';
        }

        /*
         * REGULAR SPYDR
         */
        if (style === 'none') {
            console.log(
                'spydr fx // Regular Spydr background'
            );

            return;
        }

        /*
         * STAR PARTICLES
         */
        if (style === 'stars') {
            console.log(
                'spydr fx // Star Particles enabled'
            );

            if (this.canvas) {
                this.canvas.style.opacity = '1';
            }

            this.startStars();

            return;
        }

        /*
         * FOG
         */
        if (style === 'fog') {
            console.log(
                'spydr fx // Fog enabled'
            );

            this.enableFog();

            return;
        }

        /*
         * GRADIENT
         */
        if (style === 'gradient') {
            console.log(
                'spydr fx // Gradient enabled'
            );

            this.enableGradient();

            return;
        }

        /*
         * THEME FX
         */
        if (style === 'theme') {
            console.log(
                'spydr fx // Theme FX enabled'
            );

            await this.enableThemeFX();

            return;
        }
    }

    /* =========================================================
       THEME FX
    ========================================================== */

    async enableThemeFX() {
        const theme =
            document.documentElement.getAttribute(
                'data-theme'
            );

        if (!theme) {
            console.warn(
                'spydr fx // No active theme'
            );

            return;
        }

        const fx = this.themeFX[theme];

        if (!fx) {
            console.warn(
                `spydr fx // No FX registered for theme: ${theme}`
            );

            return;
        }

        if (!fx.script) {
            console.warn(
                `spydr fx // Theme ${theme} has no script`
            );

            return;
        }

        try {
            /*
             * Load the universal Theme FX engine.
             *
             * Example:
             * /js/global.themes.js
             */
            const module =
                await import(fx.script);

            if (
                typeof module.default !== 'function'
            ) {
                throw new Error(
                    'Theme FX module has no default function'
                );
            }

            /*
             * Start the universal FX engine.
             */
            this.currentFXCleanup =
                await module.default({
                    theme,
                    assets: fx.assets || []
                });

            this.currentFXScript =
                fx.script;

            console.log(
                `spydr fx // ${theme} FX running`
            );

        } catch (error) {
            console.error(
                `spydr fx // Failed to load ${fx.script}`,
                error
            );
        }
    }

    /* =========================================================
       RELOAD THEME FX
    ========================================================== */

    async reloadThemeFX() {
        if (this.currentBgStyle !== 'theme') {
            return;
        }

        await this.stopThemeFX();

        await this.enableThemeFX();
    }

    /* =========================================================
       STOP THEME FX
    ========================================================== */

    async stopThemeFX() {
        if (
            typeof this.currentFXCleanup ===
            'function'
        ) {
            try {
                await this.currentFXCleanup();
            } catch (error) {
                console.error(
                    'spydr fx // Cleanup failed:',
                    error
                );
            }
        }

        this.currentFXCleanup = null;
        this.currentFXScript = null;

        /*
         * Extra failsafe cleanup.
         */
        document
            .querySelectorAll(
                '.spydr-theme-fx'
            )
            .forEach(el => el.remove());

        /*
         * Also clean the dedicated container
         * if one exists.
         */
        const container =
            document.getElementById(
                'theme-fx-container'
            );

        if (container) {
            container.innerHTML = '';
        }
    }

    /* =========================================================
       FOG
    ========================================================== */

    enableFog() {
        document.body.classList.add(
            'spydr-fog-enabled'
        );
    }

    disableFog() {
        document.body.classList.remove(
            'spydr-fog-enabled'
        );
    }

    /* =========================================================
       GRADIENT
    ========================================================== */

    enableGradient() {
        document.body.classList.add(
            'spydr-gradient-enabled'
        );
    }

    disableGradient() {
        document.body.classList.remove(
            'spydr-gradient-enabled'
        );
    }

    /* =========================================================
       STARS
    ========================================================== */

    startStars() {
        if (!this.canvas || !this.ctx) {
            return;
        }

        if (this.animationId) {
            return;
        }

        const render = () => {

            /*
             * Stop rendering if Stars is no longer
             * the selected FX.
             */
            if (this.currentBgStyle !== 'stars') {
                this.stopStars();
                return;
            }

            this.ctx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

            const theme =
                document.documentElement
                    .getAttribute('data-theme');

            const profile =
                this.themes[theme];

            this.ctx.fillStyle =
                profile?.text ||
                'rgba(255,255,255,0.8)';

            this.stars.forEach(star => {

                star.y -= star.speed;

                if (star.y < 0) {
                    star.y =
                        this.canvas.height;

                    star.x =
                        Math.random() *
                        this.canvas.width;
                }

                this.ctx.beginPath();

                this.ctx.arc(
                    star.x,
                    star.y,
                    star.size,
                    0,
                    Math.PI * 2
                );

                this.ctx.fill();
            });

            this.animationId =
                requestAnimationFrame(render);
        };

        this.animationId =
            requestAnimationFrame(render);
    }

    stopStars() {
        if (this.animationId) {

            cancelAnimationFrame(
                this.animationId
            );

            this.animationId = null;
        }

        if (this.ctx && this.canvas) {
            this.ctx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
        }
    }

    /* =========================================================
       CANVAS RESIZE
    ========================================================== */

    resizeCanvas() {
        if (!this.canvas) {
            return;
        }

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;

        this.generateStars();
    }

    /* =========================================================
       GENERATE STARS
    ========================================================== */

    generateStars() {
        if (!this.canvas) {
            return;
        }

        this.stars = [];

        const count =
            Math.floor(
                (
                    this.canvas.width *
                    this.canvas.height
                ) / 3000
            );

        for (
            let i = 0;
            i < count;
            i++
        ) {
            this.stars.push({

                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                size:
                    Math.random() *
                    1.5 + 0.5,

                speed:
                    Math.random() *
                    0.5 + 0.1
            });
        }
    }
}
