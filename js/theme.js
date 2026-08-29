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

            window.addEventListener('resize', () => {
                this.resizeCanvas();
            });

            this.resizeCanvas();
        }

        await this.loadThemes();
        await this.loadThemeFX();

        const activeTheme = this.settings.get('theme') || 'neegy';
        const activeBg = this.settings.get('bgStyle') || 'stars';

        this.applyTheme(activeTheme);
        this.applyAccent(this.settings.get('accent'));
        await this.applyBgStyle(activeBg);
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

    async applyTheme(theme) {
        if (!theme || !this.themes[theme]) {
            theme = 'neegy';
        }

        const profile = this.themes[theme];
        const root = document.documentElement;

        root.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);

        const variables = {
            '--theme-primary': profile.primary,
            '--theme-secondary': profile.secondary,
            '--theme-background': profile.background,
            '--theme-surface': profile.surface,
            '--theme-text': profile.text,
            '--theme-muted': profile.muted,
            '--theme-border': profile.border,
            '--theme-glow': profile.glow,
            '--accent-color': profile.primary,
            '--accent-glow': profile.glow
        };

        Object.entries(variables).forEach(([name, value]) => {
            if (value) {
                root.style.setProperty(name, value);
            }
        });

        // Re-apply background FX if currently using theme FX mode
        const currentBg = document.body.getAttribute('data-bg-style');
        if (currentBg === 'theme') {
            await this.stopThemeFX();
            await this.enableThemeFX();
        }
    }

    applyAccent(accent) {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');

        if (currentTheme && this.themes[currentTheme]) {
            const profile = this.themes[currentTheme];
            root.style.setProperty('--accent-color', profile.primary);
            root.style.setProperty('--accent-glow', profile.glow);
            return;
        }

        if (accent === 'blue') {
            root.style.setProperty('--accent-color', 'var(--blue-accent)');
            root.style.setProperty('--accent-glow', 'rgba(63, 94, 251, 0.4)');
        }

        if (accent === 'purple') {
            root.style.setProperty('--accent-color', 'var(--purple-accent)');
            root.style.setProperty('--accent-glow', 'rgba(124, 58, 237, 0.4)');
        }
    }

    async applyBgStyle(style) {
        document.body.setAttribute('data-bg-style', style);
        document.body.classList.remove(
            'spydr-fog-enabled',
            'spydr-gradient-enabled'
        );

        this.stopStars();
        await this.stopThemeFX();

        const canvas = document.getElementById('stars-canvas');
        if (canvas) {
            canvas.style.opacity = style === 'stars' ? '1' : '0';
        }

        if (style === 'stars') {
            this.startStars();
        } else if (style === 'fog') {
            this.enableFog();
        } else if (style === 'gradient') {
            this.enableGradient();
        } else if (style === 'theme') {
            await this.enableThemeFX();
        }
    }

    resolveAssetPath(asset) {
        if (!asset) return null;

        if (
            asset.startsWith('/') ||
            asset.startsWith('http://') ||
            asset.startsWith('https://')
        ) {
            return asset;
        }

        return `/assets/images/themes/${asset}.png`;
    }

    async enableThemeFX() {
        const theme = document.documentElement.getAttribute('data-theme') || 'neegy';
        const fx = this.themeFX[theme];

        if (!fx || !fx.script) {
            console.warn(`spydr fx // No FX registered for ${theme}`);
            return;
        }

        try {
            const module = await import(fx.script);

            if (typeof module.default !== 'function') {
                console.warn(`spydr fx // ${fx.script} has no default function`);
                return;
            }

            const resolvedAssets = (fx.assets || [])
                .map(asset => this.resolveAssetPath(asset))
                .filter(Boolean);

            console.log(`spydr fx // Loading ${theme} with ${resolvedAssets.length} assets`);

            this.currentFXCleanup = await module.default({
                theme,
                assets: resolvedAssets
            });

            this.currentFXScript = fx.script;

        } catch (error) {
            console.error(`spydr fx // Failed to load ${fx.script}`, error);
        }
    }

    async stopThemeFX() {
        if (typeof this.currentFXCleanup === 'function') {
            try {
                await this.currentFXCleanup();
            } catch (error) {
                console.error('spydr fx // Cleanup failed:', error);
            }
        }

        this.currentFXCleanup = null;
        this.currentFXScript = null;

        document.querySelectorAll('.spydr-theme-fx').forEach(el => el.remove());
    }

    enableFog() {
        document.body.classList.add('spydr-fog-enabled');
    }

    enableGradient() {
        document.body.classList.add('spydr-gradient-enabled');
    }

    startStars() {
        if (!this.canvas || !this.ctx) return;
        if (this.animationId) return;

        const render = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const theme = document.documentElement.getAttribute('data-theme');
            const profile = this.themes[theme];

            this.ctx.fillStyle = profile?.text || 'rgba(255,255,255,0.8)';

            this.stars.forEach(star => {
                star.y -= star.speed;

                if (star.y < 0) {
                    star.y = this.canvas.height;
                    star.x = Math.random() * this.canvas.width;
                }

                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                this.ctx.fill();
            });

            this.animationId = requestAnimationFrame(render);
        };

        render();
    }

    stopStars() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    resizeCanvas() {
        if (!this.canvas) return;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.generateStars();
    }

    generateStars() {
        if (!this.canvas) return;

        this.stars = [];

        const count = Math.floor(
            (this.canvas.width * this.canvas.height) / 3000
        );

        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    }
}
