import { useState } from 'react'
import { Link } from 'react-router-dom'

const blogPosts = [
  { id: 1, title: 'Tendances Mode 2024', excerpt: 'Decouvrez les tendances de la saison prochaine qui reinventent elegance et confort.', date: '15 Avril 2024', category: 'Mode', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { id: 2, title: 'Comment choisir sa taille', excerpt: 'Guide complet pour trouver la taille parfaite et assurer votre confort.', date: '10 Avril 2024', category: 'Conseils', image: 'https://images.unsplash.com/1445208178998-f45938955d8f2?w=600' },
  { id: 3, title: "L'art du pagne africain", excerpt: 'Histoire et signification des tissues traditionnelafricain authentique.', date: '5 Avril 2024', category: 'Culture', image: 'https://images.unsplash.com/photo-1583391722359-1528b3ceabd2?w=600' },
  { id: 4, title: 'Entretien des vetements', excerpt: 'Conseils pratiques pour prolonger la vie de vos habits preferes.', date: '1 Avril 2024', category: 'Entretien', image: 'https://images.unsplash.com/photo-1556905055-8f2a19ce7145?w=600' },
  { id: 5, title: 'Mode Durable', excerpt: 'Adopter une mode plus responsable et respectueuse de lenvironnement.', date: '25 Mars 2024', category: 'Ecologie', image: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=600' },
  { id: 6, title: 'Coordonner vos looks', excerpt: 'Creer des tenues harmonieuses pour toutes les occasions.', date: '20 Mars 2024', category: 'Conseils', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600' }
]

export default function Blog() {
  const [filter, setFilter] = useState('Tous')
  const filteredPosts = filter === 'Tous' ? blogPosts : blogPosts.filter(p => p.category === filter)
  const cats = ['Tous', ...new Set(blogPosts.map(p => p.category))]

  const getCatColor = (cat) => {
    const colors = { Mode: '#4B6CB7', Conseils: '#28a745', Culture: '#c71585', Entretien: '#fd7e14', Ecologie: '#20c997' }
    return colors[cat] || '#6c757d'
  }

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', 
        borderRadius: '20px', 
        padding: '60px 40px',
        marginBottom: '40px',
        color: '#fff',
        position: 'relative'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📰 Blog E-Designe</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px' }}>
          Tendances, conseils et actualites du monde de la mode. Restez informez des dernieres innovations.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {cats.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ 
            padding: '10px 20px', 
            borderRadius: '25px', 
            border: 'none', 
            background: filter === cat ? getCatColor(cat) : '#e2e8f0', 
            color: filter === cat ? '#fff' : '#333', 
            cursor: 'pointer',
            fontWeight: filter === cat ? 'bold' : 'normal',
            transition: 'all 0.2s'
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {filter === 'Tous' && filteredPosts[0] && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem', 
          marginBottom: '3rem',
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ height: '400px', overflow: 'hidden' }}>
            <img src={filteredPosts[0].image} alt={filteredPosts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            <div style={{ height: '100%', background: '#4B6CB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', color: '#fff' }}>📰</div>
          </div>
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ background: getCatColor(filteredPosts[0].category), color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', width: 'fit-content', marginBottom: '1rem' }}>{filteredPosts[0].category}</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{filteredPosts[0].title}</h2>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>{filteredPosts[0].excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#999' }}>{filteredPosts[0].date}</span>
              <Link to={`/blog/${filteredPosts[0].id}`} style={{ color: '#4B6CB7', fontWeight: 'bold' }}>Lire plus →</Link>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {filter !== 'Tous' ? filteredPosts : filteredPosts.slice(1).map(post => (
          <div key={post.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s' }} className="blog-card">
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
              <div style={{ height: '100%', background: '#4B6CB7', display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📰</div>
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: getCatColor(post.category), color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{post.category}</span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>{post.title}</h3>
              <p style={{ color: '#666', marginBottom: '1rem', lineHeight: 1.5, fontSize: '14px' }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#999' }}>{post.date}</span>
                <Link to={`/blog/${post.id}`} style={{ color: '#4B6CB7', fontWeight: '600' }}>Lire plus →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .blog-card:hover { transform: translateY(-4px); }
      `}</style>
    </div>
  )
}
