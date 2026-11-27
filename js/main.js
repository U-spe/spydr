// =====================
// CLOCK
// =====================
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById("home-time") || document.getElementById("time");
  const dateEl = document.getElementById("home-date") || document.getElementById("date");

  if (timeEl) {
    timeEl.textContent = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });
  }

  if (dateEl) {
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = String(now.getFullYear()).slice(-2);
    dateEl.textContent = `${month}.${day}.${year}`;
  }
}

setInterval(updateClock, 1000);
updateClock();

async function initHomeBattery() {
  const levelEl = document.getElementById("home-battery-level");
  const iconEl = document.getElementById("home-battery-icon");
  if (!levelEl || !iconEl) return;

  const update = battery => {
    const percent = Math.round(battery.level * 100);
    levelEl.textContent = percent + "%";
    iconEl.className = battery.charging ? "ri-battery-charge-line" :
      percent >= 80 ? "ri-battery-2-line" :
      percent >= 50 ? "ri-battery-2-line" :
      percent >= 20 ? "ri-battery-low-line" : "ri-battery-line";
    iconEl.setAttribute("aria-label", battery.charging ? "Charging" : "Battery");
  };

  if (!navigator.getBattery) {
    levelEl.textContent = "n/a";
    iconEl.className = "ri-battery-line";
    return;
  }

  try {
    const battery = await navigator.getBattery();
    update(battery);
    battery.addEventListener("levelchange", () => update(battery));
    battery.addEventListener("chargingchange", () => update(battery));
  } catch {
    levelEl.textContent = "n/a";
  }
}

initHomeBattery();


// =====================
// CONST TEXT
// =====================
const lines = [
  "REmade by bbcj (the goat??)
  "wait...better?",
  "dont you just LOUVE spydr?",
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
  "\"u gay and apart of LGBTQ+\" - Me",
  "you got all that time and still chose to read this 🥀",
  "AAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!",
  "GO AWAYY!",
  "bc u dont wanna leave, heres what you get",
  "PUNISHMENTTTTTTT!"
];

const constText = document.querySelector(".const");
const foxyOverlay = document.getElementById("foxy-overlay");
const foxyAudio = document.getElementById("foxy-audio");

const FOXY_COUNT = 180;
const FOXY_IMAGE_LIFETIME = 3000;
const FOXY_SEQUENCE_LENGTH = 3000;

let foxyEndTimer = null;

function playFoxySound() {
  if (!foxyAudio) return;

  try {
    // Keep the effect to one audio element and one playback.
    foxyAudio.pause();
    foxyAudio.currentTime = 0;
    const playback = foxyAudio.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        // Browsers may block audio until the visitor interacts with the page.
      });
    }
  } catch (_) {
    // Ignore playback errors so the visual effect can continue.
  }
}

function spawnFoxy(index = 0) {
  if (!foxyOverlay) return;

  const foxy = document.createElement("img");
  const columns = 10;
  const rows = 9;
  const cellWidth = window.innerWidth / columns;
  const cellHeight = window.innerHeight / rows;
  const column = index % columns;
  const row = Math.floor(index / columns);
  const size = Math.round(Math.max(90, Math.min(220, cellWidth * 1.2)));
  const jitterX = (Math.random() - 0.5) * cellWidth * 0.55;
  const jitterY = (Math.random() - 0.5) * cellHeight * 0.55;

  foxy.className = "foxy-pop";
  foxy.src = "/assets/images/foxy-jpsc.gif";
  foxy.alt = "";
  foxy.draggable = false;
  foxy.style.position = "absolute";
  foxy.style.width = size + "px";
  foxy.style.maxWidth = "none";
  foxy.style.left = Math.round(column * cellWidth + (cellWidth - size) / 2 + jitterX) + "px";
  foxy.style.top = Math.round(row * cellHeight + (cellHeight - size) / 2 + jitterY) + "px";
  foxy.style.setProperty("--foxy-rotation", Math.round(Math.random() * 50 - 25) + "deg");

  foxyOverlay.appendChild(foxy);
  window.setTimeout(() => foxy.remove(), FOXY_IMAGE_LIFETIME);
}

function playFoxySequence() {
  if (!foxyOverlay) return;

  window.clearTimeout(foxyEndTimer);

  foxyOverlay.classList.add("active");
  foxyOverlay.setAttribute("aria-hidden", "false");
  Object.assign(foxyOverlay.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: "9998"
  });

  // Distribute all 90 foxies across the full screen at once.
  for (let i = 0; i < FOXY_COUNT; i++) {
    spawnFoxy(i);
  }

  playFoxySound();

  foxyEndTimer = window.setTimeout(() => {
  
    foxyOverlay.classList.remove("active");
    foxyOverlay.setAttribute("aria-hidden", "true");
    foxyOverlay.replaceChildren();

    if (foxyAudio) {
      foxyAudio.pause();
      foxyAudio.currentTime = 0;
    }
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
