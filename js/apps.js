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
            launchType: 'proxy',
            url: 'https://tiktok.com'
        },
        {
            id: 'yt',
            name: 'YouTube',
            description: 'Global video sharing and streaming platform.',
            icon: 'ri-youtube-fill',
            category: 'proxy',
            featured: true,
            launchType: 'proxy',
            url: 'https://youtube.com'
        },
        {
            id: 'tw',
            name: 'Twitch',
            description: 'Live streaming platform for gamers and creators.',
            icon: 'ri-twitch-fill',
            category: 'proxy',
            featured: false,
            launchType: 'proxy',
            url: 'https://twitch.tv'
        },
        {
            id: 'calc',
            name: 'Calculator',
            description: 'Standard OS mathematical calculator.',
            icon: 'ri-calculator-fill',
            category: 'local',
            featured: false,
            launchType: 'local',
            url: '/calc.html'
        },
        {
            id: 'note',
            name: 'Notepad',
            description: 'Lightweight rich text and code editor.',
            icon: 'ri-file-list-3-fill',
            category: 'local',
            featured: false,
            launchType: 'local',
            url: '/notepad.html'
        },
        {
            id: 'html',
            name: 'HTML Editor',
            description: 'Live web development workspace.',
            icon: 'ri-html5-fill',
            category: 'local',
            featured: true,
            launchType: 'local',
            url: '/editor.html'
        },
        {
            id: 'mov',
            name: 'Movies',
            description: 'Local media playback interface.',
            icon: 'ri-film-fill',
            category: 'local',
            featured: false,
            launchType: 'local',
            url: '/movies.html'
        },
        {
            id: 'cine',
            name: 'Cine Cloud',
            description: 'High-fidelity cloud media streaming service.',
            icon: 'ri-cloud-windy-fill',
            category: 'local',
            featured: true,
            launchType: 'local',
            url: '/cine.html'
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

    function launchProxy(url) {
        console.log(`[Spydr OS] Initiating proxy launch sequence for: ${url}`);
        window.open(`/proxy?url=${encodeURIComponent(url)}`, '_blank');
    }

    function launchLocal(url) {
        console.log(`[Spydr OS] Launching local application: ${url}`);
        window.location.href = url;
    }

    function handleLaunch(e) {
        const btn = e.currentTarget;
        const type = btn.getAttribute('data-type');
        const url = btn.getAttribute('data-url');

        btn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Launching...`;

        setTimeout(() => {
            if (type === 'proxy') {
                launchProxy(url);
            } else if (type === 'local') {
                launchLocal(url);
            }
            setTimeout(() => {
                btn.innerHTML = `Launch <i class="ri-arrow-right-line"></i>`;
            }, 1000);
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
                <button class="launch-btn" aria-label="Launch ${app.name}" data-type="${app.launchType}" data-url="${app.url}">
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

    renderApps();
});
