import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>E-Designe</h3>
            <p>Votre boutique de mode en ligne avec IA.</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ fontSize: '1.5rem' }}>📘</a>
              <a href="#" style={{ fontSize: '1.5rem' }}>📸</a>
              <a href="#" style={{ fontSize: '1.5rem' }}>🐦</a>
            </div>
          </div>
          <div>
            <h3>Boutique</h3>
            <Link to="/products">Tous les produits</Link>
            <Link to="/fournisseurs/homme">Homme</Link>
            <Link to="/fournisseurs/femme">Femme</Link>
            <Link to="/fournisseurs/enfants">Enfants</Link>
            <Link to="/fournisseurs/cosmetiques">Cosmétiques</Link>
          </div>
          <div>
            <h3>Informations</h3>
            <Link to="/blog">Blog</Link>
            <Link to="/about">À propos</Link>
            <Link to="/contact">Contact</Link>
            <Link to="#">FAQ</Link>
          </div>
          <div>
            <h3>Aide</h3>
            <Link to="#">Livraison</Link>
            <Link to="#">Retours</Link>
            <Link to="#">Conditions générales</Link>
            <Link to="#">Politique confidentialité</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <p>support@e-designe.com</p>
            <p>+229 01 97 700 347</p>
            <p>Cotonou, Bénin</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.7, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <p>© 2024 E-Designe By ELECTRON. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}