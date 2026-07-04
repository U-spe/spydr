const menu = document.getElementById("global-menu");

if (menu) {

    menu.innerHTML = `
        <div class="menu-wrapper">

            <button id="menu-btn" type="button" aria-label="Open Menu">
                <i class="ri-menu-line"></i>
            </button>

            <nav id="menu">

                <button onclick="go('/')">
                    <i class="ri-home-5-line"></i>
                    <span>Home</span>
                </button>

                <button onclick="go('lessons.html')">
                    <i class="ri-gamepad-line"></i>
                    <span>Games</span>
                </button>

                <button onclick="go('flashcards.html')">
                    <i class="ri-apps-line"></i>
                    <span>Apps</span>
                </button>

                <button onclick="go('search.html')">
                    <i class="ri-global-line"></i>
                    <span>Browser</span>
                </button>

                <button onclick="go('study.html')">
                    <i class="ri-robot-2-line"></i>
                    <span>AI Chat</span>
                </button>

                <button onclick="go('review.html')">
                    <i class="ri-chat-1-line"></i>
                    <span>Chatroom</span>
                </button>

                <button onclick="go('settings.html')">
                    <i class="ri-settings-3-line"></i>
                    <span>Settings</span>
                </button>

            </nav>

        </div>
    `;

}const menu = document.getElementById("global-menu");

menu.innerHTML = `
<div class="menu-wrapper">

    <button id="menu-btn">
        <i class="ri-menu-line"></i>
    </button>

    <div id="menu">

<button onclick="go('/')">
            <i class="ri-home-5-line"></i>
            home
        </button>

        <button onclick="go('lessons.html')">
            <i class="ri-gamepad-line"></i>
            games
        </button>

        <button onclick="go('flashcards.html')">
            <i class="ri-apps-line"></i>
            apps
        </button>

        <button onclick="go('search.html')">
            <i class="ri-global-line"></i>
            browser
        </button>

        <button onclick="go('study.html')">
            <i class="ri-robot-2-line"></i>
            ai chat
        </button>

        <button onclick="go('review.html')">
            <i class="ri-chat-1-line"></i>
            chatroom
        </button>

        <button onclick="go('settings.html')">
            <i class="ri-settings-3-line"></i>
            settings
        </button>

    </div>

</div>
`;
