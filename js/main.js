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
  "system initializing",
  "made by cj the goat, right?",
  "render engine online",
  "weaving everything togther",
  "grayscale protocol enabled",
  "look whos back...",
  "bomboclat wahllai",
  "i know you diddint do your math homework",
  "yo do your work bro",
  "damn goguardian again",
  "damn securly again",
  "green fn",
  "slow ahh school wifi",
  "built different",
  "so now, jetx is gone so...",
      "sony",
      "sonny d",
      "sonion ring",
      "press ctrl+shift+q+q to enable a:b cloaking",
      "did i catch you that time",
      "what are you still doing here???",
      "good boy",
      "good girl",
      "soneybun"
];

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
