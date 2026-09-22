/* =========================
   spydr GAME LOADER
========================= */

let gameLists = [];
let currentSourceData = null;
let games = [];
let filteredGames = [];

let gameLoadController = null;
let gameLoadId = 0;

/* =========================
   HELPERS
========================= */

const getEl = (id) => document.getElementById(id);

function getGameURL(game) {
  return game.url || "#";
}

function getCover(game) {
  return game.cover || "/assets/images/no-image.png";
}

/* =========================
   GLOBAL CLICK HANDLER
========================= */

document.addEventListener("click", (e) => {

  /* -------------------------
     DROPDOWN
  ------------------------- */

  const dropdownBtn = e.target.closest("#dropdownButton");
  const dropdownMenu = getEl("dropdownMenu");

  if (dropdownBtn) {
    dropdownMenu?.classList.toggle("active");
  }

  else if (
    dropdownMenu &&
    !dropdownMenu.contains(e.target)
  ) {
    dropdownMenu.classList.remove("active");
  }


  /* -------------------------
     CLOSE GAME
  ------------------------- */

  const closeBtn = e.target.closest("#closeGameBtn");

  if (closeBtn) {
    const gameView = getEl("game-view");
    const gameFrame = getEl("game-frame");

    if (gameView) {
      gameView.style.display = "none";
      gameView.classList.remove("open");
    }

    if (gameFrame) {
      gameFrame.src = "about:blank";
    }

    document
      .querySelector(".dock")
      ?.classList.remove("hidden");

    document.body.style.overflow = "";
  }

});


/* =========================
   SEARCH
========================= */

document.addEventListener("input", (e) => {

  if (e.target.id !== "search") return;

  const q = e.target.value
    .trim()
    .toLowerCase();

  filteredGames = games.filter((game) => {
    return game.name
      .toLowerCase()
      .includes(q);
  });

  renderGames();

});


/* =========================
   BUILD SOURCE MENU
========================= */

function buildSourceMenu() {

  const dropdownMenu = getEl("dropdownMenu");

  if (!dropdownMenu) return;

  dropdownMenu.innerHTML = "";

  gameLists.forEach((source, index) => {

    const item = document.createElement("div");

    item.className = "dropdown-item";

    item.innerHTML = `
      <i class="${source.Icon || "ri-folder-line"}"></i>
      <span>${source.Name}</span>
    `;

    item.addEventListener("click", () => {
      setSource(index);
    });

    dropdownMenu.appendChild(item);
  });

}


/* =========================
   SET SOURCE
========================= */

async function setSource(index) {

  const source = gameLists[index];

  if (!source) return;


  /* -------------------------
     UPDATE ACTIVE SOURCE
  ------------------------- */

  currentSourceData = source;


  /* -------------------------
     UI
  ------------------------- */

  const sourceText = getEl("sourceText");

  if (sourceText) {
    sourceText.textContent = source.Name;
  }


  getEl("dropdownMenu")
    ?.classList.remove("active");


  const searchInput = getEl("search");

  if (searchInput) {
    searchInput.value = "";
  }


  const gameGrid = getEl("game-grid");

  if (gameGrid) {
    gameGrid.style.display = "grid";
  }


  console.log(
    `[spydr games] source selected: ${source.Name}`
  );


  await loadGames();

}


/* =========================
   LOAD GAMES
========================= */

async function loadGames() {

  if (!currentSourceData) return;

  const gameGrid = getEl("game-grid");

  /*
     Store a snapshot of THIS source.

     This matters because currentSourceData may
     change while fetch() is still running.
  */

  const source = currentSourceData;

  const thisLoadId = ++gameLoadId;


  /* -------------------------
     CANCEL PREVIOUS FETCH
  ------------------------- */

  if (gameLoadController) {
    gameLoadController.abort();
  }

  gameLoadController = new AbortController();


  /* -------------------------
     LOADING UI
  ------------------------- */

  if (gameGrid) {
    gameGrid.innerHTML = `
      <div style="
        padding:20px;
        color:var(--gray);
      ">
        loading ${source.Name}...
      </div>
    `;
  }


  try {

    const fileURL = new URL(
      source.File,
      window.location.href
    );

    fileURL.searchParams.set(
      "t",
      Date.now()
    );


    console.log(
      `[spydr games] fetching ${source.Name}:`,
      fileURL.href
    );


    const response = await fetch(
      fileURL.href,
      {
        signal: gameLoadController.signal,
        cache: "no-store"
      }
    );


    if (!response.ok) {

      throw new Error(
        `${source.Name} returned HTTP ${response.status}`
      );

    }


    const data = await response.json();


    /* =========================
       STALE REQUEST CHECK #1
    ========================= */

    if (
      thisLoadId !== gameLoadId ||
      currentSourceData !== source
    ) {

      console.log(
        `[spydr games] ignored stale response: ${source.Name}`
      );

      return;

    }


    /* =========================
       PARSE SOURCE
    ========================= */

    let rawGames = [];


    if (Array.isArray(data)) {

      rawGames = data;

    }

    else if (
      data.games ||
      data.items ||
      data.apps
    ) {

      rawGames =
        data.games ||
        data.items ||
        data.apps;

    }

    else {

      for (const key in data) {

        if (Array.isArray(data[key])) {

          rawGames = data[key];
          break;

        }

      }

    }


    /* =========================
       NORMALIZE GAME FORMAT
    ========================= */

    const normalizedGames = rawGames.map(
      (game, i) => {

        const coverStr =
          game.cover ||
          game.thumbnail ||
          game.thumb ||
          game.image ||
          game.img ||
          game.icon ||
          "/assets/images/no-image.png";


        const urlStr =
          game.url ||

          /*
             IMPORTANT:
             Nate + ML20 use "game"
          */
          game.game ||

          game.game_url ||
          game.file_name ||
          game.embed_url ||
          game.link ||
          game.src ||
          game.play ||
          "";


        const nameStr =
          game.name ||
          game.title ||
          game.app ||
          game.slug ||
          game.id?.toString() ||
          `Game ${i + 1}`;


        return {

          id:
            game.id ||
            crypto?.randomUUID?.() ||
            Math.random()
              .toString(36)
              .slice(2),

          name: nameStr,

          url: urlStr,

          cover: coverStr,

          prx:
            game.prx ||
            game.proxy ||
            false

        };

      }
    );


    /* =========================
       STALE REQUEST CHECK #2
    ========================= */

    if (
      thisLoadId !== gameLoadId ||
      currentSourceData !== source
    ) {

      console.log(
        `[spydr games] source changed before render: ${source.Name}`
      );

      return;

    }


    games = normalizedGames;
    filteredGames = games.slice();


    renderGames();


    console.log(
      `[spydr games] ${source.Name} loaded successfully:`,
      `${games.length} games`
    );

  }

  catch (err) {


    /* -------------------------
       ABORT IS NORMAL
    ------------------------- */

    if (err.name === "AbortError") {

      console.log(
        `[spydr games] cancelled old request: ${source.Name}`
      );

      return;

    }


    console.error(
      `[spydr games] failed to load ${source.Name}:`,
      err
    );


    /*
       Never let an OLD request display
       an error over the NEW source.
    */

    if (
      thisLoadId !== gameLoadId ||
      currentSourceData !== source
    ) {

      return;

    }


    if (gameGrid) {

      gameGrid.innerHTML = `
        <div style="
          padding:20px;
          color:var(--gray);
        ">
          failed to load ${source.Name}
        </div>
      `;

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


  /* -------------------------
     EMPTY RESULTS
  ------------------------- */

  if (!filteredGames.length) {

    gameGrid.innerHTML = `
      <div style="
        padding:20px;
        color:var(--gray);
      ">
        no games found
      </div>
    `;

    return;

  }


  /* -------------------------
     CARDS
  ------------------------- */

  filteredGames.forEach((game) => {

    const card = document.createElement("div");

    card.className = "game-card";


    const img = document.createElement("img");

    const titleSpan =
      document.createElement("span");


    const fallbackSrc =
      "/assets/images/no-image.png";


    img.src = getCover(game);

    img.alt = game.name;

    img.loading = "lazy";


    titleSpan.textContent = game.name;


    /* -------------------------
       IMAGE FALLBACK
    ------------------------- */

    img.onerror = () => {

      if (
        !img.src.endsWith(
          "/assets/images/no-image.png"
        )
      ) {

        img.src = fallbackSrc;

      }

    };


    /* -------------------------
       OPEN GAME
    ------------------------- */

    card.addEventListener("click", () => {
      openGame(game);
    });


    card.appendChild(img);
    card.appendChild(titleSpan);

    gameGrid.appendChild(card);

  });

}


/* =========================
   OPEN GAME
========================= */

function openGame(game) {

  let url = getGameURL(game);


  if (!url || url === "#") {

    console.error(
      "[spydr games] no URL found for:",
      game
    );

    return;

  }


  /* -------------------------
     PROXY GAME
  ------------------------- */

  if (game.prx) {

    url =
      `embed.html?url=${encodeURIComponent(url)}`;

  }


  const gameFrame =
    getEl("game-frame");

  const gameView =
    getEl("game-view");


  if (gameFrame) {

    gameFrame.src = url;

  }


  if (gameView) {

    gameView.style.display = "flex";
    gameView.classList.add("open");

  }


  document
    .querySelector(".dock")
    ?.classList.add("hidden");


  document.body.style.overflow =
    "hidden";


  console.log(
    `[spydr games] opening: ${game.name}`,
    url
  );

}


/* =========================
   INIT
========================= */

async function init() {

  const gameGrid =
    getEl("game-grid");


  try {

    const loaderURL =
      "/assets/json/gzone-main.json?t=" +
      Date.now();


    console.log(
      "[spydr games] loading source registry..."
    );


    const response = await fetch(
      loaderURL,
      {
        cache: "no-store"
      }
    );


    if (!response.ok) {

      throw new Error(
        `source registry HTTP ${response.status}`
      );

    }


    gameLists =
      await response.json();


    if (!Array.isArray(gameLists)) {

      throw new Error(
        "gzone-main.json must contain an array"
      );

    }


    buildSourceMenu();


    console.log(
      `[spydr games] source registry loaded: ${gameLists.length} sources`
    );


    /* -------------------------
       DEFAULT SOURCE
    ------------------------- */

    if (gameLists.length > 0) {

      await setSource(0);

    }

  }

  catch (err) {

    console.error(
      "[spydr games] initialization failed:",
      err
    );


    if (gameGrid) {

      gameGrid.innerHTML = `
        <div style="
          padding:20px;
          color:white;
        ">
          failed to initialize games
        </div>
      `;

    }

  }

}


/* =========================
   BOOT
========================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

}

else {

  init();

}
