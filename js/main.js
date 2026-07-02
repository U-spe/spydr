// CLOCK
function updateClock() {
  const now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  document.getElementById("date").textContent =
    now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();


// CONST TEXT (clean system-style rotation)
const texts = [
  "system: spydr core loaded",
  "initializing modules...",
  "syncing interface",
  "render engine online",
  "welcome"
];

const constText = document.getElementById("constText");

setInterval(() => {
  constText.textContent =
    texts[Math.floor(Math.random() * texts.length)];
}, 2500);


// LOADING SCREEN HANDLER (VIDEO)
window.addEventListener("load", () => {
  const video = document.getElementById("loadVideo");
  const loading = document.getElementById("loading-screen");
  const app = document.getElementById("app");

  // wait for video to finish or force timeout
  let done = false;

  function finish() {
    if (done) return;
    done = true;

    loading.style.opacity = "0";
    setTimeout(() => {
      loading.style.display = "none";
      app.style.opacity = "1";
    }, 600);
  }

  // if video ends
  video.onended = finish;

  // fallback timeout (important so it never gets stuck)
  setTimeout(finish, 5000);
});


// NAV
function go(page) {
  window.location.href = page;
}
