import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const COLORS = ['#19232D', '#4B6CB7', '#F59E0B', '#10B981', '#EF4444']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [analytics, setAnalytics] = useState(null)
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [analyticsRes, ordersRes, productsRes, inventoryRes] = await Promise.all([
        axios.get('/api/ai/analytics/dashboard'),
        axios.get('/api/orders/guest'),
        axios.get('/api/products'),
        axios.get('/api/ai/inventory/status')
      ])
      setAnalytics(analyticsRes.data)
      setOrders(ordersRes.data)
      setProducts(productsRes.data)
      setInventory(inventoryRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    }
    setLoading(false)
  }

  const tabs = [
    { id: 'overview', label: '📊 Aperçu', icon: '📊' },
    { id: 'orders', label: '📦 Commandes', icon: '📦' },
    { id: 'products', label: '👕 Produits', icon: '👕' },
    { id: 'ai', label: '🤖 IA', icon: '🤖' },
    { id: 'inventory', label: '📦 Stock', icon: '📦' },
    { id: 'email', label: '📧 Emails', icon: '📧' },
    { id: 'social', label: '📱 Social', icon: '📱' },
    { id: 'settings', label: '⚙️ Config', icon: '⚙️' }
  ]

  const sampleData = [
    { name: 'Lun', visitors: 120, orders: 15 },
    { name: 'Mar', visitors: 180, orders: 22 },
    { name: 'Mer', visitors: 150, orders: 18 },
    { name: 'Jeu', visitors: 220, orders: 28 },
    { name: 'Ven', visitors: 280, orders: 35 },
    { name: 'Sam', visitors: 320, orders: 42 },
    { name: 'Dim', visitors: 200, orders: 25 }
  ]

  const categoryData = [
    { name: 'Robes', value: 35 },
    { name: 'Chemises', value: 20 },
    { name: 'Africain', value: 25 },
    { name: 'Accessoires', value: 15 },
    { name: 'Bébé', value: 5 }
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '20px' }}>
      {/* Header */}
      <div style={{ background: '#19232D', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <h1 style={{ color: 'white', fontSize: '28px', margin: 0 }}>🤖 E-Désigne Admin - AI 360°</h1>
        <p style={{ color: '#94A3B8', margin: '5px 0 0' }}>Tableau de bord intelligence artificielle</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
        {/* Sidebar */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '15px', height: 'fit-content' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                padding: '12px 15px',
                marginBottom: '5px',
                border: 'none',
                borderRadius: '8px',
                background: activeTab === tab.id ? '#4B6CB7' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#334155',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '25px' }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ marginTop: 0 }}>📊 Vue d'ensemble</h2>
              
              {/* KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
                <div style={{ background: '#F0F9FF', padding: '20px', borderRadius: '10px' }}>
                  <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>Visiteurs aujourd'hui</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#19232D', margin: '5px 0' }}>
                    {analytics?.overview?.visitors?.today || 0}
                  </p>
                </div>
                <div style={{ background: '#F0FDF4', padding: '20px', borderRadius: '10px' }}>
                  <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>Commandes</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#19232D', margin: '5px 0' }}>
                    {orders.length || 0}
                  </p>
                </div>
                <div style={{ background: '#FEF3C7', padding: '20px', borderRadius: '10px' }}>
                  <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>Panier moyen</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#19232D', margin: '5px 0' }}>
                    {analytics?.kpis?.avgCartValue || 0}€
                  </p>
                </div>
                <div style={{ background: '#F5F3FF', padding: '20px', borderRadius: '10px' }}>
                  <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>Conversion</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#19232D', margin: '5px 0' }}>
                    {analytics?.kpis?.conversionRate || 0}%
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div style={{ height: '300px' }}>
                  <h3>Visiteurs & Commandes</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="visitors" stroke="#4B6CB7" strokeWidth={2} />
                      <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ height: '300px' }}>
                  <h3>Catégories</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {categoryData.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 style={{ marginTop: 0 }}>📦 Commandes</h2>
              <p style={{ color: '#64748B' }}>{orders.length || 0} commandes</p>
              {orders.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
                  <p>Aucune commande pour le moment</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h2 style={{ marginTop: 0 }}>👕 Produits</h2>
              <p style={{ color: '#64748B' }}>{products.length || 0} produits</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', marginTop: '15px' }}>
                {products.slice(0, 12).map(p => (
                  <div key={p.id} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '8px' }}>
                    <p style={{ fontWeight: 'bold', margin: 0, fontSize: '14px' }}>{p.name}</p>
                    <p style={{ color: '#4B6CB7', margin: '5px 0 0' }}>{p.price}€</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h2 style={{ marginTop: 0 }}>🤖 Intelligence Artificielle</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <div style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <h3 style={{ margin: '0 0 10px' }}>🔍 Chatbot</h3>
                  <p style={{ color: '#10B981', fontWeight: 'bold' }}>Opérationnel</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Support 24/7</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <h3 style={{ margin: '0 0 10px' }}>🔎 Recherche</h3>
                  <p style={{ color: '#10B981', fontWeight: 'bold' }}>Opérationnel</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Recherche sémantique</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <h3 style={{ margin: '0 0 10px' }}>💡 Recommandations</h3>
                  <p style={{ color: '#10B981', fontWeight: 'bold' }}>Opérationnel</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Filtrage collaboratif</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <h3 style={{ margin: '0 0 10px' }}>📊 Analytics</h3>
                  <p style={{ color: '#10B981', fontWeight: 'bold' }}>Opérationnel</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Prédictions</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <h3 style={{ margin: '0 0 10px' }}>📧 Email</h3>
                  <p style={{ color: '#10B981', fontWeight: 'bold' }}>Opérationnel</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>7 workflows</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <h3 style={{ margin: '0 0 10px' }}>🛡️ Fraud</h3>
                  <p style={{ color: '#10B981', fontWeight: 'bold' }}>Opérationnel</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>Détection</p>
                </div>
              </div>

              <h3 style={{ marginTop: '25px' }}>📈 Recommandations IA</h3>
              {(analytics?.recommendations || []).map((rec, i) => (
                <div key={i} style={{ padding: '10px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '8px' }}>
                  <strong>{rec.action}</strong>: {rec.product || rec.category} - <em>{rec.reason}</em>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div>
              <h2 style={{ marginTop: 0 }}>📦 Gestion des Stocks</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <div style={{ padding: '20px', background: '#F0F9FF', borderRadius: '10px' }}>
                  <p style={{ margin: 0, color: '#64748B' }}>Total produits</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{inventory?.total || 0}</p>
                </div>
                <div style={{ padding: '20px', background: '#FEF3C7', borderRadius: '10px' }}>
                  <p style={{ margin: 0, color: '#64748B' }}>Stock faible</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{inventory?.lowStock || 0}</p>
                </div>
                <div style={{ padding: '20px', background: '#F0FDF4', borderRadius: '10px' }}>
                  <p style={{ margin: 0, color: '#64748B' }}>En stock</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{inventory?.inStock || 0}</p>
                </div>
              </div>
              
              <h3>Alertes</h3>
              {(inventory?.recommendations || []).map((rec, i) => (
                <div key={i} style={{ padding: '10px', border: '1px solid #E2E8F0', borderRadius: '8px', marginBottom: '8px' }}>
                  {rec}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'email' && (
            <div>
              <h2 style={{ marginTop: 0 }}>📧 Email Automation</h2>
              <p style={{ color: '#64748B', marginBottom: '20px' }}>Workflows d'emails automatisés</p>
              
              {['welcome', 'abandoned_cart', 'order_confirmation', 'shipping_update', 'review_request', 'reengagement'].map(email => (
                <div key={email} style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{email.replace('_', ' ')}</strong>
                    <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#64748B' }}>{email === 'welcome' ? 'Inscription' : email === 'abandoned_cart' ? 'Panier abandonné' : email === 'order_confirmation' ? 'Commande passée' : email === 'shipping_update' ? 'Expédition' : email === 'review_request' ? 'Avis client' : 'Inactif 30j'}</p>
                  </div>
                  <span style={{ background: '#10B981', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px' }}>Actif</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'social' && (
            <div>
              <h2 style={{ marginTop: 0 }}>📱 Social Media</h2>
              <p style={{ color: '#64748B', marginBottom: '20px' }}>Publications automatisées</p>
              
              {['instagram', 'facebook', 'tiktok'].map(platform => (
                <div key={platform} style={{ padding: '15px', border: '1px solid #E2E8F0', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{platform.charAt(0).toUpperCase() + platform.slice(1)}</strong>
                  <span style={{ background: '#4B6CB7', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px' }}>Configuré</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 style={{ marginTop: 0 }}>⚙️ Configuration</h2>
              
              <h3>Stripe</h3>
              <div style={{ padding: '15px', background: '#F0F9FF', borderRadius: '8px', marginBottom: '15px' }}>
                <p><strong>Mode:</strong> Test</p>
                <p><strong>Webhook:</strong> Configuré</p>
              </div>
              
              <h3>PayPal</h3>
              <div style={{ padding: '15px', background: '#F0F9FF', borderRadius: '8px', marginBottom: '15px' }}>
                <p><strong>Statut:</strong> Actif</p>
              </div>
              
              <h3>Email (SendGrid)</h3>
              <div style={{ padding: '15px', background: '#F0F9FF', borderRadius: '8px' }}>
                <p><strong>Fournisseur:</strong> SendGrid</p>
                <p><strong>Templates:</strong> 6</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}