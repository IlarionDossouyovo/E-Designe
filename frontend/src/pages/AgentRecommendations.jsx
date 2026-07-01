import { useState } from 'react'
import { Link } from 'react-router-dom'

const recommendationsConfig = {
  name: 'Agent Recommandations',
  version: '2.0',
  status: 'active',
  algorithms: [
    { id: 1, name: 'Filtrage Collaboratif', description: 'Basé sur les utilisateurs similaires', status: 'active', weight: 40 },
    { id: 2, name: 'Contenu-Based', description: 'Basé sur les produits similaires', status: 'active', weight: 30 },
    { id: 3, name: 'Historique', description: 'Basé sur l\'historique d\'achats', status: 'active', weight: 20 },
    { id: 4, name: 'Tendances', description: 'Produits populaires du moment', status: 'active', weight: 10 },
  ],
  stats: {
    totalRecommendations: 8560,
    clickThroughRate: 12.5,
    conversionRate: 4.2,
    avgProductsShown: 4,
    revenueGenerated: 15670
  },
  topRecommendations: [
    { id: 1, product: 'Robe Élégante Noire', category: 'Robes', matched: 'historique achat', conversions: 45 },
    { id: 2, product: 'Boubou Traditionnel', category: 'Africain', matched: 'filtrage collaboratif', conversions: 38 },
    { id: 3, product: 'Chemise Blanche', category: 'Chemises', matched: 'contenu-based', conversions: 32 },
    { id: 4, product: 'Pantalon Chino', category: 'Pantalons', matched: 'tendances', conversions: 28 },
    { id: 5, product: 'Robe Ankara', category: 'Africain', matched: 'filtrage collaboratif', conversions: 25 },
  ],
  segments: [
    { name: 'Nouveau (< 30 jours)', users: 234, conversion: 1.2 },
    { name: 'Actif (achat 30j)', users: 567, conversion: 5.8 },
    { name: 'VIP (> 500€ total)', users: 89, conversion: 12.5 },
    { name: 'À risque (inactif)', users: 156, conversion: 0.5 },
    { name: 'Retractor (retours)', users: 45, conversion: 2.1 },
  ],
  settings: {
    maxRecommendations: 4,
    minScore: 0.3,
    refreshInterval: 24,
    enableRealTime: true
  }
}

export default function AgentRecommendations() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

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

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem 20px', maxWidth: '500px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💡</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Recommandations</h1>
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
      <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '20px', padding: '30px', marginBottom: '30px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem' }}>💡</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>💡 Agent Recommandations</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Moteur de recommandations produits - Version {recommendationsConfig.version}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ padding: '8px 16px', background: '#22c55e', borderRadius: '20px', fontSize: '0.85rem' }}>✅ Actif</span>
            <button onClick={() => setIsAuthenticated(false)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Déconnexion</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{recommendationsConfig.stats.totalRecommendations.toLocaleString()}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Recommandations</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{recommendationsConfig.stats.clickThroughRate}%</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>CTR</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{recommendationsConfig.stats.conversionRate}%</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Conversion</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{recommendationsConfig.stats.avgProductsShown}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Produits Moyens</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#8b5cf6', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{recommendationsConfig.stats.revenueGenerated}€</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Revenus Générés</p>
        </div>
      </div>

      {/* Settings */}
      <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', marginBottom: '30px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>⚙️ Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Max Recommandations</p><p style={{ color: '#fff', margin: 0 }}>{recommendationsConfig.settings.maxRecommendations}</p></div>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Score Minimum</p><p style={{ color: '#fff', margin: 0 }}>{recommendationsConfig.settings.minScore}</p></div>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Intervalle Rafraîchissement</p><p style={{ color: '#fff', margin: 0 }}>{recommendationsConfig.settings.refreshInterval}h</p></div>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Temps Réel</p><p style={{ color: '#fff', margin: 0 }}>{recommendationsConfig.settings.enableRealTime ? '✅ Activé' : '❌ Désactivé'}</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px' }}>
        {['overview', 'algorithms', 'segments', 'performance'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? '#f59e0b' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'overview' ? '📊 Aperçu' : tab === 'algorithms' ? '⚙️ Algorithmes' : tab === 'segments' ? '👥 Segments' : '📈 Performance'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>Top Recommandations</h3>
          {recommendationsConfig.topRecommendations.map((rec, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #2a2a35' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '1.2rem' }}>#{i + 1}</span>
                <div>
                  <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>{rec.product}</p>
                  <p style={{ color: '#6B8DD6', margin: '4px 0 0', fontSize: '0.85rem' }}>{rec.category} • {rec.matched}</p>
                </div>
              </div>
              <span style={{ padding: '6px 14px', background: '#22c55e', color: '#fff', borderRadius: '16px', fontWeight: 'bold' }}>{rec.conversions} conversions</span>
            </div>
          ))}
        </div>
      )}

      {/* Algorithms Tab */}
      {activeTab === 'algorithms' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {recommendationsConfig.algorithms.map((algo, i) => (
            <div key={i} style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: '#fff', margin: 0 }}>{algo.name}</h4>
                <span style={{ padding: '4px 12px', background: '#22c55e', color: '#fff', borderRadius: '12px', fontSize: '0.8rem' }}>{algo.status}</span>
              </div>
              <p style={{ color: '#9ca3af', margin: '0 0 15px', fontSize: '0.9rem' }}>{algo.description}</p>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Poids</span>
                  <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{algo.weight}%</span>
                </div>
                <div style={{ background: '#0a0a0f', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${algo.weight}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Segments Tab */}
      {activeTab === 'segments' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px', background: '#0a0a0f', borderBottom: '1px solid #2a2a35', fontWeight: 'bold', color: '#9ca3af' }}>
            <span>Segment</span>
            <span>Utilisateurs</span>
            <span>Conversion</span>
          </div>
          {recommendationsConfig.segments.map((segment, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px', borderBottom: '1px solid #2a2a35', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{segment.name}</span>
              <span style={{ color: '#6B8DD6' }}>{segment.users}</span>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{segment.conversion}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Taux de Clic</h3>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(#22c55e 0deg 45deg, #0a0a0f 45deg 360deg)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#16161f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>{recommendationsConfig.stats.clickThroughRate}%</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Taux de Conversion</h3>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(#4B6CB7 0deg 15deg, #0a0a0f 15deg 360deg)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#16161f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>{recommendationsConfig.stats.conversionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/agents" style={{ color: '#6B8DD6', textDecoration: 'none' }}>← Retour aux agents</Link>
      </div>
    </div>
  )
}
