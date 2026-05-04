import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products, categories, qualityTiers } from '../data/products'

// Flatten products for display
const flatProducts = Object.values(products).flatMap(cat => Object.values(cat).flat())

// Hero background for Products page
const heroBg = 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1400'

export default function Products() {
  const [allProds, setAllProds] = useState(flatProducts)
  const [filterCat, setFilterCat] = useState('Tous')
  const [filterQual, setFilterQual] = useState('Tous')
  
  // Get unique subcategories
  const subCats = ['Tous', ...new Set(allProds.map(p => p.sub))]
  const [filterSub, setFilterSub] = useState('Tous')

  const filtered = allProds.filter(p => {
    if (filterCat !== 'Tous' && p.category !== filterCat) return false
    if (filterQual !== 'Tous' && p.quality !== filterQual) return false
    if (filterSub !== 'Tous' && p.sub !== filterSub) return false
    return true
  })

  const getQualityColor = (q) => {
    const qt = qualityTiers.find(t => t.id === q)
    return qt?.color || '#ccc'
  }

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero Banner with Background */}
      <div style={{
        position: 'relative',
        marginBottom: '2rem',
        borderRadius: '20px',
        padding: '60px 40px',
        background: `linear-gradient(to bottom, rgba(10,10,15,0.9), rgba(10,10,15,0.95)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}>
        <h1 style={{ marginBottom: '0.5rem', color: '#fff', fontSize: '2.5rem' }}>Tous nos produits</h1>
        <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>Decouvrez notre collection complete de vetements</p>
        <p style={{ marginTop: '1rem', color: '#6B8DD6', fontWeight: 'bold' }}>{filtered.length} produits disponibles</p>
      </div>
      
      {/* Quality Legend */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: '#16161f', borderRadius: '12px', border: '1px solid #2a2a35' }}>
        <span style={{ fontWeight: 'bold', color: '#fff' }}>Qualite:</span>
        {qualityTiers.map(q => (
          <span key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fff' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: q.color }}></span>
            {q.name}
          </span>
        ))}
      </div>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#fff' }}>Categorie:</label>
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a35', minWidth: '150px', background: '#16161f', color: '#fff' }}>
            <option value="Tous">Tous</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#fff' }}>Qualite:</label>
          <select value={filterQual} onChange={(e) => setFilterQual(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a35', minWidth: '150px', background: '#16161f', color: '#fff' }}>
            <option value="Tous">Tous</option>
            {qualityTiers.map(q => (
              <option key={q.id} value={q.id}>{q.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#fff' }}>Type:</label>
          <select value={filterSub} onChange={(e) => setFilterSub(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a35', minWidth: '150px', background: '#16161f', color: '#fff' }}>
            <option value="Tous">Tous</option>
            {subCats.filter(s => s !== 'Tous').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#16161f', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #2a2a35' }}>
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
                <span style={{ position: 'absolute', top: '8px', right: '8px', background: getQualityColor(product.quality), padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>
                  {product.quality}
                </span>
              </div>
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', color: '#4B6CB7', textTransform: 'uppercase' }}>{product.category} - {product.sub}</span>
                <h3 style={{ margin: '0.5rem 0', flex: 1, color: '#fff' }}>{product.name}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4B6CB7' }}>{product.price} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', background: '#16161f', borderRadius: '12px' }}>Aucun produit trouve</p>
      )}
    </div>
  )
}
