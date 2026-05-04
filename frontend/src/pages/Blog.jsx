import { useState } from 'react'
import { Link } from 'react-router-dom'

const blogPosts = [
  { 
    id: 1, 
    title: 'Tendances Mode 2024', 
    excerpt: 'Decouvrez les tendances de la saison prochaine qui reinventent elegance et confort.', 
    date: '15 Avril 2024', 
    category: 'Mode',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
  },
  { 
    id: 2, 
    title: 'Comment choisir sa taille', 
    excerpt: 'Guide complet pour trouver la taille parfaite et assurer votre confort.', 
    date: '10 Avril 2024', 
    category: 'Conseils',
    image: 'https://images.unsplash.com/1445208178998-f45938955d8f2?w=600&h=400&fit=crop'
  },
  { 
    id: 3, 
    title: "L'art du pagne africain", 
    excerpt: 'Histoire et signification des tissues traditionnelafricain authentique.', 
    date: '5 Avril 2024', 
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1583391722359-1528b3ceabd2?w=600&h=400&fit=crop'
  },
  { 
    id: 4, 
    title: 'Entretien des vetements', 
    excerpt: 'Conseils pratiques pour prolonger la vie de vos habits preferes.', 
    date: '1 Avril 2024', 
    category: 'Entretien',
    image: 'https://images.unsplash.com/photo-1556905055-8f2a19ce7145?w=600&h=400&fit=crop'
  },
  { 
    id: 5, 
    title: 'Mode Durable', 
    excerpt: 'Adopter une mode plus responsable et respectueuse de lenvironnement.', 
    date: '25 Mars 2024', 
    category: 'Ecologie',
    image: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=600&h=400&fit=crop'
  },
  { 
    id: 6, 
    title: 'Coordonner vos looks', 
    excerpt: 'Creer des tenues harmonieuses pour toutes les occasions.', 
    date: '20 Mars 2024', 
    category: 'Conseils',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=400&fit=crop'
  }
]

export default function Blog() {
  const [filter, setFilter] = useState('Tous')
  const filteredPosts = filter === 'Tous' ? blogPosts : blogPosts.filter(p => p.category === filter)
  const cats = ['Tous', ...new Set(blogPosts.map(p => p.category))]

  const getCatColor = (cat) => {
    const colors = { 
      Mode: '#4B6CB7', 
      Conseils: '#28a745', 
      Culture: '#9c27b0', 
      Entretien: '#ff9800', 
      Ecologie: '#20c997' 
    }
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

      {/* Category Filter Pills - Dark */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {cats.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            style={{ 
              padding: '10px 24px', 
              borderRadius: '25px', 
              border: '1px solid',
              borderColor: filter === cat ? getCatColor(cat) : '#2a2a35',
              background: filter === cat ? getCatColor(cat) : 'transparent', 
              color: filter === cat ? '#fff' : '#9ca3af', 
              cursor: 'pointer',
              fontWeight: filter === cat ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              fontSize: '14px'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid - Dark */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
        {filteredPosts.map(post => (
          <article 
            key={post.id} 
            style={{ 
              background: '#16161f', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              border: '1px solid #2a2a35',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {/* Image */}
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={post.image} 
                alt={post.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }} 
              />
              <div 
                style={{ 
                  height: '100%', 
                  background: `linear-gradient(135deg, ${getCatColor(post.category)} 0%, #1e293b 100%)`, 
                  display: 'none', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '4rem',
                  color: '#fff'
                }}
              >
                📰
              </div>
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  left: '16px', 
                  background: getCatColor(post.category), 
                  color: '#fff', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: 'bold'
                }}
              >
                {post.category}
              </span>
            </div>
            
            {/* Content - Dark */}
            <div style={{ padding: '24px' }}>
              <h3 
                style={{ 
                  marginBottom: '12px', 
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  lineHeight: '1.4',
                  color: '#fff'
                }}
              >
                {post.title}
              </h3>
              <p 
                style={{ 
                  color: '#9ca3af', 
                  marginBottom: '16px', 
                  lineHeight: '1.6', 
                  fontSize: '14px',
                  minHeight: '42px'
                }}
              >
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>{post.date}</span>
                <Link 
                  to={`/blog/${post.id}`} 
                  style={{ 
                    color: getCatColor(post.category), 
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  Lire plus →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CSS for hover effect */}
      <style>{`
        article:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  )
}
