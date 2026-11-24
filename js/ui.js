// js/ui.js
export default class UIManager {
  constructor(kernel) { this.kernel = kernel; this.dom = {}; }

  init() {
    this.settings = this.kernel.get("settings");
    this.cacheElements();
    this.bindEvents();
    this.syncFormControls();
    this.buildQuickSettings();
    this.settings.subscribe((key, value) => this.handleExternalStateChange(key, value));
  }

  cacheElements() {
    this.dom.navButtons = document.querySelectorAll(".nav-btn");
    this.dom.sections = document.querySelectorAll(".settings-section");
    this.dom.toggleAutosave = document.getElementById("toggle-autosave");
    this.dom.toggleStars = document.getElementById("toggle-stars");
    this.dom.themeRadios = document.querySelectorAll('input[name="ui-theme"]');
    this.dom.bgStyleSelect = document.getElementById("bg-fx-variant");
    this.dom.videoBackgroundSelect = document.getElementById("video-background-select");
    this.dom.cloakToggle = document.getElementById("cloak-toggle-button");
    this.dom.cloakTargetSelect = document.getElementById("cloak-target-select");
    this.dom.hotkeys = {
      panicKey: document.getElementById("panic-key-btn"),
      bossKey: document.getElementById("boss-key-btn"),
      devModeKey: document.getElementById("dev-mode-key-btn"),
      quickSettingsKey: document.getElementById("quick-settings-key-btn")
    };
  }

  bindEvents() {
    this.dom.navButtons.forEach(button => button.addEventListener("click", () => this.switchTab(button.dataset.target)));
    this.dom.toggleAutosave?.addEventListener("change", event => this.settings.set("autoSave", event.target.checked));
    this.dom.toggleStars?.addEventListener("change", event => this.settings.set("starsEnabled", event.target.checked));
    this.dom.themeRadios.forEach(radio => radio.addEventListener("change", event => {
      this.settings.set("bgStyle", "theme");
      if (this.dom.bgStyleSelect) this.dom.bgStyleSelect.value = "theme";
      this.settings.set("theme", event.target.value);
    }));
    this.dom.bgStyleSelect?.addEventListener("change", event => this.settings.set("bgStyle", event.target.value));
    this.dom.videoBackgroundSelect?.addEventListener("change", event => this.settings.set("videoBackground", event.target.value));
    this.dom.cloakToggle?.addEventListener("click", () => this.settings.set("cloakEnabled", !this.settings.get("cloakEnabled")));
    this.dom.cloakTargetSelect?.addEventListener("change", event => this.settings.set("cloakTarget", event.target.value));

    Object.entries(this.dom.hotkeys).forEach(([settingName, element]) => {
      if (!element) return;
      element.addEventListener("click", () => {
        element.textContent = "PRESS ANY KEY...";
        element.classList.add("recording");
        this.kernel.get("hotkeys").startRecording(key => {
          this.settings.set(settingName, key);
          element.textContent = key === " " ? "Space" : key;
          element.classList.remove("recording");
        });
      });
    });

    document.getElementById("export-settings")?.addEventListener("click", () => this.exportSettings());
    document.getElementById("import-settings")?.addEventListener("click", () => document.getElementById("import-settings-file")?.click());
    document.getElementById("import-settings-file")?.addEventListener("change", event => this.importSettings(event.target.files?.[0]));
    document.getElementById("reset-settings")?.addEventListener("click", () => {
      if (!confirm("Reset all SPYDR settings on this device?")) return;
      this.settings.reset();
      location.reload();
    });
  }

  switchTab(tabId) {
    this.dom.navButtons.forEach(button => button.classList.toggle("active", button.dataset.target === tabId));
    this.dom.sections.forEach(section => section.classList.toggle("active", section.id === `panel-${tabId}`));
  }

  syncFormControls() {
    if (this.dom.toggleAutosave) this.dom.toggleAutosave.checked = !!this.settings.get("autoSave");
    if (this.dom.toggleStars) this.dom.toggleStars.checked = this.settings.get("starsEnabled") !== false;
    if (this.dom.bgStyleSelect) this.dom.bgStyleSelect.value = this.settings.get("bgStyle") || "stars";
    if (this.dom.videoBackgroundSelect) this.dom.videoBackgroundSelect.value = this.settings.get("videoBackground") || "none";
    if (this.dom.cloakTargetSelect) this.dom.cloakTargetSelect.value = this.settings.get("cloakTarget") || "spydr";
    this.syncCloakButton();
    const format = key => key === " " ? "Space" : key || "Not set";
    Object.entries(this.dom.hotkeys).forEach(([name, element]) => { if (element) element.textContent = format(this.settings.get(name)); });
    this.dom.themeRadios.forEach(radio => { radio.checked = radio.value === this.settings.get("theme"); });
  }

  syncCloakButton() {
    if (!this.dom.cloakToggle) return;
    const enabled = !!this.settings.get("cloakEnabled");
    this.dom.cloakToggle.setAttribute("aria-pressed", String(enabled));
    this.dom.cloakToggle.innerHTML = `<i class="${enabled ? "ri-eye-off-line" : "ri-eye-line"}"></i><span>${enabled ? "Disable" : "Enable"}</span>`;
    this.dom.cloakToggle.classList.toggle("is-active", enabled);
  }

  handleExternalStateChange(key, value) {
    const theme = this.kernel.get("theme");
    const cloak = this.kernel.get("cloak");
    if (key === "theme") theme?.applyTheme(value);
    if (key === "bgStyle") theme?.applyBgStyle(value);
    if (key === "videoBackground") theme?.applyVideoBackground(value);
    if (key === "starsEnabled") theme?.toggleStars(value);
    if (key === "cloakEnabled" || key === "cloakTarget") {
      cloak?.sync();
      this.syncCloakButton();
    }
    if (key === "reset") this.syncFormControls();
    this.syncQuickSettings();
  }

  buildQuickSettings() {
    if (document.getElementById("spydr-quick-panel")) return;
    const panel = document.createElement("aside");
    panel.id = "spydr-quick-panel";
    panel.innerHTML = `
      <div class="quick-panel-backdrop" data-quick-close></div>
      <section class="quick-panel-card" role="dialog" aria-modal="true" aria-labelledby="quick-panel-title">
        <header><div><span class="quick-panel-kicker">SPYDR</span><h2 id="quick-panel-title">Quick Settings</h2></div><button type="button" class="quick-close" aria-label="Close Quick Settings" data-quick-close><i class="ri-close-line"></i></button></header>
        <div class="quick-panel-grid">
          <button type="button" class="quick-tile" id="quick-cloak"><i class="ri-eye-line"></i><span>Tab appearance</span><strong>Off</strong></button>
          <label class="quick-control"><span><i class="ri-palette-line"></i> Theme</span><select id="quick-theme"></select></label>
          <label class="quick-control"><span><i class="ri-sparkling-line"></i> Background</span><select id="quick-bg"><option value="none">Off</option><option value="stars">Stars</option><option value="fog">Fog</option><option value="gradient">Gradient</option><option value="theme">Theme effects</option></select></label>
          <button type="button" class="quick-tile" id="quick-stars"><i class="ri-star-line"></i><span>Star particles</span><strong>On</strong></button>
          <button type="button" class="quick-tile" id="quick-autosave"><i class="ri-save-3-line"></i><span>Auto save</span><strong>On</strong></button>
        </div>
        <footer><span>Changes save on this device.</span><button type="button" id="quick-open-settings">Open Settings <i class="ri-arrow-right-line"></i></button></footer>
      </section>`;
    document.body.appendChild(panel);
    const themeSelect = panel.querySelector("#quick-theme");
    const themes = this.kernel.get("theme")?.getAllThemes() || {};
    Object.entries(themes).forEach(([key, theme]) => {
      const option = document.createElement("option"); option.value = key; option.textContent = theme.name || key; themeSelect.appendChild(option);
    });
    const custom = document.createElement("option"); custom.value = "custom"; custom.textContent = "Custom"; themeSelect.appendChild(custom);
    panel.querySelectorAll("[data-quick-close]").forEach(el => el.addEventListener("click", () => this.closeQuickSettings()));
    panel.querySelector("#quick-cloak").addEventListener("click", () => this.settings.set("cloakEnabled", !this.settings.get("cloakEnabled")));
    panel.querySelector("#quick-stars").addEventListener("click", () => this.settings.set("starsEnabled", this.settings.get("starsEnabled") === false));
    panel.querySelector("#quick-autosave").addEventListener("click", () => this.settings.set("autoSave", !this.settings.get("autoSave")));
    themeSelect.addEventListener("change", event => this.settings.set("theme", event.target.value));
    panel.querySelector("#quick-bg").addEventListener("change", event => this.settings.set("bgStyle", event.target.value));
    panel.querySelector("#quick-open-settings").addEventListener("click", () => { this.closeQuickSettings(); location.href = "/settings.html"; });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && panel.classList.contains("open")) this.closeQuickSettings(); });
    this.quickPanel = panel;
    this.syncQuickSettings();
  }

  syncQuickSettings() {
    const panel = this.quickPanel || document.getElementById("spydr-quick-panel");
    if (!panel) return;
    const setTile = (id, enabled, onText = "On", offText = "Off") => {
      const button = panel.querySelector(id); if (!button) return;
      button.classList.toggle("active", enabled);
      button.querySelector("strong").textContent = enabled ? onText : offText;
    };
    setTile("#quick-cloak", !!this.settings.get("cloakEnabled"));
    setTile("#quick-stars", this.settings.get("starsEnabled") !== false);
    setTile("#quick-autosave", !!this.settings.get("autoSave"));
    const theme = panel.querySelector("#quick-theme"); if (theme) theme.value = this.settings.get("theme") || "spydr";
    const bg = panel.querySelector("#quick-bg"); if (bg) bg.value = this.settings.get("bgStyle") || "stars";
  }

  openQuickSettings() {
    this.quickPanel?.classList.add("open");
    this.syncQuickSettings();
    this.quickPanel?.querySelector(".quick-close")?.focus();
  }
  closeQuickSettings() { this.quickPanel?.classList.remove("open"); }
  openSettings() { this.openQuickSettings(); }

  exportSettings() {
    const data = JSON.stringify(this.settings.state, null, 2);
    const url = URL.createObjectURL(new Blob([data], {type:"application/json"}));
    const link = document.createElement("a"); link.href = url; link.download = "spydr-settings.json"; link.click();
    URL.revokeObjectURL(url);
  }

  async importSettings(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("That file is not a SPYDR settings backup.");
      const defaults = this.settings.createDefaultState();
      const next = {...defaults, ...parsed, customTheme:{...defaults.customTheme, ...(parsed.customTheme || {})}};
      const validThemes = new Set([...Object.keys(this.kernel.get("theme")?.getAllThemes() || {}), "custom"]);
      if (!validThemes.has(next.theme)) next.theme = defaults.theme;
      if (!["none","stars","fog","gradient","theme"].includes(next.bgStyle)) next.bgStyle = defaults.bgStyle;
      if (!["none","v1-b","v2-b","v3-b","v4-b","v5-b","v6-b"].includes(next.videoBackground)) next.videoBackground = "none";
      this.settings.state = next; this.settings.save(); location.reload();
    } catch (error) { alert(error.message || "Could not import that settings file."); }
  }
}
