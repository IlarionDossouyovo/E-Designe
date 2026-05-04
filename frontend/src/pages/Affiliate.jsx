import { useState } from 'react'
import { Link } from 'react-router-dom'

const programs = [
  { id: 1, name: 'Programme Revendeur', commission: '15-20%', description: 'Revendez nos produits avec marge', requirements: 'Commande min 500€', color: '#4B6CB7' },
  { id: 2, name: 'Programme Affiliation', commission: '10%', description: 'Gagnez des commissions sur chaque vente', requirements: 'Site web ou reseau social', color: '#22c55e' },
  { id: 3, name: 'Programme Influencer', commission: '12%', description: 'Collaboration avec influenceurs', requirements: '10k+ followers', color: '#f59e0b' },
  { id: 4, name: 'dropshipping', commission: '25%', description: 'Vendez sans stock', requirements: 'Boutique en ligne', color: '#8b5cf6' },
]

const benefits = [
  'Commission jusqu\'à 25%',
  'Support marketing gratuit',
  'Acces a tous les produits',
  'Tableau de bord en temps reel',
  'Paiements mensuels',
  'Support prioritaire',
]

const stats = {
  affiliates: 1250,
  totalEarned: 89500,
  activePromotions: 45,
}

export default function Affiliate() {
  const [selectedProgram, setSelectedProgram] = useState(null)

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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💎 Programme Affiliation</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '500px', marginBottom: '1.5rem' }}>
            Gagnez de l'argent en recommendant E-Designe a votre reseau.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/register" style={{ padding: '12px 24px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>S'inscrire</Link>
            <Link to="/revendeurs" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Voir les revendeurs</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>💎</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{stats.affiliates}+</p>
          <p style={{ color: '#666', margin: 0 }}>Affilies actifs</p>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>{stats.totalEarned}€</p>
          <p style={{ color: '#666', margin: 0 }}>Gains total distribues</p>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{stats.activePromotions}</p>
          <p style={{ color: '#666', margin: 0 }}>Promotions actives</p>
        </div>
      </div>

      {/* Programs */}
      <h2 style={{ marginBottom: '1.5rem' }}>Nos programmes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {programs.map(program => (
          <div 
            key={program.id} 
            style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: selectedProgram === program.id ? `2px solid ${program.color}` : '2px solid transparent',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedProgram(program.id)}
          >
            <h3 style={{ margin: '0 0 8px', color: program.color }}>{program.name}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 12px' }}>{program.commission}</p>
            <p style={{ color: '#666', margin: '0 0 12px' }}>{program.description}</p>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              <strong>Requirement:</strong> {program.requirements}
            </p>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <h2 style={{ marginBottom: '1.5rem' }}>Pourquoi rejoindre?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {benefits.map((benefit, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '16px', borderRadius: '8px' }}>
            <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Pret a commencer?</h2>
        <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>Rejoignez notre programme et commencez a ganar de l'argent</p>
        <Link to="/register" style={{ padding: '14px 28px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>S'inscrire gratuitement</Link>
      </div>
    </div>
  )
}
