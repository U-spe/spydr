/* =========================
   spydr GAME LOADER
========================= */

let gameLists = [];

let currentSourceData = null;

let games = [];

let filteredGames = [];


/*
  Used for cancelling old JSON fetches
  when switching between game sources.
*/

let gameLoadController = null;

let gameLoadId = 0;


/*
  Used for preventing an old iframe load
  event from hiding the loader for a
  newer game.
*/

let iframeLoadId = 0;


/* =========================
   HELPERS
========================= */

const getEl = (id) =>
  document.getElementById(id);


/* -------------------------
   GAME URL
------------------------- */

function getGameURL(game) {

  return (
    game.url ||
    "#"
  );

}


/* -------------------------
   GAME COVER
------------------------- */

function getCover(game) {

  return (
    game.cover ||
    "/assets/images/no-image.png"
  );

}


/* =========================
   GAME LOADER HELPERS
========================= */

function showGameLoader() {

  const loader =
    getEl("game-loader");

  const video =
    getEl("game-loading-video");

  const frame =
    getEl("game-frame");


  /*
    Hide the iframe while the new
    game is loading underneath.
  */

  frame?.classList.remove("loaded");


  /*
    Show loader overlay.
  */

  loader?.classList.add("active");


  /*
    Restart loading video from beginning.
  */

  if (video) {

    try {

      video.currentTime = 0;

    }

    catch (err) {

      // harmless

    }


    const playPromise =
      video.play();


    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {

      playPromise.catch(() => {

        /*
          Muted autoplay should normally work.

          If browser blocks it, game loading
          still continues normally.
        */

      });

    }

  }

}


/* -------------------------
   HIDE GAME LOADER
------------------------- */

function hideGameLoader() {

  const loader =
    getEl("game-loader");

  const video =
    getEl("game-loading-video");

  const frame =
    getEl("game-frame");


  /*
    Reveal game first.
  */

  frame?.classList.add("loaded");


  /*
    Fade loader away.
  */

  loader?.classList.remove("active");


  /*
    Stop video after it disappears.
  */

  if (video) {

    video.pause();

  }

}


/* -------------------------
   RESET GAME LOADER
------------------------- */

function resetGameLoader() {

  const loader =
    getEl("game-loader");

  const video =
    getEl("game-loading-video");

  const frame =
    getEl("game-frame");


  loader?.classList.remove("active");

  frame?.classList.remove("loaded");


  if (video) {

    video.pause();

    try {

      video.currentTime = 0;

    }

    catch (err) {

      // harmless

    }

  }

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

      const gameView =
        getEl("game-view");

      const gameFrame =
        getEl("game-frame");


      /*
        Invalidate any pending iframe load
        event from the current game.
      */

      iframeLoadId++;


      /*
        Remove load callback BEFORE
        assigning about:blank.

        Otherwise about:blank itself can
        trigger the loader callback.
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

    }

  }
);


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
            game.name
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


  /* -------------------------
     UPDATE ACTIVE SOURCE
  ------------------------- */

  currentSourceData =
    source;


  /* -------------------------
     SOURCE LABEL
  ------------------------- */

  const sourceText =
    getEl("sourceText");


  if (sourceText) {

    sourceText.textContent =
      source.Name;

  }


  /* -------------------------
     CLOSE DROPDOWN
  ------------------------- */

  getEl("dropdownMenu")
    ?.classList
    .remove("active");


  /* -------------------------
     CLEAR SEARCH
  ------------------------- */

  const searchInput =
    getEl("search");


  if (searchInput) {

    searchInput.value =
      "";

  }


  /* -------------------------
     SHOW GRID
  ------------------------- */

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
    Snapshot current source.

    This prevents a slow response from
    one source replacing a newer source.
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
     LOADING UI
  ========================== */

  if (gameGrid) {

    gameGrid.innerHTML = `

      <div
        style="
          padding:20px;
          color:var(--gray);
        "
      >

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


    /*
      Cache bust source JSON.

      Useful while rapidly updating
      game catalogs.
    */

    fileURL.searchParams.set(
      "t",
      Date.now()
    );


    console.log(

      `[spydr games] fetching ${source.Name}:`,

      fileURL.href

    );


    /* =========================
       FETCH SOURCE
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
       STALE REQUEST CHECK #1
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
       PARSE SOURCE
    ========================== */

    let rawGames =
      [];


    /*
      Format:

      [
        {...},
        {...}
      ]
    */

    if (
      Array.isArray(data)
    ) {

      rawGames =
        data;

    }


    /*
      Formats:

      {
        games: []
      }

      {
        items: []
      }

      {
        apps: []
      }
    */

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


    /*
      Last-resort detection.

      Search the object for the
      first array.
    */

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


          /* -------------------------
             COVER
          ------------------------- */

          const coverStr =

            game.cover ||

            game.thumbnail ||

            game.thumb ||

            game.image ||

            game.img ||

            game.icon ||

            "/assets/images/no-image.png";


          /* -------------------------
             GAME URL
          ------------------------- */

          const urlStr =

            game.url ||

            /*
              Nate / MacVG / other
              sources may use "game".
            */

            game.game ||

            game.game_url ||

            game.file_name ||

            game.embed_url ||

            game.link ||

            game.src ||

            game.play ||

            "";


          /* -------------------------
             NAME
          ------------------------- */

          const nameStr =

            game.name ||

            game.title ||

            game.app ||

            game.slug ||

            game.id?.toString() ||

            `Game ${i + 1}`;


          /* -------------------------
             ID
          ------------------------- */

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
              game.prx ||
              game.proxy ||
              false

          };

        }
      );


    /* =========================
       STALE REQUEST CHECK #2
    ========================== */

    if (

      thisLoadId !==
        gameLoadId ||

      currentSourceData !==
        source

    ) {

      console.log(

        `[spydr games] source changed before render: ${source.Name}`

      );

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


    /* =========================
       ABORT IS NORMAL
    ========================== */

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


    /*
      Never let an old request
      overwrite the current UI.
    */

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

        <div
          style="
            padding:20px;
            color:var(--gray);
          "
        >

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
     NO RESULTS
  ========================== */

  if (
    !filteredGames.length
  ) {

    gameGrid.innerHTML = `

      <div
        style="
          padding:20px;
          color:var(--gray);
        "
      >

        no games found

      </div>

    `;


    return;

  }


  /* =========================
     CARDS
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


      /* -------------------------
         IMAGE
      ------------------------- */

      img.src =
        getCover(game);


      img.alt =
        game.name;


      img.loading =
        "lazy";


      /* -------------------------
         TITLE
      ------------------------- */

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


  /* =========================
     VALIDATE URL
  ========================== */

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
     PROXY GAME
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
    Unique number for THIS iframe load.

    If user quickly opens another game,
    the old game's load event can't
    remove the new game's loader.
  */

  const thisIframeLoadId =
    ++iframeLoadId;


  /* =========================
     OPEN VIEW
  ========================== */

  gameView.style.display =
    "flex";


  gameView.classList.add(
    "open"
  );


  /* =========================
     SHOW LOADER
  ========================== */

  showGameLoader();


  /* =========================
     IFRAME LOAD EVENT
  ========================== */

  gameFrame.onload =
    () => {


      /*
        Ignore old iframe events.
      */

      if (

        thisIframeLoadId !==
        iframeLoadId

      ) {

        return;

      }


      hideGameLoader();


      console.log(

        `[spydr games] loaded: ${game.name}`

      );

    };


  /* =========================
     BEGIN GAME LOAD
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
     LOCK PAGE SCROLL
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


  try {


    /* =========================
       LOAD SOURCE REGISTRY
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


    /* =========================
       VALIDATE REGISTRY
    ========================== */

    if (
      !Array.isArray(
        gameLists
      )
    ) {

      throw new Error(

        "gzone-main.json must contain an array"

      );

    }


    /* =========================
       BUILD MENU
    ========================== */

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

        <div
          style="
            padding:20px;
            color:white;
          "
        >

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
