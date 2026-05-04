import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, qualityTiers } from '../data/products'

// Generate cosmetics from existing products data
const cosmeticsProducts = [
  { id: 'c1', name: 'Crème Nourrissante', price: 35, quality: 'Premium', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', category: 'Cosmétiques', sub: 'Soins' },
  { id: 'c2', name: 'Lait Corporel', price: 25, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1608248597279-f99d2bfc4e48?w=400', category: 'Cosmétiques', sub: 'Soins' },
  { id: 'c3', name: 'Beurre Corporel', price: 18, quality: 'Basic', image: 'https://images.unsplash.com/photo-1620916566398-40f05e8d51f5?w=400', category: 'Cosmétiques', sub: 'Soins' },
  { id: 'c4', name: 'Savon Noir Africain', price: 12, quality: 'Premium', image: 'https://images.unsplash.com/photo-1600857544200-b2f9775807d8?w=400', category: 'Cosmétiques', sub: 'Savons' },
  { id: 'c5', name: 'Savon au Karité', price: 8, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1600857544200-b2f9775807d8?w=400', category: 'Cosmétiques', sub: 'Savons' },
  { id: 'c6', name: 'Savon Basic', price: 4, quality: 'Basic', image: 'https://images.unsplash.com/photo-1600857544200-b2f9775807d8?w=400', category: 'Cosmétiques', sub: 'Savons' },
  { id: 'c7', name: 'huile d\'Argan', price: 45, quality: 'Premium', image: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=400', category: 'Cosmétiques', sub: 'Huiles' },
  { id: 'c8', name: 'huile de Coco', price: 15, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=400', category: 'Cosmétiques', sub: 'Huiles' },
  { id: 'c9', name: 'huile de Palme', price: 8, quality: 'Basic', image: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=400', category: 'Cosmétiques', sub: 'Huiles' },
  { id: 'c10', name: 'Shea Butter Premium', price: 38, quality: 'Premium', image: 'https://images.unsplash.com/photo-1598440947619-a2c32f5e45c1?w=400', category: 'Cosmétiques', sub: 'Beauté' },
  { id: 'c11', name: 'Crème Lissante', price: 22, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1598440947619-a2c32f5e45c1?w=400', category: 'Cosmétiques', sub: 'Beauté' },
  { id: 'c12', name: 'Lotion Basic', price: 10, quality: 'Basic', image: 'https://images.unsplash.com/photo-1598440947619-a2c32f5e45c1?w=400', category: 'Cosmétiques', sub: 'Beauté' },
]

const cosmetiquesProducts = cosmeticsProducts.concat(
  Object.values(products.homme || {}).flat().slice(0, 3).map(p => ({ ...p, id: p.id + '-h', category: 'Cosmétiques' }))
).concat(
  Object.values(products.femme || {}).flat().slice(0, 3).map(p => ({ ...p, id: p.id + '-f', category: 'Cosmétiques' }))
)

export default function Cosmetiques() {
  const [filterQual, setFilterQual] = useState('Tous')
  const [filterSub, setFilterSub] = useState('Tous')
  
  const subCats = ['Tous', ...new Set(cosmetiquesProducts.map(p => p.sub))]
  
  const filtered = cosmetiquesProducts.filter(p => {
    if (filterQual !== 'Tous' && p.quality !== filterQual) return false
    if (filterSub !== 'Tous' && p.sub !== filterSub) return false
    return true
  })

  const getColor = (q) => qualityTiers.find(t => t.id === q)?.color || '#ec4899'

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', 
        borderRadius: '20px', 
        padding: '60px 40px',
        marginBottom: '40px',
        color: '#16161f',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💄 Cosmétiques</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '500px' }}>
            Produits de beautes africains et naturels. Huiles, beurres et soins pour une peau parfaite.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Link to="/products?cat=Cosmetiques&qual=Premium" style={{ padding: '12px 24px', background: '#16161f', color: '#ec4899', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Premium</Link>
            <Link to="/products?cat=Cosmetiques" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#16161f', borderRadius: '8px', textDecoration: 'none' }}>Voir tout</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>💄</div>
      </div>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filterQual} onChange={(e) => setFilterQual(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', minWidth: '150px' }}>
          <option value="Tous">Toutes qualites</option>
          {qualityTiers.map(q => <option key={q.id} value={q.id}>{q.name} ({q.desc})</option>)}
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
                <div style={{ height: '100%', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>💄</div>
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: getColor(product.quality), color: '#16161f', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{product.quality}</span>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '12px', color: '#ec4899', marginBottom: '4px' }}>{product.sub}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: '600' }}>{product.name}</h3>
                <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ec4899' }}>{product.price} €</p>
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