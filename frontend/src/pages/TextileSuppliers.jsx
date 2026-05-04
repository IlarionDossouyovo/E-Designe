import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const manufacturers = [
  { id: 1, name: 'APEX MILLS', country: 'USA', specialty: 'Textiles techniques, mailles, tissus innovants', category: 'medical,sport,industrie', website: 'apexmills.com', rating: 4.8, moq: '50m', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80' },
  { id: 2, name: 'Toray Industries', country: 'Japon', specialty: 'Leader fibres synthétiques, haut de gamme, techwear', category: 'luxe,techwear,innovation', website: 'toray.jp', rating: 4.9, moq: '100m', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a488a786?w=800&q=80' },
  { id: 3, name: 'Arvind Limited', country: 'Inde', specialty: 'Denim + coton premium mondial', category: 'denim,coton', website: 'arvindlimited.com', rating: 4.7, moq: '200m', image: 'https://images.unsplash.com/photo-1594938387913-a6e549019a2f?w=800&q=80' },
  { id: 4, name: 'Weiqiao Textile', country: 'Chine', specialty: 'Production massive de coton mondiale', category: 'coton,volume', website: 'weiqiao.com', rating: 4.5, moq: '500m', image: 'https://images.unsplash.com/photo-1563864710869-370d5a7f7c5e?w=800&q=80' },
  { id: 5, name: 'Shenzhou International', country: 'Chine', specialty: 'Production textile export (Nike, etc.)', category: 'sport,export', website: 'shenzhouintl.com', rating: 4.6, moq: '300m', image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ab0?w=800&q=80' },
  { id: 6, name: 'Texhong Textile', country: 'Chine', specialty: 'Tissus coton mode + fils', category: 'mode,coton,fils', website: 'texhong.com', rating: 4.5, moq: '200m', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 7, name: 'Fabric Wholesale Direct', country: 'USA', specialty: '+850 tissus, parfait e-commerce', category: 'e-commerce,multi', website: 'fabricwholesaledirect.com', rating: 4.8, moq: '10m', image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800&q=80' },
  { id: 8, name: 'Sungil Tex', country: 'Hong Kong', specialty: 'Tissus + doublures + textile durable', category: 'durable, doublures', website: 'sungiltex.com', rating: 4.6, moq: '50m', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23abc?w=800&q=80' },
  { id: 9, name: 'Shaoxing Textile Hub', country: 'Chine', specialty: 'Plus grand marché textile mondial', category: 'marketplace,volume', website: 'shaoxing.com', rating: 4.4, moq: '20m', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80' },
  { id: 10, name: 'Sunflag Nigeria', country: 'Nigeria', specialty: 'Production textile complète Afrique de Ouest', category: 'afrique,local', website: 'sunflag.com.ng', rating: 4.7, moq: '100m', image: 'https://images.unsplash.com/photo-1613909207039-6b173b1dc79f?w=800&q=80' },
  // Premium Fabric Houses
  { id: 11, name: 'Tessuti Firenze', country: 'Italie', specialty: 'Tissus luxeitalien, matières nobles', category: 'luxe,couture,it', website: 'tessutifirenze.it', rating: 4.9, moq: '30m', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800' },
  { id: 12, name: 'Loro Piana', country: 'Italie', specialty: 'Cashmere & laine premium', category: 'luxe,cashmere', website: 'loropiana.com', rating: 5.0, moq: '50m', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a488a786?w=800' },
  { id: 13, name: 'Zegna', country: 'Italie', specialty: 'Tissus costume haut de gamme', category: 'luxe,mens', website: 'zegna.com', rating: 4.9, moq: '30m', image: 'https://images.unsplash.com/photo-1594938387913-a6e549019a2f?w=800' },
  { id: 14, name: 'Vitale Barberis', country: 'Italie', specialty: 'Laine mérinos premium depuis 1663', category: 'luxe,laine', website: 'vitalebarberis.com', rating: 4.9, moq: '25m', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
  { id: 15, name: 'Holland & Sherry', country: 'UK', specialty: 'Tissus costume anglais premium', category: 'luxe,sartorial', website: 'hollandandsherry.com', rating: 4.8, moq: '20m', image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800' },
  { id: 16, name: 'Harris Tweed', country: 'UK', specialty: 'Tweed authentique écosse', category: 'heritage,luxe', website: 'harristweed.org', rating: 4.7, moq: '10m', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23abc?w=800' },
  { id: 17, name: 'Scabal', country: 'UK', specialty: 'Tissus super 150s, luxe', category: 'luxe,sartorial', website: 'scabal.com', rating: 4.9, moq: '25m', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800' },
  { id: 18, name: 'Dormeuil', country: 'France', specialty: 'Tissus français luxe', category: 'luxe,french', website: 'dormeuil.com', rating: 4.8, moq: '30m', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a488a786?w=800' },
  { id: 19, name: 'Cerruti 1881', country: 'Italie', specialty: 'Tissus moda homme', category: 'luxe,mens,fashion', website: 'cerruti1881.com', rating: 4.8, moq: '30m', image: 'https://images.unsplash.com/photo-1594938387913-a6e549019a2f?w=800' },
  { id: 20, name: 'REDA', country: 'Italie', specialty: 'Laine écologique premium', category: 'luxe,eco,sustainable', website: 'redausa.com', rating: 4.8, moq: '40m', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
  // African Fabrics
  { id: 21, name: 'Anglomani', country: 'Nigeria', specialty: 'Tissus wax véritable', category: 'african,wax', website: 'anglomani.com', rating: 4.8, moq: '50m', image: 'https://images.unsplash.com/photo-1613909207039-6b173b1dc79f?w=800' },
  { id: 22, name: 'Nigeria Textiles', country: 'Nigeria', specialty: 'Production locale nigeriane', category: 'afrique,local', website: 'nigeriatex.com', rating: 4.5, moq: '100m', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800' },
  { id: 23, name: 'Vlisco', country: 'Belgique', specialty: 'Tissus wax luxe export', category: 'african,wax', website: 'vlisco.com', rating: 4.7, moq: '50m', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a488a786?w=800' },
  { id: 24, name: 'Uniwax', country: 'Côte dIvoire', specialty: 'Wax africain qualité', category: 'african,wax', website: 'uniwax.ci', rating: 4.6, moq: '60m', image: 'https://images.unsplash.com/photo-1594938387913-a6e549019a2f?w=800' },
  // Technical & Performance
  { id: 25, name: 'SympaTex', country: 'Allemagne', specialty: 'Tissus respirants techniques', category: 'tech,performance', website: 'sympatex.com', rating: 4.7, moq: '100m', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
  { id: 26, name: 'Cordura', country: 'USA', specialty: 'Tissus resistants usage intensif', category: 'tech,durable', website: 'cordura.com', rating: 4.8, moq: '50m', image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800' }
]

const fabricCategories = [
  { name: 'Mode & Habillement', icon: '👔', items: ['Coton', 'Denim', 'Soie', 'Satin', 'Cire africaine', 'Jersey', 'Polyester extensible'] },
  { name: 'Luxe & Haute Couture', icon: '👗', items: ['Soie naturelle', 'Organza', 'Velours', 'Broderie premium', 'Cashmere', 'Laine mérinos'] },
  { name: 'Maison Textile', icon: '🏠', items: ['Rideaux', 'Ameublement', 'Matelas', 'Siestes'] },
  { name: 'Technique', icon: '⚙️', items: ['Étanche', 'Anti-feu', 'Vêtements sport', 'Textile médical', 'Respirant'] },
  { name: 'Éco-responsable', icon: '🌱', items: ['Coton bio', 'Fibres recyclées', 'Lin naturel', 'Bambou', 'Tissus recyclés'] },
  { name: 'Tissus Africains', icon: '🌍', items: ['Wax', 'Ankara', 'Kente', 'Indigo', 'Boganire'] }
]

const countries = ['Tous', 'USA', 'Japon', 'Inde', 'Chine', 'Nigeria', 'Hong Kong']

export default function TextileSuppliers() {
  const [filter, setFilter] = useState('Tous')
  const [search, setSearch] = useState('')

  const filtered = manufacturers.filter(m => {
    const matchCountry = filter === 'Tous' || m.country === filter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                     m.specialty.toLowerCase().includes(search.toLowerCase())
    return matchCountry && matchSearch
  })

  return (
    <div style={{ padding: '3rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#4B6CB7', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Réseau International
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
            🏭 Fabricants & Fourisseurs<Textile />
          </h1>
          <p style={{ color: '#718096', maxWidth: '700px', margin: '0 auto', fontSize: '16px' }}>
            Connectez avec les meilleurs fabricants textiles mondiaux. 
            Qualité premium, volumes compétitifs, livraison internationale.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Rechercher un fabricant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '300px', fontSize: '16px' }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px' }}
          >
            {countries.map(c => <option key={c} value={c}>{c === 'Tous' ? 'Tous les pays' : c}</option>)}
          </select>
        </div>

        {/* Stats Banner */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '1rem', 
          marginBottom: '3rem' 
        }}>
          <div style={{ background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>10+</div>
            <div style={{ opacity: 0.9 }}>Fabricants</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>8</div>
            <div style={{ opacity: 0.9 }}>Pays</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>5</div>
            <div style={{ opacity: 0.9 }}>Catégories</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>24h</div>
            <div style={{ opacity: 0.9 }}>Délai max</div>
          </div>
        </div>

        {/* Fabricants Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filtered.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{ 
                background: 'white', 
                borderRadius: '16px', 
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ height: '150px', background: `url(${m.image}) center/cover` }} />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{m.name}</h3>
                  <span style={{ background: '#4B6CB7', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                    {m.country}
                  </span>
                </div>
                <p style={{ color: '#718096', fontSize: '14px', marginBottom: '1rem' }}>{m.specialty}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', color: '#4a5568', flexWrap: 'wrap' }}>
                  <span>⭐ {m.rating}/5</span>
                  <span>📦 MOQ: {m.moq}</span>
                  <span>🏷️ {m.category}</span>
                </div>
                <button style={{ 
                  width: '100%', 
                  marginTop: '1rem', 
                  padding: '12px', 
                  background: '#4B6CB7', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}>
                  Contacter ce fournisseur
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Catégories textiles */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>📦 Catégories Textiles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {fabricCategories.map(cat => (
              <div key={cat.name} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                <h4 style={{ marginBottom: '0.5rem' }}>{cat.name}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cat.items.map(item => (
                    <span key={item} style={{ background: '#f7fafc', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stratégie */}
        <div style={{ 
          background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', 
          color: 'white', 
          padding: '3rem', 
          borderRadius: '16px',
          marginBottom: '3rem'
        }}>
          <h2 style={{ marginBottom: '1.5rem' }}>🎯 Stratégie d'approvisionnement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#F7B731', marginBottom: '0.5rem' }}>🇨🇳 Chine</h4>
              <p style={{ opacity: 0.9, fontSize: '14px' }}>Volume + diversité. Idéal MOQ faibles, dropshipping, catalogue varié.</p>
            </div>
            <div>
              <h4 style={{ color: '#F7B731', marginBottom: '0.5rem' }}>🇮🇳 Inde</h4>
              <p style={{ opacity: 0.9, fontSize: '14px' }}>Qualité textile + coton premium. Prix compétitifs.</p>
            </div>
            <div>
              <h4 style={{ color: '#F7B731', marginBottom: '0.5rem' }}>🇯🇵 Japon</h4>
              <p style={{ opacity: 0.9, fontSize: '14px' }}>Innovation textile. Techwear, fibres synthétiques haut de gamme.</p>
            </div>
            <div>
              <h4 style={{ color: '#F7B731', marginBottom: '0.5rem' }}>🌍 Afrique</h4>
              <p style={{ opacity: 0.9, fontSize: '14px' }}>Niche + identité forte. Production locale = branding premium.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', background: '#f7fafc', padding: '3rem', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '1rem' }}>💎 Devenez revendeur textile</h3>
          <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
            Accédez à notre réseau de fournisseurs avec commission hasta 15%
          </p>
          <Link 
            to="/revendeurs" 
            style={{ 
              display: 'inline-block',
              padding: '14px 30px', 
              background: '#4B6CB7', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 600
            }}
          >
            S'inscrire comme revendeur
          </Link>
        </div>
      </motion.div>
    </div>
  )
}