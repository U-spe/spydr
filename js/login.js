import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bxsiniqhswmiokqshcgi.supabase.co"; // close your eyes, hold em there for a min, dont be shy
const supabaseKey = "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd";
const supabase = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const authForm = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-msg");

const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const guestBtn = document.getElementById("guest-btn");

let isLoginMode = true;

// Tab Switching Logic
tabLogin.addEventListener("click", () => {
    isLoginMode = true;
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    submitBtn.innerText = "Initialize Connection";
    errorMsg.innerText = "";
});

tabSignup.addEventListener("click", () => {
    isLoginMode = false;
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    submitBtn.innerText = "Register Agent";
    errorMsg.innerText = "";
});

// Handle Form Submission
authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;
    errorMsg.innerText = "";

    if (isLoginMode) {
        // --- LOGIN ---
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            handleError(error.message);
        } else {
            window.location.href = "/"; // Navigate back to main chat
        }
    } else {
        // --- SIGN UP ---
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            handleError(error.message);
        } else {
            window.location.href = "/"; // Navigate back to main chat
        }
    }
});

// Handle Guest Button
guestBtn.addEventListener("click", () => {
    // Just clear out any existing real session and go back
    supabase.auth.signOut().then(() => {
        window.location.href = "/";
    });
});

// Helper for UI errors
function handleError(msg) {
    errorMsg.innerText = msg;
    submitBtn.disabled = false;
    submitBtn.innerText = isLoginMode ? "Initialize Connection" : "Register Agent";
}
