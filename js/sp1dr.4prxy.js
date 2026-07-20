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

        const isURL =
            value.includes(".") &&
            !value.includes(" ");

        if (isURL) {

            if (!/^https?:\/\//i.test(value)) {
                value = "https://" + value;
            }

            return value;

        }

        return "https://www.google.com/search?q=" + encodeURIComponent(value);

    }

    function navigate() {

        const target = getTarget();

        if (!target) return;

        frame.src =
            "/service/gateway?url=" +
            encodeURIComponent(target);

    }

    go.onclick = navigate;

    input.addEventListener("keydown", e => {

        if (e.key === "Enter") {
            e.preventDefault();
            navigate();
        }

    });

    back.onclick = () => {

        try {
            frame.contentWindow.history.back();
        } catch {}

    };

    forward.onclick = () => {

        try {
            frame.contentWindow.history.forward();
        } catch {}

    };

    home.onclick = () => {

        input.value = "";
        frame.removeAttribute("src");

    };

    settings.onclick = () => {

        console.log("settings");

    };

    close.onclick = () => {

        window.location.replace("https://classroom.google.com");

    };

    minimize.onclick = () => {

        frame.style.display =
            frame.style.display === "none"
                ? "block"
                : "none";

    };

    maximize.onclick = () => {

        if (!document.fullscreenElement) {

            document.documentElement.requestFullscreen();

        } else {

            document.exitFullscreen();

        }

    });

});
