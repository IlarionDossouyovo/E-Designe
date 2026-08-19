'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle, AlertCircle, FileText, Calendar, DollarSign, ArrowLeft, Home, Sparkles, Layout } from 'lucide-react'

// Component to handle search params
function QuoteFormWithParams() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  const templateType = searchParams.get('type')
  
  const [templateInfo, setTemplateInfo] = useState<any>(null)
  const [loadingTemplate, setLoadingTemplate] = useState(false)

  // Fetch template info if template ID is provided
  useEffect(() => {
    if (templateId && templateType === 'template') {
      setLoadingTemplate(true)
      fetch(`/api/templates?limit=1&search=${templateId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.templates.length > 0) {
            setTemplateInfo(data.data.templates[0])
          }
        })
        .catch(err => console.error('Error fetching template:', err))
        .finally(() => setLoadingTemplate(false))
    }
  }, [templateId, templateType])

  return <QuoteForm templateInfo={templateInfo} loadingTemplate={loadingTemplate} />
}

const projectTypes = [
  { id: 'logo', name: 'Logo & Identité', icon: '🎨' },
  { id: 'website', name: 'Site Web', icon: '💻' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'mobile', name: 'Application Mobile', icon: '📱' },
  { id: 'print', name: 'Design Print', icon: '📄' },
  { id: 'video', name: 'Production Vidéo', icon: '🎬' },
  { id: 'other', name: 'Autre', icon: '💡' }
]

const budgetRanges = [
  'Moins de 50 000 XOF',
  '50 000 - 100 000 XOF',
  '100 000 - 250 000 XOF',
  '250 000 - 500 000 XOF',
  '500 000 - 1 000 000 XOF',
  'Plus de 1 000 000 XOF'
]

// Component with template support
function QuoteForm({ templateInfo, loadingTemplate }: { templateInfo?: any; loadingTemplate?: boolean }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    projectType: templateInfo ? 'website' : '',
    description: templateInfo ? `Demande de devis pour le template: ${templateInfo.name}\n\nCatégorie: ${templateInfo.category}\nStyle: ${templateInfo.style}\n\n` : '',
    budget: '',
    deadline: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    company: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Map form data to API format
      const apiData = {
        title: `${formData.projectType || 'Projet'} - ${formData.clientName || 'Client'}`,
        description: formData.description,
        service: formData.projectType || 'website',
        amount: parseBudgetToAmount(formData.budget),
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        company: formData.company,
        deadline: formData.deadline
      }

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Erreur lors de l\'envoi')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  // Helper to convert budget string to number
  const parseBudgetToAmount = (budget: string): number => {
    if (!budget) return 0
    const match = budget.match(/(\d+)/)
    if (match) {
      const num = parseInt(match[1])
      // Convert XOF to the amount (multiply for proper value)
      return num * 100 // Store as XOF
    }
    return 0
  }

  if (success) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-8 max-w-md text-center"
        >
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Devis Envoyé!</h2>
          <p className="text-gray-400 mb-4">
            Nous avons reçu votre demande. Notre équipe vous contactera sous 24h avec un devis personnalisé.
          </p>
          <button
            onClick={() => {
              setSuccess(false)
              setStep(1)
              setFormData({
                projectType: '', description: '', budget: '', deadline: '',
                clientName: '', clientEmail: '', clientPhone: '', company: ''
              })
            }}
            className="bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90"
          >
            Nouveau Devis
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-3xl mx-auto">
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
          Demander un <span className="text-gold">Devis</span>
        </h1>
        
        {/* Template Info Banner */}
        {(templateInfo || loadingTemplate) && (
          <div className="mb-6 p-4 bg-gradient-to-r from-violet-IA/20 to-gold/20 rounded-xl border border-violet-IA/30">
            {loadingTemplate ? (
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gold rounded-full animate-spin"></div>
                Chargement des informations du template...
              </div>
            ) : templateInfo ? (
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Layout className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-gold text-sm font-medium">Template Sélectionné</span>
                  </div>
                  <h3 className="text-white font-bold">{templateInfo.name}</h3>
                  <p className="text-gray-400 text-sm capitalize">{templateInfo.category} • {templateInfo.style} • {templateInfo.layout}</p>
                  <div className="flex gap-2 mt-2">
                    {templateInfo.technologies?.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded">{tech}</span>
                    ))}
                  </div>
                </div>
                <Link href="/ai-portfolio" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            ) : null}
          </div>
        )}

        <p className="text-gray-400 text-center mb-8">
          Obtenez un devis gratuit sous 24h
        </p>

        <div className="glass-card p-8">
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-gold text-black' : 'bg-white/10 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-gold' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Project Type */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-white mb-4">1. Type de Projet</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type.id })}
                      className={`p-4 rounded-xl text-center transition-all ${
                        formData.projectType === type.id
                          ? 'bg-gold/20 border-2 border-gold'
                          : 'bg-white/5 border-2 border-transparent hover:border-gold/30'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{type.icon}</span>
                      <span className="text-white text-sm">{type.name}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => formData.projectType && setStep(2)}
                  disabled={!formData.projectType}
                  className="w-full bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
                >
                  Continuer
                </button>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-white mb-4">2. Détails du Projet</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      <FileText className="w-4 h-4 inline mr-1" />
                      Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                      placeholder="Décrivez votre projet en quelques mots..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                      >
                        <option value="">Sélectionner</option>
                        {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Échéance
                      </label>
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => formData.description && setStep(3)}
                    disabled={!formData.description}
                    className="flex-1 bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-white mb-4">3. Vos Coordonnées</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                        placeholder="+229 XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Entreprise</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-xl mt-4">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
                  >
                    {loading ? 'Envoi...' : <><Send className="w-5 h-5" /> Envoyer la Demande</>}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

// Default export with Suspense wrapper
export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-premium-black py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 text-center">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement...</p>
          </div>
        </div>
      </div>
    }>
      <QuoteFormWithParams />
    </Suspense>
  )
}
