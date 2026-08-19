'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, DollarSign, Gift, TrendingUp, CheckCircle, Clock, 
  XCircle, Copy, ExternalLink, Award
} from 'lucide-react'

interface Referral {
  id: string
  referrerEmail: string
  referredEmail: string
  commission: number
  status: 'pending' | 'approved' | 'paid'
  createdAt: string
}

export default function AffiliationPage() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    paid: 0,
    totalCommission: 0
  })
  const [loading, setLoading] = useState(true)
  const [affiliateLink, setAffiliateLink] = useState('')

  useEffect(() => {
    fetchAffiliates()
  }, [])

  const fetchAffiliates = async () => {
    try {
      const res = await fetch('/api/affiliation?type=all')
      const data = await res.json()
      setReferrals(data.referrals || [])
      setStats(data.stats || { total: 0, pending: 0, approved: 0, paid: 0, totalCommission: 0 })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (referralId: string, status: string) => {
    try {
      await fetch('/api/affiliation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralId, status })
      })
      fetchAffiliates()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`${affiliateLink}?ref=${code}`)
    alert('Lien copié!')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />
      case 'paid': return <Award className="w-4 h-4 text-gold" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé'
      case 'pending': return 'En attente'
      case 'paid': return 'Payé'
      default: return status
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-gold" />
            Programme d'Affiliation
          </h1>
          <p className="text-gray-400 mt-2">
            Gérez votre programme de parrainage et vos commissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Parrainages"
            value={stats.total}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="En Attente"
            value={stats.pending}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Approuvés"
            value={stats.approved}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Commissions Totales"
            value={`${stats.totalCommission.toLocaleString()} XOF`}
            icon={DollarSign}
            color="gold"
          />
        </div>

        {/* How it works */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-gold" />
            Comment fonctionne le programme?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gold font-bold text-xl">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Partagez votre lien</h3>
              <p className="text-gray-400 text-sm">
                Vos clients partagent leur lien de parrainage avec leurs contacts
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gold font-bold text-xl">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Vos filleuls commandent</h3>
              <p className="text-gray-400 text-sm">
                Quand un filleul passe une commande, vous gagnez une commission
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gold font-bold text-xl">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Vous êtes payé</h3>
              <p className="text-gray-400 text-sm">
                Recevez 10% de commission sur chaque commande de vos filleuls
              </p>
            </div>
          </div>
        </div>

        {/* Referrals List */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Historique des Parrainages
          </h2>
          
          {referrals.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aucun parrainage</h3>
              <p className="text-gray-400">
                Les parrainages apparaîtront ici
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Parrain</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Filleul</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Commission</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Statut</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Date</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">{referral.referrerEmail}</td>
                      <td className="py-3 px-4 text-white">{referral.referredEmail}</td>
                      <td className="py-3 px-4 text-gold font-bold">
                        {referral.commission.toLocaleString()} XOF
                      </td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                          referral.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          referral.status === 'paid' ? 'bg-gold/20 text-gold' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {getStatusIcon(referral.status)}
                          {getStatusLabel(referral.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(referral.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4">
                        {referral.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(referral.id, 'approved')}
                              className="p-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30"
                              title="Approuver"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(referral.id, 'rejected')}
                              className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                              title="Rejeter"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {referral.status === 'approved' && (
                          <button
                            onClick={() => updateStatus(referral.id, 'paid')}
                            className="p-1 bg-gold/20 text-gold rounded hover:bg-gold/30"
                            title="Marquer comme payé"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color }: { 
  title: string
  value: number | string
  icon: any
  color: string
}) {
  const colors: Record<string, string> = {
    gold: 'from-gold/20 to-gold/5 border-gold/30',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    green: 'from-green-500/20 to-green-500/5 border-green-500/30',
    yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30'
  }

  const iconColors: Record<string, string> = {
    gold: 'text-gold',
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 bg-gradient-to-br ${colors[color]} border`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white/5 ${iconColors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  )
}
