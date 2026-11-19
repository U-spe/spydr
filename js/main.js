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
  "single handedly saving the school year",
  "sophisticated and formulated",
  "dont you just love math class?",
  "finally got around to fixing this",
  "lowkey this looks way better now",
  "we might actually be cooking for once",
  "anyways, thanks for using spydr",
  "alright who the fuck broke it this time",
  "damn GoGuardian, let me breathe",
  "securly back on its bullshit again",
  "this wifi is actually embarrassing",
  "bro what the hell is taking so long",
  "nah cuz who approved this",
  "i KNOW you did not just click that",
  "what the fuck is a geometry",
  "CLOSE THE TAB",
  "school really got us fighting for our lives",
  "this chromebook runs on hopes and prayers",
  "jetx is gone. pack it up.",
  "stop gooning",
  "bro got a 2% battery and 47 tabs open",
  "im actually so done with this shit",
  "the fuck you looking at",
  "damn bruh go do your homework",
  "this shit took longer than my entire education",
  "why is bro still reading these",
  "i swear this website has more issues than me",
  "aint no way you read all of these",
  "WHAT THE HELL IS EVEN HAPPENING",
  "nah im not even gonna explain this one",
  "bro please get off the website",
  "you got all that time and still chose to read this",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
];

const constText = document.querySelector(".const");

let lineIndex = 0;

setInterval(() => {
  if (!constText) return;

  constText.textContent = lines[lineIndex];

  lineIndex++;

  if (lineIndex >= lines.length) {
    lineIndex = 0;
  }
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
    }, 1000);
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
