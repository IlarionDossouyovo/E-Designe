'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, Send, CheckCircle, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

interface Testimonial {
  id: string
  name: string
  company?: string
  role?: string
  content: string
  rating: number
  service: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    content: '',
    rating: 5,
    service: ''
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials?approved=true')
      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setShowForm(false)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-gold fill-gold' : 'text-gray-600'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto mb-8">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
          <Home className="w-5 h-5" />
          Accueil
        </Link>
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Témoignages <span className="text-gold">Clients</span>
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Ce que nos clients disent de nous
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <p className="text-4xl font-bold text-gold">{testimonials.length}</p>
            <p className="text-gray-400">Témoignages</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-6 h-6 text-gold fill-gold" />
              <p className="text-4xl font-bold text-gold">4.8</p>
            </div>
            <p className="text-gray-400">Note moyenne</p>
          </div>
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gold text-black px-8 py-3 rounded-xl font-bold hover:bg-gold/90"
          >
            Donner mon Avis
          </button>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-gold/20" />
                
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  {testimonial.role && (
                    <p className="text-gray-400 text-sm">
                      {testimonial.role}
                      {testimonial.company && ` - ${testimonial.company}`}
                    </p>
                  )}
                  <p className="text-gold text-xs mt-1">{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Submit Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative glass-card p-8 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Merci!</h3>
                  <p className="text-gray-400">
                    Votre témoignage a été envoyé et sera publié après modération.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setShowForm(false)
                    }}
                    className="mt-6 bg-gold text-black px-6 py-3 rounded-xl font-bold"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Donner mon Avis</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Nom *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Entreprise</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Note *</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= formData.rating
                                  ? 'text-gold fill-gold'
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Votre témoignage *</label>
                      <textarea
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        placeholder="Partagez votre expérience..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? 'Envoi...' : <><Send className="w-5 h-5" /> Envoyer</>}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
