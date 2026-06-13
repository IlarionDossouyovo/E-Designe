/**
 * E-Graphisme - Prompt Generator Module
 * Generates AI prompts for image generation
 */

class PromptGenerator {
    constructor() {
        this.templates = this.initTemplates();
        this.categoryPresets = this.initCategoryPresets();
    }

    /**
     * Initialize prompt templates
     */
    initTemplates() {
        return {
            logo: {
                structure: 'Professional logo design for BRAND, INDUSTRY style, minimalist, vector style, clean lines, scalable',
                sections: ['BRAND', 'INDUSTRY', 'STYLE', 'TECHNICAL']
            },
            banner: {
                structure: 'Banner design for BRAND, TARGET audience, PROFESSIONAL style, dynamic composition, marketing materials',
                sections: ['BRAND', 'TARGET', 'STYLE', 'COMPOSITION']
            },
            socialPost: {
                structure: 'Social media post for BRAND, TARGET, CATEGORY content, eye-catching, modern design, engagement focused',
                sections: ['BRAND', 'TARGET', 'CATEGORY', 'STYLE']
            },
            website: {
                structure: 'Website design for BRAND, TARGET, SECTION type, modern UI, professional, conversion optimized',
                sections: ['BRAND', 'TARGET', 'SECTION', 'UX']
            },
            print: {
                structure: 'Print design for BRAND, PRODUCT, MATERIAL type, print-ready, CMYK, professional quality',
                sections: ['BRAND', 'PRODUCT', 'MATERIAL', 'SPECS']
            },
            video: {
                structure: 'Video content for BRAND, TARGET, VIDEO type, motion graphics, professional editing, AI enhanced',
                sections: ['BRAND', 'TARGET', 'TYPE', 'EFFECTS']
            }
        };
    }

    /**
     * Initialize category presets
     */
    initCategoryPresets() {
        return {
            restaurant: {
                industry: 'Restaurant & Food',
                targetAudience: 'Food lovers, families, professionals',
                style: 'Appetizing, warm, inviting',
                colors: ['warm oranges', 'reds', 'creams', 'browns'],
                typography: ['display fonts', 'handwritten accents', 'clean sans-serif']
            },
            immobiler: {
                industry: 'Real Estate',
                targetAudience: 'Home buyers, investors',
                style: 'Professional, trustworthy, elegant',
                colors: ['blues', 'greens', 'golds', 'whites'],
                typography: ['serif', 'clean sans-serif']
            },
            sante: {
                industry: 'Healthcare',
                targetAudience: 'Patients, medical professionals',
                style: 'Clean, calming, professional',
                colors: ['blues', 'greens', 'whites', 'teals'],
                typography: ['clean sans-serif', 'medical']
            },
            education: {
                industry: 'Education',
                targetAudience: 'Students, parents, educators',
                style: 'Friendly, inspiring, modern',
                colors: ['blues', 'yellows', 'greens', 'oranges'],
                typography: ['rounded', 'friendly', 'clean']
            },
            mode: {
                industry: 'Fashion',
                targetAudience: 'Fashion enthusiasts, buyers',
                style: 'Chic, minimalist, editorial',
                colors: ['blacks', 'whites', 'nudes', 'accents'],
                typography: ['elegant serif', 'minimal sans']
            },
            beaute: {
                industry: 'Beauty',
                targetAudience: 'Beauty enthusiasts',
                style: 'Elegant, luxurious, soft',
                colors: ['pinks', 'golds', 'creams', 'rosés'],
                typography: ['elegant serif', 'script accents']
            },
            ecommerce: {
                industry: 'E-commerce',
                targetAudience: 'Online shoppers',
                style: 'Modern, product-focused, clear',
                colors: ['brand colors', 'whites', 'contrasts'],
                typography: ['clean sans-serif', 'productive']
            },
            fintech: {
                industry: 'Fintech',
                targetAudience: 'Investors, professionals',
                style: 'Professional, trustworthy, innovative',
                colors: ['blues', 'greens', 'darks', 'accents'],
                typography: ['modern sans-serif', 'tech']
            },
            saas: {
                industry: 'SaaS',
                targetAudience: 'Business users, developers',
                style: 'Modern, tech, clean',
                colors: ['purples', 'blues', 'gradients'],
                typography: ['tech sans-serif', 'modern']
            },
            ong: {
                industry: 'Non-profit',
                targetAudience: 'Donors, volunteers',
                style: 'Emotional, hopeful, trustworthy',
                colors: ['greens', 'blues', 'warm colors'],
                typography: ['friendly', 'approachable']
            },
            evenementiel: {
                industry: 'Events',
                targetAudience: 'Event attendees',
                style: 'Exciting, dynamic, memorable',
                colors: ['vibrant', 'festive', 'bold'],
                typography: ['display', 'decorative']
            },
            voyage: {
                industry: 'Travel',
                targetAudience: 'Travelers',
                style: 'Inspiring, adventurous, beautiful',
                colors: ['blues', 'greens', 'warm sands'],
                typography: ['travel', 'adventure']
            },
            automobile: {
                industry: 'Automotive',
                targetAudience: 'Car buyers, enthusiasts',
                style: 'Dynamic, premium, powerful',
                colors: ['reds', 'blacks', 'silvers', 'chromes'],
                typography: ['bold', 'dynamic']
            },
            tech: {
                industry: 'Technology',
                targetAudience: 'Tech users, developers',
                style: 'Modern, innovative, clean',
                colors: ['blues', 'darks', 'accents'],
                typography: ['tech', 'monospace']
            },
            sport: {
                industry: 'Sports',
                targetAudience: 'Athletes, fans',
                style: 'Energetic, dynamic, powerful',
                colors: ['team colors', 'bold contrasts'],
                typography: ['athletic', 'bold']
            },
            agence: {
                industry: 'Digital Agency',
                targetAudience: 'Businesses, startups',
                style: 'Creative, modern, professional',
                colors: ['brand colors', 'gradients'],
                typography: ['modern', 'creative']
            }
        };
    }

    /**
     * Generate OpenHands prompt
     * @param {Object} params - Prompt parameters
     * @returns {string} Generated prompt
     */
    generateOpenHandsPrompt(params) {
        const {
            project = '',
            targetAudience = 'general audience',
            style = 'modern professional',
            colors = [],
            typography = [],
            layout = 'clean and balanced',
            visualElements = [],
            lighting = 'natural and professional',
            effects = 'subtle and elegant',
            quality = 'high quality, professional',
            negativePrompt = 'low quality, blurry, distorted'
        } = params;

        // Build prompt structure
        let prompt = `PROJECT: ${project}\n`;
        prompt += `TARGET AUDIENCE: ${targetAudience}\n`;
        prompt += `STYLE: ${style}\n`;
        
        if (colors && colors.length > 0) {
            prompt += `COLORS: ${colors.join(', ')}\n`;
        }
        
        if (typography && typography.length > 0) {
            prompt += `TYPOGRAPHY: ${typography.join(', ')}\n`;
        }
        
        prompt += `LAYOUT: ${layout}\n`;
        
        if (visualElements && visualElements.length > 0) {
            prompt += `VISUAL ELEMENTS: ${visualElements.join(', ')}\n`;
        }
        
        prompt += `LIGHTING: ${lighting}\n`;
        prompt += `EFFECTS: ${effects}\n`;
        prompt += `QUALITY: ${quality}\n`;
        prompt += `NEGATIVE PROMPT: ${negativePrompt}`;

        return prompt;
    }

    /**
     * Generate prompt from template
     * @param {string} templateName - Template name
     * @param {Object} data - Template data
     * @returns {string} Generated prompt
     */
    generateFromTemplate(templateName, data) {
        const template = this.templates[templateName];
        if (!template) {
            throw new Error(`Template not found: ${templateName}`);
        }

        let prompt = template.structure;
        
        // Replace placeholders with data
        Object.keys(data).forEach(key => {
            const placeholder = key.toUpperCase();
            prompt = prompt.replace(placeholder, data[key]);
        });

        return prompt;
    }

    /**
     * Generate prompt for category
     * @param {string} category - Industry category
     * @param {Object} customData - Custom data to override presets
     * @returns {string} Generated prompt
     */
    generateForCategory(category, customData = {}) {
        const preset = this.categoryPresets[category];
        if (!preset) {
            throw new Error(`Category not found: ${category}`);
        }

        const data = {
            ...preset,
            ...customData
        };

        return this.generateOpenHandsPrompt({
            project: data.industry,
            targetAudience: data.targetAudience,
            style: data.style,
            colors: data.colors,
            typography: data.typography
        });
    }

    /**
     * Generate logo prompt
     * @param {string} brandName - Brand name
     * @param {string} industry - Industry
     * @param {string} style - Style preference
     * @returns {string} Generated logo prompt
     */
    generateLogoPrompt(brandName, industry, style = 'modern minimalist') {
        return this.generateOpenHandsPrompt({
            project: `${brandName} logo design`,
            targetAudience: industry,
            style: `${style}, professional, vector format`,
            colors: ['brand colors'],
            typography: ['primary font', 'secondary font'],
            layout: 'centered, balanced, iconic',
            visualElements: ['icon', 'wordmark', 'tagline'],
            lighting: 'flat design',
            effects: 'minimal shadows',
            quality: 'vector, scalable, print-ready'
        });
    }

    /**
     * Generate social media prompt
     * @param {string} brandName - Brand name
     * @param {string} platform - Platform (instagram, facebook, etc.)
     * @param {string} contentType - Content type
     * @returns {string} Generated prompt
     */
    generateSocialPrompt(brandName, platform, contentType) {
        const platformSizes = {
            instagram: { post: '1080x1080', story: '1080x1920' },
            facebook: { post: '1200x630', cover: '820x312' },
            twitter: { post: '1200x675', header: '1500x500' },
            linkedin: { post: '1200x627', banner: '1584x396' },
            tiktok: { post: '1080x1920' },
            youtube: { thumbnail: '1280x720', cover: '2560x1440' }
        };

        const size = platformSizes[platform]?.[contentType] || '1080x1080';

        return this.generateOpenHandsPrompt({
            project: `${brandName} ${platform} ${contentType}`,
            targetAudience: 'social media users',
            style: 'engaging, eye-catching, modern',
            colors: ['brand colors', 'high contrast'],
            typography: ['readable at small sizes'],
            layout: `${size}, centered content, safe zones`,
            visualElements: ['text overlay', 'visual hierarchy'],
            lighting: 'natural',
            effects: 'subtle gradients',
            quality: 'high resolution, web optimized'
        });
    }

    /**
     * Generate website section prompt
     * @param {string} brandName - Brand name
     * @param {string} sectionType - Section type (hero, about, etc.)
     * @returns {string} Generated prompt
     */
    generateWebsitePrompt(brandName, sectionType) {
        const sectionConfigs = {
            hero: {
                layout: 'full-width, large headline, CTA button',
                visualElements: ['hero image', 'headline', 'subheadline', 'buttons']
            },
            about: {
                layout: 'split layout, text and image',
                visualElements: ['team photo', 'company story', 'values']
            },
            services: {
                layout: 'grid layout, cards',
                visualElements: ['service cards', 'icons', 'descriptions']
            },
            contact: {
                layout: 'form centered, contact info',
                visualElements: ['contact form', 'map', 'info']
            },
            footer: {
                layout: 'multi-column, links and social',
                visualElements: ['logo', 'links', 'social icons', 'newsletter']
            }
        };

        const config = sectionConfigs[sectionType] || sectionConfigs.hero;

        return this.generateOpenHandsPrompt({
            project: `${brandName} website ${sectionType} section`,
            targetAudience: 'website visitors',
            style: 'modern, professional, conversion-focused',
            colors: ['brand colors', 'neutral backgrounds'],
            typography: ['web-safe fonts', 'readable sizes'],
            layout: config.layout,
            visualElements: config.visualElements,
            lighting: 'consistent',
            effects: 'subtle animations',
            quality: 'responsive, retina ready'
        });
    }

    /**
     * Generate video prompt
     * @param {string} brandName - Brand name
     * @param {string} videoType - Video type
     * @param {number} duration - Duration in seconds
     * @returns {string} Generated prompt
     */
    generateVideoPrompt(brandName, videoType, duration = 30) {
        const videoTypes = {
            intro: 'opening animation with logo',
            promo: 'promotional content with call-to-action',
            testimonial: 'customer testimonial video',
            demo: 'product demonstration',
            explainer: 'explainer animation',
            social: 'short-form social content'
        };

        return this.generateOpenHandsPrompt({
            project: `${brandName} ${videoType} video`,
            targetAudience: 'target demographic',
            style: 'professional, engaging, brand-aligned',
            colors: ['brand colors', 'consistent palette'],
            typography: ['animated text', 'readable subtitles'],
            layout: `${duration}s, ${videoTypes[videoType] || videoTypes.promo}`,
            visualElements: ['transitions', 'text animations', 'brand elements'],
            lighting: 'professional grading',
            effects: 'motion graphics, smooth transitions',
            quality: '4K, professional editing'
        });
    }

    /**
     * Get available categories
     * @returns {Array} List of category names
     */
    getCategories() {
        return Object.keys(this.categoryPresets);
    }

    /**
     * Get category preset
     * @param {string} category - Category name
     * @returns {Object} Category preset
     */
    getCategoryPreset(category) {
        return this.categoryPresets[category];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptGenerator;
}

// Create global instance
window.PromptGenerator = PromptGenerator;