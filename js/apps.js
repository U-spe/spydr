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

    function createAppView() {
        const existingView = document.getElementById('app-view');
        if (existingView) return existingView;

        const view = document.createElement('div');
        view.id = 'app-view';
        view.setAttribute('aria-hidden', 'true');
        view.innerHTML = `
            <button id="closeAppBtn" type="button" aria-label="Exit application">
                <i class="ri-arrow-left-line"></i> exit
            </button>
            <iframe id="app-frame" title="Spydr application"></iframe>
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
        if (frame) frame.src = 'about:blank';

        document.querySelector('.dock')?.classList.remove('hidden');
        document.body.classList.remove('app-open');
    }

    function handleLaunch(e) {
        const btn = e.currentTarget;
        const url = btn.getAttribute('data-url');
        const name = btn.getAttribute('data-name') || 'Application';
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Launching...`;
        btn.disabled = true;

        setTimeout(() => {
            openApp(url, name);
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 400);
    }

    function createCardHTML(app, index) {
        const badgeClass = app.featured ? 'app-badge featured-badge' : 'app-badge';
        const badgeText = app.featured ? 'Featured' : app.category;
        const iconColorClass = app.category === 'proxy' ? 'icon-proxy' : 'icon-local';
        
        const article = document.createElement('article');
        article.className = 'app-card';
        article.tabIndex = 0;
        article.style.animationDelay = `${index * 0.05}s`;

        article.innerHTML = `
            <div class="card-header">
                <div class="app-icon ${iconColorClass}"><i class="${app.icon}"></i></div>
                <div class="${badgeClass}">${badgeText}</div>
            </div>
            <div class="card-body">
                <h3 class="app-name">${app.name}</h3>
                <p class="app-desc">${app.description}</p>
            </div>
            <div class="card-footer">
                <button class="launch-btn" aria-label="Launch ${app.name}" data-name="${app.name}" data-url="${app.url}">
                    Launch <i class="ri-arrow-right-line"></i>
                </button>
            </div>
        `;

        const launchBtn = article.querySelector('.launch-btn');
        launchBtn.addEventListener('click', handleLaunch);

        article.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') launchBtn.click();
        });

        return article;
    }

    function renderGrid(gridElement, appList) {
        gridElement.innerHTML = '';
        appList.forEach((app, index) => {
            gridElement.appendChild(createCardHTML(app, index));
        });
    }

    function renderApps(filterText = '') {
        const query = filterText.toLowerCase().trim();

        const filteredApps = query 
            ? apps.filter(app => app.name.toLowerCase().includes(query) || app.description.toLowerCase().includes(query))
            : apps;

        const featuredApps = filteredApps.filter(app => app.featured);
        // FIX: RETAIN SYSTEM DESIGN LAYOUT BY PREVENTING SUB-CATEGORY DELETIONS WHEN FEATURED EXISTS
        const proxyApps = filteredApps.filter(app => app.category === 'proxy');
        const localApps = filteredApps.filter(app => app.category === 'local');

        renderGrid(grids.featured, featuredApps);
        renderGrid(grids.proxy, proxyApps);
        renderGrid(grids.local, localApps);

        sections.featured.classList.toggle('hidden', featuredApps.length === 0);
        sections.proxy.classList.toggle('hidden', proxyApps.length === 0);
        sections.local.classList.toggle('hidden', localApps.length === 0);

        noResults.classList.toggle('hidden', filteredApps.length > 0);
    }

    searchInput.addEventListener('input', (e) => {
        renderApps(e.target.value);
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('#closeAppBtn')) closeApp();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('app-view')?.classList.contains('open')) {
            closeApp();
        }
    });

    renderApps();
});
