'use client'

import Link from 'next/link'
import { ArrowLeft, Home, ChevronRight, Settings, User, Shield } from 'lucide-react'

interface PageNavigationProps {
  showBack?: boolean
  showHome?: boolean
  showAdmin?: boolean
  showFounder?: boolean
  backUrl?: string
  customLinks?: { label: string; href: string }[]
}

export default function PageNavigation({
  showBack = true,
  showHome = true,
  showAdmin = false,
  showFounder = false,
  backUrl,
  customLinks = []
}: PageNavigationProps) {
  return (
    <div className="fixed top-[70px] left-0 right-0 z-40 glass-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Back and Home */}
          <div className="flex items-center gap-2">
            {showBack && (
              <Link 
                href={backUrl || '/'} 
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Retour</span>
              </Link>
            )}
            
            {showHome && (
              <Link 
                href="/" 
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Accueil</span>
              </Link>
            )}
          </div>

          {/* Center - Breadcrumb */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            {customLinks.map((link, index) => (
              <span key={index} className="flex items-center gap-1">
                <Link href={link.href} className="hover:text-gold transition-colors">{link.label}</Link>
                {index < customLinks.length - 1 && <ChevronRight className="w-4 h-4" />}
              </span>
            ))}
          </div>

          {/* Right side - Admin/Founder */}
          <div className="flex items-center gap-2">
            {showAdmin && (
              <Link 
                href="/admin" 
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors text-sm"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            
            {showFounder && (
              <Link 
                href="/founder-command" 
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-colors text-sm"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Commande</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Quick navigation bar for founder pages
export function FounderNav() {
  return (
    <div className="fixed top-[70px] left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/founder-command" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
            >
              <Shield className="w-5 h-5" />
              <span className="font-bold">Command Center</span>
            </Link>
            <Link 
              href="/founder-ai-center" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>AI Center</span>
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
