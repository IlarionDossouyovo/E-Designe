import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
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

  return (
    <div>
      {/* Hero Section with Background */}
      <section style={{ 
        position: 'relative',
        padding: '120px 20px 100px', 
        textAlign: 'center', 
        background: '#0a0a0f', 
        color: '#fff',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,15,0.85), rgba(10,10,15,0.95)), url(${heroImages[heroIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
        }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <Logo variant="monogram" size="xl" animated={false} style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff 0%, #6B8DD6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            DECOUVREZ LA MODE AVEC L'IA
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.85, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Trouvez le vetement parfait grace a notre assistant intelligent
          </p>
          <form style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Essayez: robe rouge soiree..." 
              style={{ 
                padding: '14px 20px', 
                borderRadius: '8px', 
                border: '1px solid #2a2a35',
                flex: '1 1 250px',
                background: '#16161f',
                color: '#fff',
                fontSize: '1rem'
              }} 
            />
            <button 
              type="submit" 
              style={{ 
                padding: '14px 28px', 
                borderRadius: '8px', 
                border: 'none', 
                background: 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)', 
                color: '#fff', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              Rechercher
            </button>
          </form>
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
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          {categories.map(cat => (
            <Link key={cat.id} to={`/products?cat=${cat.name}`} style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '2rem', 
                background: '#16161f', 
                borderRadius: '16px', 
                textAlign: 'center', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
                border: '1px solid #2a2a35',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>{cat.icon}</span>
                <h3 style={{ color: cat.color, margin: 0 }}>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '3rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Nos meilleures offres</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {featuredProducts.map(product => (
            <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#16161f', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #2a2a35', transition: 'transform 0.3s' }}>
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
              </div>
            </Link>
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
