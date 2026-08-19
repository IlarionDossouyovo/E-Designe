'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Search, Filter, Grid, List, X, ZoomIn, ZoomOut,
  Download, Share2, ArrowLeft, ArrowRight, Eye,
  Sparkles, Star, Zap, Layout, FileText, QrCode,
  Bot, Wand2, Layers, ArrowDown, ExternalLink,
  CheckCircle, Palette, Code, Smartphone, Video,
  ShoppingCart, Heart, MessageCircle, Mail, Phone,
  MapPin, Calendar, TrendingUp, Award, Users, Clock
} from 'lucide-react'

// Types
interface Template {
  id: string
  name: string
  category: string
  subcategory: string
  style: string
  colorScheme: string
  layout: string
  features: string[]
  technologies: string[]
  tags: string[]
  premium: boolean
  popular: boolean
  image: string
  description: string
  longDescription?: string
  caseStudy?: {
    challenge: string
    solution: string
    results: string[]
  }
}

interface Category {
  id: string
  name: string
  icon: string
  subcategories: string[]
}

// Logo Component
const Logo = () => (
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

// Generate gradient based on category
const getCategoryGradient = (category: string, index: number): string => {
  const gradients: Record<string, string[]> = {
    portfolio: ['from-blue-600 to-purple-600', 'from-indigo-500 to-pink-500', 'from-cyan-500 to-blue-600'],
    ecommerce: ['from-orange-500 to-red-500', 'from-pink-500 to-rose-500', 'from-amber-500 to-orange-600'],
    business: ['from-slate-600 to-slate-800', 'from-gray-700 to-gray-900', 'from-zinc-600 to-zinc-800'],
    creative: ['from-violet-500 to-purple-600', 'from-fuchsia-500 to-pink-600', 'from-purple-500 to-indigo-600'],
    restaurant: ['from-amber-500 to-orange-600', 'from-yellow-500 to-orange-500', 'from-orange-400 to-red-500'],
    'real-estate': ['from-emerald-500 to-teal-600', 'from-green-500 to-emerald-600', 'from-teal-500 to-cyan-600'],
    education: ['from-blue-500 to-indigo-600', 'from-sky-500 to-blue-600', 'from-blue-400 to-indigo-500'],
    health: ['from-rose-500 to-pink-600', 'from-red-500 to-rose-600', 'from-pink-400 to-rose-500'],
    travel: ['from-sky-400 to-blue-500', 'from-cyan-400 to-sky-500', 'from-blue-400 to-cyan-500'],
    tech: ['from-blue-600 to-cyan-600', 'from-sky-600 to-indigo-600', 'from-indigo-500 to-violet-600'],
  }
  const categoryGradients = gradients[category] || gradients.portfolio
  return categoryGradients[index % categoryGradients.length]
}

// AI Badge Component
const AIPremiumBadge = ({ premium }: { premium: boolean }) => {
  if (!premium) return null
  return (
    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-violet-IA/80 to-gold/80 rounded-full text-xs font-bold text-white shadow-lg">
      <Sparkles className="w-3 h-3" />
      AI PREMIUM
    </div>
  )
}

// Template Card Component
const TemplateCard = ({ 
  template, 
  onSelect,
  viewMode,
  index = 0
}: { 
  template: Template
  onSelect: (template: Template) => void
  viewMode: 'grid' | 'list'
  index?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const gradient = getCategoryGradient(template.category, index)

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group relative bg-gradient-to-br from-premium-black/80 to-premium-black/40 border border-white/5 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(template)}
      >
        <div className="flex">
          <div className="w-72 h-48 relative overflow-hidden flex-shrink-0">
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <Layout className="w-16 h-16 text-white/80 mx-auto mb-2" />
                <span className="text-white/70 text-xs font-medium">{template.name}</span>
              </div>
            </div>
            <AIPremiumBadge premium={template.premium} />
            {template.popular && (
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-gold/80 rounded-full text-xs font-bold text-black">
                <Star className="w-3 h-3 fill-current" />
                POPULAR
              </div>
            )}
          </div>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-violet-IA/20 text-violet-IA text-xs rounded-full capitalize">
                  {template.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                {template.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">{template.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-wrap gap-1">
                {template.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => onSelect(template)}
                className="px-4 py-2 bg-gold hover:bg-gold/80 text-black font-semibold rounded-lg transition-all hover:scale-105"
              >
                Voir détails
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-gradient-to-br from-premium-black/80 to-premium-black/40 border border-white/5 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(template)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <Layout className="w-20 h-20 text-white/70 group-hover:scale-110 transition-transform duration-500" />
            <span className="text-white/70 text-xs font-medium mt-2 block">{template.category}</span>
          </div>
        </div>
        
        <AIPremiumBadge premium={template.premium} />
        
        {template.popular && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-gold/80 rounded-full text-xs font-bold text-black">
            <Star className="w-3 h-3 fill-current" />
            POPULAR
          </div>
        )}

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); onSelect(template); }}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all hover:scale-110"
                title="Voir les détails"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onSelect(template); }}
                className="p-3 bg-gold hover:bg-gold/80 rounded-full text-black transition-all hover:scale-110"
                title="Personnaliser"
              >
                <Zap className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  navigator.clipboard.writeText(`${window.location.origin}/ai-portfolio?id=${template.id}`); 
                  alert('Lien copié!'); 
                }}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all hover:scale-110"
                title="Partager"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-violet-IA/20 text-violet-IA text-xs rounded-full capitalize">
            {template.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold transition-colors line-clamp-1">
          {template.name}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-2 mb-3">{template.description}</p>
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-white/5 text-gray-500 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Full Screen Viewer Component
const FullScreenViewer = ({ 
  template, 
  onClose 
}: { 
  template: Template
  onClose: () => void
}) => {
  const router = useRouter()
  const [zoom, setZoom] = useState(1)
  const [showInfo, setShowInfo] = useState(true)
  const gradient = getCategoryGradient(template.category, 0)

  const handleCustomize = () => {
    // Navigate to customization page or open modal
    alert(`Personnalisation de: ${template.name}\n\nCette fonctionnalité vous permettra de customize ce template avec vos couleurs, logos et contenu.`)
  }

  const handleQuote = () => {
    // Navigate to quote page with template info
    router.push(`/quote?template=${template.id}&type=template`)
  }

  const handleDownloadPDF = () => {
    // Generate and download PDF brochure
    alert(`Téléchargement de la brochure PDF pour: ${template.name}\n\nCette brochure contient tous les détails du template, les captures d'écran et les informations techniques.`)
  }

  const handleShareQR = () => {
    // Generate QR code for sharing
    const shareUrl = `${window.location.origin}/ai-portfolio?template=${template.id}`
    navigator.clipboard.writeText(shareUrl)
    alert(`Lien copié: ${shareUrl}\n\nVous pouvez maintenant partager ce template!`)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + 0.25, 3))
      if (e.key === '-') setZoom(z => Math.max(z - 0.25, 0.5))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: template.name, text: template.description })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex"
    >
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white">{template.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))} className="p-2 bg-white/10 rounded-full text-white">
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(z + 0.25, 3))} className="p-2 bg-white/10 rounded-full text-white">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button onClick={() => setShowInfo(!showInfo)} className={`p-2 rounded-full ${showInfo ? 'bg-gold text-black' : 'bg-white/10 text-white'}`}>
              <Star className="w-5 h-5" />
            </button>
            <button onClick={handleShare} className="p-2 bg-white/10 rounded-full text-white">
              <Share2 className="w-5 h-5" />
            </button>
            <button onClick={handleShareQR} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
              <QrCode className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center p-20">
          <motion.div style={{ scale: zoom }} className={`w-full h-full max-w-6xl bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center relative`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center">
              <Layout className="w-32 h-32 text-white/70" />
              <p className="text-white/70 mt-4 text-xl font-medium">{template.name}</p>
              <p className="text-white/50 text-sm capitalize">{template.category} • {template.style}</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button className="p-3 bg-white/10 rounded-full text-white"><ArrowLeft className="w-5 h-5" /></button>
          <div className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">1 / 1</div>
          <button className="p-3 bg-white/10 rounded-full text-white"><ArrowRight className="w-5 h-5" /></button>
        </div>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full bg-premium-black/95 border-l border-white/10 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-violet-IA/20 text-violet-IA text-sm rounded-full capitalize">{template.category}</span>
                {template.premium && (
                  <span className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />AI Premium
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">{template.name}</h1>
              <p className="text-gray-300 mb-6">{template.description}</p>

              {template.longDescription && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">À propos</h3>
                  <p className="text-gray-400 text-sm">{template.longDescription}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Style & Configuration</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Style</span>
                    <span className="text-white capitalize">{template.style}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Couleurs</span>
                    <span className="text-white capitalize">{template.colorScheme}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Layout</span>
                    <span className="text-white capitalize">{template.layout}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {template.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-electric/10 text-blue-electric text-sm rounded-full">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Fonctionnalités</h3>
                <div className="grid grid-cols-2 gap-2">
                  {template.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className="capitalize">{feature.replace(/-/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {template.caseStudy && (
                <div className="mb-6 p-4 bg-gradient-to-r from-violet-IA/10 to-gold/10 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Étude de Cas</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Défi</span>
                      <p className="text-white text-sm">{template.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Solution</span>
                      <p className="text-white text-sm">{template.caseStudy.solution}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Résultats</span>
                      <ul className="text-green-400 text-sm space-y-1">
                        {template.caseStudy.results.map((result, i) => (
                          <li key={i}>✓ {result}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mt-6">
                <button 
                  onClick={handleCustomize}
                  className="w-full py-3 bg-gold hover:bg-gold/80 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                  <Wand2 className="w-5 h-5" />Personnaliser ce template
                </button>
                <button 
                  onClick={handleQuote}
                  className="w-full py-3 bg-gradient-to-r from-violet-IA to-purple-600 hover:from-violet-IA/80 hover:to-purple-600/80 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                  <Bot className="w-5 h-5" />Demander un devis IA
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  className="w-full py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <FileText className="w-5 h-5" />Télécharger la brochure PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Page
export default function AIPortfolioPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filters, setFilters] = useState<{ categories: Category[]; styles: { id: string; name: string }[]; layouts: { id: string; name: string }[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const fetchTemplates = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      if (selectedCategory) params.set('category', selectedCategory)
      if (selectedStyle) params.set('style', selectedStyle)
      if (showPremiumOnly) params.set('premium', 'true')
      if (showPopularOnly) params.set('popular', 'true')
      params.set('page', page.toString())
      params.set('limit', '20')
      params.set('sortBy', sortBy)

      const response = await fetch(`/api/templates?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setTemplates(data.data.templates)
        setFilters(data.data.filters)
        setTotalPages(data.data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedCategory, selectedStyle, showPremiumOnly, showPopularOnly, page, sortBy])

  useEffect(() => { fetchTemplates() }, [fetchTemplates])

  const activeFiltersCount = [selectedCategory, selectedStyle, showPremiumOnly, showPopularOnly].filter(Boolean).length

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedStyle(null)
    setShowPremiumOnly(false)
    setShowPopularOnly(false)
    setPage(1)
  }

  return (
    <main className="min-h-screen bg-premium-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-premium-black/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Logo />
              <div>
                <span className="text-xl font-bold gold-text">AI Portfolio</span>
                <span className="text-xs text-gray-500 block">Enterprise Center</span>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link>
              <Link href="/ai-team" className="text-gray-400 hover:text-white transition-colors">Équipe IA</Link>
              <Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Link>
              <Link href="/login" className="hidden md:flex px-4 py-2 bg-gold hover:bg-gold/80 text-black font-semibold rounded-lg">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-IA/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[128px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-IA/10 border border-violet-IA/30 rounded-full text-violet-IA text-sm mb-6">
              <Sparkles className="w-4 h-4" />Plus de 500 templates premium
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI Portfolio <span className="gold-text">Center</span>
              <br /><span className="text-3xl md:text-5xl">Enterprise</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Créez un portfolio professionnel avec l&apos;IA. Générez automatiquement vos aperçus, mockups et demandez des devis instantanés.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-gold hover:bg-gold/80 text-black font-bold rounded-xl flex items-center gap-2">
                <Wand2 className="w-5 h-5" />Générer avec l&apos;IA
              </button>
              <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-semibold rounded-xl flex items-center gap-2">
                <Layers className="w-5 h-5" />Explorer les templates
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Layout, value: '500+', label: 'Templates' },
              { icon: Sparkles, value: 'IA', label: 'Génération Auto' },
              { icon: Zap, value: '10s', label: 'Génération' },
              { icon: Star, value: '100%', label: 'Responsive' }
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-premium-black/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Rechercher un template..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {filters && (
                <>
                  <select value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value || null)} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm">
                    <option value="">Toutes catégories</option>
                    {filters.categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                  <select value={selectedStyle || ''} onChange={(e) => setSelectedStyle(e.target.value || null)} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm">
                    <option value="">Tous styles</option>
                    {filters.styles.map((style) => <option key={style.id} value={style.id}>{style.name}</option>)}
                  </select>
                </>
              )}
              <button onClick={() => setShowPremiumOnly(!showPremiumOnly)} className={`px-4 py-3 border rounded-xl text-sm ${showPremiumOnly ? 'bg-violet-IA/20 border-violet-IA text-violet-IA' : 'border-white/10 text-gray-400'}`}>
                <Sparkles className="w-4 h-4 inline mr-1" />Premium
              </button>
              <button onClick={() => setShowPopularOnly(!showPopularOnly)} className={`px-4 py-3 border rounded-xl text-sm ${showPopularOnly ? 'bg-gold/20 border-gold text-gold' : 'border-white/10 text-gray-400'}`}>
                <Star className="w-4 h-4 inline mr-1" />Popular
              </button>
              {activeFiltersCount > 0 && <button onClick={clearFilters} className="px-4 py-3 text-red-400 text-sm">Réinitialiser ({activeFiltersCount})</button>}
            </div>

            <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
              <Filter className="w-5 h-5" />Filtres
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gold text-black' : 'text-gray-400'}`}><Grid className="w-5 h-5" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gold text-black' : 'text-gray-400'}`}><List className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <div key={i} className="aspect-[4/3] bg-white/5 animate-pulse rounded-xl"></div>)}
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-20">
              <Layout className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucun template trouvé</h3>
              <button onClick={clearFilters} className="px-6 py-3 bg-gold text-black font-semibold rounded-xl">Réinitialiser</button>
            </div>
          ) : (
            <motion.div layout className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              <AnimatePresence mode="popLayout">
                {templates.map((template, idx) => <TemplateCard key={template.id} template={template} onSelect={setSelectedTemplate} viewMode={viewMode} index={idx} />)}
              </AnimatePresence>
            </motion.div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 bg-white/5 rounded-lg text-white disabled:opacity-50"><ArrowLeft className="w-5 h-5" /></button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-lg font-semibold ${page === i + 1 ? 'bg-gold text-black' : 'bg-white/5 text-white'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 bg-white/5 rounded-lg text-white disabled:opacity-50"><ArrowRight className="w-5 h-5" /></button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedTemplate && <FullScreenViewer template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © 2026 Graphisme by ELECTRON. Tous droits réservés.
        </div>
      </footer>
    </main>
  )
}
