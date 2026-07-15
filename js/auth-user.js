import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bxsiniqhswmiokqshcgi.supabase.co";
const supabaseKey = "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd"; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default class AuthManager {
    constructor(registry) {
        this.registry = registry;
        this.user = null;
        this.profile = null;
    }

    async init() {
        // 1. Hide profile UI entirely if this page is embedded in an iframe
        if (window.self !== window.top) {
            const profileWidget = document.querySelector('.top-right-profile');
            if (profileWidget) profileWidget.style.display = 'none';
            return;
        }

        // 2. Check current authentication state
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            this.user = user;
            await this.fetchProfile();
            this.updateUI();
        } else {
            this.setGuestUI();
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

    updateUI() {
        const profileWidget = document.querySelector('.top-right-profile');
        const nameSpan = document.getElementById('top-right-name');
        const pfpIcon = document.querySelector('.pfp-icon');

        if (!profileWidget || !nameSpan) return;

        // Update Text & Image
        nameSpan.innerText = this.profile?.username || this.user.email.split('@')[0];
        
        if (this.profile?.avatar_url) {
            pfpIcon.style.backgroundImage = `url('${this.profile.avatar_url}')`;
            pfpIcon.style.backgroundSize = 'cover';
            pfpIcon.style.backgroundPosition = 'center';
        }

        // Overwrite the click action to go to database instead of login
        profileWidget.onclick = (e) => {
            e.preventDefault();
            this.transitionTo('/database.html');
        };
    }

    setGuestUI() {
        const profileWidget = document.querySelector('.top-right-profile');
        if (!profileWidget) return;

        profileWidget.onclick = (e) => {
            e.preventDefault();
            this.transitionTo('/login.html');
        };
    }

    transitionTo(url) {
        document.body.style.opacity = "0";
        setTimeout(() => location.href = url, 300);
    }

    // --- API FOR DATABASE.HTML TO USE LATER ---

    async updateUsername(newName) {
        if (!this.user || !this.profile) return { success: false, msg: "Not logged in." };

        // Check the 7-day restriction
        const lastChange = new Date(this.profile.last_name_change).getTime();
        const now = new Date().getTime();
        const daysSinceChange = (now - lastChange) / (1000 * 3600 * 24);

        if (daysSinceChange < 7) {
            const daysLeft = Math.ceil(7 - daysSinceChange);
            return { success: false, msg: `You must wait ${daysLeft} more day(s) to change your tag.` };
        }

        // Process update
        const { error } = await supabase
            .from('profiles')
            .update({ username: newName, last_name_change: new Date().toISOString() })
            .eq('id', this.user.id);

        if (error) return { success: false, msg: error.message };
        
        this.profile.username = newName;
        this.updateUI();
        return { success: true, msg: "Username updated successfully." };
    }

    async uploadPfp(file) {
        if (!this.user) return { success: false, msg: "Not logged in." };

        const fileExt = file.name.split('.').pop();
        const filePath = `${this.user.id}-${Math.random()}.${fileExt}`;

        // Upload to Storage
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) return { success: false, msg: uploadError.message };

        // Get public URL
        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

        // Update profiles table
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', this.user.id);

        if (updateError) return { success: false, msg: updateError.message };

        this.profile.avatar_url = publicUrl;
        this.updateUI();
        return { success: true, msg: "Profile picture updated." };
    }
}
