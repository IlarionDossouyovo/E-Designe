'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Server, Database, Globe, Shield, HardDrive, Mail, Cloud, 
  CheckCircle, AlertTriangle, XCircle, Plus, RefreshCw,
  Clock, DollarSign, Wrench, Activity, ArrowLeft, Home, X
} from 'lucide-react'

interface SystemHealth {
  component: string
  status: 'healthy' | 'warning' | 'critical'
  uptime: number
  lastCheck: string
  message?: string
}

interface MaintenanceTask {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  assignedTo?: string
  dueDate?: string
  createdAt: string
}

export default function MaintenancePage() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([])
  const [tasks, setTasks] = useState<MaintenanceTask[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewTask, setShowNewTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null)
  const [selectedSystem, setSelectedSystem] = useState<SystemHealth | null>(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'preventive',
    priority: 'medium',
    assignedTo: '',
    dueDate: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/maintenance?health=true')
      const data = await res.json()
      setSystemHealth(data.systemHealth || [])
      setTasks(data.tasks || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      })
      const data = await res.json()
      if (data.success) {
        setTasks([data.task, ...tasks])
        setShowNewTask(false)
        setNewTask({
          title: '', description: '', category: 'preventive',
          priority: 'medium', assignedTo: '', dueDate: ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-6 h-6 text-green-400" />
      case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-400" />
      case 'critical': return <XCircle className="w-6 h-6 text-red-400" />
      default: return <Activity className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/20 border-green-500/30'
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/30'
      case 'critical': return 'bg-red-500/20 border-red-500/30'
      default: return 'bg-gray-500/20 border-gray-500/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="w-4 h-4" />
      case 'backup': return <Cloud className="w-4 h-4" />
      case 'update': return <RefreshCw className="w-4 h-4" />
      case 'preventive': return <Wrench className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <Home className="w-5 h-5" />
            Accueil
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Système de <span className="text-gold">Maintenance</span>
            </h1>
            <p className="text-gray-400">Monitoring et gestion du système</p>
          </div>
          <button
            onClick={() => setShowNewTask(true)}
            className="bg-gold text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gold/90"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Tâche
          </button>
        </div>

        {/* System Health Grid */}
        <h2 className="text-2xl font-bold text-white mb-4">État du Système</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {systemHealth.map((system, index) => (
              <motion.div
                key={system.component}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedSystem(system)}
                className={`glass-card p-6 border ${getStatusColor(system.status)} cursor-pointer hover:scale-105 transition-transform`}
              >
                <div className="flex items-center justify-between mb-4">
                  {getStatusIcon(system.status)}
                  <span className="text-green-400 text-sm">{system.uptime}% uptime</span>
                </div>
                <h3 className="text-white font-bold mb-1">{system.component}</h3>
                <p className="text-gray-400 text-sm">{system.message}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Dernier check: {new Date(system.lastCheck).toLocaleTimeString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Maintenance Tasks */}
        <h2 className="text-2xl font-bold text-white mb-4">Tâches de Maintenance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTask(task)}
              className="glass-card p-6 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(task.category)}
                  <span className={`text-xs ${getPriorityColor(task.priority)} font-bold`}>
                    {task.priority}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {task.status}
                </span>
              </div>
              <h3 className="text-white font-bold mb-2">{task.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{task.description}</p>
              <div className="flex items-center justify-between text-sm">
                {task.assignedTo && (
                  <span className="text-gold">{task.assignedTo}</span>
                )}
                {task.dueDate && (
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.dueDate}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Task Modal */}
        {showNewTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTask(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative glass-card p-8 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Nouvelle Tâche</h2>
              <form onSubmit={createTask} className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre *"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  >
                    <option value="preventive">Préventive</option>
                    <option value="corrective">Corrective</option>
                    <option value="update">Mise à jour</option>
                    <option value="security">Sécurité</option>
                    <option value="backup">Sauvegarde</option>
                  </select>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Assigné à"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90"
                >
                  Créer la Tâche
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Task Details Modal */}
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTask(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative glass-card p-8 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedTask(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                {getCategoryIcon(selectedTask.category)}
                <span className={`text-xs ${getPriorityColor(selectedTask.priority)} font-bold px-2 py-1 rounded`}>
                  {selectedTask.priority.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  selectedTask.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  selectedTask.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {selectedTask.status === 'in_progress' ? 'En cours' : 
                   selectedTask.status === 'completed' ? 'Terminé' : 
                   selectedTask.status === 'pending' ? 'En attente' : selectedTask.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedTask.title}</h2>
              <p className="text-gray-400 mb-6">{selectedTask.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Assigné à:</span>
                  <span className="text-gold">{selectedTask.assignedTo || 'Non assigné'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date limite:</span>
                  <span className="text-white">{selectedTask.dueDate || 'Non définie'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Catégorie:</span>
                  <span className="text-white">{selectedTask.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Créé le:</span>
                  <span className="text-white">{new Date(selectedTask.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {selectedTask.status !== 'completed' && (
                  <button 
                    onClick={() => {
                      setTasks(tasks.map(t => t.id === selectedTask.id ? {...t, status: 'completed'} : t))
                      setSelectedTask(null)
                    }}
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600"
                  >
                    Marquer terminé
                  </button>
                )}
                {selectedTask.status === 'pending' && (
                  <button 
                    onClick={() => {
                      setTasks(tasks.map(t => t.id === selectedTask.id ? {...t, status: 'in_progress'} : t))
                      setSelectedTask(null)
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-xl font-bold hover:bg-blue-600"
                  >
                    Démarrer
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* System Details Modal */}
        {selectedSystem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSystem(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative glass-card p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedSystem(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                {getStatusIcon(selectedSystem.status)}
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedSystem.component}</h2>
                  <span className="text-green-400 text-lg">{selectedSystem.uptime}% uptime</span>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Statut:</span>
                  <span className={`font-bold ${
                    selectedSystem.status === 'healthy' ? 'text-green-400' :
                    selectedSystem.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {selectedSystem.status === 'healthy' ? 'Opérationnel' :
                     selectedSystem.status === 'warning' ? 'Attention' : 'Critique'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Message:</span>
                  <span className="text-white">{selectedSystem.message}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dernière vérification:</span>
                  <span className="text-white">{new Date(selectedSystem.lastCheck).toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedSystem(null)}
                className="w-full mt-6 bg-gold text-black py-2 rounded-xl font-bold hover:bg-gold/90"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
