/* ==========================================
   SPYDR YT PLAYER
========================================== */

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const clearSearchButton = document.getElementById(
  "clearSearchButton"
);

const resultsGrid = document.getElementById("resultsGrid");

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");

const resultsTitle = document.getElementById("resultsTitle");
const resultsSubtitle = document.getElementById(
  "resultsSubtitle"
);

const playerEmptyState = document.getElementById(
  "playerEmptyState"
);

const playerWrapper = document.getElementById("playerWrapper");

const youtubeFrame = document.getElementById("youtubeFrame");
const videoTitle = document.getElementById("videoTitle");
const videoChannel = document.getElementById("videoChannel");
const videoDate = document.getElementById("videoDate");

const copyLinkButton = document.getElementById(
  "copyLinkButton"
);

const youtubeButton = document.getElementById(
  "youtubeButton"
);

const historyButton = document.getElementById("historyButton");
const historyPanel = document.getElementById("historyPanel");
const historyOverlay = document.getElementById(
  "historyOverlay"
);

const closeHistoryButton = document.getElementById(
  "closeHistoryButton"
);

const historyList = document.getElementById("historyList");

const clearHistoryButton = document.getElementById(
  "clearHistoryButton"
);


let currentVideo = null;


/* ==========================================
   SEARCH
========================================== */

async function searchYouTube() {

  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  setLoading(true);

  resultsGrid.innerHTML = "";

  errorState.classList.add("hidden");

  resultsTitle.textContent = `Results for "${query}"`;
  resultsSubtitle.textContent = "Searching YouTube...";

  try {

    const response = await fetch(
      `/api/youtube-search?q=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "YouTube search failed."
      );
    }

    renderResults(data.results || []);

    resultsSubtitle.textContent =
      `${data.results?.length || 0} videos found`;

  } catch (error) {

    console.error(error);

    showError(error.message);

  } finally {

    setLoading(false);

  }

}


/* ==========================================
   RENDER RESULTS
========================================== */

function renderResults(results) {

  resultsGrid.innerHTML = "";

  if (!results.length) {

    resultsGrid.innerHTML = `
      <div class="error-state">
        <i class="ri-search-eye-line"></i>
        <h3>No videos found</h3>
        <p>Try searching for something else.</p>
      </div>
    `;

    return;

  }

  results.forEach((video) => {

    const card = document.createElement("div");

    card.className = "video-card";

    card.innerHTML = `
      <img
        class="video-thumbnail"
        src="${escapeHTML(video.thumbnail)}"
        alt=""
        loading="lazy"
      >

      <div class="video-card-content">

        <div class="video-card-title">
          ${escapeHTML(video.title)}
        </div>

        <div class="video-card-channel">
          ${escapeHTML(video.channel)}
        </div>

        <div class="video-card-date">
          ${formatDate(video.publishedAt)}
        </div>

      </div>
    `;

    card.addEventListener("click", () => {
      playVideo(video);
    });

    resultsGrid.appendChild(card);

  });

}


/* ==========================================
   PLAYER
========================================== */

function playVideo(video) {

  currentVideo = video;

  playerEmptyState.classList.add("hidden");
  playerWrapper.classList.remove("hidden");

  youtubeFrame.src =
    `https://www.youtube.com/embed/${encodeURIComponent(
      video.id
    )}?autoplay=1&rel=0`;

  videoTitle.textContent = video.title;
  videoChannel.textContent = video.channel;
  videoDate.textContent = formatDate(video.publishedAt);

  addHistory(video);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================
   COPY / OPEN
========================================== */

copyLinkButton.addEventListener("click", async () => {

  if (!currentVideo) {
    return;
  }

  const url =
    `https://www.youtube.com/watch?v=${currentVideo.id}`;

  try {

    await navigator.clipboard.writeText(url);

    const original = copyLinkButton.innerHTML;

    copyLinkButton.innerHTML = `
      <i class="ri-check-line"></i>
      Copied
    `;

    setTimeout(() => {
      copyLinkButton.innerHTML = original;
    }, 1500);

  } catch {

    alert(url);

  }

});


youtubeButton.addEventListener("click", () => {

  if (!currentVideo) {
    return;
  }

  window.open(
    `https://www.youtube.com/watch?v=${currentVideo.id}`,
    "_blank"
  );

});


/* ==========================================
   HISTORY
========================================== */

function getHistory() {

  try {

    return JSON.parse(
      localStorage.getItem("spydr_yt_history")
    ) || [];

  } catch {

    return [];

  }

}


function addHistory(video) {

  let history = getHistory();

  history = history.filter(
    item => item.id !== video.id
  );

  history.unshift(video);

  history = history.slice(0, 20);

  localStorage.setItem(
    "spydr_yt_history",
    JSON.stringify(history)
  );

  renderHistory();

}


function renderHistory() {

  const history = getHistory();

  historyList.innerHTML = "";

  if (!history.length) {

    historyList.innerHTML = `
      <div class="error-state">
        <i class="ri-history-line"></i>
        <h3>No history yet</h3>
        <p>Videos you play will show here.</p>
      </div>
    `;

    return;

  }

  history.forEach((video) => {

    const item = document.createElement("div");

    item.className = "history-item";

    item.innerHTML = `
      <img
        src="${escapeHTML(video.thumbnail)}"
        alt=""
      >

      <div>
        <div class="history-item-title">
          ${escapeHTML(video.title)}
        </div>

        <div class="video-card-channel">
          ${escapeHTML(video.channel)}
        </div>
      </div>
    `;

    item.addEventListener("click", () => {

      playVideo(video);

      closeHistory();

    });

    historyList.appendChild(item);

  });

}


clearHistoryButton.addEventListener("click", () => {

  localStorage.removeItem("spydr_yt_history");

  renderHistory();

});


function openHistory() {

  renderHistory();

  historyPanel.classList.add("active");
  historyOverlay.classList.remove("hidden");

}


function closeHistory() {

  historyPanel.classList.remove("active");
  historyOverlay.classList.add("hidden");

}


historyButton.addEventListener("click", openHistory);
closeHistoryButton.addEventListener("click", closeHistory);
historyOverlay.addEventListener("click", closeHistory);


/* ==========================================
   SEARCH EVENTS
========================================== */

searchButton.addEventListener("click", searchYouTube);


searchInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    searchYouTube();
  }

});


searchInput.addEventListener("input", () => {

  clearSearchButton.classList.toggle(
    "hidden",
    !searchInput.value
  );

});


clearSearchButton.addEventListener("click", () => {

  searchInput.value = "";

  clearSearchButton.classList.add("hidden");

  searchInput.focus();

});


/* ==========================================
   UI HELPERS
========================================== */

function setLoading(state) {

  loadingState.classList.toggle(
    "hidden",
    !state
  );

}


function showError(message) {

  errorMessage.textContent = message;

  errorState.classList.remove("hidden");

  resultsSubtitle.textContent =
    "Search failed.";

}


function formatDate(date) {

  if (!date) {
    return "";
  }

  try {

    return new Date(date).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "short",
        day: "numeric"
      }
    );

  } catch {

    return date;

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
