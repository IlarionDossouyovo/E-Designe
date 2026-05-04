import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, qualityTiers } from '../data/products'

const femmeProducts = Object.values(products.femme).flat()

export default function Femme() {
  const [filterQual, setFilterQual] = useState('Tous')
  const [filterSub, setFilterSub] = useState('Tous')
  
  const subCats = ['Tous', ...new Set(femmeProducts.map(p => p.sub))]
  
  const filtered = femmeProducts.filter(p => {
    if (filterQual !== 'Tous' && p.quality !== filterQual) return false
    if (filterSub !== 'Tous' && p.sub !== filterSub) return false
    return true
  })

  const getColor = (q) => qualityTiers.find(t => t.id === q)?.color || '#ccc'

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>👗 Femme</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>Collection feminine Trendy et Elegante</p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <select value={filterQual} onChange={(e) => setFilterQual(e.target.value)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <option value="Tous">Toutes qualites</option>
          {qualityTiers.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
        </select>
        <select value={filterSub} onChange={(e) => setFilterSub(e.target.value)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <option value="Tous">Tous types</option>
          {subCats.filter(s => s !== 'Tous').map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display='none'} />
                <div style={{ height: '100%', background: '#c71585', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>👗</div>
              </div>
              <div style={{ padding: '1rem' }}>
                <span style={{ background: getColor(product.quality), color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>{product.quality}</span>
                <h3 style={{ margin: '0.5rem 0', fontSize: '1rem' }}>{product.name}</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{product.price} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
