import { useState } from 'react'
import { Link } from 'react-router-dom'

const brandsData = [
  { id: 1, name: 'Gucci', category: 'Luxe', country: 'Italie', commission: '15%', products: 45, dropship: true, url: 'https://gucci.com', minOrder: 5 },
  { id: 2, name: 'Prada', category: 'Luxe', country: 'Italie', commission: '12%', products: 38, dropship: true, url: 'https://prada.com', minOrder: 3 },
  { id: 3, name: 'Louis Vuitton', category: 'Luxe', country: 'France', commission: '18%', products: 52, dropship: true, url: 'https://lv.com', minOrder: 2 },
  { id: 4, name: 'Chanel', category: 'Luxe', country: 'France', commission: '16%', products: 41, dropship: true, url: 'https://chanel.com', minOrder: 3 },
  { id: 5, name: 'Hermes', category: 'Luxe', country: 'France', commission: '20%', products: 35, dropship: false, url: 'https://hermes.com', minOrder: 1 },
  { id: 6, name: 'Nike', category: 'Sport', country: 'USA', commission: '10%', products: 120, dropship: true, url: 'https://nike.com', minOrder: 10 },
  { id: 7, name: 'Adidas', category: 'Sport', country: 'Allemagne', commission: '11%', products: 115, dropship: true, url: 'https://adidas.com', minOrder: 10 },
  { id: 8, name: 'Zara', category: 'Mode', country: 'Espagne', commission: '8%', products: 85, dropship: true, url: 'https://zara.com', minOrder: 15 },
  { id: 9, name: 'HM', category: 'Mode', country: 'Suede', commission: '7%', products: 92, dropship: true, url: 'https://hm.com', minOrder: 20 },
  { id: 10, name: 'Versace', category: 'Luxe', country: 'Italie', commission: '14%', products: 42, dropship: true, url: 'https://versace.com', minOrder: 5 },
  { id: 11, name: 'Dolce Gabbana', category: 'Luxe', country: 'Italie', commission: '13%', products: 38, dropship: true, url: 'https://dolcegabbana.com', minOrder: 4 },
  { id: 12, name: 'Balenciaga', category: 'Luxe', country: 'France', commission: '17%', products: 35, dropship: true, url: 'https://balenciaga.com', minOrder: 3 },
]

const categories = ['Toutes', 'Luxe', 'Sport', 'Mode', 'Cosmetiques', 'Accessoires']
const countries = ['Tous', 'France', 'Italie', 'USA', 'Allemagne', 'Espagne', 'Suede', 'Chine', 'Japon']

export default function BrandsDirectory() {
  const [filterCat, setFilterCat] = useState('Toutes')
  const [filterCountry, setFilterCountry] = useState('Tous')
  const [filterDropship, setFilterDropship] = useState(false)
  
  const filtered = brandsData.filter(b => {
    if (filterCat !== 'Toutes' && b.category !== filterCat) return false
    if (filterCountry !== 'Tous' && b.country !== filterCountry) return false
    if (filterDropship && !b.dropship) return false
    return true
  })

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #4B6CB7 100%)', borderRadius: '20px', padding: '60px 40px', marginBottom: '40px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Annuaire Marques et Fournisseurs</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px' }}>
            Connectez-vous avec les meilleures marques internationales pour votre activite de dropshipping et affiliation. Liens directs, commissions'avantageageuses, livraison mondiale.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/affiliate" style={{ padding: '12px 24px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Programme Affiliation</Link>
            <Link to="/fournisseurs-textile" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Fournisseurs Textile</Link>
            <Link to="/revendeurs" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Devenir Revendeur</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>Manufacture</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{brandsData.length}</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Marques partenaires</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>12%</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Commission moy.</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>738</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Produits disponibles</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>24h</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Livraison moy.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #2a2a35', fontSize: '14px', minWidth: '150px', background: '#16161f', color: '#fff' }}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #2a2a35', fontSize: '14px', minWidth: '150px', background: '#16161f', color: '#fff' }}>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', cursor: 'pointer' }}>
          <input type="checkbox" checked={filterDropship} onChange={(e) => setFilterDropship(e.target.checked)} />
          Dropshipping uniquement
        </label>
        <span style={{ color: '#9ca3af', marginLeft: 'auto' }}>{filtered.length} marques</span>
      </div>

      {/* Brands Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map(brand => (
          <div key={brand.id} style={{ background: '#16161f', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2a35', transition: 'transform 0.3s' }} className="brand-card">
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff' }}>{brand.name}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#9ca3af' }}>{brand.category} - {brand.country}</p>
                </div>
                {brand.dropship && <span style={{ background: '#22c55e', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>DROPSHIP</span>}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#0a0a0f', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px' }}>Commission</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>{brand.commission}</p>
                </div>
                <div style={{ background: '#0a0a0f', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px' }}>Produits</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{brand.products}</p>
                </div>
                <div style={{ background: '#0a0a0f', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px' }}>Commande min</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{brand.minOrder}</p>
                </div>
                <div style={{ background: '#0a0a0f', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px' }}>Livraison</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>24-72h</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={brand.url} target="_blank" rel="noopener" style={{ flex: 1, padding: '10px', background: '#4B6CB7', color: '#fff', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>
                  Site Officiel
                </a>
                <button style={{ padding: '10px 16px', background: '#22c55e', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                  Devis
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={{ background: 'linear-gradient(135deg, #4B6CB7 0%, #1e3a5f 100%)', borderRadius: '20px', padding: '60px 40px', marginTop: '60px', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Devenez partenaire E-Designe</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
          Rejoignez notre reseau de fournisseurs et gagnez des commissions sur chaque vente generee par vos liens d'affiliation.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/affiliate" style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Programme Aficie</Link>
          <Link to="/fournisseurs-textile" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Fournisseurs</Link>
        </div>
      </div>

      <style>{`
        .brand-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(75,108,183,0.2); }
      `}</style>
    </div>
  )
}
