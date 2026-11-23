const container = document.getElementById("global-menu");
const isEmbedded = new URLSearchParams(window.location.search).get("embed") === "1";

if (container && !isEmbedded) {
    const current = window.location.pathname.replace(/\/$/, "") || "/";
    const pages = [
        { icon: "ri-home-5-line", title: "Home", page: "/" },
        { icon: "ri-gamepad-line", title: "Games", page: "/lessons.html" },
        { icon: "ri-apps-2-line", title: "Apps", page: "/flashcards.html" },
        { icon: "ri-global-line", title: "Browser", page: "/search.html" },
        { icon: "ri-sparkling-2-line", title: "AI", page: "/study.html" },
        { icon: "ri-message-3-line", title: "Chat", page: "/review.html" },
        { icon: "ri-settings-4-line", title: "Settings", page: "/settings.html" }
    ];

    const dock = document.createElement("nav");
    dock.className = "dock";
    dock.setAttribute("aria-label", "Main navigation");

    pages.forEach(item => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.title = item.title;
        button.setAttribute("aria-label", item.title);
        button.setAttribute("title", item.title);
        const active = current === item.page || (item.page === "/" && current === "/index.html");
        if (active) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }
        const icon = document.createElement("i");
        icon.className = item.icon;
        icon.setAttribute("aria-hidden", "true");
        button.appendChild(icon);
        button.addEventListener("click", () => {
            if (current !== item.page) window.location.assign(item.page);
        });
        dock.appendChild(button);
    });

    container.appendChild(dock);

    document.addEventListener("keydown", event => {
        if (event.altKey && !event.ctrlKey && !event.metaKey) {
            const shortcuts = { "1": "/", "2": "/lessons.html", "3": "/flashcards.html", "4": "/search.html", "5": "/study.html", "6": "/review.html", "7": "/settings.html" };
            const target = shortcuts[event.key];
            if (target) {
                event.preventDefault();
                window.location.assign(target);
            }
        }
    });
}