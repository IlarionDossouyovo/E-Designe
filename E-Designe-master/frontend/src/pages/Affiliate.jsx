import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const programs = [
  { 
    id: 1, 
    name: 'Programme Revendeur', 
    commission: '15-20%', 
    description: 'Revendez nos produits avec marge',
    requirements: 'Commande min 500€', 
    color: '#4B6CB7',
    details: [
      'Prix grossiste exclusif (-30% sur PVP)',
      'Priorité sur les nouveautés',
      'Support dédié revendeur',
      'Retours sous 30 jours',
      'Formation produits gratuite',
      'Marketing kit fourni'
    ],
    example: 'Commande 500€ → Revente 1000€ = 500€ profit'
  },
  { 
    id: 2, 
    name: 'Programme Affiliation', 
    commission: '10%', 
    description: 'Gagnez des commissions sur chaque vente',
    requirements: 'Site web ou reseau social', 
    color: '#22c55e',
    details: [
      'Lien de parrainage unique',
      'Cookies 90 jours',
      'Commission sur tout le panier',
      'Tableau de bord analytics',
      'Bannières publicitaires',
      'Paiements mensuels'
    ],
    example: '5 ventes/mois × 200€ = 100€ commission'
  },
  { 
    id: 3, 
    name: 'Programme Influencer', 
    commission: '12%', 
    description: 'Collaboration avec influenceurs',
    requirements: '10k+ followers', 
    color: '#f59e0b',
    details: [
      'Code promo personnalisé',
      'Accès collection exclusive',
      ' shooting gratuit',
      'Events VIP réservés',
      'Collaboration contenus',
      'Paiement rapide'
    ],
    example: '50 ventes × 200€ = 1200€'
  },
  { 
    id: 4, 
    name: 'Dropshipping', 
    commission: '25%', 
    description: 'Vendez sans stock',
    requirements: 'Boutique en ligne', 
    color: '#8b5cf6',
    details: [
      'Photos produits haute qualité',
      'Expédition directe usine',
      'Pas de stock minimum',
      'Marque blanche possible',
      'Tracking automatique',
      'Marge maximale'
    ],
    example: 'Vente 200€ - 150€ = 50€ profit'
  },
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
  const navigate = useNavigate()
  const [selectedProgram, setSelectedProgram] = useState(null)

  const quickLinks = [
    { name: 'Accueil', icon: '🏠', path: '/', color: '#4B6CB7' },
    { name: 'Produits', icon: '🛍️', path: '/products', color: '#25D366' },
    { name: 'Marques', icon: '🏷️', path: '/marques', color: '#E4405F' },
    { name: 'Textile', icon: '🧵', path: '/textile', color: '#F59E0B' },
    { name: 'Marketing', icon: '📊', path: '/marketing', color: '#7C3AED' },
  ];

  return (
    <div style={{ padding: '100px 20px 40px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      
      {/* Quick Links */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '20px' }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {quickLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              style={{
                padding: '8px 16px',
                background: '#16161f',
                border: `1px solid ${link.color}40`,
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

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
            <Link to="/revendeurs" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Revendeurs</Link>
            <Link to="/marques" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Marques</Link>
            <Link to="/textile" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>TextileHub</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '120px', opacity: 0.15 }}>💎</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{stats.affiliates}+</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Affilies actifs</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>{stats.totalEarned}€</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Gains total distribues</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{stats.activePromotions}</p>
          <p style={{ color: '#9ca3af', margin: 0 }}>Promotions actives</p>
        </div>
      </div>

      {/* Programs */}
      <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Nos programmes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {programs.map(program => (
          <div 
            key={program.id} 
            style={{ 
              background: '#16161f', 
              borderRadius: '16px', 
              padding: '24px', 
              border: selectedProgram === program.id ? `2px solid ${program.color}` : '1px solid #2a2a35',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onClick={() => setSelectedProgram(selectedProgram === program.id ? null : program.id)}
          >
            <h3 style={{ margin: '0 0 8px', color: '#fff' }}>{program.name}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 12px', color: program.color }}>{program.commission}</p>
            <p style={{ color: '#9ca3af', margin: '0 0 12px' }}>{program.description}</p>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 12px' }}>
              <strong style={{ color: '#9ca3af' }}>Exigence:</strong> {program.requirements}
            </p>
            
            {selectedProgram === program.id && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #2a2a35' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: program.color }}>✓ Inclus:</p>
                <ul style={{ paddingLeft: '16px', margin: 0 }}>
                  {program.details.map((detail, i) => (
                    <li key={i} style={{ marginBottom: '8px', color: '#9ca3af' }}>{detail}</li>
                  ))}
                </ul>
                <div style={{ marginTop: '16px', padding: '12px', background: '#0a0a0f', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px' }}>Exemple de gain:</p>
                  <p style={{ fontWeight: 'bold', color: program.color, margin: 0 }}>{program.example}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Benefits */}
      <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Pourquoi rejoindre?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {benefits.map((benefit, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#16161f', padding: '16px', borderRadius: '8px', border: '1px solid #2a2a35' }}>
            <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
            <span style={{ color: '#9ca3af' }}>{benefit}</span>
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
