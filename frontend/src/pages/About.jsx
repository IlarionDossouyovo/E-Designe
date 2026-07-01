import { useState } from 'react'
import { Link } from 'react-router-dom'

const team = [
  { name: 'Ilarion Dossouyovo', role: 'Fondateur & PDG', image: '👨‍💼', bio: 'Visionnaire tech avec 10+ ans d\'expérience en e-commerce et IA' },
  { name: 'Marie K.', role: 'Directrice Artistique', image: '👩‍🎨', bio: 'Expertise mode et design depuis 8 ans' },
  { name: 'Jean-Marc B.', role: 'CTO', image: '👨‍💻', bio: 'Spécialiste IA et architecture cloud' },
  { name: 'Sophie A.', role: 'Responsable Client', image: '👩‍💼', bio: '10 ans en relation client e-commerce' },
]

const values = [
  { icon: '♻️', title: 'Éco-responsable', desc: 'Produits durables et sourcing responsable' },
  { icon: '🤝', title: 'Transparence', desc: 'Prix justes et traçabilité totale' },
  { icon: '🚀', title: 'Innovation', desc: 'IA et technologies de pointe' },
  { icon: '❤️', title: 'Communauté', desc: 'Support aux créateurs locaux' },
]

const timeline = [
  { year: '2020', event: 'Fondation d\'E-Designe' },
  { year: '2021', event: 'Lancement de la boutique en ligne' },
  { year: '2022', event: 'Programme partenaire revendeurs' },
  { year: '2023', event: 'Intégration IA et agents' },
  { year: '2024', event: 'Expansion internationale' },
  { year: '2025', event: '1000+ partenaires actifs' },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('story')

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e3a5f 0%, #4B6CB7 50%, #182848 100%)', 
        padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '3.5rem', marginBottom: '20px', fontWeight: 'bold' }}>À propos d'E-DÉSIGNE</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto' }}>
            Votre destination mode connectant les plus grandes marques aux créateurs de demain
          </p>
        </div>
        <div style={{ position: 'absolute', top: '20%', left: '10%', fontSize: '8rem', opacity: 0.1 }}>👔</div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', fontSize: '6rem', opacity: 0.1 }}>🎯</div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '60px' }}>
          {[
            { value: '5+', label: 'Années d\'expérience' },
            { value: '50K+', label: 'Clients satisfaits' },
            { value: '150+', label: 'Marques partenaires' },
            { value: '1000+', label: 'Revendeurs' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#16161f', padding: '30px', borderRadius: '16px', textAlign: 'center', border: '1px solid #2a2a35' }}>
              <p style={{ color: '#4B6CB7', fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#9ca3af', margin: '10px 0 0' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
          {['story', 'values', 'team', 'timeline'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '12px 24px',
              background: activeTab === tab ? '#4B6CB7' : '#16161f',
              color: '#fff', border: '1px solid #2a2a35', borderRadius: '8px', cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal'
            }}>
              {tab === 'story' && '📖 Histoire'} {tab === 'values' && '💎 Valeurs'} {tab === 'team' && '👥 Équipe'} {tab === 'timeline' && '📅 Parcours'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'story' && (
          <div style={{ background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35' }}>
            <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '20px' }}>Notre Histoire</h2>
            <p style={{ color: '#9ca3af', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '20px' }}>
              E-DÉSIGNE est né d'une vision simple : <strong style={{ color: '#fff' }}>démocratiser la mode de qualité</strong> en connectant directement les grandes marques aux consommateurs et aux revendeurs.
            </p>
            <p style={{ color: '#9ca3af', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '20px' }}>
              Fondé en 2020, nous avons commencé comme une petite boutique en ligne spécialisée dans les vêtements de marque. Aujourd'hui, nous proposons plus de <strong style={{ color: '#4B6CB7' }}>52 produits</strong> de <strong style={{ color: '#4B6CB7' }}>150+ marques</strong> différentes.
            </p>
            <p style={{ color: '#9ca3af', lineHeight: '1.8', fontSize: '1.1rem' }}>
              Notre différenciateur ? <strong style={{ color: '#22c55e' }}>L'intelligence artificielle</strong> au service de vos achats : agents IA pour le conseil personnalisé, recommandations intelligentes, et diagnostic des tendances.
            </p>
          </div>
        )}

        {activeTab === 'values' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '3rem' }}>{v.icon}</span>
                <div>
                  <h3 style={{ color: '#fff', margin: '0 0 8px' }}>{v.title}</h3>
                  <p style={{ color: '#9ca3af', margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {team.map((member, i) => (
              <div key={i} style={{ background: '#16161f', padding: '30px', borderRadius: '16px', border: '1px solid #2a2a35', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{member.image}</div>
                <h3 style={{ color: '#fff', margin: '0 0 5px' }}>{member.name}</h3>
                <p style={{ color: '#4B6CB7', margin: '0 0 10px', fontWeight: 'bold' }}>{member.role}</p>
                <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div style={{ background: '#16161f', padding: '40px', borderRadius: '20px', border: '1px solid #2a2a35' }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '30px', position: 'relative', paddingBottom: i < timeline.length - 1 ? '30px' : 0 }}>
                {i < timeline.length - 1 && <div style={{ position: 'absolute', left: '15px', top: '40px', bottom: 0, width: '2px', background: '#2a2a35' }} />}
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4B6CB7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0, zIndex: 1 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#4B6CB7', fontWeight: 'bold' }}>{item.year}</span>
                  <h3 style={{ color: '#fff', margin: '5px 0 0' }}>{item.event}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: '60px', background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)', padding: '50px', borderRadius: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '2rem' }}>Rejoignez l'aventure E-DÉSIGNE</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '25px', fontSize: '1.1rem' }}>Devenez revendeur, partenaire ou simplement cliente fidèle</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <Link to="/partenaire" style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Devenir partenaire</Link>
            <Link to="/contact" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Nous contacter</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
