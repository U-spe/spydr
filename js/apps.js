/* js/apps.js */
document.addEventListener('DOMContentLoaded', () => {
    const apps = [
        {
            id: 'tt',
            name: 'TikTok',
            description: 'video feed',
            icon: 'ri-tiktok-fill',
            category: 'proxy',
            featured: false,
            url: '/app/no-app.html'
        },
        {
           id: 'yt-player',
           name: 'YT Player',
           description: 'video player',
           icon: 'ri-youtube-fill',
           category: 'local',
           featured: true,
           url: '/apps/yt-player.html'
        },
        {
            id: 'tw',
            name: 'Twitch',
            description: 'live streams',
            icon: 'ri-twitch-fill',
            category: 'proxy',
            featured: false,
            url: '/app/no-app.html'
        },
        {
            id: 'soundboard',
            name: 'Soundboard',
            description: 'audio tools',
            icon: 'ri-volume-up-line',
            category: 'local',
            featured: true,
            url: '/apps/soundboard.html'
        },
        {
            id: 'calc',
            name: 'Calculator',
            description: 'quick calculations',
            icon: 'ri-calculator-fill',
            category: 'local',
            featured: false,
            url: '/apps/calc.html'
        },
        {
            id: 'note',
            name: 'Notepad',
            description: 'notes and code',
            icon: 'ri-file-list-3-fill',
            category: 'local',
            featured: false,
            url: '/apps/notes.html'
        },
        {
            id: 'html',
            name: 'HTML Editor',
            description: 'code playground',
            icon: 'ri-html5-fill',
            category: 'local',
            featured: true,
            url: '/apps/edit.html'
        },
        {
            id: 'mov',
            name: 'Movies',
            description: 'media library',
            icon: 'ri-film-fill',
            category: 'local',
            featured: false,
            url: '/apps/movie.html'
        },
        {
            id: 'cine',
            name: 'PS5 Emu',
            description: 'console interface',
            icon: 'ri-playstation-line',
            category: 'local',
            featured: true,
            url: '/apps/play-ps5.emu.html'
        }
    ];

    const grid = document.getElementById('apps-grid');
    const searchInput = document.getElementById('app-search');
    const noResults = document.getElementById('no-results');

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

    function createAppTile(app) {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'app-tile' + (app.category === 'proxy' ? ' proxy-app' : '');
        tile.setAttribute('aria-label', 'Open ' + app.name);
        tile.setAttribute('data-tooltip', app.name);
        tile.title = app.name;
        tile.innerHTML = `<i class="${app.icon}" aria-hidden="true"></i>`;

        if (app.category === 'proxy') {
            const status = document.createElement('span');
            status.className = 'app-status-dot';
            status.setAttribute('aria-label', 'temporarily unavailable');
            tile.appendChild(status);
        }

        tile.addEventListener('click', () => openApp(app.url, app.name));
        return tile;
    }

    function renderApps(filterText = '') {
        if (!grid) return;

        const query = filterText.toLowerCase().trim();
        const filteredApps = apps.filter(app =>
            app.name.toLowerCase().includes(query) ||
            app.description.toLowerCase().includes(query)
        );

        grid.innerHTML = '';
        filteredApps.forEach(app => grid.appendChild(createAppTile(app)));
        noResults?.classList.toggle('hidden', filteredApps.length > 0);
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

    renderApps();
});
