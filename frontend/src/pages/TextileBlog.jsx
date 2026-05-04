import { useState } from 'react'
import { Link } from 'react-router-dom'

const articles = [
  { id: 1, title: 'L\'art du Wax Africain', excerpt: 'Decouvrez l\'histoire et la signification des motifs wax.', category: 'Culture', date: '2026-04-15', image: '🎨', readTime: '5 min' },
  { id: 2, title: 'Guide: Choisir son tissu', excerpt: 'Comment selectionner le tissu parfait pour chaque occasion.', category: 'Conseils', date: '2026-04-10', image: '🧵', readTime: '8 min' },
  { id: 3, title: 'Tendances 2026', excerpt: 'Les couleurs et styles qui definissent cette annee.', category: 'Mode', date: '2026-04-05', image: '📈', readTime: '6 min' },
  { id: 4, title: 'Entretien des tissues', excerpt: 'Conseils pour prolonger la vie de vos vetements.', category: 'Conseils', date: '2026-03-28', image: '👕', readTime: '4 min' },
  { id: 5, title: 'Le Kente Ghanéen', excerpt: 'Un tissu riche en histoire et symbolisme.', category: 'Culture', date: '2026-03-20', image: '🇬🇭', readTime: '7 min' },
  { id: 6, title: 'Cotton vs Wax', excerpt: 'Quelle difference et quel choix faire?', category: 'Comparatif', date: '2026-03-15', image: '⚖️', readTime: '5 min' },
]

export default function TextileBlog() {
  const [filterCat, setFilterCat] = useState('Tous')

  const categories = ['Tous', ...new Set(articles.map(a => a.category))]
  
  const filtered = filterCat === 'Tous' ? articles : articles.filter(a => a.category === filterCat)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', 
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

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '180px' }}>
          <option value="Tous">Toutes categories</option>
          {categories.filter(c => c !== 'Tous').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ color: '#666', marginLeft: 'auto' }}>{filtered.length} articles</span>
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map(article => (
          <div key={article.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer' }} className="article-card">
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              {article.image}
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', color: '#666' }}>{article.category}</span>
                <span style={{ color: '#999', fontSize: '12px', marginLeft: 'auto' }}>{article.readTime}</span>
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>{article.title}</h3>
              <p style={{ color: '#666', margin: '0 0 12px', fontSize: '14px' }}>{article.excerpt}</p>
              <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>{new Date(article.date).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .article-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
      `}</style>
    </div>
  )
}
