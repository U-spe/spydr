/* js/apps.js */
document.addEventListener('DOMContentLoaded', () => {
    const apps = [
        {
            id: 'tt',
            name: 'TikTok',
            description: 'Short-form mobile video content network.',
            icon: 'ri-tiktok-fill',
            category: 'proxy',
            featured: false,
            url: '/app/no-app.html'
        },
        {
            id: 'yt',
            name: 'YouTube',
            description: 'Global video sharing and streaming platform.',
            icon: 'ri-youtube-fill',
            category: 'proxy',
            featured: true,
            url: '/app/no-app.html'
        },
        {
            id: 'tw',
            name: 'Twitch',
            description: 'Live streaming platform for gamers and creators.',
            icon: 'ri-twitch-fill',
            category: 'proxy',
            featured: false,
            url: '/app/no-app.html'
        },
        {
            id: 'calc',
            name: 'Calculator',
            description: 'Standard OS mathematical calculator.',
            icon: 'ri-calculator-fill',
            category: 'local',
            featured: false,
            url: '/apps/calc.html'
        },
        {
            id: 'note',
            name: 'Notepad',
            description: 'Lightweight rich text and code editor.',
            icon: 'ri-file-list-3-fill',
            category: 'local',
            featured: false,
            url: '/apps/notes.html'
        },
        {
            id: 'html',
            name: 'HTML Editor',
            description: 'Live web development workspace.',
            icon: 'ri-html5-fill',
            category: 'local',
            featured: true,
            url: '/apps/edit.html'
        },
        {
            id: 'mov',
            name: 'Movies',
            description: 'Local media playback interface.',
            icon: 'ri-film-fill',
            category: 'local',
            featured: false,
            url: '/apps/movies.html'
        },
        {
            id: 'cine',
            name: 'Cine Cloud',
            description: 'High-fidelity cloud media streaming service.',
            icon: 'ri-cloud-windy-fill',
            category: 'local',
            featured: true,
            url: '/apps/c-os.html'
        }
    ];

    const grids = {
        featured: document.getElementById('featured-grid'),
        proxy: document.getElementById('proxy-grid'),
        local: document.getElementById('local-grid')
    };

    const sections = {
        featured: document.getElementById('featured-section'),
        proxy: document.getElementById('proxy-section'),
        local: document.getElementById('local-section')
    };

    const searchInput = document.getElementById('app-search');
    const noResults = document.getElementById('no-results');

    function injectProxyStatusStyles() {
        if (document.getElementById('proxy-status-styles')) return;

        const style = document.createElement('style');
        style.id = 'proxy-status-styles';

        style.textContent = `
            .proxy-status-banner {
                position: relative;
                display: flex;
                align-items: center;
                gap: 14px;
                width: 100%;
                margin-bottom: 1.5rem;
                padding: 16px 18px;
                overflow: hidden;

                border: 1px solid rgba(255, 92, 92, 0.42);
                border-radius: 15px;

                color: var(--theme-text, #ffffff);

                background:
                    linear-gradient(
                        135deg,
                        rgba(125, 24, 24, 0.38),
                        rgba(36, 12, 12, 0.72)
                    ),
                    color-mix(
                        in srgb,
                        var(--theme-surface, #111111) 88%,
                        transparent
                    );

                box-shadow:
                    0 12px 35px rgba(125, 24, 24, 0.18);

                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
            }

            .proxy-status-banner::before {
                content: '';

                position: absolute;
                inset: 0 auto 0 0;

                width: 4px;

                background: #ff5c5c;

                box-shadow:
                    0 0 18px rgba(255, 92, 92, 0.75);
            }

            .proxy-status-icon {
                width: 42px;
                height: 42px;

                flex: 0 0 42px;

                display: grid;
                place-items: center;

                border: 1px solid rgba(255, 92, 92, 0.38);
                border-radius: 12px;

                color: #ff8a8a;
                background: rgba(255, 92, 92, 0.1);

                font-size: 1.25rem;
            }

            .proxy-status-copy strong {
                display: block;

                margin-bottom: 3px;

                color: #ffffff;

                font-family: 'Space Grotesk', sans-serif;
                font-size: 0.96rem;

                letter-spacing: -0.01em;
            }

            .proxy-status-copy span {
                display: block;

                color: rgba(255, 255, 255, 0.68);

                font-size: 0.72rem;
                line-height: 1.55;
            }

            .app-card.proxy-app {
                border-color: rgba(255, 92, 92, 0.28);
            }

            .proxy-offline-label {
                position: absolute;
                top: 0;
                right: 18px;
                z-index: 2;

                display: inline-flex;
                align-items: center;
                gap: 6px;

                padding: 6px 10px;

                border: 1px solid rgba(255, 92, 92, 0.34);
                border-top: 0;
                border-radius: 0 0 9px 9px;

                color: #ff9b9b;
                background: rgba(84, 16, 16, 0.92);

                font-size: 0.61rem;
                font-weight: 700;

                letter-spacing: 0.08em;
                text-transform: uppercase;
            }

            .proxy-offline-dot {
                width: 6px;
                height: 6px;

                border-radius: 50%;

                background: #ff5c5c;

                box-shadow:
                    0 0 10px rgba(255, 92, 92, 0.9);
            }

            @media (max-width: 600px) {
                .proxy-status-banner {
                    align-items: flex-start;
                    padding: 14px;
                }

                .proxy-status-icon {
                    width: 36px;
                    height: 36px;
                    flex-basis: 36px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function createProxyStatusBanner() {
        if (
            !sections.proxy ||
            !grids.proxy ||
            document.getElementById('proxy-status-banner')
        ) {
            return;
        }

        const banner = document.createElement('div');

        banner.id = 'proxy-status-banner';
        banner.className = 'proxy-status-banner';
        banner.setAttribute('role', 'status');

        banner.innerHTML = `
            <div class="proxy-status-icon" aria-hidden="true">
                <i class="ri-wifi-off-line"></i>
            </div>

            <div class="proxy-status-copy">
                <strong>Proxy is currently down</strong>

                <span>
                    These proxy apps are temporarily unavailable.
                    We’re working on bringing them back.
                </span>
            </div>
        `;

        sections.proxy.insertBefore(banner, grids.proxy);
    }

    function createAppView() {
        const existingView = document.getElementById('app-view');

        if (existingView) {
            return existingView;
        }

        const view = document.createElement('div');

        view.id = 'app-view';
        view.setAttribute('aria-hidden', 'true');

        view.innerHTML = `
            <button
                id="closeAppBtn"
                type="button"
                aria-label="Exit application"
            >
                <i class="ri-arrow-left-line"></i>
                exit
            </button>

            <iframe
                id="app-frame"
                title="Spydr application"
            ></iframe>
        `;

        document.body.appendChild(view);

        return view;
    }

    function withEmbedMode(url) {
        const parsed = new URL(url, window.location.origin);

        parsed.searchParams.set('embed', '1');

        return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    function openApp(url, name) {
        const view = createAppView();
        const frame = view.querySelector('#app-frame');

        frame.title = `${name} // Spydr application`;
        frame.src = withEmbedMode(url);

        view.style.display = 'flex';
        view.classList.add('open');
        view.setAttribute('aria-hidden', 'false');

        document.querySelector('.dock')?.classList.add('hidden');
        document.body.classList.add('app-open');

        view.querySelector('#closeAppBtn')?.focus();
    }

    function closeApp() {
        const view = document.getElementById('app-view');
        const frame = document.getElementById('app-frame');

        if (view) {
            view.style.display = 'none';
            view.classList.remove('open');
            view.setAttribute('aria-hidden', 'true');
        }

        if (frame) {
            frame.src = 'about:blank';
        }

        document.querySelector('.dock')?.classList.remove('hidden');
        document.body.classList.remove('app-open');
    }

    function handleLaunch(event) {
        const button = event.currentTarget;

        const url = button.getAttribute('data-url');
        const name =
            button.getAttribute('data-name') ||
            'Application';

        const originalHTML = button.innerHTML;

        button.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Launching...
        `;

        button.disabled = true;

        setTimeout(() => {
            openApp(url, name);

            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 400);
    }

    function createCardHTML(app, index) {
        const badgeClass = app.featured
            ? 'app-badge featured-badge'
            : 'app-badge';

        const badgeText = app.featured
            ? 'Featured'
            : app.category;

        const iconColorClass = app.category === 'proxy'
            ? 'icon-proxy'
            : 'icon-local';

        const article = document.createElement('article');

        article.className = 'app-card';
        article.tabIndex = 0;
        article.style.animationDelay = `${index * 0.05}s`;

        if (app.category === 'proxy') {
            article.classList.add('proxy-app');
        }

        article.innerHTML = `
            ${
                app.category === 'proxy'
                    ? `
                        <div class="proxy-offline-label">
                            <span class="proxy-offline-dot"></span>
                            temporarily down
                        </div>
                    `
                    : ''
            }

            <div class="card-header">
                <div class="app-icon ${iconColorClass}">
                    <i class="${app.icon}"></i>
                </div>

                <div class="${badgeClass}">
                    ${badgeText}
                </div>
            </div>

            <div class="card-body">
                <h3 class="app-name">
                    ${app.name}
                </h3>

                <p class="app-desc">
                    ${app.description}
                </p>
            </div>

            <div class="card-footer">
                <button
                    class="launch-btn"
                    aria-label="Launch ${app.name}"
                    data-name="${app.name}"
                    data-url="${app.url}"
                >
                    Launch
                    <i class="ri-arrow-right-line"></i>
                </button>
            </div>
        `;

        const launchButton =
            article.querySelector('.launch-btn');

        launchButton.addEventListener(
            'click',
            handleLaunch
        );

        article.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                launchButton.click();
            }
        });

        return article;
    }

    function renderGrid(gridElement, appList) {
        if (!gridElement) return;

        gridElement.innerHTML = '';

        appList.forEach((app, index) => {
            gridElement.appendChild(
                createCardHTML(app, index)
            );
        });
    }

    function renderApps(filterText = '') {
        const query =
            filterText.toLowerCase().trim();

        const filteredApps = query
            ? apps.filter((app) => {
                return (
                    app.name
                        .toLowerCase()
                        .includes(query) ||
                    app.description
                        .toLowerCase()
                        .includes(query)
                );
            })
            : apps;

        const featuredApps =
            filteredApps.filter((app) => app.featured);

        const proxyApps =
            filteredApps.filter(
                (app) => app.category === 'proxy'
            );

        const localApps =
            filteredApps.filter(
                (app) => app.category === 'local'
            );

        renderGrid(grids.featured, featuredApps);
        renderGrid(grids.proxy, proxyApps);
        renderGrid(grids.local, localApps);

        sections.featured?.classList.toggle(
            'hidden',
            featuredApps.length === 0
        );

        sections.proxy?.classList.toggle(
            'hidden',
            proxyApps.length === 0
        );

        sections.local?.classList.toggle(
            'hidden',
            localApps.length === 0
        );

        noResults?.classList.toggle(
            'hidden',
            filteredApps.length > 0
        );
    }

    searchInput?.addEventListener('input', (event) => {
        renderApps(event.target.value);
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('#closeAppBtn')) {
            closeApp();
        }
    });

    document.addEventListener('keydown', (event) => {
        const appView =
            document.getElementById('app-view');

        if (
            event.key === 'Escape' &&
            appView?.classList.contains('open')
        ) {
            closeApp();
        }
    });

    injectProxyStatusStyles();
    createProxyStatusBanner();
    renderApps();
});
