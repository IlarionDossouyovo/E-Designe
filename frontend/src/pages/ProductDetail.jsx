import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const products = {
  1: { id: 1, name: 'Robe Africaine', price: 45, category: 'Africain', description: 'Magnifique robe traditionnelleafricaine en cotton de qualité.' },
  2: { id: 2, name: 'Complet Homme', price: 89, category: 'Homme', description: 'Complet homme élégant pour toutes occasions.' },
  3: { id: 3, name: 'Robe Femme', price: 65, category: 'Femme', description: 'Robe femme moderne et élégante.' },
  4: { id: 4, name: 'Ensemble Bébé', price: 29, category: 'Bébé', description: 'Ensemble doux pour bébé.' }
}

export default function ProductDetail() {
  const { id } = useParams()
  const [size, setSize] = useState('M')

  const product = products[id] || products[1]

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/products" style={{ color: '#4B6CB7', marginBottom: '1rem', display: 'inline-block' }}>← Retour</Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ background: '#f5f6fa', borderRadius: '12px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>👗</div>
        
        <div>
          <p style={{ color: '#4B6CB7', marginBottom: '0.5rem' }}>{product.category}</p>
          <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.price} €</p>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>{product.description}</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Taille:</p>
            {['XS', 'S', 'M', 'L', 'XL'].map(s => (
              <button key={s} onClick={() => setSize(s)} style={{ padding: '8px 16px', marginRight: '8px', borderRadius: '4px', border: size === s ? 'none' : '1px solid #ddd', background: size === s ? '#4B6CB7' : '#fff', color: size === s ? '#fff' : '#333', cursor: 'pointer' }}>
                {s}
              </button>
            ))}
          </div>
          
          <button style={{ padding: '14px 28px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
            Ajouter au panier 🛒
          </button>
        </div>
      </div>
    </div>
  )
}
