import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.svg'

export default function Header({ cartCount, user }) {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <img src={logo} alt="E-Désigne" style={{ height: '35px' }} />
          </motion.div>
        </Link>
        
        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/products">Boutique</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/fournisseurs/homme">Homme</Link>
          <Link to="/fournisseurs/femme">Femme</Link>
          <Link to="/fournisseurs/enfants">Enfants</Link>
          <Link to="/fournisseurs/cosmetiques">Cosmétiques</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <Link to="/account" className="btn btn-secondary">
              Mon Compte
            </Link>
          ) : (
            <Link to="/login" className="btn btn-secondary">
              Connexion
            </Link>
          )}
          <Link to="/wishlist" className="wishlist-btn" title="Wishlist">
            ❤️
          </Link>
          <Link to="/cart" className="cart-btn">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}