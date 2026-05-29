import { useState } from 'react'
import { Link } from 'react-router-dom'

const sampleResults = [
  { id: 1, name: 'Robe Elegante Noire', category: 'Robes', price: 89.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
  { id: 2, name: 'Chemise Blanche', category: 'Chemises', price: 49.99, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
  { id: 3, name: 'Pantalon Chino', category: 'Pantalons', price: 59.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400' },
]

export default function AISearch() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setTimeout(() => {
      setResults(sampleResults)
      setLoading(false)
    }, 800)
  }

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', borderRadius: '20px', padding: '60px 40px', marginBottom: '40px', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍 Recherche IA</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Trouvez le produit parfait grace a notre intelligence artificielle. Decrivez ce que vous cherchez en quelques mots.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: robe rouge taille M pour soiree..."
            style={{ flex: 1, padding: '16px 24px', borderRadius: '12px', border: '2px solid #4B6CB7', background: '#16161f', color: '#fff', fontSize: '1.1rem' }}
          />
          <button type="submit" style={{ padding: '16px 32px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Rechercher
          </button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
          <p style={{ color: '#9ca3af' }}>L'IA analyse vos preferences...</p>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Resultats trouves ({results.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {results.map(product => (
              <Link key={product.id} to={`/products/${product.id}`} style={{ background: '#16161f', borderRadius: '16px', overflow: 'hidden', textDecoration: 'none', border: '1px solid #2a2a35' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0 0 8px' }}>{product.category}</p>
                  <h3 style={{ color: '#fff', margin: '0 0 8px' }}>{product.name}</h3>
                  <p style={{ color: '#4B6CB7', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>{product.price}€</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results yet */}
      {!loading && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', background: '#16161f', borderRadius: '16px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💡</div>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Conseils de recherche</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ background: '#0a0a0f', padding: '16px', borderRadius: '8px' }}>
              <p style={{ color: '#4B6CB7', fontWeight: 'bold', marginBottom: '8px' }}>Par couleur</p>
              <p style={{ color: '#9ca3af' }}>Noir, Blanc, Rouge, Bleu...</p>
            </div>
            <div style={{ background: '#0a0a0f', padding: '16px', borderRadius: '8px' }}>
              <p style={{ color: '#4B6CB7', fontWeight: 'bold', marginBottom: '8px' }}>Par taille</p>
              <p style={{ color: '#9ca3af' }}>XS, S, M, L, XL...</p>
            </div>
            <div style={{ background: '#0a0a0f', padding: '16px', borderRadius: '8px' }}>
              <p style={{ color: '#4B6CB7', fontWeight: 'bold', marginBottom: '8px' }}>Par occasion</p>
              <p style={{ color: '#9ca3af' }}>Soiree, Travail, Sport...</p>
            </div>
            <div style={{ background: '#0a0a0f', padding: '16px', borderRadius: '8px' }}>
              <p style={{ color: '#4B6CB7', fontWeight: 'bold', marginBottom: '8px' }}>Par budget</p>
              <p style={{ color: '#9ca3af' }}>moins de 50€, 50-100€...</p>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div style={{ marginTop: '60px' }}>
        <h2 style={{ marginBottom: '2rem', color: '#fff', textAlign: 'center' }}>Pourquoi utiliser la recherche IA?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Precis</h3>
            <p style={{ color: '#9ca3af' }}>Trouvez exactement ce que vous voulez en quelques mots.</p>
          </div>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Rapide</h3>
            <p style={{ color: '#9ca3af' }}>Resultats en moins d'une seconde.</p>
          </div>
          <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Personnalise</h3>
            <p style={{ color: '#9ca3af' }}>Recommandations basees sur vos gouts.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
