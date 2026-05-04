import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

// ============== CATALOGUE BÉBÉ COMPLET ==============
const babyCategories = [
  { id: 'vetements', name: 'Vêtements', icon: '👕', subcategories: ['Bodys', 'Pyjamas', 'Chaussons', 'T-shirts', 'Pulls', 'Salopettes', 'Robes', 'Manteaux'] },
  { id: 'accessoires', name: 'Accessoires', icon: '🧢', subcategories: ['Chapeaux', 'Bonnets', 'Chaussettes', 'Gants', 'Echarpes', 'Barrettes', 'Chaussures'] },
  { id: 'toilette', name: 'Toilette', icon: '🛁', subcategories: ['Serviettes', 'Couches', 'Baignoires', 'Savons', 'Lotions', 'Crèmes'] },
  { id: 'repas', name: 'Repas', icon: '🍼', subcategories: ['Biberons', 'Tétines', 'Chaises hautes', 'Bol', 'Couverts', 'Gobelets'] },
  { id: 'chambre', name: 'Chambre', icon: '🛏️', subcategories: ['Linges', 'Tour de lit', 'Nuisettes', 'Gigoteuses', 'Doudous'] },
  { id: 'jouets', name: 'Jouets', icon: '🧸', subcategories: ['Peluches', 'Hochets', 'Anneaux', 'Jouets bain', 'Livres'] }
]

const babyProducts = [
  { id: 1, name: 'Body Cotton Bio Pack', category: 'vetements', price: 24.99, oldPrice: 29.99, color: 'Blanc', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14b7?w=400', isNew: true, sizes: ['0-3m', '3-6m', '6-12m', '12-18m'], brand: 'Jacadi' },
  { id: 2, name: 'Pyjama Molleton Douiller', category: 'vetements', price: 32.00, color: 'Rose', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400', sizes: ['6-12m', '12-24m'], brand: 'Catimini' },
  { id: 3, name: 'Chausson en Crochet', category: 'accessoires', price: 18.50, color: 'Ecru', image: 'https://images.unsplash.com/photo-1515488042361-2561c042c855?w=400', isNew: true, brand: 'Okaïdi' },
  { id: 4, name: 'Chapeau Soleil Coton', category: 'accessoires', price: 15.00, color: 'Jaune', image: 'https://images.unsplash.com/photo-1596464716127-f9a82d5bc30b?w=400', brand: 'Jacadi' },
  { id: 5, name: 'Gigoteuse Saison', category: 'chambre', price: 45.00, color: 'Bleu', image: 'https://images.unsplash.com/photo-1522771930-788b6c5b1c73?w=400', sizes: ['0-6m', '6-18m'], brand: 'Catimini' },
  { id: 6, name: 'Doudou Peluche Mou', category: 'jouets', price: 22.00, color: 'Blanc', image: 'https://images.unsplash.com/photo-1555445054-8c700bleu7?w=400', isNew: true, brand: 'Djeco' },
  { id: 7, name: 'Biberon Glass 240ml', category: 'repas', price: 28.00, color: 'Transparent', image: 'https://images.unsplash.com/photo-1582716401214-afc320a26fd1?w=400', brand: 'Tommee Tippee' },
  { id: 8, name: 'Serviette Capuche', category: 'toilette', price: 19.00, color: 'Blanc', image: 'https://images.unsplash.com/photo-1519689680058-0fb5d3db9632?w=400', brand: 'Damself' },
  { id: 9, name: 'Chaussettes Antidérapantes', category: 'accessoires', price: 12.00, color: 'Rose', image: 'https://images.unsplash.com/photo-1606107557195-0e933e6f8ae9?w=400', sizes: ['0-6m', '6-12m', '12-24m'], brand: 'Okaïdi' },
  { id: 10, name: 'Combinaison Hiver', category: 'vetements', price: 65.00, oldPrice: 79.00, color: 'Vert', image: 'https://images.unsplash.com/photo-1596789373071-16b95f54ecbb?w=400', isSale: true, sizes: ['0-12m', '12-24m', '24-36m'], brand: 'Jacadi' },
  { id: 11, name: 'Bain Douche Bébé', category: 'toilette', price: 14.50, color: 'Neutre', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a05?w=400', brand: 'Mustela' },
  { id: 12, name: 'Tétine Silicone', category: 'repas', price: 9.90, color: 'Transparent', image: 'https://images.unsplash.com/photo-1622290291463-a28f7a7a1124?w=400', brand: 'Phillips' }
]

const babyBrands = [
  { name: 'Jacadi', country: 'FR', tier: 'Premium', specialty: 'Mode nobiliaire enfants', year: 1976 },
  { name: 'Catimini', country: 'FR', tier: 'Mid-range', specialty: 'Vêtements colorés', year: 1978 },
  { name: 'Okaïdi', country: 'FR', tier: 'Budget', specialty: 'Mode enfants accessible', year: 1992 },
  { name: 'Du Jour', country: 'FR', tier: 'Premium', specialty: 'Mode premium bébé', year: 2015 },
  { name: 'Carrement', country: 'FR', tier: 'Mid-range', specialty: 'Basiques bébé', year: 2018 },
  { name: 'NAME', country: 'FR', tier: 'Budget', specialty: 'Mode Eco', year: 2010 },
  { name: 'Tommee Tippee', country: 'UK', tier: 'Mid-range', specialty: 'Artikel-alimentation', year: 1965 },
  { name: 'Phillips', country: 'UK', tier: 'Mid-range', specialty: 'Tétines', year: 1894 },
  { name: 'MAM', country: 'AT', tier: 'Mid-range', specialty: 'Tétines ergonomiques', year: 1976 },
  { name: 'Nuk', country: 'DE', tier: 'Mid-range', specialty: 'Artikel-toilette', year: 1956 }
]

export default function Babies() {
  const [products, setProducts] = useState(babyProducts)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [filters, setFilters] = useState({ color: '', size: '', price: '' })

  useEffect(() => {
    // Using local data
  }, [filters, activeCategory])

  const filterProducts = () => {
    let filtered = [...babyProducts]
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory)
    }
    if (filters.color) {
      filtered = filtered.filter(p => p.color.toLowerCase() === filters.color.toLowerCase())
    }
    if (filters.size) {
      filtered = filtered.filter(p => p.sizes && p.sizes.includes(filters.size))
    }
    if (filters.price === 'low') {
      filtered = filtered.filter(p => p.price < 20)
    } else if (filters.price === 'high') {
      filtered = filtered.filter(p => p.price > 40)
    }
    return filtered
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
    <div className="container" style={{ padding: '3rem 20px', background: '#0a0a0f', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#4B6CB7', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Collection Bébé
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', marginTop: '0.5rem', color: '#fff' }}>
            Bébé & Enfant 👶
          </h1>
          <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
            Des vêtements doux et confortables pour vos tout-petits. Qualité premium pour la peau sensible.
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
          {babyCategories.map(cat => (
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
                fontWeight: 600,
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
            {babyCategories.find(c => c.id === activeCategory)?.subcategories.map(sub => (
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
            value={filters.color}
            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
          >
            <option value="">Toutes les couleurs</option>
            <option value="blanc">Blanc</option>
            <option value="rose">Rose</option>
            <option value="bleu">Bleu</option>
            <option value="vert">Vert</option>
            <option value="jaune">Jaune</option>
          </select>
          
          <select 
            className="form-control"
            style={{ width: 'auto', padding: '10px 15px', borderRadius: '8px', border: '1px solid #333', background: '#16161f', color: '#fff' }}
            value={filters.size}
            onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          >
            <option value="">Toutes les tailles</option>
            <option value="0-3m">0-3 mois</option>
            <option value="3-6m">3-6 mois</option>
            <option value="6-12m">6-12 mois</option>
            <option value="12-24m">12-24 mois</option>
          </select>
          
          <select 
            className="form-control"
            style={{ width: 'auto', padding: '10px 15px', borderRadius: '8px', border: '1px solid #333', background: '#16161f', color: '#fff' }}
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Tous les prix</option>
            <option value="low">Moins de 20€</option>
            <option value="high">Plus de 40€</option>
          </select>
        </div>

        {filterProducts().length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: '#718096', marginBottom: '1rem' }}>Aucun produit trouvé</p>
            <button 
              onClick={() => setFilters({ color: '', size: '', price: '' })}
              style={{ padding: '10px 20px', background: '#4B6CB7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Réinitialiser
            </button>
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
                    <div style={{ background: '#16161f', borderRadius: '12px', overflow: 'hidden', border: '1px solid #2a2a35', transition: 'all 0.3s' }}>
                      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                        />
                        {product.isNew && (
                          <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#4B6CB7', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Nouveau</span>
                        )}
                        {product.isSale && (
                          <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#e53e3e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Sale</span>
                        )}
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <span style={{ color: '#4B6CB7', fontSize: '12px' }}>{product.brand}</span>
                        <h3 style={{ fontSize: '16px', margin: '0.5rem 0', fontWeight: 600, color: '#fff' }}>{product.name}</h3>
                        <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '0.5rem' }}>{product.color}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4B6CB7' }}>{product.price.toFixed(2)} €</span>
                          {product.oldPrice && (
                            <span style={{ fontSize: '14px', color: '#a0aec0', textDecoration: 'line-through' }}>{product.oldPrice.toFixed(2)} €</span>
                          )}
                        </div>
                        {product.sizes && (
                          <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
                            {product.sizes.map(size => (
                              <span key={size} style={{ background: '#2a2a35', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', color: '#9ca3af' }}>{size}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Baby Brands Section */}
        <div style={{ marginTop: '4rem', padding: '2rem', background: '#16161f', borderRadius: '16px', border: '1px solid #2a2a35' }}>
          <h3 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>Marques Bébé</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {babyBrands.map(brand => (
              <div key={brand.name} style={{ background: '#0a0a0f', padding: '12px 20px', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>{brand.name}</span>
                <span style={{ display: 'block', color: '#4B6CB7', fontSize: '12px' }}>{brand.country}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Badges */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRadius: '16px' }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>👶 Certifications Bébé</h3>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', color: '#9ca3af' }}>
            <div>✓ OEKO-TEX</div>
            <div>✓ Coton Bio</div>
            <div>✓ Hypoallergénique</div>
            <div>✓ Sans substances nocives</div>
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