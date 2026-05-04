import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, qualityTiers } from '../data/products'

const bebeProducts = Object.values(products.bebe).flat()

export default function Enfants() {
  const [filterQual, setFilterQual] = useState('Tous')
  const [filterSub, setFilterSub] = useState('Tous')
  
  const subCats = ['Tous', ...new Set(bebeProducts.map(p => p.sub))]
  
  const filtered = bebeProducts.filter(p => {
    if (filterQual !== 'Tous' && p.quality !== filterQual) return false
    if (filterSub !== 'Tous' && p.sub !== filterSub) return false
    return true
  })

  const getColor = (q) => qualityTiers.find(t => t.id === q)?.color || '#ccc'

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)', 
        borderRadius: '20px', 
        padding: '60px 40px',
        marginBottom: '40px',
        color: '#16161f',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👶 Collection Enfants</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '500px' }}>
            Confort et tendresse pour vos enfants. Vetements doux et ludique.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Link to="/products?cat=Bebe&qual=Premium" style={{ padding: '12px 24px', background: '#16161f', color: '#ff6b6b', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Premium</Link>
            <Link to="/products?cat=Bebe" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#16161f', borderRadius: '8px', textDecoration: 'none' }}>Voir tout</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>👶</div>
      </div>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filterQual} onChange={(e) => setFilterQual(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', minWidth: '150px' }}>
          <option value="Tous">Toutes qualites</option>
          {qualityTiers.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
        </select>
        <select value={filterSub} onChange={(e) => setFilterSub(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', minWidth: '150px' }}>
          <option value="Tous">Tous types</option>
          {subCats.filter(s => s !== 'Tous').map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ color: '#9ca3af', marginLeft: 'auto' }}>{filtered.length} produits</span>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {filtered.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#16161f', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s, box-shadow 0.3s', height: '100%' }} className="product-card">
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                <div style={{ height: '100%', background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)', display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>👶</div>
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: getColor(product.quality), color: '#16161f', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{product.quality}</span>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '12px', color: '#ff6b6b', marginBottom: '4px' }}>{product.sub}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: '600' }}>{product.name}</h3>
                <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ff6b6b' }}>{product.price} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
      `}</style>
    </div>
  )
}
