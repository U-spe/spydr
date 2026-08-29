// js/theme.js
export default class ThemeManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.stars = [];
        this.themes = {};
    }

    async init() {
        this.settings = this.kernel.get('settings');

        this.canvas = document.getElementById('stars-canvas');

        // Load theme definitions
        await this.loadThemes();

        // Apply saved settings
        this.applyTheme(this.settings.get('theme'));
        this.applyAccent(this.settings.get('accent'));
        this.applyBgStyle(this.settings.get('bgStyle'));
        this.toggleStars(this.settings.get('starsEnabled'));

        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('resize', () => this.resizeCanvas());

        this.resizeCanvas();
    }

    async loadThemes() {
        try {
            const response = await fetch(
                '/assets/json/syfbau-neegy.json?t=' + Date.now()
            );

            if (!response.ok) {
                throw new Error(`Theme file failed to load: ${response.status}`);
            }

            const data = await response.json();

            this.themes = data.themes || {};

            console.log(
                `spydr themes // ${Object.keys(this.themes).length} themes loaded.`
            );

        } catch (error) {
            console.error('spydr themes // Failed to load themes:', error);
            this.themes = {};
        }
    }

    applyTheme(theme) {
        const root = document.documentElement;

        // Default theme if setting doesn't exist
        if (!theme || !this.themes[theme]) {
            theme = 'neegy';
        }

        const profile = this.themes[theme];

        if (!profile) return;

        // One global theme tag
        root.setAttribute('data-theme', theme);

        // Global CSS variables
        root.style.setProperty('--theme-primary', profile.primary);
        root.style.setProperty('--theme-secondary', profile.secondary);
        root.style.setProperty('--theme-background', profile.background);
        root.style.setProperty('--theme-surface', profile.surface);
        root.style.setProperty('--theme-text', profile.text);
        root.style.setProperty('--theme-muted', profile.muted);
        root.style.setProperty('--theme-border', profile.border);
        root.style.setProperty('--theme-glow', profile.glow);

        // Make the existing accent system follow the theme
        root.style.setProperty('--accent-color', profile.primary);
        root.style.setProperty('--accent-glow', profile.glow);

        // Useful aliases for existing Spydr CSS
        root.style.setProperty('--primary-color', profile.primary);
        root.style.setProperty('--secondary-color', profile.secondary);
        root.style.setProperty('--background-color', profile.background);
        root.style.setProperty('--surface-color', profile.surface);
        root.style.setProperty('--text-color', profile.text);
        root.style.setProperty('--muted-color', profile.muted);
        root.style.setProperty('--border-color', profile.border);

        // Update stars
        if (this.animationId) {
            this.toggleStars(true);
        }
    }

    applyAccent(accent) {
        const root = document.documentElement;

        // If a custom Spydr theme is active, let the theme control accent.
        const currentTheme = root.getAttribute('data-theme');

        if (currentTheme && this.themes[currentTheme]) {
            const profile = this.themes[currentTheme];

            root.style.setProperty('--accent-color', profile.primary);
            root.style.setProperty('--accent-glow', profile.glow);

            return;
        }

        // Legacy accent support
        if (accent === 'blue') {
            root.style.setProperty('--accent-color', 'var(--blue-accent)');
            root.style.setProperty(
                '--accent-glow',
                'rgba(63, 94, 251, 0.4)'
            );
        }

        else if (accent === 'purple') {
            root.style.setProperty('--accent-color', 'var(--purple-accent)');
            root.style.setProperty(
                '--accent-glow',
                'rgba(124, 58, 237, 0.4)'
            );
        }
    }

    applyBgStyle(style) {
        document.body.setAttribute('data-bg-style', style);

        const canvasEl = document.getElementById('stars-canvas');

        if (!canvasEl) return;

        if (
            style === 'stars' &&
            this.settings.get('starsEnabled')
        ) {
            canvasEl.style.opacity = '1';
        }

        else {
            canvasEl.style.opacity = '0';
        }
    }

    toggleStars(enabled) {
        const canvasEl = document.getElementById('stars-canvas');

        if (!canvasEl) return;

        if (
            enabled &&
            this.settings.get('bgStyle') === 'stars'
        ) {
            canvasEl.style.opacity = '1';
            this.startStarsLoop();
        }

        else {
            canvasEl.style.opacity = '0';
            this.stopStarsLoop();
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

    startStarsLoop() {
        if (this.animationId || !this.canvas || !this.ctx) return;

        const render = () => {
            this.ctx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

            const currentTheme =
                document.documentElement.getAttribute('data-theme');

            const profile = this.themes[currentTheme];

            // Stars automatically adapt to the theme
            this.ctx.fillStyle = profile
                ? profile.text
                : 'rgba(255,255,255,0.8)';

            this.stars.forEach(star => {
                star.y -= star.speed;

                if (star.y < 0) {
                    star.y = this.canvas.height;
                    star.x = Math.random() * this.canvas.width;
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

            this.animationId = requestAnimationFrame(render);
        };

        render();
    }

    stopStarsLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}
