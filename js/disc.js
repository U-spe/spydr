
/* =========================
   SPYDR POPUP DISMISSAL
========================= */

(() => {
    "use strict";

    function init() {
        const popup = document.getElementById("spydr-popup");
        const button = document.getElementById("spydr-popup-button");

        if (!popup || popup.dataset.discInitialized === "true") {
            return;
        }

        popup.dataset.discInitialized = "true";

        function close() {
            popup.hidden = true;
            document.body.style.overflow = "";
        }

        function show() {
            popup.hidden = false;
            document.body.style.overflow = "hidden";
        }

        if (button) {
            button.addEventListener("click", close);
        }

        popup.addEventListener("click", (event) => {
            if (event.target === popup) {
                close();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !popup.hidden) {
                close();
            }
        });

        window.SpydrPopup = {
            init,
            show,
            close
        };
    }

    window.SpydrPopup = {
        init,
        show() {
            init();

            const popup = document.getElementById("spydr-popup");

            if (popup) {
                popup.hidden = false;
                document.body.style.overflow = "hidden";
            }
        },
        close() {
            const popup = document.getElementById("spydr-popup");

            if (popup) {
                popup.hidden = true;
                document.body.style.overflow = "";
            }
        }
    };

    init();
})();
