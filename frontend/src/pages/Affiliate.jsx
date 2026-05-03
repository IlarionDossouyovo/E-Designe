import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ============== PROGRAMME D'AFFILIATION E-DÉSIGNE ==============
const affiliateTiers = {
  bronze: {
    name: 'Bronze Partner',
    commission: '8%',
    requirement: '0-50 ventes/mois',
    benefits: ['Accès dashboard basique', 'Bannières standards', 'Support email'],
    color: '#CD7F32'
  },
  silver: {
    name: 'Silver Partner',
    commission: '12%',
    requirement: '51-200 ventes/mois',
    benefits: ['Dashboard avancé', 'Bannières premium', 'Support prioritaire', 'Early access'],
    color: '#C0C0C0'
  },
  gold: {
    name: 'Gold Partner',
    commission: '15%',
    requirement: '201-500 ventes/mois',
    benefits: ['Dashboard pro', 'Bannières exclusives', 'Support VIP', 'Accès beta', 'Manager dédiée'],
    color: '#FFD700'
  },
  platinum: {
    name: 'Platinum Partner',
    commission: '18%',
    requirement: '500+ ventes/mois',
    benefits: ['Dashboard enterprise', 'Bannières personnalisées', 'Support 24/7', 'API access', 'Commission mensuelle'],
    color: '#E5E4E2'
  }
}

const commissionRates = [
  { category: 'Vêtements Hommes', rate: '12%', avgEarning: '25-45€' },
  { category: 'Vêtements Femmes', rate: '12%', avgEarning: '25-50€' },
  { category: 'Chaussures', rate: '10%', avgEarning: '15-35€' },
  { category: 'Accessoires', rate: '15%', avgEarning: '10-30€' },
  { category: 'Cosmétiques', rate: '12%', avgEarning: '8-20€' },
  { category: 'Luxe', rate: '8%', avgEarning: '50-150€' }
]

const tools = [
  { name: ' liens Tracked', desc: 'Suivez chaque clic et vente', icon: '🔗' },
  { name: 'Dashboard Temps Réel', desc: 'Statistiques en direct', icon: '📊' },
  { name: 'API Partners', desc: 'Intégrez à votre site', icon: '⚡' },
  { name: 'Bannières HD', desc: 'Visuels haute résolution', icon: '🖼️' },
  { name: 'Coupons Réduc', desc: 'Codes promo exclusifs', icon: '🎟️' },
  { name: 'Rapports', desc: 'Export CSV/PDF', icon: '📑' }
]

const services = [
  {
    name: 'Stripe Connect',
    description: 'Paiements sécurisés automatiques',
    logo: '💳',
    status: 'connected'
  },
  {
    name: 'PayPal Partner',
    description: 'Commission via PayPal',
    logo: '🅿️',
    status: 'connected'
  },
  {
    name: 'Amazon Associates',
    description: 'Affiliate products',
    logo: '📦',
    status: 'pending'
  },
  {
    name: 'Awin',
    description: 'European network',
    logo: '🌍',
    status: 'pending'
  },
  {
    name: 'CJ Affiliate',
    description: 'Global network',
    logo: '🌐',
    status: 'pending'
  },
  {
    name: 'Google Analytics',
    description: 'Tracking & analytics',
    logo: '📈',
    status: 'connected'
  },
  {
    name: 'Meta Pixel',
    description: 'Facebook/Instagram ads',
    logo: '📘',
    status: 'connected'
  },
  {
    name: 'TikTok Pixel',
    description: 'TikTok advertising',
    logo: '🎵',
    status: 'pending'
  },
  {
    name: 'Mailchimp',
    description: 'Email marketing automation',
    logo: '📧',
    status: 'connected'
  },
  {
    name: 'Twilio',
    description: 'SMS notifications',
    logo: '📱',
    status: 'pending'
  },
  {
    name: 'Zendesk',
    description: 'Customer support',
    logo: '💬',
    status: 'connected'
  },
  {
    name: 'ShipStation',
    description: 'Shipping automation',
    logo: '🚚',
    status: 'pending'
  }
]

const stats = {
  activeAffiliates: 1247,
  totalSales: '2.4M€',
  avgCommission: '14.2%',
  topEarner: '8,450€/mois'
}

export default function AffiliatePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    platform: '',
    traffic: '',
    message: ''
  })
  const [activeTab, setActiveTab] = useState('program')

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span style={{ 
            color: '#4B6CB7', 
            fontWeight: 600, 
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontSize: '14px'
          }}>
            Programme International
          </span>
          <h1 style={{ 
            color: '#fff', 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            marginTop: '1rem',
            marginBottom: '1rem'
          }}>
            Devenez Partenaire E-Designe 💎
          </h1>
          <p style={{ 
            color: '#9ca3af', 
            maxWidth: '600px', 
            margin: '0 auto 2rem',
            fontSize: '18px',
            lineHeight: 1.7
          }}>
            Gagnez jusqu'à 18% de commission sur chaque venta. 
            Rejoignez +1,200 partenaires dans le monde entier.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              padding: '16px 40px',
              background: '#4B6CB7',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '16px',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              Je m'inscris gratuitement
            </Link>
            <button style={{
              padding: '16px 40px',
              background: 'transparent',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Voir les commissions
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        maxWidth: '1200px',
        margin: '-40px auto 3rem',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        {[
          { label: 'Partenaires Actifs', value: stats.activeAffiliates.toLocaleString(), icon: '👥' },
          { label: 'Ventes Totales', value: stats.totalSales, icon: '💰' },
          { label: 'Commission Moyenne', value: stats.avgCommission, icon: '📊' },
          { label: 'Top Gagnant', value: stats.topEarner, icon: '🏆' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            style={{
              background: '#16161f',
              padding: '1.5rem',
              borderRadius: '16px',
              textAlign: 'center',
              border: '1px solid #2a2a35'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ color: '#4B6CB7', fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        padding: '0 20px',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {['program', 'commissions', 'tools', 'services'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              background: activeTab === tab ? '#4B6CB7' : 'transparent',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'capitalize'
            }}
          >
            {tab === 'program' && 'Programme'}
            {tab === 'commissions' && 'Commissions'}
            {tab === 'tools' && 'Outils'}
            {tab === 'services' && 'Services'}
          </button>
        ))}
      </div>

      {/* Program Content */}
      {activeTab === 'program' && (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 4rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {Object.entries(affiliateTiers).map(([key, tier]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: '#16161f',
                  padding: '2rem',
                  borderRadius: '20px',
                  border: key === 'gold' ? `2px solid ${tier.color}` : '1px solid #2a2a35',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  color: tier.color, 
                  fontSize: '1.25rem', 
                  fontWeight: 700,
                  marginBottom: '0.5rem' 
                }}>
                  {tier.name}
                </div>
                <div style={{ 
                  color: '#4B6CB7', 
                  fontSize: '2.5rem', 
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  {tier.commission}
                </div>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '14px' }}>
                  {tier.requirement}
                </p>
                <ul style={{ textAlign: 'left', listStyle: 'none' }}>
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} style={{ 
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #2a2a35',
                      color: '#9ca3af',
                      fontSize: '14px'
                    }}>
                      ✓ {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Commissions */}
      {activeTab === 'commissions' && (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 4rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>
              Commissions par Catégorie
            </h2>
            <div style={{
              background: '#16161f',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1f1f2e' }}>
                    <th style={{ padding: '1rem', color: '#9ca3af', textAlign: 'left' }}>Catégorie</th>
                    <th style={{ padding: '1rem', color: '#9ca3af', textAlign: 'center' }}>Commission</th>
                    <th style={{ padding: '1rem', color: '#9ca3af', textAlign: 'right' }}>Gain Moyen</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionRates.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #2a2a35' }}>
                      <td style={{ padding: '1rem', color: '#fff' }}>{item.category}</td>
                      <td style={{ padding: '1rem', color: '#4B6CB7', textAlign: 'center', fontWeight: 600 }}>
                        {item.rate}
                      </td>
                      <td style={{ padding: '1rem', color: '#00D9A5', textAlign: 'right' }}>{item.avgEarning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tools */}
      {activeTab === 'tools' && (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 4rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}
          >
            {tools.map((tool, i) => (
              <div key={tool.name} style={{
                background: '#16161f',
                padding: '1.5rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{tool.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>{tool.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Services */}
      {activeTab === 'services' && (
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 4rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>
              Services Connectés
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {services.map((service, i) => (
                <div key={service.name} style={{
                  background: '#16161f',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: service.status === 'connected' ? '1px solid #00D9A5' : '1px solid #2a2a35'
                }}>
                  <span style={{ fontSize: '2rem' }}>{service.logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{service.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>{service.description}</div>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    background: service.status === 'connected' ? '#00D9A5' : '#F59E0B',
                    color: '#000'
                  }}>
                    {service.status === 'connected' ? '✓' : '⏳'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>
          Prêt à démarrer ?
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
          Rejoignez notre programme d'affiliation et commencez à gagnez.
        </p>
        <Link to="/register" style={{
          padding: '16px 48px',
          background: '#4B6CB7',
          color: '#fff',
          borderRadius: '12px',
          fontWeight: 600,
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Créer mon compte partenaire
        </Link>
      </div>
    </div>
  )
}