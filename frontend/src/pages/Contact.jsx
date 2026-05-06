import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

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
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞 Contact</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Une question? Notre equipe est la pour vous aider.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Contact Info */}
        <div>
          <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Contactez-nous</h2>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#4B6CB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📧</div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fff' }}>Email</p>
                <p style={{ color: '#6B8DD6' }}>electronbusiness07@gmail.com</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#4B6CB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📱</div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fff' }}>Telephone</p>
                <p style={{ color: '#6B8DD6' }}>+229 01 97 700 347</p>
                <p style={{ color: '#6B8DD6' }}>+229 01 49 80 2202</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#4B6CB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📍</div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fff' }}>Adresse</p>
                <p style={{ color: '#6B8DD6' }}>Cotonou, Benin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: '#16161f', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
              <h3>Message envoye!</h3>
              <p style={{ color: '#9ca3af' }}>Nous vous reponderons sous 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>Nom</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>Sujet</label>
                <select value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff' }}>
                  <option value="">Choisir un sujet</option>
                  <option value="commande">Question sur commande</option>
                  <option value="produit">Question produit</option>
                  <option value="retour">Demande de retour</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#fff' }}>Message</label>
                <textarea required value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={5} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #2a2a35', background: '#0a0a0f', color: '#fff', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>Envoyer le message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
