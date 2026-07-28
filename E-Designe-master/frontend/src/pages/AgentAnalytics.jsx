import { useState } from 'react'
import { Link } from 'react-router-dom'

const analyticsConfig = {
  name: 'Agent Analytics Prédictif',
  version: '2.0',
  status: 'active',
  features: [
    { id: 1, name: 'KPIs Temps Réel', description: 'Suivi des métriques clés en temps réel', status: 'active' },
    { id: 2, name: 'Prévisions Ventes', description: 'Prédiction des commandes et revenus', status: 'active' },
    { id: 3, name: 'Taux Conversion', description: 'Analyse du tunnel de conversion', status: 'active' },
    { id: 4, name: 'Valeur Panier', description: 'Panier moyen et tendances', status: 'active' },
    { id: 5, name: 'Taux Retour', description: 'Suivi des retours et原因', status: 'active' },
    { id: 6, name: 'Satisfaction Client', description: 'Score NPS et avis', status: 'active' },
  ],
  kpis: {
    conversionRate: 2.3,
    avgCartValue: 89.99,
    returnRate: 8.5,
    satisfaction: 4.2,
    totalVisits: 15420,
    totalOrders: 355,
    totalRevenue: 28450
  },
  forecast: {
    nextOrders: 120,
    nextRevenue: 8500,
    growthRate: 15.2
  },
  charts: [
    { type: 'line', name: 'Ventes', data: [1200, 1400, 1300, 1600, 1800, 2000, 2100, 1900, 2200, 2400, 2600, 2800] },
    { type: 'bar', name: 'Commandes', data: [45, 52, 48, 55, 60, 65, 62, 58, 70, 75, 80, 85] }
  ],
  topProducts: [
    { name: 'Robe Élégante Noire', sales: 45, revenue: 4049.55 },
    { name: 'Boubou Traditionnel', sales: 38, revenue: 5699.62 },
    { name: 'Chemise Blanche', sales: 32, revenue: 1599.68 },
    { name: 'Pantalon Chino', sales: 28, revenue: 1679.72 },
    { name: 'Robe Ankara Colorée', sales: 25, revenue: 2249.75 }
  ],
  trafficSources: [
    { source: 'Google', visits: 5500, percentage: 35.7 },
    { source: 'Instagram', visits: 3200, percentage: 20.8 },
    { source: 'Facebook', visits: 2800, percentage: 18.2 },
    { source: 'Direct', visits: 2100, percentage: 13.6 },
    { source: 'Email', visits: 820, percentage: 5.3 },
    { source: 'Autres', visits: 1000, percentage: 6.4 }
  ]
}

export default function AgentAnalytics() {
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Analytics</h1>
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
            <div style={{ fontSize: '3rem' }}>📊</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>📊 Agent Analytics Prédictif</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Tableau de bord analytique - Version {analyticsConfig.version}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ padding: '8px 16px', background: '#22c55e', borderRadius: '20px', fontSize: '0.85rem' }}>✅ Actif</span>
            <button onClick={() => setIsAuthenticated(false)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Déconnexion</button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.kpis.conversionRate}%</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Taux Conversion</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.kpis.avgCartValue}€</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Panier Moyen</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.kpis.returnRate}%</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Taux Retour</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#8b5cf6', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.kpis.satisfaction}/5</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Satisfaction</p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
          <h4 style={{ color: '#9ca3af', margin: '0 0 10px', fontSize: '0.9rem' }}>Visites Totales</h4>
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.kpis.totalVisits.toLocaleString()}</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
          <h4 style={{ color: '#9ca3af', margin: '0 0 10px', fontSize: '0.9rem' }}>Commandes</h4>
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.kpis.totalOrders}</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
          <h4 style={{ color: '#9ca3af', margin: '0 0 10px', fontSize: '0.9rem' }}>Revenus Totaux</h4>
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.kpis.totalRevenue.toLocaleString()}€</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px' }}>
        {['overview', 'forecast', 'products', 'traffic'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? '#f59e0b' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'overview' ? '📈 Aperçu' : tab === 'forecast' ? '🔮 Prévisions' : tab === 'products' ? '🛍️ Produits' : '🚢 Trafic'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Ventes Mensuelles (12 mois)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '150px' }}>
              {[1200, 1400, 1300, 1600, 1800, 2000, 2100, 1900, 2200, 2400, 2600, 2800].map((val, i) => (
                <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, #4B6CB7, #6B8DD6)', borderRadius: '4px 4px 0 0', height: `${(val / 2800) * 100}%` }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Jan</span>
              <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Déc</span>
            </div>
          </div>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Commandes Mensuelles</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '150px' }}>
              {[45, 52, 48, 55, 60, 65, 62, 58, 70, 75, 80, 85].map((val, i) => (
                <div key={i} style={{ flex: 1, background: '#f59e0b', borderRadius: '4px 4px 0 0', height: `${(val / 100) * 100}%` }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Jan</span>
              <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Déc</span>
            </div>
          </div>
        </div>
      )}

      {/* Forecast Tab */}
      {activeTab === 'forecast' && (
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>🔮 Prévisions Prochain Mois</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ color: '#22c55e', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.forecast.nextOrders}</p>
              <p style={{ color: '#9ca3af', margin: '10px 0 0' }}>Commandes Prévues</p>
            </div>
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ color: '#f59e0b', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{analyticsConfig.forecast.nextRevenue}€</p>
              <p style={{ color: '#9ca3af', margin: '10px 0 0' }}>Revenus Prévus</p>
            </div>
            <div style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ color: '#4B6CB7', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>+{analyticsConfig.forecast.growthRate}%</p>
              <p style={{ color: '#9ca3af', margin: '10px 0 0' }}>Croissance Prévue</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>🛍️ Top Produits</h3>
          {analyticsConfig.topProducts.map((product, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #2a2a35' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#4B6CB7', fontWeight: 'bold', fontSize: '1.2rem' }}>#{i + 1}</span>
                <span style={{ color: '#fff' }}>{product.name}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>{product.sales} ventes</p>
                <p style={{ color: '#22c55e', margin: 0, fontSize: '0.9rem' }}>{product.revenue.toFixed(2)}€</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Traffic Tab */}
      {activeTab === 'traffic' && (
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>🚢 Sources de Trafic</h3>
          {analyticsConfig.trafficSources.map((source, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ color: '#fff' }}>{source.source}</span>
                <span style={{ color: '#9ca3af' }}>{source.visits.toLocaleString()} ({source.percentage}%)</span>
              </div>
              <div style={{ background: '#0a0a0f', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${source.percentage}%`, height: '100%', background: '#4B6CB7', borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/agents" style={{ color: '#6B8DD6', textDecoration: 'none' }}>← Retour aux agents</Link>
      </div>
    </div>
  )
}
