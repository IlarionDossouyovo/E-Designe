import { NextResponse } from 'next/server'
import { generateChatCompletion, ChatMessage, AVAILABLE_MODELS } from '@/lib/ai/ollama'
import { 
  chatWithGoogleAI, 
  GEMINI_MODELS, 
  loadAISettings,
  professionalPrompts 
} from '@/lib/ai/google-ai'
import { z } from 'zod'

// All 12 agents
const AGENTS = [
  'CEO', 'Commercial', 'Marketing', 'Designer', 'Developer', 
  'Motion', 'CommunityManager', 'Finance', 'Support', 
  'DevOps', 'CyberSecurity', 'DataAnalyst'
] as const

// AI Provider type
type AIProvider = 'ollama' | 'google' | 'auto'

interface AISettings {
  provider: AIProvider
  defaultModel: string
  googleApiKey: string
  ollamaUrl: string
  temperature: number
  maxTokens: number
}

// Get settings helper
function getAISettings(): AISettings {
  const defaultSettings: AISettings = {
    provider: 'auto',
    defaultModel: 'gemini-1.5-flash',
    googleApiKey: process.env.GOOGLE_AI_API_KEY || '',
    ollamaUrl: process.env.OLLAMA_API_URL || 'http://127.0.0.1:11434',
    temperature: 0.7,
    maxTokens: 2048
  }
  
  // Try to load from file system in production
  try {
    const fs = require('fs')
    const path = require('path')
    const settingsPath = path.join(process.cwd(), 'data', 'settings.json')
    if (fs.existsSync(settingsPath)) {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'))
      return {
        ...defaultSettings,
        provider: settings.ai?.provider || 'auto',
        defaultModel: settings.ai?.defaultModel || 'gemini-1.5-flash',
        googleApiKey: settings.apiKeys?.googleAi || process.env.GOOGLE_AI_API_KEY || '',
        ollamaUrl: settings.apiKeys?.ollama?.baseUrl || process.env.OLLAMA_API_URL || 'http://127.0.0.1:11434',
        temperature: settings.ai?.temperature || 0.7,
        maxTokens: settings.ai?.maxTokens || 2048
      }
    }
  } catch (e) {
    // Use defaults
  }
  
  return defaultSettings
}

const chatSchema = z.object({
  agent: z.enum(AGENTS),
  message: z.string().min(1, 'Le message est requis'),
  // AI Provider selection
  provider: z.enum(['ollama', 'google', 'auto']).optional(),
  // Model selection
  model: z.string().optional(),
  // History for conversation context
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
})

// Agent prompts in French - Direct and formal
const agentPrompts: Record<string, string> = {
  CEO: `Tu es le directeur de Graphisme by ELECTRON, une agence digitale au Benin.

Tu aides les clients a comprendre leurs besoins et a planifier leurs projets digitaux.

Services de l'agence:
- Design: Logos, chartes graphiques, branding
- Developpement: Sites web, applications mobiles, e-commerce
- Marketing: SEO, Google Ads, Facebook Ads
- IA: Chatbots, assistants vocaux
- Video: Motion design, animations

Tu coordonnes une equipe d'experts qui travaillent ensemble pour les projets clients.

Sois professionnel et direct. Reponds clairement aux questions.`,

  Commercial: `Tu es le service commercial de Graphisme by ELECTRON. Tu aides les clients a trouver le service adapte a leurs besoins.

Ton role est d'accueillir les clients, comprendre leur projet et les orienter vers la bonne solution.

Processus:
1. Accueil et ecoute
2. Analyse des besoins
3. Proposition des services adaptes
4. Etablissement d'un devis

Tarifs:
- Site web: 150 000 - 500 000 XOF
- E-commerce: 300 000 - 1 000 000 XOF
- Logo: 50 000 - 200 000 XOF
- SEO: 100 000 - 300 000 XOF

Sois accueillant et professionnel.`,

  Marketing: `Tu es le service marketing de Graphisme by ELECTRON. Tu conseilles sur les strategies marketing digitales.

Services:
- SEO: Optimisation Google
- Google Ads: Campagnes publicitaires
- Facebook/Instagram Ads
- Analyse des performances

Donne des conseils pratiques et actionnables. Explique le ROI attendu.`,

  Designer: `Tu es le service design de Graphisme by ELECTRON. Tu conseilles sur l'identite visuelle et la creation graphique.

Services:
- Logos et branding
- Charte graphique
- Print: cartes de visite, flyers, affiches
- Web design
- Reseaux sociaux

Demande toujours des informations sur le secteur d'activite, les couleurs preferees et le public cible.`,

  Developer: `Tu es le service technique de Graphisme by ELECTRON. Tu conseilles sur le developpement web et mobile.

Technologies:
- Frontend: Next.js, React, TypeScript
- Backend: Node.js, Python
- Mobile: React Native, Flutter
- Base de donnees: PostgreSQL, MongoDB

Explique simplement les options techniques et recommande ce qui est adapte au budget.`,

  Motion: `Tu es le service video de Graphisme by ELECTRON. Tu conseilles sur la production video.

Services:
- Montage video
- Motion design
- Animation 2D/3D
- Reseaux sociaux
- Publicites

Propose des solutions adaptees a tous les budgets.`,

  CommunityManager: `Tu es le service community management de Graphisme by ELECTRON. Tu conseilles sur la gestion des reseaux sociaux.

Plateformes:
- Facebook
- Instagram
- WhatsApp Business
- LinkedIn
- TikTok

Services:
- Strategie de contenu
- Calendrier editorial
- Creation de posts
- Community management`,

  Finance: `Tu es le service finance de Graphisme by ELECTRON. Tu geres les devis et la facturation.

Tarifs:
- Site vitrines: 150 000 - 400 000 XOF
- Site e-commerce: 400 000 - 1 200 000 XOF
- Logo: 50 000 - 250 000 XOF
- Charte graphique: 100 000 - 350 000 XOF
- SEO: 150 000 - 400 000 XOF

Tu etablis les devis detailles et suis les paiements. Sois transparent sur les prix.`,

  Support: `Tu es le service support de Graphisme by ELECTRON. Tu reponds aux questions et resolus les problemes des clients.

Tu aides avec:
- Bugs et problemes techniques
- Questions sur l'utilisation
- Modifications demandees
- Questions sur la facturation

Sois patient et efficace. Donne des solutions claires.`,

  DevOps: `Tu es le service infrastructure de Graphisme by ELECTRON. Tu geres l'hebergement et les deploiements.

Services:
- Hebergement: Vercel, AWS, DigitalOcean
- CI/CD
- Docker
- Monitoring
- SSL/HTTPS

Tu assures la performance et la disponibilite des sites.`,

  CyberSecurity: `Tu es le service securite de Graphisme by ELECTRON. Tu conseilles sur la securite informatique.

Services:
- Audit de securite
- Protection des sites
- Tests d'intrusion
- Conformite RGPD

Conseille sur les bonnes pratiques de securite.`,

  DataAnalyst: `Tu es le service analyse de donnees de Graphisme by ELECTRON. Tu transformes les donnees en decisions.

Services:
- Tableaux de bord
- Rapports analytiques
- Suivi des KPIs
- Analyse du trafic web

Aide les clients a prendre des decisions basees sur les donnees.`,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agent, message, model, history, provider: requestedProvider } = chatSchema.parse(body)

    // Get AI settings
    const aiSettings = getAISettings()
    
    // Determine which provider to use
    let provider = requestedProvider || aiSettings.provider
    
    // Auto-select: use Google if API key available, otherwise Ollama
    if (provider === 'auto') {
      provider = aiSettings.googleApiKey ? 'google' : 'ollama'
    }

    // Get agent config - use enhanced prompts for Google AI
    const agentPrompt = provider === 'google' 
      ? professionalPrompts[agent] || agentPrompts[agent]
      : agentPrompts[agent]
    
    if (!agentPrompt) {
      return NextResponse.json({ error: `Agent ${agent} non trouvé` }, { status: 400 })
    }

    // Convert history format
    const conversationHistory = history || []

    // Build messages for the AI
    const messages = [
      { role: 'system' as const, content: agentPrompt },
      ...conversationHistory.map(h => ({
        role: h.role as 'user' | 'assistant',
        content: h.content
      })),
      { role: 'user' as const, content: message }
    ]

    let response: string
    let modelUsed: string

    // Try to get response from the selected provider
    if (provider === 'google') {
      // Use Google AI (Gemini)
      try {
        const selectedModel = model || aiSettings.defaultModel
        response = await chatWithGoogleAI(messages, {
          apiKey: aiSettings.googleApiKey,
          model: selectedModel,
          temperature: aiSettings.temperature,
          maxTokens: aiSettings.maxTokens
        })
        modelUsed = `google:${selectedModel}`
      } catch (googleError: any) {
        console.error('Google AI error:', googleError.message)
        
        // Fallback to Ollama if Google fails
        if (aiSettings.ollamaUrl) {
          console.log('Falling back to Ollama...')
          try {
            response = await generateChatCompletion(messages, { model: 'llama3.2' })
            modelUsed = 'ollama:llama3.2'
          } catch (ollamaError: any) {
            return NextResponse.json({ 
              error: 'Les deux services IA sont indisponibles. Veuillez vérifier vos clés API ou le serveur Ollama.',
              details: {
                google: googleError.message,
                ollama: ollamaError.message
              }
            }, { status: 503 })
          }
        } else {
          return NextResponse.json({ 
            error: 'Google AI indisponible: ' + googleError.message 
          }, { status: 503 })
        }
      }
    } else {
      // Use Ollama
      try {
        const selectedModel = model || 'llama3.2'
        response = await generateChatCompletion(messages, { 
          model: selectedModel,
          temperature: aiSettings.temperature,
          maxTokens: aiSettings.maxTokens
        })
        modelUsed = `ollama:${selectedModel}`
      } catch (ollamaError: any) {
        console.error('Ollama error:', ollamaError.message)
        
        // Try to fallback to Google if available
        if (aiSettings.googleApiKey) {
          console.log('Falling back to Google AI...')
          try {
            response = await chatWithGoogleAI(messages, {
              apiKey: aiSettings.googleApiKey,
              model: aiSettings.defaultModel,
              temperature: aiSettings.temperature,
              maxTokens: aiSettings.maxTokens
            })
            modelUsed = `google:${aiSettings.defaultModel}`
          } catch (googleError: any) {
            return NextResponse.json({ 
              error: 'Les deux services IA sont indisponibles.',
              details: {
                ollama: ollamaError.message,
                google: googleError.message
              }
            }, { status: 503 })
          }
        } else {
          // Check specific error types
          if (ollamaError.message && ollamaError.message.includes('ECONNREFUSED')) {
            return NextResponse.json(
              { error: 'Le serveur IA local (Ollama) n\'est pas démarré. Veuillez démarrer Ollama avec: ollama serve' },
              { status: 503 }
            )
          }
          return NextResponse.json({ 
            error: 'Erreur Ollama: ' + ollamaError.message 
          }, { status: 503 })
        }
      }
    }

    return NextResponse.json({ 
      response,
      agent,
      model: modelUsed,
      provider
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    
    // Check for specific error types
    if (error.message && error.message.includes('ECONNREFUSED')) {
      console.error('Ollama not running:', error)
      return NextResponse.json(
        { error: 'Le serveur IA n\'est pas démarré. Veuillez démarrer Ollama avec la commande: ollama serve' },
        { status: 503 }
      )
    }
    
    if (error.message && error.message.includes('timeout')) {
      console.error('Ollama timeout:', error)
      return NextResponse.json(
        { error: 'Le serveur IA met trop de temps à répondre. Veuillez réessayer plus tard.' },
        { status: 504 }
      )
    }
    
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la communication avec l\'IA. Vérifiez qu\'Ollama est démarré.' },
      { status: 500 }
    )
  }
}

// Get available models and settings
export async function GET() {
  const aiSettings = getAISettings()
  
  // Check which providers are available
  const providers = {
    google: !!aiSettings.googleApiKey,
    ollama: true // Ollama is always available (will show error if not running)
  }
  
  return NextResponse.json({ 
    models: AVAILABLE_MODELS,
    geminiModels: GEMINI_MODELS,
    agents: AGENTS,
    settings: {
      provider: aiSettings.provider,
      defaultModel: aiSettings.defaultModel,
      temperature: aiSettings.temperature,
      maxTokens: aiSettings.maxTokens,
      availableProviders: providers
    }
  })
}
