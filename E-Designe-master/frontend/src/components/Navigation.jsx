import { useNavigate, useLocation } from 'react-router-dom'

export default function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  // Ne pas afficher sur la page d'accueil
  if (location.pathname === '/') {
    return null
  }

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const goForward = () => {
    if (window.history.length > 1) {
      navigate(1)
    } else {
      navigate('/products')
    }
  }

  const goHome = () => {
    navigate('/')
  }

  const goProducts = () => {
    navigate('/products')
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '10px'
    }}>
      {/* Bouton Accueil */}
      <button
        onClick={goHome}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          fontSize: '20px'
        }}
        title="Accueil"
      >
        🏠
      </button>

      {/* Bouton Retour */}
      <button
        onClick={goBack}
        style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(56, 239, 125, 0.4)',
          fontSize: '20px'
        }}
        title="Retour"
      >
        ←
      </button>

      {/* Bouton Avancer */}
      <button
        onClick={goForward}
        style={{
          background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(235, 51, 73, 0.4)',
          fontSize: '20px'
        }}
        title="Avancer"
      >
        →
      </button>

      {/* Bouton Produits */}
      <button
        onClick={goProducts}
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
          fontSize: '20px'
        }}
        title="Produits"
      >
        🛍️
      </button>
    </div>
  )
}
