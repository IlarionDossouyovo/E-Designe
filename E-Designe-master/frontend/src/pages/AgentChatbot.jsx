import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Configuration du chatbot
const chatbotConfig = {
  name: 'Chatbot E-Designe IA',
  version: '2.0',
  status: 'active',
  model: 'llama2',
  fallbackModel: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 500,
  systemPrompt: `Tu es un assistant commercial expert pour E-Designe, une plateforme e-commerce dropshipping basée au Bénin.
Tu dois être:
- Aimable et professionnel
- Concis dans tes réponses
- Informé sur les produits, livraisons et politiques
- Disponible 24/7

Domaines de compétence:
- Suivi de commande
- Informations livraison (France: 5.90€, gratuit dès 50€)
- Politique retour (30 jours gratuit)
- Guide des tailles (XS, S, M, L, XL, XXL)
- Options paiement (Stripe, PayPal, 4x sans frais)
- Promotions en cours (-30% africain, Code: BIENVENUE10)`,
  capabilities: [
    { id: 1, name: 'Commandes', description: 'Suivi et statut des commandes', status: 'active', examples: ['Où est ma commande ?', 'Suivi #ORD-123'] },
    { id: 2, name: 'Livraison', description: 'Informations sur les modes de livraison', status: 'active', examples: ['Livraison gratuite ?', 'Delai France'] },
    { id: 3, name: 'Retours', description: 'Politique de retour et remboursement', status: 'active', examples: ['Comment retourner ?', 'Remboursement'] },
    { id: 4, name: 'Tailles', description: 'Guide des tailles', status: 'active', examples: ['Taille robe ?', 'Guide tailles'] },
    { id: 5, name: 'Paiements', description: 'Modes de paiement disponibles', status: 'active', examples: ['Paiement 4x ?', 'Stripe disponible'] },
    { id: 6, name: 'Produits', description: 'Informations produits et disponibilité', status: 'active', examples: ['Robe noire ?', 'Prix chemise'] },
    { id: 7, name: 'Promotions', description: 'Codes promo et soldes', status: 'active', examples: ['Code promo ?', 'Soldes en cours'] },
    { id: 8, name: 'Contact', description: 'Contact support client', status: 'active', examples: ['Contacter support', 'Email SAV'] },
  ],
  quickReplies: [
    'Produits Homme',
    'Prix livraison',
    'Comment commander',
    'Returns & exchanges'
  ],
  analytics: {
    totalChats: 1247,
    avgResponseTime: '1.2s',
    satisfactionRate: 4.5,
    topQuestions: [
      { question: 'Livraison gratuite ?', count: 234 },
      { question: 'Suivi commande', count: 189 },
      { question: 'Politique retour', count: 156 },
      { question: 'Codes promo', count: 142 },
      { question: 'Taille guide', count: 98 }
    ]
  },
  integrations: [
    { name: 'Ollama', url: 'http://localhost:11434', status: 'connected', model: 'llama2' },
    { name: 'OpenAI', url: 'https://api.openai.com/v1', status: 'disconnected', model: 'gpt-3.5-turbo' },
    { name: 'E-Designe API', url: '/api/ai/chatbot', status: 'connected' }
  ]
}

export default function AgentChatbot() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('config')
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Bonjour! Je suis votre assistant E-Designe. Comment puis-je vous aider?' }
  ])

  const FOUNDER_EMAIL = 'ilarion@e-designe.com'
  const FOUNDER_PASSWORD = 'electron2024'

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === FOUNDER_EMAIL && password === FOUNDER_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Identifiants incorrects.')
    }
  }

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return
    setChatHistory([...chatHistory, { role: 'user', content: chatMessage }])
    setChatMessage('')
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Merci pour votre message! Notre équipe vous répondra bientôt. Pour toute question urgente, contactez support@e-designe.com' 
      }])
    }, 1000)
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem 20px', maxWidth: '500px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Chatbot</h1>
            <p style={{ color: '#9ca3af' }}>Accès réservé au fondateur</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@founder.com" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} required />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} required />
            </div>
            {error && <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '20px' }}>{error}</div>}
            <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Se connecter</button>
          </form>
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Link to="/agents" style={{ color: '#6B8DD6', textDecoration: 'none' }}>← Retour aux agents</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', borderRadius: '20px', padding: '30px', marginBottom: '30px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem' }}>🤖</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>🤖 Agent Chatbot IA</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Assistant conversationnel 24/7 - Version {chatbotConfig.version}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ padding: '8px 16px', background: '#22c55e', borderRadius: '20px', fontSize: '0.85rem' }}>✅ Actif</span>
            <button onClick={() => setIsAuthenticated(false)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Déconnexion</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{chatbotConfig.analytics.totalChats}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Conversations</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{chatbotConfig.analytics.avgResponseTime}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Temps moyen</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{chatbotConfig.analytics.satisfactionRate}/5</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Satisfaction</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#8b5cf6', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{chatbotConfig.capabilities.length}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Capacités</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px' }}>
        {['config', 'capabilities', 'analytics', 'test'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? '#4B6CB7' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'config' ? '⚙️ Configuration' : tab === 'capabilities' ? '⚡ Capacités' : tab === 'analytics' ? '📊 Analytics' : '🧪 Tester'}
          </button>
        ))}
      </div>

      {/* Config Tab */}
      {activeTab === 'config' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>⚙️ Configuration</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Modèle Principal</label>
              <p style={{ color: '#fff', margin: '5px 0' }}>{chatbotConfig.model}</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Modèle Fallback</label>
              <p style={{ color: '#fff', margin: '5px 0' }}>{chatbotConfig.fallbackModel}</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Température</label>
              <p style={{ color: '#fff', margin: '5px 0' }}>{chatbotConfig.temperature}</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Max Tokens</label>
              <p style={{ color: '#fff', margin: '5px 0' }}>{chatbotConfig.maxTokens}</p>
            </div>
          </div>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>🔗 Intégrations</h3>
            {chatbotConfig.integrations.map((int, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#0a0a0f', borderRadius: '8px', marginBottom: '10px' }}>
                <div>
                  <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>{int.name}</p>
                  <p style={{ color: '#9ca3af', margin: '4px 0 0', fontSize: '0.8rem' }}>{int.url}</p>
                </div>
                <span style={{ padding: '4px 10px', background: int.status === 'connected' ? '#22c55e' : '#ef4444', color: '#fff', borderRadius: '12px', fontSize: '0.75rem' }}>{int.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Capabilities Tab */}
      {activeTab === 'capabilities' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {chatbotConfig.capabilities.map(cap => (
            <div key={cap.id} style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: '#fff', margin: 0 }}>{cap.name}</h4>
                <span style={{ padding: '4px 10px', background: '#22c55e', color: '#fff', borderRadius: '12px', fontSize: '0.75rem' }}>{cap.status}</span>
              </div>
              <p style={{ color: '#9ca3af', margin: '0 0 10px', fontSize: '0.9rem' }}>{cap.description}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {cap.examples.map((ex, i) => (
                  <span key={i} style={{ padding: '4px 10px', background: '#0a0a0f', color: '#6B8DD6', borderRadius: '6px', fontSize: '0.8rem' }}>"{ex}"</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>📊 Top Questions</h3>
          {chatbotConfig.analytics.topQuestions.map((q, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #2a2a35' }}>
              <span style={{ color: '#fff' }}>{q.question}</span>
              <span style={{ color: '#4B6CB7', fontWeight: 'bold' }}>{q.count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Test Tab */}
      {activeTab === 'test' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ padding: '16px', background: '#4B6CB7', color: '#fff' }}>
            <h3 style={{ margin: 0 }}>🧪 Tester le Chatbot</h3>
          </div>
          <div style={{ height: '300px', overflow: 'auto', padding: '16px' }}>
            {chatHistory.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: '12px', background: msg.role === 'user' ? '#4B6CB7' : '#2a2a35', color: '#fff' }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', padding: '16px', borderTop: '1px solid #2a2a35' }}>
            <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()} placeholder="Tapez votre message..." style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff', outline: 'none' }} />
            <button onClick={sendChatMessage} style={{ padding: '12px 24px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Envoyer</button>
          </div>
        </div>
      )}

      {/* Quick Replies */}
      <div style={{ marginTop: '30px' }}>
        <h4 style={{ color: '#fff', marginBottom: '12px' }}>Réponses rapides</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {chatbotConfig.quickReplies.map((reply, i) => (
            <button key={i} onClick={() => setChatMessage(reply)} style={{ padding: '8px 16px', background: '#16161f', color: '#6B8DD6', border: '1px solid #4B6CB7', borderRadius: '20px', cursor: 'pointer' }}>
              {reply}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/agents" style={{ color: '#6B8DD6', textDecoration: 'none' }}>← Retour aux agents</Link>
      </div>
    </div>
  )
}
