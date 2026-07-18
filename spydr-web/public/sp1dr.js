const input = document.getElementById("url");
const button = document.getElementById("go");
const browser = document.getElementById("browser");

const scramjet = new ScramjetController({
    prefix: "/scram/"
});

async function init() {
    if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/scram/sw.js", {
            scope: "/scram/"
        });
    }
}

init();

button.onclick = async () => {
    let query = input.value.trim();

    if (!query) return;

    // Search Google if it isn't a URL
    if (!/^https?:\/\//i.test(query) && !query.includes(".")) {
        query = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
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
};
