import { Link } from 'react-router-dom'

export default function Footer() {
  // E-Designe dropshipping platform footer
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>E-Designe</h3>
            <p>Votre plateforme e-commerce dropshipping et affiliation.</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ fontSize: '1.5rem' }}>📘</a>
              <a href="#" style={{ fontSize: '1.5rem' }}>📸</a>
              <a href="#" style={{ fontSize: '1.5rem' }}>🐦</a>
            </div>
          </div>
          <div>
            <h3>Boutique</h3>
            <Link to="/products">Tous les produits</Link>
            <Link to="/homme">Homme</Link>
            <Link to="/femme">Femme</Link>
            <Link to="/enfants">Enfants</Link>
            <Link to="/cosmetiques">Cosmétiques</Link>
          </div>
          <div>
            <h3>Informations</h3>
            <Link to="/blog">Blog</Link>
            <Link to="/about">À propos</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contact">FAQ</Link>
          </div>
          <div>
            <h3>Aide</h3>
            <Link to="/contact">Livraison</Link>
            <Link to="/contact">Retours</Link>
            <Link to="/contact">Conditions générales</Link>
            <Link to="/contact">Politique confidentialité</Link>
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