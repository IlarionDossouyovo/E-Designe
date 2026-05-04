import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products, categories, qualityTiers } from '../data/products'

const fallbackProducts = [
  { id: 1, name: 'Robe Africaine', price: 45, category: 'Africain' },
  { id: 2, name: 'Complet Homme', price: 89, category: 'Homme' },
  { id: 3, name: 'Robe Femme', price: 65, category: 'Femme' },
  { id: 4, name: 'Ensemble Bebe', price: 29, category: 'Bebe' },
  { id: 5, name: 'Chemise Hommes', price: 35, category: 'Homme' },
  { id: 6, name: 'Robe Soiree', price: 120, category: 'Femme' },
  { id: 7, name: 'Veste Costume', price: 150, category: 'Homme' },
  { id: 8, name: 'Sac Femme', price: 55, category: 'Femme' }
]

// Flatten products for display
const flatProducts = Object.values(products).flatMap(cat => Object.values(cat).flat())

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
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem', color: '#19232D' }}>Tous nos produits</h1>
      
      {/* Quality Legend */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <span style={{ fontWeight: 'bold' }}>Qualite:</span>
        {qualityTiers.map(q => (
          <span key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: q.color }}></span>
            {q.name}
          </span>
        ))}
      </div>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Categorie:</label>
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '150px' }}>
            <option value="Tous">Tous</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Qualite:</label>
          <select value={filterQual} onChange={(e) => setFilterQual(e.target.value)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '150px' }}>
            <option value="Tous">Tous</option>
            {qualityTiers.map(q => (
              <option key={q.id} value={q.id}>{q.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Type:</label>
          <select value={filterSub} onChange={(e) => setFilterSub(e.target.value)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '150px' }}>
            <option value="Todos">Tous</option>
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
            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', paddingTop: '125%' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://placehold.co/400x500/e2e8f0/1e293b?text=Image' }}
                />
                <span style={{ position: 'absolute', top: '8px', right: '8px', background: getQualityColor(product.quality), padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>
                  {product.quality}
                </span>
              </div>
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', color: '#4B6CB7', textTransform: 'uppercase' }}>{product.category} - {product.sub}</span>
                <h3 style={{ margin: '0.5rem 0', flex: 1 }}>{product.name}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#19232D' }}>{product.price} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>Aucun produit trouve</p>
      )}
    </div>
  )
}
