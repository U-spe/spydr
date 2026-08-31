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

        settings.init();

        // Boot theme manager first so themeFX configurations load prior to invoking FX styles
        await theme.init();
        cloak.init();
        hotkeys.init();
        ui.init();
        auth.init();
        
        console.log("spydr engine // Core Stack Booted & Themes Injected.");
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const warning = document.getElementById('js-warning');

    window.SpydrKernel = new SpydrCoreRegistry();

    try {
        await window.SpydrKernel.boot();
        warning?.remove();
    } catch (error) {
        console.error('spydr engine // failed to boot:', error);

        if (warning) {
            warning.innerHTML =
                '<strong>SYS_ERROR:</strong> Spydr failed to start. Check the browser console.';
        }
    }

    const loader = document.getElementById('loader') || document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            setTimeout(() => loader.remove(), 500);
        }, 300);
    }
});
