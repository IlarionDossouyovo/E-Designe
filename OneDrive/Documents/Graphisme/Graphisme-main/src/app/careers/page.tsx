'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, MapPin, Clock, DollarSign, Send, CheckCircle, X, User, Mail, Phone, FileText, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  salary?: string
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    cv: '',
    coverLetter: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/careers?active=true')
      const data = await res.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob?.id,
          ...formData
        })
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-500/20 text-green-400'
      case 'part-time': return 'bg-blue-500/20 text-blue-400'
      case 'contract': return 'bg-yellow-500/20 text-yellow-400'
      case 'internship': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
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
          Carrières <span className="text-gold">Graphisme</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Rejoignez notre équipe et contribuez à transformer le digital en Afrique de l'Ouest
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-card p-6 text-center">
            <Briefcase className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{jobs.length}</p>
            <p className="text-gray-400">Postes ouverts</p>
          </div>
          <div className="glass-card p-6 text-center">
            <User className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">15+</p>
            <p className="text-gray-400">Employés</p>
          </div>
          <div className="glass-card p-6 text-center">
            <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-gray-400">Pays</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">4.9</p>
            <p className="text-gray-400">Note Glassdoor</p>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getTypeColor(job.type)}`}>
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        {job.salary && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedJob(job)
                        setShowModal(true)
                      }}
                      className="bg-gold text-black px-6 py-2 rounded-xl font-bold hover:bg-gold/90"
                    >
                      Postuler
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Application Modal */}
        <AnimatePresence>
          {showModal && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
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
                    <h3 className="text-2xl font-bold text-white mb-2">Candidature Envoyée!</h3>
                    <p className="text-gray-400 mb-6">
                      Merci pour votre intérêt! Nous examinerons votre profil et vous contacterons sous 48h.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setShowModal(false)
                        setFormData({ applicantName: '', applicantEmail: '', applicantPhone: '', cv: '', coverLetter: '' })
                      }}
                      className="bg-gold text-black px-6 py-3 rounded-xl font-bold"
                    >
                      Fermer
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-2">Postuler</h2>
                    <p className="text-gold mb-6">{selectedJob.title}</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">
                          <User className="w-4 h-4 inline mr-1" />
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.applicantName}
                          onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.applicantEmail}
                          onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={formData.applicantPhone}
                          onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">
                          <FileText className="w-4 h-4 inline mr-1" />
                          Lettre de motivation
                        </label>
                        <textarea
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                          placeholder="Pourquoi souhaitez-vous rejoindre notre équipe?"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 flex items-center justify-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Envoyer ma Candidature
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
