import { Link } from 'react-router-dom'

export default function Cart({ cart, removeFromCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="container cart-page" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Votre panier est vide</h2>
        <p style={{ margin: '1rem 0 2rem', color: '#718096' }}>
          Ajoutez des produits pour commencer vos achats
        </p>
        <Link to="/products" className="btn btn-primary">
          Explorer la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="container cart-page">
      <h1 style={{ marginBottom: '2rem' }}>Mon Panier</h1>
      
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.size}-${index}`} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p style={{ color: '#718096', fontSize: '0.875rem' }}>
                  Taille: {item.size} | {item.price.toFixed(2)} € l'unité
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    style={{ width: '30px', height: '30px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    style={{ width: '30px', height: '30px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
                <button 
                  onClick={() => removeFromCart(item.id, item.size)}
                  style={{ color: '#E53E3E', background: 'none', fontSize: '0.875rem' }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3 style={{ marginBottom: '1rem' }}>Résumé</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Sous-total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Livraison</span>
            <span>Offerte</span>
          </div>
          <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #E2E8F0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span className="total">Total</span>
            <span className="total">{total.toFixed(2)} €</span>
          </div>
          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Passer à la caisse
          </Link>
        </div>
      </div>
    </div>
  )
}