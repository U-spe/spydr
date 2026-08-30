// /js/settings.js

export default class SettingsManager {
    constructor() {
        this.storageKey = 'spydr_config_matrix';

        this.state = {
            autoSave: true,

            // Theme
            theme: 'neegy',
            accent: 'blue',

            // Background FX
            bgStyle: 'stars',

            // Hotkeys
            panicKey: '`',
            bossKey: 'Escape',
            devModeKey: 'F4',
            quickSettingsKey: 'F9',

            // Cloaking
            cloakEnabled: false,
            cloakTarget: 'spydr'
        };

        this.listeners = [];
    }

    init() {
        const stored =
            localStorage.getItem(this.storageKey);

        if (!stored) return;

        try {
            this.state = {
                ...this.state,
                ...JSON.parse(stored)
            };

            // Kill old invalid theme values
            if (
                !this.state.theme ||
                this.state.theme === 'dark' ||
                this.state.theme === 'light' ||
                this.state.theme === 'spydr-neon'
            ) {
                this.state.theme = 'neegy';
                this.save();
            }

        } catch (error) {
            console.error(
                'spydr settings // Failed to load settings:',
                error
            );
        }
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;

        this.notify(
            key,
            value
        );

        if (this.state.autoSave) {
            this.save();
        }
    }

    save() {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.state)
        );
    }

    subscribe(callback) {
        if (typeof callback !== 'function') return;

        this.listeners.push(callback);
    }

    notify(key, value) {
        this.listeners.forEach(callback => {
            callback(
                key,
                value,
                this.state
            );
        });
    }
}
