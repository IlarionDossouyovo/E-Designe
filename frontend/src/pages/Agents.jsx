import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const agents = [
  {
    id: 1,
    name: 'Chatbot E-Designe IA',
    icon: '🤖',
    description: 'Assistant conversationnel disponible 24/7 pour répondre aux questions des clients',
    status: 'active',
    technologies: ['Ollama (llama2)', 'OpenAI GPT-3.5'],
    features: [
      'Suivi de commande',
      'Informations livraison',
      'Politique retour',
      'Guide des tailles',
      'Options paiement',
      'Promotions en cours'
    ],
    endpoint: '/api/ai/chatbot',
    location: 'frontend/src/components/ChatWidget.jsx'
  },
  {
    id: 2,
    name: 'Agent Recherche IA',
    icon: '🔍',
    description: 'Moteur de recherche intelligent avec filtrage avancé par critères',
    status: 'active',
    technologies: ['Ollama', 'API Interne'],
    features: [
      'Recherche par description',
      'Filtrage par couleur',
      'Filtrage par taille',
      'Filtrage par budget',
      'Filtrage par occasion',
      'Résultats personnalisés'
    ],
    endpoint: '/api/ai/search',
    location: 'frontend/src/pages/AISearch.jsx'
  },
  {
    id: 3,
    name: 'Agent Recommandations',
    icon: '💡',
    description: 'Système de recommandations produits basé sur le comportement utilisateur',
    status: 'active',
    technologies: ['Filtrage collaboratif', 'Historique utilisateur'],
    features: [
      'Analyse wishlist',
      'Historique d\'achats',
      'Préférences utilisateur',
      'Produits similaires',
      'Cross-selling',
      'Personnalisation temps réel'
    ],
    endpoint: '/api/ai/recommendations',
    location: 'api/index.js'
  },
  {
    id: 4,
    name: 'Agent Analytics Prédictif',
    icon: '📊',
    description: 'Analyse prédictive des ventes et comportements clients',
    status: 'active',
    technologies: ['Statistiques', 'Forecasting'],
    features: [
      'Taux de conversion',
      'Valeur panier moyen',
      'Taux de retour',
      'Score satisfaction',
      'Prévisions ventes',
      'Prévisions revenus'
    ],
    endpoint: '/api/analytics/predictions',
    location: 'api/index.js'
  },
  {
    id: 5,
    name: 'Agent Automation Emails',
    icon: '📧',
    description: 'Système d\'envoi automatique d\'emails transactionnels',
    status: 'active',
    technologies: ['Triggers automatiques', 'Templates'],
    features: [
      'Email bienvenue',
      'Relances panier abandonné (1h, 24h)',
      'Confirmation d\'achat',
      'Tracking expedition',
      'Demande d\'avis (J+7)',
      'Cadeau anniversaire',
      'Comeback inactifs (30 jours)'
    ],
    endpoint: 'Automatique',
    location: 'api/index.js'
  },
  {
    id: 6,
    name: 'Agent Inventaire',
    icon: '📦',
    description: 'Gestion automatique des stocks et alertes réapprovisionnement',
    status: 'active',
    technologies: ['Seuils dynamiques', 'Notifications'],
    features: [
      'Alertes stock critique (< 5)',
      'Alertes stock bas (< 10)',
      'Désactivation vente auto',
      'Commande fournisseur',
      'Suivi en temps réel',
      'Rapports hebdomadaires'
    ],
    endpoint: 'Automatique',
    location: 'api/index.js'
  },
  {
    id: 7,
    name: 'Agent Fraud Detection',
    icon: '🔒',
    description: 'Système de détection de fraude sur les paiements',
    status: 'active',
    technologies: ['Score de risque', 'Règles métier'],
    features: [
      'Vérification IP pays',
      'Analyse vitesse commande',
      'Détection montant anomal',
      'Score de risque (0-100)',
      'Blocage automatique (> 80)',
      'Alertes admin'
    ],
    endpoint: 'Intégré paiement',
    location: 'api/index.js'
  },
  {
    id: 8,
    name: 'Agent Social Media',
    icon: '📱',
    description: 'Automatisation des publications sur les réseaux sociaux',
    status: 'active',
    technologies: ['Planification', 'API réseaux sociaux'],
    features: [
      'Instagram: Nouveautés 10h00',
      'Facebook: Promotions Lun/Mer/Ven',
      'Pinterest: Lookbook hebdo',
      'Twitter: Deals quotidiens',
      'Hashtags automatique',
      'Rapports performance'
    ],
    endpoint: 'CRON / Webhooks',
    location: 'api/index.js'
  }
]

const stats = {
  totalAgents: 8,
  active: 8,
  apiEndpoints: 12,
  technologies: ['Ollama', 'OpenAI', 'GPT-3.5', 'Filtrage collaboratif', 'Forecasting']
}

export default function Agents() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)

  // Credentials du fondateur (à modifier selon besoin)
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

  // Si non connecté, afficher le formulaire de connexion
  if (!isAuthenticated) {
    return (
      <div style={{ 
        padding: '2rem 20px', 
        maxWidth: '500px', 
        margin: '0 auto', 
        background: '#0a0a0f', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          background: '#16161f', 
          padding: '40px', 
          borderRadius: '20px', 
          border: '1px solid #2a2a35',
          width: '100%'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Accès Réservé</h1>
            <p style={{ color: '#9ca3af' }}>Agents IA - E-DÉSIGNE</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@founder.com"
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  borderRadius: '10px', 
                  border: '1px solid #2a2a35',
                  background: '#0a0a0f',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  borderRadius: '10px', 
                  border: '1px solid #2a2a35',
                  background: '#0a0a0f',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            {error && (
              <div style={{ 
                padding: '12px', 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid #ef4444',
                borderRadius: '8px', 
                color: '#ef4444',
                marginBottom: '20px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '16px', 
                background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)',
                color: '#fff', 
                border: 'none', 
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              Se connecter
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Link to="/" style={{ color: '#6B8DD6', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Page des agents IA (authentifié)
  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', 
        borderRadius: '20px', 
        padding: '40px',
        marginBottom: '40px',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤖 Agents IA</h1>
            <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
              Centre de contrôle des intelligences artificielles E-DÉSIGNE
            </p>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            style={{ 
              padding: '10px 20px', 
              background: 'rgba(255,255,255,0.2)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤖</div>
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalAgents}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Agents IA</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.active}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Actifs</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.apiEndpoints}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Endpoints</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
          <p style={{ color: '#8b5cf6', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.technologies.length}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Technologies</p>
        </div>
      </div>

      {/* Technologies */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Technologies utilisées</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {stats.technologies.map((tech, i) => (
            <span key={i} style={{ 
              padding: '8px 16px', 
              background: '#4B6CB7', 
              color: '#fff', 
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Liste des Agents */}
      <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>Agents disponibles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {agents.map(agent => (
          <div 
            key={agent.id}
            onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            style={{ 
              background: '#16161f', 
              borderRadius: '16px', 
              padding: '24px',
              border: selectedAgent === agent.id ? '2px solid #4B6CB7' : '1px solid #2a2a35',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {agent.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: '#fff', margin: 0 }}>{agent.name}</h3>
                  <span style={{ 
                    padding: '4px 10px', 
                    background: '#22c55e', 
                    color: '#fff', 
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {agent.status}
                  </span>
                </div>
                <p style={{ color: '#9ca3af', margin: '8px 0 0', fontSize: '0.9rem' }}>{agent.description}</p>
              </div>
            </div>

            {selectedAgent === agent.id && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #2a2a35' }}>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: '#4B6CB7', fontWeight: 'bold', marginBottom: '8px' }}>Technologies:</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {agent.technologies.map((tech, i) => (
                      <span key={i} style={{ 
                        padding: '4px 10px', 
                        background: '#0a0a0f', 
                        color: '#9ca3af', 
                        borderRadius: '6px',
                        fontSize: '0.8rem'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: '#4B6CB7', fontWeight: 'bold', marginBottom: '8px' }}>Fonctionnalités:</p>
                  <ul style={{ paddingLeft: '16px', margin: 0, color: '#9ca3af', fontSize: '0.85rem' }}>
                    {agent.features.map((feature, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ 
                  padding: '12px', 
                  background: '#0a0a0f', 
                  borderRadius: '8px',
                  fontSize: '0.8rem'
                }}>
                  <p style={{ margin: '0 0 4px', color: '#6B8DD6' }}><strong>Endpoint:</strong> <code style={{ color: '#22c55e' }}>{agent.endpoint}</code></p>
                  <p style={{ margin: 0, color: '#6B8DD6' }}><strong>Fichier:</strong> <code style={{ color: '#f59e0b' }}>{agent.location}</code></p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Architecture */}
      <div style={{ marginTop: '60px', background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35' }}>
        <h2 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>Architecture E-DÉSIGNE AI ENGINE</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🤖</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Chatbot</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Support 24/7</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Recherche</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>IA Avancée</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💡</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Recommandations</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Personnalisé</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📊</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Analytics</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Prédictif</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📧</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Emails</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Automation</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📦</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Inventaire</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Auto-gestion</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔒</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Fraud</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Sécurité</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📱</div>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>Social</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Marketing Auto</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', padding: '20px', color: '#6B8DD6' }}>
        <p>🔒 Cette page est réservée au fondateur de l'entreprise</p>
        <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>E-DÉSIGNE by ELECTRON © 2026</p>
      </div>
    </div>
  )
}
