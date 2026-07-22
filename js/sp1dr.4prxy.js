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

    console.log("spydr proxy UI loaded");
    console.log("GO BUTTON:", go);

    function getTarget() {
        let value = input.value.trim();

        if (!value) {
            return null;
        }

        const isURL =
            value.includes(".") &&
            !value.includes(" ");

        if (isURL && !/^https?:\/\//i.test(value)) {
            value = "https://" + value;
        }

        if (isURL) {
            return value;
        }

        return (
            "https://www.google.com/search?q=" +
            encodeURIComponent(value)
        );
    }

    function navigate() {
        const target = getTarget();

        if (!target) {
            console.log("No target found");
            return;
        }

        /*
         * Corrosion's plain/xor URL encoding is handled by the
         * Corrosion client script loaded in sp1dr.html.
         *
         * The backend expects the target URL after /service/.
         */

        const proxyUrl =
            "https://spydr-corrosion.onrender.com/service/" +
            target;

        console.log("Navigating to:", target);
        console.log("Proxy URL:", proxyUrl);

        if (frame) {
            frame.src = proxyUrl;
        }
    }

    /*
     * GO BUTTON
     */

    if (go) {
        go.addEventListener("click", navigate);
    }

    /*
     * ENTER KEY
     */

    if (input) {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                navigate();
            }
        });
    }

    /*
     * BACK
     */

    back?.addEventListener("click", () => {
        try {
            frame.contentWindow.history.back();
        } catch (error) {
            console.warn("Unable to go back:", error);
        }
    });

    /*
     * FORWARD
     */

    forward?.addEventListener("click", () => {
        try {
            frame.contentWindow.history.forward();
        } catch (error) {
            console.warn("Unable to go forward:", error);
        }
    });

    /*
     * HOME
     */

    home?.addEventListener("click", () => {
        input.value = "";
        frame.removeAttribute("src");
    });

    /*
     * SETTINGS
     */

    settings?.addEventListener("click", () => {
        console.log("settings");
    });

    /*
     * CLOSE / PANIC BUTTON
     */

    close?.addEventListener("click", () => {
        window.location.replace("https://classroom.google.com");
    });

    /*
     * MINIMIZE
     */

    minimize?.addEventListener("click", () => {
        if (!frame) return;

        frame.style.display =
            frame.style.display === "none"
                ? "block"
                : "none";
    });

    /*
     * MAXIMIZE
     */

    maximize?.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement
                .requestFullscreen()
                .catch((error) => {
                    console.warn("Fullscreen failed:", error);
                });
        } else {
            document.exitFullscreen();
        }
    });
});
