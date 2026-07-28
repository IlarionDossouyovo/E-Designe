import { useState } from 'react'
import { Link } from 'react-router-dom'

const emailsConfig = {
  name: 'Agent Automation Emails',
  version: '2.0',
  status: 'active',
  triggers: [
    { id: 1, name: 'Bienvenue', event: 'user.register', delay: 0, template: 'welcome', status: 'active', sent: 1245 },
    { id: 2, name: 'Relance Panier #1', event: 'cart.abandon', delay: 3600, template: 'reminder1', status: 'active', sent: 456 },
    { id: 3, name: 'Relance Panier #2', event: 'cart.abandon', delay: 86400, template: 'reminder2', status: 'active', sent: 234 },
    { id: 4, name: 'Confirmation Commande', event: 'order.complete', delay: 0, template: 'confirmation', status: 'active', sent: 892 },
    { id: 5, name: 'Tracking Expedition', event: 'shipping', delay: 0, template: 'tracking', status: 'active', sent: 875 },
    { id: 6, name: 'Demande Avis', event: 'order.complete', delay: 604800, template: 'review', status: 'active', sent: 678 },
    { id: 7, name: 'Cadeau Anniversaire', event: 'birthday', delay: -86400, template: 'birthday', status: 'active', sent: 89 },
    { id: 8, name: 'Comeback Inactif', event: 'user.inactive', delay: 2592000, template: 'comeback', status: 'active', sent: 156 },
  ],
  templates: [
    { id: 1, name: 'welcome', subject: 'Bienvenue chez E-Designe! 🎉', opens: 892, clicks: 234 },
    { id: 2, name: 'reminder1', subject: 'Vous avez oublié quelque chose...', opens: 345, clicks: 89 },
    { id: 3, name: 'reminder2', subject: 'Votre panier attend! ⏰', opens: 178, clicks: 45 },
    { id: 4, name: 'confirmation', subject: 'Commande confirmée - #ORD-XXX', opens: 856, clicks: 123 },
    { id: 5, name: 'tracking', subject: 'Votre commande est en route! 📦', opens: 823, clicks: 567 },
    { id: 6, name: 'review', subject: 'Qu\'en avez-vous pensez? ⭐', opens: 456, clicks: 234 },
    { id: 7, name: 'birthday', subject: 'Joyeux Anniversaire! 🎂 -10%', opens: 78, clicks: 45 },
    { id: 8, name: 'comeback', subject: 'Nous vous attendons! 💫', opens: 123, clicks: 67 },
  ],
  stats: {
    totalSent: 4625,
    totalOpens: 3051,
    totalClicks: 1404,
    openRate: 66,
    clickRate: 46
  },
  settings: {
    provider: 'Mailchimp',
    apiKey: '••••••••••••',
    fromName: 'E-Designe',
    fromEmail: 'newsletter@e-designe.com',
    replyTo: 'support@e-designe.com'
  }
}

export default function AgentEmails() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('triggers')

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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📧</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Emails</h1>
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
      <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', borderRadius: '20px', padding: '30px', marginBottom: '30px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem' }}>📧</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>📧 Agent Automation Emails</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Gestion des emails automatisés - Version {emailsConfig.version}</p>
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
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{emailsConfig.stats.totalSent.toLocaleString()}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Envoyés</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{emailsConfig.stats.totalOpens.toLocaleString()}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Ouvertures</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{emailsConfig.stats.totalClicks.toLocaleString()}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Clics</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{emailsConfig.stats.openRate}%</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Taux Ouverture</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#8b5cf6', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{emailsConfig.stats.clickRate}%</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Taux Clic</p>
        </div>
      </div>

      {/* Settings */}
      <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', marginBottom: '30px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>⚙️ Configuration Email</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Fournisseur</p><p style={{ color: '#fff', margin: 0 }}>{emailsConfig.settings.provider}</p></div>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Expéditeur</p><p style={{ color: '#fff', margin: 0 }}>{emailsConfig.settings.fromName}</p></div>
          <div><p style={{ color: '#9ca3af', margin: '0 0 5px', fontSize: '0.85rem' }}>Email</p><p style={{ color: '#fff', margin: 0 }}>{emailsConfig.settings.fromEmail}</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px' }}>
        {['triggers', 'templates', 'stats'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? '#8b5cf6' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'triggers' ? '⚡ Déclencheurs' : tab === 'templates' ? '📝 Templates' : '📊 Statistiques'}
          </button>
        ))}
      </div>

      {/* Triggers Tab */}
      {activeTab === 'triggers' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', padding: '16px', background: '#0a0a0f', borderBottom: '1px solid #2a2a35', fontWeight: 'bold', color: '#9ca3af' }}>
            <span>Nom</span>
            <span>Événement</span>
            <span>Délai</span>
            <span>Template</span>
            <span>Envoyés</span>
            <span>Status</span>
          </div>
          {emailsConfig.triggers.map((trigger, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', padding: '16px', borderBottom: '1px solid #2a2a35', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{trigger.name}</span>
              <span style={{ color: '#6B8DD6' }}>{trigger.event}</span>
              <span style={{ color: '#9ca3af' }}>{trigger.delay > 0 ? `${Math.round(trigger.delay/3600)}h` : trigger.delay < 0 ? `${Math.abs(trigger.delay/86400)}j avant` : '0'}</span>
              <span style={{ color: '#f59e0b' }}>{trigger.template}</span>
              <span style={{ color: '#22c55e' }}>{trigger.sent}</span>
              <span style={{ padding: '4px 12px', background: '#22c55e', color: '#fff', borderRadius: '12px', fontSize: '0.8rem', textAlign: 'center' }}>{trigger.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {emailsConfig.templates.map((template, i) => (
            <div key={i} style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
              <h4 style={{ color: '#fff', margin: '0 0 10px' }}>{template.name}</h4>
              <p style={{ color: '#6B8DD6', margin: '0 0 15px', fontSize: '0.9rem' }}>{template.subject}</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div><span style={{ color: '#22c55e', fontWeight: 'bold' }}>{template.opens}</span><span style={{ color: '#9ca3af', fontSize: '0.85rem' }}> ouvertures</span></div>
                <div><span style={{ color: '#4B6CB7', fontWeight: 'bold' }}>{template.clicks}</span><span style={{ color: '#9ca3af', fontSize: '0.85rem' }}> clics</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>📊 Performance par Email</h3>
          {emailsConfig.templates.map((template, i) => {
            const openRate = Math.round((template.opens / emailsConfig.stats.totalSent) * 100)
            const clickRate = Math.round((template.clicks / template.opens) * 100)
            return (
              <div key={i} style={{ padding: '16px', borderBottom: '1px solid #2a2a35' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{template.name}</span>
                  <span style={{ color: '#6B8DD6' }}>{template.subject}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#22c55e' }}>Ouvertures: {template.opens} ({openRate}%)</span>
                  <span style={{ color: '#4B6CB7' }}>Clics: {template.clicks} ({clickRate}%)</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/agents" style={{ color: '#6B8DD6', textDecoration: 'none' }}>← Retour aux agents</Link>
      </div>
    </div>
  )
}
