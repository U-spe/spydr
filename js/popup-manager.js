/* =========================
   SPYDR WEEKLY POPUP MANAGER
   Three popup views per user, per local calendar week.
========================= */

(() => {
    "use strict";

    const POPUPS = [
        "/assets/static/popup.html",
        "/assets/static/popup2.html",
        "/assets/static/popup3.html"
    ];

    const SUPABASE_STORAGE_KEY = "sb-bxsiniqhswmiokqshcgi-auth-token";
    const GUEST_ID_KEY = "spydr-popup-guest-id";
    const STORAGE_PREFIX = "spydr-popup-weekly:";

    function getWeekKey() {
        const now = new Date();
        const monday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const day = monday.getDay();
        monday.setDate(monday.getDate() - ((day + 6) % 7));

        const year = monday.getFullYear();
        const month = String(monday.getMonth() + 1).padStart(2, "0");
        const date = String(monday.getDate()).padStart(2, "0");

        return `${year}-${month}-${date}`;
    }

    function getUserId() {
        // Supabase stores the authenticated session in this browser key.
        try {
            const rawSession = localStorage.getItem(SUPABASE_STORAGE_KEY);

            if (rawSession) {
                const session = JSON.parse(rawSession);
                const userId = session?.user?.id || session?.currentSession?.user?.id;

                if (userId) return `user-${userId}`;
            }
        } catch (error) {
            console.warn("Spydr: Could not read the signed-in popup identity.", error);
        }

        // Guests receive a stable browser-specific identity.
        let guestId = localStorage.getItem(GUEST_ID_KEY);

        if (!guestId) {
            guestId = typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;

            localStorage.setItem(GUEST_ID_KEY, guestId);
        }

        return `guest-${guestId}`;
    }

    function getWeeklyState(userId) {
        const key = STORAGE_PREFIX + userId;
        const week = getWeekKey();

        try {
            const saved = JSON.parse(localStorage.getItem(key) || "null");

            if (saved && saved.week === week && Number.isInteger(saved.count)) {
                return { key, week, count: Math.max(0, Math.min(3, saved.count)) };
            }
        } catch (error) {
            console.warn("Spydr: Resetting invalid popup history.", error);
        }

        return { key, week, count: 0 };
    }

    function loadScript(src) {
        if (window.SpydrPopup) return Promise.resolve();

        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.body.appendChild(script);
        });
    }

    async function launch() {
        try {
            const userId = getUserId();
            const state = getWeeklyState(userId);

            // The user has already seen all three popups this week.
            if (state.count >= POPUPS.length) return false;

            const popupPath = POPUPS[state.count];
            const response = await fetch(popupPath, { cache: "no-cache" });

            if (!response.ok) {
                throw new Error(`Popup request failed: ${response.status}`);
            }

            const html = await response.text();
            const container = document.createElement("div");
            container.id = "spydr-popup-container";
            container.innerHTML = html;
            document.body.appendChild(container);

            await loadScript("/js/disc.js");

            if (!window.SpydrPopup) {
                throw new Error("Popup dismissal controller did not initialize.");
            }

            // Count only successfully loaded popups.
            localStorage.setItem(state.key, JSON.stringify({
                week: state.week,
                count: state.count + 1
            }));

            window.SpydrPopup.init();
            window.SpydrPopup.show();

            return true;
        } catch (error) {
            console.error("Spydr: Could not launch weekly popup.", error);
            return false;
        }
    }

    window.SpydrPopupManager = { launch };
})();
