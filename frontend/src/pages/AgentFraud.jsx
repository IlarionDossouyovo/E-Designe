import { useState } from 'react'
import { Link } from 'react-router-dom'

const fraudConfig = {
  name: 'Agent Fraud Detection',
  version: '2.0',
  status: 'active',
  rules: [
    { id: 1, name: 'Vérification IP', description: 'Compare pays IP avec pays livraison', score: 20, status: 'active' },
    { id: 2, name: 'Vitesse commande', description: 'Détecte plusieurs commandes même IP', score: 30, status: 'active' },
    { id: 3, name: 'Montant anomal', description: 'Montant > 3x moyenne commande', score: 25, status: 'active' },
    { id: 4, name: 'Email suspect', description: 'Email temporaire ou suspect', score: 15, status: 'active' },
    { id: 5, name: 'Adresse bizarre', description: 'Adresse incomplète ou invalide', score: 10, status: 'active' },
    { id: 6, name: 'Téléphone invalide', description: 'Format téléphone incorrect', score: 10, status: 'active' },
  ],
  stats: {
    totalOrders: 1245,
    flaggedOrders: 45,
    blockedOrders: 12,
    approvedOrders: 1188,
    flagRate: 3.6,
    blockRate: 1.0
  },
  recentAlerts: [
    { id: 1, orderId: 'ORD-1234', reason: 'IP France / Livraison Nigeria', score: 85, action: 'blocked', date: '2026-07-01' },
    { id: 2, orderId: 'ORD-1235', reason: '3 commandes même IP', score: 72, action: 'review', date: '2026-07-01' },
    { id: 3, orderId: 'ORD-1236', reason: 'Montant 850€ (3x moyenne)', score: 65, action: 'review', date: '2026-06-30' },
    { id: 4, orderId: 'ORD-1237', reason: 'Email temporaire détecté', score: 55, action: 'approved', date: '2026-06-30' },
    { id: 5, orderId: 'ORD-1238', reason: 'Téléphone invalide', score: 48, action: 'approved', date: '2026-06-29' },
  ],
  threshold: 80,
  settings: {
    autoBlock: true,
    emailAlert: true,
    adminEmail: 'admin@e-designe.com',
    webhookUrl: 'https://e-designe.com/api/fraud/webhook'
  }
}

export default function AgentFraud() {
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

  const getActionColor = (action) => {
    switch(action) {
      case 'blocked': return '#ef4444'
      case 'review': return '#f59e0b'
      default: return '#22c55e'
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem 20px', maxWidth: '500px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Fraud</h1>
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
      <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', borderRadius: '20px', padding: '30px', marginBottom: '30px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem' }}>🔒</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>🔒 Agent Fraud Detection</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Détection de fraude - Version {fraudConfig.version}</p>
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
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{fraudConfig.stats.totalOrders}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Total Commandes</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{fraudConfig.stats.flaggedOrders}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Signalées</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{fraudConfig.stats.blockedOrders}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Bloquées</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{fraudConfig.stats.approvedOrders}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Approuvées</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{fraudConfig.threshold}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Seuil Blocage</p>
        </div>
      </div>

      {/* Settings */}
      <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', marginBottom: '30px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>⚙️ Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Blocage Auto</p><p style={{ color: '#fff', margin: 0 }}>{fraudConfig.settings.autoBlock ? '✅ Activé' : '❌ Désactivé'}</p></div>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Alerte Email</p><p style={{ color: '#fff', margin: 0 }}>{fraudConfig.settings.emailAlert ? '✅ Activé' : '❌ Désactivé'}</p></div>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Email Admin</p><p style={{ color: '#fff', margin: 0 }}>{fraudConfig.settings.adminEmail}</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px' }}>
        {['overview', 'rules', 'alerts'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? '#ef4444' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'overview' ? '📊 Aperçu' : tab === 'rules' ? '📋 Règles' : tab === 'alerts' ? '🚨 Alertes' : ''}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Score de Risque</h3>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(#ef4444 0deg 60deg, #f59e0b 60deg 120deg, #22c55e 120deg 360deg)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#16161f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>{fraudConfig.threshold}+</span>
                  <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Bloquer</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Taux de Détection</h3>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff' }}>Signalé</span>
                <span style={{ color: '#f59e0b' }}>{fraudConfig.stats.flagRate}%</span>
              </div>
              <div style={{ background: '#0a0a0f', height: '8px', borderRadius: '4px' }}>
                <div style={{ width: `${fraudConfig.stats.flagRate * 10}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff' }}>Bloqué</span>
                <span style={{ color: '#ef4444' }}>{fraudConfig.stats.blockRate}%</span>
              </div>
              <div style={{ background: '#0a0a0f', height: '8px', borderRadius: '4px' }}>
                <div style={{ width: `${fraudConfig.stats.blockRate * 10}%`, height: '100%', background: '#ef4444', borderRadius: '4px' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff' }}>Approuvé</span>
                <span style={{ color: '#22c55e' }}>{100 - fraudConfig.stats.flagRate - fraudConfig.stats.blockRate}%</span>
              </div>
              <div style={{ background: '#0a0a0f', height: '8px', borderRadius: '4px' }}>
                <div style={{ width: '95%', height: '100%', background: '#22c55e', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '16px', background: '#0a0a0f', borderBottom: '1px solid #2a2a35', fontWeight: 'bold', color: '#9ca3af' }}>
            <span>Règle</span>
            <span>Description</span>
            <span>Score</span>
            <span>Status</span>
          </div>
          {fraudConfig.rules.map((rule, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '16px', borderBottom: '1px solid #2a2a35', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{rule.name}</span>
              <span style={{ color: '#9ca3af' }}>{rule.description}</span>
              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>+{rule.score}</span>
              <span style={{ padding: '4px 12px', background: '#22c55e', color: '#fff', borderRadius: '12px', fontSize: '0.8rem', textAlign: 'center', width: 'fit-content' }}>{rule.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr', padding: '16px', background: '#0a0a0f', borderBottom: '1px solid #2a2a35', fontWeight: 'bold', color: '#9ca3af' }}>
            <span>Commande</span>
            <span>Raison</span>
            <span>Score</span>
            <span>Action</span>
            <span>Date</span>
          </div>
          {fraudConfig.recentAlerts.map((alert, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr', padding: '16px', borderBottom: '1px solid #2a2a35', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{alert.orderId}</span>
              <span style={{ color: '#9ca3af' }}>{alert.reason}</span>
              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{alert.score}</span>
              <span style={{ padding: '4px 12px', background: getActionColor(alert.action), color: '#fff', borderRadius: '12px', fontSize: '0.8rem', textAlign: 'center', width: 'fit-content' }}>{alert.action}</span>
              <span style={{ color: '#6B8DD6' }}>{alert.date}</span>
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
