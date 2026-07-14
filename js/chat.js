import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bxsiniqhswmiokqshcgi.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd"; 
const supabase = createClient(supabaseUrl, supabaseKey);

let currentUser = null;
let isGuest = false;

const messagesContainer = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const topRightName = document.getElementById("top-right-name");

// --- INITIALIZE CHAT ---
async function initChat() {
    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        currentUser = user;
        isGuest = false;
        topRightName.innerText = user.email.split('@')[0];
    } else {
        // 2. Generate a Guest profile if not logged in
        const guestId = Math.floor(Math.random() * 9000) + 1000;
        currentUser = { email: `Guest_${guestId}@guest.com` };
        isGuest = true;
        topRightName.innerText = `Guest_${guestId}`;
    }

    // Unlock chat for everyone
    messageInput.disabled = false;
    sendBtn.disabled = false;
    messageInput.placeholder = `Message #global as ${currentUser.email.split('@')[0]}...`;

    // 3. Fetch initial messages
    await loadMessages();

    // 4. Subscribe to live updates
    subscribeToMessages();
}

// --- LOGIC GATE: CREATE PRIVATE CHAT ---
document.getElementById('create-dm-btn').addEventListener('click', () => {
    if (isGuest) {
        alert("You must be logged in to spydr net to create private chatrooms.");
    } else {
        const roomName = prompt("Enter private room name:");
        if (roomName) {
            alert(`Ready to create room: ${roomName}. Backend logic pending.`);
            // Future logic to insert new room into a channels database table goes here
        }
    }
});

// --- LOAD HISTORY ---
async function loadMessages() {
    const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50);

    if (error) {
        console.error("Error loading messages:", error);
        return;
    }

    messagesContainer.innerHTML = ''; // Clear container
    messages.forEach(msg => appendMessageUI(msg));
    scrollToBottom();
}

// --- REALTIME SUBSCRIPTION ---
function subscribeToMessages() {
    supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            appendMessageUI(payload.new);
            scrollToBottom();
        })
        .subscribe();
}

// --- SEND MESSAGE ---
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const content = messageInput.value.trim();
    if (!content) return;

    // Clear input immediately for UX
    messageInput.value = '';

    // Insert into Supabase (Works for guests as long as RLS policy is updated!)
    const { error } = await supabase
        .from('messages')
        .insert([{ 
            user_email: currentUser.email, 
            content: content 
        }]);

    if (error) {
        console.error("Error sending message:", error);
        alert("Database error: Could not send message.");
    }
});

// --- UI HELPER: APPEND MESSAGE ---
function appendMessageUI(msg) {
    const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const username = msg.user_email.split('@')[0]; 

    const msgDiv = document.createElement("div");
    msgDiv.className = "msg";
    
    msgDiv.innerHTML = `
        <div class="msg-pfp"></div>
        <div class="msg-content">
            <div class="msg-header">
                <span class="msg-user">${username}</span>
                <span class="msg-time">${time}</span>
            </div>
            <div class="msg-text">${msg.content}</div>
        </div>
    `;

    messagesContainer.appendChild(msgDiv);
}

// --- UI HELPER: SCROLL TO BOTTOM ---
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Boot the chat script
window.addEventListener("DOMContentLoaded", initChat);
