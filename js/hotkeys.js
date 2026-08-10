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

            const panicKey = this.settings.get('panicKey') || '`';
            const bossKey = this.settings.get('bossKey') || 'Escape';
            const devKey = this.settings.get('devModeKey') || 'F4';
            const quickSettingsKey = this.settings.get('quickSettingsKey') || 'F9';

            switch (e.key) {
                case panicKey:
                    e.preventDefault();
                    this.triggerPanicSequence();
                    break;
                case bossKey:
                    e.preventDefault();
                    this.triggerBossSequence();
                    break;
                case devKey:
                    e.preventDefault();
                    this.toggleDevMode();
                    break;
                case quickSettingsKey:
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

    triggerPanicSequence() {
        this.settings.set('cloakEnabled', true);
        this.settings.set('cloakTitle', 'Classes');
        this.settings.set('cloakIcon', 'https://ssl.gstatic.com/classroom/favicon.png');
        
        const cloak = this.kernel.get('cloak');
        if (cloak) cloak.sync();

        window.location.replace("https://google.com");
    }

    triggerBossSequence() {
        this.settings.set('cloakEnabled', true);
        
        const cloak = this.kernel.get('cloak');
        if (cloak) cloak.sync();

        const ui = this.kernel.get('ui');
        if (ui) ui.syncFormControls();
    }

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
            position: 'fixed', bottom: '15px', right: '15px',
            backgroundColor: 'rgba(15, 15, 20, 0.9)', border: '1px solid #333',
            color: '#00ffcc', fontFamily: 'monospace', padding: '12px',
            borderRadius: '8px', zIndex: '99999', fontSize: '12px',
            pointerEvents: 'none', display: 'none', flexDirection: 'column', gap: '5px'
        });
        document.body.appendChild(this.devPanel);

        if (navigator.getBattery) {
            navigator.getBattery().then(batt => {
                const updateBattery = () => { this.batteryLevel = `${Math.round(batt.level * 100)}% ${batt.charging ? '⚡' : ''}`; };
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
        const browserData = navigator.userAgent.match(/(firefox|msie|chrome|safari|trident)\/?\s*(\d+)/i) || [];
        const browserString = browserData[1] ? `${browserData[1]} ${browserData[2]}` : 'Unknown';

        const loop = () => {
            if (!this.devModeActive) return; 
            const now = performance.now();
            frames++;
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

    openQuickSettings() {
        const ui = this.kernel.get('ui');
        // Toggle the Quick Settings UI here (Update logic based on how your app opens settings)
        if (ui && typeof ui.openSettings === 'function') {
            ui.openSettings();
        } else {
            // Fallback for standalone control panel: switch to general tab
            if (ui) ui.switchTab('general');
        }
    }
}
