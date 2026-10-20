
/* =========================
   SPYDR GLOBAL LOADER
========================= */

(() => {
    "use strict";

    const loader = document.getElementById("loader");

    if (!loader) {
        console.error("Spydr: #loader element not found.");
        return;
    }

    loader.innerHTML = `
        <div id="loading-screen">
            <video
                id="loadVideo"
                autoplay
                muted
                playsinline
                preload="auto"
            >
                <source
                    src="/assets/images/load.mp4"
                    type="video/mp4"
                >
            </video>
        </div>
    `;

    const loadingScreen = document.getElementById("loading-screen");
    const loadVideo = document.getElementById("loadVideo");

    let introFinished = false;

    /* =========================
       LOAD AND SHOW POPUP
    ========================= */

    async function launchPopup() {
        try {
            const response = await fetch("/assets/static/popup.html", {
                cache: "no-cache"
            });

            if (!response.ok) {
                throw new Error(
                    `Popup request failed: ${response.status}`
                );
            }

            const html = await response.text();

            // Insert the popup markup and its inline styles.
            const container = document.createElement("div");
            container.id = "spydr-popup-container";
            container.innerHTML = html;

            document.body.appendChild(container);

            // Load the popup dismissal controller.
            if (!window.SpydrPopup) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");

                    script.src = "/js/disc.js";
                    script.onload = resolve;
                    script.onerror = () => reject(
                        new Error("Failed to load /js/disc.js")
                    );

                    document.body.appendChild(script);
                });
            }

            // Initialize after the popup markup exists.
            window.SpydrPopup.init();
            window.SpydrPopup.show();

        } catch (error) {
            console.error("Spydr: Could not launch popup.", error);
        }
    }

    /* =========================
       FINISH INTRO
    ========================= */

    function finishIntro() {
        if (introFinished) return;

        introFinished = true;

        if (loadingScreen) {
            loadingScreen.classList.add("hide");

            setTimeout(() => {
                loadingScreen.remove();
                launchPopup();
            }, 1000);
        } else {
            launchPopup();
        }
    }

    /* =========================
       VIDEO EVENTS
    ========================= */

    loadVideo.addEventListener("ended", finishIntro);

    loadVideo.addEventListener("error", () => {
        console.warn("Spydr: Intro video failed. Continuing.");
        finishIntro();
    });

    /* =========================
       FALLBACK
    ========================= */

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (!introFinished) {
                console.warn("Spydr: Intro fallback activated.");
                finishIntro();
            }
        }, 5000);
    });

    // Handle autoplay being blocked by the browser.
    loadVideo.play().catch((error) => {
        console.warn("Spydr: Video autoplay failed.", error);
        finishIntro();
    });

})();
