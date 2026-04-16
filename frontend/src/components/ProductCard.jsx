import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link 
        to={`/products/${product.id}`}
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ display: 'block' }}
      >
        {/* Badges */}
        <div className="product-badges">
          {product.isNew && (
            <span className="badge badge-new">Nouveau</span>
          )}
          {product.isSale && (
            <span className="badge badge-sale">Sale</span>
          )}
        </div>
        
        {/* Image */}
        <div className="product-image-wrapper">
          <motion.img 
            src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
            alt={product.name}
            className="product-image"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="product-overlay">
            <span className="product-quick-view">Aperçu rapide</span>
          </div>
        </div>
        
        {/* Info */}
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price-wrapper">
            <span className="product-price">{product.price.toFixed(2)} €</span>
            {product.oldPrice && (
              <span className="product-old-price">{product.oldPrice.toFixed(2)} €</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}