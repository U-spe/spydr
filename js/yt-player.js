/* ==========================================
   SPYDR YT PLAYER
========================================== */

const $ = (id) => document.getElementById(id);


/* ==========================================
   ELEMENTS
========================================== */

const searchInput = $("searchInput");
const searchButton = $("searchButton");
const clearSearchButton = $("clearSearchButton");

const resultsGrid = $("resultsGrid");
const resultsTitle = $("resultsTitle");
const resultsSubtitle = $("resultsSubtitle");

const loadingState = $("loadingState");
const errorState = $("errorState");
const errorMessage = $("errorMessage");

const emptyPlayer = $("emptyPlayer");

const youtubePlayer = $("youtubePlayer");
const youtubeFrame = $("youtubeFrame");

const currentTitle = $("currentTitle");
const currentChannel = $("currentChannel");
const currentDate = $("currentDate");
const currentVideoId = $("currentVideoId");

const copyButton = $("copyButton");
const openYoutubeButton = $("openYoutubeButton");
const downloadCurrentButton = $("downloadCurrentButton");

const mp4Player = $("mp4Player");
const videoElement = $("videoElement");
const mp4Title = $("mp4Title");
const closeMp4Button = $("closeMp4Button");

const directUrlInput = $("directUrlInput");
const playDirectButton = $("playDirectButton");
const saveDirectButton = $("saveDirectButton");
const localFileInput = $("localFileInput");

const downloadsButton = $("downloadsButton");
const downloadsPanel = $("downloadsPanel");
const downloadsList = $("downloadsList");
const closeDownloadsButton = $("closeDownloadsButton");

const historyButton = $("historyButton");
const historyPanel = $("historyPanel");
const historyList = $("historyList");
const closeHistoryButton = $("closeHistoryButton");
const clearHistoryButton = $("clearHistoryButton");

const overlay = $("overlay");


/* ==========================================
   STATE
========================================== */

let currentVideo = null;

let activeBlobURL = null;


/* ==========================================
   SEARCH
========================================== */

async function searchYouTube() {

  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  errorState.classList.add("hidden");

  loadingState.classList.remove("hidden");

  resultsGrid.innerHTML = "";

  resultsTitle.textContent =
    `Results for "${query}"`;

  resultsSubtitle.textContent =
    "Searching YouTube...";

  try {

    const response = await fetch(
      `/api/youtube-search?q=${encodeURIComponent(query)}`
    );

    const payload = await response.json();

    if (!response.ok) {

      throw new Error(
        payload.error ||
        "Could not search YouTube."
      );

    }

    const results =
      payload.results || [];

    renderResults(results);

    resultsSubtitle.textContent =
      `${results.length} videos`;

  } catch (error) {

    console.error(error);

    errorMessage.textContent =
      error.message;

    errorState.classList.remove(
      "hidden"
    );

    resultsSubtitle.textContent =
      "Search unavailable.";

  } finally {

    loadingState.classList.add(
      "hidden"
    );

  }

}


/* ==========================================
   RESULTS
========================================== */

function renderResults(videos) {

  resultsGrid.innerHTML = "";

  if (!videos.length) {

    resultsGrid.innerHTML = `
      <div class="error-state">
        <i class="ri-search-eye-line"></i>
        <strong>No results</strong>
        <span>Try another search.</span>
      </div>
    `;

    return;

  }

  videos.forEach((video) => {

    const card =
      document.createElement("article");

    card.className =
      "result-card";

    card.innerHTML = `

      <img
        src="${escapeHTML(video.thumbnail)}"
        alt=""
        loading="lazy"
      >

      <div class="result-content">

        <div class="result-title">
          ${escapeHTML(video.title)}
        </div>

        <div class="result-channel">
          ${escapeHTML(video.channel)}
        </div>

        <div class="result-date">
          ${formatDate(video.publishedAt)}
        </div>

      </div>
    `;

    card.addEventListener(
      "click",
      () => playYouTube(video)
    );

    resultsGrid.appendChild(card);

  });

}


/* ==========================================
   YOUTUBE PLAYER
========================================== */

function playYouTube(video) {

  currentVideo = video;

  stopMP4();

  emptyPlayer.classList.add(
    "hidden"
  );

  mp4Player.classList.add(
    "hidden"
  );

  youtubePlayer.classList.remove(
    "hidden"
  );

  youtubeFrame.src =
    "https://www.youtube-nocookie.com/embed/" +
    encodeURIComponent(video.id) +
    "?autoplay=1&rel=0";

  currentTitle.textContent =
    video.title;

  currentChannel.textContent =
    video.channel;

  currentDate.textContent =
    formatDate(video.publishedAt);

  currentVideoId.textContent =
    video.id;

  saveHistory(video);

}


/* ==========================================
   PLAYER BUTTONS
========================================== */

copyButton.addEventListener(
  "click",
  async () => {

    if (!currentVideo) return;

    const url =
      `https://www.youtube.com/watch?v=${currentVideo.id}`;

    try {

      await navigator.clipboard.writeText(
        url
      );

      const old =
        copyButton.innerHTML;

      copyButton.innerHTML =
        `<i class="ri-check-line"></i> Copied`;

      setTimeout(
        () => {
          copyButton.innerHTML = old;
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


openYoutubeButton.addEventListener(
  "click",
  () => {

    if (!currentVideo) return;

    window.open(
      `https://www.youtube.com/watch?v=${currentVideo.id}`,
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/*
  Old JPlayer sent the YouTube ID to a
  conversion server.

  Spydr intentionally does NOT extract
  arbitrary YouTube streams.

  This button opens the Direct MP4 box
  instead.
*/

downloadCurrentButton.addEventListener(
  "click",
  () => {

    directUrlInput.focus();

    directUrlInput.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
);


/* ==========================================
   DIRECT MP4 PLAYER
========================================== */

function playMP4(src, title = "MP4 Video") {

  youtubeFrame.src = "";

  youtubePlayer.classList.add(
    "hidden"
  );

  emptyPlayer.classList.add(
    "hidden"
  );

  mp4Player.classList.remove(
    "hidden"
  );

  videoElement.src = src;

  mp4Title.textContent =
    title;

  videoElement.play().catch(
    () => {}
  );

}


function stopMP4() {

  videoElement.pause();

  videoElement.removeAttribute(
    "src"
  );

  videoElement.load();

  if (activeBlobURL) {

    URL.revokeObjectURL(
      activeBlobURL
    );

    activeBlobURL = null;

  }

}


closeMp4Button.addEventListener(
  "click",
  () => {

    stopMP4();

    mp4Player.classList.add(
      "hidden"
    );

    if (currentVideo) {

      youtubePlayer.classList.remove(
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
   DIRECT URL
========================================== */

playDirectButton.addEventListener(
  "click",
  () => {

    const url =
      directUrlInput.value.trim();

    if (!isSafeMediaURL(url)) {

      alert(
        "Enter a valid http/https MP4 or WebM URL."
      );

      return;

    }

    playMP4(
      url,
      getFilename(url)
    );

  }
);


saveDirectButton.addEventListener(
  "click",
  async () => {

    const url =
      directUrlInput.value.trim();

    if (!isSafeMediaURL(url)) {

      alert(
        "Enter a valid direct MP4 or WebM URL."
      );

      return;

    }

    saveDirectButton.disabled =
      true;

    const oldHTML =
      saveDirectButton.innerHTML;

    saveDirectButton.innerHTML =
      `<i class="ri-loader-4-line"></i>`;

    try {

      const response =
        await fetch(url);

      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );

      }

      const blob =
        await response.blob();

      if (
        !blob.type.startsWith("video/")
      ) {

        throw new Error(
          "URL did not return a video file."
        );

      }

      await saveDownloadedVideo({
        name: getFilename(url),
        blob,
        source: url,
        thumbnail: ""
      });

      await renderDownloads();

      openPanel(
        downloadsPanel
      );

    } catch (error) {

      console.error(error);

      alert(
        "Could not save this MP4. The host may block cross-origin downloads."
      );

    } finally {

      saveDirectButton.disabled =
        false;

      saveDirectButton.innerHTML =
        oldHTML;

    }

  }
);


/* ==========================================
   LOCAL FILE
========================================== */

localFileInput.addEventListener(
  "change",
  () => {

    const file =
      localFileInput.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith("video/")
    ) {

      alert(
        "Choose an MP4 or WebM file."
      );

      return;

    }

    if (activeBlobURL) {

      URL.revokeObjectURL(
        activeBlobURL
      );

    }

    activeBlobURL =
      URL.createObjectURL(file);

    playMP4(
      activeBlobURL,
      file.name
    );

    localFileInput.value = "";

  }
);


/* ==========================================
   INDEXEDDB
========================================== */

const DB_NAME =
  "spydr-yt-player";

const DB_VERSION =
  1;

const STORE_NAME =
  "videos";


function openDB() {

  return new Promise(
    (resolve, reject) => {

      const request =
        indexedDB.open(
          DB_NAME,
          DB_VERSION
        );

      request.onupgradeneeded =
        () => {

          const db =
            request.result;

          if (
            !db.objectStoreNames.contains(
              STORE_NAME
            )
          ) {

            db.createObjectStore(
              STORE_NAME,
              {
                keyPath: "id"
              }
            );

          }

        };

      request.onsuccess =
        () => resolve(
          request.result
        );

      request.onerror =
        () => reject(
          request.error
        );

    }
  );

}


async function saveDownloadedVideo({
  name,
  blob,
  source,
  thumbnail
}) {

  const db =
    await openDB();

  const transaction =
    db.transaction(
      STORE_NAME,
      "readwrite"
    );

  const store =
    transaction.objectStore(
      STORE_NAME
    );

  const entry = {

    id:
      crypto.randomUUID?.() ||
      `${Date.now()}-${Math.random()}`,

    name,

    blob,

    source,

    thumbnail,

    size:
      blob.size,

    added:
      Date.now()

  };

  store.put(entry);

  return new Promise(
    (resolve, reject) => {

      transaction.oncomplete =
        () => {

          db.close();

          resolve(entry);

        };

      transaction.onerror =
        () => reject(
          transaction.error
        );

    }
  );

}


async function getDownloads() {

  const db =
    await openDB();

  const transaction =
    db.transaction(
      STORE_NAME,
      "readonly"
    );

  const request =
    transaction
      .objectStore(STORE_NAME)
      .getAll();

  return new Promise(
    (resolve, reject) => {

      request.onsuccess =
        () => {

          const videos =
            request.result || [];

          videos.sort(
            (a, b) =>
              b.added - a.added
          );

          db.close();

          resolve(videos);

        };

      request.onerror =
        () => reject(
          request.error
        );

    }
  );

}


async function deleteDownload(id) {

  const db =
    await openDB();

  const transaction =
    db.transaction(
      STORE_NAME,
      "readwrite"
    );

  transaction
    .objectStore(STORE_NAME)
    .delete(id);

  return new Promise(
    (resolve, reject) => {

      transaction.oncomplete =
        () => {

          db.close();

          resolve();

        };

      transaction.onerror =
        () => reject(
          transaction.error
        );

    }
  );

}


/* ==========================================
   DOWNLOAD LIBRARY
========================================== */

async function renderDownloads() {

  const videos =
    await getDownloads();

  downloadsList.innerHTML =
    "";

  if (!videos.length) {

    downloadsList.innerHTML = `
      <div class="error-state">
        <i class="ri-download-cloud-line"></i>
        <strong>No downloads</strong>
        <span>Saved MP4s will appear here.</span>
      </div>
    `;

    return;

  }

  videos.forEach((video) => {

    const item =
      document.createElement("div");

    item.className =
      "library-item";

    item.innerHTML = `

      ${
        video.thumbnail
          ? `
            <img
              src="${escapeHTML(video.thumbnail)}"
              alt=""
            >
          `
          : `
            <div
              style="
                width:92px;
                aspect-ratio:16/9;
                display:grid;
                place-items:center;
                border-radius:7px;
                background:#222;
              "
            >
              <i class="ri-film-line"></i>
            </div>
          `
      }

      <div class="library-item-info">

        <div class="library-item-title">
          ${escapeHTML(video.name)}
        </div>

        <div class="library-item-sub">
          ${formatBytes(video.size)}
        </div>

      </div>

      <button data-delete="${video.id}">
        <i class="ri-delete-bin-line"></i>
      </button>
    `;

    item.addEventListener(
      "click",
      (event) => {

        if (
          event.target.closest(
            "[data-delete]"
          )
        ) {

          return;

        }

        if (activeBlobURL) {

          URL.revokeObjectURL(
            activeBlobURL
          );

        }

        activeBlobURL =
          URL.createObjectURL(
            video.blob
          );

        playMP4(
          activeBlobURL,
          video.name
        );

        closePanels();

      }
    );

    item
      .querySelector(
        "[data-delete]"
      )
      .addEventListener(
        "click",
        async (event) => {

          event.stopPropagation();

          await deleteDownload(
            video.id
          );

          renderDownloads();

        }
      );

    downloadsList.appendChild(
      item
    );

  });

}


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


function saveHistory(video) {

  let history =
    getHistory();

  history =
    history.filter(
      (item) =>
        item.id !== video.id
    );

  history.unshift(video);

  history =
    history.slice(0, 25);

  localStorage.setItem(
    "spydr_yt_history",
    JSON.stringify(history)
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
        <strong>No history</strong>
      </div>
    `;

    return;

  }

  history.forEach((video) => {

    const item =
      document.createElement(
        "div"
      );

    item.className =
      "library-item";

    item.innerHTML = `

      <img
        src="${escapeHTML(video.thumbnail)}"
        alt=""
      >

      <div class="library-item-info">

        <div class="library-item-title">
          ${escapeHTML(video.title)}
        </div>

        <div class="library-item-sub">
          ${escapeHTML(video.channel)}
        </div>

      </div>

      <i class="ri-play-fill"></i>
    `;

    item.addEventListener(
      "click",
      () => {

        playYouTube(video);

        closePanels();

      }
    );

    historyList.appendChild(
      item
    );

  });

}


clearHistoryButton.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "spydr_yt_history"
    );

    renderHistory();

  }
);


/* ==========================================
   PANELS
========================================== */

function openPanel(panel) {

  closePanels(false);

  panel.classList.add(
    "open"
  );

  overlay.classList.remove(
    "hidden"
  );

}


function closePanels(
  hideOverlay = true
) {

  downloadsPanel.classList.remove(
    "open"
  );

  historyPanel.classList.remove(
    "open"
  );

  if (hideOverlay) {

    overlay.classList.add(
      "hidden"
    );

  }

}


downloadsButton.addEventListener(
  "click",
  async () => {

    await renderDownloads();

    openPanel(
      downloadsPanel
    );

  }
);


historyButton.addEventListener(
  "click",
  () => {

    renderHistory();

    openPanel(
      historyPanel
    );

  }
);


closeDownloadsButton.addEventListener(
  "click",
  closePanels
);


closeHistoryButton.addEventListener(
  "click",
  closePanels
);


overlay.addEventListener(
  "click",
  closePanels
);


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

    searchInput.value = "";

    clearSearchButton.classList.add(
      "hidden"
    );

    searchInput.focus();

  }
);


/* ==========================================
   HELPERS
========================================== */

function isSafeMediaURL(url) {

  try {

    const parsed =
      new URL(url);

    if (
      !["http:", "https:"]
        .includes(parsed.protocol)
    ) {

      return false;

    }

    return /\.(mp4|webm)(\?|#|$)/i
      .test(parsed.pathname + parsed.search);

  } catch {

    return false;

  }

}


function getFilename(url) {

  try {

    const parsed =
      new URL(url);

    const name =
      decodeURIComponent(
        parsed.pathname
          .split("/")
          .pop()
      );

    return (
      name ||
      "video.mp4"
    );

  } catch {

    return "video.mp4";

  }

}


function formatBytes(bytes) {

  if (!bytes) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB"
  ];

  const i =
    Math.min(
      units.length - 1,
      Math.floor(
        Math.log(bytes) /
        Math.log(1024)
      )
    );

  return (
    (
      bytes /
      Math.pow(1024, i)
    ).toFixed(
      i > 1 ? 1 : 0
    ) +
    " " +
    units[i]
  );

}


function formatDate(value) {

  if (!value) return "";

  try {

    return new Date(
      value
    ).toLocaleDateString(
      undefined,
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );

  } catch {

    return value;

  }

}


function escapeHTML(value = "") {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* ==========================================
   INIT
========================================== */

renderDownloads();
