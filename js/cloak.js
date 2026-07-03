// /js/cloak.js
export default class CloakManager {
    constructor(kernel) {
        this.kernel = kernel;
        this.presets = {
            'google-docs': {
                title: 'Google Docs',
                favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon-7.ico'
            },
            'google-drive': {
                title: 'My Drive - Google Drive',
                favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
            },
            'canvas': {
                title: 'Dashboard',
                favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e05d51a14c.ico'
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
            this.applySpoof(this.presets[targetKey].title, this.presets[targetKey].favicon);
        } else {
            this.restoreSpoof();
        }
    }

    applySpoof(title, faviconUrl) {
        document.title = title;
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = faviconUrl;
    }

    restoreSpoof() {
        document.title = this.originalTitle;
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = this.originalFavicon;
        }
    }
}
