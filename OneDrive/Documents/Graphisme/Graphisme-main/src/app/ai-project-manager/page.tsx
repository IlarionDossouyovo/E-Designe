'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Folder, Plus, Search, Filter, Users, Clock, DollarSign, 
  CheckCircle, AlertCircle, ArrowRight, Bot, Activity,
  Calendar, Target, TrendingUp, MessageSquare, ArrowLeft, Home
} from 'lucide-react'

interface Project {
  id: string
  name: string
  client: string
  clientEmail: string
  description: string
  service: string
  status: string
  priority: string
  budget?: number
  deadline?: string
  aiAgent?: string
  tasks: any[]
  createdAt: string
  updatedAt: string
}

interface Task {
  id: string
  title: string
  description: string
  priority: string
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  analysis: 'bg-yellow-500/20 text-yellow-400',
  in_progress: 'bg-green-500/20 text-green-400',
  review: 'bg-purple-500/20 text-purple-400',
  completed: 'bg-gray-500/20 text-gray-400',
  cancelled: 'bg-red-500/20 text-red-400'
}

const priorityColors: Record<string, string> = {
  low: 'text-gray-400',
  medium: 'text-yellow-400',
  high: 'text-orange-400',
  urgent: 'text-red-400'
}

export default function AIProjectManagerPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [showNewProject, setShowNewProject] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    clientEmail: '',
    description: '',
    service: 'Design',
    priority: 'medium',
    budget: 0,
    deadline: ''
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/ai-projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/ai-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProject, action: 'create' })
      })
      const data = await res.json()
      if (data.success) {
        setProjects([...projects, data.project])
        setShowNewProject(false)
        setNewProject({
          name: '', client: '', clientEmail: '', description: '',
          service: 'Design', priority: 'medium', budget: 0, deadline: ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const updateTaskStatus = async (projectId: string, taskId: string, status: string) => {
    try {
      await fetch('/api/ai-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateTask', projectId, taskId, taskStatus: status })
      })
      fetchProjects()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredProjects = projects.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !p.client.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in_progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0)
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
              AI Project <span className="text-gold">Manager</span>
            </h1>
            <p className="text-gray-400">Gestion intelligente des projets par l'IA</p>
          </div>
          <button
            onClick={() => setShowNewProject(true)}
            className="bg-gold text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gold/90"
          >
            <Plus className="w-5 h-5" />
            Nouveau Projet
          </button>
        </div>

        {/* AI Agents Status */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {['ProjectManager', 'CreativeDirector', 'DeveloperBot', 'SupportAgent', 'ContentWriter', 'MarketingBot'].map((agent) => (
            <motion.div
              key={agent}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{agent}</p>
                  <p className="text-green-400 text-xs">● Actif</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6">
            <Folder className="w-8 h-8 text-gold mb-2" />
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-gray-400">Total Projets</p>
          </div>
          <div className="glass-card p-6">
            <Activity className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
            <p className="text-gray-400">En Cours</p>
          </div>
          <div className="glass-card p-6">
            <CheckCircle className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-white">{stats.completed}</p>
            <p className="text-gray-400">Terminés</p>
          </div>
          <div className="glass-card p-6">
            <DollarSign className="w-8 h-8 text-gold mb-2" />
            <p className="text-2xl font-bold text-white">{stats.totalBudget.toLocaleString()} XOF</p>
            <p className="text-gray-400">Budget Total</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />
            </div>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="analysis">Analyse</option>
            <option value="in_progress">En cours</option>
            <option value="review">Révision</option>
            <option value="completed">Terminé</option>
          </select>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{project.name}</h3>
                      <p className="text-gray-400 text-sm">{project.client}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className={`${priorityColors[project.priority]} font-bold`}>
                      {project.priority}
                    </span>
                    {project.budget && (
                      <span className="text-gold">{project.budget.toLocaleString()} XOF</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <Bot className="w-4 h-4 text-gold" />
                    <span className="text-gold text-sm">{project.aiAgent}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* New Project Modal */}
        <AnimatePresence>
          {showNewProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowNewProject(false)}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative glass-card p-8 w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Nouveau Projet</h2>
                <form onSubmit={createProject} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom du projet *"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Client *"
                      value={newProject.client}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email client"
                      value={newProject.clientEmail}
                      onChange={(e) => setNewProject({ ...newProject, clientEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <textarea
                    placeholder="Description du projet"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={newProject.service}
                      onChange={(e) => setNewProject({ ...newProject, service: e.target.value })}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    >
                      <option value="Design">Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                    <select
                      value={newProject.priority}
                      onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Budget (XOF)"
                      value={newProject.budget}
                      onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    />
                    <input
                      type="date"
                      value={newProject.deadline}
                      onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90"
                  >
                    Créer le Projet
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative glass-card p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedProject.name}</h2>
                    <p className="text-gray-400">{selectedProject.client} - {selectedProject.clientEmail}</p>
                  </div>
                  <span className={`px-3 py-1 rounded ${statusColors[selectedProject.status]}`}>
                    {selectedProject.status}
                  </span>
                </div>

                <p className="text-gray-300 mb-6">{selectedProject.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Budget</p>
                    <p className="text-gold font-bold">{selectedProject.budget?.toLocaleString()} XOF</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Deadline</p>
                    <p className="text-white font-bold">{selectedProject.deadline || 'Non défini'}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Tâches</h3>
                <div className="space-y-3">
                  {selectedProject.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateTaskStatus(selectedProject.id, task.id, 
                            task.status === 'completed' ? 'pending' : 'completed')}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                            ${task.status === 'completed' ? 'border-green-500 bg-green-500' : 'border-gray-500'}`}
                        >
                          {task.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
                        </button>
                        <div>
                          <p className={`text-white ${task.status === 'completed' ? 'line-through' : ''}`}>
                            {task.title}
                          </p>
                          <p className="text-gray-400 text-sm">{task.description}</p>
                        </div>
                      </div>
                      <span className={`text-xs ${priorityColors[task.priority]}`}>{task.priority}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-gold" />
                    <span className="text-gold">Assigné à: {selectedProject.aiAgent}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
