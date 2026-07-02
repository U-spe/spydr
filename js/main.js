// CLOCK
function updateClock() {
  const now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

  document.getElementById("date").textContent =
    now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();


// CONST TEXT
const lines = [
  "system initializing",
  "spydr core active",
  "render engine online",
  "weaving everything together",
  "grayscale protocol enabled"
];

const constText = document.getElementById("constText");

setInterval(() => {
  constText.textContent =
    lines[Math.floor(Math.random() * lines.length)];
}, 2400);


// LOADING SCREEN (SMOOTH EXIT)
const INTRO_TIME = 5200;

window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const video = document.getElementById("loadVideo");
  const app = document.getElementById("app");

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

  video.onended = finish;
  setTimeout(finish, INTRO_TIME);
});


// NAV
function go(page) {
  document.body.style.opacity = "0";
  setTimeout(() => window.location.href = page, 350);
}
