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


// CONST TEXT ROTATION
const lines = [
  "system booting...",
  "spydr core online",
  "loading interface",
  "sync complete",
  "neural mesh active"
];

const constText = document.getElementById("constText");

setInterval(() => {
  constText.textContent =
    lines[Math.floor(Math.random() * lines.length)];
}, 2500);


// INTRO CONTROL (SPEED KNOB)
const INTRO_TIME = 5200; // change this anytime

window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const video = document.getElementById("loadVideo");
  const app = document.getElementById("app");

  let finished = false;

  function finishIntro() {
    if (finished) return;
    finished = true;

    loading.style.opacity = "0";

    setTimeout(() => {
      loading.style.display = "none";
      app.style.opacity = "1";
      app.classList.add("loaded");
    }, 600);
  }

  // video ends OR timeout fallback
  video.onended = finishIntro;
  setTimeout(finishIntro, INTRO_TIME);
});


// NAV
function go(page) {
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = page;
  }, 400);
}
