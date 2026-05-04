// E-Designe Logo Component
// Responsive logos for all use cases

import { motion } from 'framer-motion'
import logoHorizontal from '../assets/logo-e-designe-horizontal-dark.svg'
import logoSquare from '../assets/logo-e-designe-icon.svg'
import logoMono from '../assets/logo-e-monogram.svg'
import logoMain from '../assets/logo-e-designe-main.svg'

const Logo = ({ 
  variant = 'default', // 'default' | 'horizontal' | 'square' | 'monogram' | 'main'
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  animated = true,
  className = ''
}) => {
  const sizeMap = {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
  }

  const variantLogos = {
    default: logoMono,
    horizontal: logoHorizontal,
    square: logoSquare,
    monogram: logoMono,
    main: logoMain,
  }

  const logoSrc = variantLogos[variant] || logoMono
  const dimensions = sizeMap[size] || sizeMap.md

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

// Export all logo variants
export const LogoHorizontal = (props) => <Logo variant="horizontal" {...props} />
export const LogoSquare = (props) => <Logo variant="square" {...props} />
export const LogoMono = (props) => <Logo variant="monogram" {...props} />
export const LogoMain = (props) => <Logo variant="main" {...props} />

export default Logo