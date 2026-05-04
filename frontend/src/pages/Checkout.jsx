import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Checkout({ cart, cartTotal, user, setCart }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  })
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create order
      const orderData = {
        userId: user?.id || 'guest',
        items: cart,
        total: cartTotal,
        paymentMethod,
        ...formData
      }
      
      const { data: order } = await axios.post('/api/orders', orderData)
      
      // Process payment
      if (paymentMethod === 'stripe') {
        const { data: payment } = await axios.post('/api/payment/stripe/create-intent', {
          amount: cartTotal
        })
        // In real app, redirect to Stripe checkout
        alert('Paiement Stripe simulé réussi!')
      } else if (paymentMethod === 'paypal') {
        const { data: payment } = await axios.post('/api/payment/paypal/create-order', {
          amount: cartTotal
        })
        alert('Paiement PayPal simulé réussi!')
      }
      
      // Clear cart and redirect
      setCart([])
      localStorage.removeItem('e-designe-cart')
      navigate('/account')
      
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      console.error(err)
    }
    setLoading(false)
  }

  if (cart.length === 0) {
    return (
      <div className="container checkout-page" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Votre panier est vide</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Retour à la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="container checkout-page">
      <h1 style={{ marginBottom: '2rem' }}>Paiement</h1>
      
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '1.5rem' }}>Informations de livraison</h3>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Nom complet</label>
            <input 
              type="text" 
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Adresse</label>
            <input 
              type="text" 
              className="form-control"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Ville</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Code postal</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.postalCode}
                onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                required
              />
            </div>
          </div>
          
          <h3 style={{ margin: '2rem 0 1rem' }}>Mode de paiement</h3>
          
          <div className="payment-methods">
            <div 
              className={`payment-option ${paymentMethod === 'stripe' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('stripe')}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</div>
              <strong>Stripe</strong>
              <p style={{ fontSize: '0.75rem', color: '#718096' }}>Carte bancaire</p>
            </div>
            
            <div 
              className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('paypal')}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🅿️</div>
              <strong>PayPal</strong>
              <p style={{ fontSize: '0.75rem', color: '#718096' }}>PayPal</p>
            </div>
          </div>
          
          {error && (
            <div style={{ color: '#E53E3E', marginBottom: '1rem' }}>{error}</div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Traitement...' : `Payer ${cartTotal.toFixed(2)} €`}
          </button>
        </form>
        
        <div className="cart-summary">
          <h3 style={{ marginBottom: '1rem' }}>Résumé de commande</h3>
          
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.size}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <span>{item.name} x{item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #E2E8F0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Sous-total</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Livraison</span>
            <span>Offerte</span>
          </div>
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #E2E8F0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="total">Total</span>
            <span className="total">{cartTotal.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  )
}