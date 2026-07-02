const menu = document.getElementById("global-menu");

menu.innerHTML = `
<div class="menu-wrapper">

    <button id="menu-btn">
        <i class="ri-menu-line"></i>
    </button>

    <div id="menu">

        <button onclick="go('lessons.html')">
            <i class="ri-gamepad-line"></i>
            lessons
        </button>

        <button onclick="go('applications.html')">
            <i class="ri-apps-line"></i>
            applications
        </button>

        <button onclick="go('search.html')">
            <i class="ri-global-line"></i>
            search
        </button>

        <button onclick="go('audios.html')">
            <i class="ri-headphone-line"></i>
            audios
        </button>

        <button onclick="go('chat.html')">
            <i class="ri-robot-2-line"></i>
            ai
        </button>

        <button onclick="go('settings.html')">
            <i class="ri-settings-3-line"></i>
            settings
        </button>

    </div>

</div>
`;
