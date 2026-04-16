import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import Reviews from '../components/Reviews'

export default function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
      if (data.size?.length) setSelectedSize(data.size[0])
    } catch (error) {
      console.error('Erreur:', error)
    }
    setLoading(false)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille')
      return
    }
    addToCart(product, selectedSize)
    alert('Produit ajouté au panier!')
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  if (!product) {
    return <div className="container" style={{ padding: '4rem' }}>Produit non trouvé</div>
  }

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      <Link to="/products" style={{ color: '#4B6CB7', marginBottom: '1rem', display: 'block' }}>
        ← Retour à la boutique
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="product-category" style={{ marginBottom: '0.5rem' }}>{product.category}</span>
          <h1 style={{ marginBottom: '1rem', color: '#19232D' }}>{product.name}</h1>
          <div className="product-price-wrapper" style={{ marginBottom: '1.5rem' }}>
            <span className="product-price" style={{ fontSize: '2rem' }}>
              {product.price.toFixed(2)} €
            </span>
            {product.oldPrice && (
              <span className="product-old-price" style={{ fontSize: '1.25rem' }}>
                {product.oldPrice.toFixed(2)} €
              </span>
            )}
          </div>
          
          <p style={{ color: '#718096', marginBottom: '2rem' }}>{product.description}</p>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Taille:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {product.size?.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: selectedSize === size ? '2px solid #4B6CB7' : '2px solid #E2E8F0',
                    background: selectedSize === size ? 'rgba(75, 108, 183, 0.1)' : 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: selectedSize === size ? 600 : 400
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1 }}>
              Ajouter au panier
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.75rem' }}>
              ❤️
            </button>
          </div>
          
          <div style={{ padding: '1rem', background: '#F5F6FA', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>🚚 Livraison gratuite dès 50€</p>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>↩️ Retour sous 30 jours</p>
            <p style={{ fontSize: '0.875rem' }}>🔒 Paiement sécurisé</p>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <Reviews productId={id} />
    </div>
  )
}