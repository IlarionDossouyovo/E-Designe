// E-Designe Logo Component
// Responsive logos with animations

import { motion } from 'framer-motion'
import logoHorizontal from '../assets/logo-e-designe-horizontal-dark.svg'
import logoSquare from '../assets/logo-e-designe-icon.svg'
import logoMono from '../assets/logo-e-monogram.svg'
import logoMain from '../assets/logo-e-designe-main.svg'

const sizeMap = {
  xs: { width: 32, height: 32 },
  sm: { width: 48, height: 48 },
  md: { width: 64, height: 64 },
  lg: { width: 96, height: 96 },
  xl: { width: 128, height: 128 },
}

const variantLogos = {
  default: logoMono,
  horizontal: logoHorizontal,
  square: logoSquare,
  monogram: logoMono,
  main: logoMain,
}

// Animated Logo with glow effects
export const LogoMono = ({ 
  size = 'md', 
  animated = true,
  className = ''
}) => {
  const dimensions = sizeMap[size] || sizeMap.md
  const logoSrc = logoMono
  
  if (!animated) {
    return (
      <img
        src={logoSrc}
        alt="E-Designe"
        className={className}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          objectFit: 'contain',
        }}
      />
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      className={className}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: dimensions.width,
          height: dimensions.height,
          background: 'radial-gradient(circle, rgba(75,108,183,0.5) 0%, transparent 70%)',
          filter: 'blur(10px)',
          zIndex: -1,
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <img
        src={logoSrc}
        alt="E-Designe"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          objectFit: 'contain',
        }}
      />
    </motion.div>
  )
}

const Logo = ({ 
  variant = 'default',
  size = 'md', 
  animated = false,
  className = ''
}) => {
  const dimensions = sizeMap[size] || sizeMap.md
  const logoSrc = variantLogos[variant] || logoMono
  const LogoWrapper = animated ? motion.img : 'img'

  return (
    <LogoWrapper
      src={logoSrc}
      alt="E-Designe - AI Powered Design Platform"
      className={className}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        objectFit: 'contain',
      }}
      {...(animated && {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 }
      })}
    />
  )
}

export const LogoWithText = ({ size = 'md' }) => {
  const dimensions = sizeMap[size] || sizeMap.md
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
    >
      <LogoMono size={size} animated={true} />
      <div>
        <motion.span
          style={{
            display: 'block',
            fontSize: size === 'lg' ? '1.75rem' : '1.25rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fff 0%, #FFD700 50%, #4B6CB7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            lineHeight: 1.1
          }}
        >
          E-DESIGNE
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'block',
            fontSize: '0.7rem',
            color: '#4B6CB7',
            fontWeight: '600',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}
        >
          By ELECTRON
        </motion.span>
      </div>
    </motion.div>
  )
}

export const LogoHorizontal = (props) => <Logo variant="horizontal" {...props} />
export const LogoSquare = (props) => <Logo variant="square" {...props} />
export const LogoMain = (props) => <Logo variant="main" {...props} />

export default Logo
