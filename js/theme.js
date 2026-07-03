// js/theme.js
export default class ThemeManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.stars = [];
    }

    init() {
        this.settings = this.kernel.get('settings');
        this.canvas = document.getElementById('stars-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');

        // Apply initialized profiles
        this.applyTheme(this.settings.get('theme'));
        this.applyAccent(this.settings.get('accent'));
        this.applyBgStyle(this.settings.get('bgStyle'));
        this.toggleStars(this.settings.get('starsEnabled'));

        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    applyAccent(accent) {
        const root = document.documentElement;
        if (accent === 'blue') {
            root.style.setProperty('--accent-color', 'var(--blue-accent)');
            root.style.setProperty('--accent-glow', 'rgba(63, 94, 251, 0.4)');
        } else if (accent === 'purple') {
            root.style.setProperty('--accent-color', 'var(--purple-accent)');
            root.style.setProperty('--accent-glow', 'rgba(124, 58, 237, 0.4)');
        }
    }

    applyBgStyle(style) {
        document.body.setAttribute('data-bg-style', style);
        const canvasEl = document.getElementById('stars-canvas');
        if (!canvasEl) return;
        
        if (style === 'stars' && this.settings.get('starsEnabled')) {
            canvasEl.style.opacity = '1';
        } else {
            canvasEl.style.opacity = '0';
        }
    }

    toggleStars(enabled) {
        const canvasEl = document.getElementById('stars-canvas');
        if (!canvasEl) return;

        if (enabled && this.settings.get('bgStyle') === 'stars') {
            canvasEl.style.opacity = '1';
            this.startStarsLoop();
        } else {
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
        this.stars = [];
        const count = Math.floor((this.canvas.width * this.canvas.height) / 3000);
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
        if (this.animationId) return;
        const render = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.settings.get('theme') === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)';
            
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

    stopStarsLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}
