'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Share2, Instagram, Facebook, Youtube, Twitter, Linkedin,
  Clock, Send, Image as ImageIcon, Calendar, CheckCircle, XCircle, Plus,
  Trash2, Edit, RefreshCw, Zap
} from 'lucide-react'

interface SocialPost {
  id: string
  content: string
  platforms: string[]
  scheduledAt?: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  media?: string[]
  createdAt: string
}

const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', icon: Zap, color: '#000000' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#1DA1F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
  { id: 'whatsapp', name: 'WhatsApp', icon: Share2, color: '#25D366' },
]

export default function SocialMediaPage() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null)
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as string[],
    scheduledAt: '',
    media: ''
  })
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/social/schedule')
      const data = await res.json().catch(() => ({ posts: [] }))
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlatformToggle = (platformId: string) => {
    setNewPost(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }))
  }

  const handleSubmit = async () => {
    if (!newPost.content || newPost.platforms.length === 0) {
      alert('Veuillez écrire un message et sélectionner au moins une plateforme')
      return
    }

    setPosting(true)
    try {
      const postData = {
        content: newPost.content,
        platforms: newPost.platforms,
        scheduledAt: newPost.scheduledAt || null,
        media: newPost.media ? newPost.media.split(',').map(m => m.trim()) : []
      }

      if (editingPost) {
        await fetch(`/api/social/schedule?id=${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        })
      } else {
        await fetch('/api/social/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        })
      }

      setShowModal(false)
      setEditingPost(null)
      setNewPost({ content: '', platforms: [], scheduledAt: '', media: '' })
      fetchPosts()
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setPosting(false)
    }
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce post?')) return
    
    try {
      await fetch(`/api/social/schedule?id=${postId}`, {
        method: 'DELETE'
      })
      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handlePublishNow = async (postId: string) => {
    try {
      await fetch('/api/social/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      })
      fetchPosts()
    } catch (error) {
      console.error('Error publishing post:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-400" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />
      default: return <Edit className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publié'
      case 'scheduled': return 'Programmé'
      case 'failed': return 'Échoué'
      default: return 'Brouillon'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Share2 className="w-8 h-8 text-gold" />
              Réseaux Sociaux
            </h1>
            <p className="text-gray-400 mt-2">
              Planifiez et publiez sur vos réseaux sociaux
            </p>
          </div>
          
          <button
            onClick={() => {
              setEditingPost(null)
              setNewPost({ content: '', platforms: [], scheduledAt: '', media: '' })
              setShowModal(true)
            }}
            className="flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nouveau Post
          </button>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {PLATFORMS.map((platform) => (
            <motion.div
              key={platform.id}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-4 text-center cursor-pointer hover:border-gold/30"
              onClick={() => handlePlatformToggle(platform.id)}
            >
              <platform.icon className="w-8 h-8 mx-auto mb-2" style={{ color: platform.color }} />
              <p className="text-white text-sm font-medium">{platform.name}</p>
              <p className="text-gray-500 text-xs">
                {posts.filter(p => p.platforms.includes(platform.id)).length} posts
              </p>
            </motion.div>
          ))}
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Publications</h2>
          
          {posts.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Share2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aucune publication</h3>
              <p className="text-gray-400">
                Créez votre premier post pour commencer à publier sur les réseaux sociaux
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {post.platforms.map((platformId) => {
                        const platform = PLATFORMS.find(p => p.id === platformId)
                        if (!platform) return null
                        return (
                          <platform.icon
                            key={platformId}
                            className="w-5 h-5"
                            style={{ color: platform.color }}
                          />
                        )
                      })}
                      <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                        post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                        post.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {getStatusIcon(post.status)}
                        {getStatusLabel(post.status)}
                      </span>
                    </div>
                    
                    <p className="text-white mb-3">{post.content}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {post.scheduledAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.scheduledAt).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {post.status === 'draft' || post.status === 'scheduled' ? (
                      <button
                        onClick={() => handlePublishNow(post.id)}
                        className="p-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30"
                        title="Publier maintenant"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    ) : null}
                    <button
                      onClick={() => {
                        setEditingPost(post)
                        setNewPost({
                          content: post.content,
                          platforms: post.platforms,
                          scheduledAt: post.scheduledAt || '',
                          media: post.media?.join(', ') || ''
                        })
                        setShowModal(true)
                      }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative glass-card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingPost ? 'Modifier le post' : 'Nouveau post'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Platform Selection */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">Plateformes</label>
                <div className="flex flex-wrap gap-3">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        newPost.platforms.includes(platform.id)
                          ? 'border-gold bg-gold/20 text-white'
                          : 'border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <platform.icon className="w-4 h-4" style={{ color: platform.color }} />
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">Message</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Qu'allez-vous publier aujourd'hui?"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 resize-none"
                />
                <p className="text-gray-500 text-xs mt-1">
                  {newPost.content.length} caractères
                </p>
              </div>

              {/* Media URLs */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Médias (URLs séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={newPost.media}
                  onChange={(e) => setNewPost({ ...newPost, media: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
                />
              </div>

              {/* Schedule */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Programmer (laisser vide pour publier maintenant)
                </label>
                <input
                  type="datetime-local"
                  value={newPost.scheduledAt}
                  onChange={(e) => setNewPost({ ...newPost, scheduledAt: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={posting}
                  className="flex-1 flex items-center justify-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
                >
                  {posting ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {editingPost ? 'Mettre à jour' : 'Publier'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
