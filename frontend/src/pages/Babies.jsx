import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function Babies() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ color: '', minPrice: '', maxPrice: '' })

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    try {
      const params = { category: 'bebe' }
      if (filters.color) params.color = filters.color
      if (filters.minPrice) params.minPrice = filters.minPrice
      if (filters.maxPrice) params.maxPrice = filters.maxPrice
      
      const { data } = await axios.get('/api/products', { params })
      setProducts(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
    setLoading(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#4B6CB7', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Collection Enfant
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
            Bébé & Enfant 👶
          </h1>
          <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
            Des vêtements doux et confortables pour vos tout-petits. Qualité premium pour la peau sensible.
          </p>
        </div>

        <div className="filters" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <select 
            className="form-control" 
            style={{ width: 'auto', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            value={filters.color}
            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
          >
            <option value="">Toutes les couleurs</option>
            <option value="rose">Rose</option>
            <option value="bleu">Bleu</option>
            <option value="blanc">Blanc</option>
            <option value="jaune">Jaune</option>
            <option value="vert">Vert</option>
          </select>
          
          <select 
            className="form-control"
            style={{ width: 'auto', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          >
            <option value="">Prix min</option>
            <option value="10">10€</option>
            <option value="20">20€</option>
          </select>
          
          <select 
            className="form-control"
            style={{ width: 'auto', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          >
            <option value="">Prix max</option>
            <option value="30">30€</option>
            <option value="50">50€</option>
          </select>
        </div>

        {loading ? (
          <div className="loading" style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #4B6CB7', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-products"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {products.length > 0 ? products.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <Link to={`/products/${product.id}`} className="card product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="product-image-wrapper" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                        style={{ width: '100%', height: '300px', objectFit: 'cover', transition: 'transform 0.3s' }}
                      />
                      {product.isNew && (
                        <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#4B6CB7', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Nouveau</span>
                      )}
                      {product.isSale && (
                        <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#e53e3e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Sale</span>
                      )}
                    </div>
                    <div className="product-info" style={{ padding: '1rem' }}>
                      <span style={{ color: '#718096', fontSize: '14px' }}>{product.color}</span>
                      <h3 style={{ fontSize: '16px', margin: '0.5rem 0', fontWeight: 600 }}>{product.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4B6CB7' }}>{product.price.toFixed(2)} €</span>
                        {product.oldPrice && (
                          <span style={{ fontSize: '14px', color: '#a0aec0', textDecoration: 'line-through' }}>{product.oldPrice.toFixed(2)} €</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                  <p style={{ color: '#718096', marginBottom: '1rem' }}>Aucun produit trouvé</p>
                  <button 
                    onClick={() => setFilters({ color: '', minPrice: '', maxPrice: '' })}
                    style={{ padding: '10px 20px', background: '#4B6CB7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #fed7e2 0%, #f687b3 100%)', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#97266d' }}>👶 Confort Bébé</h3>
          <p style={{ opacity: 0.9 }}>
            Tous nos vêtements bébé sont certifiés OEKO-TEX, sans substances nocives.
          </p>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <div>✓ Coton bio</div>
            <div>✓ Douceur extreme</div>
            <div>✓ Certifié OKEO-TEX</div>
          </div>
        </div>
      </motion.div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}