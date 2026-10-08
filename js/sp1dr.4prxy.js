document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const landing = document.getElementById("landing");
    const browser = document.getElementById("browser");

    const input = document.getElementById("url");
    const go = document.getElementById("go");

    const browserInput =
        document.getElementById("browser-url");

    const browserGo =
        document.getElementById("browser-go");

    const frame =
        document.getElementById("proxy-frame");

    const back =
        document.getElementById("backBtn");

    const forward =
        document.getElementById("forwardBtn");

    const home =
        document.getElementById("homeBtn");

    const reload =
        document.getElementById("reloadBtn");

    const fullscreen =
        document.getElementById("fullscreenBtn");

    const browserHome =
        document.getElementById("browserHomeBtn");

    const quickLinks =
        document.querySelectorAll(".quick-link");


    /* =========================
       BACKEND
    ========================= */

    const BACKEND =
        "https://corrosion-spydr.onrender.com";


    /* =========================
       STATE
    ========================= */

    let currentTarget = null;


    /* =========================
       LOG
    ========================= */

    console.log("spydr proxy UI loaded");
    console.log("GO BUTTON:", go);
    console.log("BACKEND:", BACKEND);


    /* =========================
       GET TARGET
    ========================= */

    function getTarget(value) {

        value = String(value || "").trim();

        if (!value) {
            return null;
        }

        const isURL =
            value.includes(".") &&
            !value.includes(" ");

        if (
            isURL &&
            !/^https?:\/\//i.test(value)
        ) {
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


    /* =========================
       SHOW BROWSER
    ========================= */

    function showBrowser() {

        if (!landing || !browser) {
            return;
        }

        landing.classList.add("hidden");
        browser.classList.remove("hidden");
    }


    /* =========================
       SHOW LANDING
    ========================= */

    function showLanding() {

        if (!landing || !browser) {
            return;
        }

        browser.classList.add("hidden");
        landing.classList.remove("hidden");
    }


    /* =========================
       NAVIGATE
    ========================= */

    async function navigate(value) {

        const target =
            getTarget(value);

        if (!target) {
            console.log("No target found");
            return;
        }

        currentTarget = target;

        console.log(
            "Navigating to:",
            target
        );

        /*
         * Switch from the landing
         * screen to the browser view.
         */

        showBrowser();


        /*
         * Keep the browser address
         * input synced.
         */

        if (browserInput) {
            browserInput.value = target;
        }


        try {

            const response = await fetch(
                BACKEND +
                "/service/encode?url=" +
                encodeURIComponent(target)
            );


            if (!response.ok) {

                throw new Error(
                    `Encoder returned HTTP ${response.status}`
                );

            }


            const data =
                await response.json();


            if (!data.encoded) {

                throw new Error(
                    "No encoded URL returned"
                );

            }


            const proxyUrl =
                BACKEND +
                "/service/" +
                data.encoded;


            console.log(
                "Proxy URL:",
                proxyUrl
            );


            if (frame) {
                frame.src = proxyUrl;
            }


        } catch (error) {

            console.error(
                "Navigation failed:",
                error
            );

        }

    }


    /* =========================
       LANDING GO
    ========================= */

    go?.addEventListener(
        "click",
        () => {

            navigate(
                input?.value
            );

        }
    );


    /* =========================
       LANDING ENTER
    ========================= */

    input?.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                navigate(
                    input.value
                );

            }

        }
    );


    /* =========================
       QUICK LINKS
    ========================= */

    quickLinks.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const url =
                        button.dataset.url;

                    if (!url) {
                        return;
                    }

                    navigate(url);

                }
            );

        }
    );


    /* =========================
       BROWSER GO
    ========================= */

    browserGo?.addEventListener(
        "click",
        () => {

            navigate(
                browserInput?.value
            );

        }
    );


    /* =========================
       BROWSER ENTER
    ========================= */

    browserInput?.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                navigate(
                    browserInput.value
                );

            }

        }
    );


    /* =========================
       BACK
    ========================= */

    back?.addEventListener(
        "click",
        () => {

            if (!frame) {
                return;
            }

            try {

                frame.contentWindow
                    .history
                    .back();

            } catch (error) {

                console.warn(
                    "Unable to go back:",
                    error
                );

            }

        }
    );


    /* =========================
       FORWARD
    ========================= */

    forward?.addEventListener(
        "click",
        () => {

            if (!frame) {
                return;
            }

            try {

                frame.contentWindow
                    .history
                    .forward();

            } catch (error) {

                console.warn(
                    "Unable to go forward:",
                    error
                );

            }

        }
    );


    /* =========================
       RELOAD
    ========================= */

    reload?.addEventListener(
        "click",
        () => {

            if (!frame) {
                return;
            }

            try {

                frame.contentWindow
                    .location
                    .reload();

            } catch (error) {

                console.warn(
                    "Unable to reload:",
                    error
                );

                if (currentTarget) {
                    navigate(currentTarget);
                }

            }

        }
    );


    /* =========================
       HOME
    ========================= */

    function goHome() {

        currentTarget = null;

        if (frame) {
            frame.removeAttribute("src");
        }

        if (input) {
            input.value = "";
        }

        if (browserInput) {
            browserInput.value = "";
        }

        showLanding();

        setTimeout(() => {
            input?.focus();
        }, 100);

    }


    /* =========================
       HOME BUTTON
    ========================= */

    home?.addEventListener(
        "click",
        goHome
    );


    /* =========================
       SPYDR HOME BUTTON
    ========================= */

    browserHome?.addEventListener(
        "click",
        goHome
    );


    /* =========================
       FULLSCREEN
    ========================= */

    fullscreen?.addEventListener(
        "click",
        async () => {

            try {

                if (!document.fullscreenElement) {

                    await document
                        .documentElement
                        .requestFullscreen();

                } else {

                    await document
                        .exitFullscreen();

                }

            } catch (error) {

                console.warn(
                    "Fullscreen failed:",
                    error
                );

            }

        }
    );


    /* =========================
       FRAME LOAD
    ========================= */

    frame?.addEventListener(
        "load",
        () => {

            console.log(
                "Browser frame loaded"
            );

        }
    );


    /* =========================
       INITIAL STATE
    ========================= */

    browser?.classList.add("hidden");
    landing?.classList.remove("hidden");


    /* =========================
       INITIAL FOCUS
    ========================= */

    setTimeout(() => {

        input?.focus();

    }, 100);


    console.log(
        "spydr browser ready."
    );

});
