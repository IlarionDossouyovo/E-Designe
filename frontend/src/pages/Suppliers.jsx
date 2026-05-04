import { useState } from 'react'

const suppliers = [
  { id: 1, name: 'Tissus Premium Africa', country: 'Sénégal', specialties: ['Cotton Wax', 'Linen'], leadTime: '7 days', minOrder: 50, rating: 4.8, image: '🧵' },
  { id: 2, name: ' Faso Textile Co', country: 'Burkina Faso', specialties: ['Cotton', 'Silk'], leadTime: '14 days', minOrder: 100, rating: 4.5, image: '🇧🇫' },
  { id: 3, name: 'Niger Fabrics', country: 'Niger', specialties: ['Cotton', 'Wool'], leadTime: '10 days', minOrder: 75, rating: 4.2, image: '🇳🇪' },
  { id: 4, name: 'Ivory Coast Weavers', country: 'Côte d\'Ivoire', specialties: ['Silk', 'Cotton Wax'], leadTime: '5 days', minOrder: 30, rating: 4.7, image: '🇨🇮' },
  { id: 5, name: 'Mali Cotton Mill', country: 'Mali', specialties: ['Cotton', 'Linen'], leadTime: '21 days', minOrder: 200, rating: 4.3, image: '🇲🇱' },
  { id: 6, name: 'Ghana Textiles', country: 'Ghana', specialties: ['Kente', 'Cotton'], leadTime: '12 days', minOrder: 50, rating: 4.6, image: '🇬🇭' },
  { id: 7, name: 'Nigeria Fabrics', country: 'Nigeria', specialties: ['Ankara', 'Cotton'], leadTime: '8 days', minOrder: 100, rating: 4.4, image: '🇳🇬' },
  { id: 8, name: 'China Silk Road', country: 'China', specialties: ['Silk', 'Satin'], leadTime: '30 days', minOrder: 500, rating: 4.9, image: '🇨🇳' },
]

export default function Suppliers() {
  const [filterCountry, setFilterCountry] = useState('Tous')
  const [filterSpecialty, setFilterSpecialty] = useState('Tous')

  const countries = ['Tous', ...new Set(suppliers.map(s => s.country))]
  const specialties = ['Tous', ...new Set(suppliers.flatMap(s => s.specialties))]
  
  const filtered = suppliers.filter(s => {
    if (filterCountry !== 'Tous' && s.country !== filterCountry) return false
    if (filterSpecialty !== 'Tous' && !s.specialties.includes(filterSpecialty)) return false
    return true
  })

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)', 
        borderRadius: '20px', 
        padding: '60px 40px',
        marginBottom: '40px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏭 Fournisseurs Textile</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '500px' }}>
            Decouvrez nos fournisseurs de tissus qualitatifs en Afrique et dans le monde.
          </p>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>🏭</div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '180px' }}>
          <option value="Tous">Tous les pays</option>
          {countries.filter(c => c !== 'Tous').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '180px' }}>
          <option value="Tous">Tous types</option>
          {specialties.filter(s => s !== 'Tous').map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ color: '#666', marginLeft: 'auto' }}>{filtered.length} fournisseurs</span>
      </div>

      {/* Suppliers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {filtered.map(supplier => (
          <div key={supplier.id} style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '3rem' }}>{supplier.image}</span>
              <div>
                <h3 style={{ margin: '0 0 4px' }}>{supplier.name}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{supplier.country}</p>
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Specialites:</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {supplier.specialties.map(s => (
                  <span key={s} style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Delai</p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{supplier.leadTime}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Commande min</p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{supplier.minOrder} pcs</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
              <span style={{ color: '#fbbf24' }}>{'★'.repeat(Math.floor(supplier.rating))}</span>
              <span style={{ color: '#666', fontSize: '14px' }}>{supplier.rating}/5</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
