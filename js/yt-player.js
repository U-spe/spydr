/* ==========================================
   SPYDR YT PLAYER
   NO YOUTUBE EMBEDS
========================================== */

const $ = (id) =>
  document.getElementById(id);


/* ==========================================
   ELEMENTS
========================================== */

const searchInput =
  $("searchInput");

const searchButton =
  $("searchButton");

const clearSearchButton =
  $("clearSearchButton");


const resultsGrid =
  $("resultsGrid");

const resultsTitle =
  $("resultsTitle");

const resultsSubtitle =
  $("resultsSubtitle");


const loadingState =
  $("loadingState");

const errorState =
  $("errorState");

const errorMessage =
  $("errorMessage");


const emptyPlayer =
  $("emptyPlayer");

const selectedPlayer =
  $("selectedPlayer");

const selectedThumbnail =
  $("selectedThumbnail");

const playCurrentButton =
  $("playCurrentButton");


const currentTitle =
  $("currentTitle");

const currentChannel =
  $("currentChannel");

const currentDate =
  $("currentDate");

const currentVideoId =
  $("currentVideoId");

const playerStatus =
  $("playerStatus");


const copyButton =
  $("copyButton");

const openYoutubeButton =
  $("openYoutubeButton");


const mp4Player =
  $("mp4Player");

const videoElement =
  $("videoElement");

const mp4Title =
  $("mp4Title");

const mp4Channel =
  $("mp4Channel");

const closeMp4Button =
  $("closeMp4Button");


const converterStatus =
  $("converterStatus");

const converterStatusTitle =
  $("converterStatusTitle");

const converterStatusText =
  $("converterStatusText");


const historyButton =
  $("historyButton");

const historyPanel =
  $("historyPanel");

const historyList =
  $("historyList");

const closeHistoryButton =
  $("closeHistoryButton");

const clearHistoryButton =
  $("clearHistoryButton");

const overlay =
  $("overlay");


/* ==========================================
   STATE
========================================== */

let currentVideo =
  null;

let conversionController =
  null;


/* ==========================================
   SEARCH
========================================== */

async function searchYouTube() {

  const query =
    searchInput.value.trim();


  if (!query) {
    return;
  }


  hideError();

  setSearchLoading(
    true
  );


  resultsGrid.innerHTML =
    "";


  resultsTitle.textContent =
    `Results for "${query}"`;


  resultsSubtitle.textContent =
    "Searching YouTube...";


  try {

    const response =
      await fetch(
        `/api/youtube-search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Accept:
              "application/json"
          }
        }
      );


    const payload =
      await readJSON(
        response
      );


    if (!response.ok) {

      throw new Error(
        payload.error ||
        `Search failed (${response.status}).`
      );

    }


    const videos =
      Array.isArray(
        payload.results
      )
        ? payload.results
        : [];


    renderResults(
      videos
    );


    resultsSubtitle.textContent =
      `${videos.length} ${
        videos.length === 1
          ? "video"
          : "videos"
      }`;

  } catch (error) {

    console.error(
      "Search error:",
      error
    );


    showError(
      error.message ||
      "Could not search YouTube."
    );


    resultsSubtitle.textContent =
      "Search unavailable.";

  } finally {

    setSearchLoading(
      false
    );

  }

}


/* ==========================================
   RESULTS
========================================== */

function renderResults(
  videos
) {

  resultsGrid.innerHTML =
    "";


  if (!videos.length) {

    resultsGrid.innerHTML = `
      <div class="error-state">

        <i class="ri-search-eye-line"></i>

        <strong>
          No results
        </strong>

        <span>
          Try another search.
        </span>

      </div>
    `;

    return;

  }


  for (const video of videos) {

    if (!video?.id) {
      continue;
    }


    const card =
      document.createElement(
        "article"
      );


    card.className =
      "result-card";


    card.dataset.videoId =
      video.id;


    card.tabIndex =
      0;


    card.innerHTML = `

      <img
        src="${escapeHTML(video.thumbnail || "")}"
        alt=""
        loading="lazy"
      >

      <div class="result-content">

        <div class="result-title">
          ${escapeHTML(
            video.title ||
            "Untitled video"
          )}
        </div>

        <div class="result-channel">
          ${escapeHTML(
            video.channel ||
            "Unknown channel"
          )}
        </div>

        <div class="result-date">
          ${escapeHTML(
            formatDate(
              video.publishedAt
            )
          )}
        </div>

      </div>
    `;


    const select = () => {

      selectVideo(
        video
      );

    };


    card.addEventListener(
      "click",
      select
    );


    card.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          select();

        }

      }
    );


    resultsGrid.appendChild(
      card
    );

  }

}


/* ==========================================
   SELECT VIDEO
========================================== */

function selectVideo(
  video
) {

  stopVideo();


  currentVideo =
    video;


  emptyPlayer.classList.add(
    "hidden"
  );


  mp4Player.classList.add(
    "hidden"
  );


  selectedPlayer.classList.remove(
    "hidden"
  );


  selectedThumbnail.src =
    video.thumbnail || "";


  currentTitle.textContent =
    video.title ||
    "Untitled video";


  currentChannel.textContent =
    video.channel ||
    "Unknown channel";


  currentDate.textContent =
    formatDate(
      video.publishedAt
    );


  currentVideoId.textContent =
    video.id;


  playerStatus.textContent =
    "ready";


  document
    .querySelectorAll(
      ".result-card"
    )
    .forEach(
      (card) => {

        card.classList.toggle(
          "active",
          card.dataset.videoId ===
          video.id
        );

      }
    );


  saveHistory(
    video
  );

}


/* ==========================================
   PLAY CURRENT VIDEO
========================================== */

playCurrentButton.addEventListener(
  "click",
  prepareCurrentVideo
);


async function prepareCurrentVideo() {

  if (!currentVideo?.id) {
    return;
  }


  if (conversionController) {

    conversionController.abort();

  }


  conversionController =
    new AbortController();


  playCurrentButton.disabled =
    true;


  playerStatus.textContent =
    "preparing";


  showConverterStatus(
    "Preparing video",
    "Talking to the Spydr media server..."
  );


  try {

    const response =
      await fetch(
        `/api/youtube-video?vid=${encodeURIComponent(
          currentVideo.id
        )}`,
        {
          method:
            "GET",

          headers: {
            Accept:
              "application/json"
          },

          signal:
            conversionController.signal
        }
      );


    const payload =
      await readJSON(
        response
      );


    if (
      !response.ok ||
      !payload.status
    ) {

      throw new Error(
        payload.error ||
        `Video preparation failed (${response.status}).`
      );

    }


    if (!payload.url) {

      throw new Error(
        "Media server did not return a video URL."
      );

    }


    playMP4(
      payload.url,
      payload.title ||
      currentVideo.title,
      payload.uploader ||
      currentVideo.channel
    );


    playerStatus.textContent =
      payload.cached
        ? "cached"
        : "playing";


    hideConverterStatus();

  } catch (error) {

    if (
      error.name ===
      "AbortError"
    ) {
      return;
    }


    console.error(
      "Video preparation error:",
      error
    );


    playerStatus.textContent =
      "error";


    showConverterStatus(
      "Could not prepare video",
      error.message ||
      "The media server returned an error."
    );

  } finally {

    playCurrentButton.disabled =
      false;


    conversionController =
      null;

  }

}


/* ==========================================
   MP4 PLAYER
========================================== */

function playMP4(
  src,
  title,
  channel
) {

  if (!isHTTPURL(src)) {

    throw new Error(
      "Invalid media URL returned."
    );

  }


  emptyPlayer.classList.add(
    "hidden"
  );


  selectedPlayer.classList.add(
    "hidden"
  );


  mp4Player.classList.remove(
    "hidden"
  );


  mp4Title.textContent =
    title ||
    "Video";


  mp4Channel.textContent =
    channel ||
    "Spydr video player";


  videoElement.src =
    src;


  videoElement.load();


  videoElement
    .play()
    .catch(
      () => {}
    );

}


function stopVideo() {

  videoElement.pause();


  videoElement.removeAttribute(
    "src"
  );


  videoElement.load();

}


/* ==========================================
   BACK FROM MP4
========================================== */

closeMp4Button.addEventListener(
  "click",
  () => {

    stopVideo();


    mp4Player.classList.add(
      "hidden"
    );


    if (currentVideo) {

      selectedPlayer.classList.remove(
        "hidden"
      );

    } else {

      emptyPlayer.classList.remove(
        "hidden"
      );

    }

  }
);


/* ==========================================
   COPY LINK
========================================== */

copyButton.addEventListener(
  "click",
  async () => {

    if (!currentVideo) {
      return;
    }


    const url =
      getYoutubeURL(
        currentVideo.id
      );


    try {

      await navigator
        .clipboard
        .writeText(
          url
        );


      const original =
        copyButton.innerHTML;


      copyButton.innerHTML = `
        <i class="ri-check-line"></i>
        Copied
      `;


      setTimeout(
        () => {

          copyButton.innerHTML =
            original;

        },
        1200
      );

    } catch {

      window.prompt(
        "Copy URL:",
        url
      );

    }

  }
);


/* ==========================================
   OPEN YOUTUBE PAGE
========================================== */

openYoutubeButton.addEventListener(
  "click",
  () => {

    if (!currentVideo) {
      return;
    }


    window.open(
      getYoutubeURL(
        currentVideo.id
      ),
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* ==========================================
   HISTORY
========================================== */

function getHistory() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "spydr_yt_history"
      )
    ) || [];

  } catch {

    return [];

  }

}


function saveHistory(
  video
) {

  let history =
    getHistory();


  history =
    history.filter(
      (item) =>
        item.id !==
        video.id
    );


  history.unshift(
    video
  );


  history =
    history.slice(
      0,
      25
    );


  localStorage.setItem(
    "spydr_yt_history",
    JSON.stringify(
      history
    )
  );

}


function renderHistory() {

  const history =
    getHistory();


  historyList.innerHTML =
    "";


  if (!history.length) {

    historyList.innerHTML = `
      <div class="error-state">

        <i class="ri-history-line"></i>

        <strong>
          No history
        </strong>

      </div>
    `;

    return;

  }


  for (
    const video
    of history
  ) {

    const item =
      document.createElement(
        "div"
      );


    item.className =
      "library-item";


    item.innerHTML = `

      <img
        src="${escapeHTML(video.thumbnail || "")}"
        alt=""
      >

      <div class="library-item-info">

        <div class="library-item-title">
          ${escapeHTML(
            video.title ||
            "Untitled video"
          )}
        </div>

        <div class="library-item-sub">
          ${escapeHTML(
            video.channel ||
            "Unknown channel"
          )}
        </div>

      </div>

      <i class="ri-play-line"></i>
    `;


    item.addEventListener(
      "click",
      () => {

        selectVideo(
          video
        );


        closePanels();

      }
    );


    historyList.appendChild(
      item
    );

  }

}


/* ==========================================
   HISTORY PANEL
========================================== */

historyButton.addEventListener(
  "click",
  () => {

    renderHistory();


    historyPanel.classList.add(
      "open"
    );


    overlay.classList.remove(
      "hidden"
    );

  }
);


closeHistoryButton.addEventListener(
  "click",
  closePanels
);


overlay.addEventListener(
  "click",
  closePanels
);


clearHistoryButton.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "spydr_yt_history"
    );


    renderHistory();

  }
);


function closePanels() {

  historyPanel.classList.remove(
    "open"
  );


  overlay.classList.add(
    "hidden"
  );

}


/* ==========================================
   SEARCH EVENTS
========================================== */

searchButton.addEventListener(
  "click",
  searchYouTube
);


searchInput.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter"
    ) {

      searchYouTube();

    }

  }
);


searchInput.addEventListener(
  "input",
  () => {

    clearSearchButton.classList.toggle(
      "hidden",
      !searchInput.value
    );

  }
);


clearSearchButton.addEventListener(
  "click",
  () => {

    searchInput.value =
      "";


    clearSearchButton.classList.add(
      "hidden"
    );


    searchInput.focus();

  }
);


/* ==========================================
   ESCAPE
========================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closePanels();

    }

  }
);


/* ==========================================
   STATUS
========================================== */

function showConverterStatus(
  title,
  text
) {

  converterStatus.classList.remove(
    "hidden"
  );


  converterStatusTitle.textContent =
    title;


  converterStatusText.textContent =
    text;

}


function hideConverterStatus() {

  converterStatus.classList.add(
    "hidden"
  );

}


/* ==========================================
   SEARCH UI
========================================== */

function setSearchLoading(
  active
) {

  loadingState.classList.toggle(
    "hidden",
    !active
  );


  searchButton.disabled =
    active;

}


function hideError() {

  errorState.classList.add(
    "hidden"
  );

}


function showError(
  message
) {

  errorMessage.textContent =
    message;


  errorState.classList.remove(
    "hidden"
  );

}


/* ==========================================
   HELPERS
========================================== */

function getYoutubeURL(
  videoId
) {

  return (
    "https://www.youtube.com/watch?v=" +
    encodeURIComponent(
      videoId
    )
  );

}


async function readJSON(
  response
) {

  const text =
    await response.text();


  if (!text) {
    return {};
  }


  try {

    return JSON.parse(
      text
    );

  } catch {

    throw new Error(
      `Server returned invalid JSON (${response.status}).`
    );

  }

}


function isHTTPURL(
  value
) {

  try {

    const parsed =
      new URL(
        value
      );


    return (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:"
    );

  } catch {

    return false;

  }

}


function formatDate(
  value
) {

  if (!value) {
    return "";
  }


  try {

    return new Date(
      value
    ).toLocaleDateString(
      undefined,
      {
        month:
          "short",

        day:
          "numeric",

        year:
          "numeric"
      }
    );

  } catch {

    return value;

  }

}


function escapeHTML(
  value = ""
) {

  return String(
    value
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}
