// /js/settings.js
export default class SettingsManager {
    constructor() {
        this.storageKey = 'spydr_config_matrix';
        this.state = {
            starsEnabled: true,
            autoSave: true,
            theme: 'dark',
            accent: 'blue',
            bgStyle: 'stars',
            bossKey: 'Escape',
            cloakEnabled: false,
            cloakTarget: 'google-docs'
        };
        this.listeners = [];
    }

    init() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.state = { ...this.state, ...JSON.parse(stored) };
            } catch (e) {
                console.error("sys_err: Configuration decryption execution fault.", e);
            }
        }
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;
        this.notify(key, value);
        
        if (this.state.autoSave) {
            this.save();
        }
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notify(key, value) {
        this.listeners.forEach(callback => callback(key, value, this.state));
    }
}
