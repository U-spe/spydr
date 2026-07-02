/* =========================
   SPYDR GAME LOADER (FIXED)
========================= */

/* ELEMENTS */
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const sourceText = document.getElementById("sourceText");

const searchInput = document.getElementById("search");
const gameGrid = document.getElementById("game-grid");

let luminGames = document.getElementById("lumin-games");

const gameView = document.getElementById("game-view");
const gameFrame = document.getElementById("game-frame");
const closeGameBtn = document.getElementById("closeGameBtn");

/* STATE */
let gameLists = [];
let currentSourceData = null;
let games = [];
let filteredGames = [];

/* =========================
   SAFE INIT GUARD
========================= */
function waitForDOM() {
  return (
    dropdownButton &&
    dropdownMenu &&
    gameGrid &&
    searchInput
  );
}

/* =========================
   HELPERS
========================= */
function getGameURL(game) {
  return game.url || "#";
}

function getCover(game) {
  return game.cover || "https://via.placeholder.com/300x200?text=No+Image";
}

/* =========================
   DROPDOWN
========================= */
dropdownButton?.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    !dropdownButton?.contains(e.target) &&
    !dropdownMenu?.contains(e.target)
  ) {
    dropdownMenu?.classList.remove("active");
  }
});

/* =========================
   BUILD SOURCES
========================= */
function buildSourceMenu() {
  dropdownMenu.innerHTML = "";

  gameLists.forEach((source, index) => {
    const item = document.createElement("div");
    item.className = "dropdown-item";

    item.innerHTML = `<i class="${source.Icon || "ri-folder-line"}"></i><span>${source.Name}</span>`;
    item.onclick = () => setSource(index);

    dropdownMenu.appendChild(item);
  });
}

/* =========================
   SET SOURCE
========================= */
async function setSource(index) {
  const source = gameLists[index];
  if (!source) return;

  currentSourceData = source;
  if (sourceText) sourceText.textContent = source.Name;

  dropdownMenu?.classList.remove("active");
  if (searchInput) searchInput.value = "";

  /* LUMIN MODE */
  if (source.Name.toLowerCase().includes("lumin")) {
    if (gameGrid) gameGrid.style.display = "none";
    if (luminGames) {
      luminGames.style.display = "block";
    }
    loadLumin();
    return;
  }

  // STANDARD MODE
  if (luminGames) luminGames.style.display = "none";
  if (gameGrid) gameGrid.style.display = "grid";

  await loadGames();
}

/* =========================
   LOAD GAMES (FIXED PATH HERE)
========================= */
async function loadGames() {
  if (!currentSourceData) return;

  if (gameGrid) gameGrid.innerHTML = "Loading...";

  try {
    const response = await fetch(
      currentSourceData.File + "?t=" + Date.now()
    );

    if (!response.ok) {
      throw new Error("Failed loading source JSON");
    }

    const data = await response.json();

    const rawGames = Array.isArray(data)
      ? data
      : data.games || data.items || data.apps || [];

    games = rawGames.map((game, i) => ({
      id: game.id || (crypto?.randomUUID?.() ?? Math.random().toString(36)),
      name: game.name || game.title || `Game ${i + 1}`,
      url: game.url || game.link || "",
      cover: game.cover || game.image || game.img || "",
      prx: game.prx || game.proxy || false
    }));

    filteredGames = [...games];
    renderGames();

  } catch (err) {
    console.error(err);
    if (gameGrid) {
      gameGrid.innerHTML = `<div style="padding:20px;color:#fff;">failed to load games</div>`;
    }
  }
}

/* =========================
   RENDER
========================= */
function renderGames() {
  if (!gameGrid) return;
  gameGrid.innerHTML = "";

  if (filteredGames.length === 0) {
    gameGrid.innerHTML = "no games found";
    return;
  }

  filteredGames.forEach((game) => {
    const card = document.createElement("div");
    card.className = "game-card";

    // Applied Grayscale filter directly via JS inline styling
    card.innerHTML = `<img src="${getCover(game)}" style="filter: grayscale(100%);"><span>${game.name}</span>`;
    card.onclick = () => openGame(game);

    gameGrid.appendChild(card);
  });
}

/* =========================
   SEARCH
========================= */
searchInput?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();

  filteredGames = games.filter(g =>
    g.name.toLowerCase().includes(q)
  );

  renderGames();
});

/* =========================
   OPEN GAME
========================= */
function openGame(game) {
  let url = getGameURL(game);

  if (game.prx) {
    url = `embed.html?url=${encodeURIComponent(url)}`;
  }

  if (gameView) gameView.style.display = "flex";
  if (gameFrame) gameFrame.src = url;
}

/* =========================
   CLOSE GAME
========================= */
closeGameBtn?.addEventListener("click", () => {
  if (gameView) gameView.style.display = "none";
  if (gameFrame) gameFrame.src = "about:blank";
});

/* =========================
   LUMIN (UNCHANGED)
========================= */
function loadLumin() {
  if (!luminGames) return;
  
  luminGames.innerHTML = `<div id="games"></div>`;

  if (window.Lumin && typeof window.Lumin.init === "function") {
    startLumin();
    return;
  }

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/luminsdk/script@latest/lumin.min.js";
  script.dataset.lumin = "true";

  script.onload = startLumin;

  script.onerror = () => {
    luminGames.innerHTML = "failed to load lumin";
  };

  document.body.appendChild(script);
}

function startLumin() {
  if (!window.Lumin || typeof window.Lumin.init !== "function") {
    if (luminGames) luminGames.innerHTML = "lumin not available";
    return;
  }

  Lumin.init({
    container: "#games",
    theme: "dark"
  });
}

/* =========================
   INIT
========================= */
async function init() {
  // Dynamically create luminGames container if missing from HTML to prevent null errors
  luminGames = document.getElementById("lumin-games");
  if (!luminGames && gameGrid) {
    luminGames = document.createElement("div");
    luminGames.id = "lumin-games";
    luminGames.style.display = "none";
    gameGrid.parentNode.insertBefore(luminGames, gameGrid.nextSibling);
  }

  try {
    const response = await fetch(
      "assets/json/gzone-main.json?t=" + Date.now()
    );

    if (!response.ok) {
      throw new Error("Failed loading gzone-main.json");
    }

    gameLists = await response.json();

    buildSourceMenu();

    if (gameLists.length > 0) {
      setSource(0);
    }

  } catch (err) {
    console.error(err);
    if (gameGrid) {
      gameGrid.innerHTML = `<div style="padding:20px;color:white;">failed to initialize</div>`;
    }
  }
}

if (waitForDOM()) {
  init();
} else {
  window.addEventListener("DOMContentLoaded", init);
}
