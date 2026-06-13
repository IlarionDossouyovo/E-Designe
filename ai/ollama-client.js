/**
 * E-Graphisme - Ollama Client
 * Client pour Ollama AI
 */

class OllamaClient {
    constructor() {
        this.host = localStorage.getItem('ollama_host') || 'http://localhost:11434';
        this.model = localStorage.getItem('ollama_model') || 'llama3';
    }

    /**
     * Configurer Ollama
     */
    configure(host, model) {
        this.host = host;
        this.model = model;
        localStorage.setItem('ollama_host', host);
        localStorage.setItem('ollama_model', model);
    }

    /**
     * Générer une réponse
     */
    async generate(prompt, options = {}) {
        try {
            const response = await fetch(`${this.host}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: options.model || this.model,
                    prompt: prompt,
                    stream: false,
                    ...options
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ollama error:', error);
            throw error;
        }
    }

    /**
     * Lister les modèles disponibles
     */
    async listModels() {
        try {
            const response = await fetch(`${this.host}/api/tags`);
            return await response.json();
        } catch (error) {
            return { models: [] };
        }
    }

    /**
     * Analyser du texte
     */
    async analyze(text, instruction) {
        return this.generate(`${instruction}\n\nText: ${text}`);
    }

    /**
     * Résumer
     */
    async summarize(text) {
        return this.generate(`Résume ce texte de manière concise: ${text}`);
    }

    /**
     * Traduire
     */
    async translate(text, targetLang) {
        return this.generate(`Traduis en ${targetLang}: ${text}`);
    }
}

window.ollamaClient = new OllamaClient();