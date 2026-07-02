// splash text
const splashes = [
  "spydr online...",
  "system loaded",
  "neon protocol active",
  "welcome back",
  "don’t get caught"
];

document.getElementById("splash").textContent =
  splashes[Math.floor(Math.random() * splashes.length)];


// clock
function updateClock() {
  const now = new Date();

  document.getElementById("time").textContent =
    now.toLocaleTimeString();

  document.getElementById("date").textContent =
    now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();


// const rotating text
const constText = [
  "const: spider core",
  "const: system online",
  "const: neon load",
  "const: runtime active"
];

const el = document.getElementById("constText");

setInterval(() => {
  el.textContent =
    constText[Math.floor(Math.random() * constText.length)];
}, 2500);


// navigation
function go(page) {
  document.body.style.opacity = "0";
  setTimeout(() => window.location.href = page, 300);
}

function goUpdates() {
  window.location.href = "/updates.html";
}


// vanta init
window.addEventListener("load", () => {
  try {
    VANTA.FOG({
      el: "#vanta-bg",
      highlightColor: 0x6d28d9,
      midtoneColor: 0x4c1d95,
      lowlightColor: 0x000000,
      baseColor: 0x050505,
      blurFactor: 0.7,
      speed: 2,
      zoom: 0.4
    });

    document.getElementById("vanta-bg").style.opacity = "1";
  } catch (e) {
    console.log(e);
  }
});
