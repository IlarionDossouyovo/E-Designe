import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Header({ cartCount, user }) {
  return (
    <header className="header" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: '#0a0a0f', borderBottom: '1px solid #2a2a35' }}>
      <div className="container header-content" style={{ padding: '10px 20px', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="logo">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Logo variant="monogram" size="md" animated={false} />
          </motion.div>
        </Link>
        
        <nav className="nav" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>Accueil</Link>
          <Link to="/products" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>Boutique</Link>
          <Link to="/blog" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>Blog</Link>
          <Link to="/homme" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>Homme</Link>
          <Link to="/femme" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>Femme</Link>
          <Link to="/enfants" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>Enfants</Link>
          <Link to="/cosmetiques" style={{ color: '#ec4899', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>💄 Cosmétiques</Link>
          <Link to="/africain" style={{ color: '#d4af37', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600 }}>🌴 Africain</Link>
          <Link to="/bebe" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>👶 Bebe</Link>
          <Link to="/revendeurs" style={{ background: '#4B6CB7', color: 'white', padding: '6px 12px', borderRadius: '20px', textDecoration: 'none', fontSize: '0.9rem' }}>💎 Revendeurs</Link>
          <Link to="/textile" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>🧵 TextileHub</Link>
          <Link to="/fournisseurs-textile" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>🏭 Fournisseurs</Link>
          <Link to="/recherche-ia" style={{ color: '#22c55e', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>🔍 IA</Link>
          <Link to="/marketing" style={{ color: '#f59e0b', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>📊 Marketing</Link>
          <Link to="/partenaire" style={{ color: '#8b5cf6', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>🤝 Partenaire</Link>
          <Link to="/marques" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>🏢 Marques</Link>
          <Link to="/fondacteure" style={{ color: '#7C3AED', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>👤 Fondateur</Link>
          <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>⚙️ Admin</Link>
        </nav>

        <div className="header-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <Link to="/account" style={{ padding: '8px 16px', background: '#4B6CB7', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem' }}>
              Mon Compte
            </Link>
          ) : (
            <Link to="/login" style={{ padding: '8px 16px', background: '#16161f', color: '#fff', border: '1px solid #4B6CB7', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem' }}>
              Connexion
            </Link>
          )}
          <Link to="/wishlist" title="Wishlist" style={{ fontSize: '1.2rem', textDecoration: 'none' }}>
            🤍
          </Link>
          <Link to="/cart" style={{ padding: '8px 12px', background: '#4B6CB7', color: '#fff', borderRadius: '8px', textDecoration: 'none', position: 'relative', fontSize: '0.9rem' }}>
            🛒 Panier
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem' }}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}