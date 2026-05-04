import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-e-designe-dark.svg'
import { products, categories, qualityTiers } from '../data/products'

// Flatten products for featured display
const flatProducts = Object.values(products).flatMap(cat => Object.values(cat).flat())
const featuredProducts = flatProducts.slice(0, 8)

export default function Home() {
  return (
    <div>
      <section style={{ padding: '4rem 20px', textAlign: 'center', background: '#0a0a0f', color: '#fff' }}>
        <img src={logo} alt="E-Designe" style={{ height: '80px', marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>DECOUVREZ LA MODE AVEC L'IA</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Trouvez le vetement parfait grace a notre assistant intelligent</p>
        <form style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <input type="text" placeholder="Essayez: robe rouge soiree..." style={{ padding: '12px 16px', borderRadius: '8px', border: 'none', flex: 1 }} />
          <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#4B6CB7', color: '#fff', cursor: 'pointer' }}>Rechercher</button>
        </form>
      </section>

      {/* Quality Legend */}
      <section style={{ padding: '1rem 20px', background: '#f8f9fa', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {qualityTiers.map(q => (
            <span key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: q.color }}></span>
              <strong>{q.name}</strong>
              <span style={{ color: '#666', fontSize: '12px' }}>({q.desc})</span>
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '3rem 20px', background: '#f5f6fa' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#19232D' }}>Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          {categories.map(cat => (
            <Link key={cat.id} to={`/products?cat=${cat.name}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '2rem', background: '#fff', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>{cat.icon}</span>
                <h3 style={{ color: cat.color }}>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '3rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#19232D' }}>Nos meilleures offres</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {featuredProducts.map(product => (
            <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', paddingTop: '125%' }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://placehold.co/400x500/e2e8f0/1e293b?text=Image' }}
                  />
                  <span style={{ position: 'absolute', top: '8px', right: '8px', background: qualityTiers.find(t => t.id === product.quality)?.color || '#ccc', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>
                    {product.quality}
                  </span>
                </div>
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', color: '#4B6CB7', textTransform: 'uppercase' }}>{product.category}</span>
                  <h3 style={{ margin: '0.5rem 0', flex: 1 }}>{product.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#19232D' }}>{product.price} €</p>
                    <span style={{ fontSize: '12px', color: '#666' }}>{product.sub}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 20px', background: '#4B6CB7', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ marginBottom: '1rem' }}>Decouvrez toute notre collection</h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>Plus de 48 produits en Premium, Moyenne et Basic</p>
        <Link to="/products" style={{ padding: '14px 28px', background: '#fff', color: '#4B6CB7', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Voir tous les produits</Link>
      </section>
    </div>
  )
}
