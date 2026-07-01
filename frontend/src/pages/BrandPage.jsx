import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import brandsConfig from '../data/brandsConfig'

export default function BrandPage() {
  const { brandId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('homme')
  const [activeSubcategory, setActiveSubcategory] = useState(null)
  
  // Trouver la marque
  const brand = brandsConfig.brands.find(b => b.id === brandId)
  
  if (!brand) {
    return (
      <div style={{ padding: '2rem', background: '#0a0a0f', minHeight: '100vh', color: '#fff', textAlign: 'center' }}>
        <h1>Marque non trouvée</h1>
        <Link to="/marques" style={{ color: '#4B6CB7' }}>Retour à l'annuaire</Link>
      </div>
    )
  }
  
  // Ajouter la catégorie accessoires si elle existe
  const categories = {
    ...brand.categories,
    ...(brand.accessories && { accessories: brand.accessories })
  }
  const currentCategory = categories[activeTab]
  
  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Header Marque */}
      <div style={{ 
        background: `linear-gradient(135deg, ${brand.color} 0%, #1e3a5f 100%)`, 
        borderRadius: '20px', 
        padding: '40px', 
        marginBottom: '30px', 
        color: '#fff' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '4rem' }}>{brand.logo}</div>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{brand.name}</h1>
            <p style={{ opacity: 0.9, margin: '5px 0' }}>{brand.description}</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                📍 {brand.country}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                💰 Commission: {brand.commission}
              </span>
              {brand.dropship && (
                <span style={{ background: '#22c55e', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                  ✅ Dropshipping
                </span>
              )}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <a href={brand.website} target="_blank" rel="noopener" style={{ 
            padding: '12px 24px', 
            background: '#fff', 
            color: brand.color, 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontWeight: 'bold' 
          }}>
            Site Officiel →
          </a>
          <Link to="/marques" style={{ 
            padding: '12px 24px', 
            background: 'rgba(255,255,255,0.2)', 
            color: '#fff', 
            borderRadius: '8px', 
            textDecoration: 'none' 
          }}>
            ← Retour aux marques
          </Link>
        </div>
      </div>

      {/* Onglets Catégories */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #2a2a35', paddingBottom: '10px', overflowX: 'auto' }}>
        {Object.entries(categories).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setActiveSubcategory(null); }}
            style={{ 
              padding: '14px 28px', 
              background: activeTab === key ? '#4B6CB7' : 'transparent', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '10px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.title}</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
              {cat.subcategories.reduce((acc, sub) => acc + sub.products, 0)} produits
            </span>
          </button>
        ))}
      </div>

      {/* Sous-catégories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px', marginBottom: '30px' }}>
        {currentCategory?.subcategories.map((sub) => (
          <div 
            key={sub.id}
            onClick={() => sub.route ? navigate(sub.route) : setActiveSubcategory(sub.id)}
            style={{ 
              background: '#16161f', 
              padding: '20px', 
              borderRadius: '12px', 
              border: activeSubcategory === sub.id ? '2px solid #4B6CB7' : '1px solid #2a2a35',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#fff', margin: 0 }}>{sub.name}</h3>
              {sub.route && <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>→</span>}
            </div>
            <p style={{ color: '#6B8DD6', margin: '8px 0 0' }}>{sub.products} produits</p>
          </div>
        ))}
      </div>

      {/* Articles Blog */}
      <div style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>📝 Articles Blog - {currentCategory?.title}</h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {brand.blogTemplates[activeTab]?.map((article, index) => (
            <div key={index} style={{ 
              background: '#0a0a0f', 
              padding: '20px', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ color: '#fff', margin: '0 0 8px' }}>{article.title}</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ background: '#4B6CB7', padding: '3px 10px', borderRadius: '15px', fontSize: '0.75rem', color: '#fff' }}>
                    {article.category}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>⏱️ {article.readTime}</span>
                </div>
              </div>
              <button style={{ 
                padding: '10px 20px', 
                background: '#4B6CB7', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}>
                →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Généraux */}
      <div style={{ marginTop: '30px', background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>📚 Articles Généraux</h2>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          {brandsConfig.generalBlogTemplates.map((article, index) => (
            <div key={index} style={{ 
              background: '#0a0a0f', 
              padding: '16px', 
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#fff' }}>{article.title}</span>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#6B8DD6', fontSize: '0.85rem' }}>{article.category}</span>
                <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>• {article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Globaux */}
      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {Object.entries(categories).map(([key, cat]) => (
          <div key={key} style={{ background: '#16161f', padding: '20px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', margin: 0 }}>{cat.icon}</p>
            <p style={{ color: '#fff', fontWeight: 'bold', margin: '10px 0 5px' }}>{cat.title}</p>
            <p style={{ color: '#6B8DD6', margin: 0 }}>{cat.subcategories.length} catégories</p>
            <p style={{ color: '#22c55e', margin: '5px 0 0' }}>{cat.subcategories.reduce((acc, sub) => acc + sub.products, 0)} produits</p>
          </div>
        ))}
      </div>
    </div>
  )
}
