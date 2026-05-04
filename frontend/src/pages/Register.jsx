import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Register({ setUser }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data } = await axios.post('/api/users/register', formData)
      setUser(data.user)
      localStorage.setItem('e-designe-user', JSON.stringify(data.user))
      navigate('/account')
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur d\'inscription')
    }
    setLoading(false)
  }

  return (
    <div className="container" style={{ padding: '4rem 20px', maxWidth: '400px' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Créer un compte</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
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
            <label>Mot de passe</label>
            <input 
              type="password" 
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          {error && <div style={{ color: '#E53E3E', marginBottom: '1rem' }}>{error}</div>}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </form>
        
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Déjà un compte? <Link to="/login" style={{ color: '#4B6CB7' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}