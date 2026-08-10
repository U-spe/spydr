import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bxsiniqhswmiokqshcgi.supabase.co";
const supabaseKey = "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd"; 
const supabase = createClient(supabaseUrl, supabaseKey);

let currentUser = null;
let isGuest = false;
let currentChannel = "global"; // State machine to hold current active channel
let realtimeSubscription = null; // Hold reference to tear-down old channel listeners

// UI Room Metadata
const channelDescriptions = {
    "global": "Welcome to the main spydr network.",
    "dev-logs": "Follow the development updates and system deployments.",
    "off-topic": "Unwind, post memes, and hang out."
};

const messagesContainer = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

const chatTitle = document.getElementById("chat-title");
const chatDesc = document.getElementById("chat-desc");
const channelElements = document.querySelectorAll(".channel");

// --- INITIALIZE CHAT ---
async function initChat() {
    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        currentUser = user;
        isGuest = false;
    } else {
        // 2. Generate a Guest profile if not logged in
        const guestId = Math.floor(Math.random() * 9000) + 1000;
        currentUser = { email: `Guest_${guestId}@guest.com` };
        isGuest = true;
    }

    // Unlock input elements safely
    if (messageInput) messageInput.disabled = false;
    if (sendBtn) sendBtn.disabled = false;

    // Set Up Channel Switch Action Listeners
    setupChannelClickListeners();

    // 3. Perform initial load sequence
    await switchChannel("global");
}

// --- SETUP SIDEBAR CLICK EVENT LISTENERS ---
function setupChannelClickListeners() {
    if (!channelElements) return;
    channelElements.forEach(element => {
        element.addEventListener("click", () => {
            const selectedRoom = element.getAttribute("data-channel");
            if (!selectedRoom || selectedRoom === currentChannel) return;

            // Switch layout classes
            document.querySelector(".channel.active")?.classList.remove("active");
            element.classList.add("active");

            // Execute programmatic swap
            switchChannel(selectedRoom); //SIX SEVEN!!! (mb gng)
        });
    });
}

// --- CORE SWITCH LOGIC ---
async function switchChannel(targetChannel) {
    currentChannel = targetChannel;

    // Get a clean display name for the input placeholder
    const displayName = currentUser && currentUser.email ? currentUser.email.split('@')[0] : "Guest";

    // 1. Update Room Headers and Description
    if (chatTitle) chatTitle.innerHTML = `<i class="ri-hashtag"></i> ${currentChannel}`;
    if (chatDesc) chatDesc.innerText = channelDescriptions[currentChannel] || "Secure terminal network.";
    if (messageInput) messageInput.placeholder = `Message #${currentChannel} as ${displayName}...`;

    // 2. Clear out older chat UI contents
    if (messagesContainer) messagesContainer.innerHTML = '';

    // 3. Load past context
    await loadMessages();

    // 4. Recycle websocket channels
    subscribeToMessages();
}

// --- LOGIC GATE: CREATE PRIVATE CHAT ---
const createDmBtn = document.getElementById('create-dm-btn');
if (createDmBtn) {
    createDmBtn.addEventListener('click', () => {
        if (isGuest) {
            alert("You must be logged in to spydr net to create private chatrooms.");
        } else {
            const roomName = prompt("Enter private room name:");
            if (roomName) {
                alert(`Ready to create room: ${roomName}. Backend logic pending.`);
            }
        }
    });
}

// --- LOAD HISTORY (Filtered by Channel) ---
async function loadMessages() {
    const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel', currentChannel) // Filter by active room context
        .order('created_at', { ascending: true })
        .limit(50);

    if (error) {
        console.error("Error loading messages:", error);
        return;
    }

    if (messagesContainer) {
        messagesContainer.innerHTML = ''; // Double safety clean
        messages.forEach(msg => appendMessageUI(msg));
        scrollToBottom();
    }
}

// --- REALTIME SUBSCRIPTION (Recyclable) ---
function subscribeToMessages() {
    // Clean up old socket connection to avoid duplicate deliveries and memory leaks
    if (realtimeSubscription) {
        supabase.removeChannel(realtimeSubscription);
    }

    realtimeSubscription = supabase
        .channel(`public:messages:${currentChannel}`)
        .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `channel=eq.${currentChannel}` // Server side filter: only stream events matching room
        }, payload => {
            appendMessageUI(payload.new);
            scrollToBottom();
        })
        .subscribe();
}

// --- SEND MESSAGE (Includes Room Target) ---
if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const content = messageInput.value.trim();
        if (!content) return;

        // Clear UI layout input immediately
        messageInput.value = '';

        // Insert to database with current room parameter
        const { error } = await supabase
            .from('messages')
            .insert([{ 
                user_email: currentUser.email, 
                content: content,
                channel: currentChannel // Insert context room
            }]);

        if (error) {
            console.error("Error sending message:", error);
            alert("Database error: Could not send message.");
        }
    });
}

// --- HTML ESCAPE HELPER (Prevents XSS attacks in chat) ---
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// --- UI HELPER: APPEND MESSAGE ---
function appendMessageUI(msg) {
    if (!messagesContainer) return;
    const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const username = msg.user_email ? msg.user_email.split('@')[0] : "System"; 

    const msgDiv = document.createElement("div");
    msgDiv.className = "msg";
    
    msgDiv.innerHTML = `
        <div class="msg-pfp"></div>
        <div class="msg-content">
            <div class="msg-header">
                <span class="msg-user">${username}</span>
                <span class="msg-time">${time}</span>
            </div>
            <div class="msg-text">${escapeHTML(msg.content)}</div>
        </div>
    `;

    messagesContainer.appendChild(msgDiv);
}

// --- UI HELPER: SCROLL TO BOTTOM ---
function scrollToBottom() {
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Boot the chat script safely
window.addEventListener("DOMContentLoaded", initChat);
