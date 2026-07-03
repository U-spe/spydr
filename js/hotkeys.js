// js/hotkeys.js
export default class HotkeyManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.isRecording = false;
        this.recordCallback = null;
    }

    init() {
        this.settings = this.kernel.get('settings');
        
        window.addEventListener('keydown', (e) => {
            if (this.isRecording) {
                e.preventDefault();
                if (this.recordCallback) this.recordCallback(e.key);
                return;
            }

            // Fire execution pipeline if key binds cleanly
            if (e.key === this.settings.get('bossKey')) {
                e.preventDefault();
                this.triggerPanicSequence();
            }
        });
    }

    startRecording(onKeyRecorded) {
        this.isRecording = true;
        this.recordCallback = (key) => {
            this.isRecording = false;
            this.recordCallback = null;
            onKeyRecorded(key);
        };
    }

    triggerPanicSequence() {
        // Toggle stealth mode inversion state immediately
        const currentState = this.settings.get('cloakEnabled');
        this.settings.set('cloakEnabled', !currentState);
        
        // Propagate across modules
        const cloak = this.kernel.get('cloak');
        if (cloak) cloak.sync();

        // Instantly update UI toggles so visuals match system state
        const ui = this.kernel.get('ui');
        if (ui) ui.syncFormControls();
    }
}
