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

})();
