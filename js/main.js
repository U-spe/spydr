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
  "wait...better?",
  "sophisticated and formulated",
  "science lowk boring af",
  "socalstudies + mr k = peak🥹?",
  "guess what??",
  "wait for itt",
  "i truly DONT CARE 😭🥀",
  "hahahahahaha",
  "\"is this gay, is this straight?\" - DigBar",
  "2x2 hellcat, go fast",
  "ahhh, almost, almost ✌️",
  "watch out! securly might be spyhiyn on u",
  "go to games n try roblox! 😁",
  "OH! also, the AI, u can share ur screen now 😁😁",
  "\"wonder is the beginning of wisdom\" - Socrates",
  "\"u gay and apart of LGBTQ+\" - Me🥀",
  "you got all that time and still chose to read this",
  "AAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!",
  "GO AWAY!!",
  "bc u dont wanna leave, heres what you get",
  "punishment!"
];

const constText = document.querySelector(".const");
const foxyOverlay = document.getElementById("foxy-overlay");
const foxyAudio = document.getElementById("foxy-audio");

const FOXY_COUNT = 40;
const FOXY_IMAGE_LIFETIME = 3000;
const FOXY_SOUND_INTERVAL = 300;
const FOXY_SEQUENCE_LENGTH = 3000;

let foxySoundTimer = null;
let foxyEndTimer = null;
const foxySounds = new Set();

function playFoxySound() {
  if (!foxyAudio) return;

  try {
    // Use a fresh audio element each time so sounds overlap instead of restarting.
    const sound = foxyAudio.cloneNode();
    sound.currentTime = 0;
    sound.volume = foxyAudio.volume;
    foxySounds.add(sound);

    const cleanup = () => {
      foxySounds.delete(sound);
      sound.pause();
      sound.removeAttribute("src");
      sound.load();
    };

    sound.addEventListener("ended", cleanup, { once: true });

    const playback = sound.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        cleanup();
        // Browsers may block audio until the visitor interacts with the page.
      });
    }
  } catch (_) {
    // Ignore playback errors so the visual effect can continue.
  }
}

function spawnFoxy() {
  if (!foxyOverlay) return;

  const foxy = document.createElement("img");
  const size = Math.round(75 + Math.random() * 145);
  const maxLeft = Math.max(0, window.innerWidth - size);
  const maxTop = Math.max(0, window.innerHeight - size);

  foxy.className = "foxy-pop";
  foxy.src = "/assets/images/foxy-jpsc.gif";
  foxy.alt = "";
  foxy.draggable = false;
  foxy.style.width = size + "px";
  foxy.style.left = Math.round(Math.random() * maxLeft) + "px";
  foxy.style.top = Math.round(Math.random() * maxTop) + "px";
  foxy.style.setProperty("--foxy-rotation", Math.round(Math.random() * 50 - 25) + "deg");

  foxyOverlay.appendChild(foxy);
  window.setTimeout(() => foxy.remove(), FOXY_IMAGE_LIFETIME);
}

function playFoxySequence() {
  if (!foxyOverlay) return;

  window.clearInterval(foxySoundTimer);
  window.clearTimeout(foxyEndTimer);

  foxyOverlay.classList.add("active");
  foxyOverlay.setAttribute("aria-hidden", "false");

  // Put all 40 foxies on screen in the same moment.
  for (let i = 0; i < FOXY_COUNT; i++) {
    spawnFoxy();
  }

  playFoxySound();
  foxySoundTimer = window.setInterval(playFoxySound, FOXY_SOUND_INTERVAL);

  foxyEndTimer = window.setTimeout(() => {
    window.clearInterval(foxySoundTimer);

    foxyOverlay.classList.remove("active");
    foxyOverlay.setAttribute("aria-hidden", "true");
    foxyOverlay.replaceChildren();

    for (const sound of foxySounds) {
      sound.pause();
      sound.currentTime = 0;
    }
    foxySounds.clear();
  }, FOXY_SEQUENCE_LENGTH);
}

let lineIndex = 0;

function showNextLine() {
  if (!constText) return;

  constText.textContent = lines[lineIndex];

  const isFinalLine = lineIndex === lines.length - 1;
  if (isFinalLine) playFoxySequence();

  lineIndex = (lineIndex + 1) % lines.length;

  // Give the final line the full three-second Foxy sequence.
  window.setTimeout(showNextLine, isFinalLine ? FOXY_SEQUENCE_LENGTH : 2400);
}

if (constText) {
  window.setTimeout(showNextLine, 2400);
}


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
