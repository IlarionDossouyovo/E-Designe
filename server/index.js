// E-Désigne Local Server
// Combines Express API + Vite frontend, uses Ollama for AI

import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Ollama Configuration
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama2'

// ═══════════════════════════════════════════════════════════════
// IN-MEMORY DATA STORE
// ═══════════════════════════════════════════════════════════════

const products = [
  { id: 1, name: 'Robe Élégante Noire', price: 89.99, category: 'robes', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', description: 'Robe élégante en mousseline noire.', isNew: true, isSale: false },
  { id: 2, name: 'Chemise Blanche Classique', price: 49.99, category: 'chemises', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', description: 'Chemise blanche en coton.', isNew: false, isSale: false },
  { id: 3, name: 'Pantalon Chino Beige', price: 59.99, category: 'pantalons', color: 'beige', size: ['28', '30', '32', '34'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', description: 'Pantalon chino premium.', isNew: false, isSale: true, oldPrice: 79.99 },
  { id: 4, name: 'Veste en Jean Bleu', price: 79.99, category: 'vestes', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576995853123-5b3d08d4c835?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576995853123-5b3d08d4c835?w=800&q=80', description: 'Veste denim vintage.', isNew: false, isSale: false },
  { id: 5, name: 'Robe Rouge Soirée', price: 129.99, category: 'robes', color: 'rouge', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', description: 'Robe longue rouge satin.', isNew: true, isSale: false },
  { id: 6, name: 'Pullovers Gris', price: 39.99, category: 'pullovers', color: 'gris', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', description: 'Pull en laine mérinos.', isNew: false, isSale: false },
  { id: 7, name: 'Jupe Noire Mini', price: 45.99, category: 'jupes', color: 'noir', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1583496661160-fb5886a4aab8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a4aab8?w=800&q=80', description: 'Jupe noire plissée.', isNew: false, isSale: false },
  { id: 8, name: 'T-Shirt Blanc Basic', price: 19.99, category: 't-shirts', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f7a5b1c5?w=800&q=80', description: 'T-shirt coton bio.', isNew: false, isSale: false },
  { id: 9, name: 'Manteau Noir Hiver', price: 199.99, category: 'manteaux', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80', description: 'Manteau lainage premium.', isNew: true, isSale: false },
  { id: 10, name: 'Sweatshirt Bleu Ciel', price: 55.99, category: 'sweatshirts', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', description: 'Sweatshirt douceur.', isNew: false, isSale: false },
  { id: 11, name: 'Costume Gris Foncé', price: 289.99, category: 'costumes', color: 'gris', size: ['46', '48', '50', '52'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', description: 'Costume 2 pièces.', isNew: false, isSale: false },
  { id: 12, name: 'Sac à Main Cuir', price: 159.99, category: 'accessoires', color: 'marron', size: ['Unique'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', description: 'Sac en cuir véritable.', isNew: true, isSale: false },
  { id: 13, name: 'Chaussures Cuir Marron', price: 129.99, category: 'chaussures', color: 'marron', size: ['40', '41', '42', '43', '44'], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Chaussures cuir.', isNew: false, isSale: false },
  { id: 14, name: 'Montre Élégante', price: 89.99, category: 'accessoires', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', description: 'Montre automatique.', isNew: false, isSale: true, oldPrice: 129.99 },
  { id: 15, name: 'Ceinture Cuir Noir', price: 45.99, category: 'accessoires', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', description: 'Ceinture cuir.', isNew: false, isSale: false },
  { id: 16, name: 'Lunettes de Soleil', price: 79.99, category: 'accessoires', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', description: 'Lunettes UV400.', isNew: false, isSale: false },
  // African Clothing
  { id: 17, name: 'Boubou Traditionnel Senegal', price: 149.99, category: 'africain', color: 'bleu', size: ['S', 'M', 'L', 'XL', 'XXL'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', description: 'Boubou africain traditionnel en wax.', isNew: true, isSale: false },
  { id: 18, name: 'Robe Ankara Colorée', price: 89.99, category: 'africain', color: 'multicolore', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', description: 'Robe africaine Ankara.', isNew: true, isSale: false },
  { id: 19, name: 'Dashiki Nigeria', price: 79.99, category: 'africain', color: 'rouge', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', description: 'Dashiki traditionnel nigérian.', isNew: false, isSale: false },
  { id: 20, name: 'Kente Ghana', price: 199.99, category: 'africain', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', description: 'Pagne Kente authentique du Ghana.', isNew: false, isSale: false },
  { id: 21, name: 'Grand Boubou Mali', price: 179.99, category: 'africain', color: 'blanc', size: ['M', 'L', 'XL', 'XXL'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', description: 'Grand boubou malien en coton.', isNew: false, isSale: false },
  { id: 22, name: 'Robe Africaine Elegance', price: 119.99, category: 'africain', color: 'violet', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', description: 'Robe africain élégante.', isNew: true, isSale: false },
  { id: 23, name: 'Pagne Côte d Ivoire', price: 59.99, category: 'africain', color: 'orange', size: ['Unique'], image: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', description: 'Pagne africain colorés.', isNew: false, isSale: true, oldPrice: 79.99 },
  { id: 24, name: 'Chemise Africaine Mode', price: 69.99, category: 'africain', color: 'vert', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', description: 'Chemise mixte wax.', isNew: false, isSale: false },
  // Bebe & Enfant
  { id: 25, name: 'Body Bebe Rose', price: 24.99, category: 'bebe', color: 'rose', size: ['0-3M', '3-6M', '6-12M'], image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', description: 'Body coton bio pour bebe.', isNew: true, isSale: false },
  { id: 26, name: 'Pyjama Bebe Bleu', price: 19.99, category: 'bebe', color: 'bleu', size: ['3-6M', '6-12M', '12-18M'], image: 'https://images.unsplash.com/photo-1519689680058-32435c1d4a8a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1519689680058-32435c1d4a8a?w=800&q=80', description: 'Pyjama douce peluche.', isNew: false, isSale: false },
  { id: 27, name: 'Salopette Enfant', price: 34.99, category: 'bebe', color: 'jaune', size: ['2A', '3A', '4A', '5A'], image: 'https://images.unsplash.com/photo-1596871337622-98d48d1cf531?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1596871337622-98d48d1cf531?w=800&q=80', description: 'Salopette cotton.', isNew: false, isSale: false },
  { id: 28, name: 'Robe Fille Bebe', price: 29.99, category: 'bebe', color: 'rose', size: ['2A', '3A', '4A'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', description: 'Robe adorable.', isNew: true, isSale: false },
  { id: 29, name: 'Chaussons Bebe', price: 14.99, category: 'bebe', color: 'blanc', size: ['0-3M', '3-6M', '6-12M'], image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Chaussons doux.', isNew: false, isSale: false },
  { id: 30, name: 'T-Shirt Enfant Garcon', price: 17.99, category: 'bebe', color: 'vert', size: ['2A', '3A', '4A', '5A'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f7a7b1c5?w=800&q=80', description: 'T-shirt coton bio.', isNew: false, isSale: false }
]

const users = []
const orders = []
const wishlists = new Map()
const reviews = []
const emailQueue = []
const analytics = { visits: [], conversions: [] }

// ═══════════════════════════════════════════════════════════════
// OLLAMA AI FUNCTION
// ═══════════════════════════════════════════════════════════════

async function chatWithOllama(message, context = {}) {
  try {
    const prompt = `Tu es un assistant commercial aimable pour E-Designe, une boutique e-commerce de mode et textile au Benin.
Produits disponibles: robes, chemises, pantalons, vestes, africana, bebe.
Reponds de maniere concise en francais.

${context.systemPrompt || ''}

Question: ${message}`

    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false
      })
    })

    if (response.ok) {
      const data = await response.json()
      return data.response || data.content
    }
  } catch (error) {
    console.log('Ollama not available:', error.message)
  }
  return null
}

// ═══════════════════════════════════════════════════════════════
// API ROUTES
// ═══════════════════════════════════════════════════════════════

// Products
app.get('/api/products', (req, res) => {
  const { category, color, search } = req.query
  let filtered = [...products]
  if (category) filtered = filtered.filter(p => p.category === category)
  if (color) filtered = filtered.filter(p => p.color === color)
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    )
  }
  res.json(filtered)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id))
  product ? res.json(product) : res.status(404).json({ error: 'Produit non trouvé' })
})

// AI Search
app.post('/api/ai/search', async (req, res) => {
  const { query } = req.body
  const q = (query || '').toLowerCase()
  
  // Basic search first
  const results = products.filter(p => {
    const text = `${p.name} ${p.description} ${p.category}`.toLowerCase()
    return text.includes(q)
  })
  
  // Try AI enhancement with Ollama
  let aiResponse = null
  if (query && q.length > 3) {
    aiResponse = await chatWithOllama(`Recherche produits: ${query}`, { 
      systemPrompt: 'Liste les produits pertinents avec leurs noms et prix.' 
    })
  }
  
  res.json({ results, aiResponse, message: `${results.length} produit(s) trouvé(s)` })
})

// AI Recommendations
app.get('/api/ai/recommendations', (req, res) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random())
  res.json(shuffled.slice(0, 4))
})

// AI Chatbot - Uses Ollama
app.post('/api/ai/chatbot', async (req, res) => {
  const { message, userId } = req.body
  
  // Try Ollama first
  const ollamaResponse = await chatWithOllama(message, {
    systemPrompt: 'Tu es le chatbot E-Designe. Aidons les clients avec: commandes, livraison, retours, tailles, paiements.'
  })
  
  if (ollamaResponse) {
    return res.json({ response: ollamaResponse, source: 'ollama' })
  }
  
  // Fallback to rule-based
  const lower = message.toLowerCase()
  let response = "Je suis votre assistant E-Désigne. Je peux vous aider avec:\n\n• Suivi de commande\n• Informations livraison\n• Politique retour\n• Guide des tailles\n• Paiements\n• Promotion en cours"
  
  if (lower.includes('commande')) {
    const userOrders = orders.filter(o => o.userId === userId || o.userId === 'guest')
    if (userOrders.length > 0) {
      const lastOrder = userOrders[userOrders.length - 1]
      response = `Votre commande #${lastOrder.id}: ${lastOrder.status}`
    } else {
      response = "Aucune commande trouvée. Souhaitez-vous commander?"
    }
  } else if (lower.includes('livraison')) {
    response = "🚚 LIVRAISON:\n• France: 5.90€ (gratuit dès 50€)\n• Europe: 12.90€\n• 3-5 jours"
  } else if (lower.includes('retour')) {
    response = "↩️ RETOUR: 30 jours gratuit, remboursement sous 14 jours"
  } else if (lower.includes('taille')) {
    response = "📏 TAILLES: XS, S, M, L, XL, XXL"
  } else if (lower.includes('paiement')) {
    response = "💳 Stripe, PayPal, 4x sans frais"
  } else if (lower.includes('contact') || lower.includes('service')) {
    response = "📞 support@e-designe.com | Lun-Ven 9h-18h"
  } else if (lower.includes('promo') || lower.includes('sale')) {
    response = "🔥 -30% africain | CODE: BIENVENUE10"
  }
  
  res.json({ response, source: 'rule-based' })
})

// Analytics Predictions
app.get('/api/analytics/predictions', (req, res) => {
  const totalProducts = products.length
  const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts
  res.json({
    kpis: { conversionRate: 2.3, avgCartValue: avgPrice.toFixed(2), returnRate: 8.5, satisfaction: 4.2 },
    forecast: { nextOrders: 120, nextRevenue: 8500 }
  })
})

// Orders
app.post('/api/orders', (req, res) => {
  const order = { id: 'ORD-' + Date.now(), ...req.body, status: 'pending', createdAt: new Date().toISOString() }
  orders.push(order)
  res.json(order)
})

app.get('/api/orders/:userId', (req, res) => {
  res.json(orders.filter(o => o.userId === req.params.userId))
})

// Wishlist
app.post('/api/wishlist/:userId', (req, res) => {
  const userId = req.params.userId
  if (!wishlists.has(userId)) wishlists.set(userId, [])
  const list = wishlists.get(userId)
  if (req.body.productId && !list.includes(req.body.productId)) list.push(req.body.productId)
  res.json({ wishlist: list })
})

app.get('/api/wishlist/:userId', (req, res) => {
  const list = wishlists.get(req.params.userId) || []
  res.json(products.filter(p => list.includes(p.id)))
})

// Reviews
app.post('/api/reviews', (req, res) => {
  const review = { id: 'REV-' + Date.now(), ...req.body, createdAt: new Date().toISOString() }
  reviews.push(review)
  res.json(review)
})

app.get('/api/reviews/:productId', (req, res) => {
  res.json(reviews.filter(r => r.productId === req.params.productId))
})

// Users
app.post('/api/users/register', (req, res) => {
  const { email, password, name } = req.body
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email déjà utilisé' })
  const user = { id: 'user_' + Date.now(), email, name, createdAt: new Date().toISOString() }
  users.push({ ...user, password })
  res.json({ user: { ...user, password: undefined } })
})

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
  res.json({ user: { id: user.id, email: user.email, name: user.name } })
})

// Email Queue
app.post('/api/ai/email/send', (req, res) => {
  const { to, template, data } = req.body
  const emailJob = {
    id: 'EMAIL-' + Date.now(),
    to, template, data,
    status: 'queued',
    createdAt: new Date().toISOString()
  }
  emailQueue.push(emailJob)
  res.json({ success: true, emailId: emailJob.id })
})

app.get('/api/ai/email/queue', (req, res) => {
  res.json({ queue: emailQueue, count: emailQueue.length })
})

// Analytics Dashboard
app.get('/api/ai/analytics/dashboard', (req, res) => {
  const today = new Date().toDateString()
  const todayVisits = analytics.visits.filter(v => new Date(v.timestamp).toDateString() === today)
  res.json({
    overview: {
      visitors: { today: todayVisits.length, total: analytics.visits.length },
      conversions: { today: analytics.conversions.length, total: analytics.conversions.length }
    },
    kpis: {
      conversionRate: 2.3,
      avgCartValue: 85.50,
      returnRate: 8.5,
      satisfaction: 4.2,
      topCategory: 'robes'
    }
  })
})

app.post('/api/ai/analytics/track', (req, res) => {
  const { event, userId, data } = req.body
  const trackEvent = { event, userId, data, timestamp: new Date().toISOString() }
  if (event === 'pageview') analytics.visits.push(trackEvent)
  else analytics.conversions.push(trackEvent)
  res.json({ success: true })
})

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// AI Health Check
app.get('/api/ai/healthcheck', async (req, res) => {
  // Check Ollama status
  let ollamaStatus = 'disconnected'
  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`)
    if (response.ok) ollamaStatus = 'connected'
  } catch (e) {
    ollamaStatus = 'disconnected'
  }
  
  res.json({
    status: 'healthy',
    services: {
      chatbot: 'operational',
      search: 'operational',
      recommendations: 'operational'
    },
    ollama: { status: ollamaStatus, url: OLLAMA_URL, model: OLLAMA_MODEL },
    uptime: '99.9%',
    lastUpdate: new Date().toISOString()
  })
})

// Fraud Detection
app.post('/api/ai/fraud/detect', (req, res) => {
  const { amount } = req.body
  let risk = 0
  if (amount > 500) risk += 0.3
  res.json({
    risk: risk.toFixed(2),
    status: risk > 0.7 ? 'blocked' : risk > 0.4 ? 'review' : 'approved'
  })
})

// Payment stubs
app.post('/api/payment/stripe/create-payment-intent', (req, res) => {
  res.json({ clientSecret: 'pi_simulated_secret', paymentIntentId: 'pi_' + Date.now() })
})

app.post('/api/payment/paypal/create-order', (req, res) => {
  res.json({ id: 'PAY-' + Date.now(), status: 'CREATED' })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║          🎀 E-DÉSIGNE - SERVEUR LOCAL                    ║
╠═══════════════════════════════════════════════════════════╣
║  🌐 URL: http://localhost:${PORT}                         ║
║  🤖 Ollama: ${OLLAMA_URL}                    ║
║  📦 Modèle: ${OLLAMA_MODEL}                               ║
╚═══════════════════════════════════════════════════════════╝
  `)
})

export default app