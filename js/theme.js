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

            window.addEventListener('resize', () => {
                this.resizeCanvas();
            });

            this.resizeCanvas();
        }

        await this.loadThemes();
        await this.loadThemeFX();

        const activeTheme =
            this.settings.get('theme') || 'neegy';

        const activeBg =
            this.settings.get('bgStyle') || 'stars';

        await this.applyTheme(activeTheme);
        this.applyAccent(this.settings.get('accent'));
        await this.applyBgStyle(activeBg);

        this.setupThemeControls();
    }

    // =========================
    // THEME CONTROLS
    // =========================

    setupThemeControls() {
        // Theme radio buttons
        const themeInputs =
            document.querySelectorAll(
                'input[name="ui-theme"]'
            );

        themeInputs.forEach(input => {
            input.addEventListener('change', async () => {
                if (!input.checked) return;

                const theme = input.value;

                this.settings.set(
                    'theme',
                    theme
                );

                await this.applyTheme(theme);

                this.showThemeUpdatedNotification();
            });
        });

        // Background FX dropdown
        const bgFXSelect =
            document.getElementById('bg-fx-variant');

        if (bgFXSelect) {
            const savedFX =
                this.settings.get('bgStyle') || 'stars';

            bgFXSelect.value = savedFX;

            bgFXSelect.addEventListener(
                'change',
                async event => {
                    const selectedFX =
                        event.target.value;

                    // Save the setting
                    this.settings.set(
                        'bgStyle',
                        selectedFX
                    );

                    // Apply immediately
                    await this.applyBgStyle(
                        selectedFX
                    );
                }
            );
        }
    }

    // =========================
    // THEME UPDATED NOTICE
    // =========================

    showThemeUpdatedNotification() {
        let notification =
            document.getElementById(
                'spydr-theme-notification'
            );

        if (!notification) {
            notification =
                document.createElement('div');

            notification.id =
                'spydr-theme-notification';

            Object.assign(
                notification.style,
                {
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    zIndex: '99999',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    background:
                        'rgba(15, 15, 20, 0.95)',
                    color: '#fff',
                    border:
                        '1px solid rgba(255,255,255,0.15)',
                    boxShadow:
                        '0 8px 30px rgba(0,0,0,0.35)',
                    fontFamily:
                        'Space Grotesk, sans-serif',
                    fontSize: '14px',
                    opacity: '0',
                    transform:
                        'translateY(10px)',
                    transition:
                        'opacity .2s ease, transform .2s ease',
                    pointerEvents: 'none'
                }
            );

            notification.textContent =
                'Theme updated. Please refresh.';

            document.body.appendChild(
                notification
            );
        }

        notification.style.opacity = '1';
        notification.style.transform =
            'translateY(0)';

        clearTimeout(
            this.notificationTimeout
        );

        this.notificationTimeout =
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform =
                    'translateY(10px)';
            }, 3000);
    }

    // =========================
    // LOAD THEMES
    // =========================

    async loadThemes() {
        try {
            const response = await fetch(
                '/assets/json/syfbau-neegy.json?t=' +
                Date.now()
            );

            if (!response.ok) {
                throw new Error(
                    `Theme JSON failed: ${response.status}`
                );
            }

            const data =
                await response.json();

            this.themes =
                data.themes || {};

            console.log(
                `spydr themes // ${Object.keys(
                    this.themes
                ).length} themes loaded`
            );

        } catch (error) {
            console.error(
                'spydr themes // Failed to load:',
                error
            );

            this.themes = {};
        }
    }

    // =========================
    // LOAD THEME FX
    // =========================

    async loadThemeFX() {
        try {
            const response = await fetch(
                '/assets/json/json.json?t=' +
                Date.now()
            );

            if (!response.ok) {
                throw new Error(
                    `Theme FX JSON failed: ${response.status}`
                );
            }

            const data =
                await response.json();

            this.themeFX =
                data.themeFX || {};

            console.log(
                `spydr fx // ${Object.keys(
                    this.themeFX
                ).length} theme FX loaded`
            );

        } catch (error) {
            console.error(
                'spydr fx // Failed to load:',
                error
            );

            this.themeFX = {};
        }
    }

    // =========================
    // APPLY THEME
    // =========================

    async applyTheme(theme) {
        if (
            !theme ||
            !this.themes[theme]
        ) {
            theme = 'neegy';
        }

        const profile =
            this.themes[theme];

        const root =
            document.documentElement;

        root.setAttribute(
            'data-theme',
            theme
        );

        document.body.setAttribute(
            'data-theme',
            theme
        );

        const variables = {
            '--theme-primary':
                profile.primary,

            '--theme-secondary':
                profile.secondary,

            '--theme-background':
                profile.background,

            '--theme-surface':
                profile.surface,

            '--theme-text':
                profile.text,

            '--theme-muted':
                profile.muted,

            '--theme-border':
                profile.border,

            '--theme-glow':
                profile.glow,

            '--accent-color':
                profile.primary,

            '--accent-glow':
                profile.glow
        };

        Object.entries(
            variables
        ).forEach(
            ([name, value]) => {
                if (value) {
                    root.style.setProperty(
                        name,
                        value
                    );
                }
            }
        );

        // Keep the selected radio button synced
        const input =
            document.querySelector(
                `input[name="ui-theme"][value="${theme}"]`
            );

        if (input) {
            input.checked = true;
        }

        // If Theme FX is active,
        // reload the FX for the new theme.
        const currentBg =
            document.body.getAttribute(
                'data-bg-style'
            );

        if (currentBg === 'theme') {
            await this.stopThemeFX();
            await this.enableThemeFX();
        }
    }

    // =========================
    // ACCENT
    // =========================

    applyAccent(accent) {
        const root =
            document.documentElement;

        const currentTheme =
            root.getAttribute(
                'data-theme'
            );

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

    // =========================
    // BACKGROUND FX
    // =========================

    async applyBgStyle(style) {
        const validStyles = [
            'stars',
            'fog',
            'gradient',
            'theme'
        ];

        if (!validStyles.includes(style)) {
            style = 'stars';
        }

        document.body.setAttribute(
            'data-bg-style',
            style
        );

        // Make dropdown match active setting
        const bgFXSelect =
            document.getElementById(
                'bg-fx-variant'
            );

        if (bgFXSelect) {
            bgFXSelect.value = style;
        }

        // Stop every previous FX first
        this.stopStars();
        await this.stopThemeFX();

        document.body.classList.remove(
            'spydr-fog-enabled',
            'spydr-gradient-enabled'
        );

        const canvas =
            document.getElementById(
                'stars-canvas'
            );

        if (canvas) {
            canvas.style.opacity =
                style === 'stars'
                    ? '1'
                    : '0';
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

    // =========================
    // ASSET PATH RESOLVER
    // =========================

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

    // =========================
    // ENABLE THEME FX
    // =========================

    async enableThemeFX() {
        const theme =
            document.documentElement.getAttribute(
                'data-theme'
            ) || 'neegy';

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

            if (
                typeof module.default !==
                'function'
            ) {
                console.warn(
                    `spydr fx // ${fx.script} has no default function`
                );

                return;
            }

            const resolvedAssets =
                (fx.assets || [])
                    .map(asset =>
                        this.resolveAssetPath(
                            asset
                        )
                    )
                    .filter(Boolean);

            console.log(
                `spydr fx // Loading ${theme} with ${resolvedAssets.length} assets`
            );

            this.currentFXCleanup =
                await module.default({
                    theme,
                    assets:
                        resolvedAssets
                });

            this.currentFXScript =
                fx.script;

        } catch (error) {
            console.error(
                `spydr fx // Failed to load ${fx.script}`,
                error
            );
        }
    }

    // =========================
    // STOP THEME FX
    // =========================

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

        document
            .querySelectorAll(
                '.spydr-theme-fx'
            )
            .forEach(
                el => el.remove()
            );
    }

    // =========================
    // FOG
    // =========================

    enableFog() {
        document.body.classList.add(
            'spydr-fog-enabled'
        );
    }

    // =========================
    // GRADIENT
    // =========================

    enableGradient() {
        document.body.classList.add(
            'spydr-gradient-enabled'
        );
    }

    // =========================
    // STARS
    // =========================

    startStars() {
        if (
            !this.canvas ||
            !this.ctx
        ) {
            return;
        }

        if (this.animationId) {
            return;
        }

        const render = () => {
            this.ctx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

            const theme =
                document.documentElement.getAttribute(
                    'data-theme'
                );

            const profile =
                this.themes[theme];

            this.ctx.fillStyle =
                profile?.text ||
                'rgba(255,255,255,0.8)';

            this.stars.forEach(
                star => {
                    star.y -=
                        star.speed;

                    if (
                        star.y < 0
                    ) {
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
                }
            );

            this.animationId =
                requestAnimationFrame(
                    render
                );
        };

        render();
    }

    // =========================
    // STOP STARS
    // =========================

    stopStars() {
        if (this.animationId) {
            cancelAnimationFrame(
                this.animationId
            );

            this.animationId = null;
        }

        if (
            this.ctx &&
            this.canvas
        ) {
            this.ctx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
        }
    }

    // =========================
    // RESIZE CANVAS
    // =========================

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

    // =========================
    // GENERATE STARS
    // =========================

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
