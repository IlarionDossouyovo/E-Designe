import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const fallbackProducts = [
  { id: 1, name: 'Robe Africaine', price: 45, category: 'Africain' },
  { id: 2, name: 'Complet Homme', price: 89, category: 'Homme' },
  { id: 3, name: 'Robe Femme', price: 65, category: 'Femme' },
  { id: 4, name: 'Ensemble Bébé', price: 29, category: 'Bébé' },
  { id: 5, name: 'Chemise Hommes', price: 35, category: 'Homme' },
  { id: 6, name: 'Robe Soirée', price: 120, category: 'Femme' },
  { id: 7, name: 'Veste Costume', price: 150, category: 'Homme' },
  { id: 8, name: 'Sac Femme', price: 55, category: 'Femme' }
]

export default function Products() {
  const [products, setProducts] = useState(fallbackProducts)
  const [filter, setFilter] = useState('Tous')

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => {
      if (d?.length > 0) setProducts(d)
    }).catch(() => {})
  }, [])

  const filtered = filter === 'Tous' ? products : products.filter(p => p.category === filter)
  const categories = ['Tous', 'Homme', 'Femme', 'Africain', 'Bébé']

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem', color: '#19232D' }}>Tous nos produits</h1>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '8px 16px', borderRadius: '20px', border: filter === cat ? 'none' : '1px solid #ddd', background: filter === cat ? '#4B6CB7' : '#fff', color: filter === cat ? '#fff' : '#333', cursor: 'pointer' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ height: '200px', background: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>👗</div>
              <div style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#4B6CB7' }}>{product.category}</p>
                <h3 style={{ margin: '0.5rem 0' }}>{product.name}</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{product.price} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
