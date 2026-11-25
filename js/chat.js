import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bxsiniqhswmiokqshcgi.supabase.co",
  "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd"
);

let currentUser = null;
let currentChannel = "global";
let realtimeSubscription = null;
let selectedImage = null;
let previewUrl = null;

const IMAGE_BUCKET = "chat-images";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const allowedImageTypes = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];

const channelDescriptions = {
  global: "Welcome to the main spydr network.",
  "dev-logs": "Follow the development updates and system deployments. Read-only channel.",
  "off-topic": "Unwind, post memes, and hang out."
};

const messagesContainer = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const attachBtn = document.getElementById("attach-image-btn");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("chat-image-preview");
const imagePreviewName = document.getElementById("image-preview-name");
const clearImageBtn = document.getElementById("clear-image-btn");
const chatTitle = document.getElementById("chat-title");
const chatDesc = document.getElementById("chat-desc");
const channelElements = document.querySelectorAll(".channel");
const createDmBtn = document.getElementById("create-dm-btn");

function isReadOnlyChannel(channel = currentChannel) {
  return channel === "dev-logs";
}

function updateComposerState() {
  const readOnly = isReadOnlyChannel();
  if (messageInput) {
    messageInput.disabled = readOnly;
    messageInput.placeholder = readOnly
      ? "dev-logs is read-only"
      : `Message #${currentChannel} as ${currentUser?.email?.split("@")[0] || "Guest"}...`;
  }
  if (sendBtn) sendBtn.disabled = readOnly;
  if (attachBtn) attachBtn.disabled = readOnly;
  if (readOnly) clearSelectedImage();
}

function clearSelectedImage() {
  selectedImage = null;
  if (imageInput) imageInput.value = "";
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = null;
  if (imagePreview) imagePreview.hidden = true;
  if (imagePreviewName) imagePreviewName.textContent = "";
}

async function initChat() {
  let guestName = localStorage.getItem("spydr_chat_guest_name");
  if (!guestName) {
    guestName = `Guest_${Math.floor(Math.random() * 9000) + 1000}`;
    localStorage.setItem("spydr_chat_guest_name", guestName);
  }
  currentUser = { email: `${guestName}@guest.com` };
  setupChannelClickListeners();
  updateComposerState();
  await switchChannel("global");
}

function setupChannelClickListeners() {
  channelElements.forEach(element => {
    element.addEventListener("click", () => {
      const selectedRoom = element.getAttribute("data-channel");
      if (!selectedRoom || selectedRoom === currentChannel) return;
      document.querySelector(".channel.active")?.classList.remove("active");
      element.classList.add("active");
      switchChannel(selectedRoom);
    });
  });
}

async function switchChannel(targetChannel) {
  currentChannel = targetChannel;
  if (chatTitle) chatTitle.innerHTML = `<i class="ri-hashtag"></i> ${escapeHTML(currentChannel)}`;
  if (chatDesc) chatDesc.textContent = channelDescriptions[currentChannel] || "Secure terminal network.";
  updateComposerState();
  if (messagesContainer) messagesContainer.innerHTML = "";
  await loadMessages();
  subscribeToMessages();
}

if (createDmBtn) {
  createDmBtn.addEventListener("click", () => {
    alert("Private rooms are not available yet.");
  });
}

async function loadMessages() {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("channel", currentChannel)
    .order("created_at", { ascending: true })
    .limit(50);

  if (error) {
    console.error("Error loading messages:", error);
    return;
  }
  if (messagesContainer) {
    messagesContainer.innerHTML = "";
    messages.forEach(appendMessageUI);
    scrollToBottom();
  }
}

function subscribeToMessages() {
  if (realtimeSubscription) supabase.removeChannel(realtimeSubscription);
  realtimeSubscription = supabase
    .channel(`public:messages:${currentChannel}`)
    .on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "messages",
      filter: `channel=eq.${currentChannel}`
    }, payload => {
      appendMessageUI(payload.new);
      scrollToBottom();
    })
    .subscribe();
}

if (attachBtn && imageInput) {
  attachBtn.addEventListener("click", () => {
    if (!isReadOnlyChannel()) imageInput.click();
  });
  imageInput.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (!file) return;
    if (!allowedImageTypes.includes(file.type)) {
      alert("Choose a PNG, JPG, WebP, GIF, or AVIF image.");
      clearSelectedImage();
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      alert("Images must be 5 MB or smaller.");
      clearSelectedImage();
      return;
    }
    clearSelectedImage();
    selectedImage = file;
    previewUrl = URL.createObjectURL(file);
    if (imagePreviewName) imagePreviewName.textContent = file.name;
    if (imagePreview) imagePreview.hidden = false;
  });
}
if (clearImageBtn) clearImageBtn.addEventListener("click", clearSelectedImage);

async function uploadChatImage(file) {
  const extensionByType = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif"
  };
  const extension = extensionByType[file.type];
  const path = `${Date.now()}-${crypto.randomUUID() || Math.random().toString(36).slice(2)}.${extension}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

if (chatForm) {
  chatForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!currentUser || isReadOnlyChannel()) return;

    const content = messageInput.value.trim();
    const imageFile = selectedImage;
    if (!content && !imageFile) return;

    sendBtn.disabled = true;
    if (attachBtn) attachBtn.disabled = true;
    try {
      let imageUrl = null;
      if (imageFile) imageUrl = await uploadChatImage(imageFile);

      const { error } = await supabase.from("messages").insert([{
        user_email: currentUser.email,
        content,
        channel: currentChannel,
        image_url: imageUrl
      }]);
      if (error) throw error;

      messageInput.value = "";
      clearSelectedImage();
    } catch (error) {
      console.error("Error sending chat message:", error);
      alert("Could not send that message. Check the chat database and image bucket setup.");
    } finally {
      updateComposerState();
    }
  });
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[character]));
}

function appendMessageUI(message) {
  if (!messagesContainer) return;
  const time = new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const username = message.user_email ? message.user_email.split("@")[0] : "System";

  const messageElement = document.createElement("div");
  messageElement.className = "msg";

  const avatar = document.createElement("div");
  avatar.className = "msg-pfp";

  const content = document.createElement("div");
  content.className = "msg-content";

  const header = document.createElement("div");
  header.className = "msg-header";
  const user = document.createElement("span");
  user.className = "msg-user";
  user.textContent = username;
  const timestamp = document.createElement("span");
  timestamp.className = "msg-time";
  timestamp.textContent = time;
  header.append(user, timestamp);

  content.appendChild(header);
  if (message.content) {
    const text = document.createElement("div");
    text.className = "msg-text";
    text.textContent = message.content;
    content.appendChild(text);
  }

  if (message.image_url) {
    try {
      const url = new URL(message.image_url);
      if (url.protocol === "https:" && url.hostname === "bxsiniqhswmiokqshcgi.supabase.co") {
        const image = document.createElement("img");
        image.className = "msg-image";
        image.src = url.href;
        image.alt = `Image shared by ${username}`;
        image.loading = "lazy";
        content.appendChild(image);
      }
    } catch {}
  }

  messageElement.append(avatar, content);
  messagesContainer.appendChild(messageElement);
}

function scrollToBottom() {
  if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

window.addEventListener("DOMContentLoaded", initChat);
