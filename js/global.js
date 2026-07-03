(() => {
  "use strict";

  const SPYDR = {
    state: {},
    listeners: {},

    // =========================
    // 💾 STORAGE CORE
    // =========================
    storageKey: "spydr_settings",

    defaults() {
      return {
        stars: true,
        autoSave: true,
        theme: "dark",
        cloak: false,
        abMode: "A",
        hotkeys: {
          bossKey: "`"
        }
      };
    },

    load() {
      try {
        const saved = localStorage.getItem(this.storageKey);
        this.state = saved ? JSON.parse(saved) : this.defaults();
      } catch (e) {
        console.warn("Spydr settings failed to load, resetting.");
        this.state = this.defaults();
      }
    },

    save() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    },

    get(key) {
      return this.state[key];
    },

    set(key, value) {
      this.state[key] = value;
      this.save();
      this.emit("change", { key, value });
    },

    // =========================
    // 📡 EVENT SYSTEM
    // =========================
    on(event, fn) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(fn);
    },

    emit(event, data) {
      (this.listeners[event] || []).forEach(fn => fn(data));
    },

    // =========================
    // 🎨 THEME SYSTEM
    // =========================
    applyTheme() {
      const theme = this.get("theme");

      document.documentElement.setAttribute("data-theme", theme);

      const accent =
        theme === "dark" ? "#7c3aed" :
        theme === "light" ? "#3b82f6" :
        "#22c55e";

      document.documentElement.style.setProperty("--accent", accent);
    },

    // =========================
    // 🕶️ CLOAK SYSTEM
    // =========================
    applyCloak() {
      const enabled = this.get("cloak");

      document.body.classList.toggle("spydr-cloak", enabled);

      if (enabled) {
        document.title = "Google Docs";
        this.fakeIcon();
      } else {
        document.title = "Spydr";
        this.restoreIcon();
      }
    },

    fakeIcon() {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = "https://www.google.com/favicon.ico";
    },

    restoreIcon() {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) return;
      link.href = "/favicon.ico";
    },

    toggleCloak() {
      this.set("cloak", !this.get("cloak"));
      this.applyCloak();
    },

    // =========================
    // ⌨️ HOTKEY SYSTEM
    // =========================
    initHotkeys() {
      document.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();

        const bossKey = this.get("hotkeys").bossKey;

        if (key === bossKey) {
          this.toggleCloak();
        }
      });
    },

    // =========================
    // 🧩 UI BINDING
    // =========================
    bindUI() {
      const stars = document.getElementById("starsToggle");
      const autoSave = document.getElementById("autoSaveToggle");

      if (stars) {
        stars.checked = this.get("stars");
        stars.addEventListener("change", () => {
          this.set("stars", stars.checked);
        });
      }

      if (autoSave) {
        autoSave.checked = this.get("autoSave");
        autoSave.addEventListener("change", () => {
          this.set("autoSave", autoSave.checked);
        });
      }
    },

    // =========================
    // 🚀 INIT
    // =========================
    init() {
      this.load();

      this.applyTheme();
      this.applyCloak();
      this.initHotkeys();
      this.bindUI();

      console.log("[Spydr] global system online 🕷️");
    }
  };

  // expose globally
  window.SPYDR = SPYDR;

  document.addEventListener("DOMContentLoaded", () => {
    SPYDR.init();
  });

})();
