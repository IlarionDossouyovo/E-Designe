import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple local auth
    if (email && password) {
      setUser({ email, name: email.split('@')[0] })
    }
  }

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Connexion</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <button type="submit" style={{ padding: '14px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Se connecter</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Pas de compte? <Link to="/register" style={{ color: '#4B6CB7' }}>Créer un compte</Link>
      </p>
    </div>
  )
}
