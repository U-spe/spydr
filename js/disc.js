
(() => {
  "use strict";

  const POPUP_ID = "spydr-popup";
  const BUTTON_ID = "spydr-popup-button";

  function getPopup() {
    return document.getElementById(POPUP_ID);
  }

  function closePopup() {
    const popup = getPopup();

    if (!popup) return;

    popup.hidden = true;
    document.body.style.overflow = "";
  }

  function showPopup() {
    const popup = getPopup();

    if (!popup) {
      console.warn("Spydr popup has not been loaded yet.");
      return;
    }

    popup.hidden = false;
    document.body.style.overflow = "hidden";

    const button = document.getElementById(BUTTON_ID);

    if (button) button.focus();
  }

  function initPopup() {
    const popup = getPopup();
    const button = document.getElementById(BUTTON_ID);

    if (!popup || popup.dataset.discInitialized === "true") return;

    popup.dataset.discInitialized = "true";

    if (button) {
      button.addEventListener("click", closePopup);
    }

    popup.addEventListener("click", (event) => {
      if (event.target === popup) closePopup();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !popup.hidden) {
        closePopup();
      }
    });
  }

  window.SpydrPopup = {
    show: showPopup,
    close: closePopup,
    init: initPopup
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPopup);
  } else {
    initPopup();
  }
})();
