/**
 * E-Graphisme - N8N Client
 * Client pour intégrer avec N8N
 */

class N8NClient {
    constructor() {
        this.webhookUrl = localStorage.getItem('n8n_webhook_url') || '';
    }

    /**
     * Configurer le webhook N8N
     */
    configure(webhookUrl) {
        this.webhookUrl = webhookUrl;
        localStorage.setItem('n8n_webhook_url', webhookUrl);
    }

    /**
     * Appeler un workflow N8N
     */
    async trigger(workflow, data = {}) {
        if (!this.webhookUrl) {
            throw new Error('N8N webhook non configuré');
        }

        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workflow, data })
            });

            return await response.json();
        } catch (error) {
            console.error('N8N error:', error);
            throw error;
        }
    }

    /**
     * Analyser une marque
     */
    async analyzeBrand(url) {
        return this.trigger('analyze-brand', { url });
    }

    /**
     * Générer un prompt
     */
    async generatePrompt(type, data) {
        return this.trigger('generate-prompt', { type, ...data });
    }

    /**
     * Générer une image
     */
    async generateImage(prompt) {
        return this.trigger('generate-image', { prompt });
    }

    /**
     * Générer une vidéo
     */
    async generateVideo(prompt, duration = 30) {
        return this.trigger('generate-video', { prompt, duration });
    }
}

window.n8nClient = new N8NClient();