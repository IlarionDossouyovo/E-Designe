import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Simulation de panier
const cartItems = [
  { id: 1, name: 'Nike Air Max 90', price: 129.99, quantity: 1, image: '👟', size: '42', color: 'Noir' },
  { id: 2, name: 'Adidas Dri-FIT T-Shirt', price: 29.99, quantity: 2, image: '👕', size: 'L', color: 'Blanc' },
  { id: 3, name: 'Zara Slim Fit Blazer', price: 129.99, quantity: 1, image: '🧥', size: 'M', color: 'Bleu marine' },
]

const shippingOptions = [
  { id: 'standard', name: 'Standard', price: 4.99, days: '5-7 jours' },
  { id: 'express', name: 'Express', price: 9.99, days: '2-3 jours' },
  { id: 'premium', name: 'Premium', days: '1 jour', price: 19.99 },
]

export default function Checkout() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [shipping, setShipping] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  })

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingCost = shippingOptions.find(s => s.id === shipping)?.price || 0
  const total = subtotal + shippingCost

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulation de paiement
    setTimeout(() => {
      setLoading(false)
      setStep(4)
    }, 2000)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <Link to="/cart" style={{ color: '#4B6CB7', textDecoration: 'none' }}>← Retour au panier</Link>
        <h1 style={{ color: '#fff', marginTop: '10px' }}>Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: step >= s ? '#4B6CB7' : '#16161f',
              border: step >= s ? '2px solid #4B6CB7' : '2px solid #2a2a35',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
            }}>
              {step > s ? '✓' : s}
            </div>
            <span style={{ color: step >= s ? '#fff' : '#666', marginLeft: '8px', marginRight: s < 4 ? '20px' : '0' }}>
              {s === 1 && 'Infos'}{s === 2 && 'Livraison'}{s === 3 && 'Paiement'}{s === 4 && 'Confirm'}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '30px' }}>
        {/* Left Column */}
        <div>
          {step === 1 && (
            <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
              <h2 style={{ color: '#fff', marginBottom: '20px' }}>📝 Informations</h2>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} placeholder="votre@email.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Prénom *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Nom *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Adresse *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} required
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Ville *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Code postal *</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Téléphone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: '16px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
                  Continuer vers la livraison →
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
              <h2 style={{ color: '#fff', marginBottom: '20px' }}>🚚 Livraison</h2>
              <div style={{ display: 'grid', gap: '15px', marginBottom: '30px' }}>
                {shippingOptions.map(option => (
                  <div key={option.id} onClick={() => setShipping(option.id)} style={{ 
                    padding: '20px', borderRadius: '12px', 
                    border: shipping === option.id ? '2px solid #4B6CB7' : '1px solid #2a2a35',
                    background: shipping === option.id ? 'rgba(75,108,183,0.1)' : '#0a0a0f',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ color: '#fff', margin: '0 0 5px' }}>{option.name}</h3>
                      <p style={{ color: '#9ca3af', margin: 0 }}>{option.days}</p>
                    </div>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{option.price}€</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={prevStep} style={{ flex: 1, padding: '16px', background: 'transparent', color: '#fff', border: '1px solid #2a2a35', borderRadius: '8px', cursor: 'pointer' }}>← Retour</button>
                <button onClick={nextStep} style={{ flex: 1, padding: '16px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Continuer vers paiement →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
              <h2 style={{ color: '#fff', marginBottom: '20px' }}>💳 Paiement</h2>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <button onClick={() => setPaymentMethod('card')} style={{ flex: 1, padding: '15px', background: paymentMethod === 'card' ? '#4B6CB7' : '#0a0a0f', color: '#fff', border: '1px solid #2a2a35', borderRadius: '8px', cursor: 'pointer' }}>💳 Carte bancaire</button>
                <button onClick={() => setPaymentMethod('paypal')} style={{ flex: 1, padding: '15px', background: paymentMethod === 'paypal' ? '#4B6CB7' : '#0a0a0f', color: '#fff', border: '1px solid #2a2a35', borderRadius: '8px', cursor: 'pointer' }}>🅿️ PayPal</button>
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Numéro de carte</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456"
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                      <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Expiration</label>
                      <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>CVC</label>
                      <input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleInputChange} placeholder="123"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Nom sur la carte</label>
                    <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="JOHN DOE"
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
                  </div>
                  <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                    <p style={{ color: '#22c55e', margin: 0, fontSize: '0.9rem' }}>🔒 Simulation Stripe - Aucune vraie carte requise</p>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button type="button" onClick={prevStep} style={{ flex: 1, padding: '16px', background: 'transparent', color: '#fff', border: '1px solid #2a2a35', borderRadius: '8px', cursor: 'pointer' }}>← Retour</button>
                    <button type="submit" disabled={loading} style={{ flex: 1, padding: '16px', background: loading ? '#666' : '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                      {loading ? '⏳ Traitement...' : `Payer ${total.toFixed(2)}€`}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {step === 4 && (
            <div style={{ background: '#16161f', padding: '40px', borderRadius: '16px', border: '1px solid #2a2a35', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '20px' }}>✅</div>
              <h2 style={{ color: '#22c55e', marginBottom: '15px' }}>Commande confirmée !</h2>
              <p style={{ color: '#9ca3af', marginBottom: '10px' }}>Merci pour votre commande</p>
              <p style={{ color: '#fff', marginBottom: '30px' }}>Numéro: <strong>#ED-{Date.now().toString().slice(-8)}</strong></p>
              <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Email: <strong>{formData.email}</strong></p>
              <Link to="/" style={{ padding: '14px 32px', background: '#4B6CB7', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Retour à l'accueil</Link>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        {step < 4 && (
          <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35', height: 'fit-content', position: 'sticky', top: '20px' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>📦 Résumé</h3>
            <div style={{ marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #2a2a35' }}>
                  <div style={{ fontSize: '2rem' }}>{item.image}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', margin: '0 0 5px', fontSize: '0.9rem' }}>{item.name}</p>
                    <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.8rem' }}>{item.size} / {item.color} × {item.quantity}</p>
                  </div>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #2a2a35', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#9ca3af' }}>
                <span>Sous-total</span><span>{subtotal.toFixed(2)}€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#9ca3af' }}>
                <span>Livraison</span><span>{shippingCost.toFixed(2)}€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid #2a2a35', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                <span>Total</span><span style={{ color: '#22c55e' }}>{total.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
