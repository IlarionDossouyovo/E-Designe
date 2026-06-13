/**
 * E-Graphisme - Analytics Module
 * Suivi des statistiques et analytics
 */

class Analytics {
    constructor() {
        this.storageKey = 'e_graphisme_analytics';
    }

    /**
     * Tracker un événement
     * @param {string} event - Nom de l'événement
     * @param {Object} data - Données associées
     */
    track(event, data = {}) {
        const eventData = {
            event: event,
            data: data,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        // Sauvegarder localement
        const events = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        events.push(eventData);

        // Garder seulement les 1000 derniers événements
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(events));

        // Envoyer au serveur si disponible
        this.sendToServer(eventData);
    }

    /**
     * Envoyer au serveur
     */
    async sendToServer(eventData) {
        try {
            await fetch('/php/analytics.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            });
        } catch (e) {
            // Silent fail
        }
    }

    /**
     * Obtenir les statistiques
     */
    getStats() {
        const events = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

        const stats = {
            totalViews: 0,
            uniqueVisitors: new Set(),
            topPages: {},
            topEvents: {},
            last24h: 0,
            last7d: 0,
            last30d: 0
        };

        const now = new Date();
        const day24h = 24 * 60 * 60 * 1000;
        const day7 = 7 * day24h;
        const day30 = 30 * day24h;

        events.forEach(e => {
            // Compter les pages vues
            if (e.event === 'page_view') {
                stats.totalViews++;
                stats.uniqueVisitors.add(e.data.sessionId);

                // Compter par page
                stats.topPages[e.data.page] = (stats.topPages[e.data.page] || 0) + 1;
            }

            // Compter les événements
            stats.topEvents[e.event] = (stats.topEvents[e.event] || 0) + 1;

            // Stats temporelles
            const timeDiff = now - new Date(e.timestamp);
            if (timeDiff < day24h) stats.last24h++;
            if (timeDiff < day7) stats.last7d++;
            if (timeDiff < day30) stats.last30d++;
        });

        stats.uniqueVisitors = stats.uniqueVisitors.size;

        return stats;
    }

    /**
     * Obtenir les=top pages
     * @param {number} limit - Nombre de pages
     */
    getTopPages(limit = 10) {
        const events = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const pages = {};

        events.forEach(e => {
            if (e.event === 'page_view' && e.data.page) {
                pages[e.data.page] = (pages[e.data.page] || 0) + 1;
            }
        });

        return Object.entries(pages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
    }

    /**
     * Réinitialiser les analytics
     */
    reset() {
        localStorage.removeItem(this.storageKey);
    }
}

// Initialiser analytics
window.analytics = new Analytics();

// Tracker les pages vues
document.addEventListener('DOMContentLoaded', () => {
    window.analytics.track('page_view', {
        page: window.location.pathname,
        title: document.title,
        sessionId: sessionStorage.getItem('sessionId') || 'session_' + Date.now()
    });
});

// Tracker les clics sur les boutons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-track]');
    if (btn) {
        window.analytics.track('click', {
            element: btn.dataset.track,
            page: window.location.pathname
        });
    }
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Analytics;
}