'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import SocialIcons, { CompactSocialIcons } from './SocialIcons'

// Logo Component
export const Logo = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse"></div>
    <svg viewBox="0 0 100 100" className="w-10 h-10">
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

// Navigation items - SIMPLIFIED
export const mobileNavItems = [
  { name: 'Accueil', href: '/', icon: '🏠' },
  { name: 'AI Portfolio', href: '/ai-portfolio', icon: '🎨' },
  { name: 'Services', href: '/services', icon: '🛠️' },
  { name: 'Portfolio', href: '/portfolio', icon: '📁' },
  { name: 'Boutique', href: '/shop', icon: '🛒' },
  { name: 'Tarifs', href: '/pricing', icon: '💰' },
  { name: 'Blog', href: '/blog', icon: '📰' },
  { name: 'Contact', href: '/contact', icon: '📧' },
  { name: 'IA Studio', href: '/ai-studio', icon: '🤖' },
  { name: 'Devis', href: '/quote', icon: '📝' },
  { name: 'FAQ', href: '/faq', icon: '❓' },
  { name: 'Connexion', href: '/login', icon: '🔑' },
]

// Desktop Navigation - Derived from mobileNavItems
const navItems = mobileNavItems.slice(0, 7).map(item => ({ name: item.name, href: item.href }))

// All pages for sitemap - SIMPLIFIED
export const allPages = [
  { name: 'Accueil', href: '/', category: 'Main' },
  { name: 'AI Portfolio', href: '/ai-portfolio', category: 'Portfolio' },
  { name: 'Services', href: '/services', category: 'Services' },
  { name: 'Portfolio', href: '/portfolio', category: 'Services' },
  { name: 'Boutique', href: '/shop', category: 'Shop' },
  { name: 'Tarifs', href: '/pricing', category: 'Services' },
  { name: 'Blog', href: '/blog', category: 'Content' },
  { name: 'Contact', href: '/contact', category: 'Main' },
  { name: 'IA Studio', href: '/ai-studio', category: 'AI' },
  { name: 'Devis', href: '/quote', category: 'Booking' },
  { name: 'FAQ', href: '/faq', category: 'Support' },
  { name: 'Espace Client', href: '/client', category: 'Client' },
  { name: 'Admin', href: '/admin', category: 'Admin' },
]

// Navbar Component - MINIMAL VERSION
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-premium-black/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold gold-text">Graphisme</span>
          </Link>

          {/* Desktop: Simple horizontal menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact" className="bg-gold text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-400">
              Devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Simple links */}
            {mobileNavItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="block py-3 px-2 text-gray-300 hover:text-gold transition-colors border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                {item.icon} {item.name}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-2 text-center">🌐 Changer de langue</p>
              <LanguageSelector />
            </div>
            
            {/* CTA */}
            <div className="mt-4">
              <Link href="/contact" className="glass-button w-full text-center block py-3">
                Devis Gratuit
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Footer Component
export function Footer() {
  return (
    <footer className="bg-premium-dark border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Colonne 1: Marque */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <Logo />
              <div>
                <span className="text-lg font-bold gold-text">Graphisme</span>
                <span className="text-xs text-gray-400 block">by ELECTRON</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              La première agence digitale intelligente du Benin avec une équipe de 12 agents IA pour transformer vos projets en réalité.
            </p>
            <div className="mt-4">
              <h4 className="text-white text-sm font-semibold mb-3">Suivez-nous</h4>
              <CompactSocialIcons />
            </div>
          </div>
          
          {/* Colonne 2: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/services" className="hover:text-gold transition-colors">Design Graphique</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors">Développement Web</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors">Marketing Digital</Link></li>
              <li><Link href="/ai-studio" className="hover:text-gold transition-colors">IA & Automatisation</Link></li>
            </ul>
          </div>
          
          {/* Colonne 3: Espace */}
          <div>
            <h4 className="text-white font-semibold mb-4">Espace</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/admin" className="hover:text-gold transition-colors">Admin</Link></li>
              <li><Link href="/client" className="hover:text-gold transition-colors">Rapport Client</Link></li>
              <li><Link href="/ai-studio" className="hover:text-gold transition-colors">Centre IA</Link></li>
              <li><Link href="/ai-project-manager" className="hover:text-gold transition-colors">AI Projects</Link></li>
              <li><Link href="/payments" className="hover:text-gold transition-colors">Paiements</Link></li>
            </ul>
          </div>
          
          {/* Colonne 4: Entreprise */}
          <div>
            <h4 className="text-white font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-gold transition-colors">À propos</Link></li>
              <li><Link href="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-gold transition-colors">Carrières</Link></li>
              <li><Link href="/announcements" className="hover:text-gold transition-colors">Annonces</Link></li>
              <li><Link href="/founder" className="hover:text-gold transition-colors">Fondateur</Link></li>
            </ul>
          </div>
        </div>

        {/* Deuxième rangée */}
        <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-t border-white/5">
          {/* Colonne 5: Outils */}
          <div>
            <h4 className="text-white font-semibold mb-4">Outils</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/quote" className="hover:text-gold transition-colors">Devis</Link></li>
              <li><Link href="/maintenance" className="hover:text-gold transition-colors">Maintenance</Link></li>
              <li><Link href="/login" className="hover:text-gold transition-colors">Connexion</Link></li>
              <li><Link href="/sitemap" className="hover:text-gold transition-colors">Sitemap</Link></li>
            </ul>
          </div>
          
          {/* Colonne 6: Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-gold transition-colors">Mentions légales</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">CGV</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
          
          {/* Colonne 7: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Cotonou, Benin</li>
              <li>+229 01 97 70 03 47</li>
              <li>electronbusiness07@gmail.com</li>
            </ul>
            <a 
              href="https://wa.me/2290197030347"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors text-sm font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Graphisme by ELECTRON. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm">
              Fait avec <span className="text-gold">❤</span> et l'IA
            </p>
          </div>
          
          {/* Language Selector in Footer */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">🌐</span>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
