import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import logo from '../assets/logo-e-designe-dark.svg'

const fallbackProducts = [
  { id: 1, name: 'Robe Africaine', price: 45, category: 'Africain', image: 'https://placehold.co/300x300/e2e8f0/1e293b?text=Robe' },
  { id: 2, name: 'Complet Homme', price: 89, category: 'Homme', image: 'https://placehold.co/300x300/e2e8f0/1e293b?text=Complet' },
  { id: 3, name: 'Robe Femme', price: 65, category: 'Femme', image: 'https://placehold.co/300x300/e2e8f0/1e293b?text=Robe+Femme' },
  { id: 4, name: 'Ensemble Bébé', price: 29, category: 'Bébé', image: 'https://placehold.co/300x300/e2e8f0/1e293b?text=Bébé' }
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    // Show fallback immediately while loading
    setProducts(fallbackProducts)
    setRecommendations(fallbackProducts)
    
    try {
      const { data } = await axios.get('/api/products')
      if (data && data.length > 0) {
        setProducts(data)
        setRecommendations(data.slice(0, 4))
      }
    } catch (error) {
      console.log('API unavailable, using local data')
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 20px', textAlign: 'center' }}>
        <p>Chargement...</p>
      </div>
    )
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
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <img src={logo} alt="E-Désigne" style={{ height: '80px', marginBottom: '1.5rem' }} />
          <h1>DÉCOUVREZ LA MODE AVEC L'IA</h1>
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
          <h2 style={{ marginBottom: '2rem', textAlign: 'center', color: '#fff' }}>Pourquoi E-Designe?</h2>
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