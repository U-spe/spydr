/* =========================================================
   VENOMOUS AI
   /js/study.js
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     CONFIG
     ======================================================= */

  const API_ENDPOINT = "/api/venomous";

  const STORAGE = {
    chats: "spydr.venomous.chats",
    activeChat: "spydr.venomous.activeChat",
    preferences: "spydr.venomous.preferences"
  };


  const DEFAULT_PREFERENCES = {
    name: "",
    tone: "adaptive",
    length: "adaptive",
    rules: "",
    about: ""
  };


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const el = {

    sidebar:
      document.getElementById("venomous-sidebar"),

    openSidebar:
      document.getElementById("open-sidebar"),

    closeSidebar:
      document.getElementById("close-sidebar"),


    newChat:
      document.getElementById("new-chat"),

    headerNewChat:
      document.getElementById("header-new-chat"),

    history:
      document.getElementById("chat-history"),

    clearChats:
      document.getElementById("clear-chats"),


    chatScroll:
      document.getElementById("chat-scroll"),

    chatContent:
      document.getElementById("chat-content"),

    welcome:
      document.getElementById("welcome"),


    messageInput:
      document.getElementById("message-input"),

    sendButton:
      document.getElementById("send-button"),

    stopButton:
      document.getElementById("stop-button"),


    attachButton:
      document.getElementById("attach-button"),

    imageInput:
      document.getElementById("image-input"),

    quickImage:
      document.getElementById("quick-image"),


    attachmentPreview:
      document.getElementById("attachment-preview"),

    attachmentImage:
      document.getElementById("attachment-image"),

    attachmentName:
      document.getElementById("attachment-name"),

    attachmentInfo:
      document.getElementById("attachment-info"),

    removeAttachment:
      document.getElementById("remove-attachment"),


    customizeOpen:
      document.getElementById("customize-open"),

    customizeModal:
      document.getElementById("customize-modal"),

    customizeClose:
      document.getElementById("customize-close"),

    customName:
      document.getElementById("custom-name"),

    customTone:
      document.getElementById("custom-tone"),

    customLength:
      document.getElementById("custom-length"),

    customRules:
      document.getElementById("custom-rules"),

    customAbout:
      document.getElementById("custom-about"),

    customSave:
      document.getElementById("custom-save"),

    customReset:
      document.getElementById("custom-reset"),

    rulesCount:
      document.getElementById("rules-count")

  };


  /* =======================================================
     STATE
     ======================================================= */

  let chats =
    readJSON(
      STORAGE.chats,
      []
    );


  let preferences =
    readJSON(
      STORAGE.preferences,
      DEFAULT_PREFERENCES
    );


  let activeChatId =
    localStorage.getItem(
      STORAGE.activeChat
    );


  let currentAttachment = null;

  let requestController = null;

  let isGenerating = false;


  /*
    Runtime image data.

    Images are NOT permanently written to localStorage.
    Storing large base64 screenshots there would hit
    browser storage limits pretty quickly.

    Text chat history IS saved.
  */

  const runtimeImages = new Map();


  /* =======================================================
     STORAGE HELPERS
     ======================================================= */

  function readJSON(key, fallback) {

    try {

      const value =
        localStorage.getItem(key);

      if (!value) {
        return fallback;
      }

      return JSON.parse(value);

    } catch (error) {

      console.warn(
        "[Venomous] storage read failed:",
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
        "[Venomous] could not save chats:",
        error
      );

    }

  }


  function savePreferences() {

    localStorage.setItem(
      STORAGE.preferences,
      JSON.stringify(preferences)
    );

  }


  /* =======================================================
     ID
     ======================================================= */

  function makeId() {

    if (
      window.crypto &&
      crypto.randomUUID
    ) {

      return crypto.randomUUID();

    }

    return (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .slice(2)
    );

  }


  /* =======================================================
     CHAT HELPERS
     ======================================================= */

  function getActiveChat() {

    return chats.find(
      chat =>
        chat.id === activeChatId
    );

  }


  function createChat() {

    const chat = {

      id: makeId(),

      title: "new chat",

      createdAt: Date.now(),

      updatedAt: Date.now(),

      messages: []

    };


    chats.unshift(chat);

    activeChatId = chat.id;


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

    let chat =
      getActiveChat();


    if (!chat) {

      chat =
        createChat();

    }

    return chat;

  }


  function openChat(id) {

    if (isGenerating) {
      stopGeneration();
    }


    activeChatId = id;


    localStorage.setItem(
      STORAGE.activeChat,
      id
    );


    renderHistory();

    renderCurrentChat();

    closeSidebar();

  }


  function deleteChat(id) {

    if (
      id === activeChatId &&
      isGenerating
    ) {

      stopGeneration();

    }


    chats =
      chats.filter(
        chat =>
          chat.id !== id
      );


    if (
      activeChatId === id
    ) {

      activeChatId =
        chats[0]?.id || null;

    }


    if (activeChatId) {

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


    const result =
      prompt(
        "rename chat",
        chat.title
      );


    if (
      result === null
    ) {

      return;

    }


    const title =
      result
        .trim()
        .slice(
          0,
          60
        );


    if (!title) {
      return;
    }


    chat.title =
      title;


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


    const confirmed =
      confirm(
        "delete all venomous chats from this device?"
      );


    if (!confirmed) {
      return;
    }


    if (isGenerating) {
      stopGeneration();
    }


    chats = [];

    activeChatId = null;


    localStorage.removeItem(
      STORAGE.chats
    );

    localStorage.removeItem(
      STORAGE.activeChat
    );


    runtimeImages.clear();


    renderHistory();

    renderCurrentChat();

  }


  /* =======================================================
     CHAT TITLES
     ======================================================= */

  function makeChatTitle(text) {

    let title =
      String(text || "")
        .replace(/\s+/g, " ")
        .trim();


    if (!title) {

      return "image chat";

    }


    if (
      title.length > 38
    ) {

      title =
        title.slice(
          0,
          38
        ) + "...";

    }


    return title;

  }


  /* =======================================================
     HISTORY
     ======================================================= */

  function renderHistory() {

    el.history.innerHTML = "";


    if (!chats.length) {

      const empty =
        document.createElement("div");

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


    ordered.forEach(chat => {

      const row =
        document.createElement("div");


      row.className =
        "history-chat";


      if (
        chat.id === activeChatId
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
        chat.title ||
        "new chat";


      open.title =
        chat.title;


      open.addEventListener(
        "click",
        () =>
          openChat(chat.id)
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


      rename.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          renameChat(
            chat.id
          );

        }
      );


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


      remove.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          deleteChat(
            chat.id
          );

        }
      );


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

    });

  }


  /* =======================================================
     CURRENT CHAT
     ======================================================= */

  function renderCurrentChat() {

    const chat =
      getActiveChat();


    /*
      Remove old rendered messages.
      Keep welcome node.
    */

    Array
      .from(
        el.chatContent.children
      )
      .forEach(child => {

        if (
          child !== el.welcome
        ) {

          child.remove();

        }

      });


    if (
      !chat ||
      !chat.messages.length
    ) {

      el.welcome.classList.remove(
        "hidden"
      );

      scrollBottom();

      return;
    }


    el.welcome.classList.add(
      "hidden"
    );


    chat.messages.forEach(
      message => {

        appendMessageElement(
          message,
          false
        );

      }
    );


    scrollBottom();

  }


  /* =======================================================
     MESSAGE RENDERER
     ======================================================= */

  function appendMessageElement(
    message,
    shouldScroll = true
  ) {

    el.welcome.classList.add(
      "hidden"
    );


    const row =
      document.createElement(
        "div"
      );


    row.className =
      `message ${message.role}`;


    row.dataset.messageId =
      message.id;


    if (
      message.role === "assistant"
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


    /*
      Render runtime image if available.
    */

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


      image.alt =
        "Uploaded image";


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
      message.role === "assistant"
    ) {

      text.innerHTML =
        formatAIText(
          message.content || ""
        );

    } else {

      text.textContent =
        message.content || "";

    }


    body.appendChild(
      text
    );


    if (
      message.role === "assistant" &&
      message.content
    ) {

      const actions =
        document.createElement(
          "div"
        );


      actions.className =
        "message-actions";


      const copy =
        document.createElement(
          "button"
        );


      copy.className =
        "message-action";


      copy.title =
        "Copy";


      copy.innerHTML =
        '<i class="ri-file-copy-line"></i>';


      copy.addEventListener(
        "click",
        async () => {

          try {

            await navigator.clipboard.writeText(
              message.content
            );


            copy.innerHTML =
              '<i class="ri-check-line"></i>';


            setTimeout(
              () => {

                copy.innerHTML =
                  '<i class="ri-file-copy-line"></i>';

              },
              1200
            );

          } catch (error) {

            console.warn(
              "[Venomous] clipboard failed",
              error
            );

          }

        }
      );


      actions.appendChild(
        copy
      );


      body.appendChild(
        actions
      );

    }


    row.appendChild(
      body
    );


    el.chatContent.appendChild(
      row
    );


    if (
      shouldScroll
    ) {

      scrollBottom();

    }


    return row;

  }


  /* =======================================================
     SAFE SIMPLE MARKDOWN
     ======================================================= */

  function escapeHTML(value) {

    return String(value)
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

    let text =
      escapeHTML(
        input || ""
      );


    /*
      code blocks
    */

    const blocks = [];


    text =
      text.replace(
        /```([\s\S]*?)```/g,
        (_, code) => {

          const index =
            blocks.length;


          blocks.push(
            `<pre><code>${code.trim()}</code></pre>`
          );


          return (
            `VENOMCODEBLOCK${index}END`
          );

        }
      );


    /*
      headings
    */

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
        );


    /*
      bold
    */

    text =
      text.replace(
        /\*\*(.+?)\*\*/g,
        "<strong>$1</strong>"
      );


    /*
      inline code
    */

    text =
      text.replace(
        /`([^`\n]+)`/g,
        "<code>$1</code>"
      );


    /*
      line breaks
    */

    const paragraphs =
      text
        .split(/\n{2,}/)
        .map(block => {

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
              "VENOMCODEBLOCK"
            )
          ) {

            return trimmed;

          }


          return (
            "<p>" +
            trimmed.replace(
              /\n/g,
              "<br>"
            ) +
            "</p>"
          );

        })
        .join("");


    let result =
      paragraphs;


    blocks.forEach(
      (block, index) => {

        result =
          result.replace(
            `<p>VENOMCODEBLOCK${index}END</p>`,
            block
          );


        result =
          result.replace(
            `VENOMCODEBLOCK${index}END`,
            block
          );

      }
    );


    return result;

  }


  /* =======================================================
     THINKING INDICATOR
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
        <div class="message-text">
          <div class="thinking">
            <span class="thinking-dot"></span>
            <span class="thinking-dot"></span>
            <span class="thinking-dot"></span>
          </div>
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
     SEND MESSAGE
     ======================================================= */

  async function sendMessage(
    forcedText = null
  ) {

    if (
      isGenerating
    ) {

      return;

    }


    const text =
      (
        forcedText ??
        el.messageInput.value
      ).trim();


    if (
      !text &&
      !currentAttachment
    ) {

      return;

    }


    const chat =
      ensureChat();


    const imageId =
      currentAttachment
        ? makeId()
        : null;


    if (
      currentAttachment &&
      imageId
    ) {

      runtimeImages.set(
        imageId,
        currentAttachment.dataUrl
      );

    }


    const userMessage = {

      id: makeId(),

      role: "user",

      content:
        text ||
        "Analyze this image.",

      createdAt:
        Date.now(),

      imageId:
        imageId,

      hadImage:
        Boolean(
          currentAttachment
        )

    };


    /*
      Save actual image separately for the outgoing request.
    */

    const outgoingImage =
      currentAttachment
        ? {
            dataUrl:
              currentAttachment.dataUrl,

            mimeType:
              currentAttachment.mimeType
          }
        : null;


    /*
      Add user message.
    */

    chat.messages.push(
      userMessage
    );


    chat.updatedAt =
      Date.now();


    if (
      chat.messages.length === 1
    ) {

      chat.title =
        makeChatTitle(
          text
        );

    }


    /*
      Clear composer.
    */

    el.messageInput.value = "";

    autoResize();

    clearAttachment();


    /*
      Save + render.
    */

    saveChats();

    renderHistory();

    appendMessageElement(
      userMessage
    );


    /*
      Start request.
    */

    setGenerating(true);

    showThinking();


    requestController =
      new AbortController();


    try {

      const payloadMessages =
        buildAPIMessages(
          chat
        );


      /*
        Attach current image only to latest user message.

        The API accepts it separately and builds
        Groq's multimodal message structure server-side.
      */

      const response =
        await fetch(
          API_ENDPOINT,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            signal:
              requestController.signal,

            body:
              JSON.stringify({

                messages:
                  payloadMessages,

                image:
                  outgoingImage,

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
        await response.json()
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


      const content =
        String(
          data.message ||
          ""
        ).trim();


      if (!content) {

        throw new Error(
          "Venomous returned an empty response."
        );

      }


      const assistantMessage = {

        id: makeId(),

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

        console.log(
          "[Venomous] generation stopped"
        );

        return;

      }


      console.error(
        "[Venomous]",
        error
      );


      const assistantMessage = {

        id: makeId(),

        role:
          "assistant",

        content:
          `i couldn't finish that request.\n\n${error.message}`,

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

      requestController = null;

      setGenerating(false);

    }

  }


  /* =======================================================
     API CONTEXT
     ======================================================= */

  function buildAPIMessages(chat) {

    /*
      Prevent the client from sending the user's
      entire lifetime of Venomous conversations.

      We only need recent context.

      Server ALSO validates everything again.
    */

    return chat.messages
      .slice(-24)
      .filter(
        message =>
          message.role === "user" ||
          message.role === "assistant"
      )
      .map(
        message => ({

          role:
            message.role,

          content:
            String(
              message.content || ""
            ).slice(
              0,
              12000
            )

        })
      );

  }


  /* =======================================================
     GENERATION STATE
     ======================================================= */

  function setGenerating(value) {

    isGenerating =
      Boolean(value);


    el.sendButton.classList.toggle(
      "hidden",
      isGenerating
    );


    el.stopButton.classList.toggle(
      "hidden",
      !isGenerating
    );


    el.messageInput.disabled =
      isGenerating;


    el.attachButton.disabled =
      isGenerating;

  }


  function stopGeneration() {

    if (
      requestController
    ) {

      requestController.abort();

    }


    hideThinking();

    setGenerating(false);

  }


  /* =======================================================
     IMAGE HANDLING
     ======================================================= */

  async function handleImage(file) {

    if (!file) {
      return;
    }


    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      alert(
        "Venomous supports PNG, JPG, and WEBP images."
      );

      return;

    }


    try {

      const optimized =
        await optimizeImage(
          file
        );


      currentAttachment = {

        name:
          file.name ||
          "image",

        originalSize:
          file.size,

        dataUrl:
          optimized.dataUrl,

        mimeType:
          optimized.mimeType

      };


      renderAttachment();


    } catch (error) {

      console.error(
        "[Venomous] image error:",
        error
      );


      alert(
        "couldn't load that image."
      );

    }

  }


  /*
    Resize screenshots before sending them.

    This is VERY important because the browser sends
    the image to our Vercel function as base64.
  */

  function optimizeImage(file) {

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

                const MAX_DIMENSION =
                  1600;


                let width =
                  image.width;


                let height =
                  image.height;


                if (
                  width >
                    MAX_DIMENSION ||
                  height >
                    MAX_DIMENSION
                ) {

                  const ratio =
                    Math.min(
                      MAX_DIMENSION / width,
                      MAX_DIMENSION / height
                    );


                  width =
                    Math.round(
                      width * ratio
                    );


                  height =
                    Math.round(
                      height * ratio
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


                /*
                  Convert to JPEG for smaller requests.

                  PNG screenshots often become multiple MB.
                */

                const dataUrl =
                  canvas.toDataURL(
                    "image/jpeg",
                    0.84
                  );


                resolve({

                  dataUrl,

                  mimeType:
                    "image/jpeg"

                });

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
        currentAttachment.originalSize
      );


    el.attachmentPreview
      .classList
      .remove(
        "hidden"
      );

  }


  function clearAttachment() {

    currentAttachment = null;


    el.imageInput.value =
      "";


    el.attachmentPreview
      .classList
      .add(
        "hidden"
      );


    el.attachmentImage.src =
      "";

  }


  function formatBytes(bytes) {

    if (
      !Number.isFinite(bytes)
    ) {

      return "";
    }


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
        `${(
          bytes / 1024
        ).toFixed(1)} KB`
      );

    }


    return (
      `${(
        bytes /
        (1024 * 1024)
      ).toFixed(1)} MB`
    );

  }


  /* =======================================================
     PASTE SCREENSHOTS
     ======================================================= */

  function handlePaste(event) {

    const items =
      Array.from(
        event.clipboardData?.items ||
        []
      );


    const imageItem =
      items.find(
        item =>
          item.type.startsWith(
            "image/"
          )
      );


    if (!imageItem) {
      return;
    }


    const file =
      imageItem.getAsFile();


    if (!file) {
      return;
    }


    event.preventDefault();


    handleImage(
      file
    );

  }


  /* =======================================================
     CUSTOMIZATION
     ======================================================= */

  function openCustomize() {

    el.customName.value =
      preferences.name ||
      "";


    el.customTone.value =
      preferences.tone ||
      "adaptive";


    el.customLength.value =
      preferences.length ||
      "adaptive";


    el.customRules.value =
      preferences.rules ||
      "";


    el.customAbout.value =
      preferences.about ||
      "";


    updateRuleCount();


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
          )

    };


    savePreferences();

    closeCustomize();

  }


  function resetCustomize() {

    const confirmed =
      confirm(
        "reset your venomous preferences?"
      );


    if (!confirmed) {
      return;
    }


    preferences = {
      ...DEFAULT_PREFERENCES
    };


    savePreferences();

    openCustomize();

  }


  function updateRuleCount() {

    el.rulesCount.textContent =
      el.customRules.value.length;

  }


  /* =======================================================
     SIDEBAR
     ======================================================= */

  function openSidebar() {

    el.sidebar.classList.add(
      "open"
    );

  }


  function closeSidebar() {

    el.sidebar.classList.remove(
      "open"
    );

  }


  /* =======================================================
     TEXTAREA
     ======================================================= */

  function autoResize() {

    const input =
      el.messageInput;


    input.style.height =
      "auto";


    input.style.height =
      Math.min(
        input.scrollHeight,
        170
      ) + "px";

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
     EVENT LISTENERS
     ======================================================= */

  el.newChat.addEventListener(
    "click",
    createChat
  );


  el.headerNewChat.addEventListener(
    "click",
    createChat
  );


  el.clearChats.addEventListener(
    "click",
    clearAllChats
  );


  el.openSidebar.addEventListener(
    "click",
    openSidebar
  );


  el.closeSidebar.addEventListener(
    "click",
    closeSidebar
  );


  el.sendButton.addEventListener(
    "click",
    () =>
      sendMessage()
  );


  el.stopButton.addEventListener(
    "click",
    stopGeneration
  );


  el.messageInput.addEventListener(
    "input",
    autoResize
  );


  el.messageInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
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


  el.attachButton.addEventListener(
    "click",
    () =>
      el.imageInput.click()
  );


  el.quickImage.addEventListener(
    "click",
    () =>
      el.imageInput.click()
  );


  el.imageInput.addEventListener(
    "change",
    event => {

      handleImage(
        event.target.files?.[0]
      );

    }
  );


  el.removeAttachment.addEventListener(
    "click",
    clearAttachment
  );


  document
    .querySelectorAll(
      ".quick-prompt[data-message]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const message =
            button.dataset.message;


          el.messageInput.value =
            message;


          autoResize();

          focusInput();

        }
      );

    });


  /*
    Customization
  */

  el.customizeOpen.addEventListener(
    "click",
    openCustomize
  );


  el.customizeClose.addEventListener(
    "click",
    closeCustomize
  );


  el.customSave.addEventListener(
    "click",
    saveCustomize
  );


  el.customReset.addEventListener(
    "click",
    resetCustomize
  );


  el.customRules.addEventListener(
    "input",
    updateRuleCount
  );


  el.customizeModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        el.customizeModal
      ) {

        closeCustomize();

      }

    }
  );


  /*
    Escape closes stuff.
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !==
        "Escape"
      ) {

        return;

      }


      closeSidebar();

      closeCustomize();

    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initialize() {

    /*
      Remove invalid active chat.
    */

    if (
      activeChatId &&
      !chats.some(
        chat =>
          chat.id === activeChatId
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
          )[0].id;


      localStorage.setItem(
        STORAGE.activeChat,
        activeChatId
      );

    }


    renderHistory();

    renderCurrentChat();

    autoResize();

  }


  initialize();

})();
