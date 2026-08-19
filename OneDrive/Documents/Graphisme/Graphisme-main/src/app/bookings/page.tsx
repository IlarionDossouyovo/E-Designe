'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react'

const servicesList = [
  { id: 'consultation', name: 'Consultation Gratuite', duration: '30 min', price: 'Gratuit' },
  { id: 'logo', name: 'Création de Logo', duration: '1h', price: '25 000 XOF' },
  { id: 'website', name: 'Site Web', duration: '2h', price: '150 000 XOF' },
  { id: 'video', name: 'Production Vidéo', duration: '3h', price: '100 000 XOF' },
  { id: 'maintenance', name: 'Maintenance', duration: '1h', price: '20 000 XOF' },
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: '',
    time: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: selectedService
        })
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'Erreur lors de la réservation')
      }
    } catch (err) {
      setError('Erreur de connexion')
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
          <h2 className="text-2xl font-bold text-white mb-2">Réservation Confirmée!</h2>
          <p className="text-gray-400 mb-4">
            Nous avons reçu votre demande. Nous vous contacterons sous 24h pour confirmer votre rendez-vous.
          </p>
          <button
            onClick={() => {
              setSuccess(false)
              setStep(1)
              setSelectedService('')
              setFormData({ clientName: '', clientEmail: '', clientPhone: '', date: '', time: '', notes: '' })
            }}
            className="bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90"
          >
            Nouvelle Réservation
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Réserver un <span className="text-gold">Service</span>
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Choisissez un service et sélectionnez une date
        </p>

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

        <div className="glass-card p-8">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold text-white mb-4">1. Choisissez un Service</h2>
              <div className="space-y-3">
                {servicesList.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedService === service.id
                        ? 'bg-gold/20 border-2 border-gold'
                        : 'bg-white/5 border-2 border-transparent hover:border-gold/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-semibold">{service.name}</h3>
                        <p className="text-gray-400 text-sm">{service.duration}</p>
                      </div>
                      <span className="text-gold font-bold">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => selectedService && setStep(2)}
                disabled={!selectedService}
                className="w-full mt-6 bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
              >
                Continuer
              </button>
            </motion.div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold text-white mb-4">2. Date et Heure</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Horaire préféré
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="">Sélectionner</option>
                    <option value="09:00">09h00</option>
                    <option value="10:00">10h00</option>
                    <option value="11:00">11h00</option>
                    <option value="14:00">14h00</option>
                    <option value="15:00">15h00</option>
                    <option value="16:00">16h00</option>
                    <option value="17:00">17h00</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20"
                >
                  Retour
                </button>
                <button
                  onClick={() => formData.date && formData.time && setStep(3)}
                  disabled={!formData.date || !formData.time}
                  className="flex-1 bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
                >
                  Continuer
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold text-white mb-4">3. Vos Coordonnées</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    <User className="w-4 h-4 inline mr-1" />
                    Nom complet
                  </label>
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
                  <label className="text-gray-400 text-sm mb-2 block">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
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
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                    placeholder="+229 XX XX XX XX"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Notes (optionnel)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50"
                    placeholder="Détails supplémentaires..."
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-xl">
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
                    className="flex-1 bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 disabled:opacity-50"
                  >
                    {loading ? 'Envoi...' : 'Confirmer la Réservation'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
