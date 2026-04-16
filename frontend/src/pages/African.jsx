import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function African() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ color: '', minPrice: '', maxPrice: '' })

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    try {
      const params = { category: 'africain' }
      if (filters.color) params.color = filters.color
      if (filters.minPrice) params.minPrice = filters.minPrice
      if (filters.maxPrice) params.maxPrice = filters.maxPrice
      
      const { data } = await axios.get('/api/products', { params })
      setProducts(data.filter(p => p.category === 'africain'))
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
            Collection Exclusive
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
            Tenues Africaines 🌴
          </h1>
          <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
            Découvrez notre collection de vêtements traditionnels africains : Boubou, Ankara, Dashiki, Kente et plus encore.
          </p>
        </div>

        {/* Filters */}
        <div className="filters" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <select 
            className="form-control" 
            style={{ width: 'auto' }}
            value={filters.color}
            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
          >
            <option value="">Toutes les couleurs</option>
            <option value="bleu">Bleu</option>
            <option value="multicolore">Multicolore</option>
            <option value="rouge">Rouge</option>
            <option value="or">Or</option>
            <option value="blanc">Blanc</option>
            <option value="violet">Violet</option>
            <option value="orange">Orange</option>
            <option value="vert">Vert</option>
          </select>
          
          <select 
            className="form-control"
            style={{ width: 'auto' }}
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          >
            <option value="">Prix min</option>
            <option value="50">50€</option>
            <option value="100">100€</option>
            <option value="150">150€</option>
          </select>
          
          <select 
            className="form-control"
            style={{ width: 'auto' }}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          >
            <option value="">Prix max</option>
            <option value="100">100€</option>
            <option value="150">150€</option>
            <option value="200">200€</option>
          </select>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <motion.div 
            className="grid grid-products"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {products.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <Link to={`/products/${product.id}`} className="card product-card">
                    <div className="product-image-wrapper">
                      <img src={product.image} alt={product.name} className="product-image" />
                      {product.isNew && <span className="badge badge-new">Nouveau</span>}
                      {product.isSale && <span className="badge badge-sale">Sale</span>}
                    </div>
                    <div className="product-info">
                      <span className="product-category">{product.color}</span>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price-wrapper">
                        <span className="product-price">{product.price.toFixed(2)} €</span>
                        {product.oldPrice && (
                          <span className="product-old-price">{product.oldPrice.toFixed(2)} €</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {products.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: '#718096' }}>Aucun produit trouvé avec ces filtres.</p>
            <button onClick={() => setFilters({ color: '', minPrice: '', maxPrice: '' })} className="btn btn-secondary">
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="card" style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', color: 'white' }}>
          <h3 style={{ marginBottom: '1rem' }}>🇨🇮 Authenticité Africaine</h3>
          <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
            Nous proposent des vêtements traditionnels africains de qualité supérieure, fabriqués par des artisans locaux.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div>✓ Boubou Senegal</div>
            <div>✓ Ankara Nigeria</div>
            <div>✓ Dashiki Ghana</div>
            <div>✓ Kente Côte d'Ivoire</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}