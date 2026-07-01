import { useState } from 'react'
import { Link } from 'react-router-dom'

// Données complètes des catégories textiles
const textileCategories = [
  {
    id: 'coton',
    name: 'Coton',
    icon: '🌿',
    description: 'Fibres naturelles de haute qualité',
    suppliers: ['Adidas', 'Nike', 'H&M', 'Zara'],
    products: 245,
    articles: [
      { title: 'Guide du coton bio pour vos créations', category: 'Matériaux', readTime: '5 min' },
      { title: 'Coton égyptien vs cotton standard', category: 'Comparatif', readTime: '6 min' }
    ]
  },
  {
    id: 'lin',
    name: 'Lin',
    icon: '🌾',
    description: 'Tissu léger et respirant',
    suppliers: ['Zara', 'HM', 'Gucci'],
    products: 128,
    articles: [
      { title: 'Entretien du lin: Les meilleurs conseils', category: 'Entretien', readTime: '4 min' },
      { title: 'Collection été en lin 2024', category: 'Tendances', readTime: '5 min' }
    ]
  },
  {
    id: 'soie',
    name: 'Soie',
    icon: '🦋',
    description: 'Luxueuse et raffinée',
    suppliers: ['Gucci', 'Chanel', 'Hermes'],
    products: 89,
    articles: [
      { title: 'Histoire de la soie dans la mode', category: 'Histoire', readTime: '8 min' },
      { title: 'Comment reconnaître la vraie soie', category: 'Guide', readTime: '5 min' }
    ]
  },
  {
    id: 'laine',
    name: 'Laine',
    icon: '🐑',
    description: 'Chaude et confortable',
    suppliers: ['Zara', 'HM', 'Adidas'],
    products: 167,
    articles: [
      { title: 'Laine mérinos: caractéristiques et avantages', category: 'Matériaux', readTime: '6 min' },
      { title: 'Pulls en laine:Tendances 2024', category: 'Mode', readTime: '4 min' }
    ]
  },
  {
    id: 'polyester',
    name: 'Polyester',
    icon: '🧵',
    description: 'Résistant et facile d\'entretien',
    suppliers: ['Nike', 'Adidas', 'Zara'],
    products: 312,
    articles: [
      { title: 'Polyester recyclé: Écologie et mode', category: 'Écologie', readTime: '5 min' },
      { title: 'Entretien des vêtements polyester', category: 'Entretien', readTime: '3 min' }
    ]
  },
  {
    id: 'jean',
    name: 'Denim/Jean',
    icon: '👖',
    description: 'Denim authentique',
    suppliers: ['Zara', 'HM', 'Nike'],
    products: 198,
    articles: [
      { title: 'Histoire du denim dans le monde', category: 'Histoire', readTime: '7 min' },
      { title: 'Comment choisir son jean parfait', category: 'Guide', readTime: '5 min' }
    ]
  },
  {
    id: 'velours',
    name: 'Velours',
    icon: '✨',
    description: 'Douillet et élégant',
    suppliers: ['Gucci', 'Zara'],
    products: 76,
    articles: [
      { title: 'Velours: Le retour en force', category: 'Tendances', readTime: '4 min' },
      { title: 'Entretien du velours', category: 'Entretien', readTime: '5 min' }
    ]
  },
  {
    id: 'cuir',
    name: 'Cuir',
    icon: '👜',
    description: 'Cuir véritable et synthétique',
    suppliers: ['Gucci', 'Chanel', 'Prada', 'Versace'],
    products: 145,
    articles: [
      { title: 'Cuir vegan: Alternative écologique', category: 'Écologie', readTime: '6 min' },
      { title: 'Entretien du cuir: Guide complet', category: 'Entretien', readTime: '7 min' }
    ]
  }
]

// Produits vedettes par catégorie
const featuredProducts = [
  { id: 1, name: 'T-shirt Coton Bio', price: 24.99, category: 'coton', brand: 'H&M', image: '👕' },
  { id: 2, name: 'Robe Lin Été', price: 59.99, category: 'lin', brand: 'Zara', image: '👗' },
  { id: 3, name: 'Foulard Soie Luxe', price: 89.99, category: 'soie', brand: 'Gucci', image: '🧣' },
  { id: 4, name: 'Manteau Laine', price: 149.99, category: 'laine', brand: 'Zara', image: '🧥' },
  { id: 5, name: 'Veste Sport Polyester', price: 79.99, category: 'polyester', brand: 'Nike', image: '🧥' },
  { id: 6, name: 'Jean Slim Premium', price: 69.99, category: 'jean', brand: 'Zara', image: '👖' },
]

export default function TextileHub() {
  const [activeCategory, setActiveCategory] = useState('coton')
  const [searchTerm, setSearchTerm] = useState('')

  const currentCategory = textileCategories.find(c => c.id === activeCategory)
  const filteredProducts = featuredProducts.filter(p => 
    p.category === activeCategory || !activeCategory
  )

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e3a5f 0%, #4B6CB7 100%)', 
        borderRadius: '20px', 
        padding: '50px 40px', 
        marginBottom: '40px', 
        color: '#fff' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px' }}>🧵 TextileHub E-DÉSIGNE</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px' }}>
              Découvrez notre gamme complète de textiles: coton, lin, soie, laine et plus. 
              Connecté aux plus grandes marques et fournisseurs.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <Link to="/marques" style={{ padding: '12px 24px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                Voir les marques →
              </Link>
              <Link to="/partenaire" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>
                Devenir partenaire
              </Link>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '4rem', margin: 0 }}>🧵</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{textileCategories.reduce((a,c) => a + c.products, 0)}+</p>
            <p style={{ opacity: 0.8 }}>Produits textiles</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{textileCategories.length}</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Catégories</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>12</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Fournisseurs</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{textileCategories.reduce((a,c) => a + c.products, 0)}</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Produits</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>24</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Articles blog</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Rechercher une catégorie, un textile..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '16px 24px', 
            borderRadius: '12px', 
            border: '1px solid #2a2a35', 
            background: '#16161f', 
            color: '#fff',
            fontSize: '1rem'
          }}
        />
      </div>

      {/* Categories Grid */}
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>📂 Catégories Textiles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {textileCategories
          .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(category => (
          <div 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            style={{ 
              background: activeCategory === category.id ? '#4B6CB7' : '#16161f',
              padding: '24px', 
              borderRadius: '16px', 
              border: activeCategory === category.id ? '2px solid #4B6CB7' : '1px solid #2a2a35',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
              <span style={{ background: activeCategory === category.id ? 'rgba(255,255,255,0.2)' : '#4B6CB7', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', color: '#fff' }}>
                {category.products} prod.
              </span>
            </div>
            <h3 style={{ color: '#fff', margin: '0 0 8px' }}>{category.name}</h3>
            <p style={{ color: activeCategory === category.id ? 'rgba(255,255,255,0.8)' : '#9ca3af', margin: 0, fontSize: '0.9rem' }}>{category.description}</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {category.suppliers.slice(0, 3).map(s => (
                <span key={s} style={{ background: 'rgba(255,255,255,0.1)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#fff' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>⭐ Produits Vedettes - {currentCategory?.name}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <div key={product.id} style={{ background: '#16161f', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2a35' }}>
            <div style={{ height: '150px', background: 'linear-gradient(135deg, #1e3a5f 0%, #4B6CB7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
              {product.image}
            </div>
            <div style={{ padding: '16px' }}>
              <span style={{ background: '#4B6CB7', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#fff' }}>{product.brand}</span>
              <h3 style={{ color: '#fff', margin: '10px 0' }}>{product.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price}€</span>
                <button style={{ background: '#4B6CB7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                  Voir →
                </button>
              </div>
            </div>
          </div>
        )) : (
          <p style={{ color: '#9ca3af', gridColumn: '1 / -1', textAlign: 'center' }}>Aucun produit disponible dans cette catégorie</p>
        )}
      </div>

      {/* Blog Articles for Category */}
      <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35', marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>📝 Articles Blog - {currentCategory?.name}</h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {currentCategory?.articles.map((article, index) => (
            <div key={index} style={{ background: '#0a0a0f', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#fff', margin: '0 0 8px' }}>{article.title}</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ background: '#4B6CB7', padding: '3px 10px', borderRadius: '15px', fontSize: '0.75rem', color: '#fff' }}>{article.category}</span>
                  <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>⏱️ {article.readTime}</span>
                </div>
              </div>
              <button style={{ background: '#4B6CB7', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                Lire →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Articles */}
      <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>📚 Tous les Articles Textile</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {textileCategories.flatMap(cat => cat.articles.map((art, i) => ({ ...art, categoryName: cat.name }))).map((article, index) => (
            <div key={index} style={{ background: '#0a0a0f', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#4B6CB7', fontSize: '0.85rem' }}>{article.categoryName}</span>
                <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{article.readTime}</span>
              </div>
              <h4 style={{ color: '#fff', margin: 0 }}>{article.title}</h4>
              <span style={{ color: '#6B8DD6', fontSize: '0.85rem' }}>{article.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
