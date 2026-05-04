import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ============== CATALOGUE tenues AFRICAINES ==============
const africanCategories = [
  { id: 'boubou', name: 'Boubou', icon: '👘', subcategories: ['Grand boubou', 'Boubou Senegal', 'Dashiki', 'Agbada', 'Senator'] },
  { id: 'ankara', name: 'Ankara', icon: '🎨', subcategories: ['Robe Ankara', 'Top Ankara', 'Jupe Ankara', 'Pantalon Ankara', 'Ensemble'] },
  { id: 'kente', name: 'Kente', icon: '🧵', subcategories: ['Pagne Kente', 'Robe Kente', 'Costume Kente', 'Echarpe Kente', 'Nappe'] },
  { id: 'wax', name: 'Wax', icon: '🪸', subcategories: ['Robewax', 'Tailleurwax', 'Chemise wax', 'Pantalonzwax', 'Accessoires'] },
  { id: 'traditional', name: 'Traditionnel', icon: '🌍', subcategories: ['Grand boubou', 'Dashiki', 'Kaftan', 'Senegalaise', 'Guineenne'] }
]

const africanProducts = [
  { id: 1, name: 'Boubou Senegal Premium', category: 'boubou', price: 89.99, oldPrice: 120, color: 'Or/Bleu', image: 'https://images.unsplash.com/photo-1594938387913-a6e549019a2f?w=400', isNew: true, country: 'Senegal', brand: 'Boulanger' },
  { id: 2, name: 'Ankara Robe Elegance', category: 'ankara', price: 65.00, color: 'Multicolore', image: 'https://images.unsplash.com/photo-1589810635655-9e9a1d7c4c0a?w=400', country: 'Nigeria', brand: 'Anglomani' },
  { id: 3, name: 'Kente Tissus Authentique', category: 'kente', price: 150.00, color: 'Or', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400', country: 'Ghana', brand: 'Vlisco' },
  { id: 4, name: 'Wax Tailleur Classique', category: 'wax', price: 95.00, oldPrice: 110, color: 'Bleu', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a488a786?w=400', isSale: true, country: 'Cote dIvoire', brand: 'Uniwax' },
  { id: 5, name: 'Dashiki Tradition', category: 'traditional', price: 45.00, color: 'Rouge', image: 'https://images.unsplash.com/photo-1594938387913-a6e549019a2f?w=400', country: 'Ghana', brand: 'African Fashion' },
  { id: 6, name: 'Grand Boubou Mali', category: 'boubou', price: 120.00, color: 'Blanc', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', country: 'Mali', brand: 'Boulanger' },
  { id: 7, name: 'Ankara Ensemble Couple', category: 'ankara', price: 140.00, color: 'Multicolore', image: 'https://images.unsplash.com/photo-1589810635655-9e9a1d7c4c0a?w=400', isNew: true, country: 'Nigeria', brand: 'Anglomani' },
  { id: 8, name: 'Kente Robe Soirée', category: 'kente', price: 185.00, oldPrice: 220, color: 'Or/Rouge', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400', country: 'Ghana', brand: 'Kente Cloth' },
  { id: 9, name: 'Wax Chemise Moderne', category: 'wax', price: 55.00, color: 'Vert', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a488a786?w=400', country: 'Cote dIvoire', brand: 'Uniwax' },
  { id: 10, name: 'Agbada Nigerian', category: 'traditional', price: 75.00, color: 'Bleu', image: 'https://images.unsplash.com/photo-1594938387913-a6e549019a2f?w=400', country: 'Nigeria', brand: 'Senator Wear' },
  { id: 11, name: 'Pagne Wax Haiti', category: 'wax', price: 35.00, color: 'Multicolore', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', country: 'Benin', brand: 'Vlisco' },
  { id: 12, name: 'Senegalaise Robe', category: 'traditional', price: 68.00, color: 'Violet', image: 'https://images.unsplash.com/photo-1589810635655-9e9a1d7c4c0a?w=400', country: 'Senegal', brand: 'Boulanger' }
]

const africanSuppliers = [
  { name: 'Boulanger Creation', country: 'Senegal', specialty: 'Boubou & Senegalaises', rating: 4.8, year: 1985 },
  { name: 'Anglomani', country: 'Nigeria', specialty: 'Ankara & Wax', rating: 4.7, year: 1992 },
  { name: 'Vlisco', country: 'Belgique', specialty: 'Wax hollande', rating: 4.8, year: 1846 },
  { name: 'Uniwax', country: 'Cote dIvoire', specialty: 'Wax africain', rating: 4.6, year: 1970 },
  { name: 'Kente Cloth Co', country: 'Ghana', specialty: 'Tissus Kente', rating: 4.9, year: 1965 },
  { name: 'African Fashion', country: 'Ghana', specialty: 'Dashiki & Tradition', rating: 4.5, year: 2000 },
  { name: 'Senator Wear', country: 'Nigeria', specialty: 'Agbada', rating: 4.6, year: 1998 }
]

export default function African() {
  const [products, setProducts] = useState(africanProducts)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [filters, setFilters] = useState({ country: '', price: '' })

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const filterProducts = () => {
    let filtered = [...products]
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory)
    }
    if (filters.country) {
      filtered = filtered.filter(p => p.country === filters.country)
    }
    if (filters.price === 'low') {
      filtered = filtered.filter(p => p.price < 50)
    } else if (filters.price === 'high') {
      filtered = filtered.filter(p => p.price > 100)
    }
    return filtered
  }

  return (
    <div className="container" style={{ padding: '3rem 20px', background: '#0a0a0f', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#4B6CB7', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Collection Exclusive
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', marginTop: '0.5rem', color: '#fff' }}>
            Tenues Africaines 🌴
          </h1>
          <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
            Découvrez notre collection de vêtements traditionnels africains : Boubou, Ankara, Dashiki, Kente et plus encore.
          </p>
        </div>

        {/* Categories Tabs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '12px 24px',
              borderRadius: '25px',
              border: activeCategory === 'all' ? 'none' : '1px solid #333',
              background: activeCategory === 'all' ? '#4B6CB7' : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.3s'
            }}
          >
            Tout voir
          </button>
          {africanCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '25px',
                border: activeCategory === cat.id ? 'none' : '1px solid #333',
                background: activeCategory === cat.id ? '#4B6CB7' : 'transparent',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s'
              }}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {activeCategory !== 'all' && (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {africanCategories.find(c => c.id === activeCategory)?.subcategories.map(sub => (
              <span key={sub} style={{ background: '#16161f', padding: '6px 16px', borderRadius: '20px', color: '#9ca3af', fontSize: '14px' }}>
                {sub}
              </span>
            ))}
          </div>
        )}

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <select 
            className="form-control" 
            style={{ width: 'auto', padding: '10px 15px', borderRadius: '8px', border: '1px solid #333', background: '#16161f', color: '#fff' }}
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          >
            <option value="">Tous pays</option>
            <option value="Senegal">Senegal</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Cote dIvoire">Cote dIvoire</option>
            <option value="Benin">Benin</option>
            <option value="Mali">Mali</option>
          </select>
          
          <select 
            className="form-control"
            style={{ width: 'auto', padding: '10px 15px', borderRadius: '8px', border: '1px solid #333', background: '#16161f', color: '#fff' }}
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Tous prix</option>
            <option value="low">Moins de 50€</option>
            <option value="high">Plus de 100€</option>
          </select>
        </div>

        {loading ? (
          <div className="loading" style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid #333', borderTop: '3px solid #4B6CB7', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
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
              {filterProducts().map((product) => (
                <motion.div key={product.id} variants={item}>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: '#16161f', borderRadius: '12px', overflow: 'hidden', border: '1px solid #2a2a35' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                        {product.isNew && (
                          <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#4B6CB7', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Nouveau</span>
                        )}
                        {product.isSale && (
                          <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#e53e3e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Sale</span>
                        )}
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <span style={{ color: '#4B6CB7', fontSize: '12px' }}>{product.brand} - {product.country}</span>
                        <h3 style={{ fontSize: '16px', margin: '0.5rem 0', fontWeight: 600, color: '#fff' }}>{product.name}</h3>
                        <p style={{ color: '#aaa', fontSize: '14px' }}>{product.color}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4B6CB7' }}>{product.price.toFixed(2)} €</span>
                          {product.oldPrice && (
                            <span style={{ fontSize: '14px', color: '#a0aec0', textDecoration: 'line-through' }}>{product.oldPrice.toFixed(2)} €</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* African Suppliers */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>🏭 Fournisseurs Tenues Africaines</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {africanSuppliers.map(supplier => (
              <div key={supplier.name} style={{ background: '#16161f', padding: '1.5rem', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>{supplier.name}</h4>
                <p style={{ color: '#4B6CB7', fontSize: '14px' }}>{supplier.country}</p>
                <p style={{ color: '#aaa', fontSize: '13px', margin: '0.5rem 0' }}>{supplier.specialty}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '12px', color: '#718096' }}>
                  <span>⭐ {supplier.rating}/5</span>
                  <span>Depuis {supplier.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRadius: '16px' }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>🌍 Authenticité Africaine</h3>
          <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
            Nous proponiions des vetements traditionnels africains de qualite superieure, fabriques par des artisans locaux.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', color: '#9ca3af' }}>
            <div>✓ Boubou Senegal</div>
            <div>✓ Ankara Nigeria</div>
            <div>✓ Dashiki Ghana</div>
            <div>✓ Kente Cote dIvoire</div>
            <div>✓ Wax Benin</div>
            <div>✓ Wax Cote dIvoire</div>
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