import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://ydkksqnpghypxypqsrmt.supabase.co";
const supabaseKey = "sb_publishable__bIbuiCi98BVTTulMroPPw_wEg2XkTt";
const supabase = createClient(supabaseUrl, supabaseKey);

let currentUser = null;
const messagesContainer = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// --- INITIALIZE CHAT ---
async function initChat() {
    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    currentUser = user;

    if (currentUser) {
        messageInput.disabled = false;
        sendBtn.disabled = false;
    } else {
        messageInput.placeholder = "You must be logged in to chat...";
    }

    // 2. Fetch initial messages
    await loadMessages();

    // 3. Subscribe to live updates
    subscribeToMessages();
}

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

    // Insert into Supabase
    const { error } = await supabase
        .from('messages')
        .insert([{ 
            user_email: currentUser.email, 
            content: content 
        }]);

    if (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
    }
});

// --- UI HELPER: APPEND MESSAGE ---
function appendMessageUI(msg) {
    const time = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const username = msg.user_email.split('@')[0]; // Simple username generation

    const msgDiv = document.createElement("div");
    msgDiv.className = "msg";
    
    // Using a gradient string based on the username to give unique pfp colors (optional enhancement)
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
