'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CreditCard, Smartphone, Bitcoin, Building2, Wallet, Globe,
  Check, ChevronDown, ArrowLeft, Home
} from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  type: string
  countries: string[]
  currencies: string[]
  icon: string
  description: string
  enabled: boolean
  fees: number
  processingTime: string
}

interface Country {
  code: string
  name: string
  flag: string
  currency: string
  symbol: string
}

export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('BJ')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/payments/methods')
      const data = await res.json()
      setMethods(data.methods || [])
      setCountries(data.countries || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMethods = methods.filter(m => {
    const inCountry = selectedCountry === '' || 
      m.countries.includes(selectedCountry) || 
      m.countries.includes('Tous les pays')
    const inCurrency = selectedCurrency === '' || m.currencies.includes(selectedCurrency)
    const byType = filterType === 'all' || m.type === filterType
    return inCountry && inCurrency && byType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="w-6 h-6" />
      case 'mobile_money': return <Smartphone className="w-6 h-6" />
      case 'crypto': return <Bitcoin className="w-6 h-6" />
      case 'bank': return <Building2 className="w-6 h-6" />
      case 'wallet': return <Wallet className="w-6 h-6" />
      default: return <CreditCard className="w-6 h-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'card': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'mobile_money': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'crypto': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'bank': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'wallet': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <CreditCard className="inline w-10 h-10 mr-3 text-gold" />
            Moyens de <span className="text-gold">Paiement</span>
          </h1>
          <p className="text-gray-400">Tous les moyens de paiement disponibles pour votre pays</p>
        </div>

        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Pays</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none"
                >
                  <option value="">Tous les pays</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name} ({country.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Devise</label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              >
                <option value="">Toutes les devises</option>
                <option value="XOF">XOF (CFA)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              >
                <option value="all">Tous les types</option>
                <option value="card">💳 Carte</option>
                <option value="mobile_money">📱 Mobile Money</option>
                <option value="crypto">₿ Crypto</option>
                <option value="bank">🏦 Banque</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="glass-card p-4 w-full text-center">
                <p className="text-2xl font-bold text-gold">{filteredMethods.length}</p>
                <p className="text-gray-400 text-sm">Méthodes</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-6 border ${getTypeColor(method.type)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{method.icon}</span>
                    <div>
                      <h3 className="text-white font-bold">{method.name}</h3>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(method.type)}`}>
                    {getTypeIcon(method.type)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-3">
                  <div>
                    <span className="text-gray-400">Frais: </span>
                    <span className="text-gold font-bold">{method.fees}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Délai: </span>
                    <span className="text-white">{method.processingTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {method.currencies.slice(0, 3).map((curr) => (
                    <span key={curr} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
                      {curr}
                    </span>
                  ))}
                </div>

                {method.enabled && (
                  <div className="mt-3 flex items-center gap-1 text-green-400 text-sm">
                    <Check className="w-4 h-4" />
                    <span>Disponible</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
