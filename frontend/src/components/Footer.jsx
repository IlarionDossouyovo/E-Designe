import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>Stylhub</h3>
            <p>Votre boutique de mode en ligne avec IA.</p>
          </div>
          <div>
            <h3>Liens Rapides</h3>
            <Link to="/products">Boutique</Link>
            <Link to="/cart">Panier</Link>
            <Link to="/account">Mon Compte</Link>
          </div>
          <div>
            <h3>Aide</h3>
            <Link to="#">FAQ</Link>
            <Link to="#">Livraison</Link>
            <Link to="#">Retours</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <p>support@stylhub.com</p>
            <p>+33 1 23 45 67 89</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.7 }}>
          <p>© 2024 Stylhub. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}