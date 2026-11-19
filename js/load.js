 
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
       LOAD AND SHOW WEEKLY POPUP
    ========================= */

    async function launchPopup() {
        try {
            if (!window.SpydrPopupManager) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");

                    script.src = "/js/popup-manager.js";
                    script.onload = resolve;
                    script.onerror = () => reject(
                        new Error("Failed to load /js/popup-manager.js")
                    );

                    document.body.appendChild(script);
                });
            }

            await window.SpydrPopupManager.launch();
        } catch (error) {
            console.error("Spydr: Could not launch weekly popup manager.", error);
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
        }

        launchPopup();

        if (loadingScreen) {
            loadingScreen.addEventListener("transitionend", (event) => {
                if (
                    event.target === loadingScreen &&
                    event.propertyName === "opacity"
                ) {
                    loadingScreen.remove();
                }
            });

            setTimeout(() => {
                loadingScreen.remove();
            }, 700);
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

    loadVideo.play().catch((error) => {
        console.warn("Spydr: Video autoplay failed.", error);
        finishIntro();
    });
})();
