import { useState } from 'react'
import { Link } from 'react-router-dom'

const inventoryConfig = {
  name: 'Agent Inventaire',
  version: '2.0',
  status: 'active',
  thresholds: {
    critical: 5,
    low: 10,
    normal: 20
  },
  products: [
    { id: 1, name: 'Robe Élégante Noire', sku: 'ROB-NOIR-001', stock: 3, status: 'critical', price: 89.99, category: 'Robes' },
    { id: 2, name: 'Chemise Blanche', sku: 'CHE-BLA-002', stock: 15, status: 'normal', price: 49.99, category: 'Chemises' },
    { id: 3, name: 'Pantalon Chino', sku: 'PAN-BEI-003', stock: 8, status: 'low', price: 59.99, category: 'Pantalons' },
    { id: 4, name: 'Boubou Traditionnel', sku: 'BOU-AFR-004', stock: 12, status: 'normal', price: 149.99, category: 'Africain' },
    { id: 5, name: 'Robe Ankara', sku: 'ANK-COL-005', stock: 2, status: 'critical', price: 89.99, category: 'Africain' },
    { id: 6, name: 'T-Shirt Basic', sku: 'TSH-BLA-006', stock: 45, status: 'normal', price: 19.99, category: 'T-Shirts' },
    { id: 7, name: 'Veste Jean', sku: 'VES-BLE-007', stock: 7, status: 'low', price: 79.99, category: 'Vestes' },
    { id: 8, name: 'Jupe Noire', sku: 'JUP-NOIR-008', stock: 0, status: 'out', price: 45.99, category: 'Jupes' },
  ],
  alerts: [
    { id: 1, type: 'critical', product: 'Robe Élégante Noire', message: 'Stock critique - Vente désactivée', date: '2026-07-01' },
    { id: 2, type: 'critical', product: 'Robe Ankara', message: 'Stock critique - Vente désactivée', date: '2026-07-01' },
    { id: 3, type: 'low', product: 'Pantalon Chino', message: 'Stock bas - Réapprovisionnement recommandé', date: '2026-06-30' },
    { id: 4, type: 'low', product: 'Veste Jean', message: 'Stock bas - Réapprovisionnement recommandé', date: '2026-06-30' },
    { id: 5, type: 'out', product: 'Jupe Noire', message: 'Rupture de stock', date: '2026-06-29' },
  ],
  stats: {
    totalProducts: 52,
    inStock: 42,
    lowStock: 6,
    criticalStock: 2,
    outOfStock: 2,
    totalValue: 45670
  },
  actions: [
    { id: 1, name: 'Désactiver vente', trigger: 'stock < 5', status: 'active' },
    { id: 2, name: 'Notifier admin', trigger: 'stock < 10', status: 'active' },
    { id: 3, name: 'Créer commande fournisseur', trigger: 'stock < 5', status: 'active' },
    { id: 4, name: 'Afficher message rupture', trigger: 'stock = 0', status: 'active' },
  ]
}

export default function AgentInventory() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('products')

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return '#ef4444'
      case 'low': return '#f59e0b'
      case 'out': return '#6b7280'
      default: return '#22c55e'
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem 20px', maxWidth: '500px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Inventaire</h1>
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
      <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '20px', padding: '30px', marginBottom: '30px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem' }}>📦</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>📦 Agent Inventaire</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Gestion automatique des stocks - Version {inventoryConfig.version}</p>
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
          <p style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{inventoryConfig.stats.totalProducts}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Total Produits</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{inventoryConfig.stats.inStock}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>En Stock</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{inventoryConfig.stats.lowStock}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Stock Bas</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{inventoryConfig.stats.criticalStock}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Critique</p>
        </div>
        <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{inventoryConfig.stats.outOfStock}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Rupture</p>
        </div>
      </div>

      {/* Thresholds */}
      <div style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', marginBottom: '30px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>⚙️ Seuils de Stock</h3>
        <div style={{ display: 'flex', gap: '30px' }}>
          <div><span style={{ color: '#ef4444', fontWeight: 'bold' }}>Critique:</span> <span style={{ color: '#fff' }}>{inventoryConfig.thresholds.critical} unités</span></div>
          <div><span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Bas:</span> <span style={{ color: '#fff' }}>{inventoryConfig.thresholds.low} unités</span></div>
          <div><span style={{ color: '#22c55e', fontWeight: 'bold' }}>Normal:</span> <span style={{ color: '#fff' }}>{inventoryConfig.thresholds.normal}+ unités</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px' }}>
        {['products', 'alerts', 'actions'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? '#22c55e' : 'transparent', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'products' ? '📦 Produits' : tab === 'alerts' ? '🔔 Alertes' : '⚡ Actions'}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', padding: '16px', background: '#0a0a0f', borderBottom: '1px solid #2a2a35', fontWeight: 'bold', color: '#9ca3af' }}>
            <span>Produit</span>
            <span>SKU</span>
            <span>Catégorie</span>
            <span>Prix</span>
            <span>Stock</span>
            <span>Status</span>
          </div>
          {inventoryConfig.products.map((product, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', padding: '16px', borderBottom: '1px solid #2a2a35', alignItems: 'center' }}>
              <span style={{ color: '#fff' }}>{product.name}</span>
              <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{product.sku}</span>
              <span style={{ color: '#6B8DD6' }}>{product.category}</span>
              <span style={{ color: '#22c55e' }}>{product.price}€</span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{product.stock}</span>
              <span style={{ padding: '4px 12px', background: getStatusColor(product.status), color: '#fff', borderRadius: '12px', fontSize: '0.8rem', textAlign: 'center' }}>{product.status.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div style={{ background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          {inventoryConfig.alerts.map((alert, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '16px', borderBottom: '1px solid #2a2a35' }}>
              <span style={{ fontSize: '1.5rem' }}>{alert.type === 'critical' ? '🚨' : alert.type === 'low' ? '⚠️' : '❌'}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>{alert.product}</p>
                <p style={{ color: '#9ca3af', margin: '4px 0 0', fontSize: '0.9rem' }}>{alert.message}</p>
              </div>
              <span style={{ color: '#6B8DD6' }}>{alert.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions Tab */}
      {activeTab === 'actions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {inventoryConfig.actions.map((action, i) => (
            <div key={i} style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: '#fff', margin: 0 }}>{action.name}</h4>
                <span style={{ padding: '4px 12px', background: '#22c55e', color: '#fff', borderRadius: '12px', fontSize: '0.8rem' }}>{action.status}</span>
              </div>
              <p style={{ color: '#9ca3af', margin: 0 }}><code style={{ background: '#0a0a0f', padding: '2px 8px', borderRadius: '4px' }}>{action.trigger}</code></p>
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
