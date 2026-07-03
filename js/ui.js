// js/ui.js
export default class UIManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.dom = {};
    }

    init() {
        this.settings = this.kernel.get('settings');
        this.cacheElements();
        this.bindEvents();
        this.syncFormControls();
    }

    cacheElements() {
        this.dom.navButtons = document.querySelectorAll('.nav-btn');
        this.dom.sections = document.querySelectorAll('.settings-section');
        
        this.dom.toggleAutosave = document.getElementById('toggle-autosave');
        this.dom.toggleStars = document.getElementById('toggle-stars');
        this.dom.themeRadios = document.querySelectorAll('input[name="ui-theme"]');
        this.dom.accentRadios = document.querySelectorAll('input[name="accent-color"]');
        this.dom.bgStyleSelect = document.getElementById('bg-style-select');
        this.dom.bossKeyBtn = document.getElementById('boss-key-btn');
        this.dom.toggleCloak = document.getElementById('toggle-cloak');
        this.dom.cloakTargetSelect = document.getElementById('cloak-target-select');
    }

    bindEvents() {
        // Navigation Switch System logic (Safeguarded with optional chaining to prevent crashes)
        this.dom.navButtons?.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                this.switchTab(target);
            });
        });

        // Config mutations wiring
        this.dom.toggleAutosave?.addEventListener('change', (e) => {
            this.settings.set('autoSave', e.target.checked);
        });

        this.dom.toggleStars?.addEventListener('change', (e) => {
            this.settings.set('starsEnabled', e.target.checked);
        });

        this.dom.themeRadios?.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.set('theme', e.target.value);
            });
        });

        this.dom.accentRadios?.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.set('accent', e.target.value);
            });
        });

        this.dom.bgStyleSelect?.addEventListener('change', (e) => {
            this.settings.set('bgStyle', e.target.value);
        });

        this.dom.toggleCloak?.addEventListener('change', (e) => {
            this.settings.set('cloakEnabled', e.target.checked);
        });

        this.dom.cloakTargetSelect?.addEventListener('change', (e) => {
            this.settings.set('cloakTarget', e.target.value);
        });

        // Hotkey binding capture trigger
        if (this.dom.bossKeyBtn) {
            this.dom.bossKeyBtn.addEventListener('click', () => {
                this.dom.bossKeyBtn.textContent = 'PRESS ANY KEY...';
                this.dom.bossKeyBtn.classList.add('recording');
                
                this.kernel.get('hotkeys').startRecording((recordedKey) => {
                    this.settings.set('bossKey', recordedKey);
                    this.dom.bossKeyBtn.textContent = recordedKey === ' ' ? 'Space' : recordedKey;
                    this.dom.bossKeyBtn.classList.remove('recording');
                });
            });
        }

        // Pipeline listener registration hooks
        this.settings.subscribe((key, val) => this.handleExternalStateChange(key, val));
    }

    switchTab(tabId) {
        this.dom.navButtons?.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === tabId);
        });
        this.dom.sections?.forEach(section => {
            section.classList.toggle('active', section.id === `panel-${tabId}`);
        });
    }

    syncFormControls() {
        if (this.dom.toggleAutosave) this.dom.toggleAutosave.checked = this.settings.get('autoSave');
        if (this.dom.toggleStars) this.dom.toggleStars.checked = this.settings.get('starsEnabled');
        if (this.dom.bgStyleSelect) this.dom.bgStyleSelect.value = this.settings.get('bgStyle');
        if (this.dom.toggleCloak) this.dom.toggleCloak.checked = this.settings.get('cloakEnabled');
        if (this.dom.cloakTargetSelect) this.dom.cloakTargetSelect.value = this.settings.get('cloakTarget');
        
        const currentKey = this.settings.get('bossKey');
        if (this.dom.bossKeyBtn) {
            this.dom.bossKeyBtn.textContent = currentKey === ' ' ? 'Space' : currentKey;
        }

        this.dom.themeRadios?.forEach(radio => {
            radio.checked = (radio.value === this.settings.get('theme'));
        });

        this.dom.accentRadios?.forEach(radio => {
            radio.checked = (radio.value === this.settings.get('accent'));
        });
    }

    handleExternalStateChange(key, val) {
        // Cross execution reactive handling pipelines
        const themeMgr = this.kernel.get('theme');
        const cloakMgr = this.kernel.get('cloak');

        switch(key) {
            case 'theme':
                if (themeMgr) themeMgr.applyTheme(val);
                break;
            case 'accent':
                if (themeMgr) themeMgr.applyAccent(val);
                break;
            case 'bgStyle':
                if (themeMgr) themeMgr.applyBgStyle(val);
                break;
            case 'starsEnabled':
                if (themeMgr) themeMgr.toggleStars(val);
                break;
            case 'cloakEnabled':
            case 'cloakTarget':
                if (cloakMgr) cloakMgr.sync();
                if (this.dom.toggleCloak) {
                    this.dom.toggleCloak.checked = this.settings.get('cloakEnabled');
                }
                break;
        }
    }
}
