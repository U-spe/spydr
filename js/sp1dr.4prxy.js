document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("url");
    const go = document.getElementById("go");
    const frame = document.getElementById("proxy-frame");

    const back = document.getElementById("backBtn");
    const forward = document.getElementById("forwardBtn");
    const home = document.getElementById("homeBtn");
    const settings = document.getElementById("settingsBtn");

    const close = document.querySelector(".dot.close");
    const minimize = document.querySelector(".dot.minimize");
    const maximize = document.querySelector(".dot.maximize");

    function getTarget() {
        let value = input.value.trim();

        if (!value) return null;

        const isURL = value.includes(".") && !value.includes(" ");

        if (isURL && !/^https?:\/\//i.test(value)) {
            value = "https://" + value;
        }

        return isURL
            ? value
            : "https://www.google.com/search?q=" + encodeURIComponent(value);
    }

    function navigate() {
        const target = getTarget();
        if (!target) return;

        // Let Corrosion handle the redirect
        window.location.href =
            "/service/gateway?url=" + encodeURIComponent(target);
    }

    go.addEventListener("click", navigate);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate();
        }
    });

    back?.addEventListener("click", () => history.back());

    forward?.addEventListener("click", () => history.forward());

    home?.addEventListener("click", () => {
        input.value = "";
        window.location.href = "/";
    });

    settings?.addEventListener("click", () => {
        console.log("settings");
    });

    close?.addEventListener("click", () => {
        window.location.replace("https://classroom.google.com");
    });

    minimize?.addEventListener("click", () => {
        if (!frame) return;

        frame.style.display =
            frame.style.display === "none" ? "block" : "none";
    });

    maximize?.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen();
        }
    });
});
