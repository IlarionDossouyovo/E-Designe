'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, CheckCircle, TrendingUp, Users, Globe, Mail, Phone, Building } from 'lucide-react'

const partnerTypes = [
  {
    id: 'referral',
    name: 'Partenaire de Parrainage',
    icon: Users,
    commission: '10%',
    description: 'Gagnez des commissions en recommandant nos services',
    benefits: ['10% sur chaque commande', 'Suivi des clients', 'Paiements mensuels']
  },
  {
    id: 'reseller',
    name: 'Revendeur',
    icon: Globe,
    commission: '20%',
    description: 'Revendez nos services avec votre propre marge',
    benefits: ['20% de commission', 'Support dédié', 'Formation gratuite', 'Accès API']
  },
  {
    id: 'franchise',
    name: 'Franchisé',
    icon: Building,
    commission: '30%',
    description: 'Ouvrez une franchise Graphisme dans votre ville',
    benefits: ['30% sur CA', 'Marquequée', 'Formation complète', 'Support premium']
  }
]

export default function PartnersPage() {
  const [selectedType, setSelectedType] = useState('')
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    type: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
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
          <h2 className="text-2xl font-bold text-white mb-2">Candidature Envoyée!</h2>
          <p className="text-gray-400 mb-4">
            Merci pour votre intérêt! Notre équipe vous contactera sous 48h pour discuter des détails.
          </p>
          <button
            onClick={() => {
              setSuccess(false)
              setFormData({ companyName: '', contactName: '', email: '', phone: '', type: '' })
            }}
            className="bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90"
          >
            Retour
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Programme <span className="text-gold">Partenaires</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Rejoignez notre réseau de partenaires et gagnez des commissions en recommandant nos services
        </p>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedType(type.id)
                setFormData({ ...formData, type: type.id })
              }}
              className={`glass-card p-6 cursor-pointer transition-all ${
                selectedType === type.id ? 'border-2 border-gold' : 'hover:border-gold/30'
              }`}
            >
              <type.icon className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{type.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{type.description}</p>
              <div className="text-3xl font-bold text-gold mb-4">{type.commission}</div>
              <ul className="space-y-2">
                {type.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 text-center">
            <Users className="w-10 h-10 text-gold mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-gray-400">Partenaires actifs</p>
          </div>
          <div className="glass-card p-6 text-center">
            <TrendingUp className="w-10 h-10 text-gold mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">10M XOF</p>
            <p className="text-gray-400">Revenus partenaires</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Handshake className="w-10 h-10 text-gold mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">4.9/5</p>
            <p className="text-gray-400">Note moyenne</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Devenir Partenaire
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Nom de l'entreprise</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Nom du contact</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                  placeholder="Votre nom"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                  placeholder="+229 XX XX XX XX"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Type de partenariat</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
              >
                <option value="">Sélectionner</option>
                {partnerTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.type}
              className="w-full bg-gold text-black py-4 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
            >
              {loading ? 'Envoi...' : 'Soumettre ma Candidature'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
