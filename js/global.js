// js/global.js
import SettingsManager from './settings.js';
import ThemeManager from './theme.js';
import CloakManager from './cloak.js';
import HotkeyManager from './hotkeys.js';
import UIManager from './ui.js';

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
        // Instantiate decoupled operational layers
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

        // Core initialization execution cascade
        settings.init();

        // --- AUTOMATIC THEME INJECTION ---
        const currentTheme = settings.get('theme') || 'default';
        const currentBg = settings.get('bgStyle') || 'stars';
        
        document.body.setAttribute('data-theme', currentTheme);
        document.body.setAttribute('data-bg-style', currentBg);

        // Initialize remaining managers
        theme.init();
        cloak.init();
        hotkeys.init();
        ui.init();
        
        console.log("spydr engine // Core Stack Booted & Themes Injected.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Hide the local server warning on the control panel if it exists
    const warning = document.getElementById('js-warning');
    if (warning) {
        warning.remove();
    }

    // Boot the core spydr kernel
    window.SpydrKernel = new SpydrCoreRegistry();
    window.SpydrKernel.boot();

    // --- LOADER FAILSAFE FIX ---
    const loader = document.getElementById('loader') || document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            setTimeout(() => loader.remove(), 500);
        }, 300);
    }
});
