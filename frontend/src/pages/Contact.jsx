export default function Contact() {
  return (
    <div style={{ padding: '2rem 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Contactez-nous</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Votre nom" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <input type="email" placeholder="Votre email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <textarea placeholder="Votre message" rows="5" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
        <button type="submit" style={{ padding: '14px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Envoyer</button>
      </form>
      <div style={{ marginTop: '2rem' }}>
        <h3>Autres moyens:</h3>
        <p>📧 support@e-designe.com</p>
        <p>📱 +229 01 97 700 347</p>
        <p>📍 Cotonou, Bénin</p>
      </div>
    </div>
  )
}
