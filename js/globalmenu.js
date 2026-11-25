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

    const collapseButton = document.createElement("button");
    collapseButton.type = "button";
    collapseButton.className = "dock-menu-toggle";
    collapseButton.setAttribute("aria-label", "Hide navigation menu");
    collapseButton.title = "Hide menu";
    collapseButton.innerHTML = '<i class="ri-layout-bottom-line" aria-hidden="true"></i><span>hide menu</span>';
    nav.appendChild(collapseButton);

    const expandTab = document.createElement("button");
    expandTab.type = "button";
    expandTab.className = "dock-expand-tab";
    expandTab.innerHTML = '<i class="ri-arrow-up-line" aria-hidden="true"></i><span>expand menu</span>';
    expandTab.setAttribute("aria-label", "Expand navigation menu");

    container.replaceChildren(nav, expandTab);

    const menuStorageKey = "spydr.globalmenu.collapsed";
    const setCollapsed = collapsed => {
      document.body.classList.toggle("global-menu-collapsed", collapsed);
      collapseButton.setAttribute("aria-expanded", String(!collapsed));
      collapseButton.setAttribute("aria-label", collapsed ? "Expand navigation menu" : "Hide navigation menu");
      collapseButton.title = collapsed ? "Expand menu" : "Hide menu";
      expandTab.setAttribute("aria-expanded", String(!collapsed));
      try { localStorage.setItem(menuStorageKey, collapsed ? "1" : "0"); } catch {}
    };

    collapseButton.addEventListener("click", () => setCollapsed(true));
    expandTab.addEventListener("click", () => setCollapsed(false));

    try {
      setCollapsed(localStorage.getItem(menuStorageKey) === "1");
    } catch {
      setCollapsed(false);
    }

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

})();
