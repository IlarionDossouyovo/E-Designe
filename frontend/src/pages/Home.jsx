import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Home() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
      setProducts(data)
      setRecommendations(data.slice(0, 4))
    } catch (error) {
      console.error('Erreur chargement produits:', error)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    try {
      const { data } = await axios.post('/api/ai/search', { query: searchQuery })
      setProducts(data.results)
    } catch (error) {
      console.error('Erreur recherche:', error)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div>
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Découvrez la Mode avec l'IA</h1>
          <p>Trouvez le vêtement parfait grâce à notre assistant intelligent</p>
          
          <form className="search-box" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Essayez: robe rouge soirée taille M..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </motion.div>
      </section>

      <section className="container" style={{ padding: '3rem 20px' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#19232D' }}>Nouveautés</h2>
        <motion.div 
          className="grid grid-products"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.slice(0, 4).map(product => (
            <motion.div key={product.id} variants={item}>
              <Link to={`/products/${product.id}`}>
                <div className="card">
                  <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price.toFixed(2)} €</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {recommendations.length > 0 && (
        <section className="container" style={{ padding: '0 20px 3rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#19232D' }}>Recommandé pour vous</h2>
          <div className="grid grid-products">
            {recommendations.map(product => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <div className="card">
                  <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price.toFixed(2)} €</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ background: '#F5F6FA', padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Pourquoi Stylhub?</h2>
          <div className="grid grid-products">
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖</div>
              <h3>IA Intelligente</h3>
              <p>Trouvez exactement ce que vous cherchez</p>
            </div>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💳</div>
              <h3>Paiement Sécurisé</h3>
              <p>Stripe, PayPal et crypto</p>
            </div>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚚</div>
              <h3>Livraison Mondiale</h3>
              <p>Nous livrons partout dans le monde</p>
            </div>
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
              <h3>Support 24/7</h3>
              <p>Assistant disponible à tout moment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}