// ELEMENTS
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const sourceText = document.getElementById("sourceText");

const searchInput = document.getElementById("search");
const gameGrid = document.getElementById("game-grid");

const gameView = document.getElementById("game-view");
const gameFrame = document.getElementById("game-frame");
const closeGameBtn = document.getElementById("closeGameBtn");

// STATE
let gameLists = [];
let games = [];
let filtered = [];
let currentSource = null;

// DROPDOWN TOGGLE
dropdownButton.onclick = () => {
  dropdownMenu.classList.toggle("active");
};

document.addEventListener("click", (e) => {
  if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove("active");
  }
});

// BUILD MENU
function buildMenu() {
  dropdownMenu.innerHTML = "";

  gameLists.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "dropdown-item";
    div.textContent = s.Name;

    div.onclick = () => setSource(i);

    dropdownMenu.appendChild(div);
  });
}

// SET SOURCE
async function setSource(i) {
  const source = gameLists[i];
  if (!source) return;

  currentSource = source;
  sourceText.textContent = source.Name;

  dropdownMenu.classList.remove("active");

  searchInput.value = "";

  await loadGames();
}

// LOAD GAMES
async function loadGames() {
  gameGrid.innerHTML = "loading...";

  const res = await fetch(currentSource.File + "?t=" + Date.now());
  const data = await res.json();

  games = (Array.isArray(data) ? data : data.games || []).map((g, i) => ({
    name: g.name || g.title || `game ${i}`,
    url: g.url,
    cover: g.cover || "https://via.placeholder.com/300x200",
  }));

  filtered = [...games];
  render();
}

// RENDER
function render() {
  gameGrid.innerHTML = "";

  filtered.forEach((g) => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${g.cover}">
      <span>${g.name}</span>
    `;

    card.onclick = () => openGame(g);

    gameGrid.appendChild(card);
  });
}

// SEARCH
searchInput.oninput = (e) => {
  const q = e.target.value.toLowerCase();

  filtered = games.filter(g =>
    g.name.toLowerCase().includes(q)
  );

  render();
};

// OPEN GAME
function openGame(game) {
  gameView.style.display = "flex";
  gameFrame.src = game.url;
}

// CLOSE
closeGameBtn.onclick = () => {
  gameView.style.display = "none";
  gameFrame.src = "";
};

// INIT
async function init() {
  const res = await fetch("/game-zones/main-zone.json");
  gameLists = await res.json();

  buildMenu();
  setSource(0);
}

init();
