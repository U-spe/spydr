// js/global.js
import SettingsManager from './settings.js';
import ThemeManager from './theme.js';
import CloakManager from './cloak.js';
import HotkeyManager from './hotkeys.js';
import UIManager from './ui.js';
import AuthManager from './auth-user.js';

class SpydrCoreRegistry {
    constructor() {
        this.modules = {};
    }

    register(name, instance) {
        this.modules[name] = instance;
    }

    get(name) {
        return this.modules[name];
    }

    async boot() {
        // =========================================
        // CREATE MODULES
        // =========================================

        const settings = new SettingsManager();
        this.register('settings', settings);

        const theme = new ThemeManager(this);
        this.register('theme', theme);

        const cloak = new CloakManager(this);
        this.register('cloak', cloak);

        const hotkeys = new HotkeyManager(this);
        this.register('hotkeys', hotkeys);

        const ui = new UIManager(this);
        this.register('ui', ui);

        const auth = new AuthManager(this);
        this.register('auth', auth);


        // =========================================
        // INITIALIZE SETTINGS FIRST
        // =========================================

        settings.init();


        // =========================================
        // INITIAL THEME STATE
        // =========================================

        const currentTheme =
            settings.get('theme') || 'neegy';

        const currentBg =
            settings.get('bgStyle') || 'stars';


        /*
         * Keep the initial state on BOTH html and body.
         *
         * This prevents older CSS that uses body[data-theme]
         * from breaking while the ThemeManager uses
         * html[data-theme].
         */

        document.documentElement.setAttribute(
            'data-theme',
            currentTheme
        );

        document.body.setAttribute(
            'data-theme',
            currentTheme
        );

        document.body.setAttribute(
            'data-bg-style',
            currentBg
        );


        // =========================================
        // INITIALIZE THEME SYSTEM
        // =========================================

        /*
         * IMPORTANT:
         *
         * ThemeManager.init() is async because it loads:
         *
         * /assets/json/syfbau-neegy.json
         * /assets/json/json.json
         *
         * We MUST await it before continuing.
         */

        await theme.init();


        // =========================================
        // KEEP BODY THEME IN SYNC
        // =========================================

        const appliedTheme =
            document.documentElement.getAttribute(
                'data-theme'
            );

        if (appliedTheme) {
            document.body.setAttribute(
                'data-theme',
                appliedTheme
            );
        }


        // =========================================
        // INITIALIZE REMAINING MANAGERS
        // =========================================

        cloak.init();
        hotkeys.init();
        ui.init();
        auth.init();


        // =========================================
        // CORE READY
        // =========================================

        console.log(
            'spydr engine // Core Stack Booted & Themes Injected.'
        );
    }
}


// =========================================
// DOM READY
// =========================================

document.addEventListener(
    'DOMContentLoaded',
    async () => {

        // Hide local server warning
        const warning =
            document.getElementById('js-warning');

        if (warning) {
            warning.remove();
        }


        // Create kernel
        window.SpydrKernel =
            new SpydrCoreRegistry();


        // Boot core
        try {
            await window.SpydrKernel.boot();

        } catch (error) {
            console.error(
                'spydr engine // Core boot failed:',
                error
            );
        }


        // =========================================
        // LOADER FAILSAFE
        // =========================================

        const loader =
            document.getElementById('loader') ||
            document.getElementById('loading-screen');

        if (loader) {

            setTimeout(() => {

                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';

                setTimeout(() => {
                    loader.remove();
                }, 500);

            }, 300);
        }
    }
);
