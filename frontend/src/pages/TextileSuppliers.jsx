import { useState } from 'react'
import { Link } from 'react-router-dom'

const textileSuppliers = [
  { id: 1, name: 'EuroTissus France', country: 'France', specialties: ['Coton', 'Lin', 'Soie'], leadTime: '7 jours', minOrder: 50, rating: 4.8, certification: 'Oeko-Tex', dropship: true },
  { id: 2, name: 'China Silk Co', country: 'Échine', specialties: ['Soie', 'Satin'], leadTime: '21 jours', minOrder: 200, certification: 'ISO 9001', dropship: true },
  { id: 3, name: 'Usines de coton Inde', country: 'Inde', specialties: ['Coton bio', 'Museline'], leadTime: '14 jours', minOrder: 100, certification: 'GOTS', dropship: true },
  { id: 4, name: 'Textiles de Turquie', country: 'Turquie', specialties: ['Coton', 'Polyester'], leadTime: '10 jours', minOrder: 75, certification: 'ISO 9001', dropship: true },
  { id: 5, name: 'Tissus du Pakistan', country: 'Pakistan', specialties: ['Coton', 'Lin'], leadTime: '18 jours', minOrder: 150, certification: 'Oeko-Tex', dropship: true },
  { id: 6, name: 'Textiles du Bangladesh', country: 'Bangladesh', specialties: ['Coton', 'Jeans'], leadTime: '15 jours', minOrder: 200, certification: 'SA8000', dropship: true },
  { id: 7, name: 'Portugal Tecidos', country: 'Portugal', specialties: ['Coton', 'Laine'], leadTime: '5 jours', minOrder: 30, certification: 'Oeko-Tex', dropship: true },
  { id: 8, name: 'Route de la Soie italienne', country: 'Italie', specialties: ['Soie', 'Cachemire'], leadTime: '12 jours', minOrder: 25, certification: 'Fabriqué en Italie', dropship: true },
]

const categories = ['Tous', 'Coton', 'Soie', 'Lin', 'Polyester', 'Laine', 'Cachemire']
const countries = ['Tous', 'France', 'Échine', 'Inde', 'Turquie', 'Pakistan', 'Bangladesh', 'Portugal', 'Italie']

export default function TextileSuppliers() {
  const [filterCountry, setFilterCountry] = useState('Tous')
  const [filterCategory, setFilterCategory] = useState('Tous')
  
  const filtered = textileSuppliers.filter(s => {
    if (filterCountry !== 'Tous' && s.country !== filterCountry) return false
    if (filterCategory !== 'Tous' && !s.specialties.some(sp => sp.toLowerCase().includes(filterCategory.toLowerCase()))) return false
    return true
  })

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #4B6CB7 100%)', borderRadius: '20px', padding: '60px 40px', marginBottom: '40px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Fournisseurs Textile Internationaux</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px' }}>
          Trouvez les meilleurs fournisseurs de textile pour votre business. Dropshipping, livraison mondiale, certifications internationales.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/marques" style={{ padding: '12px 24px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Annuaire Marques</Link>
          <Link to="/affiliate" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Programme Affiliation</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{textileSuppliers.length}</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Fournisseurs</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>7</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Pays couvrir</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>85%</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Dropship</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>7-21j</p>
          <p style={{ color: '#9ca3af', margin: '8px 0 0' }}>Livraison moy.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #2a2a35', fontSize: '14px', minWidth: '150px', background: '#16161f', color: '#fff' }}>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #2a2a35', fontSize: '14px', minWidth: '150px', background: '#16161f', color: '#fff' }}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ color: '#9ca3af', marginLeft: 'auto' }}>{filtered.length} fournisseurs</span>
      </div>

      {/* Suppliers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map(supplier => (
          <div key={supplier.id} style={{ background: '#16161f', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2a35', transition: 'transform 0.3s' }} className="supplier-card">
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff' }}>{supplier.name}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#9ca3af' }}>{supplier.country}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ background: '#22c55e', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>{supplier.certification}</span>
                  {supplier.dropship && <span style={{ background: '#4B6CB7', color: '#fff', padding: '2px 8px', borderRadius: '20px', fontSize: '10px' }}>Dropship</span>}
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Specialites:</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {supplier.specialties.map(sp => (
                    <span key={sp} style={{ background: '#0a0a0f', color: '#4B6CB7', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>{sp}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#0a0a0f', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px' }}>Delai</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{supplier.leadTime}</p>
                </div>
                <div style={{ background: '#0a0a0f', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px' }}>Commande min</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{supplier.minOrder}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, padding: '10px', background: '#4B6CB7', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                  Commander
                </button>
                {supplier.dropship && <button style={{ padding: '10px 16px', background: '#22c55e', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                  Dropship
                </button>}
              </div>
            </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #4B6CB7 0%, #1e3a5f 100%)', borderRadius: '20px', padding: '60px 40px', marginTop: '60px', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Devenez fournisseur E-Designe</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
          Rejoignez notre reseau et atteignez des milliers de revendeurs et affiliates.
        </p>
        <Link to="/contact" style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Nous contacter</Link>
      </div>

      <style>{`
        .supplier-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(75,108,183,0.2); }
      `}</style>
    </div>
  )
}
