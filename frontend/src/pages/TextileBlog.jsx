import { useState } from 'react'
import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: 'Tendances Tissus 2026: Le Coton Bio Révolutionne la Mode',
    excerpt: 'Le coton bio-devient le standard dor. Les grandes marques saddoptent durablement pour répondre aux consommateurs éco-responsables.',
    category: 'Tendances',
    date: '2026-04-15',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Pourquoi le Textile Africain Connaît un Renouveau Inédié',
    excerpt: 'Les wax, Ankara et tissus traditionnels africains séduit mode internationale. Analyse du marché et perspectives.',
    category: 'Marché',
    date: '2026-04-12',
    image: 'https://images.unsplash.com/photo-1613909207039-6b173b1dc79f?w=800&q=80',
    readTime: '7 min'
  },
  {
    id: 3,
    title: 'Guide: Choisir le Bon Tissu pour Votre Production',
    excerpt: 'Critères essentiels: gramage, composition,柔软eté, résistance. Votre checklist complète.',
    category: 'Guide',
    date: '2026-04-10',
    image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800&q=80',
    readTime: '10 min'
  },
  {
    id: 4,
    title: 'LIA Génère Vos Motifs Textiles en Secondes',
    excerpt: 'Outils et techniques pour créer des motifs personnalisés avec intelligence artificielle.',
    category: 'Innovation',
    date: '2026-04-08',
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23abc?w=800&q=80',
    readTime: '6 min'
  },
  {
    id: 5,
    title: 'Textile Technique: LIndustrie du Futur',
    excerpt: 'Tissus intelligents,、抗菌、防水. Les innovations qui transforment lhabillement.',
    category: 'Tech',
    date: '2026-04-05',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a488a786?w=800&q=80',
    readTime: '8 min'
  },
  {
    id: 6,
    title: 'Supply Chain Textile: Optimisez Vos Achats',
    excerpt: 'Stratégies dapprovisionnement, gestion des MOQ, négociation avec les fournisseurs.',
    category: 'Business',
    date: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    readTime: '12 min'
  }
]

const categories = ['Tous', 'Tendances', 'Marché', 'Guide', 'Innovation', 'Tech', 'Business']

export default function Blog() {
  const [filter, setFilter] = useState('Tous')
  const [search, setSearch] = useState('')

  const filtered = blogPosts.filter(p => {
    const matchCat = filter === 'Tous' || p.category === filter
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                   p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ padding: '3rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#4B6CB7', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Blog E-Désigne
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
            📝 Actualités & Tendances<Textile />
          </h1>
          <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
            Actualités textile, guides pratiques, tendances mode et innovations.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '250px', fontSize: '16px' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '20px',
                  border: filter === cat ? 'none' : '1px solid #e2e8f0',
                  background: filter === cat ? '#4B6CB7' : 'white',
                  color: filter === cat ? 'white' : '#4a5568',
                  cursor: 'pointer',
                  fontWeight: filter === cat ? 600 : 400
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '300px' }}>
            <img 
              src={blogPosts[0].image} 
              alt={blogPosts[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '2rem',
              color: 'white'
            }}>
              <span style={{ 
                background: '#F7B731', 
                padding: '4px 12px', 
                borderRadius: '4px', 
                fontSize: '12px',
                fontWeight: 600 
              }}>
                {blogPosts[0].category}
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{blogPosts[0].title}</h3>
              <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>{blogPosts[0].excerpt}</p>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {filtered.slice(1).map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{ 
                background: 'white', 
                borderRadius: '12px', 
                overflow: 'hidden',
                boxShadow: '0 2px 15px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ height: '180px', overflow: 'hidden' }}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ 
                    background: '#4B6CB7', 
                    color: 'white', 
                    padding: '4px 10px', 
                    borderRadius: '4px', 
                    fontSize: '11px',
                    fontWeight: 600 
                  }}>
                    {post.category}
                  </span>
                  <span style={{ color: '#a0aec0', fontSize: '12px' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ color: '#718096', fontSize: '13px', lineHeight: 1.5 }}>
                  {post.excerpt}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <span style={{ color: '#a0aec0', fontSize: '12px' }}>{post.date}</span>
                  <button style={{ 
                    color: '#4B6CB7', 
                    background: 'none', 
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}>
                    Lire →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ 
          marginTop: '3rem', 
          background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', 
          color: 'white', 
          padding: '3rem', 
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>📧 Abonnez-vous à notre newsletter</h3>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
            Recevez les dernières tendances et exclusivités
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Votre email"
              style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: 'none', fontSize: '16px' }}
            />
            <button style={{ 
              padding: '12px 24px', 
              background: '#F7B731', 
              color: '#19232D', 
              border: 'none', 
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              S'abonner
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}