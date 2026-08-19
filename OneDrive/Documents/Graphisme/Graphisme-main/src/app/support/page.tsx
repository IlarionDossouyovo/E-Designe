'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, Send, X, CheckCircle, Clock, AlertCircle, Plus, ArrowLeft, Home } from 'lucide-react'

interface Message {
  id: string
  content: string
  from: 'user' | 'support'
  createdAt: string
}

interface Ticket {
  id: string
  subject: string
  category: string
  priority: string
  status: string
  messages: Message[]
  createdAt: string
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // New ticket form
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    subject: '',
    category: '',
    message: ''
  })

  useEffect(() => {
    // Try to get user email from localStorage or session
    const savedEmail = localStorage.getItem('userEmail') || ''
    if (savedEmail) setUserEmail(savedEmail)
    fetchTickets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail])

  const fetchTickets = async () => {
    if (!userEmail) return
    try {
      const res = await fetch(`/api/tickets?email=${encodeURIComponent(userEmail)}`)
      const data = await res.json()
      setTickets(data.tickets || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      localStorage.setItem('userEmail', formData.userEmail)
      setUserEmail(formData.userEmail)

      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        setShowNewTicket(false)
        setFormData({ userName: '', userEmail: '', subject: '', category: '', message: '' })
        fetchTickets()
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!selectedTicket || !newMessage.trim()) return

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          message: newMessage
        })
      })

      const data = await res.json()
      if (data.success) {
        setNewMessage('')
        setSelectedTicket(data.ticket)
        fetchTickets()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400 bg-green-500/20'
      case 'pending': return 'text-yellow-400 bg-yellow-500/20'
      case 'resolved': return 'text-blue-400 bg-blue-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Retour</span>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Support <span className="text-gold">Client</span>
              </h1>
              <p className="text-gray-400 mt-2">
                Nous sommes là pour vous aider
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Home className="w-4 h-4 text-white" />
            </Link>
            <button
              onClick={() => setShowNewTicket(true)}
              className="flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90"
            >
              <Plus className="w-5 h-5" />
              Nouveau Ticket
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4">
              <h2 className="text-lg font-bold text-white mb-4">Mes Tickets</h2>
              
              {tickets.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">Aucun ticket</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`w-full p-3 rounded-xl text-left transition-all ${
                        selectedTicket?.id === ticket.id
                          ? 'bg-gold/20 border border-gold'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <h3 className="text-white font-medium text-sm truncate">{ticket.subject}</h3>
                      <p className="text-gray-500 text-xs">{ticket.messages.length} messages</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="glass-card p-4 h-[500px] flex flex-col">
              {selectedTicket ? (
                <>
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <h2 className="text-lg font-bold text-white">{selectedTicket.subject}</h2>
                    <p className="text-gray-400 text-sm">{selectedTicket.category} • {selectedTicket.priority}</p>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {selectedTicket.messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-xl ${
                          msg.from === 'user'
                            ? 'bg-gold text-black'
                            : 'bg-white/10 text-white'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-black/60' : 'text-gray-500'}`}>
                            {new Date(msg.createdAt).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Tapez votre message..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gold text-black px-4 rounded-xl hover:bg-gold/90 disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Sélectionnez un ticket pour voir la conversation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Ticket Modal */}
        {showNewTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTicket(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative glass-card p-8 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowNewTicket(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">Nouveau Ticket</h2>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Nom *</label>
                    <input
                      type="text"
                      required
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.userEmail}
                      onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Sujet *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Catégorie *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Technique">Technique</option>
                    <option value="Facturation">Facturation</option>
                    <option value="Commande">Commande</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
                >
                  {loading ? 'Envoi...' : 'Créer le Ticket'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
