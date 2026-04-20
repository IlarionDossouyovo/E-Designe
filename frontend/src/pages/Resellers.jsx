import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Resellers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const benefits = [
    { icon: '💰', title: 'Commission até 15%', desc: 'Sur chaque vente réalisée' },
    { icon: '📦', title: 'Stock dropshipping', desc: 'On s occupations du logistique' },
    { icon: '🎯', title: 'Marketing inclus', desc: 'Visuels haute qualité fournis' },
    { icon: '📊', title: 'Tableau de bord', desc: 'Suivez vos revenus en temps réel' }
  ]

  const steps = [
    { num: '01', title: 'Inscription', desc: 'Créez votre compte revendeur' },
    { num: '02', title: 'Promotion', desc: 'Partagez vos produits sur vos canaux' },
    { num: '03', title: 'Vente', desc: 'Vos clients commandent chez nous' },
    { num: '04', title: 'Commission', desc: 'Receez votre marge' }
  ]

  return (
    <div className="container" style={{ padding: '3rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{ color: '#4B6CB7', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
          Programme Partenaire
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
          Devenez Revendeur E-Désigne 💎
        </h1>
        <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '18px' }}>
          Gagnez de l'argent en promouvant nos produits de qualité. 
          Service dropshipping clé en main.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button style={{ padding: '12px 30px', background: '#4B6CB7', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            Je minscris
          </button>
          <button style={{ padding: '12px 30px', background: 'transparent', color: '#4B6CB7', border: '2px solid #4B6CB7', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            Télécharger Catalogue
          </button>
        </div>
      </motion.div>

      {/* Benefits Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '4rem'
      }}>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ 
              padding: '2rem', 
              background: 'white', 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{benefit.icon}</div>
            <h3 style={{ fontSize: '18px', marginBottom: '0.5rem' }}>{benefit.title}</h3>
            <p style={{ color: '#718096', fontSize: '14px' }}>{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* How it Works */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Comment ça marche</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem'
        }}>
          {steps.map((step, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, #4B6CB7 0%, #19232D 100%)', 
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '16px', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ color: '#718096', fontSize: '14px' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          background: 'white', 
          borderRadius: '16px',
          padding: '3rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🎯 Je devenir revendeur</h2>
        
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3>Merci pour votre inscription!</h3>
            <p style={{ color: '#718096' }}>Notre équipe vous contactera sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nom complet *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px' }}
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px' }}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px' }}
                placeholder="+33 6 00 00 00 00"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Entreprise / Boutique</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px' }}
                placeholder="Ma Boutique"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Site web</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px' }}
                placeholder="https://"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px', minHeight: '100px' }}
                placeholder="Présentez votre activité..."
              />
            </div>

            <button 
              type="submit"
              style={{ 
                padding: '14px 30px', 
                background: 'linear-gradient(135deg, #4B6CB7 0%, #19232D 100%)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '16px', 
                fontWeight: 600, 
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Soumettre ma demande
            </button>
          </form>
        )}
      </motion.div>

      {/* Contact Info */}
      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#f7fafc', borderRadius: '16px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Questions?</h3>
        <p style={{ color: '#718096' }}>Contactez notre équipe partenaires</p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:partners@e-designe.com" style={{ color: '#4B6CB7', textDecoration: 'none' }}>📧 partners@e-designe.com</a>
          <a href="tel:+33100000000" style={{ color: '#4B6CB7', textDecoration: 'none' }}>📞 +33 1 00 00 00 00</a>
        </div>
      </div>

      {/* Back to Home */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" style={{ color: '#4B6CB7', textDecoration: 'none' }}>
          ← Retour à laceueil
        </Link>
      </div>
    </div>
  )
}