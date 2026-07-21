document.addEventListener("DOMContentLoaded", () => {
    console.log("spydr proxy UI loaded");

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

    const CORROSION_URL = "https://spydr-corrosion.onrender.com/service/";

    function getTarget() {
        let value = input.value.trim();

        if (!value) return null;

        const isURL =
            value.includes(".") &&
            !value.includes(" ");

        if (isURL) {
            if (!/^https?:\/\//i.test(value)) {
                value = "https://" + value;
            }

            return value;
        }

        return "https://www.google.com/search?q=" +
            encodeURIComponent(value);
    }

    function navigate() {
    const target = getTarget();

    if (!target || !frame) return;

    console.log("Navigating to:", target);

    frame.src = CORROSION_URL + target;
}

    go?.addEventListener("click", navigate);

    input?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate();
        }
    });

    back?.addEventListener("click", () => {
        try {
            frame.contentWindow.history.back();
        } catch (e) {
            console.warn("Back navigation blocked");
        }
    });

    forward?.addEventListener("click", () => {
        try {
            frame.contentWindow.history.forward();
        } catch (e) {
            console.warn("Forward navigation blocked");
        }
    });

    home?.addEventListener("click", () => {
        input.value = "";

        if (frame) {
            frame.removeAttribute("src");
        }
    });

    settings?.addEventListener("click", () => {
        console.log("spydr settings opened");
    });

    close?.addEventListener("click", () => {
        window.location.replace("https://classroom.google.com");
    });

    minimize?.addEventListener("click", () => {
        if (!frame) return;

        frame.style.display =
            frame.style.display === "none"
                ? "block"
                : "none";
    });

    maximize?.addEventListener("click", async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (e) {
            console.warn("Fullscreen unavailable");
        }
    });
});
