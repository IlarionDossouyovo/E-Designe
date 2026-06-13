/**
 * E-Graphisme - Portfolio Manager Module
 * Manages portfolio projects with categories, filters, and dynamic display
 */

class PortfolioManager {
    constructor() {
        this.projects = [];
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.sortBy = 'date';
        this.sortOrder = 'desc';
        this.storageKey = 'e_graphisme_portfolio';
    }

    /**
     * Initialize portfolio manager
     */
    async init() {
        await this.loadProjects();
        this.setupEventListeners();
        return this;
    }

    /**
     * Load projects from storage or API
     */
    async loadProjects() {
        try {
            // Try to load from localStorage first
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.projects = JSON.parse(stored);
            } else {
                // Load from API
                const response = await fetch('/php/api.php?action=get_portfolio');
                if (response.ok) {
                    const data = await response.json();
                    this.projects = data.projects || [];
                }
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            this.projects = [];
        }
    }

    /**
     * Save projects to storage
     */
    saveProjects() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    }

    /**
     * Add new project
     * @param {Object} project - Project data
     * @returns {Object} Added project
     */
    addProject(project) {
        const newProject = {
            id: 'proj_' + Date.now(),
            title: project.title || 'Untitled Project',
            description: project.description || '',
            images: project.images || [],
            videos: project.videos || [],
            tags: project.tags || [],
            services: project.services || [],
            category: project.category || 'design',
            client: project.client || '',
            date: project.date || new Date().toISOString(),
            featured: project.featured || false,
            ...project
        };

        this.projects.unshift(newProject);
        this.saveProjects();
        
        return newProject;
    }

    /**
     * Update project
     * @param {string} id - Project ID
     * @param {Object} data - Updated data
     * @returns {Object} Updated project
     */
    updateProject(id, data) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Project not found');
        }

        this.projects[index] = {
            ...this.projects[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        
        this.saveProjects();
        return this.projects[index];
    }

    /**
     * Delete project
     * @param {string} id - Project ID
     * @returns {boolean} Success
     */
    deleteProject(id) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index === -1) {
            return false;
        }

        this.projects.splice(index, 1);
        this.saveProjects();
        return true;
    }

    /**
     * Get project by ID
     * @param {string} id - Project ID
     * @returns {Object} Project
     */
    getProject(id) {
        return this.projects.find(p => p.id === id);
    }

    /**
     * Get all projects
     * @param {Object} filters - Filter options
     * @returns {Array} Filtered projects
     */
    getProjects(filters = {}) {
        let filtered = [...this.projects];

        // Apply category filter
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        // Apply tag filter
        if (filters.tag) {
            filtered = filtered.filter(p => 
                p.tags && p.tags.includes(filters.tag)
            );
        }

        // Apply search
        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search) ||
                p.tags.some(t => t.toLowerCase().includes(search))
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aVal = a[this.sortBy];
            let bVal = b[this.sortBy];

            if (this.sortBy === 'date') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }

            if (this.sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        return filtered;
    }

    /**
     * Get filtered projects (using current filters)
     * @returns {Array} Filtered projects
     */
    getFilteredProjects() {
        return this.getProjects({
            category: this.currentCategory,
            search: this.currentSearch
        });
    }

    /**
     * Set filter
     * @param {string} filter - Filter type
     * @param {string} value - Filter value
     */
    setFilter(filter, value) {
        this.currentFilter = filter;
        this[filter] = value;
        this.render();
    }

    /**
     * Get categories
     * @returns {Array} Unique categories
     */
    getCategories() {
        const categories = new Set(this.projects.map(p => p.category));
        return ['all', ...Array.from(categories)];
    }

    /**
     * Get all tags
     * @returns {Array} Unique tags
     */
    getTags() {
        const tags = new Set();
        this.projects.forEach(p => {
            if (p.tags) {
                p.tags.forEach(t => tags.add(t));
            }
        });
        return Array.from(tags);
    }

    /**
     * Render portfolio grid
     * @param {string} containerId - Container element ID
     */
    render(containerId = 'portfolio-grid') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const projects = this.getFilteredProjects();
        
        if (projects.length === 0) {
            container.innerHTML = '<div class="no-projects">Aucun projet trouvé</div>';
            return;
        }

        container.innerHTML = projects.map(project => this.renderProjectCard(project)).join('');
        
        // Setup lightbox
        this.setupLightbox(container);
    }

    /**
     * Render project card HTML
     * @param {Object} project - Project data
     * @returns {string} HTML
     */
    renderProjectCard(project) {
        const image = project.images && project.images[0] 
            ? project.images[0] 
            : '/images/placeholder.svg';
            
        return `
            <div class="portfolio-item" data-id="${project.id}">
                <div class="portfolio-image">
                    <img src="${image}" alt="${project.title}" loading="lazy">
                    <div class="portfolio-overlay">
                        <h3>${project.title}</h3>
                        <p>${project.category}</p>
                        <button class="btn-view" data-id="${project.id}">Voir</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Setup lightbox
     * @param {HTMLElement} container - Container element
     */
    setupLightbox(container) {
        const items = container.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                this.openLightbox(id);
            });
        });
    }

    /**
     * Open lightbox
     * @param {string} projectId - Project ID
     */
    openLightbox(projectId) {
        const project = this.getProject(projectId);
        if (!project) return;

        // Create lightbox modal
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-images">
                    ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
                </div>
                <div class="lightbox-info">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        
        // Close handlers
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.remove();
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                const value = btn.dataset.value || filter;
                this.setFilter(filter, value);
            });
        });
    }

    /**
     * Export projects
     * @param {string} format - Export format
     * @returns {string} Exported data
     */
    exportProjects(format = 'json') {
        switch (format) {
            case 'json':
                return JSON.stringify(this.projects, null, 2);
            case 'csv':
                return this.toCSV();
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    /**
     * Convert to CSV
     * @returns {string} CSV data
     */
    toCSV() {
        const headers = ['id', 'title', 'description', 'category', 'tags', 'client', 'date'];
        const rows = this.projects.map(p => 
            headers.map(h => {
                let val = p[h];
                if (Array.isArray(val)) val = val.join(';');
                return `"${val || ''}"`;
            }).join(',')
        );
        
        return [headers.join(','), ...rows].join('\n');
    }

    /**
     * Import projects
     * @param {string} data - Import data
     * @param {string} format - Format
     * @returns {number} Number of imported projects
     */
    importProjects(data, format = 'json') {
        let imported = [];
        
        switch (format) {
            case 'json':
                imported = JSON.parse(data);
                break;
            default:
                throw new Error(`Unsupported format: ${format}`);
        }

        imported.forEach(p => this.addProject(p));
        return imported.length;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioManager;
}

window.PortfolioManager = PortfolioManager;