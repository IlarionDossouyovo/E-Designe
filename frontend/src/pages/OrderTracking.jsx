import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const orderStatuses = [
  { step: 1, label: 'Commande passée', icon: '✅', status: 'pending' },
  { step: 2, label: 'Payée', icon: '💳', status: 'paid' },
  { step: 3, label: 'En préparation', icon: '📦', status: 'processing' },
  { step: 4, label: 'Expédiée', icon: '🚚', status: 'shipped' },
  { step: 5, label: 'Livrée', icon: '🏠', status: 'delivered' }
]

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  const trackOrder = (e) => {
    e.preventDefault()
    // Simulated order lookup
    if (orderId.toLowerCase().includes('ord')) {
      setOrder({
        id: orderId.toUpperCase(),
        status: 'shipped',
        estimatedDelivery: '20 Avril 2024',
        items: [
          { name: 'Robe Élégante Noire', quantity: 1, price: 89.99 },
          { name: 'T-Shirt Blanc Basic', quantity: 2, price: 19.99 }
        ],
        total: 129.97,
        createdAt: '15 Avril 2024'
      })
      setError('')
    } else {
      setError('Commande non trouvée. Vérifiez votre numéro de commande.')
      setOrder(null)
    }
  }

  const currentStep = orderStatuses.findIndex(s => s.status === order?.status) + 1

  return (
    <div className="container" style={{ padding: '3rem 20px', maxWidth: '800px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Suivre ma commande 📦</h1>
        <p style={{ color: '#718096', textAlign: 'center', marginBottom: '2rem' }}>
          Entrez votre numéro de commande pour suivre son avancement
        </p>

        {/* Search Form */}
        <form onSubmit={trackOrder} className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text"
              className="form-control"
              placeholder="Ex: ORD-123456789"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              Suivre
            </button>
          </div>
          {error && <p style={{ color: '#E53E3E', marginTop: '1rem' }}>{error}</p>}
        </form>

        {order && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Order Info */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>Commande {order.id}</h3>
                  <p style={{ color: '#718096', fontSize: '0.9rem' }}>Passée le {order.createdAt}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4B6CB7' }}>{order.total.toFixed(2)} €</p>
                  <p style={{ color: '#718096', fontSize: '0.9rem' }}>Livraison estimée: {order.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Statut de votre commande</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {/* Progress Line */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '40px',
                  right: '40px',
                  height: '4px',
                  background: '#E2E8F0',
                  zIndex: 0
                }}>
                  <div style={{
                    width: `${((currentStep - 1) / (orderStatuses.length - 1)) * 100}%`,
                    height: '100%',
                    background: '#4B6CB7',
                    transition: 'width 0.5s ease'
                  }} />
                </div>

                {/* Steps */}
                {orderStatuses.map((step, index) => (
                  <div key={step.step} style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: index < currentStep ? '#4B6CB7' : '#E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.5rem',
                      fontSize: '1.2rem'
                    }}>
                      {index < currentStep ? step.icon : step.step}
                    </div>
                    <p style={{ 
                      fontSize: '0.8rem', 
                      color: index < currentStep ? '#4B6CB7' : '#A0AEC0',
                      fontWeight: index < currentStep ? 600 : 400
                    }}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Articles commandés</h3>
              <div>
                {order.items.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '0.75rem 0',
                    borderBottom: index < order.items.length - 1 ? '1px solid #E2E8F0' : 'none'
                  }}>
                    <div>
                      <p style={{ fontWeight: 500 }}>{item.name}</p>
                      <p style={{ color: '#718096', fontSize: '0.9rem' }}>Qté: {item.quantity}</p>
                    </div>
                    <p style={{ fontWeight: 600 }}>{(item.price * item.quantity).toFixed(2)} €</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>Vous avez des questions sur votre commande?</p>
          <Link to="/contact" className="btn btn-secondary">
            Contacter le support
          </Link>
        </div>
      </motion.div>
    </div>
  )
}