(() => {
  "use strict";

  const SPYDR = {
    state: {},
    storageKey: "spydr_settings",

    // =====================
    // DEFAULTS
    // =====================
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

    // =====================
    // STORAGE
    // =====================
    load() {
      try {
        const data = localStorage.getItem(this.storageKey);
        this.state = data ? JSON.parse(data) : this.defaults();
      } catch {
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

      if (key === "theme") this.applyTheme();
      if (key === "cloak") this.applyCloak();
    },

    // =====================
    // THEME
    // =====================
    applyTheme() {
      const theme = this.get("theme");

      document.documentElement.setAttribute("data-theme", theme);

      const accent =
        theme === "dark" ? "#7c3aed" :
        theme === "light" ? "#3b82f6" :
        "#22c55e";

      document.documentElement.style.setProperty("--accent", accent);
    },

    // =====================
    // CLOAK SYSTEM
    // =====================
    applyCloak() {
      const enabled = this.get("cloak");

      document.body.classList.toggle("spydr-cloak", enabled);

      if (enabled) {
        document.title = "Google Docs";
      } else {
        document.title = "Spydr";
      }
    },

    toggleCloak() {
      this.set("cloak", !this.get("cloak"));
    },

    // =====================
    // HOTKEYS
    // =====================
    initHotkeys() {
      document.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        const bossKey = this.get("hotkeys")?.bossKey;

        if (key === bossKey) {
          this.toggleCloak();
        }
      });
    },

    // =====================
    // UI BINDING (settings page)
    // =====================
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

    // =====================
    // INIT
    // =====================
    init() {
      this.load();
      this.applyTheme();
      this.applyCloak();
      this.initHotkeys();
      this.bindUI();

      console.log("[Spydr] core online 🕷️");
    }
  };

  window.SPYDR = SPYDR;

  document.addEventListener("DOMContentLoaded", () => {
    SPYDR.init();
  });

})();
