/* ==========================================
   SPYDR YT PLAYER
   YouTube search + iframe playback
   Authorized MP4 converter support
   Direct/local MP4 playback
   IndexedDB downloads
   History panels
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
let conversionController = null;


/* ==========================================
   SEARCH
========================================== */

async function searchYouTube() {

  const query =
    searchInput?.value.trim();

  if (!query) {
    return;
  }


  setSearchLoading(true);

  hideError();


  if (resultsGrid) {
    resultsGrid.innerHTML = "";
  }


  if (resultsTitle) {
    resultsTitle.textContent =
      `Results for "${query}"`;
  }


  if (resultsSubtitle) {
    resultsSubtitle.textContent =
      "Searching YouTube...";
  }


  try {

    const response =
      await fetch(
        `/api/youtube-search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }
      );


    const payload =
      await readJSON(response);


    if (!response.ok) {

      throw new Error(
        payload?.error ||
        `YouTube search failed (${response.status}).`
      );

    }


    const results =
      Array.isArray(payload?.results)
        ? payload.results
        : [];


    renderResults(results);


    if (resultsSubtitle) {

      resultsSubtitle.textContent =
        `${results.length} ${
          results.length === 1
            ? "video"
            : "videos"
        }`;

    }

  } catch (error) {

    console.error(
      "YT Player search error:",
      error
    );


    showError(
      error?.message ||
      "Could not search YouTube."
    );


    if (resultsSubtitle) {
      resultsSubtitle.textContent =
        "Search unavailable.";
    }

  } finally {

    setSearchLoading(false);

  }

}


/* ==========================================
   RESULTS
========================================== */

function renderResults(videos) {

  if (!resultsGrid) {
    return;
  }


  resultsGrid.innerHTML = "";


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


  videos.forEach((video) => {

    if (!video?.id) {
      return;
    }


    const card =
      document.createElement(
        "article"
      );


    card.className =
      "result-card";


    card.tabIndex =
      0;


    card.setAttribute(
      "role",
      "button"
    );


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
          ${formatDate(
            video.publishedAt
          )}
        </div>

      </div>
    `;


    const openVideo = () => {

      playYouTube(
        video
      );

    };


    card.addEventListener(
      "click",
      openVideo
    );


    card.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openVideo();

        }

      }
    );


    resultsGrid.appendChild(
      card
    );

  });

}


/* ==========================================
   YOUTUBE PLAYER
========================================== */

function playYouTube(video) {

  if (!video?.id) {
    return;
  }


  currentVideo =
    video;


  stopMP4();


  emptyPlayer?.classList.add(
    "hidden"
  );


  mp4Player?.classList.add(
    "hidden"
  );


  youtubePlayer?.classList.remove(
    "hidden"
  );


  if (youtubeFrame) {

    youtubeFrame.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(video.id) +
      "?autoplay=1&rel=0";

  }


  if (currentTitle) {

    currentTitle.textContent =
      video.title ||
      "Untitled video";

  }


  if (currentChannel) {

    currentChannel.textContent =
      video.channel ||
      "Unknown channel";

  }


  if (currentDate) {

    currentDate.textContent =
      formatDate(
        video.publishedAt
      );

  }


  if (currentVideoId) {

    currentVideoId.textContent =
      video.id;

  }


  saveHistory(
    video
  );


  setConvertButtonState(
    "idle",
    "MP4"
  );

}


/* ==========================================
   COPY LINK
========================================== */

copyButton?.addEventListener(
  "click",
  async () => {

    if (!currentVideo) {
      return;
    }


    const url =
      `https://www.youtube.com/watch?v=${currentVideo.id}`;


    try {

      await navigator.clipboard.writeText(
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
   OPEN YOUTUBE
========================================== */

openYoutubeButton?.addEventListener(
  "click",
  () => {

    if (!currentVideo) {
      return;
    }


    window.open(
      `https://www.youtube.com/watch?v=${currentVideo.id}`,
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* ==========================================
   AUTHORIZED MP4 CONVERTER
========================================== */

downloadCurrentButton?.addEventListener(
  "click",
  async () => {

    if (!currentVideo?.id) {
      return;
    }


    /*
      Stop an older conversion request
      if the user clicks another video.
    */

    if (conversionController) {

      conversionController.abort();

    }


    conversionController =
      new AbortController();


    setConvertButtonState(
      "working",
      "Preparing MP4..."
    );


    try {

      const response =
        await fetch(
          `/api/youtube-video?vid=${encodeURIComponent(
            currentVideo.id
          )}`,
          {
            method: "GET",

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
        !payload?.status
      ) {

        throw new Error(
          payload?.error ||
          `MP4 preparation failed (${response.status}).`
        );

      }


      if (!payload.url) {

        throw new Error(
          "Converter did not return an MP4 URL."
        );

      }


      playConvertedVideo(
        payload.url,

        payload.title ||
        currentVideo.title ||
        "MP4 Video"
      );


      setConvertButtonState(
        "ready",
        payload.cached
          ? "Cached MP4"
          : "MP4 Ready"
      );

    } catch (error) {

      if (
        error?.name ===
        "AbortError"
      ) {

        return;

      }


      console.error(
        "YT converter error:",
        error
      );


      setConvertButtonState(
        "error",
        "MP4 unavailable"
      );


      alert(
        error?.message ||
        "Could not prepare this test video."
      );

    } finally {

      conversionController =
        null;


      setTimeout(
        () => {

          setConvertButtonState(
            "idle",
            "MP4"
          );

        },
        1800
      );

    }

  }
);


/* ==========================================
   CONVERT BUTTON STATES
========================================== */

function setConvertButtonState(
  state = "idle",
  label = "MP4"
) {

  if (!downloadCurrentButton) {
    return;
  }


  downloadCurrentButton.disabled =
    state === "working";


  if (state === "working") {

    downloadCurrentButton.innerHTML = `
      <i class="ri-loader-4-line ri-spin"></i>
    `;

    downloadCurrentButton.title =
      label;

    return;

  }


  if (state === "ready") {

    downloadCurrentButton.innerHTML = `
      <i class="ri-check-line"></i>
    `;

    downloadCurrentButton.title =
      label;

    return;

  }


  if (state === "error") {

    downloadCurrentButton.innerHTML = `
      <i class="ri-error-warning-line"></i>
    `;

    downloadCurrentButton.title =
      label;

    return;

  }


  downloadCurrentButton.innerHTML = `
    <i class="ri-download-2-line"></i>
  `;


  downloadCurrentButton.title =
    "Prepare MP4";

}


/* ==========================================
   PLAY CONVERTED VIDEO
========================================== */

function playConvertedVideo(
  url,
  title = "MP4 Video"
) {

  if (!isHTTPURL(url)) {

    throw new Error(
      "Converter returned an invalid media URL."
    );

  }


  if (youtubeFrame) {

    youtubeFrame.src =
      "";

  }


  youtubePlayer?.classList.add(
    "hidden"
  );


  emptyPlayer?.classList.add(
    "hidden"
  );


  mp4Player?.classList.remove(
    "hidden"
  );


  if (videoElement) {

    videoElement.src =
      url;


    videoElement.load();


    videoElement.play().catch(
      () => {}
    );

  }


  if (mp4Title) {

    mp4Title.textContent =
      title;

  }

}


/* ==========================================
   DIRECT MP4 PLAYER
========================================== */

function playMP4(
  src,
  title = "MP4 Video"
) {

  if (!src) {
    return;
  }


  if (youtubeFrame) {

    youtubeFrame.src =
      "";

  }


  youtubePlayer?.classList.add(
    "hidden"
  );


  emptyPlayer?.classList.add(
    "hidden"
  );


  mp4Player?.classList.remove(
    "hidden"
  );


  if (videoElement) {

    videoElement.src =
      src;


    videoElement.load();


    videoElement.play().catch(
      () => {}
    );

  }


  if (mp4Title) {

    mp4Title.textContent =
      title;

  }

}


/* ==========================================
   STOP MP4
========================================== */

function stopMP4() {

  if (videoElement) {

    videoElement.pause();


    videoElement.removeAttribute(
      "src"
    );


    videoElement.load();

  }


  if (activeBlobURL) {

    URL.revokeObjectURL(
      activeBlobURL
    );


    activeBlobURL =
      null;

  }

}


/* ==========================================
   CLOSE MP4 PLAYER
========================================== */

closeMp4Button?.addEventListener(
  "click",
  () => {

    stopMP4();


    mp4Player?.classList.add(
      "hidden"
    );


    if (currentVideo) {

      youtubePlayer?.classList.remove(
        "hidden"
      );


      if (youtubeFrame) {

        youtubeFrame.src =
          "https://www.youtube-nocookie.com/embed/" +
          encodeURIComponent(
            currentVideo.id
          ) +
          "?rel=0";

      }

    } else {

      emptyPlayer?.classList.remove(
        "hidden"
      );

    }

  }
);


/* ==========================================
   DIRECT MP4 URL PLAYBACK
========================================== */

playDirectButton?.addEventListener(
  "click",
  () => {

    const url =
      directUrlInput?.value.trim();


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


/* ==========================================
   SAVE DIRECT MP4
========================================== */

saveDirectButton?.addEventListener(
  "click",
  async () => {

    const url =
      directUrlInput?.value.trim();


    if (!isSafeMediaURL(url)) {

      alert(
        "Enter a valid direct MP4 or WebM URL."
      );

      return;

    }


    const originalHTML =
      saveDirectButton.innerHTML;


    saveDirectButton.disabled =
      true;


    saveDirectButton.innerHTML = `
      <i class="ri-loader-4-line ri-spin"></i>
    `;


    try {

      const response =
        await fetch(
          url,
          {
            method: "GET"
          }
        );


      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );

      }


      const blob =
        await response.blob();


      if (
        !blob.type.startsWith(
          "video/"
        )
      ) {

        throw new Error(
          "URL did not return a video file."
        );

      }


      await saveDownloadedVideo({
        name:
          getFilename(url),

        blob,

        source:
          url,

        thumbnail:
          ""
      });


      await renderDownloads();


      openPanel(
        downloadsPanel
      );

    } catch (error) {

      console.error(
        "Direct MP4 save failed:",
        error
      );


      alert(
        "Could not save this MP4. The host may block cross-origin downloads."
      );

    } finally {

      saveDirectButton.disabled =
        false;


      saveDirectButton.innerHTML =
        originalHTML;

    }

  }
);


/* ==========================================
   LOCAL FILE
========================================== */

localFileInput?.addEventListener(
  "change",
  () => {

    const file =
      localFileInput.files?.[0];


    if (!file) {
      return;
    }


    if (
      !file.type.startsWith(
        "video/"
      )
    ) {

      alert(
        "Choose an MP4 or WebM file."
      );

      return;

    }


    stopMP4();


    activeBlobURL =
      URL.createObjectURL(
        file
      );


    playMP4(
      activeBlobURL,
      file.name
    );


    localFileInput.value =
      "";

  }
);


/* ==========================================
   INDEXED DB
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
        () => {

          resolve(
            request.result
          );

        };


      request.onerror =
        () => {

          reject(
            request.error
          );

        };

    }
  );

}


/* ==========================================
   SAVE VIDEO TO INDEXEDDB
========================================== */

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

    name:
      name ||
      "video.mp4",

    blob,

    source:
      source ||
      "",

    thumbnail:
      thumbnail ||
      "",

    size:
      blob.size,

    added:
      Date.now()

  };


  store.put(
    entry
  );


  return new Promise(
    (resolve, reject) => {

      transaction.oncomplete =
        () => {

          db.close();

          resolve(
            entry
          );

        };


      transaction.onerror =
        () => {

          const error =
            transaction.error;

          db.close();

          reject(
            error
          );

        };

    }
  );

}


/* ==========================================
   GET DOWNLOADS
========================================== */

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
      .objectStore(
        STORE_NAME
      )
      .getAll();


  return new Promise(
    (resolve, reject) => {

      request.onsuccess =
        () => {

          const videos =
            request.result ||
            [];


          videos.sort(
            (a, b) =>
              b.added -
              a.added
          );


          db.close();


          resolve(
            videos
          );

        };


      request.onerror =
        () => {

          const error =
            request.error;


          db.close();


          reject(
            error
          );

        };

    }
  );

}


/* ==========================================
   DELETE DOWNLOAD
========================================== */

async function deleteDownload(id) {

  const db =
    await openDB();


  const transaction =
    db.transaction(
      STORE_NAME,
      "readwrite"
    );


  transaction
    .objectStore(
      STORE_NAME
    )
    .delete(
      id
    );


  return new Promise(
    (resolve, reject) => {

      transaction.oncomplete =
        () => {

          db.close();

          resolve();

        };


      transaction.onerror =
        () => {

          const error =
            transaction.error;


          db.close();


          reject(
            error
          );

        };

    }
  );

}


/* ==========================================
   DOWNLOAD LIBRARY
========================================== */

async function renderDownloads() {

  if (!downloadsList) {
    return;
  }


  try {

    const videos =
      await getDownloads();


    downloadsList.innerHTML =
      "";


    if (!videos.length) {

      downloadsList.innerHTML = `
        <div class="error-state">

          <i class="ri-download-cloud-line"></i>

          <strong>
            No downloads
          </strong>

          <span>
            Saved MP4s will appear here.
          </span>

        </div>
      `;

      return;

    }


    videos.forEach(
      (video) => {

        const item =
          document.createElement(
            "div"
          );


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


          <button
            data-delete="${escapeHTML(video.id)}"
            title="Delete"
          >
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


            stopMP4();


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
          ?.addEventListener(
            "click",
            async (event) => {

              event.stopPropagation();


              await deleteDownload(
                video.id
              );


              await renderDownloads();

            }
          );


        downloadsList.appendChild(
          item
        );

      }
    );

  } catch (error) {

    console.error(
      "Could not load downloads:",
      error
    );


    downloadsList.innerHTML = `
      <div class="error-state">

        <i class="ri-error-warning-line"></i>

        <strong>
          Library unavailable
        </strong>

      </div>
    `;

  }

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

  if (!historyList) {
    return;
  }


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


  history.forEach(
    (video) => {

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


        <i class="ri-play-fill"></i>
      `;


      item.addEventListener(
        "click",
        () => {

          playYouTube(
            video
          );


          closePanels();

        }
      );


      historyList.appendChild(
        item
      );

    }
  );

}


/* ==========================================
   CLEAR HISTORY
========================================== */

clearHistoryButton?.addEventListener(
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

  if (!panel) {
    return;
  }


  closePanels(
    false
  );


  panel.classList.add(
    "open"
  );


  overlay?.classList.remove(
    "hidden"
  );

}


function closePanels(
  hideOverlay = true
) {

  downloadsPanel?.classList.remove(
    "open"
  );


  historyPanel?.classList.remove(
    "open"
  );


  if (hideOverlay) {

    overlay?.classList.add(
      "hidden"
    );

  }

}


/* ==========================================
   DOWNLOAD PANEL
========================================== */

downloadsButton?.addEventListener(
  "click",
  async () => {

    await renderDownloads();


    openPanel(
      downloadsPanel
    );

  }
);


/* ==========================================
   HISTORY PANEL
========================================== */

historyButton?.addEventListener(
  "click",
  () => {

    renderHistory();


    openPanel(
      historyPanel
    );

  }
);


/* ==========================================
   CLOSE PANELS
========================================== */

closeDownloadsButton?.addEventListener(
  "click",
  () => {

    closePanels();

  }
);


closeHistoryButton?.addEventListener(
  "click",
  () => {

    closePanels();

  }
);


overlay?.addEventListener(
  "click",
  () => {

    closePanels();

  }
);


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key ===
      "Escape"
    ) {

      closePanels();

    }

  }
);


/* ==========================================
   SEARCH EVENTS
========================================== */

searchButton?.addEventListener(
  "click",
  searchYouTube
);


searchInput?.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key ===
      "Enter"
    ) {

      searchYouTube();

    }

  }
);


searchInput?.addEventListener(
  "input",
  () => {

    clearSearchButton?.classList.toggle(
      "hidden",
      !searchInput.value
    );

  }
);


clearSearchButton?.addEventListener(
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
   JSON HELPER
========================================== */

async function readJSON(response) {

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
      `Server returned a non-JSON response (${response.status}).`
    );

  }

}


/* ==========================================
   SEARCH UI
========================================== */

function setSearchLoading(state) {

  loadingState?.classList.toggle(
    "hidden",
    !state
  );


  if (searchButton) {

    searchButton.disabled =
      state;

  }

}


function hideError() {

  errorState?.classList.add(
    "hidden"
  );

}


function showError(message) {

  if (errorMessage) {

    errorMessage.textContent =
      message;

  }


  errorState?.classList.remove(
    "hidden"
  );

}


/* ==========================================
   URL HELPERS
========================================== */

function isHTTPURL(url) {

  try {

    const parsed =
      new URL(url);


    return [
      "http:",
      "https:"
    ].includes(
      parsed.protocol
    );

  } catch {

    return false;

  }

}


function isSafeMediaURL(url) {

  if (!isHTTPURL(url)) {
    return false;
  }


  try {

    const parsed =
      new URL(url);


    return /\.(mp4|webm)$/i.test(
      parsed.pathname
    );

  } catch {

    return false;

  }

}


function getFilename(url) {

  try {

    const parsed =
      new URL(url);


    const filename =
      decodeURIComponent(
        parsed.pathname
          .split("/")
          .pop()
      );


    return (
      filename ||
      "video.mp4"
    );

  } catch {

    return "video.mp4";

  }

}


/* ==========================================
   FORMAT BYTES
========================================== */

function formatBytes(bytes) {

  if (!bytes) {
    return "0 B";
  }


  const units = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB"
  ];


  const index =
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
      Math.pow(
        1024,
        index
      )
    ).toFixed(
      index > 1
        ? 1
        : 0
    ) +
    " " +
    units[index]
  );

}


/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(value) {

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


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHTML(value = "") {

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


/* ==========================================
   INIT
========================================== */

setConvertButtonState(
  "idle",
  "MP4"
);


renderDownloads();
