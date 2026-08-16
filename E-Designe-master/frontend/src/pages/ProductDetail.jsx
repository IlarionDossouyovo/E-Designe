import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { allProducts, qualityTiers } from '../data/products'

export default function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = allProducts.find(p => p.id === id) || allProducts[0]
  const qt = qualityTiers.find(t => t.id === product.quality)

  // Quick navigation buttons
  const quickLinks = [
    { name: 'Accueil', icon: '🏠', path: '/', color: '#4B6CB7' },
    { name: 'Produits', icon: '🛍️', path: '/products', color: '#25D366' },
    { name: 'Panier', icon: '🛒', path: '/cart', color: '#E4405F' },
    { name: 'Textile', icon: '🧵', path: '/textile', color: '#F59E0B' },
    { name: 'Marketing', icon: '📊', path: '/marketing', color: '#7C3AED' },
  ];

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ ...product, size, quantity })
      navigate('/cart')
    } else {
      navigate('/cart')
    }
  }

  const images = [product.image, product.image, product.image]

  return (
    <div style={{ padding: '100px 20px 40px', maxWidth: '1200px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      
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
                fontSize: '0.85rem',
                transition: 'all 0.3s'
              }}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Back Button */}
      <Link to="/products" style={{ color: '#4B6CB7', marginBottom: '1rem', display: 'inline-block', textDecoration: 'none' }}>
        ← Retour aux produits
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
        {/* Images */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ background: '#16161f', borderRadius: '16px', height: '500px', overflow: 'hidden', marginBottom: '10px' }}
          >
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'https://placehold.co/500x600/16161f/4B6CB7?text=Image' }}
            />
          </motion.div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#16161f',
                  border: selectedImage === idx ? '2px solid #4B6CB7' : '2px solid transparent',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span style={{ 
            background: qt?.color || '#4B6CB7', 
            color: '#fff', 
            padding: '6px 14px', 
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {product.quality}
          </span>
          <p style={{ color: '#4B6CB7', marginTop: '1rem', marginBottom: '0.5rem' }}>{product.category} - {product.sub}</p>
          <h1 style={{ color: '#fff', marginBottom: '1rem', fontSize: '2rem' }}>{product.name}</h1>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '1rem' }}>{product.price} €</p>
          <p style={{ color: '#9ca3af', marginBottom: '1.5rem', lineHeight: 1.8 }}>
            Produit de qualité {product.quality?.toLowerCase()} dans la catégorie {product.category}. 
            Confectionné avec des matériaux de qualité pour un rendu parfait.
          </p>
          
          {/* Size Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#fff', marginBottom: '0.8rem', fontWeight: 'bold' }}>Taille:</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setSize(s)} 
                  style={{ 
                    padding: '12px 20px', 
                    borderRadius: '8px', 
                    border: size === s ? 'none' : '1px solid #333', 
                    background: size === s ? '#4B6CB7' : '#16161f', 
                    color: '#fff', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#fff', marginBottom: '0.8rem', fontWeight: 'bold' }}>Quantité:</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #333', background: '#16161f', color: '#fff', cursor: 'pointer' }}
              >
                -
              </button>
              <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #333', background: '#16161f', color: '#fff', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <button 
            onClick={handleAddToCart}
            style={{ 
              padding: '16px 28px', 
              background: 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '1.1rem', 
              cursor: 'pointer', 
              width: '100%',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Ajouter au panier 🛒
          </button>

          {/* More Links */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
            <Link to="/wishlist" style={{ flex: 1, padding: '12px', background: '#16161f', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'center', textDecoration: 'none' }}>
              🤍 Wishlist
            </Link>
            <Link to="/textile" style={{ flex: 1, padding: '12px', background: '#16161f', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'center', textDecoration: 'none' }}>
              🧵 Textile
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
