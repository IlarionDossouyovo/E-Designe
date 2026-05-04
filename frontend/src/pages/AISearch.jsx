import { Link } from 'react-router-dom'

export default function AISearch() {
  return (
    <div style={{ padding: '2rem 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', background: '#0a0a0f', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '1rem', color: '#fff' }}>Recherche IA</h1>
      <p style={{ marginBottom: '2rem', color: '#9ca3af' }}>Cette page sera disponible bientot.</p>
      <Link to="/" style={{ color: '#4B6CB7' }}>Retour a l'accueil</Link>
    </div>
  )
}
