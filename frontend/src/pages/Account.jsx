import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Account({ user, setUser }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user?.id) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    try {
      const { data } = await axios.get(`/api/orders/${user.id}`)
      setOrders(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('stylhub-user')
  }

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 20px', textAlign: 'center' }}>
        <h2>Veuillez vous connecter pour accéder à votre compte</h2>
        <Link to="/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Mon Compte</h1>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: '#4B6CB7', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1rem'
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{user.name}</h3>
            <p style={{ color: '#718096' }}>{user.email}</p>
          </div>
          
          <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%' }}>
            Déconnexion
          </button>
        </div>
        
        <div>
          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Mes Commandes</h3>
            {orders.length === 0 ? (
              <p style={{ color: '#718096' }}>Aucune commande</p>
            ) : (
              <div>
                {orders.map(order => (
                  <div key={order.id} style={{ 
                    padding: '1rem', 
                    border: '1px solid #E2E8F0', 
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong>{order.id}</strong>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        background: order.status === 'pending' ? '#FEF3C7' : '#D1FAE5',
                        color: order.status === 'pending' ? '#92400E' : '#065F46'
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                      {order.items?.length} article(s) - {order.total?.toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Informations du compte</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#718096' }}>Nom</label>
                <p>{user.name}</p>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#718096' }}>Email</label>
                <p>{user.email}</p>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#718096' }}>Membre depuis</label>
                <p>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}