(() => {
  "use strict";

  const container = document.getElementById("global-menu");
  const embedded = new URLSearchParams(location.search).get("embed") === "1";
  const current = location.pathname.replace(/\/$/, "") || "/";

  if (!embedded && container) {
    const pages = [
      { icon: "ri-home-4-line", title: "Home", page: "/" },
      { icon: "ri-gamepad-line", title: "Games", page: "/lessons.html" },
      { icon: "ri-apps-2-line", title: "Apps", page: "/flashcards.html" },
      { icon: "ri-global-line", title: "Browser", page: "/search.html" },
      { icon: "ri-sparkling-2-line", title: "AI", page: "/study.html" },
      { icon: "ri-message-3-line", title: "Chat", page: "/review.html" },
      { icon: "ri-settings-3-line", title: "Settings", page: "/settings.html" }
    ];

    const nav = document.createElement("nav");
    nav.className = "dock";
    nav.setAttribute("aria-label", "Main navigation");

    for (const item of pages) {
      const link = document.createElement("a");
      link.href = item.page;
      link.dataset.title = item.title;
      link.setAttribute("aria-label", item.title);
      link.title = item.title;

      if (current === item.page || (item.page === "/" && current === "/index.html")) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }

      const icon = document.createElement("i");
      icon.className = item.icon;
      icon.setAttribute("aria-hidden", "true");
      link.appendChild(icon);
      nav.appendChild(link);
    }

    container.replaceChildren(nav);

    const keys = {
      "1": "/",
      "2": "/lessons.html",
      "3": "/flashcards.html",
      "4": "/search.html",
      "5": "/study.html",
      "6": "/review.html",
      "7": "/settings.html"
    };

    document.addEventListener("keydown", event => {
      if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target && /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;

      const page = keys[event.key];
      if (!page) return;

      event.preventDefault();
      location.assign(page);
    });
  }

  // The full AI page and its iframe instance do not need another launcher.
  if (embedded || current === "/study.html" || document.getElementById("venomous-page-widget")) return;

  const styles = document.createElement("style");
  styles.textContent = `
    #venomous-page-widget {
      position: fixed;
      right: 22px;
      bottom: 96px;
      z-index: 8500;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      pointer-events: none;
      font-family: "Space Grotesk", system-ui, sans-serif;
    }

    #venomous-page-widget button {
      font: inherit;
    }

    #venomous-page-widget .venomous-launcher {
      width: 54px;
      height: 54px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 18px;
      color: #fff;
      background: linear-gradient(145deg, #29252f, #111114);
      box-shadow: 0 10px 34px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.12);
      cursor: pointer;
      pointer-events: auto;
      transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
    }

    #venomous-page-widget .venomous-launcher:hover {
      transform: translateY(-2px);
      border-color: rgba(174,150,255,.58);
      box-shadow: 0 12px 38px rgba(0,0,0,.5), 0 0 24px rgba(124,58,237,.18);
    }

    #venomous-page-widget .venomous-launcher i {
      font-size: 25px;
    }

    #venomous-page-widget .venomous-panel {
      width: min(460px, calc(100vw - 32px));
      height: min(740px, calc(100dvh - 150px));
      min-height: 420px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,.14);
      border-radius: 18px;
      background: #09090b;
      box-shadow: 0 24px 90px rgba(0,0,0,.58);
      pointer-events: auto;
      transform-origin: bottom right;
      animation: venomous-panel-in .18s cubic-bezier(.2,.8,.2,1) both;
    }

    #venomous-page-widget .venomous-panel[hidden] {
      display: none;
    }

    #venomous-page-widget .venomous-panel-bar {
      height: 42px;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 13px;
      border-bottom: 1px solid rgba(255,255,255,.09);
      color: #f3f1f8;
      background: #111114;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: .02em;
    }

    #venomous-page-widget .venomous-panel-bar span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    #venomous-page-widget .venomous-panel-bar i {
      color: #b9a5ff;
      font-size: 16px;
    }

    #venomous-page-widget .venomous-panel-bar small {
      color: #85838d;
      font-size: 10px;
      font-weight: 400;
    }

    #venomous-page-widget .venomous-close {
      width: 29px;
      height: 29px;
      display: grid;
      place-items: center;
      border: 0;
      border-radius: 8px;
      color: #aaa8b2;
      background: transparent;
      cursor: pointer;
      font-size: 18px;
    }

    #venomous-page-widget .venomous-close:hover {
      color: #fff;
      background: rgba(255,255,255,.09);
    }

    #venomous-page-widget iframe {
      width: 100%;
      height: calc(100% - 42px);
      flex: 1;
      border: 0;
      background: #09090b;
    }

    @keyframes venomous-panel-in {
      from { opacity: 0; transform: translateY(8px) scale(.985); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @media (max-width: 600px) {
      #venomous-page-widget {
        right: 8px;
        bottom: 82px;
        gap: 9px;
      }

      #venomous-page-widget .venomous-panel {
        width: calc(100vw - 16px);
        height: min(780px, calc(100dvh - 112px));
        min-height: 360px;
        border-radius: 15px;
      }

      #venomous-page-widget .venomous-launcher {
        width: 50px;
        height: 50px;
        border-radius: 16px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #venomous-page-widget .venomous-panel,
      #venomous-page-widget .venomous-launcher {
        animation: none;
        transition: none;
      }
    }
  `;
  document.head.appendChild(styles);

  const widget = document.createElement("div");
  widget.id = "venomous-page-widget";
  widget.innerHTML = `
    <section class="venomous-panel" id="venomous-page-panel" role="dialog" aria-label="Venomous AI" hidden>
      <header class="venomous-panel-bar">
        <span><i class="ri-spider-line" aria-hidden="true"></i> venomous <small>on this page</small></span>
        <button class="venomous-close" id="venomous-page-close" type="button" aria-label="Close Venomous"><i class="ri-close-line"></i></button>
      </header>
      <iframe
        id="venomous-page-frame"
        title="Venomous AI assistant"
        data-src="/study.html?embed=1&popup=1"
        allow="display-capture; clipboard-read; clipboard-write"
        referrerpolicy="same-origin"
      ></iframe>
    </section>
    <button class="venomous-launcher" id="venomous-page-toggle" type="button" aria-label="Open Venomous AI" aria-expanded="false" title="ask venomous">
      <i class="ri-spider-line" aria-hidden="true"></i>
    </button>
  `;
  document.body.appendChild(widget);

  const panel = widget.querySelector("#venomous-page-panel");
  const toggle = widget.querySelector("#venomous-page-toggle");
  const close = widget.querySelector("#venomous-page-close");
  const frame = widget.querySelector("#venomous-page-frame");

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Venomous AI is open" : "Open Venomous AI");

    if (open && !frame.src) {
      frame.src = frame.dataset.src;
    }

    if (open) {
      close.focus();
    } else {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });
})();