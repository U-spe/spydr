// =====================
// CLOCK
// =====================
function updateClock() {
  const now = new Date();

  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  if (timeEl) {
    timeEl.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  if (dateEl) {
    dateEl.textContent = now.toDateString();
  }
}

setInterval(updateClock, 1000);
updateClock();


// =====================
// CONST TEXT
// =====================
const lines = [
  "system says suck my di-",
  "this one didnt load properly",
  "render engine online",
  "at this point, i dont even know",
  "*moans* UwU",
  "look whos back...",
  "bomboclat wahllai 😭",
  "i know you diddint do your math homework",
  "AH~! FUCK ME HARDER DADDY~~",
  "damn goguardian again",
  "damn securly again",
  "whats crazy is this RATIO 😭",
  "slow ahh school wifi",
  "PLEASE cover your camera",
  "so now, jetx is gone so...",
      "so your gay, right?",
      "just admit your gay already",
      "food dont call, but onion rings",
      "folk valley ✌️",
      "huss valley ✌️",
      "what are you still doing here???",
      "i found your name here (https://bit.ly/4wxJiKQ)",
      "whos MY good little femboy?",
      "https://bit.ly/grritb26",
  "AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
]

const constText = document.querySelector(".const");

setInterval(() => {
  if (!constText) return;
  constText.textContent =
    lines[Math.floor(Math.random() * lines.length)];
}, 2400);


// =====================
// LOADING
// =====================
const INTRO_TIME = 5000;

window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const video = document.getElementById("loadVideo");
  const app = document.getElementById("app");

  let done = false;

  function finish() {
    if (done) return;
    done = true;

    if (loading) loading.style.opacity = "0";

    setTimeout(() => {
      if (loading) loading.style.display = "none";
      if (app) app.style.opacity = "1";
    }, 600);
  }

  if (video) video.onended = finish;
  setTimeout(finish, INTRO_TIME);
});


// =====================
// NAV
// =====================
function go(page) {
  document.body.style.opacity = "0";
  setTimeout(() => (window.location.href = page), 350);
}


// =====================
// MENU BEHAVIOR (FIXED)
// =====================

// IMPORTANT FIX:
// avoid redeclaration crash by checking if already exists
if (!window.__spydrMenuInit) {
  window.__spydrMenuInit = true;

  const menu = document.getElementById("menu");
  const btn = document.getElementById("menu-btn");
  const wrapper = document.querySelector(".menu-wrapper");

  let closeTimer = null;
  let locked = false;

  if (btn && menu && wrapper) {
    btn.addEventListener("click", () => {
      locked = !locked;

      if (locked) {
        menu.classList.add("open");
      } else {
        menu.classList.remove("open");
      }
    });

    wrapper.addEventListener("mouseenter", () => {
      clearTimeout(closeTimer);
      menu.classList.add("open");
    });

    wrapper.addEventListener("mouseleave", () => {
      if (locked) return;

      closeTimer = setTimeout(() => {
        menu.classList.remove("open");
      }, 180);
    });
  }
}
