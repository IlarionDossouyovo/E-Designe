'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff, LogOut, ArrowLeft, Home, Activity, Bot } from 'lucide-react'
import Link from 'next/link'

const Logo = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse"></div>
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.7" />
      <path d="M35 65 L50 30 L65 65 M50 30 L50 55" fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 25 L45 40 L52 40 L47 55 L60 38 L53 38 Z" fill="url(#goldGradient)" />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  </div>
)

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const redirectInProgress = useRef(false)

  // Check if already logged in - show info but don't auto-redirect
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          setCurrentUser(user)
          setIsLoggedIn(true)
        } catch (e) {
          localStorage.removeItem('user')
        }
      }
    }
    
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      // Clear localStorage
      localStorage.removeItem('user')
      // Clear cookie manually
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      setIsLoggedIn(false)
      setCurrentUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    role: 'client' // 'client' or 'admin'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (redirectInProgress.current) return
    
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    if (isLoading) return

    setIsLoading(true)
    setError('')
    
    try {
      if (isLogin) {
        console.log('Attempting login with:', formData.email)
        
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }).catch((networkError) => {
          throw new Error('Serveur non disponible. Veuillez démarrer le serveur avec "npm run dev"')
        })

        let data
        try {
          data = await response.json()
        } catch (e) {
          throw new Error('Erreur de réponse du serveur')
        }
        console.log('Login response:', data)

        if (!response.ok) {
          throw new Error(data.error || 'Erreur de connexion')
        }

        // Stockage localStorage
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
          if (data.token) {
            localStorage.setItem('token', data.token)
          }
        }
        
        // Redirect selon le rôle
        if (redirectInProgress.current) return
        redirectInProgress.current = true
        
        // Utiliser l'URL de redirection de l'API
        const redirectUrl = data.redirectUrl || (data.user?.role === 'admin' ? '/admin/' : '/client/')
        console.log('Redirecting to:', redirectUrl)
        
        // Arrêter le chargement
        setIsLoading(false)
        
        // Redirection immédiate
        router.push(redirectUrl)
      } else {
        // Inscription
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Erreur lors de l'inscription")
        }

        // Inscription réussie - rediriger vers le dashboard client
        alert('Compte créé! Redirection vers le dashboard...')
        window.location.href = '/client/'
        return
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-premium-black flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between px-4 py-4 max-w-md mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
          <Home className="w-5 h-5" />
          Accueil
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-IA/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Logo />
            <div>
              <span className="text-2xl font-bold gold-text">Graphisme</span>
              <span className="text-xs text-gray-400 block">by ELECTRON</span>
            </div>
          </Link>
        </div>

        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {isLogin 
              ? 'Bienvenue ! Connectez-vous à votre compte' 
              : 'Créez votre compte pour commencer'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="Votre nom"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <Link href="/support" className="text-sm text-gold hover:underline">Mot de passe oublié ?</Link>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full glass-button glow-gold py-4 disabled:opacity-50">
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'Créer un compte')}
              </span>
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-500">ou continuer avec</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => alert('Connexion Google - Bientôt disponible')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-white text-sm">Google</span>
              </button>
              <button 
                type="button"
                onClick={() => alert('Connexion Facebook - Bientôt disponible')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-white text-sm">Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-gold transition-colors"
            >
              {isLogin 
                ? "Pas encore de compte ? " 
                : "Déjà un compte ? "}
              <span className="text-gold font-semibold">
                {isLogin ? "S'inscrire" : "Se connecter"}
              </span>
            </button>
          </div>

          {isLoggedIn && currentUser ? (
            <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-xl">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-white font-semibold">Bienvenue, {currentUser.name || 'Utilisateur'}!</h3>
                <p className="text-gray-400 text-sm">{currentUser.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-gold/20 text-gold text-xs rounded-full capitalize">
                  {currentUser.role}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(currentUser.role === 'admin' ? '/admin' : '/client')}
                  className="flex-1 glass-button py-2 text-sm"
                >
                  Aller au {currentUser.role === 'admin' ? 'Admin' : 'Dashboard'}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500/20 border border-red-500/50 text-red-400 py-2 rounded-xl hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <Link 
                href="/"
                className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Retour à l'accueil
              </Link>
              
              {/* Other useful links */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Link 
                  href="/services"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gold transition-colors py-2 hover:bg-white/5 rounded-lg"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Nos Services</span>
                </Link>
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gold transition-colors py-2 hover:bg-white/5 rounded-lg"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  <span>Contact</span>
                </Link>
                <Link 
                  href="/support"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gold transition-colors py-2 hover:bg-white/5 rounded-lg"
                >
                  <Activity className="w-4 h-4 text-gold" />
                  <span>Support</span>
                </Link>
                <Link 
                  href="/ai-team"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gold transition-colors py-2 hover:bg-white/5 rounded-lg"
                >
                  <Bot className="w-4 h-4 text-gold" />
                  <span>Équipe IA</span>
                </Link>
                <Link 
                  href="/shop"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gold transition-colors py-2 hover:bg-white/5 rounded-lg"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Boutique</span>
                </Link>
                <Link 
                  href="/portfolio"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gold transition-colors py-2 hover:bg-white/5 rounded-lg"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Portfolio</span>
                </Link>
              </div>
              
              {/* Quick Contact Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-center text-gray-500 text-xs mb-3">Contact rapide</p>
                <div className="flex justify-center gap-3">
                  <a 
                    href="https://wa.me/2290197700347" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a 
                    href="mailto:contact@graphisme.electron"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      </div>
    </div>
  )
}
