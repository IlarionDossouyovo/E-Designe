import { useState } from 'react'
import { Link } from 'react-router-dom'

const partners = [
  { id: 1, name: 'Fashion Africa Co', country: 'Sénégal', products: 150, commission: '15%', verified: true, image: '🇸🇳' },
  { id: 2, name: 'EuroStyle Wholesale', country: 'France', products: 89, commission: '12%', verified: true, image: '🇫🇷' },
  { id: 3, name: 'AfroShop Mali', country: 'Mali', products: 200, commission: '18%', verified: true, image: '🇲🇱' },
  { id: 4, name: 'Nigeria Fashion', country: 'Nigeria', products: 120, commission: '14%', verified: false, image: '🇳🇬' },
  { id: 5, name: 'Cote d\'Ivoire Trend', country: 'Côte d\'Ivoire', products: 95, commission: '13%', verified: true, image: '🇨🇮' },
  { id: 6, name: 'Ghana Styles', country: 'Ghana', products: 75, commission: '11%', verified: false, image: '🇬🇭' },
]

export default function Resellers() {
  const [filterCountry, setFilterCountry] = useState('Tous')

  const countries = ['Tous', ...new Set(partners.map(p => p.country))]
  
  const filtered = filterCountry === 'Tous' ? partners : partners.filter(p => p.country === filterCountry)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', 
        borderRadius: '20px', 
        padding: '60px 40px',
        marginBottom: '40px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💎 Programme Revendeurs</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '500px' }}>
            Rejoignez notre reseau de revendeurs et gagnez des commissions sur chaque vente.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Link to="/register" style={{ padding: '12px 24px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Devenir revendeur</Link>
            <Link to="/partenaire" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Programme affiliation</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>💎</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7' }}>250+</p>
          <p style={{ color: '#666' }}>Revendeurs actifs</p>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7' }}>15%</p>
          <p style={{ color: '#666' }}>Commission moyenne</p>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7' }}>1200+</p>
          <p style={{ color: '#666' }}>Produits</p>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7' }}>48h</p>
          <p style={{ color: '#666' }}>Livraison moyenne</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '180px' }}>
          <option value="Tous">Tous les pays</option>
          {countries.filter(c => c !== 'Tous').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ color: '#666', marginLeft: 'auto' }}>{filtered.length} partenaires</span>
      </div>

      {/* Partners Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map(partner => (
          <div key={partner.id} style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '3rem' }}>{partner.image}</span>
              <div>
                <h3 style={{ margin: '0 0 4px' }}>{partner.name}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{partner.country}</p>
              </div>
              {partner.verified && <span style={{ marginLeft: 'auto', background: '#22c55e', color: '#fff', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>✓ Verifié</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #eee' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Produits</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>{partner.products}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Commission</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{partner.commission}</p>
              </div>
            </div>
            <button style={{ width: '100%', padding: '12px', marginTop: '16px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Contacter
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
