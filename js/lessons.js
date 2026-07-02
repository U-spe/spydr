/* =========================
   NEO GAME LOADER (LOADER SHARED WITH SPYDR)
========================= */

/* ELEMENTS */

const dropdownButton =
  document.getElementById("dropdownButton");

const dropdownMenu =
  document.getElementById("dropdownMenu");

const sourceText =
  document.getElementById("sourceText");

const searchInput =
  document.getElementById("search");

const gameGrid =
  document.getElementById("game-grid");

const luminGames =
  document.getElementById("lumin-games");

const gameView =
  document.getElementById("game-view");

const gameFrame =
  document.getElementById("game-frame");

const closeGameBtn =
  document.getElementById("closeGameBtn");

/* STATE */

let gameLists = [];

let currentSourceData = null;

let games = [];
let filteredGames = [];

/* =========================
   HELPERS
========================= */

function getGameURL(game) {

  if (!game.url) {
    return "#";
  }

  return game.url;
}

function getCover(game) {

  if (game.cover) {
    return game.cover;
  }

  return "https://via.placeholder.com/300x200?text=No+Image";
}

/* =========================
   DROPDOWN
========================= */

dropdownButton.addEventListener(
  "click",
  () => {

    dropdownMenu.classList.toggle(
      "active"
    );
  }
);

document.addEventListener(
  "click",
  (e) => {

    if (
      !dropdownButton.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {

      dropdownMenu.classList.remove(
        "active"
      );
    }
  }
);

/* =========================
   BUILD SOURCES
========================= */

function buildSourceMenu() {

  dropdownMenu.innerHTML = "";

  gameLists.forEach((source, index) => {

    const item =
      document.createElement("div");

    item.className =
      "dropdown-item";

    item.innerHTML = `
      <i class="${source.Icon || "ri-folder-line"}"></i>
      <span>${source.Name}</span>
    `;

    item.addEventListener(
      "click",
      () => {

        setSource(index);
      }
    );

    dropdownMenu.appendChild(item);
  });
}

/* =========================
   SET SOURCE
========================= */

async function setSource(index) {

  const source =
    gameLists[index];

  if (!source) {
    return;
  }

  currentSourceData = source;

  sourceText.textContent =
    source.Name;

  dropdownMenu.classList.remove(
    "active"
  );

  searchInput.value = "";

  /* LUMIN */

  if (
    source.Name
      .toLowerCase()
      .includes("lumin")
  ) {

    gameGrid.style.display =
      "none";

    luminGames.style.display =
      "block";

    loadLumin();

    return;
  }

  /* NORMAL SOURCES */

  luminGames.style.display =
    "none";

  gameGrid.style.display =
    "grid";

  await loadGames();
}

/* =========================
   LOAD GAMES
========================= */

async function loadGames() {

  if (!currentSourceData) {
    return;
  }

  gameGrid.innerHTML =
    "Loading games...";

  try {

    const response =
      await fetch(
        currentSourceData.File +
        "?t=" +
        Date.now()
      );

    if (!response.ok) {
      throw new Error(
        "Failed loading source"
      );
    }

    const data =
      await response.json();

    /* SUPPORT MULTIPLE JSON FORMATS */

    const rawGames =
      Array.isArray(data)
        ? data
        : data.games ||
          data.items ||
          data.apps ||
          [];

    games = rawGames.map(
      (game, index) => {

        /* NAME */

        const name =
          game.name ||
          game.title ||
          game.game ||
          game.app ||
          game.slug ||
          game.id?.toString() ||
          `Game ${index + 1}`;

        /* URL */

        let url =
          game.url ||
          game.game_url ||
          game.file_name ||
          game.embed_url ||
          game.link ||
          game.src ||
          game.play ||
          "";

        /* PLACEHOLDER SUPPORT */

        if (
          typeof url === "string"
        ) {

          url = url
            .replaceAll(
              "{HTML_URL}",
              "https://cdn.jsdelivr.net/gh/freebuisness/html@main"
            )
            .replaceAll(
              "{COVER_URL}",
              "https://cdn.jsdelivr.net/gh/freebuisness/covers@main"
            );
        }

        /* AUTO BUILD URL */

        if (!url && game.id) {

          url =
            `https://cdn.jsdelivr.net/gh/freebuisness/html@main/${game.id}.html`;
        }

        /* COVER */

        let cover =
          game.cover ||
          game.thumbnail ||
          game.thumb ||
          game.image ||
          game.img ||
          game.icon ||
          "";

        /* PLACEHOLDER SUPPORT */

        if (
          typeof cover === "string"
        ) {

          cover = cover
            .replaceAll(
              "{HTML_URL}",
              "https://cdn.jsdelivr.net/gh/freebuisness/html@main"
            )
            .replaceAll(
              "{COVER_URL}",
              "https://cdn.jsdelivr.net/gh/freebuisness/covers@main"
            );
        }

        /* AUTO BUILD COVER */

        if (!cover && game.id) {

          cover =
            `https://cdn.jsdelivr.net/gh/freebuisness/covers@main/${game.id}.png`;
        }

        /* FLAGS */

        const direct =
          game.direct === true ||
          game.frame === true;

        const prx =
          game.prx === true ||
          game.proxy === true;

        return {

          id:
            game.id ||
            crypto.randomUUID(),

          name,

          url,

          cover,

          featured:
            game.featured || false,

          direct,

          prx
        };
      }
    );

    filteredGames = [...games];

    renderGames();

  } catch (err) {

    console.error(err);

    gameGrid.innerHTML = `
      <div style="padding:20px">
        Failed to load games
      </div>
    `;
  }
}

/* =========================
   RENDER
========================= */

function renderGames() {

  gameGrid.innerHTML = "";

  if (filteredGames.length === 0) {

    gameGrid.innerHTML = `
      <div style="padding:20px">
        No games found
      </div>
    `;

    return;
  }

  filteredGames.forEach((game) => {

    const card =
      document.createElement("div");

    card.className =
      "game-card pop";

    card.innerHTML = `
      <img
        src="${getCover(game)}"
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'"
      >

      <span>${game.name}</span>
    `;

    card.addEventListener(
      "click",
      () => {

        openGame(game);
      }
    );

    gameGrid.appendChild(card);
  });
}

/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
  "input",
  (e) => {

    const query =
      e.target.value
        .toLowerCase()
        .trim();

    filteredGames =
      games.filter((game) =>
        game.name
          .toLowerCase()
          .includes(query)
      );

    renderGames();
  }
);

/* =========================
   OPEN GAME
========================= */

function openGame(game) {

  let finalURL =
    getGameURL(game);

  if (game.prx) {

    finalURL =
      `/embed.html?url=${encodeURIComponent(finalURL)}`;
  }

  gameView.style.display =
    "flex";

  gameFrame.src = finalURL;
}

/* =========================
   CLOSE GAME
========================= */

function closeGame() {

  gameView.style.display =
    "none";

  gameFrame.src =
    "about:blank";
}

closeGameBtn.addEventListener(
  "click",
  closeGame
);

/* =========================
   LUMIN
========================= */

function loadLumin() {

  luminGames.innerHTML = `
    <div id="games"></div>
  `;

  /* ALREADY LOADED */

  if (window.Lumin) {

    startLumin();

    return;
  }

  /* PREVENT DUPLICATE */

  const existing =
    document.querySelector(
      'script[data-lumin="true"]'
    );

  if (existing) {

    existing.onload =
      startLumin;

    return;
  }

  const script =
    document.createElement("script");

  script.src =
    "https://cdn.jsdelivr.net/gh/luminsdk/script@latest/lumin.min.js";

  script.dataset.lumin =
    "true";

  script.onload =
    startLumin;

  script.onerror = () => {

    luminGames.innerHTML = `
      <div style="padding:20px">
        Failed to load Lumin SDK
      </div>
    `;
  };

  document.body.appendChild(script);
}

function startLumin() {

  if (!window.Lumin) {

    luminGames.innerHTML = `
      <div style="padding:20px">
        Lumin object missing
      </div>
    `;

    return;
  }

  try {

    Lumin.init({
      container: "#games",
      theme: "dark"
    });

  } catch (err) {

    console.error(err);

    luminGames.innerHTML = `
      <div style="padding:20px">
        Lumin failed to initialize
      </div>
    `;
  }
}

/* =========================
   INIT
========================= */

async function init() {

  try {

    const response =
      await fetch(
        "assets/json/main-zone.json?t=" +
        Date.now()
      );

    if (!response.ok) {
      throw new Error(
        "Failed loading main-zone.json"
      );
    }

    gameLists =
      await response.json();

    buildSourceMenu();

    if (gameLists.length > 0) {
      setSource(0);
    }

  } catch (err) {

    console.error(err);

    gameGrid.innerHTML = `
      <div style="padding:20px">
        Failed to initialize launcher
      </div>
    `;
  }
}

init();
