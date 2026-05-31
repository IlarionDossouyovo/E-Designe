import { useState } from 'react'
import { Link } from 'react-router-dom'

const partners = [
  { id: 1, name: 'Fashion Africa Co', country: 'Sénégal', products: 150, commission: '15%', verified: true, image: '🇸🇳', phone: '+221 77 123 45 67', email: 'contact@fashionafrica.com', whatsapp: true },
  { id: 2, name: 'EuroStyle Wholesale', country: 'France', products: 89, commission: '12%', verified: true, image: '🇫🇷', phone: '+33 1 23 45 67 89', email: 'contact@eurostyle.fr', whatsapp: false },
  { id: 3, name: 'AfroShop Mali', country: 'Mali', products: 200, commission: '18%', verified: true, image: '🇲🇱', phone: '+223 76 12 34 56', email: 'info@afroshop.ml', whatsapp: true },
  { id: 4, name: 'Nigeria Fashion', country: 'Nigeria', products: 120, commission: '14%', verified: false, image: '🇳🇬', phone: '+234 80 1234 5678', email: 'hello@nigeriafashion.ng', whatsapp: true },
  { id: 5, name: 'Cote d\'Ivoire Trend', country: 'Côte d\'Ivoire', products: 95, commission: '13%', verified: true, image: '🇨🇮', phone: '+225 07 12 34 56', email: 'contact@citrend.ci', whatsapp: true },
  { id: 6, name: 'Ghana Styles', country: 'Ghana', products: 75, commission: '11%', verified: false, image: '🇬🇭', phone: '+233 20 123 4567', email: 'info@ghanastyles.gh', whatsapp: true },
  { id: 7, name: 'Benin Mode', country: 'Bénin', products: 180, commission: '16%', verified: true, image: '🇧🇯', phone: '+229 01 977 003 47', email: 'contact@beninmode.bj', whatsapp: true },
  { id: 8, name: 'Togo Fashion', country: 'Togo', products: 65, commission: '12%', verified: true, image: '🇹🇬', phone: '+228 90 12 34 56', email: 'info@togofashion.tg', whatsapp: true },
  { id: 9, name: 'Cameroon Style', country: 'Cameroun', products: 110, commission: '14%', verified: false, image: '🇨🇲', phone: '+237 6 12 34 56 78', email: 'contact@cmrstyle.cm', whatsapp: true },
  { id: 10, name: 'Paris Luxe', country: 'France', products: 250, commission: '20%', verified: true, image: '🇫🇷', phone: '+33 1 45 67 89 01', email: 'contact@parisluxe.fr', whatsapp: false },
]

export default function Resellers() {
  const [filterCountry, setFilterCountry] = useState('Tous')

  const countries = ['Tous', ...new Set(partners.map(p => p.country))]
  
  const filtered = filterCountry === 'Tous' ? partners : partners.filter(p => p.country === filterCountry)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
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
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7' }}>500+</p>
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
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <a href={`mailto:${partner.email}`} style={{ flex: 1, padding: '12px', background: '#4B6CB7', color: '#fff', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>✉ Email</a>
              {partner.whatsapp && <a href={`https://wa.me/${partner.phone.replace(/\D/g, '')}`} target="_blank" style={{ flex: 1, padding: '12px', background: '#25D366', color: '#fff', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>💬 WhatsApp</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
