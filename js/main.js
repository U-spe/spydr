// const rotating text (changes on load)
const phrases = [
  "const: minimal build",
  "const: loading worlds",
  "const: neon protocol",
  "const: spider core active",
  "const: system online"
];

const textEl = document.getElementById("constText");

function setRandomConst() {
  const random = Math.floor(Math.random() * phrases.length);
  textEl.textContent = phrases[random];
}

setRandomConst();

// simple game loader (expand later)
const games = [
  "neon drift",
  "void runner",
  "pixel siege",
  "cyber arena",
  "spider core"
];

const grid = document.getElementById("gameGrid");

games.forEach(name => {
  const div = document.createElement("div");
  div.className = "card";
  div.textContent = name;
  grid.appendChild(div);
});
