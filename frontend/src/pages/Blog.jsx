import { useState } from 'react'
import { motion } from 'framer-motion'

const blogArticles = [
  {
    id: 1,
    title: 'Les Tendances Mode Printemps-Été 2024',
    excerpt: 'Découvrez les couleurs, silhouettes et styles qui dominent cette saison. Du minimalisme au maximalisme, nous analysons les tendances clés.',
    category: 'Mode',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    date: '15 Avril 2024',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Guide: Choisir la Taille Parfaite',
    excerpt: 'Comment trouver la bonne taille de vêtements? Notre guide complet vous aide à prendre vos mesures et à choisir fit idéal.',
    category: 'Conseils',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
    date: '12 Avril 2024',
    readTime: '4 min'
  },
  {
    id: 3,
    title: 'L\'Art du Minimalisme vestimentaire',
    excerpt: 'Comment créer une garde-robe capsule elegante et functionnelle. Des tips pour un dressing organize et versatile.',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    date: '10 Avril 2024',
    readTime: '6 min'
  },
  {
    id: 4,
    title: 'Cosmétiques Bio: Pourquoi Passer au Naturel?',
    excerpt: 'Les avantages des cosmétiques biologiques pour votre peau et l\'environnement. Notre sélection des meilleures marques.',
    category: 'Beauté',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
    date: '8 Avril 2024',
    readTime: '5 min'
  },
  {
    id: 5,
    title: 'Costume sur Mesure: L\'Élégance à la Française',
    excerpt: 'Tout ce qu\'il faut savoir sur le costume sur mesure. Choix des tissus, coupe et accessoires pour un look impec.',
    category: 'Mode',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    date: '5 Avril 2024',
    readTime: '7 min'
  },
  {
    id: 6,
    title: 'Routine Beauté Matinale: Les Étapes Essentielles',
    excerpt: 'Construisez votre routine quotidienne parfaite. Nettoyage, hydratation, protection solaire: nos recommandations.',
    category: 'Beauté',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    date: '3 Avril 2024',
    readTime: '4 min'
  }
]

const categories = ['Tous', 'Mode', 'Conseils', 'Lifestyle', 'Beauté']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filteredArticles = activeCategory === 'Tous' 
    ? blogArticles 
    : blogArticles.filter(a => a.category === activeCategory)

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)',
          borderRadius: '20px',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Blog E-Designe</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Actualités, conseils et tendances mode pour vous accompagner au quotidien.
        </p>
      </motion.div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              border: 'none',
              background: activeCategory === cat ? '#4B6CB7' : '#F5F6FA',
              color: activeCategory === cat ? 'white' : '#1A202C',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.3s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-products">
        {filteredArticles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
            style={{ cursor: 'pointer' }}
          >
            <div className="product-image-wrapper">
              <img src={article.image} alt={article.title} className="product-image" />
            </div>
            <div className="product-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: '#4B6CB7', 
                  fontWeight: 600,
                  textTransform: 'uppercase' 
                }}>
                  {article.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#718096' }}>
                  {article.readTime} de lecture
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                {article.title}
              </h3>
              <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {article.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>{article.date}</span>
                <span style={{ color: '#4B6CB7', fontWeight: 600, fontSize: '0.9rem' }}>
                  Lire →
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ 
          marginTop: '4rem',
          padding: '3rem',
          background: '#F5F6FA',
          borderRadius: '20px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Abonnez-vous à notre newsletter</h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Recevez nos dernières tendances et offres exclusives
        </p>
        <div style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input 
            type="email" 
            placeholder="Votre email" 
            style={{ 
              flex: '1 1 250px',
              padding: '1rem 1.5rem', 
              borderRadius: '30px', 
              border: '2px solid #E2E8F0',
              fontSize: '1rem'
            }}
          />
          <button className="btn btn-primary" style={{ borderRadius: '30px' }}>
            S'abonner
          </button>
        </div>
      </motion.div>
    </div>
  )
}