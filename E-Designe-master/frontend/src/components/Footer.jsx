import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer" style={{ background: '#0a0a0f', borderTop: '1px solid #2a2a35', padding: '40px 20px', marginTop: '60px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          
          {/* Logo & About */}
          <div>
            <h3 style={{ color: '#4B6CB7', marginBottom: '15px', fontSize: '1.5rem' }}>E-Designe</h3>
            <p style={{ color: '#9ca3af', marginBottom: '15px', lineHeight: '1.6' }}>
              Votre plateforme e-commerce complète : dropshipping, affiliation, et plus encore.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>📘</a>
              <a href="#" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>📸</a>
              <a href="#" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>🐦</a>
              <a href="#" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>🎵</a>
              <a href="#" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>💼</a>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>🛍️ Boutique</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Tous les produits</Link>
              <Link to="/homme" style={{ color: '#9ca3af', textDecoration: 'none' }}>Homme</Link>
              <Link to="/femme" style={{ color: '#9ca3af', textDecoration: 'none' }}>Femme</Link>
              <Link to="/enfants" style={{ color: '#9ca3af', textDecoration: 'none' }}>Enfants</Link>
              <Link to="/cosmetiques" style={{ color: '#ec4899', textDecoration: 'none' }}>Cosmétiques</Link>
              <Link to="/africain" style={{ color: '#d4af37', textDecoration: 'none' }}>Mode Africaine</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>🚀 Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/revendeurs" style={{ color: '#4B6CB7', textDecoration: 'none' }}>💎 Revendeurs</Link>
              <Link to="/partenaire" style={{ color: '#8b5cf6', textDecoration: 'none' }}>🤝 Partenaires</Link>
              <Link to="/textile" style={{ color: '#fff', textDecoration: 'none' }}>🧵 TextileHub</Link>
              <Link to="/fournisseurs-textile" style={{ color: '#fff', textDecoration: 'none' }}>🏭 Fournisseurs</Link>
              <Link to="/marques" style={{ color: '#fff', textDecoration: 'none' }}>🏢 Marques</Link>
            </div>
          </div>

          {/* Marketing & IA */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>📊 Marketing & IA</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/marketing" style={{ color: '#f59e0b', textDecoration: 'none' }}>📊 Marketing Hub</Link>
              <Link to="/recherche-ia" style={{ color: '#22c55e', textDecoration: 'none' }}>🔍 Recherche IA</Link>
              <Link to="/agents" style={{ color: '#fff', textDecoration: 'none' }}>🤖 Agents IA</Link>
              <Link to="/blog" style={{ color: '#fff', textDecoration: 'none' }}>📝 Blog</Link>
            </div>
          </div>

          {/* Informations */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>ℹ️ Informations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>À propos</Link>
              <Link to="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link>
              <Link to="/order-tracking" style={{ color: '#9ca3af', textDecoration: 'none' }}>Suivre commande</Link>
              <Link to="/cart" style={{ color: '#9ca3af', textDecoration: 'none' }}>Panier</Link>
              <Link to="/wishlist" style={{ color: '#9ca3af', textDecoration: 'none' }}>Wishlist</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px' }}>📞 Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#9ca3af' }}>
              <p style={{ margin: 0 }}>📧 electronbusiness07@gmail.com</p>
              <p style={{ margin: 0 }}>📱 +229 01 977 003 47</p>
              <p style={{ margin: 0 }}>📱 +229 01 498 022 02</p>
              <p style={{ margin: 0 }}>📍 Cotonou, Benin</p>
            </div>
          </div>
        </div>

        {/* Admin Link */}
        <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #2a2a35', marginTop: '20px' }}>
          <Link to="/admin" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem' }}>⚙️ Administration</Link>
          <span style={{ color: '#374151', margin: '0 10px' }}>|</span>
          <Link to="/fondacteure" style={{ color: '#7C3AED', textDecoration: 'none', fontSize: '0.9rem' }}>👤 Fondateur</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#6B7280', borderTop: '1px solid #2a2a35', paddingTop: '20px' }}>
          <p>© 2024-2026 E-Designe By ELECTRON. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}