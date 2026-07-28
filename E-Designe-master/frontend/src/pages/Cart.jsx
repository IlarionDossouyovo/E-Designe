import { Link } from 'react-router-dom'

export default function Cart({ cart = [], removeFromCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Mon panier</h1>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</p>
          <p style={{ marginBottom: '1rem' }}>Votre panier est vide</p>
          <Link to="/products" style={{ color: '#4B6CB7' }}>Continuer mes achats</Link>
        </div>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '80px', height: '80px', background: '#f5f6fa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👗</div>
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>{item.price} €</p>
              </div>
              <button onClick={() => removeFromCart(i)} style={{ background: 'none', border: 'none', color: '#E53E3E', cursor: 'pointer' }}>Supprimer</button>
            </div>
          ))}
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Total: <strong>{total} €</strong></p>
            <Link to="/checkout" style={{ padding: '14px 28px', background: '#4B6CB7', color: '#fff', textDecoration: 'none', borderRadius: '8px' }}>Passer la commande</Link>
          </div>
        </>
      )}
    </div>
  )
}
