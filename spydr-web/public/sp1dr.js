const input = document.getElementById("url");
const button = document.getElementById("go");
const browser = document.getElementById("browser");

const scramjet = new ScramjetController({
    prefix: "/scram/",
    bare: "/bare/"
});


async function initScramjet() {
    if (!("serviceWorker" in navigator)) {
        console.error("Service workers are not supported");
        return;
    }

    try {
        await navigator.serviceWorker.register("/spydr-web/sw.js", {
            scope: "/scram/"
        });

        console.log("Scramjet service worker registered");
    } catch (err) {
        console.error("Scramjet SW failed:", err);
    }
}


initScramjet();


button.onclick = async () => {
    let query = input.value.trim();

    if (!query) return;


    // If query instead of url
    if (!/^https?:\/\//i.test(query) && !query.includes(".")) {
        query = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
    }


    // Add https:// if missing
    if (!/^https?:\/\//i.test(query)) {
        query = "https://" + query;
    }


    browser.innerHTML = "";


    const frame = document.createElement("iframe");

    frame.style.width = "100%";
    frame.style.height = "100vh";
    frame.style.border = "none";

    frame.src = scramjet.encodeUrl(query);


    browser.appendChild(frame);

    console.log("Opening:", query);
};

// SIX SEVEN EEEEEEEE EEEEEEEE

