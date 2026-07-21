/* =========================
   SPYDR GLOBAL LOADER
========================= */

const loader = document.getElementById("loader");

loader.innerHTML = `
<div id="loading-screen">
    <video
        id="loadVideo"
        autoplay
        muted
        playsinline
    >
        <source
            src="/assets/images/load.mp4"
            type="video/mp4"
        >
    </video>
</div>
`;

const loadingScreen =
    document.getElementById("loading-screen");

const loadVideo =
    document.getElementById("loadVideo");

/* wait for video */

loadVideo.addEventListener("ended", () => {

    loadingScreen.classList.add("hide");

    setTimeout(() => {

        loadingScreen.remove();

    }, 1000);

});

/* fallback */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (
            document.body.contains(loadingScreen)
        ) {

            loadingScreen.classList.add("hide");

            setTimeout(() => {

                loadingScreen.remove();

            }, 600);

        }

    }, 5000);

});
