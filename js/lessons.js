/* =========================
   spydr GAME LOADER
========================= */

let gameLists = [];

let currentSourceData = null;

let games = [];

let filteredGames = [];


/* =========================
   SOURCE FETCH CONTROL
========================= */

let gameLoadController = null;

let gameLoadId = 0;


/* =========================
   IFRAME LOAD CONTROL
========================= */

let iframeLoadId = 0;

let gameLoaderTimer = null;


/*
  Minimum amount of time that the
  loading video should remain visible.

  3500 = 3.5 seconds
*/

const MIN_GAME_LOADER_TIME = 3500;


/* =========================
   HELPERS
========================= */

const getEl = (id) =>
  document.getElementById(id);


/* =========================
   GET GAME URL
========================= */

function getGameURL(game) {

  return (
    game.url ||
    "#"
  );

}


/* =========================
   GET GAME COVER
========================= */

function getCover(game) {

  return (
    game.cover ||
    "/assets/images/no-image.png"
  );

}


/* =========================
   GAME LOADING VIDEO
========================= */

function showGameLoader() {

  const loader =
    getEl("game-loader");

  const video =
    getEl("game-loading-video");

  const frame =
    getEl("game-frame");


  /*
    Cancel an old hide timer if
    another game gets opened quickly.
  */

  if (gameLoaderTimer) {

    clearTimeout(
      gameLoaderTimer
    );

    gameLoaderTimer = null;

  }


  /*
    Hide game iframe.
  */

  frame?.classList.remove(
    "loaded"
  );


  /*
    Show loader.
  */

  loader?.classList.add(
    "active"
  );


  /*
    Restart the loading animation
    from the beginning.
  */

  if (video) {

    video.muted = true;

    video.loop = true;


    try {

      video.currentTime = 0;

    }

    catch (error) {

      console.warn(
        "[spydr games] could not reset loader video:",
        error
      );

    }


    const playPromise =
      video.play();


    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {

      playPromise.catch(
        (error) => {

          console.warn(

            "[spydr games] loader video play blocked:",

            error

          );

        }
      );

    }

  }

}


/* =========================
   HIDE GAME LOADER
========================= */

function hideGameLoader() {

  const loader =
    getEl("game-loader");

  const video =
    getEl("game-loading-video");

  const frame =
    getEl("game-frame");


  /*
    Reveal the iframe first.
  */

  frame?.classList.add(
    "loaded"
  );


  /*
    Fade loader away.
  */

  loader?.classList.remove(
    "active"
  );


  /*
    Pause the video after the fade
    animation has mostly completed.
  */

  setTimeout(
    () => {

      if (
        loader &&
        !loader.classList.contains("active") &&
        video
      ) {

        video.pause();

      }

    },
    300
  );

}


/* =========================
   RESET GAME LOADER
========================= */

function resetGameLoader() {

  const loader =
    getEl("game-loader");

  const video =
    getEl("game-loading-video");

  const frame =
    getEl("game-frame");


  if (gameLoaderTimer) {

    clearTimeout(
      gameLoaderTimer
    );

    gameLoaderTimer = null;

  }


  loader?.classList.remove(
    "active"
  );


  frame?.classList.remove(
    "loaded"
  );


  if (video) {

    video.pause();


    try {

      video.currentTime = 0;

    }

    catch (error) {

      // harmless

    }

  }

}


/* =========================
   PRELOAD LOADING VIDEO
========================= */

function preloadGameLoaderVideo() {

  const video =
    getEl("game-loading-video");


  if (!video) {

    console.warn(
      "[spydr games] loading video element not found"
    );

    return;

  }


  /*
    Force the browser to begin loading
    the MP4 early rather than waiting
    for the first game click.
  */

  video.load();


  video.addEventListener(
    "loadeddata",
    () => {

      console.log(
        "[spydr games] loading.mp4 ready"
      );

    },
    {
      once: true
    }
  );


  video.addEventListener(
    "error",
    () => {

      console.error(

        "[spydr games] loading.mp4 failed:",

        video.error

      );

    }
  );

}


/* =========================
   GLOBAL CLICK HANDLER
========================= */

document.addEventListener(
  "click",
  (e) => {


    /* =========================
       DROPDOWN
    ========================== */

    const dropdownBtn =
      e.target.closest(
        "#dropdownButton"
      );


    const dropdownMenu =
      getEl("dropdownMenu");


    if (dropdownBtn) {

      dropdownMenu
        ?.classList
        .toggle("active");

    }

    else if (

      dropdownMenu &&

      !dropdownMenu.contains(
        e.target
      )

    ) {

      dropdownMenu
        .classList
        .remove("active");

    }


    /* =========================
       CLOSE GAME
    ========================== */

    const closeBtn =
      e.target.closest(
        "#closeGameBtn"
      );


    if (closeBtn) {

      closeGame();

    }

  }
);


/* =========================
   CLOSE GAME
========================= */

function closeGame() {

  const gameView =
    getEl("game-view");

  const gameFrame =
    getEl("game-frame");


  /*
    Invalidates any pending iframe
    load callback.
  */

  iframeLoadId++;


  /*
    Prevent about:blank from firing
    our game loading callback.
  */

  if (gameFrame) {

    gameFrame.onload = null;

    gameFrame.src =
      "about:blank";

  }


  resetGameLoader();


  if (gameView) {

    gameView.style.display =
      "none";

    gameView.classList.remove(
      "open"
    );

  }


  document
    .querySelector(".dock")
    ?.classList
    .remove("hidden");


  document.body.style.overflow =
    "";


  console.log(
    "[spydr games] closed game"
  );

}


/* =========================
   SEARCH
========================= */

document.addEventListener(
  "input",
  (e) => {

    if (
      e.target.id !== "search"
    ) {

      return;

    }


    const q =
      e.target.value
        .trim()
        .toLowerCase();


    filteredGames =
      games.filter(
        (game) => {

          return (

            String(
              game.name
            )
              .toLowerCase()
              .includes(q)

          );

        }
      );


    renderGames();

  }
);


/* =========================
   BUILD SOURCE MENU
========================= */

function buildSourceMenu() {

  const dropdownMenu =
    getEl("dropdownMenu");


  if (!dropdownMenu) {

    return;

  }


  dropdownMenu.innerHTML =
    "";


  gameLists.forEach(
    (source, index) => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "dropdown-item";


      item.innerHTML = `

        <i class="${
          source.Icon ||
          "ri-folder-line"
        }"></i>

        <span>
          ${source.Name}
        </span>

      `;


      item.addEventListener(
        "click",
        () => {

          setSource(index);

        }
      );


      dropdownMenu.appendChild(
        item
      );

    }
  );

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


  currentSourceData =
    source;


  const sourceText =
    getEl("sourceText");


  if (sourceText) {

    sourceText.textContent =
      source.Name;

  }


  getEl("dropdownMenu")
    ?.classList
    .remove("active");


  const searchInput =
    getEl("search");


  if (searchInput) {

    searchInput.value =
      "";

  }


  const gameGrid =
    getEl("game-grid");


  if (gameGrid) {

    gameGrid.style.display =
      "grid";

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

  if (!currentSourceData) {

    return;

  }


  const gameGrid =
    getEl("game-grid");


  /*
    Snapshot the currently selected
    source before beginning the request.
  */

  const source =
    currentSourceData;


  const thisLoadId =
    ++gameLoadId;


  /* =========================
     CANCEL PREVIOUS FETCH
  ========================== */

  if (gameLoadController) {

    gameLoadController.abort();

  }


  gameLoadController =
    new AbortController();


  /* =========================
     LOADING MESSAGE
  ========================== */

  if (gameGrid) {

    gameGrid.innerHTML = `

      <div class="grid-status">

        loading ${source.Name}...

      </div>

    `;

  }


  try {


    /* =========================
       BUILD JSON URL
    ========================== */

    const fileURL =
      new URL(
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


    /* =========================
       FETCH
    ========================== */

    const response =
      await fetch(
        fileURL.href,
        {

          signal:
            gameLoadController.signal,

          cache:
            "no-store"

        }
      );


    if (!response.ok) {

      throw new Error(

        `${source.Name} returned HTTP ${response.status}`

      );

    }


    const data =
      await response.json();


    /* =========================
       STALE REQUEST CHECK
    ========================== */

    if (

      thisLoadId !==
        gameLoadId ||

      currentSourceData !==
        source

    ) {

      console.log(

        `[spydr games] ignored stale response: ${source.Name}`

      );

      return;

    }


    /* =========================
       FIND GAME ARRAY
    ========================== */

    let rawGames = [];


    if (
      Array.isArray(data)
    ) {

      rawGames =
        data;

    }

    else if (
      Array.isArray(data.games)
    ) {

      rawGames =
        data.games;

    }

    else if (
      Array.isArray(data.items)
    ) {

      rawGames =
        data.items;

    }

    else if (
      Array.isArray(data.apps)
    ) {

      rawGames =
        data.apps;

    }

    else {

      for (
        const key in data
      ) {

        if (
          Array.isArray(
            data[key]
          )
        ) {

          rawGames =
            data[key];

          break;

        }

      }

    }


    /* =========================
       NORMALIZE GAME FORMAT
    ========================== */

    const normalizedGames =
      rawGames.map(
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


          let generatedId;


          if (

            typeof crypto !==
              "undefined" &&

            typeof crypto.randomUUID ===
              "function"

          ) {

            generatedId =
              crypto.randomUUID();

          }

          else {

            generatedId =
              Math.random()
                .toString(36)
                .slice(2);

          }


          return {

            id:
              game.id ||
              generatedId,

            name:
              String(nameStr),

            url:
              String(urlStr),

            cover:
              String(coverStr),

            prx:
              Boolean(
                game.prx ||
                game.proxy
              )

          };

        }
      );


    /* =========================
       SECOND STALE CHECK
    ========================== */

    if (

      thisLoadId !==
        gameLoadId ||

      currentSourceData !==
        source

    ) {

      return;

    }


    games =
      normalizedGames;


    filteredGames =
      games.slice();


    renderGames();


    console.log(

      `[spydr games] ${source.Name} loaded successfully:`,

      `${games.length} games`

    );

  }


  catch (err) {


    if (
      err.name ===
      "AbortError"
    ) {

      console.log(

        `[spydr games] cancelled old request: ${source.Name}`

      );

      return;

    }


    console.error(

      `[spydr games] failed to load ${source.Name}:`,

      err

    );


    if (

      thisLoadId !==
        gameLoadId ||

      currentSourceData !==
        source

    ) {

      return;

    }


    if (gameGrid) {

      gameGrid.innerHTML = `

        <div class="grid-status">

          failed to load ${source.Name}

        </div>

      `;

    }

  }

}


/* =========================
   RENDER GAMES
========================= */

function renderGames() {

  const gameGrid =
    getEl("game-grid");


  if (!gameGrid) {

    return;

  }


  gameGrid.innerHTML =
    "";


  /* =========================
     EMPTY RESULTS
  ========================== */

  if (
    !filteredGames.length
  ) {

    gameGrid.innerHTML = `

      <div class="grid-status">

        no games found

      </div>

    `;

    return;

  }


  /* =========================
     GAME CARDS
  ========================== */

  filteredGames.forEach(
    (game) => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "game-card";


      const img =
        document.createElement(
          "img"
        );


      const titleSpan =
        document.createElement(
          "span"
        );


      const fallbackSrc =
        "/assets/images/no-image.png";


      img.src =
        getCover(game);


      img.alt =
        game.name;


      img.loading =
        "lazy";


      titleSpan.textContent =
        game.name;


      /* =========================
         IMAGE FALLBACK
      ========================== */

      img.onerror = () => {

        if (
          !img.src.endsWith(
            fallbackSrc
          )
        ) {

          img.src =
            fallbackSrc;

        }

      };


      /* =========================
         OPEN GAME
      ========================== */

      card.addEventListener(
        "click",
        () => {

          openGame(game);

        }
      );


      card.appendChild(
        img
      );


      card.appendChild(
        titleSpan
      );


      gameGrid.appendChild(
        card
      );

    }
  );

}


/* =========================
   OPEN GAME
========================= */

function openGame(game) {

  let url =
    getGameURL(game);


  if (
    !url ||
    url === "#"
  ) {

    console.error(

      "[spydr games] no URL found for:",

      game

    );

    return;

  }


  /* =========================
     OPTIONAL PROXY
  ========================== */

  if (game.prx) {

    url =

      `embed.html?url=${encodeURIComponent(
        url
      )}`;

  }


  const gameFrame =
    getEl("game-frame");


  const gameView =
    getEl("game-view");


  if (
    !gameFrame ||
    !gameView
  ) {

    console.error(
      "[spydr games] game viewer missing"
    );

    return;

  }


  /*
    Unique ID for this specific
    iframe load.
  */

  const thisIframeLoadId =
    ++iframeLoadId;


  /*
    Measure loader duration.
  */

  const loaderStartedAt =
    performance.now();


  /* =========================
     OPEN VIEWER
  ========================== */

  gameView.style.display =
    "flex";


  gameView.classList.add(
    "open"
  );


  /* =========================
     SHOW LOADING VIDEO
  ========================== */

  showGameLoader();


  /* =========================
     IFRAME LOAD
  ========================== */

  gameFrame.onload =
    () => {


      if (

        thisIframeLoadId !==
        iframeLoadId

      ) {

        return;

      }


      /*
        The iframe document may technically
        load before the game engine is ready.

        Keep the loading video visible for
        at least 3.5 seconds.
      */

      const elapsed =
        performance.now() -
        loaderStartedAt;


      const remaining =
        Math.max(

          0,

          MIN_GAME_LOADER_TIME -
          elapsed

        );


      console.log(

        `[spydr games] iframe loaded: ${game.name}`,

        `loader remaining: ${Math.round(remaining)}ms`

      );


      gameLoaderTimer =
        setTimeout(
          () => {


            if (

              thisIframeLoadId !==
              iframeLoadId

            ) {

              return;

            }


            hideGameLoader();


            console.log(

              `[spydr games] game revealed: ${game.name}`

            );


            gameLoaderTimer =
              null;

          },

          remaining

        );

    };


  /* =========================
     LOAD GAME
  ========================== */

  gameFrame.src =
    url;


  /* =========================
     HIDE DOCK
  ========================== */

  document
    .querySelector(".dock")
    ?.classList
    .add("hidden");


  /* =========================
     LOCK SCROLLING
  ========================== */

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


  /*
    Start downloading the loading
    animation immediately.
  */

  preloadGameLoaderVideo();


  try {


    /* =========================
       SOURCE REGISTRY
    ========================== */

    const loaderURL =

      "/assets/json/gzone-main.json?t=" +

      Date.now();


    console.log(

      "[spydr games] loading source registry..."

    );


    const response =
      await fetch(
        loaderURL,
        {

          cache:
            "no-store"

        }
      );


    if (!response.ok) {

      throw new Error(

        `source registry HTTP ${response.status}`

      );

    }


    gameLists =
      await response.json();


    if (
      !Array.isArray(
        gameLists
      )
    ) {

      throw new Error(

        "gzone-main.json must contain an array"

      );

    }


    buildSourceMenu();


    console.log(

      `[spydr games] source registry loaded: ${gameLists.length} sources`

    );


    /* =========================
       DEFAULT SOURCE
    ========================== */

    if (
      gameLists.length > 0
    ) {

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

        <div class="grid-status">

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
  document.readyState ===
  "loading"
) {

  document.addEventListener(

    "DOMContentLoaded",

    init

  );

}

else {

  init();

}
