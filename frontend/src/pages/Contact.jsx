import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const contactInfo = [
    { icon: '📧', title: 'Email', value: 'support@e-designe.com', desc: 'Réponse sous 24h' },
    { icon: '📞', title: 'Téléphone', value: '+229 01 97 700 347', desc: 'Lun-Ven: 9h-18h' },
    { icon: '📱', title: 'WhatsApp', value: '+229 01 49 80 220', desc: '24h/24' },
    { icon: '📍', title: 'Adresse', value: 'Cotonou, Bénin', desc: 'Boutique flagship' },
    { icon: '💬', title: 'Chat', value: 'Disponible 24/7', desc: 'Assistant IA + Support' }
  ]

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)',
          borderRadius: '20px',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Contactez-Nous</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Notre équipe est disponible pour vous aider
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Envoyez-nous un message</h2>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h3>Message envoyé!</h3>
                <p style={{ color: '#718096' }}>Nous vous répondrons sous 24h</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nom complet</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Sujet</label>
                  <select 
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="produit">Question sur un produit</option>
                    <option value="retour">Retour/Echange</option>
                    <option value="partnership">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    className="form-control"
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 style={{ marginBottom: '1.5rem' }}>Nos coordonnées</h2>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {contactInfo.map((info, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card"
                style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ fontSize: '2rem' }}>{info.icon}</div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>{info.title}</h4>
                  <p style={{ color: '#4B6CB7', fontWeight: 600 }}>{info.value}</p>
                  <p style={{ color: '#718096', fontSize: '0.85rem' }}>{info.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Preview */}
          <div className="card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Questions fréquentes</h3>
            <details style={{ marginBottom: '0.75rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 500 }}>Quels sont les délais de livraison?</summary>
              <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Délais: 3-5 jours ouvrés en France, 7-14 jours pour l'international.
              </p>
            </details>
            <details style={{ marginBottom: '0.75rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 500 }}>Comment retourner un produit?</summary>
              <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Utilisez notre formulaire de retour ou contactez le support.
              </p>
            </details>
            <details>
              <summary style={{ cursor: 'pointer', fontWeight: 500 }}>Les paiements sont-ils sécurisés?</summary>
              <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Oui, via Stripe et PayPal avec chiffrement SSL.
              </p>
            </details>
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '4rem' }}
      >
        <div style={{ 
          background: '#F5F6FA', 
          borderRadius: '20px', 
          padding: '3rem', 
          textAlign: 'center' 
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Venez nous rendre visite</h2>
          <p style={{ color: '#718096' }}>Notre boutique flagship à Cotonou</p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Voir sur Google Maps
          </a>
        </div>
      </motion.div>
    </div>
  )
}