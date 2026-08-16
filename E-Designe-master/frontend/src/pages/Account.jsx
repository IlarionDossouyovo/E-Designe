import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Account() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  // Mock user data
  const user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Mode, 75001 Paris',
    avatar: '👤',
    memberSince: 'Janvier 2024',
    points: 1250,
    ordersCount: 12,
    wishlistCount: 5
  }

  const quickLinks = [
    { name: 'Accueil', icon: '🏠', path: '/', color: '#4B6CB7' },
    { name: 'Produits', icon: '🛍️', path: '/products', color: '#25D366' },
    { name: 'Commandes', icon: '📦', path: '/order-tracking', color: '#E4405F' },
    { name: 'Panier', icon: '🛒', path: '/cart', color: '#F59E0B' },
    { name: 'Marketing', icon: '📊', path: '/marketing', color: '#7C3AED' },
  ];

  const accountSections = [
    { id: 'profile', name: 'Mon Profil', icon: '👤', color: '#4B6CB7' },
    { id: 'orders', name: 'Mes Commandes', icon: '📦', color: '#25D366', path: '/order-tracking' },
    { id: 'wishlist', name: 'Ma Wishlist', icon: '🤍', color: '#E4405F', path: '/wishlist' },
    { id: 'addresses', name: 'Adresses', icon: '📍', color: '#F59E0B' },
    { id: 'payments', name: 'Moyens de paiement', icon: '💳', color: '#7C3AED' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', color: '#10B981' },
    { id: 'security', name: 'Sécurité', icon: '🔒', color: '#EF4444' },
    { id: 'help', name: 'Aide & Support', icon: '❓', color: '#6366F1' },
  ]

  return (
    <div style={{ padding: '100px 20px 40px', maxWidth: '1000px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      
      {/* Quick Links */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '20px' }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {quickLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              style={{
                padding: '8px 16px',
                background: '#16161f',
                border: `1px solid ${link.color}40`,
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '30px' }}
      >
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '10px' }}>👤 Mon Compte</h1>
        <p style={{ color: '#9ca3af' }}>Gérez votre profil et vos préférences</p>
      </motion.div>

      {/* User Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ 
          background: '#16161f', 
          borderRadius: '20px', 
          padding: '30px', 
          marginBottom: '30px',
          border: '1px solid #2a2a35'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
          }}>
            {user.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: '#fff', marginBottom: '5px', fontSize: '1.8rem' }}>{user.name}</h2>
            <p style={{ color: '#9ca3af', marginBottom: '10px' }}>{user.email}</p>
            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Membre depuis {user.memberSince}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#FFD700', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{user.points}</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Points fidélité</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}
      >
        <div 
          onClick={() => navigate('/order-tracking')}
          style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', border: '1px solid #2a2a35' }}
        >
          <p style={{ color: '#4B6CB7', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{user.ordersCount}</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Commandes</p>
        </div>
        <div 
          onClick={() => navigate('/wishlist')}
          style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', border: '1px solid #2a2a35' }}
        >
          <p style={{ color: '#E4405F', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{user.wishlistCount}</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Wishlist</p>
        </div>
        <div style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>-15%</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Réduction</p>
        </div>
        <div style={{ background: '#16161f', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #2a2a35' }}>
          <p style={{ color: '#FFD700', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Bronze</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Statut VIP</p>
        </div>
      </motion.div>

      {/* Account Sections */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 style={{ color: '#fff', marginBottom: '20px' }}>Mon Compte</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {accountSections.map((section) => (
            section.path ? (
              <button
                key={section.id}
                onClick={() => navigate(section.path)}
                style={{
                  background: '#16161f',
                  border: `1px solid ${section.color}40`,
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{section.icon}</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{section.name}</span>
              </button>
            ) : (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                style={{
                  background: activeTab === section.id ? section.color + '30' : '#16161f',
                  border: `1px solid ${activeTab === section.id ? section.color : '#2a2a35'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{section.icon}</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{section.name}</span>
              </button>
            )
          ))}
        </div>
      </motion.div>

      {/* Profile Details (shown when profile tab is active) */}
      {activeTab === 'profile' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: '#16161f', 
            borderRadius: '16px', 
            padding: '30px', 
            marginTop: '30px',
            border: '1px solid #2a2a35'
          }}
        >
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>Informations du profil</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#0a0a0f', borderRadius: '10px' }}>
              <span style={{ color: '#9ca3af' }}>Nom complet</span>
              <span style={{ color: '#fff' }}>{user.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#0a0a0f', borderRadius: '10px' }}>
              <span style={{ color: '#9ca3af' }}>Email</span>
              <span style={{ color: '#fff' }}>{user.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#0a0a0f', borderRadius: '10px' }}>
              <span style={{ color: '#9ca3af' }}>Téléphone</span>
              <span style={{ color: '#fff' }}>{user.phone}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#0a0a0f', borderRadius: '10px' }}>
              <span style={{ color: '#9ca3af' }}>Adresse</span>
              <span style={{ color: '#fff' }}>{user.address}</span>
            </div>
          </div>
          <button style={{ 
            marginTop: '20px',
            padding: '12px 24px', 
            background: '#4B6CB7', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Modifier le profil ✏️
          </button>
        </motion.div>
      )}

      {/* Logout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '30px', textAlign: 'center' }}
      >
        <button style={{ 
          padding: '12px 30px', 
          background: 'transparent', 
          color: '#ef4444', 
          border: '1px solid #ef4444', 
          borderRadius: '10px', 
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          Se déconnecter 🚪
        </button>
      </motion.div>
    </div>
  )
}
