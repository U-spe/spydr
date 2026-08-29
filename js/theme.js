// js/theme.js

export default class ThemeManager {
    constructor(kernel) {
        this.kernel = kernel;

        this.canvas = null;
        this.ctx = null;
        this.animationId = null;

        this.stars = [];
        this.themes = {};
        this.themeFX = {};

        this.currentFXScript = null;
        this.currentFXCleanup = null;
    }

    async init() {
        this.settings = this.kernel.get('settings');

        this.canvas = document.getElementById('stars-canvas');

        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');

            window.addEventListener(
                'resize',
                () => this.resizeCanvas()
            );

            this.resizeCanvas();
        }

        await this.loadThemes();
        await this.loadThemeFX();

        this.applyTheme(
            this.settings.get('theme')
        );

        this.applyAccent(
            this.settings.get('accent')
        );

        await this.applyBgStyle(
            this.settings.get('bgStyle')
        );
    }

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
                `spydr fx // ${Object.keys(this.themeFX).length} theme FX loaded`
            );

        } catch (error) {
            console.error(
                'spydr fx // Failed to load:',
                error
            );

            this.themeFX = {};
        }
    }

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

        root.style.setProperty(
            '--accent-color',
            profile.primary
        );

        root.style.setProperty(
            '--accent-glow',
            profile.glow
        );
    }

    applyAccent(accent) {
        const root = document.documentElement;

        const currentTheme =
            root.getAttribute('data-theme');

        if (currentTheme && this.themes[currentTheme]) {
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

    async applyBgStyle(style) {
        document.body.setAttribute(
            'data-bg-style',
            style
        );

        this.stopStars();
        await this.stopThemeFX();

        const canvas =
            document.getElementById('stars-canvas');

        if (canvas) {
            canvas.style.opacity =
                style === 'stars' ? '1' : '0';
        }

        if (style === 'stars') {
            this.startStars();
        }

        if (style === 'fog') {
            this.enableFog();
        }

        if (style === 'gradient') {
            this.enableGradient();
        }

        if (style === 'theme') {
            await this.enableThemeFX();
        }
    }

    async enableThemeFX() {
        const theme =
            document.documentElement
                .getAttribute('data-theme');

        const fx =
            this.themeFX[theme];

        if (!fx || !fx.script) {
            console.warn(
                `spydr fx // No FX registered for ${theme}`
            );

            return;
        }

        try {
            const module =
                await import(fx.script);

            if (typeof module.default === 'function') {
                this.currentFXCleanup =
                    await module.default({
                        theme,
                        assets: fx.assets
                    });
            }

            this.currentFXScript =
                fx.script;

        } catch (error) {
            console.error(
                `spydr fx // Failed to load ${fx.script}`,
                error
            );
        }
    }

    async stopThemeFX() {
        if (typeof this.currentFXCleanup === 'function') {
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

        document
            .querySelectorAll('.spydr-theme-fx')
            .forEach(el => el.remove());
    }

    enableFog() {
        document.body.classList.add(
            'spydr-fog-enabled'
        );
    }

    enableGradient() {
        document.body.classList.add(
            'spydr-gradient-enabled'
        );
    }

    startStars() {
        if (!this.canvas || !this.ctx) return;

        if (this.animationId) return;

        const render = () => {
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
                    star.y = this.canvas.height;
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

        render();
    }

    stopStars() {
        if (this.animationId) {
            cancelAnimationFrame(
                this.animationId
            );

            this.animationId = null;
        }
    }

    resizeCanvas() {
        if (!this.canvas) return;

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;

        this.generateStars();
    }

    generateStars() {
        if (!this.canvas) return;

        this.stars = [];

        const count =
            Math.floor(
                (
                    this.canvas.width *
                    this.canvas.height
                ) / 3000
            );

        for (let i = 0; i < count; i++) {
            this.stars.push({
                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                size:
                    Math.random() * 1.5 + 0.5,

                speed:
                    Math.random() * 0.5 + 0.1
            });
        }
    }
}
