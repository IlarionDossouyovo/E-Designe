'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Package, Clock, CheckCircle, XCircle, Truck,
  ShoppingBag, CreditCard, MessageSquare, FileText, ChevronRight
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  items: { name: string; quantity: number; price: number }[]
  customer: { name: string; email: string; phone: string }
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export default function ClientOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchOrder, setSearchOrder] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />
      case 'processing': return <Package className="w-5 h-5 text-blue-400" />
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-400" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'processing': return 'En cours de traitement'
      case 'completed': return 'Terminée'
      case 'cancelled': return 'Annulée'
      default: return status
    }
  }

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'paid': return 'Payée'
      case 'failed': return 'Échouée'
      default: return status
    }
  }

  const filteredOrders = orders.filter(order => 
    order.orderNumber?.toLowerCase().includes(searchOrder.toLowerCase()) ||
    order.customer?.name?.toLowerCase().includes(searchOrder.toLowerCase())
  )

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-gold" />
            Mes Commandes
          </h1>
          <p className="text-gray-400 mt-2">
            Suivez l'état de vos commandes en temps réel
          </p>
        </div>

        {/* Search */}
        <div className="glass-card p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro de commande ou nom..."
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aucune commande</h3>
              <p className="text-gray-400">
                {searchOrder ? 'Aucune commande ne correspond à votre recherche' : 'Vous n\'avez pas encore passé de commande'}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 hover:border-gold/30 transition-all cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-white font-bold">{order.orderNumber}</h3>
                      <p className="text-gray-400 text-sm">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-gold font-bold text-xl">
                      {order.total?.toLocaleString()} XOF
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                {/* Order Items Preview */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {order.items?.slice(0, 3).map((item, i) => (
                      <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">
                        {item.name} x{item.quantity}
                      </span>
                    ))}
                    {order.items?.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{order.items.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
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
                  Commande {selectedOrder.orderNumber}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Status Timeline */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Statut de la commande</h3>
                <div className="flex items-center justify-between">
                  <StatusStep 
                    icon={ShoppingBag} 
                    label="Commande passée" 
                    active={true}
                    completed={true}
                  />
                  <div className="flex-1 h-1 bg-white/10 mx-2">
                    <div className={`h-full ${
                      selectedOrder.status !== 'pending' ? 'bg-green-500' : 'bg-white/10'
                    }`} />
                  </div>
                  <StatusStep 
                    icon={Package} 
                    label="En traitement" 
                    active={selectedOrder.status === 'processing' || selectedOrder.status === 'completed'}
                    completed={selectedOrder.status === 'completed'}
                  />
                  <div className="flex-1 h-1 bg-white/10 mx-2">
                    <div className={`h-full ${
                      selectedOrder.status === 'completed' ? 'bg-green-500' : 'bg-white/10'
                    }`} />
                  </div>
                  <StatusStep 
                    icon={Truck} 
                    label="Terminée" 
                    active={selectedOrder.status === 'completed'}
                    completed={selectedOrder.status === 'completed'}
                  />
                </div>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Paiement</span>
                  </div>
                  <p className="text-white font-medium">
                    {getPaymentStatusLabel(selectedOrder.paymentStatus)}
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Date</span>
                  </div>
                  <p className="text-white font-medium">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Articles commandés</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white">{item.name}</p>
                        <p className="text-gray-400 text-sm">Quantité: {item.quantity}</p>
                      </div>
                      <p className="text-gold font-bold">
                        {item.price.toLocaleString()} XOF
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-bold text-gold">
                    {selectedOrder.total?.toLocaleString()} XOF
                  </span>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-white font-medium">Une question ?</p>
                    <p className="text-gray-400 text-sm">
                      Contactez notre support pour tout problème avec votre commande
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function StatusStep({ icon: Icon, label, active, completed }: { icon: any; label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-500' : active ? 'bg-gold' : 'bg-white/10'
      }`}>
        <Icon className={`w-5 h-5 ${completed || active ? 'text-black' : 'text-gray-400'}`} />
      </div>
      <span className={`text-xs mt-2 text-center ${active ? 'text-white' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  )
}
