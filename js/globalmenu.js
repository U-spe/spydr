const container = document.getElementById("global-menu");

if (container) {

    const current = window.location.pathname.split("/").pop() || "index.html";

    const pages = [
        {
            icon: "ri-home-5-line",
            title: "Home",
            page: "/"
        },
        {
            icon: "ri-gamepad-line",
            title: "Games",
            page: "/lessons.html"
        },
        {
            icon: "ri-apps-line",
            title: "Apps",
            page: "/flashcards.html"
        },
        {
            icon: "ri-global-line",
            title: "Browser",
            page: "/search.html"
        },
        {
            icon: "ri-robot-2-line",
            title: "AI",
            page: "/study.html"
        },
        {
            icon: "ri-chat-1-line",
            title: "Chat",
            page: "/review.html"
        },
        {
            icon: "ri-settings-3-line",
            title: "Settings",
            page: "/settings.html"
        }
    ];

    const dock = document.createElement("div");
    dock.className = "dock";

    pages.forEach(item => {

        const button = document.createElement("button");

        button.dataset.title = item.title;

        if (
            current === item.page ||
            (current === "" && item.page === "index.html")
        ) {
            button.classList.add("active");
        }

        button.innerHTML = `<i class="${item.icon}"></i>`;

        button.onclick = () => {

            window.location.href = item.page;

        };

        dock.appendChild(button);

    });

    container.appendChild(dock);

}
