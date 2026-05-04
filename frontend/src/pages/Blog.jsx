import { useState } from 'react'
import { Link } from 'react-router-dom'

const blogPosts = [
  { id: 1, title: 'Tendances Mode 2024', excerpt: 'Decouvrez les tendances de la saison prochaine', date: '15 Avril 2024', category: 'Mode' },
  { id: 2, title: 'Comment choisir sa taille', excerpt: 'Guide complet pour trouver la taille parfaite', date: '10 Avril 2024', category: 'Conseils' },
  { id: 3, title: 'L\'art du pagne africain', excerpt: 'Histoire et signification des tissues traditionnels', date: '5 Avril 2024', category: 'Culture' },
  { id: 4, title: 'Entretien des vetements', excerpt: 'Conseils pour prolonger la vie de vos habits', date: '1 Avril 2024', category: 'Entretien' },
  { id: 5, title: 'Mode Durable', excerpt: 'Adopter une mode plus responsable', date: '25 Mars 2024', category: 'Ecologie' },
  { id: 6, title: 'Coordonner vos looks', excerpt: 'Creer des tenues harmonieuses', date: '20 Mars 2024', category: 'Conseils' }
]

export default function Blog() {
  const [filter, setFilter] = useState('Tous')
  const filteredPosts = filter === 'Tous' ? blogPosts : blogPosts.filter(p => p.category === filter)
  const cats = ['Tous', ...new Set(blogPosts.map(p => p.category))]

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Blog E-Designe</h1>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {cats.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: filter === cat ? '#4B6CB7' : '#e2e8f0', color: filter === cat ? '#fff' : '#333', cursor: 'pointer' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredPosts.map(post => (
          <div key={post.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ height: '180px', background: '#4B6CB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#fff' }}>
              📰
            </div>
            <div style={{ padding: '1rem' }}>
              <span style={{ fontSize: '12px', color: '#4B6CB7', fontWeight: 'bold' }}>{post.category}</span>
              <h3 style={{ margin: '0.5rem 0' }}>{post.title}</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#999' }}>{post.date}</span>
                <Link to={`/blog/${post.id}`} style={{ color: '#4B6CB7' }}>Lire plus</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
