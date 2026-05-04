import { useState } from 'react'
import { Link } from 'react-router-dom'

const articles = [
  { id: 1, title: 'L\'art du Wax Africain', excerpt: 'Decouvrez l\'histoire et la signification des motifs wax.',
    category: 'Culture', categoryColor: '#8b5cf6', date: '2026-04-15', image: '🎨', readTime: '5 min', featured: true },
  { id: 2, title: 'Guide: Choisir son tissu', excerpt: 'Comment selectionner le tissu parfait pour chaque occasion.',
    category: 'Conseils', categoryColor: '#22c55e', date: '2026-04-10', image: '🧵', readTime: '8 min' },
  { id: 3, title: 'Tendances 2026', excerpt: 'Les couleurs et styles qui definissent cette annee.',
    category: 'Mode', categoryColor: '#f59e0b', date: '2026-04-05', image: '📈', readTime: '6 min' },
  { id: 4, title: 'Entretien des tissues', excerpt: 'Conseils pour prolonger la vie de vos vetements.',
    category: 'Conseils', categoryColor: '#22c55e', date: '2026-03-28', image: '👕', readTime: '4 min' },
  { id: 5, title: 'Le Kente Ghanéen', excerpt: 'Un tissu riche en histoire et symbolisme.',
    category: 'Culture', categoryColor: '#8b5cf6', date: '2026-03-20', image: '🇬🇭', readTime: '7 min' },
  { id: 6, title: 'Cotton vs Wax', excerpt: 'Quelle difference et quel choix faire?',
    category: 'Comparatif', categoryColor: '#ec4899', date: '2026-03-15', image: '⚖️', readTime: '5 min' },
]

// Category color mapping
const categoryColors = {
  Culture: '#8b5cf6',
  Conseils: '#22c55e',
  Mode: '#f59e0b',
  Comparatif: '#ec4899',
}

export default function TextileBlog() {
  const [filterCat, setFilterCat] = useState('Tous')
  const categories = ['Tous', ...new Set(articles.map(a => a.category))]
  const filtered = filterCat === 'Tous' ? articles : articles.filter(a => a.category === filterCat)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Banner - Purple theme for Textile */}
      <div style={{ 
        background: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)', 
        borderRadius: '20px', 
        padding: '60px 40px',
        marginBottom: '40px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📰 Blog Textile</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '500px' }}>
            Actualites, conseils et histoires du monde du textile africain.
          </p>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>📰</div>
      </div>

      {/* Filters with category colors */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} 
          style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #2a2a35', minWidth: '180px', background: '#16161f', color: '#fff' }}>
          <option value="Tous">Toutes categories</option>
          {categories.filter(c => c !== 'Tous').map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span style={{ color: '#6b7280', marginLeft: 'auto' }}>{filtered.length} articles</span>
      </div>

      {/* Featured Article */}
      {filterCat === 'Tous' && articles.filter(a => a.featured).slice(0, 1).map(article => (
        <div key={`featured-${article.id}`} style={{ marginBottom: '40px' }}>
          <Link to={`/blog/${article.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)', 
              borderRadius: '20px', 
              padding: '40px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ fontSize: '5rem' }}>{article.image}</div>
              <div style={{ flex: '1 1 300px' }}>
                <span style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  padding: '4px 12px', 
                  borderRadius: '4px', 
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>ARTICLE EN VEDETTE</span>
                <h2 style={{ fontSize: '2rem', margin: '1rem 0' }}>{article.title}</h2>
                <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>{article.excerpt}</p>
                <p style={{ opacity: 0.7, marginTop: '1rem', fontSize: '12px' }}>{article.readTime} de lecture</p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Articles Grid - Dark theme with category colors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map(article => (
          <Link key={article.id} to={`/blog/${article.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: '#16161f', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              border: '1px solid #2a2a35',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              {/* Header with category color */}
              <div style={{ 
                background: `linear-gradient(135deg, ${article.categoryColor || '#8b5cf6'} 0%, ${article.categoryColor ? '#1e293b' : '#4c1d95'} 100%)`, 
                height: '100px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '3rem'
              }}>
                {article.image}
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ 
                    background: article.categoryColor || '#8b5cf6', 
                    padding: '4px 10px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>{article.category}</span>
                  <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: 'auto' }}>{article.readTime}</span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: '#fff' }}>{article.title}</h3>
                <p style={{ color: '#9ca3af', margin: '0 0 12px', fontSize: '14px' }}>{article.excerpt}</p>
                <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .article-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
      `}</style>
    </div>
  )
}
