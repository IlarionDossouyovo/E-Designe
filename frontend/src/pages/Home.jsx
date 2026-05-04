import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-e-designe-dark.svg'

const fallbackProducts = [
  { id: 1, name: 'Robe Africaine', price: 45, category: 'Africain' },
  { id: 2, name: 'Complet Homme', price: 89, category: 'Homme' },
  { id: 3, name: 'Robe Femme', price: 65, category: 'Femme' },
  { id: 4, name: 'Ensemble Bébé', price: 29, category: 'Bébé' }
]

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts)

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => {
      if (d?.length > 0) setProducts(d)
    }).catch(() => {})
  }, [])

  return (
    <div>
      <section style={{ padding: '4rem 20px', textAlign: 'center', background: '#0a0a0f', color: '#fff' }}>
        <img src={logo} alt="E-Désigne" style={{ height: '80px', marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>DÉCOUVREZ LA MODE AVEC L'IA</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Trouvez le vêtement parfait grâce à notre assistant intelligent</p>
        <form style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <input type="text" placeholder="Essayez: robe rouge soirée..." style={{ padding: '12px 16px', borderRadius: '8px', border: 'none', flex: 1 }} />
          <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#4B6CB7', color: '#fff', cursor: 'pointer' }}>Rechercher</button>
        </form>
      </section>

      <section style={{ padding: '3rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#19232D' }}>Nouveautés</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {products.map(product => (
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
      </section>

      <section style={{ padding: '3rem 20px', background: '#f5f6fa' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#19232D' }}>Catégories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          {['Homme', 'Femme', 'Africain', 'Bébé'].map(cat => (
            <Link key={cat} to={`/fournisseurs/${cat.toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '2rem', background: '#fff', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>{cat === 'Homme' ? '👔' : cat === 'Femme' ? '👚' : cat === 'Africain' ? '👗' : '👶'}</span>
                <h3 style={{ color: '#19232D' }}>{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
