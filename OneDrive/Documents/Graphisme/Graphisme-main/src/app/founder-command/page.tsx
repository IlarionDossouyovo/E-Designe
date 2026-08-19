'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, Home, Settings, Shield, LogOut, Menu, X, Bell, User, 
  Brain, Users, Code, Palette, Video, MessageSquare, TrendingUp, 
  Database, Bot, Zap, Activity, Target, ShoppingCart, DollarSign, BarChart3, FileText,
  Play, Pause, RefreshCw, Send, Download, Upload, Plus, Trash2, Edit, Save, Search,
  CheckCircle, XCircle, AlertTriangle, Clock, Wifi, WifiOff, Server,
  CreditCard, Wallet, Building, ArrowUpRight, ArrowDownRight, Receipt,
  Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, Globe,
  ChevronRight, ChevronDown, Eye, EyeOff, Copy, ExternalLink, Terminal, Cpu,
  Gauge, MemoryStick, HardDrive, Filter, RotateCcw, Power, Settings2
} from 'lucide-react'

// ==============================================
// COMPREHENSIVE AGENT INTERFACE
// ==============================================

interface Agent {
  id: string
  name: string
  role: string
  description: string
  color: string
  status: 'active' | 'paused' | 'error' | 'training' | 'idle'
  model: string
  tasksCompleted: number
  tasksPending: number
  lastAction: string
  performance: number
  capabilities: string[]
  cpu: number
  ram: number
  memory: number
  conversations: number
}

interface Task {
  id: string
  agentId: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
  dueAt?: string
  result?: string
}

interface Payment {
  id: string
  amount: number
  currency: string
  method: string
  status: 'pending' | 'completed' | 'failed'
  customer: string
  date: string
  country: string
}

interface MaintenanceAlert {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  message: string
  timestamp: string
  resolved: boolean
}

interface SocialPost {
  id: string
  platform: string
  content: string
  scheduledAt: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  engagement?: number
}

interface Analytics {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  activeUsers: number
  usersChange: number
  conversionRate: number
}

const generateAgents = (): Agent[] => [
  {
    id: 'CEO', name: 'CEO AI', role: 'Direction Strategique',
    description: 'Supervision et decisions strategiques pour l\'entreprise.',
    color: 'gold', status: 'active', model: 'llama3.2',
    tasksCompleted: 247, tasksPending: 12, lastAction: 'Analyse des performances mensuelles', performance: 98.5,
    capabilities: ['Analyse strategique', 'Prise de decision', 'Planification', 'Reporting'],
    cpu: 45, ram: 62, memory: 85, conversations: 156
  },
  {
    id: 'Commercial', name: 'Commercial AI', role: 'CRM & Prospection',
    description: 'Gestion des relations clients et prospection automatique.',
    color: 'blue', status: 'active', model: 'llama3.2',
    tasksCompleted: 583, tasksPending: 28, lastAction: 'Envoi de 15 devis personnalises', performance: 96.2,
    capabilities: ['CRM automatique', 'Prospection', 'Suivi leads', 'Conversion'],
    cpu: 38, ram: 55, memory: 72, conversations: 423
  },
  {
    id: 'Marketing', name: 'Marketing AI', role: 'SEO & Publicite',
    description: 'Strategies marketing digital et campagnes publicitaires.',
    color: 'purple', status: 'active', model: 'llama3.2',
    tasksCompleted: 892, tasksPending: 15, lastAction: 'Optimisation SEO du site', performance: 97.8,
    capabilities: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics'],
    cpu: 42, ram: 58, memory: 68, conversations: 287
  },
  {
    id: 'Designer', name: 'Designer AI', role: 'Design et Creation',
    description: 'Creation de logos, identites visuelles et designs.',
    color: 'pink', status: 'active', model: 'llama3.2',
    tasksCompleted: 456, tasksPending: 8, lastAction: 'Creation logo client', performance: 99.1,
    capabilities: ['Logo design', 'Identite visuelle', 'Charte graphique'],
    cpu: 35, ram: 48, memory: 64, conversations: 312
  },
  {
    id: 'Developer', name: 'Developer AI', role: 'Developpement',
    description: 'Developpement frontend et backend.',
    color: 'cyan', status: 'idle', model: 'qwen2.5-coder',
    tasksCompleted: 324, tasksPending: 22, lastAction: 'Mise a jour API payments', performance: 95.7,
    capabilities: ['Frontend', 'Backend', 'API', 'Base de donnees'],
    cpu: 12, ram: 34, memory: 91, conversations: 198
  },
  {
    id: 'Motion', name: 'Motion AI', role: 'Video & Animation',
    description: 'Creation de videos et animations.',
    color: 'orange', status: 'active', model: 'llama3.2',
    tasksCompleted: 189, tasksPending: 5, lastAction: 'Rendu animation promotionnelle', performance: 94.3,
    capabilities: ['Montage video', 'Motion Design', 'Animation 3D'],
    cpu: 78, ram: 85, memory: 52, conversations: 89
  },
  {
    id: 'CommunityManager', name: 'Community Manager AI', role: 'Reseaux Sociaux',
    description: 'Gestion des reseaux sociaux et contenu.',
    color: 'green', status: 'active', model: 'llama3.2',
    tasksCompleted: 1247, tasksPending: 35, lastAction: 'Publication Instagram', performance: 97.2,
    capabilities: ['Contenu', 'Planning', 'Engagement', 'Community'],
    cpu: 52, ram: 71, memory: 78, conversations: 567
  },
  {
    id: 'Finance', name: 'Finance AI', role: 'Comptabilite & Facturation',
    description: 'Gestion de la facturation et comptabilite.',
    color: 'emerald', status: 'idle', model: 'llama3.2',
    tasksCompleted: 678, tasksPending: 4, lastAction: 'Generation rapport financier', performance: 99.5,
    capabilities: ['Facturation', 'Comptabilite', 'Rapports'],
    cpu: 8, ram: 22, memory: 55, conversations: 89
  },
  {
    id: 'Support', name: 'Support AI', role: 'Assistance Client',
    description: 'Support client 24/7 et gestion des tickets.',
    color: 'indigo', status: 'active', model: 'llama3.2',
    tasksCompleted: 2156, tasksPending: 18, lastAction: 'Resolution ticket #4582', performance: 96.8,
    capabilities: ['Support 24/7', 'Tickets', 'FAQ', 'Chatbot'],
    cpu: 52, ram: 71, memory: 78, conversations: 2156
  },
  {
    id: 'DevOps', name: 'DevOps AI', role: 'Infrastructure & CI/CD',
    description: 'Gestion de l\'infrastructure et deploiements.',
    color: 'slate', status: 'idle', model: 'qwen2.5-coder',
    tasksCompleted: 145, tasksPending: 3, lastAction: 'Deploiement production v2.4', performance: 98.9,
    capabilities: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
    cpu: 5, ram: 18, memory: 42, conversations: 67
  },
  {
    id: 'CyberSecurity', name: 'CyberSecurity AI', role: 'Securite & Audit',
    description: 'Securite des systemes et audit.',
    color: 'red', status: 'active', model: 'llama3.2',
    tasksCompleted: 89, tasksPending: 1, lastAction: 'Scan vulnerabilites', performance: 99.8,
    capabilities: ['Audit', 'Surveillance', 'Backup', 'Pentest'],
    cpu: 25, ram: 35, memory: 45, conversations: 34
  },
  {
    id: 'DataAnalyst', name: 'Data Analyst AI', role: 'Business Intelligence',
    description: 'Analyse de donnees et tableaux de bord.',
    color: 'teal', status: 'active', model: 'llama3.2',
    tasksCompleted: 234, tasksPending: 7, lastAction: 'Mise a jour dashboard', performance: 97.4,
    capabilities: ['Analytics', 'Dashboards', 'Rapports', 'ML'],
    cpu: 32, ram: 48, memory: 62, conversations: 145
  }
]

const generateTasks = (): Task[] => [
  { id: '1', agentId: 'Commercial', title: 'Suivre leads qualifiés', description: 'Contacter les 15 nouveaux leads', status: 'in_progress', priority: 'high', createdAt: '2024-01-15T10:00:00Z', dueAt: '2024-01-15T18:00:00Z' },
  { id: '2', agentId: 'Marketing', title: 'Campagne Facebook Ads', description: 'Lancer nouvelle campagne', status: 'pending', priority: 'medium', createdAt: '2024-01-15T09:00:00Z', dueAt: '2024-01-16T09:00:00Z' },
  { id: '3', agentId: 'Developer', title: 'Correction bug paiement', description: 'Bug sur Stripe v2', status: 'pending', priority: 'critical', createdAt: '2024-01-15T08:30:00Z' },
  { id: '4', agentId: 'Support', title: 'Formation nouveau client', description: 'Session onboarding Enterprise', status: 'pending', priority: 'low', createdAt: '2024-01-14T16:00:00Z', dueAt: '2024-01-17T10:00:00Z' },
  { id: '5', agentId: 'Finance', title: 'Rapport mensuel', description: 'Générer rapport Janvier', status: 'completed', priority: 'high', createdAt: '2024-01-01T00:00:00Z', result: 'Rapport généré' },
  { id: '6', agentId: 'CommunityManager', title: 'Planifier posts semaine', description: 'Contenu pour 7 jours', status: 'completed', priority: 'medium', createdAt: '2024-01-14T00:00:00Z', result: '21 posts planifiés' },
]

const generatePayments = (): Payment[] => [
  { id: 'PAY001', amount: 250000, currency: 'XOF', method: 'Mobile Money', status: 'completed', customer: 'Entreprise ABC', date: '2024-01-15', country: 'Bénin' },
  { id: 'PAY002', amount: 1500, currency: 'EUR', method: 'Stripe', status: 'completed', customer: 'Tech Solutions FR', date: '2024-01-14', country: 'France' },
  { id: 'PAY003', amount: 85000, currency: 'XOF', method: 'Wave', status: 'pending', customer: 'StartUp BJ', date: '2024-01-15', country: 'Bénin' },
  { id: 'PAY004', amount: 3200, currency: 'USD', method: 'PayPal', status: 'completed', customer: 'Digital Agency US', date: '2024-01-13', country: 'USA' },
  { id: 'PAY005', amount: 450000, currency: 'XOF', method: 'Virement', status: 'completed', customer: 'Groupe CotedIvoire', date: '2024-01-12', country: 'Côte d\'Ivoire' },
]

const generateMaintenanceAlerts = (): MaintenanceAlert[] => [
  { id: '1', type: 'success', message: 'Sauvegarde automatique terminée', timestamp: '2024-01-15T06:00:00Z', resolved: true },
  { id: '2', type: 'info', message: 'Mise à jour Ollama disponible', timestamp: '2024-01-15T09:30:00Z', resolved: false },
  { id: '3', type: 'warning', message: 'Utilisation CPU serveur à 78%', timestamp: '2024-01-15T11:00:00Z', resolved: false },
  { id: '4', type: 'error', message: 'Échec connexion API Stripe', timestamp: '2024-01-15T11:15:00Z', resolved: false },
]

const generateSocialPosts = (): SocialPost[] => [
  { id: '1', platform: 'facebook', content: 'Découvrez nos nouveaux services IA!', scheduledAt: '2024-01-16T10:00:00Z', status: 'scheduled', engagement: 0 },
  { id: '2', platform: 'instagram', content: 'Nouveau projet: Logo pour startupTech', scheduledAt: '2024-01-15T18:00:00Z', status: 'published', engagement: 234 },
  { id: '3', platform: 'linkedin', content: 'Article: L\'IA dans les entreprises africaines', scheduledAt: '2024-01-17T09:00:00Z', status: 'draft', engagement: 0 },
  { id: '4', platform: 'twitter', content: 'Offre spéciale: -20% sur les sites e-commerce', scheduledAt: '2024-01-15T12:00:00Z', status: 'published', engagement: 156 },
]

const generateAnalytics = (): Analytics => ({
  totalRevenue: 15750000, revenueChange: 12.5, totalOrders: 156, ordersChange: 8.3,
  activeUsers: 1247, usersChange: 15.2, conversionRate: 4.8
})

const StatCard = ({ title, value, change, icon: Icon, color }: { title: string; value: string; change: number; icon: any; color: string }) => (
  <div className="glass-card p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-400 text-sm">{title}</span>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        color === 'gold' ? 'bg-gold/20 text-gold' :
        color === 'green' ? 'bg-green-500/20 text-green-400' :
        color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
      }`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <span className={`text-xs ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
      {change >= 0 ? '+' : ''}{change}% ce mois
    </span>
  </div>
)

const TaskItem = ({ task }: { task: Task }) => (
  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
    <div className={`w-2 h-2 rounded-full ${
      task.priority === 'critical' ? 'bg-red-500' :
      task.priority === 'high' ? 'bg-orange-500' :
      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
    }`} />
    <div className="flex-1">
      <p className="text-white text-sm font-medium">{task.title}</p>
      <p className="text-gray-500 text-xs">{task.agentId}</p>
    </div>
    <span className={`px-2 py-1 rounded text-xs ${
      task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
      task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
      task.status === 'failed' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
    }`}>{task.status}</span>
  </div>
)

const PaymentItem = ({ payment }: { payment: Payment }) => (
  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
      payment.method === 'Mobile Money' ? 'bg-green-500/20 text-green-400' :
      payment.method === 'Stripe' ? 'bg-purple-500/20 text-purple-400' :
      payment.method === 'PayPal' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
    }`}>
      <CreditCard className="w-4 h-4" />
    </div>
    <div className="flex-1">
      <p className="text-white text-sm font-medium">{payment.customer}</p>
      <p className="text-gray-500 text-xs">{payment.method} - {payment.country}</p>
    </div>
    <div className="text-right">
      <p className="text-white text-sm font-medium">{payment.amount.toLocaleString()} {payment.currency}</p>
      <span className={`text-xs ${
        payment.status === 'completed' ? 'text-green-400' :
        payment.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
      }`}>{payment.status}</span>
    </div>
  </div>
)

const AlertItem = ({ alert }: { alert: MaintenanceAlert }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg ${
    alert.type === 'success' ? 'bg-green-500/10' :
    alert.type === 'warning' ? 'bg-yellow-500/10' :
    alert.type === 'error' ? 'bg-red-500/10' : 'bg-blue-500/10'
  }`}>
    {alert.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> :
     alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-400" /> :
     alert.type === 'error' ? <XCircle className="w-5 h-5 text-red-400" /> : <Bell className="w-5 h-5 text-blue-400" />}
    <div className="flex-1">
      <p className="text-white text-sm">{alert.message}</p>
      <p className="text-gray-500 text-xs">{new Date(alert.timestamp).toLocaleString()}</p>
    </div>
  </div>
)

export default function FounderCommandCenter() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [agents, setAgents] = useState<Agent[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<MaintenanceAlert[]>([])
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [systemStatus, setSystemStatus] = useState({ ollama: true, database: true, api: true, storage: true })

  useEffect(() => {
    setTimeout(() => {
      setAgents(generateAgents())
      setTasks(generateTasks())
      setPayments(generatePayments())
      setMaintenanceAlerts(generateMaintenanceAlerts())
      setSocialPosts(generateSocialPosts())
      setAnalytics(generateAnalytics())
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        ollama: Math.random() > 0.05,
        database: Math.random() > 0.02,
        api: Math.random() > 0.03,
        storage: Math.random() > 0.01
      }))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleAgentAction = (agentId: string, action: string) => {
    console.log(`Agent ${agentId}: ${action}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement du centre de commande...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black">
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h1 className="text-white font-bold">Command Center</h1>
                <p className="text-gray-500 text-xs">Graphisme by ELECTRON</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
              {systemStatus.ollama ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
              {systemStatus.database ? <Database className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
              {systemStatus.api ? <Server className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
            </div>
            <button className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <User className="w-4 h-4 text-gold" />
              </div>
              <span className="text-white text-sm hidden md:block">Augustin D.</span>
            </div>
          </div>
        </div>
      </header>

      <aside className={`fixed left-0 top-[57px] bottom-0 w-64 bg-black/50 border-r border-white/10 transition-transform z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <nav className="p-4 space-y-1">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Tableau de bord' },
            { id: 'agents', icon: Brain, label: 'Agents IA (12)' },
            { id: 'ai-center', icon: Cpu, label: 'Centre IA' },
            { id: 'tasks', icon: Target, label: 'Taches et Ordres' },
            { id: 'payments', icon: DollarSign, label: 'Paiements' },
            { id: 'social', icon: Share2, label: 'Reseaux Sociaux' },
            { id: 'maintenance', icon: Server, label: 'Maintenance' },
            { id: 'analytics', icon: FileText, label: 'Rapports' },
            { id: 'settings', icon: Settings, label: 'Configuration' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-white/10">
            <Link href="/founder-ai-center" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gold transition-all">
              <Cpu className="w-5 h-5" />
              <span className="text-sm">AI Center</span>
            </Link>
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-purple-400 transition-all">
              <Settings className="w-5 h-5" />
              <span className="text-sm">Admin</span>
            </Link>
            <Link href="/maintenance" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-blue-400 transition-all">
              <Server className="w-5 h-5" />
              <span className="text-sm">Maintenance</span>
            </Link>
            <Link href="/payments" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-green-400 transition-all">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm">Paiements</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-all">
              <Home className="w-5 h-5" />
              <span className="text-sm">Retour au site</span>
            </Link>
          </div>
        </nav>
      </aside>

      <main className={`pt-[57px] transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Revenus" value="15.7M XOF" change={analytics?.revenueChange || 0} icon={DollarSign} color="gold" />
                <StatCard title="Commandes" value={analytics?.totalOrders?.toString() || '0'} change={analytics?.ordersChange || 0} icon={ShoppingCart} color="green" />
                <StatCard title="Utilisateurs" value={analytics?.activeUsers?.toString() || '0'} change={analytics?.usersChange || 0} icon={Users} color="blue" />
                <StatCard title="Conversion" value={`${analytics?.conversionRate || 0}%`} change={0} icon={Target} color="purple" />
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Etat du Systeme</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-xl ${systemStatus.ollama ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {systemStatus.ollama ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <span className="text-white font-medium">Ollama IA</span>
                    </div>
                    <p className="text-gray-400 text-sm">{systemStatus.ollama ? 'Operationnel' : 'Hors ligne'}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${systemStatus.database ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {systemStatus.database ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <span className="text-white font-medium">Base de donnees</span>
                    </div>
                    <p className="text-gray-400 text-sm">{systemStatus.database ? 'Connectee' : 'Erreur'}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${systemStatus.api ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {systemStatus.api ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <span className="text-white font-medium">API</span>
                    </div>
                    <p className="text-gray-400 text-sm">{systemStatus.api ? 'Fonctionnelle' : 'Erreur'}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${systemStatus.storage ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {systemStatus.storage ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                      <span className="text-white font-medium">Stockage</span>
                    </div>
                    <p className="text-gray-400 text-sm">{systemStatus.storage ? 'Disponible' : 'Plein'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Taches Recentes</h3>
                    <button onClick={() => setActiveTab('tasks')} className="text-gold text-sm hover:underline">Voir tout</button>
                  </div>
                  <div className="space-y-2">{tasks.slice(0, 4).map(task => <TaskItem key={task.id} task={task} />)}</div>
                </div>
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Alertes Maintenance</h3>
                    <button onClick={() => setActiveTab('maintenance')} className="text-gold text-sm hover:underline">Voir tout</button>
                  </div>
                  <div className="space-y-2">{maintenanceAlerts.slice(0, 4).map(alert => <AlertItem key={alert.id} alert={alert} />)}</div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Apercu des Agents IA</h3>
                  <button onClick={() => setActiveTab('agents')} className="text-gold text-sm hover:underline">Gerer</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {agents.map(agent => (
                    <div key={agent.id} className="text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        agent.status === 'active' ? 'bg-green-500/20' : 'bg-gray-500/20'
                      }`}>
                        <Brain className={`w-6 h-6 ${agent.status === 'active' ? 'text-green-400' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-white text-sm font-medium">{agent.name}</p>
                      <p className="text-gray-500 text-xs">{agent.tasksCompleted} taches</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Agents IA - Controle Total</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/90">
                  <Plus className="w-4 h-4" /> Nouvel Agent
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {agents.map(agent => (
                  <div key={agent.id} className="glass-card p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        agent.color === 'gold' ? 'bg-gold/20 text-gold' :
                        agent.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                        agent.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                        agent.color === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                        agent.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                        agent.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                        agent.color === 'green' ? 'bg-green-500/20 text-green-400' :
                        agent.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                        agent.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' :
                        agent.color === 'slate' ? 'bg-slate-500/20 text-slate-400' :
                        agent.color === 'red' ? 'bg-red-500/20 text-red-400' : 'bg-teal-500/20 text-teal-400'
                      }`}>
                        <Brain className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        agent.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                      }`}>{agent.status}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{agent.role}</p>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">{agent.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Performance</span>
                        <span className={`font-bold ${
                          agent.performance >= 95 ? 'text-green-400' :
                          agent.performance >= 80 ? 'text-yellow-400' : 'text-red-400'
                        }`}>{agent.performance}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Taches terminees</span>
                        <span className="text-white">{agent.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Modele</span>
                        <span className="text-blue-400">{agent.model}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleAgentAction(agent.id, 'pause')} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 text-sm">
                        <Pause className="w-4 h-4" /> Pause
                      </button>
                      <button onClick={() => handleAgentAction(agent.id, 'task')} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 text-sm">
                        <Send className="w-4 h-4" /> Commander
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI CENTER TAB */}
          {activeTab === 'ai-center' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Centre IA - Monitoring</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                  <RefreshCw className="w-4 h-4" /> Actualiser
                </button>
              </div>

              {/* System Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">CPU Total</span>
                  </div>
                  <p className="text-2xl font-bold text-white">38%</p>
                  <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MemoryStick className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-medium">RAM Totale</span>
                  </div>
                  <p className="text-2xl font-bold text-white">52%</p>
                  <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '52%' }} />
                  </div>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HardDrive className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Stockage</span>
                  </div>
                  <p className="text-2xl font-bold text-white">67%</p>
                  <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">Activite</span>
                  </div>
                  <p className="text-2xl font-bold text-white">8/12</p>
                  <p className="text-gray-500 text-sm">Agents actifs</p>
                </div>
              </div>

              {/* Detailed Agent Cards */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Agents en Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {agents.map(agent => (
                    <div key={agent.id} className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            agent.status === 'active' ? 'bg-green-500/20' :
                            agent.status === 'idle' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                          }`}>
                            <Brain className={`w-4 h-4 ${
                              agent.status === 'active' ? 'text-green-400' :
                              agent.status === 'idle' ? 'text-yellow-400' : 'text-red-400'
                            }`} />
                          </div>
                          <div>
                            <p className="text-white font-medium">{agent.name}</p>
                            <p className="text-gray-500 text-xs">{agent.role}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          agent.status === 'idle' ? 'bg-yellow-500/20 text-yellow-400' :
                          agent.status === 'paused' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
                        }`}>{agent.status}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center p-2 bg-white/5 rounded">
                          <p className="text-gray-500 text-xs">CPU</p>
                          <p className="text-white font-bold">{agent.cpu}%</p>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded">
                          <p className="text-gray-500 text-xs">RAM</p>
                          <p className="text-white font-bold">{agent.ram}%</p>
                        </div>
                        <div className="text-center p-2 bg-white/5 rounded">
                          <p className="text-gray-500 text-xs">Mem</p>
                          <p className="text-white font-bold">{agent.memory}%</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 text-white rounded text-xs hover:bg-white/20">
                          <Play className="w-3 h-3" /> Demarrer
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 text-white rounded text-xs hover:bg-white/20">
                          <Settings className="w-3 h-3" /> Config
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 text-white rounded text-xs hover:bg-white/20">
                          <Activity className="w-3 h-3" /> Logs
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Taches et Ordres</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/90">
                  <Plus className="w-4 h-4" /> Nouvelle Tache
                </button>
              </div>
              <div className="glass-card p-6">
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === 'critical' ? 'bg-red-500' :
                        task.priority === 'high' ? 'bg-orange-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-medium">{task.title}</h4>
                          <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">{task.agentId}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{task.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                        task.status === 'failed' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>{task.status}</span>
                      <button className="p-2 text-gray-400 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Paiements et Transactions</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                  <Download className="w-4 h-4" /> Exporter
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-4">
                  <p className="text-gray-400 text-sm mb-1">Total Revenus</p>
                  <p className="text-2xl font-bold text-green-400">15,750,000 XOF</p>
                </div>
                <div className="glass-card p-4">
                  <p className="text-gray-400 text-sm mb-1">En attente</p>
                  <p className="text-2xl font-bold text-yellow-400">85,000 XOF</p>
                </div>
                <div className="glass-card p-4">
                  <p className="text-gray-400 text-sm mb-1">Ce mois</p>
                  <p className="text-2xl font-bold text-white">3,250,000 XOF</p>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Transactions Recentes</h3>
                <div className="space-y-2">{payments.map(payment => <PaymentItem key={payment.id} payment={payment} />)}</div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Moyes de Paiement par Pays</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { country: 'Benin', methods: ['Mobile Money', 'Wave', 'Virement'] },
                    { country: 'Cote dIvoire', methods: ['Mobile Money', 'Wave', 'Orange Money'] },
                    { country: 'France', methods: ['Stripe', 'PayPal', 'Virement'] },
                    { country: 'USA', methods: ['Stripe', 'PayPal', 'Crypto'] },
                    { country: 'Senegal', methods: ['Mobile Money', 'Wave'] },
                    { country: 'Nigeria', methods: ['Flutterwave', 'Paystack'] },
                  ].map(item => (
                    <div key={item.country} className="p-4 bg-white/5 rounded-xl">
                      <h4 className="text-white font-medium mb-2">{item.country}</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.methods.map(method => (
                          <span key={method} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">{method}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Reseaux Sociaux et Publications</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/90">
                  <Plus className="w-4 h-4" /> Nouveau Post
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { platform: 'facebook', name: 'Facebook', icon: Facebook, posts: 245, followers: '12.5K' },
                  { platform: 'instagram', name: 'Instagram', icon: Instagram, posts: 189, followers: '8.2K' },
                  { platform: 'linkedin', name: 'LinkedIn', icon: Linkedin, posts: 67, followers: '3.1K' },
                  { platform: 'twitter', name: 'Twitter/X', icon: Twitter, posts: 512, followers: '5.7K' },
                  { platform: 'youtube', name: 'YouTube', icon: Youtube, videos: 45, subscribers: '2.3K' },
                ].map(social => (
                  <div key={social.platform} className="glass-card p-4 text-center">
                    <social.icon className="w-8 h-8 mx-auto mb-2 text-white" />
                    <h4 className="text-white font-medium">{social.name}</h4>
                    <p className="text-gray-400 text-sm">{(social as any).followers || (social as any).subscribers} followers</p>
                    <p className="text-gold text-xs mt-2">{(social as any).posts || (social as any).videos} publications</p>
                  </div>
                ))}
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Publications</h3>
                <div className="space-y-3">
                  {socialPosts.map(post => (
                    <div key={post.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      {post.platform === 'facebook' && <Facebook className="w-5 h-5 text-blue-400" />}
                      {post.platform === 'instagram' && <Instagram className="w-5 h-5 text-pink-400" />}
                      {post.platform === 'linkedin' && <Linkedin className="w-5 h-5 text-blue-500" />}
                      {post.platform === 'twitter' && <Twitter className="w-5 h-5 text-sky-400" />}
                      <div className="flex-1">
                        <p className="text-white text-sm">{post.content}</p>
                        <p className="text-gray-500 text-xs">{new Date(post.scheduledAt).toLocaleString()}{post.engagement ? ` - ${post.engagement} engagements` : ''}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                        post.status === 'draft' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-400'
                      }`}>{post.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Maintenance et Monitoring</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                  <RefreshCw className="w-4 h-4" /> Rafraichir
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Serveur</span>
                  </div>
                  <p className="text-green-400 text-sm">Operationnel</p>
                  <p className="text-gray-500 text-xs mt-1">Uptime: 99.8%</p>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-medium">Base de donnees</span>
                  </div>
                  <p className="text-green-400 text-sm">Connectee</p>
                  <p className="text-gray-500 text-xs mt-1">Latence: 12ms</p>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">CPU</span>
                  </div>
                  <p className="text-yellow-400 text-sm">78% utilise</p>
                  <p className="text-gray-500 text-xs mt-1">4/6 coeurs actifs</p>
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Memoire</span>
                  </div>
                  <p className="text-green-400 text-sm">3.2GB / 8GB</p>
                  <p className="text-gray-500 text-xs mt-1">40% utilise</p>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Alertes et Notifications</h3>
                <div className="space-y-2">{maintenanceAlerts.map(alert => <AlertItem key={alert.id} alert={alert} />)}</div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Rapports et Analytics</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/90">
                  <Download className="w-4 h-4" /> Exporter PDF
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Revenus" value="15.7M XOF" change={12.5} icon={DollarSign} color="gold" />
                <StatCard title="Commandes" value="156" change={8.3} icon={ShoppingCart} color="green" />
                <StatCard title="Nouveaux Clients" value="42" change={15.2} icon={Users} color="blue" />
                <StatCard title="Taux de conversion" value="4.8%" change={2.1} icon={Target} color="purple" />
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Performance des Agents IA</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-gray-400 pb-3">Agent</th>
                        <th className="text-left text-gray-400 pb-3">Taches</th>
                        <th className="text-left text-gray-400 pb-3">Performance</th>
                        <th className="text-left text-gray-400 pb-3">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map(agent => (
                        <tr key={agent.id} className="border-b border-white/5">
                          <td className="py-3 text-white">{agent.name}</td>
                          <td className="py-3 text-gray-400">{agent.tasksCompleted}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-white/10 rounded-full">
                                <div className={`h-full rounded-full ${
                                  agent.performance >= 95 ? 'bg-green-500' :
                                  agent.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} style={{ width: `${agent.performance}%` }} />
                              </div>
                              <span className="text-white text-sm">{agent.performance}%</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              agent.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                            }`}>{agent.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Configuration</h2>
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Parametres Generaux</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Nom de l'entreprise</label>
                    <input type="text" defaultValue="Graphisme by ELECTRON" className="w-full mt-1 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/10" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <input type="email" defaultValue="electronbusiness07@gmail.com" className="w-full mt-1 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/10" />
                  </div>
                </div>
                <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/90">
                  <Save className="w-4 h-4" /> Sauvegarder
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const Share2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)
