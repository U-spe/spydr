// js/cloak.js
export default class CloakManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.presets = {
            'spydr': {
                title: "spydr",
                icon: "/assets/images/favicon.png"
            },
            'google': {
                title: "Google",
                icon: "https://www.google.com/favicon.ico"
            },
            'classroom': {
                title: "Home - Classroom",
                icon: "https://ssl.gstatic.com/classroom/favicon.png"
            },
            'securly': {
                title: "Create Pass - Securly Pass",
                icon: "https://pass.securly.com/favicon.ico"
            },
            'wayground': {
                title: "Playing a Game - Wayground (Formerly Quizizz)",
                icon: "https://wayground.com/favicon.ico"
            },
            'studysync': {
                title: "StudySync",
                icon: "https://www.studysync.com/static/favicon.ico"
            },
            'classlink': {
                title: "My Apps - Classlink",
                icon: "https://lh3.googleusercontent.com/eZN3KtQ96nLtnBk6vNJWNe8lAGQ_v4fWGTH7URUqzMyQ9BiDuxqpt1uSkIU-OaRhxw"
            }
        };
        this.originalTitle = document.title;
        this.originalFavicon = '';
    }

    init() {
        this.settings = this.kernel.get('settings');
        this.captureOriginalFavicon();
        this.sync();
    }

    captureOriginalFavicon() {
        const link = document.querySelector("link[rel~='icon']");
        this.originalFavicon = link ? link.href : window.location.origin + '/favicon.ico';
    }

    sync() {
        const enabled = this.settings.get('cloakEnabled');
        const targetKey = this.settings.get('cloakTarget');

        if (enabled && this.presets[targetKey]) {
            this.applySpoof(this.presets[targetKey].title, this.presets[targetKey].icon);
        } else {
            this.restoreSpoof();
        }
    }

    applySpoof(title, iconUrl) {
        document.title = title;
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = iconUrl;
    }

    restoreSpoof() {
        document.title = this.originalTitle;
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = this.originalFavicon;
        }
    }
}
