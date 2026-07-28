import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo, { LogoMono } from '../components/Logo'
import { products, categories, qualityTiers } from '../data/products'

// Flatten products for featured display from ALL categories
const flatProducts = Object.values(products).flatMap(cat => Object.values(cat).flat())
const featuredProducts = flatProducts.slice(0, 8)

// Hero background images
const heroImages = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
]

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0)
  
  // Auto-rotate hero background
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div>
      {/* Hero Section with Background */}
      <section style={{ 
        position: 'relative',
        padding: '140px 20px 120px', 
        textAlign: 'center', 
        background: '#0a0a0f', 
        color: '#fff',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(to bottom, rgba(10,10,15,0.85), rgba(10,10,15,0.95)), url(${heroImages[heroIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        
        {/* Animated Particles Effect */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: '100%', 
                opacity: 0 
              }}
              animate={{ 
                y: '-100%', 
                opacity: [0, 0.5, 0],
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                delay: Math.random() * 5 
              }}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          {/* Animated Logo Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.5rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LogoMono size="lg" animated={true} />
            </motion.div>
            <div style={{ textAlign: 'left' }}>
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ 
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #fff 0%, #FFD700 30%, #fff 50%, #4B6CB7 70%, #fff 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-2px',
                  margin: 0,
                  lineHeight: 1,
                  textShadow: '0 0 40px rgba(255,215,0,0.3)'
                }}
              >
                E-DESIGNE
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ 
                  fontSize: '1.1rem', 
                  color: '#4B6CB7', 
                  fontWeight: '700',
                  letterSpacing: '6px',
                  textTransform: 'uppercase',
                  margin: '8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}
                />
                By ELECTRON
              </motion.p>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', textAlign: 'center' }}
          >
            Trouvez le vetement parfait grace a notre assistant intelligent
          </motion.p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}
          >
            <motion.input 
              whileFocus={{ scale: 1.02, borderColor: '#4B6CB7' }}
              type="text" 
              placeholder="Essayez: robe rouge soiree..." 
              style={{ 
                padding: '16px 24px', 
                borderRadius: '12px', 
                border: '2px solid #2a2a35',
                flex: '1 1 250px',
                background: '#16161f',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }} 
            />
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(75,108,183,0.5)' }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              style={{ 
                padding: '16px 32px', 
                borderRadius: '12px', 
                border: 'none', 
                background: 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)', 
                color: '#fff', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(75,108,183,0.3)',
                transition: 'all 0.3s'
              }}
            >
              Rechercher
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Quality Legend */}
      <section style={{ padding: '1rem 20px', background: '#0a0a0f', textAlign: 'center', borderBottom: '1px solid #2a2a35' }}>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {qualityTiers.map(q => (
            <span key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff' }}>
              <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: q.color }}></span>
              <strong>{q.name}</strong>
              <span style={{ color: '#6b7280', fontSize: '12px' }}>({q.desc})</span>
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '3rem 20px', background: '#0a0a0f' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}
        >
          Categories
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/products?cat=${cat.name}`} style={{ textDecoration: 'none' }}>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{ 
                    padding: '2rem', 
                    background: '#16161f', 
                    borderRadius: '16px', 
                    textAlign: 'center', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
                    border: '1px solid #2a2a35',
                    cursor: 'pointer'
                  }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>{cat.icon}</span>
                  <h3 style={{ color: cat.color, margin: 0 }}>{cat.name}</h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '3rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1.5rem', color: '#fff' }}
        >
          Nos meilleures offres
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ background: '#16161f', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #2a2a35' }}>
                  <div style={{ position: 'relative', paddingTop: '125%' }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                      👗
                    </div>
                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: qualityTiers.find(t => t.id === product.quality)?.color || '#ccc', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>
                      {product.quality}
                    </span>
                  </div>
                  <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', color: '#4B6CB7', textTransform: 'uppercase' }}>{product.category}</span>
                    <h3 style={{ margin: '0.5rem 0', flex: 1, color: '#fff' }}>{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4B6CB7' }}>{product.price} €</p>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>{product.sub}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 20px', background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ marginBottom: '1rem' }}>Decouvrez toute notre collection</h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>Plus de {flatProducts.length} produits en Premium, Moyenne et Basic</p>
        <Link to="/products" style={{ padding: '14px 28px', background: '#fff', color: '#4B6CB7', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block' }}>Voir tous les produits</Link>
      </section>
    </div>
  )
}
