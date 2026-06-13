/**
 * E-Graphisme - Service Manager Module
 * CMS for managing services with dashboard integration
 */

class ServiceManager {
    constructor() {
        this.services = [];
        this.storageKey = 'e_graphisme_services';
    }

    /**
     * Initialize service manager
     */
    async init() {
        await this.loadServices();
        return this;
    }

    /**
     * Load services from storage or API
     */
    async loadServices() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.services = JSON.parse(stored);
            } else {
                // Load from JSON file
                const response = await fetch('/db/services.json');
                if (response.ok) {
                    this.services = await response.json();
                }
            }
        } catch (error) {
            console.error('Error loading services:', error);
            this.services = [];
        }
    }

    /**
     * Save services to storage
     */
    saveServices() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.services));
    }

    /**
     * Get all services
     * @returns {Array} Services
     */
    getServices() {
        return this.services;
    }

    /**
     * Get service by ID
     * @param {string} id - Service ID
     * @returns {Object} Service
     */
    getService(id) {
        return this.services.find(s => s.id === id);
    }

    /**
     * Get services by category
     * @param {string} category - Category
     * @returns {Array} Services in category
     */
    getServicesByCategory(category) {
        return this.services.filter(s => s.category === category);
    }

    /**
     * Get popular services
     * @returns {Array} Popular services
     */
    getPopularServices() {
        return this.services.filter(s => s.popular);
    }

    /**
     * Add new service
     * @param {Object} service - Service data
     * @returns {Object} Added service
     */
    addService(service) {
        const newService = {
            id: 'svc_' + Date.now(),
            name: service.name || 'New Service',
            slug: service.slug || this.slugify(service.name),
            category: service.category || 'design',
            description: service.description || '',
            price: service.price || 0,
            currency: service.currency || 'XOF',
            duration: service.duration || '7 jours',
            features: service.features || [],
            image: service.image || '/images/services/default.svg',
            popular: service.popular || false,
            active: service.active !== false,
            order: service.order || this.services.length,
            createdAt: new Date().toISOString(),
            ...service
        };

        this.services.push(newService);
        this.saveServices();
        
        return newService;
    }

    /**
     * Update service
     * @param {string} id - Service ID
     * @param {Object} data - Updated data
     * @returns {Object} Updated service
     */
    updateService(id, data) {
        const index = this.services.findIndex(s => s.id === id);
        if (index === -1) {
            throw new Error('Service not found');
        }

        this.services[index] = {
            ...this.services[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        this.saveServices();
        return this.services[index];
    }

    /**
     * Delete service
     * @param {string} id - Service ID
     * @returns {boolean} Success
     */
    deleteService(id) {
        const index = this.services.findIndex(s => s.id === id);
        if (index === -1) {
            return false;
        }

        this.services.splice(index, 1);
        this.saveServices();
        return true;
    }

    /**
     * Toggle service active status
     * @param {string} id - Service ID
     * @returns {boolean} New status
     */
    toggleService(id) {
        const service = this.getService(id);
        if (!service) {
            throw new Error('Service not found');
        }

        service.active = !service.active;
        service.updatedAt = new Date().toISOString();
        this.saveServices();
        
        return service.active;
    }

    /**
     * Get categories
     * @returns {Array} Unique categories
     */
    getCategories() {
        const categories = new Set(this.services.map(s => s.category));
        return Array.from(categories);
    }

    /**
     * Render services grid
     * @param {string} containerId - Container element ID
     * @param {Object} options - Render options
     */
    render(containerId = 'services-grid', options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let services = this.services;
        
        // Filter by category
        if (options.category && options.category !== 'all') {
            services = services.filter(s => s.category === options.category);
        }

        // Sort
        services.sort((a, b) => a.order - b.order);

        // Render
        container.innerHTML = services.map(service => this.renderServiceCard(service)).join('');
    }

    /**
     * Render service card HTML
     * @param {Object} service - Service data
     * @returns {string} HTML
     */
    renderServiceCard(service) {
        const price = this.formatPrice(service.price, service.currency);
        
        return `
            <div class="service-card" data-id="${service.id}">
                <div class="service-image">
                    <img src="${service.image}" alt="${service.name}" loading="lazy">
                </div>
                <div class="service-content">
                    <span class="service-category">${service.category}</span>
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <ul class="service-features">
                        ${service.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                    </ul>
                    <div class="service-footer">
                        <span class="service-price">${price}</span>
                        <span class="service-duration"><i class="fas fa-clock"></i> ${service.duration}</span>
                    </div>
                    <button class="btn-order" data-service="${service.id}">Commander</button>
                </div>
            </div>
        `;
    }

    /**
     * Format price
     * @param {number} price - Price
     * @param {string} currency - Currency
     * @returns {string} Formatted price
     */
    formatPrice(price, currency = 'XOF') {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(price);
    }

    /**
     * Create slug from string
     * @param {string} str - String to slugify
     * @returns {string} Slug
     */
    slugify(str) {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    /**
     * Get service statistics
     * @returns {Object} Statistics
     */
    getStats() {
        return {
            total: this.services.length,
            active: this.services.filter(s => s.active).length,
            popular: this.services.filter(s => s.popular).length,
            categories: this.getCategories().length,
            avgPrice: this.services.reduce((sum, s) => sum + (s.price || 0), 0) / this.services.length
        };
    }

    /**
     * Render dashboard
     * @param {string} containerId - Container element ID
     */
    renderDashboard(containerId = 'services-dashboard') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stats = this.getStats();
        
        container.innerHTML = `
            <div class="dashboard-stats">
                <div class="stat-card">
                    <h3>Total Services</h3>
                    <div class="value">${stats.total}</div>
                </div>
                <div class="stat-card">
                    <h3>Actifs</h3>
                    <div class="value">${stats.active}</div>
                </div>
                <div class="stat-card">
                    <h3>Populaires</h3>
                    <div class="value">${stats.popular}</div>
                </div>
                <div class="stat-card">
                    <h3>Catégories</h3>
                    <div class="value">${stats.categories}</div>
                </div>
            </div>
            <div class="services-list">
                ${this.services.map(s => this.renderServiceRow(s)).join('')}
            </div>
        `;
    }

    /**
     * Render service row for dashboard
     * @param {Object} service - Service data
     * @returns {string} HTML
     */
    renderServiceRow(service) {
        return `
            <div class="service-row" data-id="${service.id}">
                <div class="service-info">
                    <h4>${service.name}</h4>
                    <span class="category">${service.category}</span>
                </div>
                <div class="service-price">${this.formatPrice(service.price)}</div>
                <div class="service-status ${service.active ? 'active' : 'inactive'}">
                    ${service.active ? 'Actif' : 'Inactif'}
                </div>
                <div class="service-actions">
                    <button class="btn-edit" data-id="${service.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${service.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    }

    /**
     * Export services
     * @param {string} format - Export format
     * @returns {string} Exported data
     */
    exportServices(format = 'json') {
        switch (format) {
            case 'json':
                return JSON.stringify(this.services, null, 2);
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    /**
     * Import services
     * @param {string} data - Import data
     * @returns {number} Number of imported services
     */
    importServices(data) {
        const imported = JSON.parse(data);
        
        if (Array.isArray(imported)) {
            imported.forEach(s => this.addService(s));
            return imported.length;
        }
        
        return 0;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServiceManager;
}

window.ServiceManager = ServiceManager;