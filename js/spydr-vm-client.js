/**
 * spydr // VM CONTROL PANEL - ENGINE CLIENT
 * Core driver handling WebSocket signaling, canvas streaming rendering, 
 * proxy configurations, and precise high-performance pointer event mapping.
 */

class SpydrVMClient {
  constructor() {
    // UI Elements Selector bindings
    this.canvas = document.getElementById('vm-render-target');
    this.ctx = this.canvas.getContext('2d');
    this.wrapper = document.getElementById('viewport-canvas-wrapper');
    this.loadingOverlay = document.getElementById('vm-loading');
    this.loadingMsg = document.getElementById('loading-msg');
    this.statusGlow = document.getElementById('status-glow');
    this.statusLabel = document.getElementById('status-label');
    this.targetUrlInput = document.getElementById('target-url');
    this.telePing = document.getElementById('tele-ping');
    this.teleResolution = document.getElementById('tele-resolution');
    this.teleTraffic = document.getElementById('tele-traffic');
    this.teleLog = document.getElementById('tele-log');
    
    // Config Panel Form Controls
    this.selBrowser = document.getElementById('vm-browser');
    this.selPlatform = document.getElementById('vm-platform');
    this.selProxy = document.getElementById('proxy-mode');
    this.selResolution = document.getElementById('vm-resolution');
    this.toggleScaling = document.getElementById('toggle-scaling');
    this.sshConfigPane = document.getElementById('ssh-config-pane');
    
    // Core engine variables
    this.socket = null;
    this.isConnected = false;
    this.virtualWidth = 1920;
    this.virtualHeight = 1080;
    this.scaleToFit = true;
    this.pingInterval = null;
    this.bytesReceived = 0;
    this.bytesSent = 0;
    
    // Setup listeners
    this.initEventListeners();
  }

  initEventListeners() {
    // Initialize & Kill actions
    document.getElementById('btn-init-vm').addEventListener('click', () => this.connect());
    document.getElementById('btn-kill-vm').addEventListener('click', () => this.disconnect());
    document.getElementById('btn-panic').addEventListener('click', () => this.panicKill());
    
    // Setup Navigation URL go action
    document.getElementById('btn-go-url').addEventListener('click', () => this.navigate(this.targetUrlInput.value));
    this.targetUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.navigate(this.targetUrlInput.value);
    });

    // Handle interactive toggle features
    this.selProxy.addEventListener('change', () => this.handleProxyModeChange());
    this.selResolution.addEventListener('change', () => this.handleResolutionChange());
    this.toggleScaling.addEventListener('change', (e) => {
      this.scaleToFit = e.target.checked;
      this.updateCanvasScaling();
    });

    // Custom Utility Overlay controls
    document.getElementById('btn-screenshot').addEventListener('click', () => this.takeScreenshot());
    this.initClipboardHandlers();
    
    // Main UI Input Captures
    this.bindPointerCapture();
    this.bindKeyboardCapture();
    
    // Auto-adjust layout on browser window scaling updates
    window.addEventListener('resize', () => this.updateCanvasScaling());
  }

  /**
   * Triggers the UI to display connection setup phases before building sockets.
   */
  async connect() {
    if (this.isConnected) return;
    this.log('Connecting to remote edge node...', 'info');
    this.setConnectionState('connecting');
    this.showLoading(true, 'Provisioning clean sandbox...');

    // Extracting user options
    const browser = this.selBrowser.value;
    const platform = this.selPlatform.value;
    const proxy = this.selProxy.value;
    
    this.handleResolutionChange();

    // Setup local sandbox socket simulator
    setTimeout(() => {
      this.loadingMsg.textContent = `Spinning up virtual ${browser} on ${platform}...`;
      
      setTimeout(() => {
        this.establishWebSocketConnection(browser, platform, proxy);
      }, 800);
    }, 600);
  }

  /**
   * Standard connection logic to coordinate packets to/from remote VM rendering pipe.
   */
  establishWebSocketConnection(browser, platform, proxy) {
    // Simulate connection loop back
    this.isConnected = true;
    this.setConnectionState('online');
    this.showLoading(false);
    this.log(`Successfully mapped socket stream via tunnel [${proxy}]`, 'success');
    
    // Apply UI state modifiers
    document.getElementById('btn-init-vm').classList.add('hidden');
    document.getElementById('btn-kill-vm').classList.remove('hidden');

    // Launch dummy telemetry values
    this.runMockDiagnostics();
    this.drawVMPlaceholder();
  }

  /**
   * Stops simulation, clears streams, and reverts controls to default states.
   */
  disconnect() {
    if (!this.isConnected) return;
    this.log('Tearing down active instance...', 'info');
    
    clearInterval(this.pingInterval);
    this.isConnected = false;
    this.setConnectionState('offline');
    this.bytesSent = 0;
    this.bytesReceived = 0;

    // Redraw empty landing canvas state
    const ctx = this.ctx;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    document.getElementById('btn-init-vm').classList.remove('hidden');
    document.getElementById('btn-kill-vm').classList.add('hidden');
    this.telePing.textContent = '-- ms';
    this.teleTraffic.textContent = `IN: 0.00 KB | OUT: 0.00 KB`;
    this.log('VM session destroyed cleanly.', 'info');
  }

  /**
   * The panic-switch logic: zero-out virtual buffers, purge active credentials instantly.
   */
  panicKill() {
    this.log('PANIC INITIATED. PURGING CLIENT CREDENTIALS...', 'error');
    this.disconnect();
    this.targetUrlInput.value = '';
    // Optional redirection / DOM scrubbing to prevent digital footprints
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#ff0055;font-family:monospace;font-size:1.5rem;">
        [SPYDR PANIC TRIPPED] CLIENT ENGINE SANITIZED AND DESTROYED.
      </div>
    `;
  }

  /**
   * Maps navigation target events inside the active sandboxed environment.
   */
  navigate(url) {
    if (!url) return;
    if (!this.isConnected) {
      this.log('Cannot load target. Establish VM session first.', 'error');
      return;
    }
    this.log(`Navigating remote browser target: ${url}`, 'info');
    this.sendPacket('navigation', { url });
    
    // Simulating remote site load frame updates
    this.showLoading(true, `Navigating to ${url}...`);
    setTimeout(() => {
      this.showLoading(false);
      this.drawVMPlaceholder(url);
    }, 1000);
  }

  /**
   * Translates local cursor event metrics into matching coordinate inputs for virtual screen aspect ratios.
   */
  bindPointerCapture() {
    const handlePointer = (e, actionType) => {
      if (!this.isConnected) return;

      const rect = this.canvas.getBoundingClientRect();
      
      // 1. Find raw relative viewport offset ratios
      const xRatio = (e.clientX - rect.left) / rect.width;
      const yRatio = (e.clientY - rect.top) / rect.height;

      // 2. Project coordinates directly to virtual VM aspect scale
      const virtualX = Math.round(xRatio * this.virtualWidth);
      const virtualY = Math.round(yRatio * this.virtualHeight);

      // Keep coordinates bounded
      const finalX = Math.max(0, Math.min(this.virtualWidth, virtualX));
      const finalY = Math.max(0, Math.min(this.virtualHeight, virtualY));

      this.sendPacket('pointer', {
        type: actionType,
        x: finalX,
        y: finalY,
        button: e.button || 0,
        buttons: e.buttons || 0
      });

      // Quick visual interaction trail inside the engine debug bar
      this.teleLog.textContent = `Pointer ${actionType} at (${finalX}, ${finalY})`;
    };

    this.canvas.addEventListener('mousemove', (e) => handlePointer(e, 'move'));
    this.canvas.addEventListener('mousedown', (e) => {
      this.canvas.focus();
      handlePointer(e, 'down');
    });
    this.canvas.addEventListener('mouseup', (e) => handlePointer(e, 'up'));
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  /**
   * Listens to user keyboard hooks and formats packets to replicate inputs in the virtual sandboxed OS.
   */
  bindKeyboardCapture() {
    this.canvas.addEventListener('keydown', (e) => {
      if (!this.isConnected) return;
      e.preventDefault(); // Stop standard page operations like arrow scrolling

      this.sendPacket('keyboard', {
        type: 'down',
        key: e.key,
        code: e.code,
        ctrl: e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey,
        meta: e.metaKey
      });
      this.log(`Keyboard input capture: ${e.key} down`, 'info');
    });

    this.canvas.addEventListener('keyup', (e) => {
      if (!this.isConnected) return;
      this.sendPacket('keyboard', {
        type: 'up',
        key: e.key,
        code: e.code
      });
    });
  }

  /**
   * Direct text pipeline configuration to read/write clipboard contents across the virtual screen boundary.
   */
  initClipboardHandlers() {
    const modal = document.getElementById('modal-clipboard');
    const clipInput = document.getElementById('clip-text');

    document.getElementById('btn-clipboard').addEventListener('click', () => {
      modal.classList.remove('hidden');
      clipInput.focus();
    });

    document.getElementById('btn-close-clip').addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    document.getElementById('btn-clip-write').addEventListener('click', () => {
      const text = clipInput.value;
      this.sendPacket('clipboard_sync', { text });
      this.log('Local clipboard buffer piped to VM engine.', 'success');
      modal.classList.add('hidden');
    });

    document.getElementById('btn-clip-read').addEventListener('click', () => {
      // Send a pull request to simulated VM clipboard, read callback simulated below
      clipInput.value = "SIMULATED_REMOTE_BUFFER: " + this.targetUrlInput.value;
      this.log('Pulled VM clipboard contents successfully.', 'info');
    });
  }

  /**
   * Handles dropdown and form state changes for proxy selection.
   */
  handleProxyModeChange() {
    const selectedMode = this.selProxy.value;
    this.log(`Proxy target mode updated: ${selectedMode}`, 'info');

    if (selectedMode === 'ssh-tunnel') {
      this.sshConfigPane.classList.remove('hidden');
    } else {
      this.sshConfigPane.classList.add('hidden');
    }
  }

  /**
   * Modifies the internal resolution tracking metrics and resizes the target canvas buffer.
   */
  handleResolutionChange() {
    const resString = this.selResolution.value;
    const [w, h] = resString.split('x').map(Number);
    
    this.virtualWidth = w;
    this.virtualHeight = h;
    this.canvas.width = w;
    this.canvas.height = h;

    this.teleResolution.textContent = `${w}×${h}`;
    this.updateCanvasScaling();
    
    if (this.isConnected) {
      this.sendPacket('resize', { width: w, height: h });
      this.drawVMPlaceholder();
    }
  }

  /**
   * Rescales the canvas layout automatically depending on screen space limits and fit preferences.
   */
  updateCanvasScaling() {
    if (this.scaleToFit) {
      this.canvas.style.width = '100%';
      this.canvas.style.height = 'auto';
      this.canvas.style.objectFit = 'contain';
    } else {
      this.canvas.style.width = `${this.virtualWidth}px`;
      this.canvas.style.height = `${this.virtualHeight}px`;
      this.canvas.style.objectFit = 'none';
    }
  }

  /**
   * Encapsulates transmission data formats, updating diagnostic telemetry metrics with each transaction.
   */
  sendPacket(event, payload) {
    const packetStr = JSON.stringify({ event, payload, timestamp: Date.now() });
    
    // Telemetry billing calculations
    this.bytesSent += packetStr.length;
    this.updateTelemetryMetrics();

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(packetStr);
    }
  }

  /**
   * Renders a mock web interface on the virtual display for visual feedback.
   */
  drawVMPlaceholder(urlValue = "") {
    if (!this.isConnected) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const url = urlValue || this.targetUrlInput.value;

    // Paint backgrounds
    ctx.fillStyle = '#14161f';
    ctx.fillRect(0, 0, w, h);

    // Simulated OS Top Bar
    ctx.fillStyle = '#1e212b';
    ctx.fillRect(0, 0, w, 40);

    // Tab buttons
    ctx.fillStyle = '#2d3142';
    ctx.fillRect(10, 8, 180, 24);
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px Space Grotesk';
    ctx.fillText(`${url.substring(0, 25)}...`, 20, 24);

    // Browser Sandbox Window Body Container
    ctx.fillStyle = '#1b1d26';
    ctx.fillRect(20, 60, w - 40, h - 100);

    // Mock Content Layout
    ctx.fillStyle = '#00ff88';
    ctx.font = '16px Space Grotesk';
    ctx.fillText(`spydr // virtual sandbox browser active`, 40, 100);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px JetBrains Mono';
    ctx.fillText(`Target URL: ${url}`, 40, 130);
    ctx.fillText(`Platform: ${this.selPlatform.value.toUpperCase()}`, 40, 150);
    ctx.fillText(`Routing Node: ${this.selProxy.value.toUpperCase()}`, 40, 170);

    // Simulated UI Frame updates
    this.bytesReceived += (w * h * 0.1); // Add virtual incoming video stream size
  }

  /**
   * Mock runtime monitoring metrics to output interactive networking telemetry without an external API.
   */
  runMockDiagnostics() {
    this.pingInterval = setInterval(() => {
      // Simulate real-time signal variances
      const ping = Math.floor(Math.random() * 32) + 8; 
      this.telePing.textContent = `${ping} ms`;

      // Simulating minor incoming traffic
      this.bytesReceived += Math.floor(Math.random() * 1024) + 256;
      this.updateTelemetryMetrics();
    }, 1500);
  }

  updateTelemetryMetrics() {
    const incomingKb = (this.bytesReceived / 1024).toFixed(2);
    const outgoingKb = (this.bytesSent / 1024).toFixed(2);
    this.teleTraffic.textContent = `IN: ${incomingKb} KB | OUT: ${outgoingKb} KB`;
  }

  /**
   * Generates a downloadable snapshot from the active sandbox drawing stream buffer.
   */
  takeScreenshot() {
    if (!this.isConnected) {
      this.log('Initialization required to capture snapshots.', 'error');
      return;
    }
    this.log('Capturing sandbox screen frame...', 'info');
    
    // Transform rendering context to image object
    const dataUrl = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `spydr-vm-screenshot-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    
    this.log('Snapshot file exported successfully.', 'success');
  }

  /**
   * Controls system dashboard loader panels.
   */
  showLoading(visible, text = '') {
    if (visible) {
      this.loadingOverlay.classList.remove('hidden');
      if (text) this.loadingMsg.textContent = text;
    } else {
      this.loadingOverlay.classList.add('hidden');
    }
  }

  /**
   * Modifies live upper layout glow rings.
   */
  setConnectionState(state) {
    this.statusGlow.className = 'status-indicator';
    this.statusGlow.classList.add(state);
    this.statusLabel.textContent = state.toUpperCase();
  }

  /**
   * Internal telemetry message logs
   */
  log(message, type = 'info') {
    const time = new Date().toLocaleTimeString();
    this.teleLog.textContent = `[${time}] ${message}`;
    
    // Style terminal text depending on output category
    if (type === 'error') {
      this.teleLog.style.color = 'var(--color-danger)';
    } else if (type === 'success') {
      this.teleLog.style.color = 'var(--color-accent)';
    } else {
      this.teleLog.style.color = 'var(--color-accent-blue)';
    }
  }
}

// Instantiate engine client on document ready
document.addEventListener('DOMContentLoaded', () => {
  window.SpydrEngine = new SpydrVMClient();
});
