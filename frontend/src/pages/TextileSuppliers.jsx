import { Link } from 'react-router-dom'

export default function TextileSuppliers() {
  return (
    <div style={{ padding: '2rem 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1rem' }}>TextileSuppliers Coming Soon</h1>
      <p style={{ marginBottom: '2rem' }}>Cette page sera disponible bientôt.</p>
      <Link to="/" style={{ color: '#4B6CB7' }}>Retour à l'accueil</Link>
    </div>
  )
}
