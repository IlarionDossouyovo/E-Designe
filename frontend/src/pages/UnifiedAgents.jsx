import { useState } from 'react'
import { Link } from 'react-router-dom'

// Configuration des agents IA
const agentsConfig = {
  name: 'E-DÉSIGNE AI ENGINE',
  version: '2.0',
  status: 'active',
  // Modèles Ollama requis pour les agents
  ollamaModels: [
    { 
      id: 'llama2', 
      name: 'Llama 2', 
      purpose: 'Chatbot principal - Conversation générale',
      size: '7GB',
      status: 'required',
      agents: ['Chatbot', 'Support']
    },
    { 
      id: 'mistral', 
      name: 'Mistral', 
      purpose: 'Réponses rapides - Recherche',
      size: '4GB',
      status: 'required',
      agents: ['Recherche IA', 'Recommandations']
    },
    { 
      id: 'codellama', 
      name: 'CodeLlama', 
      purpose: 'Génération code - Automation',
      size: '7GB',
      status: 'optional',
      agents: ['Automation', 'Scripts']
    },
    { 
      id: 'nomic-embed-text', 
      name: 'Nomic Embed Text', 
      purpose: 'Embeddings - Recherche vectorielle',
      size: '270MB',
      status: 'required',
      agents: ['Recherche', 'Embeddings']
    },
    { 
      id: 'orca-mini', 
      name: 'Orca Mini', 
      purpose: 'Alternative légère - Fallback',
      size: '3GB',
      status: 'optional',
      agents: ['Fallback']
    }
  ],
  // Tous les agents avec leurs configurations
  agents: [
    {
      id: 1,
      name: '🤖 Chatbot IA',
      shortName: 'Chatbot',
      description: 'Assistant conversationnel 24/7 avec Ollama',
      icon: '💬',
      color: '#4B6CB7',
      status: 'active',
      route: '/agents/chatbot',
      model: 'llama2',
      capabilities: ['Suivi commande', 'Livraison', 'Retours', 'Tailles', 'Paiements'],
      stats: { chats: 1247, satisfaction: 4.5, responseTime: '1.2s' }
    },
    {
      id: 2,
      name: '🔍 Recherche IA',
      shortName: 'Recherche',
      description: 'Moteur de recherche intelligent avec filtrage avancé',
      icon: '🔍',
      color: '#22c55e',
      status: 'active',
      route: '/recherche-ia',
      model: 'mistral',
      capabilities: ['Recherche description', 'Filtres couleurs', 'Tailles', 'Budget', 'Occasion'],
      stats: { searches: 3420, accuracy: 92, avgTime: '0.8s' }
    },
    {
      id: 3,
      name: '💡 Recommandations',
      shortName: 'Recos',
      description: 'Système de recommandations personnalisées',
      icon: '💡',
      color: '#f59e0b',
      status: 'active',
      route: '/agents/recommendations',
      model: 'mistral + filtering',
      capabilities: ['Filtrage collaboratif', 'Historique', 'Wishlist', 'Cross-selling'],
      stats: { recommendations: 8560, ctr: 12.5, conversion: 4.2 }
    },
    {
      id: 4,
      name: '📊 Analytics Prédictif',
      shortName: 'Analytics',
      description: 'Analyse prédictive et KPIs en temps réel',
      icon: '📊',
      color: '#ec4899',
      status: 'active',
      route: '/agents/analytics',
      model: 'statistics',
      capabilities: ['KPIs temps réel', 'Prévisions', 'Taux conversion', 'Satisfaction'],
      stats: { conversion: 2.3, avgCart: 89.99, satisfaction: 4.2 }
    },
    {
      id: 5,
      name: '📧 Automation Emails',
      shortName: 'Emails',
      description: 'Envoi automatique d\'emails transactionnels',
      icon: '📧',
      color: '#8b5cf6',
      status: 'active',
      route: '/agents/emails',
      model: 'templates',
      capabilities: ['Bienvenue', 'Panier abandonné', 'Confirmation', 'Tracking', 'Avis'],
      stats: { sent: 4625, openRate: 66, clickRate: 46 }
    },
    {
      id: 6,
      name: '📦 Inventaire',
      shortName: 'Stock',
      description: 'Gestion automatique des stocks et alertes',
      icon: '📦',
      color: '#14b8a6',
      status: 'active',
      route: '/agents/inventory',
      model: 'thresholds',
      capabilities: ['Alertes stock', 'Réapprovisionnement', 'Désactivation auto'],
      stats: { totalProducts: 52, critical: 2, lowStock: 6 }
    },
    {
      id: 7,
      name: '🔒 Fraud Detection',
      shortName: 'Fraud',
      description: 'Détection de fraude sur les paiements',
      icon: '🔒',
      color: '#ef4444',
      status: 'active',
      route: '/agents/fraud',
      model: 'risk-scoring',
      capabilities: ['Vérification IP', 'Vitesse commande', 'Montant anomal', 'Score risque'],
      stats: { flagged: 45, blocked: 12, approved: 1188 }
    },
    {
      id: 8,
      name: '📱 Social Media',
      shortName: 'Social',
      description: 'Automatisation des réseaux sociaux',
      icon: '📱',
      color: '#06b6d4',
      status: 'active',
      route: '/agents/social',
      model: 'scheduling',
      capabilities: ['Instagram', 'Facebook', 'Pinterest', 'Twitter', 'Hashtags'],
      stats: { posts: 156, engagement: 12450, reach: 45000 }
    }
  ]
}

export default function UnifiedAgents() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('agents')
  const [selectedAgent, setSelectedAgent] = useState(null)

  const FOUNDER_EMAIL = 'ilarion@e-designe.com'
  const FOUNDER_PASSWORD = 'electron2024'

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === FOUNDER_EMAIL && password === FOUNDER_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Identifiants incorrects. Accès réservé au fondateur.')
    }
  }

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem 20px', maxWidth: '500px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>E-DÉSIGNE AI</h1>
            <p style={{ color: '#9ca3af' }}>Centre de contrôle des Agents IA</p>
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
            <Link to="/" style={{ color: '#6B8DD6', textDecoration: 'none' }}>← Retour à l'accueil</Link>
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
              <h1 style={{ fontSize: '2rem', margin: 0 }}>E-DÉSIGNE AI ENGINE</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Centre de contrôle unifié - Version {agentsConfig.version}</p>
            </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Déconnexion</button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px', overflowX: 'auto' }}>
        <button onClick={() => setActiveTab('agents')} style={{ padding: '12px 24px', background: activeTab === 'agents' ? '#4B6CB7' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          🤖 Agents IA
        </button>
        <button onClick={() => setActiveTab('ollama')} style={{ padding: '12px 24px', background: activeTab === 'ollama' ? '#4B6CB7' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          🧠 Modèles Ollama
        </button>
        <button onClick={() => setActiveTab('architecture')} style={{ padding: '12px 24px', background: activeTab === 'architecture' ? '#4B6CB7' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          🏗️ Architecture
        </button>
      </div>

      {/* TAB: AGENTS */}
      {activeTab === 'agents' && (
        <>
          {/* Stats globaux */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
              <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{agentsConfig.agents.length}</p>
              <p style={{ color: '#9ca3af', margin: 0 }}>Agents</p>
            </div>
            <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
              <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{agentsConfig.ollamaModels.length}</p>
              <p style={{ color: '#9ca3af', margin: 0 }}>Modèles IA</p>
            </div>
            <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
              <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>8</p>
              <p style={{ color: '#9ca3af', margin: 0 }}>Actifs</p>
            </div>
            <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
              <p style={{ color: '#8b5cf6', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>24/7</p>
              <p style={{ color: '#9ca3af', margin: 0 }}>Disponibilité</p>
            </div>
          </div>

          {/* Grille des agents */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {agentsConfig.agents.map(agent => (
              <div 
                key={agent.id}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                style={{ 
                  background: '#16161f', 
                  borderRadius: '16px', 
                  padding: '24px',
                  border: selectedAgent === agent.id ? `2px solid ${agent.color}` : '1px solid #2a2a35',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px', 
                    background: agent.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {agent.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#fff', margin: 0 }}>{agent.name}</h3>
                    <span style={{ padding: '2px 8px', background: '#22c55e', color: '#fff', borderRadius: '10px', fontSize: '0.7rem' }}>{agent.status}</span>
                  </div>
                </div>
                
                <p style={{ color: '#9ca3af', margin: '0 0 16px', fontSize: '0.9rem' }}>{agent.description}</p>
                
                {/* Modèle requis */}
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#6B8DD6', fontSize: '0.8rem' }}>Modèle: </span>
                  <code style={{ background: '#0a0a0f', padding: '2px 8px', borderRadius: '4px', color: '#f59e0b', fontSize: '0.8rem' }}>{agent.model}</code>
                </div>

                {/* Stats rapides */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  {Object.entries(agent.stats).slice(0, 3).map(([key, value]) => (
                    <div key={key} style={{ background: '#0a0a0f', padding: '6px 10px', borderRadius: '6px', flex: 1, textAlign: 'center' }}>
                      <p style={{ color: agent.color, margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{value}</p>
                      <p style={{ color: '#6B8DD6', margin: 0, fontSize: '0.65rem' }}>{key}</p>
                    </div>
                  ))}
                </div>

                {/* Détails étendus */}
                {selectedAgent === agent.id && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #2a2a35' }}>
                    <p style={{ color: '#4B6CB7', fontWeight: 'bold', marginBottom: '8px' }}>Capacités:</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {agent.capabilities.map((cap, i) => (
                        <span key={i} style={{ padding: '4px 8px', background: '#0a0a0f', color: '#9ca3af', borderRadius: '4px', fontSize: '0.75rem' }}>{cap}</span>
                      ))}
                    </div>
                    <Link 
                      to={agent.route}
                      style={{ 
                        display: 'block',
                        padding: '10px',
                        background: agent.color,
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      Accéder →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* TAB: OLLAMA MODELS */}
      {activeTab === 'ollama' && (
        <>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35', marginBottom: '30px' }}>
            <h2 style={{ color: '#fff', marginBottom: '10px' }}>🧠 Installation des Modèles Ollama</h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Ces modèles IA doivent être installés sur votre machine locale pour faire fonctionner les agents. 
              Ollama doit être installé (voir: <a href="https://ollama.com" target="_blank" style={{ color: '#4B6CB7' }}>ollama.com</a>)
            </p>
            
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', fontFamily: 'monospace' }}>
              <p style={{ color: '#22c55e', marginBottom: '10px' }}># Commandes d'installation des modèles</p>
              <pre style={{ color: '#fff', margin: 0, whiteSpace: 'pre-wrap' }}>
{agentsConfig.ollamaModels.map(m => `ollama pull ${m.id}  # ${m.name} - ${m.purpose}`).join('\n')}

# Pour vérifier l'état des modèles
ollama list

# Pour démarrer Ollama
ollama serve
              </pre>
            </div>
          </div>

          {/* Grille des modèles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {agentsConfig.ollamaModels.map(model => (
              <div key={model.id} style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: model.status === 'required' ? '2px solid #22c55e' : '1px solid #2a2a35' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ color: '#fff', margin: 0 }}>{model.name}</h3>
                  <span style={{ padding: '4px 12px', background: model.status === 'required' ? '#22c55e' : '#f59e0b', color: '#fff', borderRadius: '12px', fontSize: '0.75rem' }}>
                    {model.status === 'required' ? 'REQUIS' : 'OPTIONNEL'}
                  </span>
                </div>
                <p style={{ color: '#9ca3af', margin: '0 0 16px', fontSize: '0.9rem' }}>{model.purpose}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#6B8DD6' }}>Taille: {model.size}</span>
                  <code style={{ background: '#0a0a0f', padding: '4px 10px', borderRadius: '6px', color: '#f59e0b' }}>ollama pull {model.id}</code>
                </div>
                
                <div>
                  <p style={{ color: '#4B6CB7', fontSize: '0.85rem', marginBottom: '8px' }}>Utilisé par:</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {model.agents.map((agent, i) => (
                      <span key={i} style={{ padding: '4px 10px', background: '#0a0a0f', color: '#9ca3af', borderRadius: '6px', fontSize: '0.8rem' }}>{agent}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TAB: ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h2 style={{ color: '#fff', marginBottom: '30px', textAlign: 'center' }}>🏗️ Architecture E-DÉSIGNE AI ENGINE</h2>
          
          {/* Schéma d'architecture */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Couche 1: Frontend */}
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', border: '2px solid #4B6CB7' }}>
              <h3 style={{ color: '#4B6CB7', marginBottom: '15px' }}>🌐 COUCHE PRÉSENTATION</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['React + Vite', 'React Router', 'Framer Motion'].map((tech, i) => (
                  <span key={i} style={{ padding: '8px 16px', background: '#16161f', color: '#fff', borderRadius: '8px' }}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Flèche */}
            <div style={{ textAlign: 'center', color: '#4B6CB7', fontSize: '1.5rem' }}>↓</div>

            {/* Couche 2: Agents IA */}
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', border: '2px solid #22c55e' }}>
              <h3 style={{ color: '#22c55e', marginBottom: '15px' }}>🤖 COUCHE AGENTS IA</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {['Chatbot', 'Recherche', 'Recommandations', 'Analytics', 'Emails', 'Inventaire', 'Fraud', 'Social'].map((agent, i) => (
                  <div key={i} style={{ padding: '10px', background: '#16161f', borderRadius: '8px', textAlign: 'center', color: '#fff' }}>{agent}</div>
                ))}
              </div>
            </div>

            {/* Flèche */}
            <div style={{ textAlign: 'center', color: '#22c55e', fontSize: '1.5rem' }}>↓</div>

            {/* Couche 3: Modèles IA */}
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>🧠 COUCHE MODÈLES IA (Ollama)</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {agentsConfig.ollamaModels.map((model, i) => (
                  <div key={i} style={{ padding: '10px 20px', background: '#16161f', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ color: '#fff' }}>{model.name}</span>
                    <span style={{ display: 'block', color: '#6B8DD6', fontSize: '0.8rem' }}>{model.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flèche */}
            <div style={{ textAlign: 'center', color: '#f59e0b', fontSize: '1.5rem' }}>↓</div>

            {/* Couche 4: Backend */}
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', border: '2px solid #8b5cf6' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '15px' }}>⚙️ COUCHE BACKEND</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Node.js', 'Express', 'API REST', 'Supabase', 'Stripe', 'PayPal'].map((tech, i) => (
                  <span key={i} style={{ padding: '8px 16px', background: '#16161f', color: '#fff', borderRadius: '8px' }}>{tech}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#6B8DD6' }}>
        <p>🔒 E-DÉSIGNE AI ENGINE © 2026 - Accès réservé au fondateur</p>
      </div>
    </div>
  )
}
