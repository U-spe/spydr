/*
 * SNEK / SPYDR
 * LuminSDK game loader
 *
 * Lumin provides:
 *   - game catalog
 *   - game IDs
 *   - game thumbnails
 *   - game launch URLs
 *
 * This file controls:
 *   - cards
 *   - searching
 *   - thumbnails
 *   - game launching
 */

(() => {
    "use strict";

    const SECTION_ID = "luminsdk";
    const PAGE_LIMIT = 100;
    const MAX_PAGES = 10;

    const FALLBACK_IMAGE = "/assets/gameassets/lumin-fallback.png";

    let luminReady = false;
    let luminGames = [];

    /*
     * ----------------------------------------
     * LUMIN INITIALIZATION
     * ----------------------------------------
     */

    async function initLumin() {
        if (luminReady) return true;

        if (!window.Lumin) {
            console.error("[Lumin] lumin.min.js was not loaded.");
            return false;
        }

        try {
            await window.Lumin.init({
                headless: true,

                onReady() {
                    console.log("[Lumin] SDK ready");
                },

                onError(error) {
                    console.error("[Lumin] SDK error:", error);
                }
            });

            luminReady = true;
            return true;
        } catch (error) {
            console.error("[Lumin] initialization failed:", error);
            return false;
        }
    }

    /*
     * ----------------------------------------
     * STATUS
     * ----------------------------------------
     */

    function setStatus(message) {
        const status = document.getElementById("luminsdk-status");

        if (status) {
            status.textContent = message;
        }
    }

    /*
     * ----------------------------------------
     * LOAD GAME CATALOG
     * ----------------------------------------
     */

    async function loadLuminGames() {
        const ready = await initLumin();

        if (!ready) {
            setStatus("LuminSDK failed to initialize.");
            return;
        }

        setStatus("Loading games...");

        try {
            const allGames = [];

            for (let page = 1; page <= MAX_PAGES; page++) {
                const result = await Promise.race([
                    window.Lumin.getGames({
                        page,
                        limit: PAGE_LIMIT
                    }),

                    new Promise((_, reject) => {
                        setTimeout(() => {
                            reject(new Error("Lumin request timed out."));
                        }, 25000);
                    })
                ]);

                const games =
                    (result && result.games) ||
                    (Array.isArray(result) ? result : []);

                if (!games.length) {
                    break;
                }

                allGames.push(...games);

                const totalPages =
                    Number(result?.pages) ||
                    page;

                setStatus(`Loading games... ${allGames.length}`);

                if (page >= totalPages) {
                    break;
                }
            }

            if (!allGames.length) {
                setStatus("No Lumin games were returned.");
                return;
            }

            /*
             * Resolve thumbnails.
             */

            const resolvedGames = await Promise.all(
                allGames.map(async (game) => {
                    let cover = game.cover || FALLBACK_IMAGE;

                    try {
                        if (
                            game.image_token &&
                            typeof window.Lumin.getImageUrl === "function"
                        ) {
                            const imageUrl =
                                await window.Lumin.getImageUrl(
                                    game.image_token
                                );

                            if (imageUrl) {
                                cover = imageUrl;
                            }
                        }
                    } catch {
                        // Keep fallback/cover.
                    }

                    return {
                        id: game.id,
                        title:
                            game.name ||
                            game.title ||
                            "Unknown Game",
                        cover
                    };
                })
            );

            luminGames = resolvedGames.filter(
                game => game.id && game.title
            );

            console.log(
                `[Lumin] Loaded ${luminGames.length} games`
            );

            renderLuminGames();

        } catch (error) {
            console.error(
                "[Lumin] Failed to load games:",
                error
            );

            setStatus(
                `LuminSDK failed: ${error.message || error}`
            );
        }
    }

    /*
     * ----------------------------------------
     * CREATE OUR GAME CARD
     * ----------------------------------------
     */

    function createGameCard(game) {
        const card = document.createElement("a");

        card.className = "card";
        card.href = "#";

        card.dataset.title =
            game.title.toLowerCase();

        card.dataset.bg =
            game.cover || FALLBACK_IMAGE;

        /*
         * This is OUR card structure.
         * Nothing from Xylora's card system is required.
         */

        card.innerHTML = `
            <div class="card-img"></div>

            <div class="card-foot">
                <span></span>
            </div>
        `;

        const title =
            card.querySelector(".card-foot span");

        title.textContent = game.title;

        const image =
            card.querySelector(".card-img");

        image.style.setProperty(
            "--thumb",
            "none"
        );

        card.addEventListener("click", event => {
            event.preventDefault();
            launchLuminGame(game);
        });

        return card;
    }

    /*
     * ----------------------------------------
     * THUMBNAIL LAZY LOADING
     * ----------------------------------------
     */

    const imageObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const card = entry.target;

                const image =
                    card.querySelector(".card-img");

                const background =
                    card.dataset.bg;

                if (!image || !background) {
                    imageObserver.unobserve(card);
                    return;
                }

                const img =
                    new Image();

                img.decoding = "async";

                img.onload = () => {
                    image.style.setProperty(
                        "--thumb",
                        `url("${background}")`
                    );
                };

                img.onerror = () => {
                    image.style.setProperty(
                        "--thumb",
                        `url("${FALLBACK_IMAGE}")`
                    );
                };

                img.src = background;

                imageObserver.unobserve(card);
            });

        }, {
            rootMargin: "600px 0px"
        });

    /*
     * ----------------------------------------
     * RENDER
     * ----------------------------------------
     */

    function renderLuminGames() {
        const section =
            document.getElementById(SECTION_ID);

        if (!section) {
            console.error(
                `[Lumin] #${SECTION_ID} was not found.`
            );

            return;
        }

        const status =
            document.getElementById(
                "luminsdk-status"
            );

        if (status) {
            status.remove();
        }

        /*
         * Remove only cards created by this loader.
         */

        section
            .querySelectorAll(".card")
            .forEach(card => {
                card.remove();
            });

        const empty =
            section.querySelector(".empty");

        const fragment =
            document.createDocumentFragment();

        luminGames.forEach(game => {

            const card =
                createGameCard(game);

            fragment.appendChild(card);

            imageObserver.observe(card);
        });

        if (empty) {
            section.insertBefore(
                fragment,
                empty
            );
        } else {
            section.appendChild(fragment);
        }

        /*
         * Tell the existing search/filter system
         * to update if it exists.
         */

        if (
            typeof window.update === "function"
        ) {
            window.update();
        }
    }

    /*
     * ----------------------------------------
     * RESOLVE GAME URL
     * ----------------------------------------
     */

    async function resolveGameUrl(gameId) {
        const ready = await initLumin();

        if (!ready) {
            return null;
        }

        /*
         * Preferred method.
         */

        try {
            if (
                typeof window.Lumin.getGameUrl ===
                "function"
            ) {
                const result =
                    await window.Lumin.getGameUrl(
                        gameId
                    );

                if (typeof result === "string") {
                    return result;
                }

                if (result?.url) {
                    return result.url;
                }
            }
        } catch (error) {
            console.warn(
                "[Lumin] getGameUrl failed:",
                error
            );
        }

        /*
         * Fallback method.
         */

        try {
            if (
                typeof window.Lumin.loadGame ===
                "function"
            ) {
                const result =
                    await window.Lumin.loadGame(
                        gameId
                    );

                if (typeof result === "string") {
                    return result;
                }

                if (result?.url) {
                    return result.url;
                }
            }
        } catch (error) {
            console.warn(
                "[Lumin] loadGame failed:",
                error
            );
        }

        return null;
    }

    /*
     * ----------------------------------------
     * GAME PLAYER
     * ----------------------------------------
     */

    async function launchLuminGame(game) {
        const url =
            await resolveGameUrl(game.id);

        if (!url) {
            alert(
                "This game could not be loaded."
            );

            return;
        }

        openLuminPlayer(
            game.title,
            url
        );
    }

    /*
     * ----------------------------------------
     * PLAYER OVERLAY
     * ----------------------------------------
     */

    function createPlayer() {
        let wrapper =
            document.querySelector(
                ".lumin-player"
            );

        if (wrapper) {
            return wrapper;
        }

        wrapper =
            document.createElement("div");

        wrapper.className =
            "lumin-player";

        wrapper.innerHTML = `
            <div class="lumin-player-inner">

                <iframe
                    class="lumin-player-iframe"
                    allowfullscreen
                    sandbox="
                        allow-scripts
                        allow-same-origin
                        allow-pointer-lock
                        allow-forms
                        allow-popups
                        allow-modals
                        allow-downloads
                    "
                ></iframe>

                <button
                    class="lumin-player-back"
                    type="button"
                    aria-label="Back"
                >
                    ←
                </button>

                <button
                    class="lumin-player-fullscreen"
                    type="button"
                    aria-label="Fullscreen"
                >
                    ⛶
                </button>

                <button
                    class="lumin-player-close"
                    type="button"
                    aria-label="Close"
                >
                    ×
                </button>

            </div>
        `;

        document.body.appendChild(wrapper);

        const iframe =
            wrapper.querySelector(
                ".lumin-player-iframe"
            );

        const close =
            () => {
                wrapper.classList.remove(
                    "active"
                );

                iframe.srcdoc = "";
                iframe.src = "";
            };

        wrapper
            .querySelector(
                ".lumin-player-close"
            )
            .addEventListener(
                "click",
                close
            );

        wrapper
            .querySelector(
                ".lumin-player-back"
            )
            .addEventListener(
                "click",
                close
            );

        wrapper
            .querySelector(
                ".lumin-player-fullscreen"
            )
            .addEventListener(
                "click",
                async () => {

                    try {
                        if (
                            document.fullscreenElement
                        ) {
                            await document.exitFullscreen();
                        } else {
                            await wrapper.requestFullscreen();
                        }
                    } catch {}
                }
            );

        return wrapper;
    }

    /*
     * ----------------------------------------
     * PLAYER HTML HELPERS
     * ----------------------------------------
     */

    function addBaseTag(html, baseUrl) {
        if (
            /<base[\s>]/i.test(html)
        ) {
            return html;
        }

        const base =
            `<base href="${baseUrl}">`;

        const head =
            html.search(
                /<head[^>]*>/i
            );

        if (head !== -1) {
            const end =
                html.indexOf(
                    ">",
                    head
                );

            if (end !== -1) {
                return (
                    html.slice(
                        0,
                        end + 1
                    ) +
                    base +
                    html.slice(end + 1)
                );
            }
        }

        return base + html;
    }

    function fixRootRelativeUrls(html) {
        return html.replace(
            /(src|href|action|data)=([\"'])\/([^\/])/gi,
            "$1=$2$3"
        );
    }

    /*
     * ----------------------------------------
     * OPEN PLAYER
     * ----------------------------------------
     */

    async function openLuminPlayer(
        title,
        url
    ) {
        const player =
            createPlayer();

        const iframe =
            player.querySelector(
                ".lumin-player-iframe"
            );

        player.classList.add(
            "active"
        );

        document.title =
            `${title} | Snek`;

        try {
            const response =
                await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            let html =
                await response.text();

            const slash =
                url.lastIndexOf("/");

            const baseUrl =
                slash === -1
                    ? url
                    : url.slice(
                        0,
                        slash + 1
                    );

            html =
                addBaseTag(
                    html,
                    baseUrl
                );

            html =
                fixRootRelativeUrls(
                    html
                );

            iframe.srcdoc =
                html;

        } catch (error) {
            console.warn(
                "[Lumin] srcdoc load failed, opening URL directly:",
                error
            );

            iframe.src = url;
        }
    }

    /*
     * ----------------------------------------
     * PUBLIC API
     * ----------------------------------------
     */

    window.LuminGames = {
        load: loadLuminGames,

        getGames() {
            return luminGames;
        },

        reload() {
            return loadLuminGames();
        }
    };

    /*
     * ----------------------------------------
     * START
     * ----------------------------------------
     */

    function start() {
        loadLuminGames();
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            start
        );
    } else {
        start();
    }

})();
