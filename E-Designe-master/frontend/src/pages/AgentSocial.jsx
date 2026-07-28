import { useState } from 'react'
import { Link } from 'react-router-dom'

const socialConfig = {
  name: 'Agent Social Media',
  version: '2.0',
  status: 'active',
  platforms: [
    { 
      id: 1, 
      name: 'Instagram', 
      icon: '📸', 
      connected: true,
      followers: 12500,
      schedule: '10:00',
      postsPerWeek: 7,
      content: 'Nouveautés produits, lifestyle, looks',
      automation: true
    },
    { 
      id: 2, 
      name: 'Facebook', 
      icon: '📘', 
      connected: true,
      followers: 8200,
      schedule: '09:00, 14:00, 18:00',
      postsPerWeek: 3,
      content: 'Promotions, événements',
      automation: true
    },
    { 
      id: 3, 
      name: 'Pinterest', 
      icon: '📌', 
      connected: true,
      followers: 3500,
      schedule: '12:00',
      postsPerWeek: 1,
      content: 'Lookbook, inspirations',
      automation: true
    },
    { 
      id: 4, 
      name: 'Twitter', 
      icon: '🐦', 
      connected: false,
      followers: 0,
      schedule: 'Toutes les heures',
      postsPerWeek: 7,
      content: 'Deals, promotions flash',
      automation: false
    },
  ],
  scheduledPosts: [
    { id: 1, platform: 'Instagram', content: 'Nouvelle collection été 2026! 🌞', scheduledFor: '2026-07-02 10:00', status: 'scheduled' },
    { id: 2, platform: 'Facebook', content: '-30% sur les boubous traditionnels!', scheduledFor: '2026-07-03 09:00', status: 'scheduled' },
    { id: 3, platform: 'Instagram', content: 'Robe Ankara - Style authentique', scheduledFor: '2026-07-04 10:00', status: 'scheduled' },
    { id: 4, platform: 'Pinterest', content: 'Lookbook été - Inspiration mode', scheduledFor: '2026-07-05 12:00', status: 'draft' },
  ],
  hashtags: {
    general: ['#EDesigne', '#ModeAfricaine', '#ModeFemme', '#Style', '#Tendance'],
    dresses: ['#RobeMode', '#RobeAfricaine', '#Ankara', '#Boubou'],
    men: ['#ModeHomme', '#StyleMasculin', '#CostumeAfricain'],
    sales: ['#Soldes', '#Promo', '#BonPlan', '#Code promo']
  },
  stats: {
    totalPosts: 156,
    totalEngagement: 12450,
    avgLikes: 450,
    avgComments: 35,
    reach: 45000
  }
}

export default function AgentSocial() {
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📱</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Social Media</h1>
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
      <div style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', borderRadius: '20px', padding: '30px', marginBottom: '30px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem' }}>📱</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>📱 Agent Social Media</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Automatisation des réseaux sociaux - Version {socialConfig.version}</p>
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
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{socialConfig.stats.totalPosts}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Posts Totaux</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#ec4899', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{socialConfig.stats.totalEngagement.toLocaleString()}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Engagements</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{socialConfig.stats.avgLikes}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Likes Moyens</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{socialConfig.stats.avgComments}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Commentaires</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{(socialConfig.stats.reach / 1000).toFixed(1)}K</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Portée</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px' }}>
        {['overview', 'platforms', 'scheduled', 'hashtags'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? '#ec4899' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'overview' ? '📊 Aperçu' : tab === 'platforms' ? '🌐 Plateformes' : tab === 'scheduled' ? '📅 Planifiés' : '#️⃣ Hashtags'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {socialConfig.platforms.map((platform, i) => (
            <div key={i} style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{platform.icon}</div>
              <h3 style={{ color: '#fff', margin: '0 0 10px' }}>{platform.name}</h3>
              <p style={{ color: '#22c55e', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{platform.followers.toLocaleString()}</p>
              <p style={{ color: '#9ca3af', margin: '5px 0' }}>followers</p>
              <span style={{ padding: '4px 12px', background: platform.connected ? '#22c55e' : '#ef4444', color: '#fff', borderRadius: '12px', fontSize: '0.8rem' }}>
                {platform.connected ? 'Connecté' : 'Déconnecté'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'platforms' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', padding: '16px', background: '#0a0a0f', borderBottom: '1px solid #2a2a35', fontWeight: 'bold', color: '#9ca3af' }}>
            <span>Plateforme</span>
            <span>Followers</span>
            <span>Horaire</span>
            <span>Posts/semaine</span>
            <span>Type contenu</span>
            <span>Status</span>
          </div>
          {socialConfig.platforms.map((platform, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', padding: '16px', borderBottom: '1px solid #2a2a35', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{platform.icon}</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{platform.name}</span>
              </div>
              <span style={{ color: '#fff' }}>{platform.followers.toLocaleString()}</span>
              <span style={{ color: '#9ca3af' }}>{platform.schedule}</span>
              <span style={{ color: '#4B6CB7' }}>{platform.postsPerWeek}</span>
              <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{platform.content}</span>
              <span style={{ padding: '4px 12px', background: platform.connected ? '#22c55e' : '#ef4444', color: '#fff', borderRadius: '12px', fontSize: '0.8rem', textAlign: 'center' }}>
                {platform.connected ? '✅' : '❌'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Tab */}
      {activeTab === 'scheduled' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '16px', background: '#0a0a0f', borderBottom: '1px solid #2a2a35', fontWeight: 'bold', color: '#9ca3af' }}>
            <span>Plateforme</span>
            <span>Contenu</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          {socialConfig.scheduledPosts.map((post, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '16px', borderBottom: '1px solid #2a2a35', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{post.platform}</span>
              <span style={{ color: '#9ca3af' }}>{post.content}</span>
              <span style={{ color: '#6B8DD6' }}>{post.scheduledFor}</span>
              <span style={{ padding: '4px 12px', background: post.status === 'scheduled' ? '#22c55e' : '#f59e0b', color: '#fff', borderRadius: '12px', fontSize: '0.8rem', textAlign: 'center' }}>
                {post.status === 'scheduled' ? 'Planifié' : 'Brouillon'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Hashtags Tab */}
      {activeTab === 'hashtags' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {Object.entries(socialConfig.hashtags).map(([category, tags], i) => (
            <div key={i} style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
              <h3 style={{ color: '#fff', marginBottom: '15px', textTransform: 'capitalize' }}>{category}</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {tags.map((tag, j) => (
                  <span key={j} style={{ padding: '6px 12px', background: '#0a0a0f', color: '#ec4899', borderRadius: '16px', fontSize: '0.85rem' }}>
                    {tag}
                  </span>
                ))}
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
