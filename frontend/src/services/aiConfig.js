// Configuration centrale des Agents IA E-DÉSIGNE
// Chaque agent est connecté à un modèle Ollama spécifique

export const OLLAMA_CONFIG = {
  baseURL: 'http://localhost:11434',
  timeout: 30000,
  
  // Configuration des modèles par agent
  models: {
    chatbot: {
      name: 'llama2',
      displayName: 'Llama 2',
      purpose: 'Assistant conversationnel principal',
      temperature: 0.7,
      maxTokens: 500
    },
    search: {
      name: 'mistral',
      displayName: 'Mistral',
      purpose: 'Recherche intelligente et recommandations',
      temperature: 0.5,
      maxTokens: 300
    },
    recommendations: {
      name: 'mistral',
      displayName: 'Mistral',
      purpose: 'Système de recommandations personnalisées',
      temperature: 0.6,
      maxTokens: 400
    },
    analytics: {
      name: 'llama2',
      displayName: 'Llama 2',
      purpose: 'Analyse prédictive et statistiques',
      temperature: 0.3,
      maxTokens: 600
    },
    inventory: {
      name: 'phi3',
      displayName: 'Phi-3',
      purpose: 'Gestion des stocks et alertes',
      temperature: 0.2,
      maxTokens: 400
    },
    fraud: {
      name: 'llama2',
      displayName: 'Llama 2',
      purpose: 'Détection de fraude et sécurité',
      temperature: 0.1,
      maxTokens: 300
    },
    emails: {
      name: 'mistral',
      displayName: 'Mistral',
      purpose: 'Génération d\'emails et templates',
      temperature: 0.6,
      maxTokens: 500
    },
    social: {
      name: 'codellama',
      displayName: 'CodeLlama',
      purpose: 'Planification et création de contenu',
      temperature: 0.8,
      maxTokens: 600
    },
    embeddings: {
      name: 'nomic-embed-text',
      displayName: 'Nomic Embed Text',
      purpose: 'Recherche vectorielle et embeddings',
      temperature: 0,
      maxTokens: 0
    }
  }
}

// Instructions système pour chaque agent
export const AGENT_PROMPTS = {
  chatbot: `Tu es l'assistant virtuel officiel de E-DÉSIGNE, une plateforme e-commerce dropshipping basée au Bénin.
Tu dois être professionnel, aimable ethelpful.
Produits: Vêtements, accessoires, electronics.
Paiements: Stripe, PayPal, Mobile Money (MTN/Moov).
Livraison: standard (5-7 jours), express (2-3 jours), point relais.
Retours: 14 jours satisfait ou remboursé.
Réponds en français de manière concise.`,

  search: `Tu es un assistant de recherche intelligent pour E-DÉSIGNE.
Analyse les requêtes utilisateurs et propose des produits pertinents.
Categories: Vetements, Accessoires, Electronique, Maison.
Filtres disponibles: prix, taille, couleur, marque.
Propose des alternatives si le produit n'existe pas.`,

  recommendations: `Tu es le système de recommandations personnalisées de E-DÉSIGNE.
Analyse le comportement utilisateur (historique, wishlist, panier).
Propose des produits similaires, des cross-sells et des up-sells.
Justifie tes recommandations avec des raisons concrètes.
Prends en compte les préférences exprimées.`,

  analytics: `Tu es l'agent analytique de E-DÉSIGNE.
Interprète les données de vente et comportement client.
Fournis des insights actionnables et des prédictions.
Utilise un langage clair pour expliquer les statistiques.
Propose des recommandations pour améliorer les KPIs.`,

  inventory: `Tu es l'agent de gestion des stocks de E-DÉSIGNE.
Surveille les niveaux d'inventaire en temps réel.
Génère des alertes pour les produits en rupture ou stock bas.
Suggère des actions de réapprovisionnement.
Calcule les seuils critiques selon la demande.`,

  fraud: `Tu es l'agent de détection de fraude de E-DÉSIGNE.
Analyse les transactions pour identifier les comportements suspects.
Critères: vitesse de commande, montant, adresse IP, historique.
Score de risque de 0 (sûr) à 100 (frauduleux).
Bloque automatiquement les transactions à risque > 80.
Signale les cas ambigus pour révision manuelle.`,

  emails: `Tu es l'agent d'automatisation emails de E-DÉSIGNE.
Génère des emails transactionnels professionnels.
Types: bienvenue, confirmation, livraison, abandon panier, avis.
Utilise un ton adaptatif (professionnel, amical, promotionnel).
Inclut toujours un call-to-action clair.`,

  social: `Tu es l'agent de gestion des réseaux sociaux de E-DÉSIGNE.
Crée du contenu engageant pour Instagram, Facebook, Pinterest, Twitter.
Respecte le calendrier de publication:
- Instagram: nouveaux produits 10h00
- Facebook: promotions Lun/Mer/Ven
- Pinterest: lookbook hebdomadaire
- Twitter: deals quotidiens
Utilise des hashtags pertinents et engageants.`
}

// Fonction pour appeler Ollama avec un agent spécifique
export async function callOllama(agentType, userMessage, context = {}) {
  const config = OLLAMA_CONFIG.models[agentType] || OLLAMA_CONFIG.models.chatbot
  const systemPrompt = AGENT_PROMPTS[agentType] || AGENT_PROMPTS.chatbot
  
  try {
    const fullPrompt = `## Instructions\n${systemPrompt}\n\n## Contexte\n${JSON.stringify(context)}\n\n## Message utilisateur\n${userMessage}`
    
    const response = await fetch(`${OLLAMA_CONFIG.baseURL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.name,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: config.temperature,
          num_predict: config.maxTokens
        }
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      return { success: true, response: data.response, model: config.name }
    } else {
      throw new Error(`Ollama error: ${response.status}`)
    }
  } catch (error) {
    console.error(`Erreur ${agentType}:`, error)
    return { success: false, error: error.message, model: config.name }
  }
}

// Vérifier la connexion Ollama
export async function checkOllamaStatus() {
  try {
    const response = await fetch(`${OLLAMA_CONFIG.baseURL}/api/tags`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (response.ok) {
      const data = await response.json()
      const installedModels = data.models?.map(m => m.name) || []
      
      return {
        connected: true,
        models: installedModels,
        required: Object.values(OLLAMA_CONFIG.models).map(m => m.name),
        missing: Object.values(OLLAMA_CONFIG.models)
          .map(m => m.name)
          .filter(name => !installedModels.includes(name))
      }
    }
    return { connected: false, models: [], required: [], missing: [] }
  } catch (error) {
    return { connected: false, error: error.message }
  }
}

export default { OLLAMA_CONFIG, AGENT_PROMPTS, callOllama, checkOllamaStatus }
