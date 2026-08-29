// /js/settings.js

export default class SettingsManager {
    constructor() {
        this.storageKey = 'spydr_config_matrix';

        this.state = {
            starsEnabled: true,

            autoSave: true,

            // Theme system
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

    /*
     * =========================================================
     * INITIALIZATION
     * =========================================================
     */

    init() {
        const stored = localStorage.getItem(this.storageKey);

        if (stored) {
            try {
                const parsed = JSON.parse(stored);

                if (parsed && typeof parsed === 'object') {
                    this.state = {
                        ...this.state,
                        ...parsed
                    };
                }

            } catch (error) {
                console.error(
                    'sys_err: Configuration load fault.',
                    error
                );
            }
        }

        this.bindSettingsPage();

        this.notifyAll();
    }


    /*
     * =========================================================
     * GET / SET
     * =========================================================
     */

    get(key) {
        return this.state[key];
    }


    set(key, value) {
        if (!(key in this.state)) {
            console.warn(`sys_warn: Unknown configuration key "${key}".`);
        }

        this.state[key] = value;

        this.notify(key, value);

        if (this.state.autoSave) {
            this.save();
        }
    }


    save() {
        try {
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.state)
            );

            this.notify('configSaved', true);

        } catch (error) {
            console.error(
                'sys_err: Configuration save fault.',
                error
            );
        }
    }


    /*
     * =========================================================
     * SUBSCRIPTIONS
     * =========================================================
     */

    subscribe(callback) {
        if (typeof callback !== 'function') {
            return;
        }

        this.listeners.push(callback);
    }


    notify(key, value) {
        this.listeners.forEach(callback => {
            try {
                callback(
                    key,
                    value,
                    this.state
                );
            } catch (error) {
                console.error(
                    'sys_err: Settings listener fault.',
                    error
                );
            }
        });
    }


    notifyAll() {
        Object.entries(this.state).forEach(
            ([key, value]) => {
                this.notify(key, value);
            }
        );
    }


    /*
     * =========================================================
     * SETTINGS PAGE
     * =========================================================
     */

    bindSettingsPage() {

        /*
         * -----------------------------------------
         * AUTO SAVE
         * -----------------------------------------
         */

        const autoSave = document.getElementById(
            'toggle-autosave'
        );

        if (autoSave) {

            autoSave.checked =
                Boolean(this.state.autoSave);

            autoSave.addEventListener(
                'change',
                () => {

                    this.set(
                        'autoSave',
                        autoSave.checked
                    );

                    // If Auto Save was just enabled,
                    // immediately persist the configuration.
                    if (autoSave.checked) {
                        this.save();
                    }
                }
            );
        }


        /*
         * -----------------------------------------
         * BACKGROUND FX
         * -----------------------------------------
         */

        const bgFX = document.getElementById(
            'bg-fx-variant'
        );

        if (bgFX) {

            bgFX.value =
                this.state.bgStyle;

            bgFX.addEventListener(
                'change',
                () => {

                    this.set(
                        'bgStyle',
                        bgFX.value
                    );
                }
            );
        }


        /*
         * -----------------------------------------
         * THEMES
         * -----------------------------------------
         */

        const themeInputs =
            document.querySelectorAll(
                'input[name="ui-theme"]'
            );

        themeInputs.forEach(input => {

            input.checked =
                input.value === this.state.theme;

            input.addEventListener(
                'change',
                () => {

                    if (!input.checked) {
                        return;
                    }

                    this.set(
                        'theme',
                        input.value
                    );
                }
            );
        });


        /*
         * -----------------------------------------
         * CLOAK ENABLE
         * -----------------------------------------
         */

        const cloakToggle =
            document.getElementById(
                'toggle-cloak'
            );

        if (cloakToggle) {

            cloakToggle.checked =
                Boolean(this.state.cloakEnabled);

            cloakToggle.addEventListener(
                'change',
                () => {

                    this.set(
                        'cloakEnabled',
                        cloakToggle.checked
                    );
                }
            );
        }


        /*
         * -----------------------------------------
         * CLOAK TARGET
         * -----------------------------------------
         */

        const cloakTarget =
            document.getElementById(
                'cloak-target-select'
            );

        if (cloakTarget) {

            cloakTarget.value =
                this.state.cloakTarget;

            cloakTarget.addEventListener(
                'change',
                () => {

                    this.set(
                        'cloakTarget',
                        cloakTarget.value
                    );
                }
            );
        }


        /*
         * -----------------------------------------
         * HOTKEY BUTTONS
         * -----------------------------------------
         */

        this.bindHotkey(
            'panic-key-btn',
            'panicKey'
        );

        this.bindHotkey(
            'boss-key-btn',
            'bossKey'
        );

        this.bindHotkey(
            'dev-mode-key-btn',
            'devModeKey'
        );

        this.bindHotkey(
            'quick-settings-key-btn',
            'quickSettingsKey'
        );


        /*
         * -----------------------------------------
         * SIDEBAR NAVIGATION
         * -----------------------------------------
         */

        const navButtons =
            document.querySelectorAll(
                '.nav-btn'
            );

        const sections =
            document.querySelectorAll(
                '.settings-section'
            );

        navButtons.forEach(button => {

            button.addEventListener(
                'click',
                () => {

                    const target =
                        button.dataset.target;

                    if (!target) {
                        return;
                    }

                    navButtons.forEach(btn => {
                        btn.classList.remove(
                            'active'
                        );
                    });

                    sections.forEach(section => {
                        section.classList.remove(
                            'active'
                        );
                    });

                    button.classList.add(
                        'active'
                    );

                    const targetSection =
                        document.getElementById(
                            `panel-${target}`
                        );

                    if (targetSection) {
                        targetSection.classList.add(
                            'active'
                        );
                    }
                }
            );
        });
    }


    /*
     * =========================================================
     * HOTKEY BINDING
     * =========================================================
     */

    bindHotkey(buttonId, stateKey) {

        const button =
            document.getElementById(buttonId);

        if (!button) {
            return;
        }

        this.updateHotkeyButton(
            button,
            this.state[stateKey]
        );

        let listening = false;

        button.addEventListener(
            'click',
            () => {

                if (listening) {
                    return;
                }

                listening = true;

                button.textContent =
                    'Press a key...';

                button.classList.add(
                    'listening'
                );
            }
        );


        const handler = event => {

            if (!listening) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const key =
                event.key;

            if (!key) {
                return;
            }

            this.set(
                stateKey,
                key
            );

            this.updateHotkeyButton(
                button,
                key
            );

            button.classList.remove(
                'listening'
            );

            listening = false;
        };


        document.addEventListener(
            'keydown',
            handler
        );
    }


    updateHotkeyButton(button, key) {

        if (!key) {
            button.textContent =
                'Click to bind';

            return;
        }

        button.textContent =
            this.formatKey(key);
    }


    formatKey(key) {

        const keyNames = {
            ' ': 'Space',
            'Escape': 'Esc',
            'ArrowUp': '↑',
            'ArrowDown': '↓',
            'ArrowLeft': '←',
            'ArrowRight': '→',
            'Control': 'Ctrl',
            'Alt': 'Alt',
            'Shift': 'Shift',
            'Meta': '⌘'
        };

        return keyNames[key] || key;
    }
}
