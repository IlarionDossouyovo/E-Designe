'use client'

import { CartProvider } from '@/lib/cart-context'
import { LanguageProvider } from './LanguageSelector'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LanguageProvider>
  )
}
