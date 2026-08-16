import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Wishlist() {
  const navigate = useNavigate()
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Robe en lin été', price: 89.99, category: 'Femmes', brand: 'Zara', image: '👗', inStock: true },
    { id: 2, name: 'T-shirt coton bio', price: 24.99, category: 'Hommes', brand: 'H&M', image: '👕', inStock: true },
    { id: 3, name: 'Sac en cuir luxe', price: 149.99, category: 'Accessoires', brand: 'Gucci', image: '👜', inStock: false },
    { id: 4, name: 'Écharpe en soie', price: 59.99, category: 'Accessoires', brand: 'Hermès', image: '🧣', inStock: true },
    { id: 5, name: 'Jean slim premium', price: 69.99, category: 'Hommes', brand: 'Zara', image: '👖', inStock: true },
  ])

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const quickLinks = [
    { name: 'Accueil', icon: '🏠', path: '/', color: '#4B6CB7' },
    { name: 'Produits', icon: '🛍️', path: '/products', color: '#25D366' },
    { name: 'Panier', icon: '🛒', path: '/cart', color: '#E4405F' },
    { name: 'Compte', icon: '👤', path: '/account', color: '#7C3AED' },
    { name: 'Marketing', icon: '📊', path: '/marketing', color: '#F59E0B' },
  ];

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div style={{ padding: '100px 20px 40px', maxWidth: '1200px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      
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
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '10px' }}>🤍 Ma Wishlist</h1>
        <p style={{ color: '#9ca3af' }}>Vos produits sauvegardés</p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}
      >
        <div style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ color: '#E4405F', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{wishlistItems.length}</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Produits</p>
        </div>
        <div style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{totalValue.toFixed(2)}€</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Valeur totale</p>
        </div>
        <div style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{wishlistItems.filter(i => i.inStock).length}</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>En stock</p>
        </div>
        <div 
          onClick={() => navigate('/products')}
          style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', border: '1px solid #2a2a35' }}
        >
          <p style={{ color: '#F59E0B', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>+ Ajouter</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Nouveau</p>
        </div>
      </motion.div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'grid', gap: '15px' }}
        >
          {wishlistItems.map((item) => (
            <div 
              key={item.id}
              style={{ 
                background: '#16161f', 
                borderRadius: '16px', 
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                border: '1px solid #2a2a35'
              }}
            >
              {/* Image */}
              <div style={{ 
                width: '100px', 
                height: '100px', 
                background: 'linear-gradient(135deg, #1e3a5f 0%, #4B6CB7 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                flexShrink: 0
              }}>
                {item.image}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span style={{ background: '#4B6CB7', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#fff' }}>
                    {item.brand}
                  </span>
                  <span style={{ 
                    background: item.inStock ? '#22c55e20' : '#ef444420', 
                    color: item.inStock ? '#22c55e' : '#ef4444',
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.7rem'
                  }}>
                    {item.inStock ? 'En stock' : 'Rupture'}
                  </span>
                </div>
                <h3 style={{ color: '#fff', margin: '5px 0', fontSize: '1.2rem' }}>{item.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>{item.category}</p>
                <p style={{ color: '#22c55e', fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0 0' }}>{item.price}€</p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  onClick={() => navigate('/cart')}
                  disabled={!item.inStock}
                  style={{ 
                    padding: '12px 20px', 
                    background: item.inStock ? '#4B6CB7' : '#333', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '10px', 
                    cursor: item.inStock ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold'
                  }}
                >
                  🛒 Acheter
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  style={{ 
                    padding: '12px 20px', 
                    background: 'transparent', 
                    color: '#ef4444', 
                    border: '1px solid #ef4444', 
                    borderRadius: '10px', 
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: '60px 20px' }}
        >
          <p style={{ fontSize: '4rem', marginBottom: '20px' }}>🤍</p>
          <h2 style={{ color: '#fff', marginBottom: '10px' }}>Votre wishlist est vide</h2>
          <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Ajoutez des produits pour les retrouver ici</p>
          <button 
            onClick={() => navigate('/products')}
            style={{ 
              padding: '14px 28px', 
              background: '#4B6CB7', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '10px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Découvrir les produits
          </button>
        </motion.div>
      )}

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
