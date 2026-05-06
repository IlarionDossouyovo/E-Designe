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
          Votre plateforme e-commerce dropshipping et affiliation avec Intelligence Artificielle.
        </p>
      </div>

      {/* Mission */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Notre Mission</h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.8, fontSize: '1.1rem' }}>
            E-Designe revolutionne l'experience d'achat de vetements en combinant mode et technologie. 
            Situee a Cotonou, Benin, nous proposons des vetements de qualite en Premium, Moyenne et Basic 
            avec des recommandations personnalisees grace a notre IA.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#4B6CB7' }}>52+</p>
            <p style={{ fontWeight: 'bold', color: '#fff' }}>Produits</p>
          </div>
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#4B6CB7' }}>13</p>
            <p style={{ fontWeight: 'bold', color: '#fff' }}>Categories</p>
          </div>
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#4B6CB7' }}>3</p>
            <p style={{ fontWeight: 'bold', color: '#fff' }}>Qualites</p>
          </div>
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤖</p>
            <p style={{ fontWeight: 'bold', color: '#fff' }}>AI</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 style={{ marginBottom: '2rem', color: '#fff' }}>Nos valeurs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div style={{ background: '#16161f', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</p>
            <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Qualite</h3>
            <p style={{ color: '#9ca3af' }}>Des vetements choisit avec soin pour votre satisfaction.</p>
          </div>
          <div style={{ background: '#16161f', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</p>
            <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Service</h3>
            <p style={{ color: '#9ca3af' }}>Un support client reactif et personnalise.</p>
          </div>
          <div style={{ background: '#16161f', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</p>
            <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Local</h3>
            <p style={{ color: '#9ca3af' }}>Produits africains authentique.</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '2rem', color: '#fff' }}>Notre Equipe</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          <div style={{ background: '#16161f', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35', textAlign: 'center' }}>
            <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍💼</p>
            <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>DOSSOU-YOVO ATTIOGBE Y.A. Ilarion</h3>
            <p style={{ color: '#4B6CB7', fontWeight: 'bold' }}>Fondateur & CEO</p>
            <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>Expert en commerce electronique et stratégies numériques.</p>
          </div>
          <div style={{ background: '#16161f', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid #2a2a35', textAlign: 'center' }}>
            <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📞</p>
            <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>Service Client</h3>
            <p style={{ color: '#4B6CB7', fontWeight: 'bold' }}>Assistance client</p>
            <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>Nous sommes disponibles 24/7 pour vous aider.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
