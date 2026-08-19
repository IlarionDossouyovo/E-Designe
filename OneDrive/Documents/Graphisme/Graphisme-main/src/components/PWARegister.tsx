'use client'

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('PWA registered:', registration.scope)
        })
        .catch((error) => {
          console.log('PWA registration failed:', error)
        })
    }
  }, [])

  return null
}
