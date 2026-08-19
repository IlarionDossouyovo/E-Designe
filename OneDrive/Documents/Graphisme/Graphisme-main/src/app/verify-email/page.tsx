'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const success = searchParams.get('success')
    const errorParam = searchParams.get('error')

    if (success === 'true') {
      setStatus('success')
    } else if (errorParam) {
      setStatus('error')
      switch (errorParam) {
        case 'no-token':
          setError('Token de vérification manquant')
          break
        case 'invalid-token':
          setError('Token de vérification invalide')
          break
        case 'expired':
          setError('Le lien de vérification a expiré')
          break
        case 'user-not-found':
          setError('Utilisateur non trouvé')
          break
        default:
          setError('Une erreur est survenue')
      }
    }
  }, [searchParams])

  const handleResend = async () => {
    const email = prompt('Veuillez entrer votre adresse email:')
    if (!email) return

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      alert(data.message || data.error)
    } catch (err) {
      alert('Erreur lors de l\'envoi du lien')
    }
  }

  return (
    <div className="min-h-screen bg-premium-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-8 rounded-2xl text-center"
      >
        {status === 'loading' && (
          <>
            <div className="animate-spin w-16 h-16 border-4 border-gold border-t-transparent rounded-full mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-white mb-2">Vérification en cours</h1>
            <p className="text-gray-400">Veuillez patienter...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Email vérifié!</h1>
            <p className="text-gray-400 mb-6">
              Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant accéder à tous les services.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full py-3 bg-gold text-black rounded-xl font-semibold hover:bg-gold/90 transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/"
                className="w-full py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Vérification échouée</h1>
            <p className="text-gray-400 mb-2">{error}</p>
            <p className="text-gray-500 text-sm mb-6">
              Le lien de vérification est invalide ou a expiré. Veuillez demander un nouveau lien.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleResend}
                className="w-full py-3 bg-gold text-black rounded-xl font-semibold hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Renvoyer le lien
              </button>
              <Link
                href="/login"
                className="w-full py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Retour à la connexion
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

// Wrapper component with Suspense boundary
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-premium-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
