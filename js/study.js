/* =========================================================
   VENOMOUS
   /js/study.js
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     CONFIG
     ======================================================= */

  const API_ENDPOINT =
    "/api/venomous";

  const MODEL_STORAGE =
    "spydr.venomous.model";

  const AI_MODELS = {
    arachnid: "openai/gpt-oss-120b",
    silk: "openai/gpt-oss-20b",
    venomous: "qwen/qwen3.8-27b"
  };

  const MODEL_LABELS = { arachnid: "arachnid", silk: "silk", venomous: "venomous" };

  let selectedModel =
    localStorage.getItem(MODEL_STORAGE) || "venomous";

  if (!Object.prototype.hasOwnProperty.call(AI_MODELS, selectedModel)) {
    selectedModel = "venomous";
  }


  const STORAGE = {

    chats:
      "spydr.venomous.chats",

    activeChat:
      "spydr.venomous.activeChat",

    preferences:
      "spydr.venomous.preferences"

  };


  const DEFAULT_PREFERENCES = {

    name: "",

    tone:
      "adaptive",

    length:
      "adaptive",

    rules: "",

    about: "",


    composerBackground:
      "theme",

    gradientColor1:
      "#3f5efb",

    gradientColor2:
      "#7c3aed",

    gradientColor3:
      "#111111",

    useThirdColor:
      true,

    composerImage:
      ""

  };


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const $ =
    id =>
      document.getElementById(id);


  const el = {

    sidebar:
      $("venomous-sidebar"),

    modelSelect:
      $("ai-model-select"),

    expandSidebarTab: $("expand-sidebar-tab"),
    sidebarBrandName: $("sidebar-brand-name"),
    headerBrandName: $("header-brand-name"),
    welcomeTitle: $("welcome-title"),
    visionBadge: $("vision-badge"),
    aiDisclaimer: $("ai-disclaimer"),

    openSidebar:
      $("open-sidebar"),

    closeSidebar:
      $("close-sidebar"),


    newChat:
      $("new-chat"),

    headerNewChat:
      $("header-new-chat"),

    history:
      $("chat-history"),

    clearChats:
      $("clear-chats"),


    chatScroll:
      $("chat-scroll"),

    chatContent:
      $("chat-content"),

    welcome:
      $("welcome"),


    composer:
      $("composer"),

    composerBackgroundImage:
      $("composer-background-image"),


    messageInput:
      $("message-input"),

    sendButton:
      $("send-button"),

    stopButton:
      $("stop-button"),


    attachButton:
      $("attach-button"),

    screenShareButton:
      $("screen-share-button"),

    screenShareStatus:
      $("screen-share-status"),

    screenShareLabel:
      $("screen-share-label"),

    screenShareStop:
      $("screen-share-stop"),

    imageInput:
      $("image-input"),

    quickImage:
      $("quick-image"),


    attachmentPreview:
      $("attachment-preview"),

    attachmentImage:
      $("attachment-image"),

    attachmentName:
      $("attachment-name"),

    attachmentInfo:
      $("attachment-info"),

    removeAttachment:
      $("remove-attachment"),


    customizeOpen:
      $("customize-open"),

    customizeModal:
      $("customize-modal"),

    customizeClose:
      $("customize-close"),


    customName:
      $("custom-name"),

    customTone:
      $("custom-tone"),

    customLength:
      $("custom-length"),

    customRules:
      $("custom-rules"),

    customAbout:
      $("custom-about"),

    rulesCount:
      $("rules-count"),


    composerBackgroundMode:
      $("composer-background-mode"),

    gradientOptions:
      $("gradient-options"),

    gradientColor1:
      $("gradient-color-1"),

    gradientColor2:
      $("gradient-color-2"),

    gradientColor3:
      $("gradient-color-3"),

    useThirdColor:
      $("use-third-color"),


    backgroundImageOptions:
      $("background-image-options"),

    backgroundImageUpload:
      $("background-image-upload"),

    backgroundImageInput:
      $("background-image-input"),

    backgroundImagePreview:
      $("background-image-preview"),

    backgroundPreviewImage:
      $("background-preview-image"),

    backgroundImageRemove:
      $("background-image-remove"),


    customSave:
      $("custom-save"),

    customReset:
      $("custom-reset")

  };


  /* =======================================================
     STATE
     ======================================================= */

  let chats =
    readJSON(
      STORAGE.chats,
      []
    );


  let preferences = {

    ...DEFAULT_PREFERENCES,

    ...readJSON(
      STORAGE.preferences,
      {}
    )

  };


  let activeChatId =
    localStorage.getItem(
      STORAGE.activeChat
    );


  let currentAttachment =
    null;


  let requestController =
    null;


  let isGenerating =
    false;

  let screenShareStream =
    null;

  let screenShareVideo =
    null;

  let screenCaptureInProgress =
    false;


  /*
    Chat images stay in memory.

    We don't save every uploaded image
    into localStorage because screenshots
    can fill it fast.
  */

  const runtimeImages =
    new Map();


  /* =======================================================
     STORAGE
     ======================================================= */

  function readJSON(
    key,
    fallback
  ) {

    try {

      const raw =
        localStorage.getItem(
          key
        );


      if (!raw) {

        return fallback;

      }


      return JSON.parse(
        raw
      );


    } catch (error) {

      console.warn(
        "[Venomous] storage:",
        error
      );


      return fallback;

    }

  }


  function saveChats() {

    try {

      localStorage.setItem(
        STORAGE.chats,
        JSON.stringify(chats)
      );


    } catch (error) {

      console.warn(
        "[Venomous] chat save failed:",
        error
      );

    }

  }


  function savePreferences() {

    try {

      localStorage.setItem(
        STORAGE.preferences,
        JSON.stringify(
          preferences
        )
      );


    } catch (error) {

      /*
        Most likely the custom background
        image made localStorage too large.
      */

      console.warn(
        "[Venomous] preference save failed:",
        error
      );


      if (
        preferences.composerImage
      ) {

        preferences.composerImage =
          "";


        alert(
          "that background image was too large to save locally. try a smaller image."
        );


        localStorage.setItem(
          STORAGE.preferences,
          JSON.stringify(
            preferences
          )
        );

      }

    }

  }


  /* =======================================================
     ID
     ======================================================= */

  function makeId() {

    if (
      crypto?.randomUUID
    ) {

      return crypto.randomUUID();

    }


    return (

      Date.now()
        .toString(36)

      +

      Math.random()
        .toString(36)
        .slice(2)

    );

  }


  /* =======================================================
     ACTIVE CHAT
     ======================================================= */

  function getActiveChat() {

    return chats.find(
      chat =>
        chat.id === activeChatId
    );

  }


  function createChat() {

    if (
      isGenerating
    ) {

      stopGeneration();

    }


    const chat = {

      id:
        makeId(),

      title:
        "new chat",

      createdAt:
        Date.now(),

      updatedAt:
        Date.now(),

      messages:
        []

    };


    chats.unshift(
      chat
    );


    activeChatId =
      chat.id;


    localStorage.setItem(
      STORAGE.activeChat,
      activeChatId
    );


    saveChats();

    renderHistory();

    renderCurrentChat();

    closeSidebar();

    focusInput();

    return chat;

  }


  function ensureChat() {

    return (
      getActiveChat() ||
      createChat()
    );

  }


  function openChat(id) {

    if (
      isGenerating
    ) {

      stopGeneration();

    }


    activeChatId =
      id;


    localStorage.setItem(
      STORAGE.activeChat,
      id
    );


    renderHistory();

    renderCurrentChat();

    closeSidebar();

  }


  function deleteChat(id) {

    chats =
      chats.filter(
        chat =>
          chat.id !== id
      );


    if (
      activeChatId === id
    ) {

      activeChatId =
        chats[0]?.id ||
        null;

    }


    if (
      activeChatId
    ) {

      localStorage.setItem(
        STORAGE.activeChat,
        activeChatId
      );

    } else {

      localStorage.removeItem(
        STORAGE.activeChat
      );

    }


    saveChats();

    renderHistory();

    renderCurrentChat();

  }


  function renameChat(id) {

    const chat =
      chats.find(
        item =>
          item.id === id
      );


    if (!chat) {

      return;

    }


    const newTitle =
      prompt(
        "rename chat",
        chat.title
      );


    if (
      newTitle === null
    ) {

      return;

    }


    const cleaned =
      newTitle
        .trim()
        .slice(
          0,
          60
        );


    if (!cleaned) {

      return;

    }


    chat.title =
      cleaned;


    chat.updatedAt =
      Date.now();


    saveChats();

    renderHistory();

  }


  function clearAllChats() {

    if (
      !chats.length
    ) {

      return;

    }


    if (
      !confirm(
        "delete all venomous chats from this device?"
      )
    ) {

      return;

    }


    stopGeneration();


    chats = [];

    activeChatId =
      null;


    runtimeImages.clear();


    localStorage.removeItem(
      STORAGE.chats
    );


    localStorage.removeItem(
      STORAGE.activeChat
    );


    renderHistory();

    renderCurrentChat();

  }


  /* =======================================================
     TITLE
     ======================================================= */

  function makeChatTitle(text) {

    let title =
      String(
        text || ""
      )
        .replace(
          /\s+/g,
          " "
        )
        .trim();


    if (!title) {

      return "image chat";

    }


    if (
      title.length >
      42
    ) {

      title =
        title.slice(
          0,
          42
        ) + "...";

    }


    return title;

  }


  /* =======================================================
     HISTORY
     ======================================================= */

  function renderHistory() {

    el.history.innerHTML =
      "";


    if (
      !chats.length
    ) {

      const empty =
        document.createElement(
          "div"
        );


      empty.className =
        "no-chats";


      empty.textContent =
        "no chats yet.";


      el.history.appendChild(
        empty
      );


      return;

    }


    const ordered =
      [...chats].sort(
        (a, b) =>
          b.updatedAt -
          a.updatedAt
      );


    ordered.forEach(
      chat => {

        const row =
          document.createElement(
            "div"
          );


        row.className =
          "history-chat";


        if (
          chat.id ===
          activeChatId
        ) {

          row.classList.add(
            "active"
          );

        }


        const open =
          document.createElement(
            "button"
          );


        open.className =
          "history-chat-button";


        open.textContent =
          chat.title;


        open.onclick =
          () =>
            openChat(
              chat.id
            );


        const actions =
          document.createElement(
            "div"
          );


        actions.className =
          "history-actions";


        const rename =
          document.createElement(
            "button"
          );


        rename.className =
          "history-action";


        rename.innerHTML =
          '<i class="ri-pencil-line"></i>';


        rename.title =
          "Rename";


        rename.onclick =
          event => {

            event.stopPropagation();

            renameChat(
              chat.id
            );

          };


        const remove =
          document.createElement(
            "button"
          );


        remove.className =
          "history-action";


        remove.innerHTML =
          '<i class="ri-delete-bin-line"></i>';


        remove.title =
          "Delete";


        remove.onclick =
          event => {

            event.stopPropagation();

            deleteChat(
              chat.id
            );

          };


        actions.append(
          rename,
          remove
        );


        row.append(
          open,
          actions
        );


        el.history.appendChild(
          row
        );

      }
    );

  }


  /* =======================================================
     RENDER CHAT
     ======================================================= */

  function renderCurrentChat() {

    const chat =
      getActiveChat();


    Array
      .from(
        el.chatContent.children
      )
      .forEach(
        child => {

          if (
            child !==
            el.welcome
          ) {

            child.remove();

          }

        }
      );


    if (
      !chat ||
      !chat.messages.length
    ) {

      el.welcome
        .classList
        .remove(
          "hidden"
        );


      scrollBottom();

      return;

    }


    el.welcome
      .classList
      .add(
        "hidden"
      );


    chat.messages.forEach(
      message =>
        appendMessageElement(
          message,
          false
        )
    );


    scrollBottom();

  }


  function appendMessageElement(
    message,
    scroll = true
  ) {

    el.welcome
      .classList
      .add(
        "hidden"
      );


    const row =
      document.createElement(
        "div"
      );


    row.className =
      `message ${message.role}`;


    if (
      message.role ===
      "assistant"
    ) {

      const avatar =
        document.createElement(
          "div"
        );


      avatar.className =
        "ai-avatar";


      avatar.innerHTML =
        '<i class="ri-spider-line"></i>';


      row.appendChild(
        avatar
      );

    }


    const body =
      document.createElement(
        "div"
      );


    body.className =
      "message-body";


    if (
      message.imageId &&
      runtimeImages.has(
        message.imageId
      )
    ) {

      const image =
        document.createElement(
          "img"
        );


      image.className =
        "message-image";


      image.src =
        runtimeImages.get(
          message.imageId
        );


      body.appendChild(
        image
      );

    }


    const text =
      document.createElement(
        "div"
      );


    text.className =
      "message-text";


    if (
      message.role ===
      "assistant"
    ) {

      text.innerHTML =
        formatAIText(
          message.content
        );

    } else {

      text.textContent =
        message.content;

    }


    body.appendChild(
      text
    );


    row.appendChild(
      body
    );


    el.chatContent.appendChild(
      row
    );


    if (scroll) {

      scrollBottom();

    }

  }


  /* =======================================================
     MARKDOWN
     ======================================================= */

  function escapeHTML(value) {

    return String(
      value || ""
    )

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  }


  function formatAIText(input) {

    /*
      Safety fallback.

      API should already remove reasoning,
      but we ALSO strip think tags here
      so old stored messages won't show them.
    */

    let cleaned =
      String(
        input || ""
      );


    cleaned =
      cleaned.replace(
        /<think>[\s\S]*?<\/think>/gi,
        ""
      );


    let text =
      escapeHTML(
        cleaned.trim()
      );


    const codeBlocks =
      [];


    text =
      text.replace(
        /```(?:\w+)?\n?([\s\S]*?)```/g,
        (_, code) => {

          const index =
            codeBlocks.length;


          codeBlocks.push(

            `<pre><code>${code.trim()}</code></pre>`

          );


          return (
            `VENOMCODE${index}END`
          );

        }
      );


    text =
      text

        .replace(
          /^### (.+)$/gm,
          "<h3>$1</h3>"
        )

        .replace(
          /^## (.+)$/gm,
          "<h2>$1</h2>"
        )

        .replace(
          /^# (.+)$/gm,
          "<h1>$1</h1>"
        )

        .replace(
          /\*\*(.+?)\*\*/g,
          "<strong>$1</strong>"
        )

        .replace(
          /`([^`\n]+)`/g,
          "<code>$1</code>"
        );


    let result =
      text

        .split(
          /\n{2,}/
        )

        .map(
          block => {

            const trimmed =
              block.trim();


            if (!trimmed) {

              return "";

            }


            if (
              /^<h[1-3]>/.test(
                trimmed
              )
            ) {

              return trimmed;

            }


            if (
              trimmed.startsWith(
                "VENOMCODE"
              )
            ) {

              return trimmed;

            }


            return (
              "<p>" +

              trimmed.replace(
                /\n/g,
                "<br>"
              )

              +

              "</p>"
            );

          }
        )

        .join("");


    codeBlocks.forEach(
      (block, index) => {

        result =
          result.replace(
            `<p>VENOMCODE${index}END</p>`,
            block
          );


        result =
          result.replace(
            `VENOMCODE${index}END`,
            block
          );

      }
    );


    return result;

  }


  /* =======================================================
     THINKING ANIMATION
     ======================================================= */

  function showThinking() {

    const row =
      document.createElement(
        "div"
      );


    row.id =
      "venom-thinking";


    row.className =
      "message ai";


    row.innerHTML = `

      <div class="ai-avatar">

        <i class="ri-spider-line"></i>

      </div>


      <div class="message-body">

        <div class="thinking">

          <span class="thinking-dot"></span>

          <span class="thinking-dot"></span>

          <span class="thinking-dot"></span>

        </div>

      </div>

    `;


    el.chatContent.appendChild(
      row
    );


    scrollBottom();

  }


  function hideThinking() {

    document
      .getElementById(
        "venom-thinking"
      )
      ?.remove();

  }


  /* =======================================================
     API MESSAGE HISTORY
     ======================================================= */

  function buildAPIMessages(chat) {

    return chat.messages

      .slice(-24)

      .filter(
        message =>

          message.role ===
            "user"

          ||

          message.role ===
            "assistant"
      )

      .map(
        message => ({

          role:
            message.role,

          content:
            String(
              message.content || ""
            )
              .replace(
                /<think>[\s\S]*?<\/think>/gi,
                ""
              )
              .slice(
                0,
                12000
              )

        })
      );

  }


  /* =======================================================
     SCREEN CONTEXT
     ======================================================= */

  function updateScreenShareUI() {
    const active = Boolean(screenShareStream && screenShareStream.active);

    el.screenShareButton.classList.toggle("is-sharing", active);
    el.screenShareButton.setAttribute("aria-pressed", String(active));
    el.screenShareButton.setAttribute("aria-label", active ? "Stop screen sharing" : "Share screen");
    el.screenShareButton.title = active
      ? "Stop sharing your screen"
      : "Share your screen. A screenshot is captured only when you send a message.";
    el.screenShareButton.innerHTML = active
      ? '<i class="ri-stop-circle-line" aria-hidden="true"></i>'
      : '<i class="ri-computer-line" aria-hidden="true"></i>';

    el.screenShareStatus.classList.toggle("hidden", !active);
    el.screenShareLabel.textContent = active
      ? "screen sharing is on · screenshot on send"
      : "";
  }


  function stopScreenShare() {
    const stream = screenShareStream;
    const video = screenShareVideo;

    screenShareStream = null;
    screenShareVideo = null;

    if (video) {
      video.pause();
      video.srcObject = null;
    }

    if (stream) {
      stream.getTracks().forEach(track => {
        if (track.readyState !== "ended") track.stop();
      });
    }

    updateScreenShareUI();
  }


  async function startScreenShare() {
    if (selectedModel !== "venomous") {
      alert("screen context currently works with venomous only. switch to venomous first.");
      return;
    }

    if (!window.isSecureContext || !navigator.mediaDevices?.getDisplayMedia) {
      alert("screen sharing needs a supported browser and a secure HTTPS connection.");
      return;
    }

    try {
      // Keep getDisplayMedia directly in the user's click flow.
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });

      const video = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.srcObject = stream;

      const track = stream.getVideoTracks()[0];
      if (!track) {
        stream.getTracks().forEach(item => item.stop());
        throw new Error("the selected screen did not provide a video track.");
      }

      screenShareStream = stream;
      screenShareVideo = video;

      track.addEventListener("ended", stopScreenShare, { once: true });
      stream.addEventListener("inactive", stopScreenShare, { once: true });

      const videoReady = new Promise((resolve, reject) => {
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth && video.videoHeight) {
          resolve();
          return;
        }

        const timeout = setTimeout(() => {
          cleanup();
          reject(new Error("the shared screen did not become ready in time."));
        }, 10000);

        const onReady = () => {
          if (!video.videoWidth || !video.videoHeight) return;
          cleanup();
          resolve();
        };

        const onError = () => {
          cleanup();
          reject(new Error("the shared screen could not be read."));
        };

        const cleanup = () => {
          clearTimeout(timeout);
          video.removeEventListener("loadeddata", onReady);
          video.removeEventListener("resize", onReady);
          video.removeEventListener("error", onError);
        };

        video.addEventListener("loadeddata", onReady);
        video.addEventListener("resize", onReady);
        video.addEventListener("error", onError);
      });

      await video.play();
      await videoReady;

      if (screenShareStream !== stream || !stream.active) {
        throw new Error("screen sharing ended before the screenshot was ready.");
      }

      updateScreenShareUI();
    } catch (error) {
      stopScreenShare();

      if (error.name === "NotAllowedError" || error.name === "AbortError") return;

      console.error("[Venomous screen share]", error);
      alert(error.message || "couldn't start screen sharing.");
    }
  }


  async function captureScreenFrame() {
    if (
      !screenShareStream?.active ||
      !screenShareVideo ||
      screenShareStream.getVideoTracks().every(track => track.readyState !== "live")
    ) {
      throw new Error("screen sharing ended. start it again to ask about your screen.");
    }

    const video = screenShareVideo;

    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth || !video.videoHeight) {
      throw new Error("the shared screen isn't ready yet. try again in a moment.");
    }

    const maxDimension = 1600;
    const scale = Math.min(1, maxDimension / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(1, Math.round(video.videoHeight * scale));

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("this browser couldn't prepare the screen screenshot.");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let dataUrl = canvas.toDataURL("image/jpeg", 0.78);
    if (dataUrl.length > 4_500_000) dataUrl = canvas.toDataURL("image/jpeg", 0.62);
    if (dataUrl.length > 4_900_000) {
      throw new Error("this screen is too detailed to send. try sharing a smaller window or zooming out.");
    }

    return {
      dataUrl,
      mimeType: "image/jpeg",
      source: "screen"
    };
  }


  el.screenShareButton.addEventListener("click", () => {
    if (screenShareStream?.active) stopScreenShare();
    else startScreenShare();
  });

  el.screenShareStop.addEventListener("click", stopScreenShare);

  // Leaving/navigating away from this page ends the capture. Switching tabs
  // does not, because the selected shared tab may be a different tab.
  window.addEventListener("pagehide", stopScreenShare);


  /* =======================================================
     SEND
     ======================================================= */

  async function sendMessage(
    forcedText = null
  ) {

    if (isGenerating || screenCaptureInProgress) return;

    let text = String(
      forcedText ??
      el.messageInput.value
    ).trim();

    if (!text && !currentAttachment && !screenShareStream?.active) return;

    let outgoingImage = currentAttachment
      ? {
          dataUrl: currentAttachment.dataUrl,
          mimeType: currentAttachment.mimeType,
          source: "upload"
        }
      : null;

    if (!outgoingImage && screenShareStream?.active) {
      screenCaptureInProgress = true;
      el.screenShareButton.disabled = true;

      try {
        outgoingImage = await captureScreenFrame();
        if (!text) text = "Describe what is currently on my screen.";
      } catch (error) {
        console.error("[Venomous screen capture]", error);
        alert(error.message || "couldn't capture the shared screen.");
        return;
      } finally {
        screenCaptureInProgress = false;
        el.screenShareButton.disabled = false;
      }
    }

    const chat =
      ensureChat();


    // Uploaded images stay visible in chat. Shared-screen frames are sent as context only.
    const imageId =
      outgoingImage && outgoingImage.source !== "screen"
        ? makeId()
        : null;


    if (outgoingImage && imageId) {
      runtimeImages.set(
        imageId,
        outgoingImage.dataUrl
      );
    }


    const userMessage = {

      id:
        makeId(),

      role:
        "user",

      content:
        text ||
        "Analyze this image.",

      imageId,

      createdAt:
        Date.now()

    };


    chat.messages.push(
      userMessage
    );


    chat.updatedAt =
      Date.now();


    if (
      chat.messages.length ===
      1
    ) {

      chat.title =
        makeChatTitle(
          text
        );

    }


    el.messageInput.value =
      "";


    autoResize();

    clearAttachment();

    saveChats();

    renderHistory();

    appendMessageElement(
      userMessage
    );


    setGenerating(
      true
    );


    showThinking();


    requestController =
      new AbortController();


    try {

      const response =
        await fetch(
          API_ENDPOINT,
          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            signal:
              requestController.signal,

            body:
              JSON.stringify({

                messages:
                  buildAPIMessages(
                    chat
                  ),

                image:
                  outgoingImage,

                model:
                  selectedModel,

                preferences: {

                  name:
                    preferences.name,

                  tone:
                    preferences.tone,

                  length:
                    preferences.length,

                  rules:
                    preferences.rules,

                  about:
                    preferences.about

                }

              })

          }
        );


      const data =
        await response
          .json()
          .catch(
            () => ({})
          );


      if (
        !response.ok
      ) {

        throw new Error(
          data.error ||
          `request failed (${response.status})`
        );

      }


      hideThinking();


      /*
        API already hides reasoning.
        Extra stripping is just a backup.
      */

      const content =
        String(
          data.message ||
          ""
        )

          .replace(
            /<think>[\s\S]*?<\/think>/gi,
            ""
          )

          .trim();


      if (!content) {

        throw new Error(
          "Venomous returned an empty response."
        );

      }


      const assistantMessage = {

        id:
          makeId(),

        role:
          "assistant",

        content,

        createdAt:
          Date.now()

      };


      chat.messages.push(
        assistantMessage
      );


      chat.updatedAt =
        Date.now();


      saveChats();

      renderHistory();

      appendMessageElement(
        assistantMessage
      );


    } catch (error) {

      hideThinking();


      if (
        error.name ===
        "AbortError"
      ) {

        return;

      }


      console.error(
        "[Venomous]",
        error
      );


      const assistantMessage = {

        id:
          makeId(),

        role:
          "assistant",

        content:

          "i couldn't finish that request.\n\n"

          +

          error.message,

        createdAt:
          Date.now()

      };


      chat.messages.push(
        assistantMessage
      );


      chat.updatedAt =
        Date.now();


      saveChats();

      appendMessageElement(
        assistantMessage
      );


    } finally {

      requestController =
        null;


      setGenerating(
        false
      );

    }

  }


  /* =======================================================
     GENERATING STATE
     ======================================================= */

  function setGenerating(value) {

    isGenerating =
      Boolean(value);


    el.sendButton
      .classList
      .toggle(
        "hidden",
        isGenerating
      );


    el.stopButton
      .classList
      .toggle(
        "hidden",
        !isGenerating
      );


    el.messageInput.disabled =
      isGenerating;


    el.attachButton.disabled =
      isGenerating;

    el.screenShareButton.disabled =
      isGenerating || screenCaptureInProgress;

  }


  function stopGeneration() {

    if (
      requestController
    ) {

      requestController.abort();

    }


    hideThinking();

    setGenerating(
      false
    );

  }


  /* =======================================================
     CHAT IMAGE
     ======================================================= */

  async function handleImage(file) {

    if (!file) {

      return;

    }


    const supported = [

      "image/jpeg",

      "image/png",

      "image/webp"

    ];


    if (
      !supported.includes(
        file.type
      )
    ) {

      alert(
        "use PNG, JPG, or WEBP."
      );

      return;

    }


    const optimized =
      await optimizeImage(
        file,
        1600,
        0.84
      );


    currentAttachment = {

      name:
        file.name ||
        "image",

      size:
        file.size,

      dataUrl:
        optimized,

      mimeType:
        "image/jpeg"

    };


    renderAttachment();

  }


  function renderAttachment() {

    if (
      !currentAttachment
    ) {

      el.attachmentPreview
        .classList
        .add(
          "hidden"
        );

      return;

    }


    el.attachmentImage.src =
      currentAttachment.dataUrl;


    el.attachmentName.textContent =
      currentAttachment.name;


    el.attachmentInfo.textContent =
      formatBytes(
        currentAttachment.size
      );


    el.attachmentPreview
      .classList
      .remove(
        "hidden"
      );

  }


  function clearAttachment() {

    currentAttachment =
      null;


    el.imageInput.value =
      "";


    el.attachmentImage.src =
      "";


    el.attachmentPreview
      .classList
      .add(
        "hidden"
      );

  }


  function formatBytes(bytes) {

    if (
      bytes < 1024
    ) {

      return `${bytes} B`;

    }


    if (
      bytes <
      1024 * 1024
    ) {

      return (
        (
          bytes / 1024
        ).toFixed(1)

        +

        " KB"
      );

    }


    return (

      (
        bytes /
        1024 /
        1024
      ).toFixed(1)

      +

      " MB"

    );

  }


  /* =======================================================
     IMAGE OPTIMIZER
     ======================================================= */

  function optimizeImage(
    file,
    maxSize,
    quality
  ) {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();


        reader.onerror =
          reject;


        reader.onload =
          () => {

            const image =
              new Image();


            image.onerror =
              reject;


            image.onload =
              () => {

                let width =
                  image.width;


                let height =
                  image.height;


                if (
                  width > maxSize ||
                  height > maxSize
                ) {

                  const ratio =
                    Math.min(

                      maxSize /
                      width,

                      maxSize /
                      height

                    );


                  width =
                    Math.round(
                      width *
                      ratio
                    );


                  height =
                    Math.round(
                      height *
                      ratio
                    );

                }


                const canvas =
                  document.createElement(
                    "canvas"
                  );


                canvas.width =
                  width;


                canvas.height =
                  height;


                const ctx =
                  canvas.getContext(
                    "2d"
                  );


                ctx.drawImage(
                  image,
                  0,
                  0,
                  width,
                  height
                );


                resolve(

                  canvas.toDataURL(
                    "image/jpeg",
                    quality
                  )

                );

              };


            image.src =
              reader.result;

          };


        reader.readAsDataURL(
          file
        );

      }
    );

  }


  /* =======================================================
     PASTE SCREENSHOT
     ======================================================= */

  function handlePaste(event) {

    const item =
      Array.from(
        event.clipboardData
          ?.items ||
        []
      )
        .find(
          entry =>
            entry.type
              .startsWith(
                "image/"
              )
        );


    if (!item) {

      return;

    }


    const file =
      item.getAsFile();


    if (!file) {

      return;

    }


    event.preventDefault();


    handleImage(
      file
    );

  }


  /* =======================================================
     COMPOSER BACKGROUND
     ======================================================= */

  function applyComposerBackground() {

    const mode =
      preferences
        .composerBackground ||
      "theme";


    el.composer.dataset
      .composerBackground =
      mode;


    el.composer.style
      .setProperty(
        "--composer-color-one",
        preferences.gradientColor1
      );


    el.composer.style
      .setProperty(
        "--composer-color-two",
        preferences.gradientColor2
      );


    const thirdColor =
      preferences.useThirdColor
        ? preferences.gradientColor3
        : preferences.gradientColor2;


    el.composer.style
      .setProperty(
        "--composer-color-three",
        thirdColor
      );


    if (
      mode === "image" &&
      preferences.composerImage
    ) {

      el.composerBackgroundImage
        .style
        .backgroundImage =
        `url("${preferences.composerImage}")`;

    } else {

      el.composerBackgroundImage
        .style
        .backgroundImage =
        "";

    }

  }


  /* =======================================================
     BACKGROUND IMAGE
     ======================================================= */

  async function handleBackgroundImage(
    file
  ) {

    if (!file) {

      return;

    }


    if (
      !file.type
        .startsWith(
          "image/"
        )
    ) {

      return;

    }


    /*
      Smaller compression because this
      DOES get saved locally.
    */

    const data =
      await optimizeImage(
        file,
        1200,
        0.70
      );


    el.backgroundPreviewImage.src =
      data;


    el.backgroundImagePreview
      .classList
      .remove(
        "hidden"
      );


    /*
      Temporarily store it on element
      until Save is clicked.
    */

    el.backgroundPreviewImage
      .dataset
      .value =
      data;

  }


  function removeBackgroundImage() {

    el.backgroundPreviewImage.src =
      "";


    el.backgroundPreviewImage
      .dataset
      .value =
      "";


    el.backgroundImageInput.value =
      "";


    el.backgroundImagePreview
      .classList
      .add(
        "hidden"
      );

  }


  /* =======================================================
     CUSTOMIZATION
     ======================================================= */

  function refreshBackgroundOptions() {

    const mode =
      el.composerBackgroundMode.value;


    el.gradientOptions
      .classList
      .toggle(
        "hidden",
        mode !== "gradient"
      );


    el.backgroundImageOptions
      .classList
      .toggle(
        "hidden",
        mode !== "image"
      );

  }


  function openCustomize() {

    el.customName.value =
      preferences.name;


    el.customTone.value =
      preferences.tone;


    el.customLength.value =
      preferences.length;


    el.customRules.value =
      preferences.rules;


    el.customAbout.value =
      preferences.about;


    el.composerBackgroundMode.value =
      preferences.composerBackground;


    el.gradientColor1.value =
      preferences.gradientColor1;


    el.gradientColor2.value =
      preferences.gradientColor2;


    el.gradientColor3.value =
      preferences.gradientColor3;


    el.useThirdColor.checked =
      preferences.useThirdColor;


    if (
      preferences.composerImage
    ) {

      el.backgroundPreviewImage.src =
        preferences.composerImage;


      el.backgroundPreviewImage
        .dataset
        .value =
        preferences.composerImage;


      el.backgroundImagePreview
        .classList
        .remove(
          "hidden"
        );

    } else {

      removeBackgroundImage();

    }


    updateRuleCount();

    refreshBackgroundOptions();


    el.customizeModal
      .classList
      .remove(
        "hidden"
      );

  }


  function closeCustomize() {

    el.customizeModal
      .classList
      .add(
        "hidden"
      );

  }


  function saveCustomize() {

    preferences = {

      ...preferences,


      name:
        el.customName
          .value
          .trim()
          .slice(
            0,
            40
          ),


      tone:
        el.customTone
          .value,


      length:
        el.customLength
          .value,


      rules:
        el.customRules
          .value
          .trim()
          .slice(
            0,
            3000
          ),


      about:
        el.customAbout
          .value
          .trim()
          .slice(
            0,
            2000
          ),


      composerBackground:
        el.composerBackgroundMode
          .value,


      gradientColor1:
        el.gradientColor1
          .value,


      gradientColor2:
        el.gradientColor2
          .value,


      gradientColor3:
        el.gradientColor3
          .value,


      useThirdColor:
        el.useThirdColor
          .checked,


      composerImage:
        el.backgroundPreviewImage
          .dataset
          .value ||
        ""

    };


    savePreferences();

    applyComposerBackground();

    closeCustomize();

  }


  function resetCustomize() {

    if (
      !confirm(
        "reset venomous customization?"
      )
    ) {

      return;

    }


    preferences = {

      ...DEFAULT_PREFERENCES

    };


    savePreferences();

    applyComposerBackground();

    openCustomize();

  }


  function updateRuleCount() {

    el.rulesCount.textContent =
      el.customRules
        .value
        .length;

  }


  /* =======================================================
     UI
     ======================================================= */

  function openSidebar() {
    $("venomous-app").classList.remove("sidebar-collapsed");
    el.sidebar.classList.add("open");
    localStorage.setItem("spydr.ai.sidebar", "open");
  }

  function closeSidebar() {
    el.sidebar.classList.remove("open");
    $("venomous-app").classList.add("sidebar-collapsed");
    localStorage.setItem("spydr.ai.sidebar", "closed");
  }

  function updateModelBranding() {
    const label = MODEL_LABELS[selectedModel] || "venomous";
    document.title = label + " | spydr";
    if (el.sidebarBrandName) el.sidebarBrandName.textContent = label;
    if (el.headerBrandName) el.headerBrandName.textContent = label;
    if (el.welcomeTitle) el.welcomeTitle.textContent = label + ".";
    if (el.messageInput) el.messageInput.placeholder = "message " + label + "...";
    if (el.aiDisclaimer) el.aiDisclaimer.textContent = label + " can make mistakes. check important info.";
    if (el.visionBadge) {
      el.visionBadge.classList.toggle("hidden", selectedModel !== "venomous");
      el.visionBadge.title = selectedModel === "venomous" ? "Image and screen context available" : "Image and screen context is available with Venomous";
    }
    const customizeTitle = $("customize-title");
    if (customizeTitle) customizeTitle.textContent = "personalize " + label;
  }


  function autoResize() {

    el.messageInput.style.height =
      "auto";


    el.messageInput.style.height =

      Math.min(
        el.messageInput.scrollHeight,
        210
      )

      +

      "px";

  }


  function focusInput() {

    setTimeout(
      () =>
        el.messageInput.focus(),
      40
    );

  }


  function scrollBottom() {

    requestAnimationFrame(
      () => {

        el.chatScroll.scrollTop =
          el.chatScroll.scrollHeight;

      }
    );

  }


  /* =======================================================
     MODEL SELECTOR
     ======================================================= */

  if (el.modelSelect) {
    el.modelSelect.value = selectedModel;

    el.modelSelect.addEventListener("change", () => {
      const nextModel = el.modelSelect.value;

      if (!Object.prototype.hasOwnProperty.call(AI_MODELS, nextModel)) {
        el.modelSelect.value = selectedModel;
        return;
      }

      selectedModel = nextModel;
      localStorage.setItem(MODEL_STORAGE, selectedModel);
      updateModelBranding();

      if (selectedModel !== "venomous" && screenShareStream) {
        stopScreenShare();
      }
    });
  }


  /* =======================================================
     EVENTS
     ======================================================= */

  el.newChat.onclick =
    createChat;


  el.headerNewChat.onclick =
    createChat;


  el.clearChats.onclick =
    clearAllChats;


  el.openSidebar.onclick =
    openSidebar;


  el.closeSidebar.onclick =
    closeSidebar;

  if (el.expandSidebarTab) el.expandSidebarTab.onclick = openSidebar;


  el.sendButton.onclick =
    () =>
      sendMessage();


  el.stopButton.onclick =
    stopGeneration;


  el.attachButton.onclick =
    () =>
      el.imageInput.click();


  el.quickImage.onclick =
    () =>
      el.imageInput.click();


  el.removeAttachment.onclick =
    clearAttachment;


  el.imageInput.onchange =
    event =>
      handleImage(
        event.target
          .files?.[0]
      );


  el.messageInput
    .addEventListener(
      "input",
      autoResize
    );


  el.messageInput
    .addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
            "Enter"

          &&

          !event.shiftKey
        ) {

          event.preventDefault();

          sendMessage();

        }

      }
    );


  document.addEventListener(
    "paste",
    handlePaste
  );


  document
    .querySelectorAll(
      ".quick-prompt[data-message]"
    )
    .forEach(
      button => {

        button.onclick =
          () => {

            el.messageInput.value =
              button.dataset
                .message;


            autoResize();

            focusInput();

          };

      }
    );


  /* CUSTOMIZER */

  el.customizeOpen.onclick =
    openCustomize;


  el.customizeClose.onclick =
    closeCustomize;


  el.customSave.onclick =
    saveCustomize;


  el.customReset.onclick =
    resetCustomize;


  el.customRules.oninput =
    updateRuleCount;


  el.composerBackgroundMode
    .onchange =
    refreshBackgroundOptions;


  el.backgroundImageUpload
    .onclick =
    () =>
      el.backgroundImageInput
        .click();


  el.backgroundImageInput
    .onchange =
    event =>
      handleBackgroundImage(
        event.target
          .files?.[0]
      );


  el.backgroundImageRemove
    .onclick =
    removeBackgroundImage;


  el.customizeModal.onclick =
    event => {

      if (
        event.target ===
        el.customizeModal
      ) {

        closeCustomize();

      }

    };


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeSidebar();

        closeCustomize();

      }

    }
  );


  /* =======================================================
     INIT
     ======================================================= */

  function initialize() {

    if (
      activeChatId

      &&

      !chats.some(
        chat =>
          chat.id ===
          activeChatId
      )
    ) {

      activeChatId =
        null;

    }


    if (
      !activeChatId &&
      chats.length
    ) {

      activeChatId =
        [...chats]

          .sort(
            (a, b) =>
              b.updatedAt -
              a.updatedAt
          )[0]
          .id;


      localStorage.setItem(
        STORAGE.activeChat,
        activeChatId
      );

    }


    applyComposerBackground();
    updateModelBranding();

    if (localStorage.getItem("spydr.ai.sidebar") === "closed") {
      $("venomous-app").classList.add("sidebar-collapsed");
    }

    renderHistory();

    renderCurrentChat();

    autoResize();

  }


  initialize();


})();
