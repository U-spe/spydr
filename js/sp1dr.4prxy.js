document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("url");
    const go = document.getElementById("go");
    const frame = document.getElementById("proxy-frame");

    console.log("GO BUTTON:", go);

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

        const isURL =
            value.includes(".") &&
            !value.includes(" ");

        if (isURL && !/^https?:\/\//i.test(value)) {
            value = "https://" + value;
        }

        return isURL
            ? value
            : "https://www.google.com/search?q=" +
              encodeURIComponent(value);
    }

    function navigate() {
    const target = getTarget();

    if (!target) {
        console.log("No target found");
        return;
    }

    const proxyUrl =
        "https://spydr-corrosion.onrender.com/service/" +
        encodeURIComponent(target);

    console.log("Navigating to:", target);
    console.log("Proxy URL:", proxyUrl);

    // navigate the iframe
    frame.src = proxyUrl;
}

    // THIS is where the Go button gets connected
    if (go) {
        go.addEventListener("click", navigate);
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate();
        }
    });

    back?.addEventListener("click", () => {
        frame.contentWindow.history.back();
    });

    forward?.addEventListener("click", () => {
        frame.contentWindow.history.forward();
    });

    home?.addEventListener("click", () => {
        input.value = "";
        frame.removeAttribute("src");
    });

    settings?.addEventListener("click", () => {
        console.log("settings");
    });

    close?.addEventListener("click", () => {
        window.location.replace("https://classroom.google.com");
    });

    minimize?.addEventListener("click", () => {
        frame.style.display =
            frame.style.display === "none"
                ? "block"
                : "none";
    });

    maximize?.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen();
        }
    });

});
