/**
 * E-Graphisme - Template Generator Module
 * Auto-generates templates for various platforms and use cases
 */

class TemplateGenerator {
    constructor() {
        this.templates = this.initTemplates();
    }

    /**
     * Initialize template definitions
     */
    initTemplates() {
        return {
            // Social Media Templates
            facebookPost: {
                name: 'Facebook Post',
                width: 1200,
                height: 630,
                category: 'social',
                platforms: ['facebook']
            },
            facebookCover: {
                name: 'Facebook Cover',
                width: 820,
                height: 312,
                category: 'social',
                platforms: ['facebook']
            },
            instagramPost: {
                name: 'Instagram Post',
                width: 1080,
                height: 1080,
                category: 'social',
                platforms: ['instagram']
            },
            instagramStory: {
                name: 'Instagram Story',
                width: 1080,
                height: 1920,
                category: 'social',
                platforms: ['instagram']
            },
            tiktokCover: {
                name: 'TikTok Cover',
                width: 1080,
                height: 1920,
                category: 'social',
                platforms: ['tiktok']
            },
            youtubeThumbnail: {
                name: 'YouTube Thumbnail',
                width: 1280,
                height: 720,
                category: 'video',
                platforms: ['youtube']
            },
            
            // Print Templates
            flyer: {
                name: 'Flyer',
                width: 2480,
                height: 3508,
                category: 'print',
                units: 'px',
                resolution: 300
            },
            affiche: {
                name: 'Affiche',
                width: 3508,
                height: 4961,
                category: 'print',
                units: 'px',
                resolution: 300
            },
            brochure: {
                name: 'Brochure',
                width: 3508,
                height: 4961,
                category: 'print',
                units: 'px',
                resolution: 300
            },
            catalogue: {
                name: 'Catalogue',
                width: 3508,
                height: 4961,
                category: 'print',
                units: 'px',
                resolution: 300
            },
            carteVisite: {
                name: 'Carte de Visite',
                width: 1050,
                height: 600,
                category: 'print',
                units: 'px',
                resolution: 300
            },
            
            // Web Templates
            landingPage: {
                name: 'Landing Page',
                width: 1920,
                height: 1080,
                category: 'web',
                responsive: true
            },
            dashboardSaaS: {
                name: 'Dashboard SaaS',
                width: 1920,
                height: 1080,
                category: 'web',
                responsive: true
            },
            applicationMobile: {
                name: 'Application Mobile',
                width: 375,
                height: 812,
                category: 'mobile',
                responsive: true
            },
            banniereWeb: {
                name: 'Bannière Web',
                width: 728,
                height: 90,
                category: 'advertising',
                responsive: true
            },
            
            // Business Templates
            presentationBusiness: {
                name: 'Présentation Business',
                width: 1920,
                height: 1080,
                category: 'business',
                aspectRatio: '16:9'
            },
            
            // Design Templates
            packaging: {
                name: 'Packaging',
                width: 2480,
                height: 3508,
                category: 'design',
                units: 'px',
                resolution: 300
            },
            publicite: {
                name: 'Publicité',
                width: 1920,
                height: 1080,
                category: 'advertising',
                responsive: true
            },
            
            // Motion Templates
            motionDesign: {
                name: 'Motion Design',
                width: 1920,
                height: 1080,
                category: 'video',
                duration: 10
            }
        };
    }

    /**
     * Get all templates
     * @returns {Object} All templates
     */
    getAllTemplates() {
        return this.templates;
    }

    /**
     * Get template by name
     * @param {string} name - Template name
     * @returns {Object} Template definition
     */
    getTemplate(name) {
        return this.templates[name];
    }

    /**
     * Get templates by category
     * @param {string} category - Category name
     * @returns {Array} Templates in category
     */
    getTemplatesByCategory(category) {
        return Object.values(this.templates).filter(t => t.category === category);
    }

    /**
     * Get templates by platform
     * @param {string} platform - Platform name
     * @returns {Array} Templates for platform
     */
    getTemplatesByPlatform(platform) {
        return Object.values(this.templates).filter(t => 
            t.platforms && t.platforms.includes(platform)
        );
    }

    /**
     * Generate template configuration
     * @param {string} templateName - Template name
     * @param {Object} brandData - Brand data
     * @returns {Object} Template configuration
     */
    generateTemplateConfig(templateName, brandData = {}) {
        const template = this.templates[templateName];
        if (!template) {
            throw new Error(`Template not found: ${templateName}`);
        }

        const config = {
            ...template,
            brandData: brandData,
            generatedAt: new Date().toISOString(),
            id: `tpl_${Date.now()}_${templateName}`
        };

        return config;
    }

    /**
     * Generate CSS for template
     * @param {Object} template - Template definition
     * @param {Object} brandData - Brand data
     * @returns {string} CSS styles
     */
    generateCSS(template, brandData = {}) {
        const colors = brandData.primaryColors || ['#00D4FF', '#7B2FFF'];
        const fonts = brandData.fonts || ['Inter', 'sans-serif'];
        
        return `
            .template-${template.name.toLowerCase().replace(/\s+/g, '-')} {
                width: ${template.width}px;
                height: ${template.height}px;
                font-family: ${fonts[0]}, ${fonts[1] || 'sans-serif'};
                background: linear-gradient(135deg, ${colors[0]} 0%, ${colors[1] || colors[0]} 100%);
                position: relative;
                overflow: hidden;
            }
        `;
    }

    /**
     * Generate HTML for template
     * @param {Object} template - Template definition
     * @param {Object} content - Content data
     * @returns {string} HTML structure
     */
    generateHTML(template, content = {}) {
        return `
            <div class="template-container" style="width: ${template.width}px; height: ${template.height}px;">
                <div class="template-content">
                    ${content.headline ? `<h1 class="headline">${content.headline}</h1>` : ''}
                    ${content.subheadline ? `<p class="subheadline">${content.subheadline}</p>` : ''}
                    ${content.cta ? `<button class="cta">${content.cta}</button>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Get categories
     * @returns {Array} List of categories
     */
    getCategories() {
        const categories = new Set(Object.values(this.templates).map(t => t.category));
        return Array.from(categories);
    }

    /**
     * Get platforms
     * @returns {Array} List of platforms
     */
    getPlatforms() {
        const platforms = new Set();
        Object.values(this.templates).forEach(t => {
            if (t.platforms) {
                t.platforms.forEach(p => platforms.add(p));
            }
        });
        return Array.from(platforms);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateGenerator;
}

// Create global instance
window.TemplateGenerator = TemplateGenerator;