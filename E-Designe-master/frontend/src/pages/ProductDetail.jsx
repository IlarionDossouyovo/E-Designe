import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { allProducts, qualityTiers } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const [size, setSize] = useState('M')

  const product = allProducts.find(p => p.id === id) || allProducts[0]
  const qt = qualityTiers.find(t => t.id === product.quality)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/products" style={{ color: '#4B6CB7', marginBottom: '1rem', display: 'inline-block' }}>← Retour aux produits</Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ background: '#f5f6fa', borderRadius: '12px', height: '500px', overflow: 'hidden' }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://placehold.co/500x600/e2e8f0/1e293b?text=Image' }}
          />
        </div>
        
        <div>
          <span style={{ 
            background: qt?.color || '#ccc', 
            color: '#fff', 
            padding: '4px 12px', 
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {product.quality}
          </span>
          <p style={{ color: '#4B6CB7', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{product.category} - {product.sub}</p>
          <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.price} €</p>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Produit de qualite {product.quality.toLowerCase()} dans la categorie {product.category}. 
            Confectionne avec des materiaux de qualite pour un rendu parfait.
          </p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Taille:</p>
            {['XS', 'S', 'M', 'L', 'XL'].map(s => (
              <button key={s} onClick={() => setSize(s)} style={{ padding: '8px 16px', marginRight: '8px', borderRadius: '4px', border: size === s ? 'none' : '1px solid #ddd', background: size === s ? '#4B6CB7' : '#fff', color: size === s ? '#fff' : '#333', cursor: 'pointer' }}>
                {s}
              </button>
            ))}
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Quantite:</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>-</button>
              <span>1</span>
              <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>+</button>
            </div>
          </div>
          
          <button style={{ padding: '14px 28px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
            Ajouter au panier 🛒
          </button>
        </div>
      </div>
    </div>
  )
}
