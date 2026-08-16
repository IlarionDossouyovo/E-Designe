import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function OrderTracking() {
  const navigate = useNavigate()
  const [searchOrder, setSearchOrder] = useState('')
  const [orders] = useState([
    { id: 'CMD-2026-001', date: '2026-08-15', status: 'delivered', total: 149.99, items: ['Robe en lin', 'Foulard soie'] },
    { id: 'CMD-2026-002', date: '2026-08-14', status: 'shipped', total: 89.50, items: ['T-shirt coton bio'] },
    { id: 'CMD-2026-003', date: '2026-08-12', status: 'processing', total: 249.00, items: ['Manteau laine', 'Écharpe'] },
    { id: 'CMD-2026-004', date: '2026-08-10', status: 'delivered', total: 75.00, items: ['Jean slim'] },
  ])

  const [selectedOrder, setSelectedOrder] = useState(null)

  const quickLinks = [
    { name: 'Accueil', icon: '🏠', path: '/', color: '#4B6CB7' },
    { name: 'Produits', icon: '🛍️', path: '/products', color: '#25D366' },
    { name: 'Panier', icon: '🛒', path: '/cart', color: '#E4405F' },
    { name: 'Compte', icon: '👤', path: '/account', color: '#7C3AED' },
    { name: 'Marketing', icon: '📊', path: '/marketing', color: '#F59E0B' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#22c55e'
      case 'shipped': return '#3b82f6'
      case 'processing': return '#f59e0b'
      case 'cancelled': return '#ef4444'
      default: return '#9ca3af'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'delivered': return 'Livré'
      case 'shipped': return 'Expédié'
      case 'processing': return 'En traitement'
      case 'cancelled': return 'Annulé'
      default: return status
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const found = orders.find(o => o.id.toLowerCase() === searchOrder.toLowerCase())
    if (found) {
      setSelectedOrder(found)
    } else {
      alert('Commande non trouvée')
    }
  }

  return (
    <div style={{ padding: '100px 20px 40px', maxWidth: '1000px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      
      {/* Quick Links */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '20px' }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {quickLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              style={{
                padding: '8px 16px',
                background: '#16161f',
                border: `1px solid ${link.color}40`,
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '30px' }}
      >
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '10px' }}>📦 Suivi des Commandes</h1>
        <p style={{ color: '#9ca3af' }}>Suivez l'état de vos commandes en temps réel</p>
      </motion.div>

      {/* Search Order */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ background: '#16161f', borderRadius: '16px', padding: '24px', marginBottom: '30px' }}
      >
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>🔍 Rechercher une commande</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Entrez votre numéro de commande (ex: CMD-2026-001)"
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
            style={{ 
              flex: 1, 
              minWidth: '250px',
              padding: '14px 20px', 
              borderRadius: '10px', 
              border: '1px solid #333', 
              background: '#0a0a0f', 
              color: '#fff',
              fontSize: '1rem'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '14px 28px',
              background: '#4B6CB7',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Rechercher
          </button>
        </form>
      </motion.div>

      {/* Order Details */}
      {selectedOrder && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: '#16161f', borderRadius: '16px', padding: '24px', marginBottom: '30px', border: `1px solid ${getStatusColor(selectedOrder.status)}40` }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#fff', margin: 0 }}>Commande {selectedOrder.id}</h3>
            <span style={{ 
              background: getStatusColor(selectedOrder.status), 
              color: '#fff', 
              padding: '6px 16px', 
              borderRadius: '20px',
              fontWeight: 'bold'
            }}>
              {getStatusText(selectedOrder.status)}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              {['Commande passée', 'En traitement', 'Expédié', 'Livré'].map((step, idx) => (
                <span key={idx} style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{step}</span>
              ))}
            </div>
            <div style={{ height: '8px', background: '#0a0a0f', borderRadius: '4px', position: 'relative' }}>
              <div style={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: selectedOrder.status === 'delivered' ? '100%' : selectedOrder.status === 'shipped' ? '75%' : selectedOrder.status === 'processing' ? '50%' : '25%',
                background: 'linear-gradient(90deg, #4B6CB7, #22c55e)',
                borderRadius: '4px',
                transition: 'width 0.5s'
              }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <p style={{ color: '#9ca3af', marginBottom: '5px' }}>Date de commande</p>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>{selectedOrder.date}</p>
            </div>
            <div>
              <p style={{ color: '#9ca3af', marginBottom: '5px' }}>Total</p>
              <p style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.2rem' }}>{selectedOrder.total} €</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Order History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 style={{ color: '#fff', marginBottom: '20px' }}>📋 Historique des commandes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {orders.map((order) => (
            <div 
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              style={{ 
                background: '#16161f', 
                borderRadius: '12px', 
                padding: '20px',
                cursor: 'pointer',
                border: selectedOrder?.id === order.id ? '2px solid #4B6CB7' : '1px solid #2a2a35',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#fff', fontWeight: 'bold', margin: 0 }}>{order.id}</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '5px 0' }}>{order.date}</p>
                  <p style={{ color: '#6B8DD6', fontSize: '0.85rem' }}>{order.items.join(', ')}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>{order.total} €</p>
                  <span style={{ 
                    background: getStatusColor(order.status), 
                    color: '#fff', 
                    padding: '4px 12px', 
                    borderRadius: '15px',
                    fontSize: '0.75rem',
                    marginTop: '8px',
                    display: 'inline-block'
                  }}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Back to Home */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link 
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#16161f',
            border: '1px solid #333',
            borderRadius: '10px',
            color: '#fff',
            textDecoration: 'none'
          }}
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
