import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bxsiniqhswmiokqshcgi.supabase.co";
const supabaseKey = "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd"; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default class AuthManager {
    constructor(registry) {
        this.registry = registry;
        this.user = null;
        this.profile = null;
        this.widget = null;
    }

    async init() {
        // 1. Hide profile UI entirely if this page is embedded in an iframe
        if (window.self !== window.top) {
            const profileWidget = document.querySelector('.top-right-profile');
            if (profileWidget) profileWidget.style.display = 'none';
            return;
        }

        // 2. Inject CSS and grab/create the widget
        this.injectStyles();
        this.setupWidgetContainer();

        // 3. Check current authentication state
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            this.user = user;
            await this.fetchProfile();
            this.updateUI();
        } else {
            this.setGuestUI();
        }
    }

    // --- CSS INJECTION ---
    injectStyles() {
        if (document.getElementById('spydr-auth-styles')) return; // Prevent duplicate styles
        
        const style = document.createElement('style');
        style.id = 'spydr-auth-styles';
        style.textContent = `
            /* FORCE WIDGET INTO THE CORNER */
            .top-right-profile {
                position: fixed;
                top: 25px;
                right: 35px;
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                font-family: 'Space Grotesk', sans-serif;
                color: #fff;
            }

            .pfp-icon {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background-color: #1a1a24;
                border: 2px solid #b026ff;
                box-shadow: 0 0 10px rgba(176, 38, 255, 0.4);
            }

            /* THE MINI DASHBOARD (Hidden by default) */
            .profile-dropdown {
                position: absolute;
                top: 130%;
                right: 0;
                width: 250px;
                background: rgba(10, 10, 15, 0.95);
                border: 1px solid rgba(176, 38, 255, 0.3);
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.9), 0 0 15px rgba(176, 38, 255, 0.2);
                backdrop-filter: blur(10px);
                
                /* Hover Transition Logic */
                opacity: 0;
                pointer-events: none;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            }

            /* Activate the dropdown on hover */
            .top-right-profile.logged-in-widget:hover .profile-dropdown {
                opacity: 1;
                pointer-events: auto;
                transform: translateY(0);
            }

            /* Inner Dropdown Layout */
            .dropdown-user-info {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px dashed rgba(176, 38, 255, 0.3);
            }

            .dropdown-pfp {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                border: 2px solid #b026ff;
                box-shadow: 0 0 8px rgba(176, 38, 255, 0.5);
            }

            .dropdown-text {
                display: flex;
                flex-direction: column;
            }

            .dropdown-name {
                color: #fff;
                font-weight: 700;
                font-size: 1.1rem;
            }

            .dropdown-xp {
                color: #b026ff;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.75rem;
                letter-spacing: 1px;
                margin-top: 4px;
            }

            /* Dropdown Buttons */
            .dropdown-links button {
                width: 100%;
                background: transparent;
                color: #8b8b8f;
                border: none;
                text-align: left;
                padding: 12px 10px;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.85rem;
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .dropdown-links button i { font-size: 1.1rem; }

            .dropdown-links button:hover {
                background: rgba(176, 38, 255, 0.15);
                color: #fff;
                text-shadow: 0 0 5px #b026ff;
            }

            #btn-logout:hover {
                background: rgba(255, 74, 74, 0.15);
                color: #ff4a4a;
                text-shadow: 0 0 5px #ff4a4a;
            }
        `;
        document.head.appendChild(style);
    }

    // --- DOM SETUP ---
    setupWidgetContainer() {
        this.widget = document.querySelector('.top-right-profile');
        
        // If the HTML doesn't exist on the page at all, build it from scratch
        if (!this.widget) {
            this.widget = document.createElement('div');
            this.widget.className = 'top-right-profile';
            document.body.appendChild(this.widget);
        }
    }

    async fetchProfile() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', this.user.id)
            .single();
            
        if (!error && data) {
            this.profile = data;
        }
    }

    calculateLevel(xp) {
        if (!xp || xp === 0) return 1;
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    }

    // --- LOGGED IN STATE ---
    updateUI() {
        if (!this.widget) return;

        this.widget.onclick = null; // Clear old guest redirects
        this.widget.classList.add('logged-in-widget');

        const username = this.profile?.username || this.user.email.split('@')[0];
        const pfpUrl = this.profile?.avatar_url || '/assets/images/favicon.png';
        const xp = this.profile?.xp || 0;
        const level = this.calculateLevel(xp);

        // Build the HTML structure
        this.widget.innerHTML = `
            <span id="top-right-name">${username}</span>
            <div class="pfp-icon" style="background-image: url('${pfpUrl}'); background-size: cover; background-position: center;"></div>
            
            <div class="profile-dropdown">
                <div class="dropdown-user-info">
                    <div class="dropdown-pfp" style="background-image: url('${pfpUrl}'); background-size: cover; background-position: center;"></div>
                    <div class="dropdown-text">
                        <div class="dropdown-name">${username}</div>
                        <div class="dropdown-xp">LVL ${level} // ${xp} XP</div>
                    </div>
                </div>
                <div class="dropdown-links">
                    <button id="btn-dashboard"><i class="ri-dashboard-3-line"></i> Command Center</button>
                    <button id="btn-logout"><i class="ri-logout-box-r-line"></i> Disconnect</button>
                </div>
            </div>
        `;

        // Attach Button Listeners
        document.getElementById('btn-dashboard').addEventListener('click', () => {
            this.transitionTo('/database.html');
        });

        document.getElementById('btn-logout').addEventListener('click', async () => {
            await supabase.auth.signOut();
            this.transitionTo('/login.html');
        });
    }

    // --- GUEST STATE ---
    setGuestUI() {
        if (!this.widget) return;
        
        this.widget.classList.remove('logged-in-widget');
        this.widget.innerHTML = `
            <span id="top-right-name">Login</span>
            <div class="pfp-icon"></div>
        `;

        this.widget.onclick = (e) => {
            e.preventDefault();
            this.transitionTo('/login.html');
        };
    }

    transitionTo(url) {
        document.body.style.opacity = "0";
        setTimeout(() => location.href = url, 300);
    }
}
