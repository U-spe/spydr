// js/hotkeys.js
export default class HotkeyManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.isRecording = false;
        this.recordCallback = null;

        // Dev Mode State
        this.devModeActive = false;
        this.devPanel = null;
        this.batteryLevel = 'Calculating...';
    }

    init() {
        this.settings = this.kernel.get('settings');
        
        window.addEventListener('keydown', (e) => {
            if (this.isRecording) {
                e.preventDefault();
                if (this.recordCallback) this.recordCallback(e.key);
                return;
            }

            // Fire execution pipeline if keys bind cleanly
            const pressedKey = e.key;

            switch (pressedKey) {
                case this.settings.get('panicKey'):
                    e.preventDefault();
                    this.triggerPanicSequence();
                    break;

                case this.settings.get('bossKey'):
                    e.preventDefault();
                    this.triggerBossSequence();
                    break;

                case this.settings.get('devModeKey'):
                    e.preventDefault();
                    this.toggleDevMode();
                    break;

                case this.settings.get('quickSettingsKey'):
                    e.preventDefault();
                    this.openQuickSettings();
                    break;
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

    /* =========================
       1. PANIC KEY
    ========================= */
    triggerPanicSequence() {
        // Force cloak settings to Google Classroom profile
        this.settings.set('cloakEnabled', true);
        this.settings.set('cloakTitle', 'Classes');
        this.settings.set('cloakIcon', 'https://ssl.gstatic.com/classroom/favicon.png');
        
        // Propagate across modules immediately
        const cloak = this.kernel.get('cloak');
        if (cloak) cloak.sync();

        // Redirect the current tab to google (State is preserved in localStorage)
        window.location.replace("https://google.com");
    }

    /* =========================
       2. BOSS KEY (Auto-Cloak)
    ========================= */
    triggerBossSequence() {
        // Enables the current user-saved cloak configuration
        this.settings.set('cloakEnabled', true);
        
        // Propagate across modules
        const cloak = this.kernel.get('cloak');
        if (cloak) cloak.sync();

        // Instantly update UI toggles so visuals match system state
        const ui = this.kernel.get('ui');
        if (ui) ui.syncFormControls();
    }

    /* =========================
       3. DEVELOPER MODE
    ========================= */
    toggleDevMode() {
        this.devModeActive = !this.devModeActive;

        if (!this.devPanel) {
            this.buildDevPanel();
        }

        this.devPanel.style.display = this.devModeActive ? 'flex' : 'none';

        if (this.devModeActive) {
            this.startDevMonitor();
        }
    }

    buildDevPanel() {
        this.devPanel = document.createElement('div');
        Object.assign(this.devPanel.style, {
            position: 'fixed',
            bottom: '15px',
            right: '15px',
            backgroundColor: 'rgba(15, 15, 20, 0.9)',
            border: '1px solid #333',
            color: '#00ffcc',
            fontFamily: 'monospace',
            padding: '12px',
            borderRadius: '8px',
            zIndex: '99999',
            fontSize: '12px',
            pointerEvents: 'none',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        });
        document.body.appendChild(this.devPanel);

        // Async fetch battery data
        if (navigator.getBattery) {
            navigator.getBattery().then(batt => {
                const updateBattery = () => {
                    this.batteryLevel = `${Math.round(batt.level * 100)}% ${batt.charging ? '⚡' : ''}`;
                };
                updateBattery();
                batt.addEventListener('levelchange', updateBattery);
                batt.addEventListener('chargingchange', updateBattery);
            });
        } else {
            this.batteryLevel = 'Unsupported';
        }
    }

    startDevMonitor() {
        let lastTime = performance.now();
        let frames = 0;
        
        // Simple regex to grab browser name/version
        const browserData = navigator.userAgent.match(/(firefox|msie|chrome|safari|trident)\/?\s*(\d+)/i) || [];
        const browserString = browserData[1] ? `${browserData[1]} ${browserData[2]}` : 'Unknown';

        const loop = () => {
            if (!this.devModeActive) return; // Stop loop if disabled
            
            const now = performance.now();
            frames++;
            
            // Update panel every 1 second
            if (now >= lastTime + 1000) {
                const fps = frames;
                frames = 0;
                lastTime = now;
                
                this.devPanel.innerHTML = `
                    <div style="color: #fff; border-bottom: 1px solid #333; padding-bottom: 4px; margin-bottom: 4px; font-weight: bold;">SPYDR DEV PANEL</div>
                    <div>FPS: ${fps}</div>
                    <div>BATTERY: ${this.batteryLevel}</div>
                    <div>BROWSER: ${browserString}</div>
                `;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    /* =========================
       4. QUICK SETTINGS
    ========================= */
    openQuickSettings() {
        const ui = this.kernel.get('ui');
        
        // Assuming your UI module has an openSettings() or toggleSettings() method
        if (ui && typeof ui.openSettings === 'function') {
            ui.openSettings();
        } else if (ui && typeof ui.toggleSettings === 'function') {
            ui.toggleSettings();
        } else {
            console.warn('Spydr: openSettings method not found on UI module.');
        }
    }
}
