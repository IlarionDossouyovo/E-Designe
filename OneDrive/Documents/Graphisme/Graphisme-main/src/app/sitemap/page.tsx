'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, ShoppingCart, Calendar, FileText, MessageCircle, HelpCircle,
  Users, Star, Folder, User, Settings, BarChart3, Gift, Heart,
  Building2, Mail, Palette, Video, Globe, Smartphone, Bot, ArrowLeft
} from 'lucide-react'

const mainLinks = [
  { href: '/', label: 'Accueil', icon: Home, description: 'Page d\'accueil' },
  { href: '/shop', label: 'Boutique', icon: ShoppingCart, description: 'Produits et services' },
  { href: '/services', label: 'Services', icon: Palette, description: 'Nos services' },
  { href: '/portfolio', label: 'Portfolio', icon: Folder, description: 'Nos réalisations' },
  { href: '/pricing', label: 'Tarifs', icon: FileText, description: 'Grille tarifaire' },
  { href: '/contact', label: 'Contact', icon: Mail, description: 'Nous contacter' },
]

const bookingLinks = [
  { href: '/quote', label: 'Devis', icon: FileText, description: 'Demander un devis' },
  { href: '/bookings', label: 'Réservation', icon: Calendar, description: 'Prendre RDV' },
  { href: '/support', label: 'Support', icon: MessageCircle, description: 'Aide et support' },
  { href: '/faq', label: 'FAQ', icon: HelpCircle, description: 'Questions fréquentes' },
]

const clientLinks = [
  { href: '/client/dashboard', label: 'Espace Client', icon: User, description: 'Mon tableau de bord' },
  { href: '/testimonials', label: 'Témoignages', icon: Star, description: 'Avis clients' },
  { href: '/affiliate', label: 'Parrainage', icon: Gift, description: 'Gagner des commissions' },
  { href: '/partners', label: 'Partenaires', icon: Users, description: 'Devenir partenaire' },
]

const adminLinks = [
  { href: '/admin', label: 'Admin', icon: Settings, description: 'Dashboard admin' },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, description: 'Statistiques' },
  { href: '/admin/social', label: 'Réseaux Sociaux', icon: Globe, description: 'Gestion sociale' },
  { href: '/admin/affiliation', label: 'Affiliation', icon: Gift, description: 'Programme parrainage' },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings, description: 'Configuration API' },
]

const aiLinks = [
  { href: '/ai-studio', label: 'AI Studio', icon: Bot, description: 'Studio IA' },
  { href: '/ai-team', label: 'AI Team', icon: Users, description: 'Équipe d\'agents IA' },
  { href: '/ai-project-manager', label: 'AI Projects', icon: Bot, description: 'Gestion projets IA' },
]

const specialLinks = [
  { href: '/announcements', label: 'Annonces', icon: Globe, description: 'Annonces entreprise' },
  { href: '/payments', label: 'Paiements', icon: Smartphone, description: 'Moyens de paiement' },
  { href: '/maintenance', label: 'Maintenance', icon: Settings, description: 'Système maintenance' },
  { href: '/founder', label: 'Fondateur', icon: User, description: 'Profil fondateur' },
]

const blogLinks = [
  { href: '/blog', label: 'Blog', icon: FileText, description: 'Actualités et articles' },
]

export default function SitemapPage() {
  const linkGroups = [
    { title: 'Pages Principales', links: mainLinks, color: 'from-gold/20 to-yellow-500/20' },
    { title: 'Réservation & Support', links: bookingLinks, color: 'from-blue-500/20 to-cyan-500/20' },
    { title: 'Espace Client', links: clientLinks, color: 'from-green-500/20 to-emerald-500/20' },
    { title: 'Administration', links: adminLinks, color: 'from-purple-500/20 to-pink-500/20' },
    { title: 'Intelligence Artificielle', links: aiLinks, color: 'from-red-500/20 to-orange-500/20' },
    { title: 'Spécial', links: specialLinks, color: 'from-yellow-500/20 to-gold/20' },
    { title: 'Contenu', links: blogLinks, color: 'from-indigo-500/20 to-blue-500/20' },
  ]

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <Home className="w-5 h-5" />
            Accueil
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Plan du <span className="text-gold">Site</span>
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Toutes les pages disponibles sur Graphisme by ELECTRON
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linkGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${group.color} p-4`}>
                <h2 className="text-xl font-bold text-white">{group.title}</h2>
              </div>
              <div className="p-4 space-y-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <link.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-white font-medium group-hover:text-gold transition-colors">
                        {link.label}
                      </p>
                      <p className="text-gray-500 text-xs">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-gold">{mainLinks.length}</p>
            <p className="text-gray-400">Pages Principales</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-blue-400">{bookingLinks.length}</p>
            <p className="text-gray-400">Services</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-green-400">{clientLinks.length}</p>
            <p className="text-gray-400">Espace Client</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold text-purple-400">{adminLinks.length}</p>
            <p className="text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
