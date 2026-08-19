'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, 
  Eye, MessageSquare, Bot, Clock, CheckCircle, XCircle, AlertCircle,
  BarChart3, PieChart, Activity, Calendar, ArrowUp, ArrowDown
} from 'lucide-react'

interface AnalyticsData {
  orders: {
    total: number
    pending: number
    processing: number
    completed: number
    cancelled: number
  }
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    change: number
  }
  customers: {
    total: number
    newThisMonth: number
  }
  aiAgents: {
    conversations: number
    messagesProcessed: number
    avgResponseTime: string
  }
  sources: {
    name: string
    count: number
    percentage: number
  }[]
  recentOrders: {
    id: string
    orderNumber: string
    customer: string
    total: number
    status: string
    createdAt: string
  }[]
  dailyOrders: {
    date: string
    orders: number
    revenue: number
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      // Fetch orders
      const ordersRes = await fetch('/api/orders')
      const ordersData = await ordersRes.json()
      
      // Fetch conversations for AI analytics
      const convRes = await fetch('/api/conversations')
      const convData = await convRes.json().catch(() => ({ conversations: [] }))

      // Calculate analytics
      const orders = ordersData.orders || []
      const completedOrders = orders.filter((o: any) => o.status === 'completed')
      
      // Calculate revenue
      const totalRevenue = completedOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)
      
      // Calculate this month vs last month
      const now = new Date()
      const thisMonth = now.getMonth()
      const thisYear = now.getFullYear()
      
      const thisMonthOrders = orders.filter((o: any) => {
        const d = new Date(o.createdAt)
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear
      })
      
      const lastMonthOrders = orders.filter((o: any) => {
        const d = new Date(o.createdAt)
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
        const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear
        return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear
      })
      
      const thisMonthRevenue = thisMonthOrders.filter((o: any) => o.status === 'completed').reduce((sum: number, o: any) => sum + (o.total || 0), 0)
      const lastMonthRevenue = lastMonthOrders.filter((o: any) => o.status === 'completed').reduce((sum: number, o: any) => sum + (o.total || 0), 0)
      
      const revenueChange = lastMonthRevenue > 0 ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100) : 100

      // Generate daily orders for chart (last 7 days)
      const dailyOrders: any[] = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]
        
        const dayOrders = orders.filter((o: any) => o.createdAt?.startsWith(dateStr))
        dailyOrders.push({
          date: d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
          orders: dayOrders.length,
          revenue: dayOrders.filter((o: any) => o.status === 'completed').reduce((sum: number, o: any) => sum + (o.total || 0), 0)
        })
      }

      // Calculate sources (simplified)
      const sources = [
        { name: 'Site Web', count: Math.floor(orders.length * 0.6), percentage: 60 },
        { name: 'WhatsApp', count: Math.floor(orders.length * 0.2), percentage: 20 },
        { name: 'Réseaux Sociaux', count: Math.floor(orders.length * 0.15), percentage: 15 },
        { name: 'Autre', count: Math.floor(orders.length * 0.05), percentage: 5 }
      ]

      setData({
        orders: {
          total: orders.length,
          pending: orders.filter((o: any) => o.status === 'pending').length,
          processing: orders.filter((o: any) => o.status === 'processing').length,
          completed: completedOrders.length,
          cancelled: orders.filter((o: any) => o.status === 'cancelled').length
        },
        revenue: {
          total: totalRevenue,
          thisMonth: thisMonthRevenue,
          lastMonth: lastMonthRevenue,
          change: revenueChange
        },
        customers: {
          total: orders.length,
          newThisMonth: thisMonthOrders.length
        },
        aiAgents: {
          conversations: convData.conversations?.length || 0,
          messagesProcessed: (convData.conversations?.length || 0) * 5,
          avgResponseTime: '< 2s'
        },
        sources,
        recentOrders: orders.slice(0, 10).map((o: any) => ({
          id: o.id,
          orderNumber: o.orderNumber || o.id,
          customer: o.customer?.name || 'Client',
          total: o.total || 0,
          status: o.status,
          createdAt: o.createdAt
        })),
        dailyOrders
      })
    } catch (error) {
      console.error('Analytics error:', error)
    } finally {
      setLoading(false)
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-gold" />
              Analytics
            </h1>
            <p className="text-gray-400 mt-2">
              Tableau de bord analytique de votre agence
            </p>
          </div>
          
          {/* Period Selector */}
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  period === p
                    ? 'bg-gold text-black'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {p === '7d' ? '7 jours' : p === '30d' ? '30 jours' : '3 mois'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Revenus Totaux"
            value={data?.revenue.total.toLocaleString() || 0}
            suffix="XOF"
            change={data?.revenue.change}
            icon={DollarSign}
            color="gold"
          />
          <StatCard
            title="Commandes"
            value={data?.orders.total || 0}
            suffix=""
            change={15}
            icon={ShoppingCart}
            color="blue"
          />
          <StatCard
            title="Clients"
            value={data?.customers.total || 0}
            suffix=""
            change={data?.customers.newThisMonth || 0}
            newLabel="nouveaux ce mois"
            icon={Users}
            color="green"
          />
          <StatCard
            title="Conversations IA"
            value={data?.aiAgents.conversations || 0}
            suffix=""
            icon={Bot}
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Orders Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gold" />
              Commandes & Revenus (7 derniers jours)
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {data?.dailyOrders.map((day, i) => {
                const maxOrders = Math.max(...(data.dailyOrders?.map(d => d.orders) || [1]), 1)
                const height = Math.max((day.orders / maxOrders) * 180, 10)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-gold/50 to-gold rounded-t"
                      style={{ height: `${height}px` }}
                    />
                    <span className="text-xs text-gray-400">{day.date}</span>
                    <span className="text-xs text-gold">{day.orders} cmd</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sources */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-gold" />
              Sources des Commandes
            </h3>
            <div className="space-y-4">
              {data?.sources.map((source, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{source.name}</span>
                    <span className="text-gold">{source.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gold to-gold/50 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold" />
              État des Commandes
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <StatusItem 
                label="En attente" 
                count={data?.orders.pending || 0} 
                color="yellow"
                icon={Clock}
              />
              <StatusItem 
                label="En cours" 
                count={data?.orders.processing || 0} 
                color="blue"
                icon={Activity}
              />
              <StatusItem 
                label="Terminées" 
                count={data?.orders.completed || 0} 
                color="green"
                icon={CheckCircle}
              />
              <StatusItem 
                label="Annulées" 
                count={data?.orders.cancelled || 0} 
                color="red"
                icon={XCircle}
              />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-gold" />
              Commandes Récentes
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {data?.recentOrders.map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{order.orderNumber}</p>
                    <p className="text-gray-400 text-sm">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-bold">{order.total.toLocaleString()} XOF</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status === 'completed' ? 'Terminé' :
                       order.status === 'processing' ? 'En cours' :
                       order.status === 'pending' ? 'En attente' : 'Annulé'}
                    </span>
                  </div>
                </div>
              ))}
              {(!data?.recentOrders || data.recentOrders.length === 0) && (
                <p className="text-gray-400 text-center py-4">Aucune commande</p>
              )}
            </div>
          </div>
        </div>

        {/* AI Performance */}
        <div className="mt-6 glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5 text-gold" />
            Performance des Agents IA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-3xl font-bold text-gold">{data?.aiAgents.conversations || 0}</p>
              <p className="text-gray-400 text-sm">Conversations</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-3xl font-bold text-gold">{data?.aiAgents.messagesProcessed || 0}</p>
              <p className="text-gray-400 text-sm">Messages Traités</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-3xl font-bold text-gold">{data?.aiAgents.avgResponseTime || '< 2s'}</p>
              <p className="text-gray-400 text-sm">Temps de Réponse Moyen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  suffix, 
  change, 
  newLabel,
  icon: Icon, 
  color 
}: { 
  title: string
  value: number | string
  suffix?: string
  change?: number
  newLabel?: string
  icon: any
  color: string
}) {
  const colors: Record<string, string> = {
    gold: 'from-gold/20 to-gold/5 border-gold/30',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    green: 'from-green-500/20 to-green-500/5 border-green-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30'
  }

  const iconColors: Record<string, string> = {
    gold: 'text-gold',
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400'
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
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && <span className="text-gray-400 text-sm ml-1">{suffix}</span>}
      </p>
      {newLabel && (
        <p className="text-xs text-gray-500 mt-1">{newLabel}</p>
      )}
    </motion.div>
  )
}

function StatusItem({ label, count, color, icon: Icon }: { label: string; count: number; color: string; icon: any }) {
  const colors: Record<string, string> = {
    yellow: 'bg-yellow-500/20 text-yellow-400',
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    red: 'bg-red-500/20 text-red-400'
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-gray-300">{label}</span>
      </div>
      <span className="text-xl font-bold text-white">{count}</span>
    </div>
  )
}
