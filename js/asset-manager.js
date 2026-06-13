/**
 * E-Graphisme - Asset Manager
 * Gestion des assets et bibliothèque média
 */

class AssetManager {
    constructor() {
        this.assets = {
            brands: [],
            logos: [],
            images: [],
            videos: [],
            icons: [],
            uploads: [],
            templates: []
        };
        this.loadAssets();
    }

    /**
     * Charger les assets depuis le stockage local
     */
    loadAssets() {
        Object.keys(this.assets).forEach(type => {
            const stored = localStorage.getItem(`assets_${type}`);
            if (stored) {
                this.assets[type] = JSON.parse(stored);
            }
        });
    }

    /**
     * Sauvegarder les assets
     */
    saveAssets(type) {
        localStorage.setItem(`assets_${type}`, JSON.stringify(this.assets[type]));
    }

    /**
     * Ajouter un asset
     */
    addAsset(type, asset) {
        const newAsset = {
            id: `asset_${Date.now()}`,
            ...asset,
            createdAt: new Date().toISOString()
        };
        
        this.assets[type].unshift(newAsset);
        this.saveAssets(type);
        
        return newAsset;
    }

    /**
     * Obtenir les assets par type
     */
    getAssets(type) {
        return this.assets[type] || [];
    }

    /**
     * Supprimer un asset
     */
    removeAsset(type, id) {
        this.assets[type] = this.assets[type].filter(a => a.id !== id);
        this.saveAssets(type);
    }

    /**
     * Rechercher des assets
     */
    searchAssets(query, types = null) {
        const results = [];
        const searchTypes = types || Object.keys(this.assets);
        
        searchTypes.forEach(type => {
            this.assets[type].forEach(asset => {
                if (asset.name?.toLowerCase().includes(query.toLowerCase()) ||
                    asset.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))) {
                    results.push({ ...asset, type });
                }
            });
        });
        
        return results;
    }

    /**
     * Importer une image (base64)
     */
    async importImage(file, type = 'uploads') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const asset = this.addAsset(type, {
                    name: file.name,
                    data: reader.result,
                    type: file.type,
                    size: file.size,
                    tags: []
                });
                resolve(asset);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Exporter les assets
     */
    exportAssets(format = 'json') {
        return JSON.stringify(this.assets, null, 2);
    }

    /**
     * Obtenir les statistiques
     */
    getStats() {
        return Object.keys(this.assets).map(type => ({
            type,
            count: this.assets[type].length
        }));
    }
}

window.assetManager = new AssetManager();