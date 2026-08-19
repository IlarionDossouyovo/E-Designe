'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, Calendar, FileText, MessageCircle, Gift, 
  CreditCard, Package, Clock, TrendingUp, Star
} from 'lucide-react'

interface Order {
  id: string
  items: string[]
  total: number
  status: string
  date: string
}

interface Booking {
  id: string
  service: string
  date: string
  time: string
  status: string
}

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [userEmail, setUserEmail] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [points, setPoints] = useState({ total: 0, lifetime: 0 })

  useEffect(() => {
    // Demo data
    setUserEmail('client@example.com')
    setOrders([
      { id: '1', items: ['Logo Professionnel'], total: 25000, status: 'completed', date: '2024-01-15' },
      { id: '2', items: ['Site Web Vitrine'], total: 150000, status: 'in_progress', date: '2024-01-20' },
    ])
    setBookings([
      { id: '1', service: 'Consultation', date: '2024-02-01', time: '10:00', status: 'confirmed' },
    ])
    setPoints({ total: 1500, lifetime: 5000 })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20'
      case 'in_progress': return 'text-blue-400 bg-blue-500/20'
      case 'pending': return 'text-yellow-400 bg-yellow-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const menuItems = [
    { id: 'overview', icon: TrendingUp, label: 'Aperçu' },
    { id: 'orders', icon: ShoppingBag, label: 'Mes Commandes' },
    { id: 'bookings', icon: Calendar, label: 'Mes RDV' },
    { id: 'quotes', icon: FileText, label: 'Mes Devis' },
    { id: 'support', icon: MessageCircle, label: 'Support' },
    { id: 'points', icon: Gift, label: 'Points Fidélité' },
  ]

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Mon <span className="text-gold">Espace</span>
            </h1>
            <p className="text-gray-400">{userEmail}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Points de fidélité</p>
            <p className="text-2xl font-bold text-gold flex items-center gap-2">
              <Star className="w-6 h-6" />
              {points.total.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-gold text-black'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Overview */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="glass-card p-6">
                    <ShoppingBag className="w-8 h-8 text-gold mb-3" />
                    <p className="text-gray-400 text-sm">Commandes</p>
                    <p className="text-2xl font-bold text-white">{orders.length}</p>
                  </div>
                  <div className="glass-card p-6">
                    <Calendar className="w-8 h-8 text-gold mb-3" />
                    <p className="text-gray-400 text-sm">RDV à venir</p>
                    <p className="text-2xl font-bold text-white">{bookings.length}</p>
                  </div>
                  <div className="glass-card p-6">
                    <Gift className="w-8 h-8 text-gold mb-3" />
                    <p className="text-gray-400 text-sm">Points</p>
                    <p className="text-2xl font-bold text-white">{points.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Activités Récentes</h2>
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-gold" />
                          <div>
                            <p className="text-white">{order.items.join(', ')}</p>
                            <p className="text-gray-400 text-sm">{order.date}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Mes Commandes</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">Aucune commande</p>
                      <Link href="/shop" className="text-gold hover:underline mt-2 inline-block">
                        Passer une commande
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="p-4 bg-white/5 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gold font-bold">{order.total.toLocaleString()} XOF</span>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-white">{order.items.join(', ')}</p>
                          <p className="text-gray-400 text-sm">{order.date}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Bookings */}
            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Mes Rendez-vous</h2>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">Aucun rendez-vous</p>
                      <Link href="/bookings" className="text-gold hover:underline mt-2 inline-block">
                        Prendre RDV
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="p-4 bg-white/5 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-semibold">{booking.service}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {booking.date} à {booking.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Points */}
            {activeTab === 'points' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Programme Fidélité</h2>
                  
                  <div className="bg-gradient-to-r from-gold/20 to-purple-500/20 p-6 rounded-xl mb-6">
                    <p className="text-gray-400 text-sm">Votre solde</p>
                    <p className="text-4xl font-bold text-gold">{points.total.toLocaleString()} points</p>
                    <p className="text-gray-400 text-sm mt-2">{points.lifetime.toLocaleString()} points lifetime</p>
                  </div>

                  <h3 className="text-white font-semibold mb-3">Récompenses disponibles</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-white">5% de réduction</p>
                        <p className="text-gray-400 text-sm">Sur votre prochaine commande</p>
                      </div>
                      <span className="text-gold font-bold">1000 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-white">T-shirt Graphisme</p>
                        <p className="text-gray-400 text-sm">T-shirt personnalisé</p>
                      </div>
                      <span className="text-gold font-bold">1500 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-white">Consultation Gratuite</p>
                        <p className="text-gray-400 text-sm">30min gratuite</p>
                      </div>
                      <span className="text-gold font-bold">2000 pts</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
