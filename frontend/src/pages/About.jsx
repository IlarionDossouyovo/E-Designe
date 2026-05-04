import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ 
        background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)', 
        borderRadius: '20px', 
        padding: '60px 40px',
        marginBottom: '40px',
        color: '#fff'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>A propos d'E-Designe</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Votre boutique de mode en ligne avec Intelligence Artificielle.
        </p>
      </div>

      {/* Mission */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Notre Mission</h2>
          <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.1rem' }}>
            E-Designe revolutionne l'experience d'achat de vetements en combinant mode et technologie. 
            Situee a Cotonou, Benin, nous proposerons des vetements de qualite en Premium, Moyenne et Basic 
            avec des recommandations personnalisees grace a notre IA.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>48+</p>
            <p style={{ fontWeight: 'bold' }}>Produits</p>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>4</p>
            <p style={{ fontWeight: 'bold' }}>Categories</p>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>3</p>
            <p style={{ fontWeight: 'bold' }}>Qualites</p>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤖</p>
            <p style={{ fontWeight: 'bold' }}>AI</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 style={{ marginBottom: '2rem' }}>Nos valeurs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</p>
            <h3 style={{ marginBottom: '0.5rem' }}>Qualite</h3>
            <p style={{ color: '#666' }}>Des vetements choisit avec soin pour votre satisfaction.</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</p>
            <h3 style={{ marginBottom: '0.5rem' }}>Service</h3>
            <p style={{ color: '#666' }}>Un support client reactif et personnalise.</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</p>
            <h3 style={{ marginBottom: '0.5rem' }}>Local</h3>
            <p style={{ color: '#666' }}>Produits africains authentique.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
