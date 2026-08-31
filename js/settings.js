// /js/settings.js

export default class SettingsManager {
    constructor() {
        this.storageKey = "spydr_config_matrix";

        this.defaults = {
            autoSave: true,
            theme: "spydr",
            bgStyle: "stars",
            starsEnabled: true,
            accent: "purple",

            customTheme: {
                color1: "#7c3aed",
                color2: "#3f5efb",
                color3: "#ff4fd8",
                useColor3: false
            },

            panicKey: "`",
            bossKey: "Escape",
            devModeKey: "F4",
            quickSettingsKey: "F9",

            cloakEnabled: false,
            cloakTarget: "spydr"
        };

        this.state = this.createDefaultState();
        this.listeners = [];
    }

    createDefaultState() {
        return {
            ...this.defaults,
            customTheme: {
                ...this.defaults.customTheme
            }
        };
    }

    init() {
        const stored = localStorage.getItem(this.storageKey);

        if (!stored) {
            return;
        }

        try {
            const parsed = JSON.parse(stored);

            if (
                !parsed ||
                typeof parsed !== "object" ||
                Array.isArray(parsed)
            ) {
                throw new TypeError(
                    "Stored settings must be an object."
                );
            }

            this.state = {
                ...this.createDefaultState(),
                ...parsed,
                customTheme: {
                    ...this.defaults.customTheme,
                    ...(parsed.customTheme || {})
                }
            };

            this.migrateLegacyValues();
        } catch (error) {
            console.error(
                "spydr settings // failed to load settings:",
                error
            );

            this.state = this.createDefaultState();
        }
    }

    migrateLegacyValues() {
        const legacyThemes = new Set([
            "dark",
            "light",
            "spydr-neon"
        ]);

        if (
            !this.state.theme ||
            legacyThemes.has(this.state.theme)
        ) {
            this.state.theme = "spydr";
        }

        const backgroundStyles = new Set([
            "none",
            "stars",
            "fog",
            "gradient",
            "theme"
        ]);

        if (!backgroundStyles.has(this.state.bgStyle)) {
            this.state.bgStyle = "stars";
        }

        if (typeof this.state.starsEnabled !== "boolean") {
            this.state.starsEnabled = true;
        }
    }

    get(key) {
        return this.state[key];
    }

    set(key, value, options = {}) {
        const { notify = true } = options;
        const previousValue = this.state[key];

        if (
            previousValue === value &&
            (value === null || typeof value !== "object")
        ) {
            return false;
        }

        this.state[key] = value;

        if (notify) {
            this.notify(key, value);
        }

        if (
            key === "autoSave" ||
            this.state.autoSave
        ) {
            this.save();
        }

        return true;
    }

    save() {
        try {
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.state)
            );
        } catch (error) {
            console.error(
                "spydr settings // failed to save settings:",
                error
            );
        }
    }

    subscribe(callback) {
        if (typeof callback !== "function") {
            return () => {};
        }

        this.listeners.push(callback);

        return () => {
            this.listeners = this.listeners.filter(
                listener => listener !== callback
            );
        };
    }

    notify(key, value) {
        for (const callback of [...this.listeners]) {
            try {
                callback(key, value, this.state);
            } catch (error) {
                console.error(
                    "spydr settings // listener failed:",
                    error
                );
            }
        }
    }
}
