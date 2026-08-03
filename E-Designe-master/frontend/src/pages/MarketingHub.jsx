import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const platforms = [
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25D366', followers: '1.2K' },
  { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2', followers: '5.4K' },
  { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E4405F', followers: '8.7K' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000', followers: '15.6K' },
  { id: 'pinterest', name: 'Pinterest', icon: '📌', color: '#BD081C', followers: '890' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2', followers: '1.2K' }
];

const marketplaces = [
  { id: 'shopify', name: 'Shopify', icon: '🛒', status: 'disconnected', products: 0, orders: 0 },
  { id: 'amazon', name: 'Amazon', icon: '📦', status: 'disconnected', products: 0, orders: 0 },
  { id: 'ebay', name: 'eBay', icon: '🏷️', status: 'disconnected', products: 0, orders: 0 },
  { id: 'etsy', name: 'Etsy', icon: '🎨', status: 'disconnected', products: 0, orders: 0 },
  { id: 'woocommerce', name: 'WooCommerce', icon: '🛍️', status: 'disconnected', products: 0, orders: 0 }
];

const automations = [
  { id: 1, name: 'Welcome Email', trigger: 'user_registered', status: 'active', executions: 156 },
  { id: 2, name: 'Abandoned Cart', trigger: 'cart_abandoned', status: 'active', executions: 89 },
  { id: 3, name: 'Order Confirmation', trigger: 'order_placed', status: 'active', executions: 342 },
  { id: 4, name: 'Post-Purchase', trigger: 'order_delivered', status: 'active', executions: 298 },
  { id: 5, name: 'VIP Rewards', trigger: 'vip_reached', status: 'active', executions: 45 },
  { id: 6, name: 'Win-Back', trigger: 'inactive_30_days', status: 'active', executions: 78 }
];

export default function MarketingHub() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [socialData, setSocialData] = useState(platforms);
  const [marketplaceData, setMarketplaceData] = useState(marketplaces);
  const [automationData, setAutomationData] = useState(automations);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [postContent, setPostContent] = useState('');

  const stats = {
    totalReach: '82.8K',
    engagement: '38.2K',
    conversions: 847,
    revenue: '€12,450'
  };

  const handlePublish = () => {
    alert(`Post publié sur ${selectedPlatform}: ${postContent.substring(0, 50)}...`);
    setShowPostModal(false);
    setPostContent('');
    setSelectedPlatform(null);
  };

  const handleConnectMarketplace = (id) => {
    setMarketplaceData(prev => prev.map(mp => 
      mp.id === id ? { ...mp, status: 'connected' } : mp
    ));
  };

  const handleSyncProducts = (id) => {
    alert(`Synchronisation des produits vers ${id}...`);
  };

  const toggleAutomation = (id) => {
    setAutomationData(prev => prev.map(auto => 
      auto.id === id ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' } : auto
    ));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0f 0%, #16161f 100%)',
      padding: '100px 20px 40px'
    }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1400px', margin: '0 auto 30px' }}
      >
        <h1 style={{ 
          color: '#fff', 
          fontSize: '2.5rem', 
          fontFamily: 'Playfair Display, serif',
          marginBottom: '10px'
        }}>
          🎯 Marketing Hub
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Gérez vos canaux de vente, réseaux sociaux et automatisations
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {[
          { label: 'Portée Totale', value: stats.totalReach, icon: '👁️', color: '#4B6CB7' },
          { label: 'Engagement', value: stats.engagement, icon: '💝', color: '#E4405F' },
          { label: 'Conversions', value: stats.conversions, icon: '🎯', color: '#25D366' },
          { label: 'Revenus Marketing', value: stats.revenue, icon: '💰', color: '#FFD700' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: '#16161f',
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${stat.color}30`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>{stat.label}</p>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', fontFamily: 'Playfair Display, serif' }}>{stat.value}</h3>
              </div>
              <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['dashboard', 'social', 'marketplaces', 'automation', 'campaigns'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab ? '#4B6CB7' : '#16161f',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              {tab === 'dashboard' && '📊 Dashboard'}
              {tab === 'social' && '📱 Réseaux Sociaux'}
              {tab === 'marketplaces' && '🛒 Marketplaces'}
              {tab === 'automation' && '⚡ Automatisations'}
              {tab === 'campaigns' && '📧 Campagnes'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#16161f', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ color: '#fff', marginBottom: '20px' }}>📈 Performance Réseaux Sociaux</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {socialData.map(platform => (
                  <div key={platform.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px',
                    background: '#0a0a0f',
                    borderRadius: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>{platform.icon}</span>
                      <span style={{ color: '#fff' }}>{platform.name}</span>
                    </div>
                    <span style={{ color: '#4B6CB7', fontWeight: '600' }}>{platform.followers}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#16161f', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ color: '#fff', marginBottom: '20px' }}>🏆 Top Automatisations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {automationData.slice(0, 4).map(auto => (
                  <div key={auto.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px',
                    background: '#0a0a0f',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <span style={{ color: '#fff' }}>{auto.name}</span>
                      <p style={{ color: '#888', fontSize: '0.8rem', margin: '4px 0 0' }}>{auto.executions} exécutions</p>
                    </div>
                    <span style={{ 
                      color: auto.status === 'active' ? '#25D366' : '#ff6b6b',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      background: auto.status === 'active' ? '#25D36620' : '#ff6b6b20'
                    }}>
                      {auto.status === 'active' ? 'Actif' : 'En pause'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#fff' }}>Gérez vos réseaux sociaux</h3>
              <button 
                onClick={() => { setSelectedPlatform('all'); setShowPostModal(true); }}
                style={{
                  padding: '12px 24px',
                  background: '#4B6CB7',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ➕ Créer un post
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {socialData.map(platform => (
                <motion.div
                  key={platform.id}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: '#16161f',
                    borderRadius: '16px',
                    padding: '24px',
                    border: `1px solid ${platform.color}30`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '2rem' }}>{platform.icon}</span>
                      <div>
                        <h4 style={{ color: '#fff', margin: 0 }}>{platform.name}</h4>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>{platform.followers} followers</span>
                      </div>
                    </div>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      background: '#25D366' 
                    }} />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => { setSelectedPlatform(platform.id); setShowPostModal(true); }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: platform.color,
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      📝 Publier
                    </button>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: '#0a0a0f',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff',
                      cursor: 'pointer'
                    }}>
                      📊 Stats
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Marketplaces Tab */}
        {activeTab === 'marketplaces' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#fff' }}>Connexions Marketplaces</h3>
              <button style={{
                padding: '12px 24px',
                background: '#4B6CB7',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                ➕ Ajouter une marketplace
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {marketplaceData.map(mp => (
                <div
                  key={mp.id}
                  style={{
                    background: '#16161f',
                    borderRadius: '16px',
                    padding: '24px',
                    border: mp.status === 'connected' ? '1px solid #25D366' : '1px solid #333'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '2rem' }}>{mp.icon}</span>
                      <h4 style={{ color: '#fff', margin: 0 }}>{mp.name}</h4>
                    </div>
                    <span style={{ 
                      color: mp.status === 'connected' ? '#25D366' : '#888',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      background: mp.status === 'connected' ? '#25D36620' : '#333'
                    }}>
                      {mp.status === 'connected' ? 'Connecté' : 'Déconnecté'}
                    </span>
                  </div>
                  
                  {mp.status === 'connected' ? (
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: '#888' }}>Produits</span>
                        <span style={{ color: '#fff' }}>{mp.products}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#888' }}>Commandes</span>
                        <span style={{ color: '#fff' }}>{mp.orders}</span>
                      </div>
                    </div>
                  ) : null}
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {mp.status === 'connected' ? (
                      <>
                        <button 
                          onClick={() => handleSyncProducts(mp.id)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: '#4B6CB7',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          🔄 Sync
                        </button>
                        <button style={{
                          flex: 1,
                          padding: '10px',
                          background: '#0a0a0f',
                          border: '1px solid #333',
                          borderRadius: '8px',
                          color: '#fff',
                          cursor: 'pointer'
                        }}>
                          ⚙️ Config
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleConnectMarketplace(mp.id)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: '#25D366',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        🔗 Connecter
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Automation Tab */}
        {activeTab === 'automation' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#fff' }}>Automatisations Marketing</h3>
              <button style={{
                padding: '12px 24px',
                background: '#4B6CB7',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                ➕ Créer une automatisation
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {automationData.map(auto => (
                <div
                  key={auto.id}
                  style={{
                    background: '#16161f',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ color: '#fff', margin: '0 0 5px' }}>{auto.name}</h4>
                    <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>
                      Déclencheur: <span style={{ color: '#4B6CB7' }}>{auto.trigger}</span>
                    </p>
                    <p style={{ color: '#666', margin: '5px 0 0', fontSize: '0.8rem' }}>
                      {auto.executions} exécutions
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button 
                      onClick={() => toggleAutomation(auto.id)}
                      style={{
                        padding: '8px 16px',
                        background: auto.status === 'active' ? '#25D36620' : '#ff6b6b20',
                        border: `1px solid ${auto.status === 'active' ? '#25D366' : '#ff6b6b'}`,
                        borderRadius: '20px',
                        color: auto.status === 'active' ? '#25D366' : '#ff6b6b',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.85rem'
                      }}
                    >
                      {auto.status === 'active' ? '⏸️ Pause' : '▶️ Activer'}
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      background: '#0a0a0f',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff',
                      cursor: 'pointer'
                    }}>
                      ✏️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#fff' }}>Campagnes Marketing</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setShowCampaignModal(true)}
                  style={{
                    padding: '12px 20px',
                    background: '#4B6CB7',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  📧 Nouvelle campagne
                </button>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Summer Sale', type: 'Email', status: 'active', recipients: 5200, opens: 1840 },
                { name: 'New Collection Launch', type: 'Social', status: 'scheduled', recipients: 15000, opens: 0 },
                { name: 'VIP Customer Bonus', type: 'WhatsApp', status: 'active', recipients: 450, opens: 380 },
                { name: 'Flash Sale Weekend', type: 'SMS', status: 'draft', recipients: 8200, opens: 0 }
              ].map((campaign, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#16161f',
                    borderRadius: '12px',
                    padding: '20px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ color: '#fff', margin: 0 }}>{campaign.name}</h4>
                    <span style={{ 
                      color: campaign.status === 'active' ? '#25D366' : campaign.status === 'scheduled' ? '#FFD700' : '#888',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      background: campaign.status === 'active' ? '#25D36620' : campaign.status === 'scheduled' ? '#FFD70020' : '#333'
                    }}>
                      {campaign.status === 'active' ? 'Active' : campaign.status === 'scheduled' ? 'Planifiée' : 'Brouillon'}
                    </span>
                  </div>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>Type: {campaign.type}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666', fontSize: '0.85rem' }}>{campaign.recipients} destinataires</span>
                    {campaign.opens > 0 && (
                      <span style={{ color: '#4B6CB7', fontSize: '0.85rem' }}>{Math.round(campaign.opens / campaign.recipients * 100)}% ouvertures</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#16161f',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ color: '#fff', marginTop: 0 }}>
              {selectedPlatform === 'all' ? '📝 Créer un post multi-plateforme' : `📝 Publier sur ${selectedPlatform}`}
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '8px' }}>Contenu du post</label>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Qu'avez-vous en tête?"
                style={{
                  width: '100%',
                  height: '150px',
                  background: '#0a0a0f',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '12px',
                  fontSize: '1rem',
                  resize: 'none'
                }}
              />
            </div>

            {selectedPlatform === 'all' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#888', display: 'block', marginBottom: '8px' }}>Sélectionner les plateformes</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {socialData.map(p => (
                    <label key={p.id} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      padding: '8px 12px',
                      background: '#0a0a0f',
                      borderRadius: '8px',
                      color: '#fff',
                      cursor: 'pointer'
                    }}>
                      <input type="checkbox" /> {p.icon} {p.name}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => { setShowPostModal(false); setPostContent(''); setSelectedPlatform(null); }}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button 
                onClick={handlePublish}
                style={{
                  padding: '12px 24px',
                  background: '#4B6CB7',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🚀 Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
