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

    const shell = document.createElement("div");
    shell.className = "dock-shell";
    shell.id = "dock-shell";

    const nav = document.createElement("aside");
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

    const toggle = document.createElement("button");
    toggle.className = "dock-toggle";
    toggle.id = "dock-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Hide navigation menu");
    toggle.setAttribute("aria-expanded", "true");
    toggle.title = "Hide menu";
    toggle.innerHTML = '<i class="ri-arrow-left-s-line" aria-hidden="true"></i>';

    shell.append(nav, toggle);
    container.replaceChildren(shell);

    const storageKey = "spydr.globalmenu.collapsed";
    const setCollapsed = collapsed => {
      document.body.classList.toggle("global-menu-collapsed", collapsed);
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute("aria-label", collapsed ? "Show navigation menu" : "Hide navigation menu");
      toggle.title = collapsed ? "Show menu" : "Hide menu";
      toggle.innerHTML = collapsed
        ? '<i class="ri-arrow-right-s-line" aria-hidden="true"></i>'
        : '<i class="ri-arrow-left-s-line" aria-hidden="true"></i>';
      try { localStorage.setItem(storageKey, collapsed ? "1" : "0"); } catch {}
    };

    toggle.addEventListener("click", () => {
      setCollapsed(!document.body.classList.contains("global-menu-collapsed"));
    });

    try {
      setCollapsed(localStorage.getItem(storageKey) === "1");
    } catch {
      setCollapsed(false);
    }

    const keys = {
      "1": "/", "2": "/lessons.html", "3": "/flashcards.html",
      "4": "/search.html", "5": "/study.html", "6": "/review.html",
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
})();