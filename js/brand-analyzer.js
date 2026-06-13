/**
 * E-Graphisme - Brand Analyzer Module
 * Analyzes websites to extract branding elements
 */

class BrandAnalyzer {
    constructor() {
        this.cache = new Map();
        this.apiEndpoint = '/php/ai-api.php';
    }

    /**
     * Analyze a website URL and extract branding elements
     * @param {string} url - Website URL to analyze
     * @returns {Promise<Object>} Brand analysis result
     */
    async analyzeWebsite(url) {
        if (!url) {
            throw new Error('URL is required');
        }

        // Normalize URL
        url = this.normalizeUrl(url);
        
        // Check cache
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }

        try {
            // Fetch website HTML
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'analyze_website',
                    url: url
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Cache result
            this.cache.set(url, data);
            
            return data;
        } catch (error) {
            console.error('Brand analysis error:', error);
            throw error;
        }
    }

    /**
     * Extract colors from website
     * @param {string} url - Website URL
     * @returns {Promise<Array>} Array of color objects
     */
    async extractColors(url) {
        const analysis = await this.analyzeWebsite(url);
        return analysis.primaryColors || [];
    }

    /**
     * Extract fonts from website
     * @param {string} url - Website URL
     * @returns {Promise<Array>} Array of font objects
     */
    async extractFonts(url) {
        const analysis = await this.analyzeWebsite(url);
        return analysis.fonts || [];
    }

    /**
     * Extract images from website
     * @param {string} url - Website URL
     * @returns {Promise<Array>} Array of image URLs
     */
    async extractImages(url) {
        const analysis = await this.analyzeWebsite(url);
        return analysis.images || [];
    }

    /**
     * Extract logo from website
     * @param {string} url - Website URL
     * @returns {Promise<string>} Logo URL
     */
    async extractLogo(url) {
        const analysis = await this.analyzeWebsite(url);
        return analysis.logo || null;
    }

    /**
     * Extract products and services from website
     * @param {string} url - Website URL
     * @returns {Promise<Array>} Array of products/services
     */
    async extractProductsServices(url) {
        const analysis = await this.analyzeWebsite(url);
        return {
            products: analysis.products || [],
            services: analysis.services || []
        };
    }

    /**
     * Generate brand report
     * @param {string} url - Website URL
     * @returns {Promise<Object>} Complete brand report
     */
    async generateBrandReport(url) {
        const analysis = await this.analyzeWebsite(url);
        
        return {
            brandName: analysis.brandName || 'Unknown',
            industry: analysis.industry || 'Unknown',
            targetAudience: analysis.targetAudience || 'General',
            logo: analysis.logo,
            primaryColors: analysis.primaryColors || [],
            secondaryColors: analysis.secondaryColors || [],
            fonts: analysis.fonts || [],
            images: analysis.images || [],
            products: analysis.products || [],
            services: analysis.services || [],
            socialMedia: analysis.socialMedia || {},
            contact: analysis.contact || {},
            analyzedAt: new Date().toISOString()
        };
    }

    /**
     * Normalize URL
     * @param {string} url - URL to normalize
     * @returns {string} Normalized URL
     */
    normalizeUrl(url) {
        if (!url) return '';
        
        // Add protocol if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        // Remove trailing slash
        url = url.replace(/\/$/, '');
        
        return url;
    }

    /**
     * Export brand kit
     * @param {Object} brandData - Brand data to export
     * @param {string} format - Export format (json, css, scss)
     * @returns {string} Exported content
     */
    exportBrandKit(brandData, format = 'json') {
        switch (format) {
            case 'json':
                return JSON.stringify(brandData, null, 2);
            
            case 'css':
                return this.toCSSVariables(brandData);
            
            case 'scss':
                return this.toSCSSVariables(brandData);
            
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    /**
     * Convert brand data to CSS variables
     * @param {Object} brandData - Brand data
     * @returns {string} CSS variables
     */
    toCSSVariables(brandData) {
        let css = ':root {\n';
        
        // Colors
        if (brandData.primaryColors) {
            brandData.primaryColors.forEach((color, index) => {
                css += `  --primary-color-${index + 1}: ${color.hex};\n`;
            });
        }
        
        if (brandData.secondaryColors) {
            brandData.secondaryColors.forEach((color, index) => {
                css += `  --secondary-color-${index + 1}: ${color.hex};\n`;
            });
        }
        
        // Fonts
        if (brandData.fonts) {
            brandData.fonts.forEach((font, index) => {
                css += `  --font-family-${index + 1}: '${font.name}', ${font.category};\n`;
            });
        }
        
        css += '}\n';
        return css;
    }

    /**
     * Convert brand data to SCSS variables
     * @param {Object} brandData - Brand data
     * @returns {string} SCSS variables
     */
    toSCSSVariables(brandData) {
        let scss = '// Brand Colors\n';
        
        if (brandData.primaryColors) {
            brandData.primaryColors.forEach((color, index) => {
                scss += `$primary-color-${index + 1}: ${color.hex};\n`;
            });
        }
        
        if (brandData.secondaryColors) {
            scss += '\n// Secondary Colors\n';
            brandData.secondaryColors.forEach((color, index) => {
                scss += `$secondary-color-${index + 1}: ${color.hex};\n`;
            });
        }
        
        if (brandData.fonts) {
            scss += '\n// Fonts\n';
            brandData.fonts.forEach((font, index) => {
                scss += `$font-family-${index + 1}: '${font.name}', ${font.category};\n`;
            });
        }
        
        return scss;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrandAnalyzer;
}

// Create global instance
window.BrandAnalyzer = BrandAnalyzer;