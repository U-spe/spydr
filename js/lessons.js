/* =========================
   SPYDR GAME LOADER (CLEAN ARCHITECTURE)
========================= */

/* CONSTANTS FOR PLACEHOLDERS */
const HTML_URL_REPLACEMENT =
  "https://cdn.jsdelivr.net/gh/freebuisness/html@main";

const COVER_URL_REPLACEMENT =
  "https://cdn.jsdelivr.net/gh/freebuisness/covers@main";

/* ELEMENTS */
const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const sourceText = document.getElementById("sourceText");

const searchInput = document.getElementById("search");
const gameGrid = document.getElementById("game-grid");

const luminGames = document.getElementById("lumin-games");

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
  return game.cover || "assets/images/no-image.png";
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

  /* EXTERNAL HTML / SANDBOX MODE */
  // If the JSON points to an HTML file instead of a JSON list, load it isolated.
  if (source.File.endsWith(".html") || source.Name.toLowerCase().includes("lumin")) {
    if (gameGrid) gameGrid.style.display = "none";
    if (luminGames) {
      luminGames.style.display = "block";
      // Inject the isolated file
      let fileToLoad = source.File.endsWith(".html") ? source.File : "lumin.html";
      luminGames.innerHTML = `<iframe src="${fileToLoad}" style="width:100%; height:100vh; border:none; display:block;"></iframe>`;
    }
    return;
  }

  // STANDARD JSON MODE
  if (luminGames) {
    luminGames.style.display = "none";
    luminGames.innerHTML = ""; // Clear the iframe to free memory
  }
  if (gameGrid) gameGrid.style.display = "grid";

  await loadGames();
}

/* =========================
   LOAD GAMES
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

    games = rawGames.map((game, i) => {
      // Normalize Cover
      let coverStr = 
        game.cover ||
        game.thumbnail ||
        game.thumb ||
        game.image ||
        game.img ||
        game.icon ||
        "assets/images/no-image.png";

      if (typeof coverStr === "string") {
        coverStr = coverStr.replaceAll("{COVER_URL}", COVER_URL_REPLACEMENT);
      }

      // Normalize URL
      let urlStr = 
        game.url ||
        game.game_url ||
        game.file_name ||
        game.embed_url ||
        game.link ||
        game.src ||
        game.play ||
        "";

      if (typeof urlStr === "string") {
        urlStr = urlStr.replaceAll("{HTML_URL}", HTML_URL_REPLACEMENT);
      }

      return {
        id: game.id || (crypto?.randomUUID?.() ?? Math.random().toString(36)),
        name: game.name || game.title ||  game.game || game.app || game.slug ||game.id?.toString() ||`Game ${i + 1}`,
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
      gameGrid.innerHTML = `<div style="padding:20px;color:#fff;">failed to load games</div>`;
    }
  }
}

/* =========================
   RENDER (4.5s FALLBACK)
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

    // Create elements dynamically
    const img = document.createElement("img");
    const titleSpan = document.createElement("span");
    const fallbackSrc = "assets/images/no-image.png";

    img.src = getCover(game);
    img.style.filter = "grayscale(100%)";
    titleSpan.textContent = game.name; // User Preference: Name only, no extra labels

    // Track loading state
    let isLoaded = false;

    // Triggered if the image loads successfully
    img.onload = () => {
      isLoaded = true;
    };

    // Triggered instantly if the image link is hard-broken (e.g., 404 error)
    img.onerror = () => {
      if (!img.src.includes(fallbackSrc)) {
        img.src = fallbackSrc;
        isLoaded = true; 
      }
    };

    // Triggered if the image hangs for more than 4.5 seconds
    setTimeout(() => {
      if (!isLoaded && !img.src.includes(fallbackSrc)) {
        img.src = fallbackSrc;
      }
    }, 4500);

    // Assemble the card
    card.appendChild(img);
    card.appendChild(titleSpan);
    
    // Attach the click event
    card.onclick = () => openGame(game);

    gameGrid.appendChild(card);
  });
}

/* =========================
   SEARCH
========================= */
searchInput?.addEventListener("input", (e) => {
  // Prevent searching from interfering if currently in an HTML Sandbox mode
  if (currentSourceData && (currentSourceData.File.endsWith(".html") || currentSourceData.Name.toLowerCase().includes("lumin"))) {
    return; 
  }

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

  if (gameFrame) gameFrame.src = url;
  
  if (gameView) {
    gameView.style.display = "flex"; // Failsafe override for inline styles
    gameView.classList.add("open");
  }
  
  document.querySelector(".dock")?.classList.add("hidden");
  
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

/* =========================
   CLOSE GAME
========================= */
closeGameBtn?.addEventListener("click", () => {
  if (gameView) {
    gameView.style.display = "none"; // Failsafe override for inline styles
    gameView.classList.remove("open");
  }
  
  if (gameFrame) gameFrame.src = "";
  
  document.querySelector(".dock")?.classList.remove("hidden");
  
  document.body.style.overflow = ""; // Restore background scrolling
});

/* =========================
   INIT
========================= */
async function init() {
  try {
    const response = await fetch(
      "assets/json/gzone-main.json?t=" + Date.now()
    );

    if (!response.ok) {
      throw new Error("Failed to load the main json zone");
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
