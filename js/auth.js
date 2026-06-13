/**
 * E-Graphisme - Auth Client
 * Client-side authentication
 */

class AuthClient {
    constructor() {
        this.token = localStorage.getItem('authToken');
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return !!this.token;
    }

    /**
     * Get current user
     */
    getUser() {
        return this.user;
    }

    /**
     * Get auth token
     */
    getToken() {
        return this.token;
    }

    /**
     * Login
     */
    async login(email, password) {
        const response = await fetch('/php/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            this.token = data.token;
            this.user = data.user;
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data;
    }

    /**
     * Register
     */
    async register(userData) {
        const response = await fetch('/php/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', ...userData })
        });
        
        const data = await response.json();
        
        if (data.success) {
            this.token = data.token;
            this.user = data.user;
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data;
    }

    /**
     * Update profile
     */
    async updateProfile(profileData) {
        const response = await fetch('/php/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'updateProfile', token: this.token, ...profileData })
        });
        
        const data = await response.json();
        
        if (data.success) {
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data;
    }

    /**
     * Subscribe to plan
     */
    async subscribe(plan) {
        const response = await fetch('/php/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'subscribe', token: this.token, plan })
        });
        
        const data = await response.json();
        
        if (data.success) {
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data;
    }

    /**
     * Logout
     */
    logout() {
        this.token = null;
        this.user = {};
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        fetch('/php/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'logout', token: this.token })
        });
    }

    /**
     * Require login - redirect if not logged in
     */
    requireLogin(redirectUrl = 'auth/login.html') {
        if (!this.isLoggedIn()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    /**
     * Get plan features
     */
    getPlanFeatures() {
        const plans = {
            free: {
                projects: 3,
                brandAnalysis: 'basic',
                exports: ['png'],
                ai: false,
                templates: false,
                support: false
            },
            pro: {
                projects: -1,
                brandAnalysis: 'full',
                exports: ['png', 'pdf', 'svg'],
                ai: true,
                templates: 50,
                support: 'email'
            },
            enterprise: {
                projects: -1,
                brandAnalysis: 'full',
                exports: ['png', 'pdf', 'svg', 'figma', 'psd'],
                ai: true,
                templates: -1,
                support: '24/7',
                team: 10,
                api: true,
                n8n: true
            }
        };
        
        return plans[this.user.plan] || plans.free;
    }
}

// Global instance
window.authClient = new AuthClient();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthClient;
}