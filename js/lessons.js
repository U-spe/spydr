/* =========================
   spydr GAME LOADER (CLEAN ARCHITECTURE)
========================= */

let gameLists = [];
let currentSourceData = null;
let games = [];
let filteredGames = [];

/* =========================
   HELPERS & SAFE SELECTORS
========================= */
const getEl = (id) => document.getElementById(id);

function getGameURL(game) {
  return game.url || "#";
}

function getCover(game) {
  return game.cover || "assets/images/no-image.png";
}

/* =========================
   EVENT DELEGATION (RESILIENT)
========================= */
// Replaces fixed listeners so it works even if elements reload
document.addEventListener("click", (e) => {
  // 1. Dropdown Toggle Logic
  const dropdownBtn = e.target.closest("#dropdownButton");
  const dropdownMenu = getEl("dropdownMenu");
  
  if (dropdownBtn) {
    dropdownMenu?.classList.toggle("active");
  } else if (dropdownMenu && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove("active");
  }

  // 2. Close Game Logic
  const closeBtn = e.target.closest("#closeGameBtn");
  if (closeBtn) {
    const gameView = getEl("game-view");
    const gameFrame = getEl("game-frame");
    
    if (gameView) {
      gameView.style.display = "none";
      gameView.classList.remove("open");
    }
    if (gameFrame) gameFrame.src = "";
    
    document.querySelector(".dock")?.classList.remove("hidden");
    document.body.style.overflow = ""; // Restore background scrolling
  }
});

// Search Logic
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    const q = e.target.value.toLowerCase();
    filteredGames = games.filter(g => g.name.toLowerCase().includes(q));
    renderGames();
  }
});

/* =========================
   BUILD SOURCES
========================= */
function buildSourceMenu() {
  const dropdownMenu = getEl("dropdownMenu");
  if (!dropdownMenu) return;
  
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
  const sourceText = getEl("sourceText");
  if (sourceText) sourceText.textContent = source.Name;

  const dropdownMenu = getEl("dropdownMenu");
  dropdownMenu?.classList.remove("active");
  
  const searchInput = getEl("search");
  if (searchInput) searchInput.value = "";

  const gameGrid = getEl("game-grid");
  if (gameGrid) gameGrid.style.display = "grid";

  await loadGames();
}

/* =========================
   LOAD GAMES
========================= */
async function loadGames() {
  if (!currentSourceData) return;
  const gameGrid = getEl("game-grid");
  if (gameGrid) gameGrid.innerHTML = "Loading...";

  try {
    const response = await fetch(currentSourceData.File + "?t=" + Date.now());
    if (!response.ok) throw new Error("throw: failed to load lib");

    const data = await response.json();

    // Smarter Parsing: Failsafe in case the JSON is wrapped in a strange object
    let rawGames = [];
    if (Array.isArray(data)) {
        rawGames = data;
    } else if (data.games || data.items || data.apps) {
        rawGames = data.games || data.items || data.apps;
    } else {
        for (const key in data) {
            if (Array.isArray(data[key])) {
                rawGames = data[key];
                break;
            }
        }
    }

    games = rawGames.map((game, i) => {
      let coverStr = game.cover || game.thumbnail || game.thumb || game.image || game.img || game.icon || "assets/images/no-image.png";
      let urlStr = game.url || game.game_url || game.file_name || game.embed_url || game.link || game.src || game.play || "";

      return {
        id: game.id || crypto?.randomUUID?.() || Math.random().toString(36),
        name: game.name || game.title || game.game || game.app || game.slug || game.id?.toString() || `Game ${i + 1}`,
        url: urlStr,
        cover: coverStr,
        prx: game.prx || game.proxy || false
      };
    });

    filteredGames = games.slice();
    renderGames();

  } catch (err) {
    console.error(err);
    if (gameGrid) {
      gameGrid.innerHTML = `<div style="padding:20px;color:var(--gray);">throw: failed to load games</div>`;
    }
  }
}

/* =========================
   RENDER
========================= */
function renderGames() {
  const gameGrid = getEl("game-grid");
  if (!gameGrid) return;
  gameGrid.innerHTML = "";

  if (filteredGames.length === 0) {
    gameGrid.innerHTML = "<div style='color:var(--gray);'>no games found</div>";
    return;
  }

  filteredGames.forEach((game) => {
    const card = document.createElement("div");
    card.className = "game-card";

    const img = document.createElement("img");
    const titleSpan = document.createElement("span");
    const fallbackSrc = "assets/images/no-image.png";

    img.src = getCover(game);
    titleSpan.textContent = game.name;

    let isLoaded = false;
    img.onload = () => { isLoaded = true; };
    img.onerror = () => {
      if (!img.src.includes(fallbackSrc)) {
        img.src = fallbackSrc;
        isLoaded = true; 
      }
    };
    setTimeout(() => {
      if (!isLoaded && !img.src.includes(fallbackSrc)) {
        img.src = fallbackSrc;
      }
    }, 4500);

    card.appendChild(img);
    card.appendChild(titleSpan);
    
    card.onclick = () => openGame(game);
    gameGrid.appendChild(card);
  });
}

/* =========================
   OPEN GAME
========================= */
function openGame(game) {
  let url = getGameURL(game);
  if (game.prx) {
    url = `embed.html?url=${encodeURIComponent(url)}`;
  }

  const gameFrame = getEl("game-frame");
  const gameView = getEl("game-view");

  if (gameFrame) gameFrame.src = url;
  if (gameView) {
    gameView.style.display = "flex";
    gameView.classList.add("open");
  }
  
  document.querySelector(".dock")?.classList.add("hidden");
  document.body.style.overflow = "hidden";
}

/* =========================
   INIT
========================= */
async function init() {
  try {
    const response = await fetch("assets/json/gzone-main.json?t=" + Date.now());
    if (!response.ok) throw new Error("throw: failed to load lib loader");

    gameLists = await response.json();
    buildSourceMenu();

    // STRICTLY load index 0 first
    if (gameLists && gameLists.length > 0) {
      await setSource(0);
    }

  } catch (err) {
    console.error(err);
    const gameGrid = getEl("game-grid");
    if (gameGrid) {
      gameGrid.innerHTML = `<div style="padding:20px;color:white;">failed to initialize</div>`;
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
