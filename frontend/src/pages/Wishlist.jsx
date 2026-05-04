import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function Wishlist({ user, addToCart }) {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWishlist()
  }, [user])

  const loadWishlist = async () => {
    if (!user?.id) {
      const saved = localStorage.getItem('e-designe-wishlist')
      if (saved) {
        try {
          const { data } = await axios.get('/api/products')
          const savedIds = JSON.parse(saved)
          setWishlist(data.filter(p => savedIds.includes(p.id)))
        } catch (e) {
          console.error(e)
        }
      }
      setLoading(false)
      return
    }

    try {
      const { data } = await axios.get(`/api/wishlist/${user.id}`)
      setWishlist(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
    setLoading(false)
  }

  const removeFromWishlist = async (productId) => {
    if (user?.id) {
      try {
        await axios.delete(`/api/wishlist/${user.id}/${productId}`)
      } catch (e) {
        console.error(e)
      }
    } else {
      const saved = JSON.parse(localStorage.getItem('e-designe-wishlist') || '[]')
      const updated = saved.filter(id => id !== productId)
      localStorage.setItem('e-designe-wishlist', JSON.stringify(updated))
    }
    setWishlist(wishlist.filter(p => p.id !== productId))
  }

  const handleAddToCart = (product) => {
    if (product.size?.[0]) {
      addToCart(product, product.size[0])
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ marginBottom: '2rem' }}>Ma Wishlist ❤️</h1>
        
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💔</div>
            <h2 style={{ marginBottom: '1rem' }}>Votre wishlist est vide</h2>
            <p style={{ color: '#718096', marginBottom: '2rem' }}>
              Ajoutez des produits que vous adorez!
            </p>
            <Link to="/products" className="btn btn-primary">
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <>
            <p style={{ color: '#718096', marginBottom: '2rem' }}>
              {wishlist.length} produit{wishlist.length > 1 ? 's' : ''} dans votre wishlist
            </p>
            
            <div className="grid grid-products">
              <AnimatePresence>
                {wishlist.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                    style={{ position: 'relative' }}
                  >
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                        background: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}
                      title="Retirer de la wishlist"
                    >
                      💔
                    </button>
                    
                    <Link to={`/products/${product.id}`}>
                      <div className="product-image-wrapper">
                        <img src={product.image} alt={product.name} className="product-image" />
                      </div>
                      <div className="product-info">
                        <span className="product-category">{product.category}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-price-wrapper">
                          <span className="product-price">{product.price.toFixed(2)} €</span>
                          {product.oldPrice && (
                            <span className="product-old-price">{product.oldPrice.toFixed(2)} €</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    
                    <div style={{ padding: '0 1rem 1rem' }}>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}