import { supabase } from "/js/supabase-client.js";
import { mountMemberNavigation } from "./globalmenu.js";
import { isValidUUID, safeAvatarUrl, safeAccent, initials, relativeTime, memberSince } from "./member-core.js";

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const localKey = key => "spydr_members_" + key;
const catalogFallback = [
  { id: "games", name: "Games", description: "Your game library", icon: "ri-gamepad-line", category: "core", href: "/lessons.html" },
  { id: "apps", name: "Apps", description: "Spydr app collection", icon: "ri-apps-2-line", category: "core", href: "/flashcards.html" },
  { id: "browser", name: "Browser", description: "Browse the web", icon: "ri-global-line", category: "core", href: "/search.html" },
  { id: "ai", name: "AI", description: "Study and create", icon: "ri-sparkling-2-line", category: "core", href: "/study.html" },
  { id: "chat", name: "Community chat", description: "Talk with the network", icon: "ri-message-3-line", category: "social", href: "/review.html" },
  { id: "settings", name: "Settings", description: "Make Spydr yours", icon: "ri-settings-3-line", category: "core", href: "/settings.html" }
];

let currentUser = null;
const GUEST_MODE = true;
let profile = null;
let bookmarks = [];
let friends = [];
let requests = [];
let socialReady = false;
let activity = [];
let apps = catalogFallback;
let activeFilter = "all";
let navigate = () => {};
let inviteTarget = "";
let profileFallback = false;

function readLocal(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(localKey(key)) || "null");
    return value === null ? fallback : value;
  } catch { return fallback; }
}
function writeLocal(key, value) {
  try { localStorage.setItem(localKey(key), JSON.stringify(value)); return true; }
  catch { return false; }
}
function showToast(message, type = "") {
  const region = $("#toast-region");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = "member-toast " + type;
  toast.textContent = message;
  region.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3600);
}
function setAuthMessage(message, isError = false) {
  const target = $("#auth-message");
  if (target) {
    target.textContent = message;
    target.style.color = isError ? "#edaaaa" : "#c9cbd0";
  }
}
function setAuthMode(mode) {
  const signup = mode === "signup";
  $$(".auth-tab").forEach(tab => {
    const active = tab.dataset.authMode === mode;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  $("#display-name-wrap").hidden = !signup;
  $("#auth-heading").innerHTML = signup ? "make it<br><span>yours.</span>" : "your space.<br><span>your Spydr.</span>";
  $("#auth-copy").textContent = signup
    ? "Create your free Spydr account and set up your member space."
    : "Sign in to open your member dashboard, manage your profile, and keep your apps close.";
  $("#auth-submit").innerHTML = signup ? 'create account <i class="ri-arrow-right-line"></i>' : 'continue <i class="ri-arrow-right-line"></i>';
  $("#auth-password").autocomplete = signup ? "new-password" : "current-password";
  setAuthMessage("");
}

function showGate(message = "") {
  $("#member-app").hidden = true;
  $("#auth-gate").hidden = false;
  if (message) setAuthMessage(message);
}
function showDashboard() {
  $("#auth-gate").hidden = true;
  $("#member-app").hidden = false;
}
function updateAvatar(element, name, url) {
  if (!element) return;
  const safe = safeAvatarUrl(url);
  element.replaceChildren();
  if (safe) {
    const image = document.createElement("img");
    image.src = safe;
    image.alt = "";
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";
    image.onerror = () => { element.textContent = initials(name); };
    element.appendChild(image);
  } else {
    element.textContent = initials(name);
  }
}
function getProfileName() {
  return profile?.display_name || currentUser?.email?.split("@")[0] || "Member";
}
function applyAccent(value) {
  const accent = safeAccent(value);
  document.documentElement.style.setProperty("--member-accent", accent);
  document.documentElement.style.setProperty("--member-accent-soft", accent + "20");
  $$(".member-pill,.member-tag").forEach(element => element.style.setProperty("--member-accent", accent));
}
function applyPreferences() {
  const preferences = profile?.preferences || readLocal("preferences", {});
  document.body.classList.toggle("member-compact", Boolean(preferences.compact));
  document.body.classList.toggle("member-reduce-motion", Boolean(preferences.reduceMotion));
  const color = safeAccent(preferences.accent || profile?.accent);
  applyAccent(color);
  if ($("#settings-accent")) $("#settings-accent").value = color;
  if ($("#compact-toggle")) $("#compact-toggle").checked = Boolean(preferences.compact);
  if ($("#motion-toggle")) $("#motion-toggle").checked = Boolean(preferences.reduceMotion);
}

async function loadCatalog() {
  try {
    const response = await fetch("/members/data/apps.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("catalog unavailable");
    const data = await response.json();
    if (Array.isArray(data.apps) && data.apps.length) apps = data.apps;
  } catch (error) {
    console.warn("members // app catalog fallback:", error);
    apps = catalogFallback;
  }
}

async function loadProfile() {
  const metadata = currentUser.user_metadata || {};
  if (GUEST_MODE) {
    const saved = readLocal("guest_profile", {});
    profile = { user_id: "public-guest", display_name: String(saved.display_name || "Guest").slice(0, 28), avatar_url: safeAvatarUrl(saved.avatar_url || ""), bio: saved.bio || "Exploring Spydr Members in guest mode.", status: saved.status || "online", accent: safeAccent(saved.accent), preferences: saved.preferences || readLocal("preferences", {}) };
    hydrateProfileUI();
    applyPreferences();
    return;
  }
  const fallback = {
    user_id: currentUser.id,
    display_name: metadata.display_name || currentUser.email?.split("@")[0] || "Member",
    avatar_url: safeAvatarUrl(metadata.avatar_url || ""),
    bio: metadata.bio || "",
    status: metadata.status || "online",
    accent: safeAccent(metadata.accent),
    preferences: metadata.preferences || {}
  };
  profileFallback = false;
  try {
    const { data, error } = await supabase.from("member_profiles").select("user_id,display_name,avatar_url,bio,status,accent,updated_at").eq("user_id", currentUser.id).maybeSingle();
    if (error) throw error;
    profile = { ...fallback, ...(data || {}) };
    profile.preferences = metadata.preferences || readLocal("preferences", {});
  } catch (error) {
    profileFallback = true;
    profile = fallback;
    console.info("members // profile table not ready; using auth metadata:", error.message);
  }
  profile.display_name = String(profile.display_name || fallback.display_name).slice(0, 28);
  profile.avatar_url = safeAvatarUrl(profile.avatar_url);
  profile.accent = safeAccent(profile.accent);
  hydrateProfileUI();
  applyPreferences();
}
function hydrateProfileUI() {
  const name = getProfileName();
  const bio = profile?.bio || "Your Spydr profile. Make it yours.";
  const status = profile?.status || "online";
  $("#sidebar-name").textContent = name;
  $("#top-name").textContent = name;
  $("#summary-name").textContent = name;
  $("#welcome-name").textContent = name;
  $("#editor-preview-name").textContent = name;
  $("#summary-bio").textContent = bio;
  $("#welcome-status").textContent = profile?.bio || "Your Spydr setup is ready when you are.";
  $("#summary-status").textContent = status;
  $("#editor-preview-status").textContent = status;
  $("#status-dot").dataset.status = status;
  $("#profile-id-short").textContent = "ID " + currentUser.id.slice(0, 7);
  $("#member-id").textContent = currentUser.id;
  $("#detail-id").textContent = currentUser.id;
  $("#detail-email").textContent = currentUser.email || "—";
  $("#detail-created").textContent = new Date(currentUser.created_at).toLocaleDateString();
  $("#metric-member-since").textContent = memberSince(currentUser.created_at);
  $("#metric-member-since-full").textContent = new Date(currentUser.created_at).toLocaleDateString([], { month: "short", year: "numeric" });
  $("#profile-name").value = name;
  $("#profile-avatar-url").value = profile?.avatar_url || "";
  $("#profile-bio").value = profile?.bio || "";
  $("#profile-status").value = ["online", "away", "busy", "invisible"].includes(status) ? status : "online";
  $("#profile-accent").value = profile.accent;
  $("#bio-length").textContent = ($("#profile-bio").value.length) + " / 180";
  updateAvatar($("#sidebar-avatar"), name, profile.avatar_url);
  updateAvatar($("#top-avatar"), name, profile.avatar_url);
  updateAvatar($("#profile-avatar"), name, profile.avatar_url);
  updateAvatar($("#editor-avatar"), name, profile.avatar_url);
}

function setGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "good morning," : hour < 18 ? "good afternoon," : "good evening,";
  $("#member-greeting").textContent = greeting + " " + getProfileName().split(" ")[0].toLowerCase() + ".";
  $("#member-local-time").textContent = new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }).toUpperCase();
}
function updateClock() {
  const now = new Date();
  $("#member-date").textContent = now.toLocaleDateString([], { month: "short", day: "numeric" }).toUpperCase();
  $("#member-clock").textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
function renderPinned() {
  const saved = apps.filter(app => bookmarks.includes(app.id));
  const grid = $("#pinned-grid");
  grid.replaceChildren();
  saved.slice(0, 6).forEach(app => {
    const link = document.createElement("a");
    link.className = "pinned-app";
    link.href = app.href;
    const icon = document.createElement("span");
    icon.className = "app-icon";
    icon.innerHTML = '<i class="' + app.icon + '" aria-hidden="true"></i>';
    const label = document.createElement("span");
    label.textContent = app.name;
    link.append(icon, label);
    grid.appendChild(link);
  });
  $("#pinned-empty").hidden = saved.length > 0;
  $("#metric-bookmarks").textContent = bookmarks.length;
}
function renderApps() {
  const query = ($("#app-search").value || "").trim().toLowerCase();
  const filtered = apps.filter(app => {
    const matchesQuery = [app.name, app.description, app.category].join(" ").toLowerCase().includes(query);
    const matchesFilter = activeFilter === "all" || (activeFilter === "saved" ? bookmarks.includes(app.id) : app.category === activeFilter);
    return matchesQuery && matchesFilter;
  });
  const grid = $("#app-library-grid");
  grid.replaceChildren();
  filtered.forEach(app => {
    const card = document.createElement("article");
    card.className = "library-app";
    const icon = document.createElement("span");
    icon.className = "app-icon";
    icon.innerHTML = '<i class="' + app.icon + '" aria-hidden="true"></i>';
    const copy = document.createElement("div");
    copy.className = "library-app-copy";
    const title = document.createElement("strong");
    title.textContent = app.name;
    const description = document.createElement("small");
    description.textContent = app.description;
    copy.append(title, description);
    const open = document.createElement("a");
    open.className = "app-open";
    open.href = app.href;
    open.setAttribute("aria-label", "Open " + app.name);
    open.innerHTML = '<i class="ri-arrow-up-right-line"></i>';
    const bookmark = document.createElement("button");
    bookmark.className = "bookmark-button" + (bookmarks.includes(app.id) ? " saved" : "");
    bookmark.type = "button";
    bookmark.setAttribute("aria-label", bookmarks.includes(app.id) ? "Unpin " + app.name : "Pin " + app.name);
    bookmark.innerHTML = bookmarks.includes(app.id) ? '<i class="ri-bookmark-fill"></i>' : '<i class="ri-bookmark-line"></i>';
    bookmark.addEventListener("click", () => toggleBookmark(app.id));
    card.append(icon, copy, open, bookmark);
    grid.appendChild(card);
  });
  $("#apps-count").textContent = filtered.length + (filtered.length === 1 ? " app" : " apps");
  $("#apps-empty").hidden = filtered.length > 0;
}
async function loadBookmarks() {
  let list = readLocal(GUEST_MODE ? "guest_bookmarks" : "bookmarks", []);
  if (GUEST_MODE) {
    bookmarks = [...new Set(list)].filter(id => apps.some(app => app.id === id));
    renderPinned();
    renderApps();
    return;
  }
  try {
    const { data, error } = await supabase.from("member_bookmarks").select("app_id").eq("user_id", currentUser.id).order("position");
    if (error) throw error;
    list = (data || []).map(row => row.app_id);
    writeLocal("bookmarks", list);
  } catch (error) {
    console.info("members // bookmark sync unavailable; using this device:", error.message);
  }
  bookmarks = [...new Set(list)].filter(id => apps.some(app => app.id === id));
  renderPinned();
  renderApps();
}
async function toggleBookmark(id) {
  const exists = bookmarks.includes(id);
  bookmarks = exists ? bookmarks.filter(value => value !== id) : [...bookmarks, id];
  writeLocal(GUEST_MODE ? "guest_bookmarks" : "bookmarks", bookmarks);
  renderPinned();
  renderApps();
  trackActivity(exists ? "bookmark_removed" : "bookmark_added", id);
  if (GUEST_MODE) {
    showToast(exists ? "Removed from this browser." : "Pinned in this browser.", "success");
    return;
  }
  try {
    if (exists) {
      const { error } = await supabase.from("member_bookmarks").delete().eq("user_id", currentUser.id).eq("app_id", id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("member_bookmarks").upsert({ user_id: currentUser.id, app_id: id, position: bookmarks.length - 1 }, { onConflict: "user_id,app_id" });
      if (error) throw error;
    }
  } catch (error) {
    console.info("members // bookmark stored locally:", error.message);
  }
  showToast(exists ? "Removed from pinned apps." : "Pinned to your dashboard.", "success");
}

const activityLabels = {
  bookmark_added: ["Pinned an app", "ri-bookmark-3-line"],
  bookmark_removed: ["Removed an app pin", "ri-bookmark-line"],
  profile_updated: ["Updated their profile", "ri-user-settings-line"],
  friend_request_sent: ["Sent a friend request", "ri-user-add-line"],
  friend_request_accepted: ["Accepted a friend request", "ri-user-follow-line"],
  signed_in: ["Signed in to Spydr Members", "ri-login-box-line"]
};
async function trackActivity(type, detail = "") {
  const event = { type, detail: String(detail).slice(0, 80), created_at: new Date().toISOString() };
  activity = [event, ...activity].slice(0, 10);
  writeLocal(GUEST_MODE ? "guest_activity" : "activity", activity);
  renderActivity();
  if (GUEST_MODE) return;
  try {
    const { error } = await supabase.from("member_activity").insert({ user_id: currentUser.id, event_type: type, detail: event.detail });
    if (error) throw error;
  } catch (error) {
    console.info("members // activity kept on this device:", error.message);
  }
}
async function loadActivity() {
  let list = readLocal(GUEST_MODE ? "guest_activity" : "activity", []);
  if (GUEST_MODE) {
    activity = list;
    renderActivity();
    return;
  }
  try {
    const { data, error } = await supabase.from("member_activity").select("event_type,detail,created_at").eq("user_id", currentUser.id).order("created_at", { ascending: false }).limit(8);
    if (error) throw error;
    list = data || [];
    writeLocal("activity", list);
  } catch (error) {
    console.info("members // activity table unavailable; using local history:", error.message);
  }
  activity = list;
  renderActivity();
}
function renderActivity() {
  const list = $("#activity-list");
  list.replaceChildren();
  activity.slice(0, 8).forEach(item => {
    const meta = activityLabels[item.event_type] || ["Member activity", "ri-history-line"];
    const row = document.createElement("div");
    row.className = "activity-item";
    const icon = document.createElement("span");
    icon.className = "activity-icon";
    icon.innerHTML = '<i class="' + meta[1] + '"></i>';
    const copy = document.createElement("div");
    copy.className = "activity-copy";
    const title = document.createElement("strong");
    title.textContent = item.detail && item.event_type.startsWith("bookmark") ? meta[0] + " · " + (apps.find(app => app.id === item.detail)?.name || item.detail) : meta[0];
    const subtitle = document.createElement("span");
    subtitle.textContent = "spydr member space";
    copy.append(title, subtitle);
    const time = document.createElement("span");
    time.className = "activity-time";
    time.textContent = relativeTime(item.created_at);
    row.append(icon, copy, time);
    list.appendChild(row);
  });
  $("#activity-empty").hidden = activity.length > 0;
  $("#activity-count").textContent = activity.length + (activity.length === 1 ? " event" : " events");
}

async function loadFriends() {
  friends = [];
  requests = [];
  socialReady = GUEST_MODE;
  if (GUEST_MODE) {
    renderFriends();
    return;
  }
  try {
    const { data: links, error } = await supabase.from("member_friendships").select("friend_id").eq("user_id", currentUser.id);
    if (error) throw error;
    const ids = (links || []).map(row => row.friend_id).filter(Boolean);
    if (ids.length) {
      const { data: profiles, error: profileError } = await supabase.from("member_profiles").select("user_id,display_name,avatar_url,status,bio").in("user_id", ids);
      if (profileError) throw profileError;
      friends = profiles || [];
    }
    const { data: incoming, error: requestError } = await supabase.from("member_friend_requests").select("id,sender_id,created_at").eq("receiver_id", currentUser.id).eq("status", "pending").order("created_at", { ascending: false });
    if (requestError) throw requestError;
    if (incoming?.length) {
      const senderIds = incoming.map(row => row.sender_id);
      const { data: senders, error: senderError } = await supabase.from("member_profiles").select("user_id,display_name,avatar_url").in("user_id", senderIds);
      if (senderError) throw senderError;
      requests = incoming.map(request => ({ ...request, sender: (senders || []).find(sender => sender.user_id === request.sender_id) }));
    }
    socialReady = true;
  } catch (error) {
    console.info("members // social tables unavailable. Apply members/supabase.sql to enable friends:", error.message);
    friends = [];
    requests = [];
  }
  renderFriends();
}
function createFriendRow(person, isRequest = false) {
  const row = document.createElement("div");
  row.className = isRequest ? "request-row" : "friend-row";
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  updateAvatar(avatar, person.display_name, person.avatar_url);
  const copy = document.createElement("div");
  copy.className = isRequest ? "request-copy" : "friend-row-copy";
  const name = document.createElement("strong");
  name.textContent = person.display_name || "Spydr member";
  const status = document.createElement("span");
  status.textContent = isRequest ? "wants to connect" : (person.status || "member");
  copy.append(name, status);
  row.append(avatar, copy);
  const actions = document.createElement("div");
  actions.className = "friend-actions";
  if (isRequest) {
    const accept = document.createElement("button");
    accept.type = "button";
    accept.textContent = "accept";
    accept.addEventListener("click", () => respondFriend(person.request_id, true));
    const decline = document.createElement("button");
    decline.type = "button";
    decline.textContent = "decline";
    decline.addEventListener("click", () => respondFriend(person.request_id, false));
    actions.append(accept, decline);
  } else {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "remove";
    remove.addEventListener("click", () => removeFriend(person.user_id));
    actions.appendChild(remove);
  }
  row.appendChild(actions);
  return row;
}
function renderFriends() {
  const list = $("#friend-list");
  const mini = $("#friends-mini-list");
  const requestList = $("#request-list");
  list.replaceChildren();
  mini.replaceChildren();
  requestList.replaceChildren();
  friends.forEach(person => {
    list.appendChild(createFriendRow(person));
    const item = document.createElement("div");
    item.className = "mini-friend";
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    updateAvatar(avatar, person.display_name, person.avatar_url);
    const label = document.createElement("span");
    label.textContent = person.display_name || "Spydr member";
    const status = document.createElement("small");
    status.textContent = person.status || "member";
    item.append(avatar, label, status);
    mini.appendChild(item);
  });
  requests.forEach(request => {
    const sender = request.sender || { display_name: "Spydr member", avatar_url: "" };
    requestList.appendChild(createFriendRow({ ...sender, request_id: request.id }, true));
  });
  $("#friends-empty").hidden = friends.length > 0 || !socialReady;
  $("#friends-mini-empty").hidden = friends.length > 0 || !socialReady;
  $("#requests-empty").hidden = requests.length > 0 || !socialReady;
  $("#social-setup-note").hidden = socialReady;
  $("#metric-friends").textContent = friends.length;
  $("#friends-count-label").textContent = friends.length + (friends.length === 1 ? " member" : " members");
  $("#requests-count-label").textContent = requests.length + (requests.length === 1 ? " request" : " requests");
  $("#request-count").textContent = requests.length;
  $("#request-count").hidden = requests.length === 0;
}
async function sendFriendRequest(targetId) {
  if (!isValidUUID(targetId)) {
    showToast("That member ID doesn't look valid.", "error");
    return;
  }
  if (targetId.toLowerCase() === currentUser.id.toLowerCase()) {
    showToast("You can't add your own account.", "error");
    return;
  }
  if (GUEST_MODE) return showToast("Friend connections need a signed-in member account.", "error");
  const { data, error } = await supabase.rpc("member_send_friend_request", { target_id: targetId });
  if (error) {
    showToast("Friend requests need the member database setup. Check /members/supabase.sql.", "error");
    console.error("members // friend request failed:", error);
    return;
  }
  showToast(data === "accepted" ? "You're now connected." : data === "friends" ? "You're already connected." : "Friend request sent.", "success");
  trackActivity("friend_request_sent", targetId);
  await loadFriends();
}
async function respondFriend(requestId, accept) {
  const { error } = await supabase.rpc("member_respond_friend_request", { request_id: requestId, accept });
  if (error) {
    showToast("Couldn't update that request. Check the member SQL setup.", "error");
    return;
  }
  showToast(accept ? "Friend request accepted." : "Request declined.", "success");
  if (accept) trackActivity("friend_request_accepted", "");
  await loadFriends();
}
async function removeFriend(friendId) {
  if (!isValidUUID(friendId)) return;
  const { error } = await supabase.rpc("member_remove_friend", { target_id: friendId });
  if (error) {
    showToast("Couldn't remove that connection.", "error");
    return;
  }
  showToast("Friend removed.", "success");
  await loadFriends();
}
async function makeInviteLink() {
  const url = new URL("/members/", location.origin);
  url.searchParams.set("invite", currentUser.id);
  $("#invite-link").value = url.href;
  return url.href;
}
async function copyText(value, success = "Copied.") {
  try {
    await navigator.clipboard.writeText(value);
    showToast(success, "success");
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    showToast(copied ? success : "Copy failed. Select the text and copy it.", copied ? "success" : "error");
  }
}
async function shareInvite() {
  const url = await makeInviteLink();
  if (navigator.share) {
    try { await navigator.share({ title: "Join me on Spydr", text: "Add me on Spydr Members.", url }); }
    catch (error) { if (error.name !== "AbortError") copyText(url, "Invite link copied."); }
  } else copyText(url, "Invite link copied.");
}

async function saveProfile(event) {
  event.preventDefault();
  const displayName = $("#profile-name").value.trim();
  const avatarUrlRaw = $("#profile-avatar-url").value.trim();
  const avatarUrl = safeAvatarUrl(avatarUrlRaw);
  const bio = $("#profile-bio").value.trim().slice(0, 180);
  const status = $("#profile-status").value;
  const accent = safeAccent($("#profile-accent").value);
  if (!displayName) return showToast("Add a display name first.", "error");
  if (avatarUrlRaw && !avatarUrl) return showToast("Avatar links must use HTTPS.", "error");
  const saveState = $("#profile-save-state");
  saveState.textContent = "saving...";
  const metadata = { display_name: displayName, avatar_url: avatarUrl, bio, status, accent, preferences: profile?.preferences || {} };
  if (GUEST_MODE) {
    profile = { ...profile, ...metadata };
    writeLocal("guest_profile", profile);
    hydrateProfileUI();
    applyPreferences();
    setGreeting();
    saveState.textContent = "saved in this browser only.";
    showToast("Guest profile saved on this device.", "success");
    return;
  }
  const { data, error } = await supabase.auth.updateUser({ data: metadata });
  if (error) {
    saveState.textContent = "couldn't save";
    showToast(error.message, "error");
    return;
  }
  currentUser = data.user || currentUser;
  profile = { ...profile, ...metadata };
  try {
    const { error: profileError } = await supabase.from("member_profiles").upsert({ user_id: currentUser.id, display_name: displayName, avatar_url: avatarUrl || null, bio, status, accent, updated_at: new Date().toISOString() });
    if (profileError) throw profileError;
  } catch (error) {
    console.info("members // profile saved to auth metadata; profile table unavailable:", error.message);
  }
  hydrateProfileUI();
  applyPreferences();
  setGreeting();
  saveState.textContent = "saved to your account.";
  trackActivity("profile_updated", "");
  showToast("Profile updated.", "success");
}
async function savePreferences() {
  const preferences = {
    compact: $("#compact-toggle").checked,
    reduceMotion: $("#motion-toggle").checked,
    accent: safeAccent($("#settings-accent").value)
  };
  if (GUEST_MODE) {
    profile = { ...profile, preferences, accent: preferences.accent };
    writeLocal("guest_profile", profile);
    writeLocal("preferences", preferences);
    applyPreferences();
    $("#profile-accent").value = preferences.accent;
    showToast("Preferences saved in this browser.", "success");
    return;
  }
  const { data, error } = await supabase.auth.updateUser({ data: { preferences, accent: preferences.accent } });
  if (error) return showToast(error.message, "error");
  currentUser = data.user || currentUser;
  profile = { ...profile, preferences, accent: preferences.accent };
  writeLocal("preferences", preferences);
  applyPreferences();
  $("#profile-accent").value = preferences.accent;
  showToast("Preferences saved.", "success");
}
async function resetPassword() {
  if (GUEST_MODE) return showToast("Password reset is unavailable in guest mode.", "error");
  const email = currentUser.email;
  if (!email) return showToast("No account email is available.", "error");
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: new URL("/members/", location.origin).href });
  showToast(error ? error.message : "Password reset email sent.", error ? "error" : "success");
}

function showTour() {
  const key = localKey("tour_" + currentUser.id);
  if (localStorage.getItem(key)) return;
  $("#member-overlay").hidden = false;
}
function closeTour() {
  localStorage.setItem(localKey("tour_" + currentUser.id), "1");
  $("#member-overlay").hidden = true;
}
async function loadDashboard() {
  await loadCatalog();
  await loadProfile();
  await Promise.all([loadBookmarks(), loadActivity(), loadFriends()]);
  setGreeting();
  await makeInviteLink();
  renderApps();
  if (inviteTarget && inviteTarget !== currentUser.id && isValidUUID(inviteTarget)) {
    $("#invite-banner").hidden = false;
  }
  showTour();
}
async function enterAccount(user) {
  if (!user) return;
  if (currentUser?.id === user.id && !$("#member-app").hidden) return;
  currentUser = user;
  showDashboard();
  await loadDashboard();
  if (!readLocal("signed_in_" + user.id, false)) {
    writeLocal("signed_in_" + user.id, true);
    trackActivity("signed_in", "");
  }
}
async function leaveAccount() {
  if (GUEST_MODE) return showToast("You are browsing as a guest.", "success");
  currentUser = null;
  profile = null;
  bookmarks = [];
  friends = [];
  requests = [];
  $("#member-overlay").hidden = true;
  $("#invite-banner").hidden = true;
  const { error } = await supabase.auth.signOut();
  if (error) showToast(error.message, "error");
  showGate();
}

function bindEvents() {
  $$(".auth-tab").forEach(button => button.addEventListener("click", () => setAuthMode(button.dataset.authMode)));
  let authRequestPending = false;
  let authCooldownUntil = 0;

  $("#auth-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (authRequestPending) return;

    const now = Date.now();
    if (now < authCooldownUntil) {
      const seconds = Math.ceil((authCooldownUntil - now) / 1000);
      setAuthMessage(`Too many account requests. Wait ${seconds}s before trying again.`, true);
      return;
    }

    const mode = $(".auth-tab.active")?.dataset.authMode || "signin";
    const email = $("#auth-email").value.trim();
    const password = $("#auth-password").value;
    const displayName = $("#auth-display-name").value.trim();

    authRequestPending = true;
    $("#auth-submit").disabled = true;
    setAuthMessage(mode === "signup" ? "creating your account..." : "signing in...");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName || email.split("@")[0] } }
        });
        if (error) throw error;
        if (data.session) await enterAccount(data.user);
        else setAuthMessage("Account created. Check your email to confirm your account before signing in.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await enterAccount(data.user);
      }
    } catch (error) {
      const status = Number(error.status || error.statusCode || 0);
      const message = String(error.message || "");
      if (status === 429 || /rate.?limit|too many requests/i.test(message)) {
        authCooldownUntil = Date.now() + 30000;
        setAuthMessage("Supabase is temporarily rate-limiting account requests. Wait a minute, then try once. If it keeps happening, check Supabase Auth rate limits and email provider settings.", true);
      } else {
        setAuthMessage(message || "Couldn't complete that request. Please try again.", true);
      }
      console.error("members // authentication request failed:", error);
    } finally {
      authRequestPending = false;
      $("#auth-submit").disabled = false;
    }
  });
  $("#forgot-password").addEventListener("click", async () => {
    const email = $("#auth-email").value.trim();
    if (!email) return setAuthMessage("Enter your email first so we know where to send the reset link.", true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: new URL("/members/", location.origin).href });
    setAuthMessage(error ? error.message : "Password reset email sent. Check your inbox.");
  });
  $("#recovery-form").addEventListener("submit", async event => {
    event.preventDefault();
    const password = $("#recovery-password").value;
    if (password.length < 8) return setAuthMessage("Use at least 8 characters for the new password.", true);
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) return setAuthMessage(error.message, true);
    $("#recovery-form").hidden = true;
    $("#auth-form").hidden = false;
    setAuthMode("signin");
    if (data.user) await enterAccount(data.user);
    else setAuthMessage("Password updated. Sign in with your new password.");
  });
  $("#profile-form").addEventListener("submit", saveProfile);
  $("#profile-bio").addEventListener("input", () => $("#bio-length").textContent = $("#profile-bio").value.length + " / 180");
  $("#profile-name").addEventListener("input", () => $("#editor-preview-name").textContent = $("#profile-name").value || "Member");
  $("#profile-status").addEventListener("change", () => $("#editor-preview-status").textContent = $("#profile-status").value);
  $("#profile-accent").addEventListener("input", event => applyAccent(event.target.value));
  $("#app-search").addEventListener("input", renderApps);
  $("#app-filters").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    $$(".filter-pill").forEach(pill => pill.classList.toggle("active", pill === button));
    renderApps();
  });
  $("#friend-add-form").addEventListener("submit", async event => {
    event.preventDefault();
    const field = $("#friend-id-input");
    await sendFriendRequest(field.value.trim());
    field.value = "";
  });
  $("#copy-invite").addEventListener("click", shareInvite);
  $("#copy-invite-inline").addEventListener("click", () => copyText($("#invite-link").value, "Invite link copied."));
  $("#copy-member-id").addEventListener("click", () => copyText(currentUser.id, "Member ID copied."));
  $("#copy-profile-id").addEventListener("click", () => copyText(currentUser.id, "Member ID copied."));
  $("#invite-link").addEventListener("focus", event => event.target.select());
  $("#accept-invite").addEventListener("click", async () => {
    await sendFriendRequest(inviteTarget);
    $("#invite-banner").hidden = true;
  });
  $("#dismiss-invite").addEventListener("click", () => $("#invite-banner").hidden = true);
  $("#account-menu-button").addEventListener("click", () => $("#account-menu").hidden = !$("#account-menu").hidden);
  $("#sign-out").addEventListener("click", leaveAccount);
  $("#settings-signout").addEventListener("click", leaveAccount);
  $("#save-settings").addEventListener("click", savePreferences);
  $("#settings-accent").addEventListener("input", event => applyAccent(event.target.value));
  $("#send-reset").addEventListener("click", resetPassword);
  $("#tour-close").addEventListener("click", closeTour);
  $("#tour-start").addEventListener("click", closeTour);
  $("#member-overlay").addEventListener("click", event => { if (event.target.id === "member-overlay") closeTour(); });
}

async function init() {
  navigate = mountMemberNavigation();
  bindEvents();
  inviteTarget = new URLSearchParams(location.search).get("invite") || "";
  updateClock();
  window.setInterval(updateClock, 30000);
  currentUser = {
    id: "public-guest",
    email: "",
    created_at: new Date().toISOString(),
    user_metadata: { display_name: readLocal("guest_profile", {}).display_name || "Guest" }
  };
  $("#auth-gate").hidden = true;
  $("#member-app").hidden = false;
  document.body.classList.add("member-guest-mode");
  $(".account-control-row").forEach(row => {
    if (row.querySelector("#settings-signout")) row.hidden = true;
  });
  $("#sign-out").hidden = true;
  $("#account-menu-button").hidden = true;
  const guestNote = document.createElement("div");
  guestNote.className = "guest-mode-note";
  guestNote.innerHTML = '<i class="ri-eye-line"></i><span>public guest preview <small>Changes are saved only in this browser.</small></span>';
  $(".member-content").prepend(guestNote);
  await loadDashboard();
  $("#js-warning")?.remove();
}
document.addEventListener("DOMContentLoaded", init);
