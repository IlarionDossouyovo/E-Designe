'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Megaphone, Plus, Search, Filter, Bell, AlertCircle, 
  CheckCircle, Info, X, Calendar, Eye, Tag, ArrowLeft, Home
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  type: string
  priority: string
  author: string
  categories: string[]
  active: boolean
  views: number
  createdAt: string
}

const typeColors: Record<string, string> = {
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  success: 'bg-green-500/20 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  promotion: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  event: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
}

const typeIcons: Record<string, any> = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
  promotion: Megaphone,
  event: Calendar
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'info',
    priority: 'medium',
    author: 'Administration',
    categories: ''
  })

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements?active=true')
      const data = await res.json()
      setAnnouncements(data.announcements || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAnnouncement,
          categories: newAnnouncement.categories.split(',').map(c => c.trim())
        })
      })
      const data = await res.json()
      if (data.success) {
        setAnnouncements([data.announcement, ...announcements])
        setShowNew(false)
        setNewAnnouncement({
          title: '', content: '', type: 'info', priority: 'medium',
          author: 'Administration', categories: ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredAnnouncements = announcements.filter(a => {
    if (filter !== 'all' && a.type !== filter) return false
    if (searchTerm && !a.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !a.content.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const stats = {
    total: announcements.length,
    active: announcements.filter(a => a.active).length,
    totalViews: announcements.reduce((sum, a) => sum + a.views, 0)
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <Home className="w-5 h-5" />
            Accueil
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              <Megaphone className="inline w-10 h-10 mr-3 text-gold" />
              Annonces <span className="text-gold">Graphisme</span>
            </h1>
            <p className="text-gray-400">Toutes les nouvelles et mises à jour de l'entreprise</p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="bg-gold text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gold/90"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Annonce
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6">
            <p className="text-3xl font-bold text-white">{stats.total}</p>
            <p className="text-gray-400">Total Annonces</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-3xl font-bold text-green-400">{stats.active}</p>
            <p className="text-gray-400">Actives</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-3xl font-bold text-gold">{stats.totalViews}</p>
            <p className="text-gray-400">Vues Totales</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />
            </div>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          >
            <option value="all">Tous les types</option>
            <option value="info">Info</option>
            <option value="success">Succès</option>
            <option value="warning">Avertissement</option>
            <option value="error">Erreur</option>
            <option value="promotion">Promotion</option>
            <option value="event">Événement</option>
          </select>
        </div>

        {/* Announcements Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredAnnouncements.map((announcement) => {
                const Icon = typeIcons[announcement.type] || Info
                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`glass-card p-6 border ${typeColors[announcement.type]}`}
                    onClick={() => setSelectedAnnouncement(announcement)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${typeColors[announcement.type]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{announcement.title}</h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{announcement.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {announcement.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(announcement.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {announcement.categories.map((cat) => (
                            <span key={cat} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* New Announcement Modal */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowNew(false)}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative glass-card p-8 w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Nouvelle Annonce</h2>
                <form onSubmit={createAnnouncement} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Titre *"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    required
                  />
                  <textarea
                    placeholder="Contenu *"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={newAnnouncement.type}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    >
                      <option value="info">Info</option>
                      <option value="success">Succès</option>
                      <option value="warning">Avertissement</option>
                      <option value="error">Erreur</option>
                      <option value="promotion">Promotion</option>
                      <option value="event">Événement</option>
                    </select>
                    <select
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Catégories (séparées par virgule)"
                    value={newAnnouncement.categories}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, categories: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90"
                  >
                    Publier l'Annonce
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
