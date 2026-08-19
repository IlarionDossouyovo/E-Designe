// Maintenance API - Graphisme by ELECTRON
// Complete maintenance and monitoring system

import { NextRequest, NextResponse } from 'next/server'

interface MaintenanceTask {
  id: string
  title: string
  description: string
  category: 'preventive' | 'corrective' | 'update' | 'security' | 'backup'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  assignedTo?: string
  dueDate?: string
  completedAt?: string
  cost?: number
  notes?: string
  createdAt: string
}

interface SystemHealth {
  component: string
  status: 'healthy' | 'warning' | 'critical'
  uptime: number
  lastCheck: string
  message?: string
}

let maintenanceTasks: MaintenanceTask[] = [
  {
    id: 'maint_001',
    title: 'Mise à jour sécurité mensuelle',
    description: 'Application des derniers patches de sécurité',
    category: 'security',
    priority: 'high',
    status: 'completed',
    assignedTo: 'AI System',
    dueDate: '2026-08-01',
    completedAt: '2026-08-01T10:00:00Z',
    cost: 0,
    createdAt: '2026-07-25T08:00:00Z'
  },
  {
    id: 'maint_002',
    title: 'Sauvegarde complète serveur',
    description: 'Backup complet de toutes les données clients',
    category: 'backup',
    priority: 'critical',
    status: 'in_progress',
    assignedTo: 'Backup Bot',
    dueDate: '2026-08-04',
    createdAt: '2026-08-04T06:00:00Z'
  },
  {
    id: 'maint_003',
    title: 'Nettoyage base de données',
    description: 'Suppression des données temporaires et optimisation',
    category: 'preventive',
    priority: 'low',
    status: 'pending',
    assignedTo: 'System Admin',
    dueDate: '2026-08-15',
    createdAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'maint_004',
    title: 'Mise à jour Next.js 14.2',
    description: 'Mise à jour vers la dernière version stable',
    category: 'update',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-08-20',
    createdAt: '2026-08-02T09:00:00Z'
  }
]

const systemHealth: SystemHealth[] = [
  { component: 'Serveur Principal', status: 'healthy', uptime: 99.9, lastCheck: new Date().toISOString(), message: 'Opérationnel' },
  { component: 'Base de données', status: 'healthy', uptime: 99.8, lastCheck: new Date().toISOString(), message: 'Connexion stable' },
  { component: 'API', status: 'healthy', uptime: 99.7, lastCheck: new Date().toISOString(), message: 'Toutes endpoints OK' },
  { component: 'Stockage', status: 'warning', uptime: 95.2, lastCheck: new Date().toISOString(), message: 'Espace disque à 78%' },
  { component: 'SSL Certificat', status: 'healthy', uptime: 100, lastCheck: new Date().toISOString(), message: 'Valide jusqu\'au 15/08/2027' },
  { component: 'CDN', status: 'healthy', uptime: 99.5, lastCheck: new Date().toISOString(), message: 'Cache optimal' },
  { component: 'Emails', status: 'healthy', uptime: 98.9, lastCheck: new Date().toISOString(), message: 'Tous services configurés' },
  { component: 'Backups', status: 'healthy', uptime: 100, lastCheck: new Date().toISOString(), message: 'Dernier backup: il y a 2h' }
]

// GET - Get maintenance tasks and system health
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const category = searchParams.get('category')
  const health = searchParams.get('health')

  let tasks = [...maintenanceTasks]

  if (status) tasks = tasks.filter(t => t.status === status)
  if (category) tasks = tasks.filter(t => t.category === category)

  tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const stats = {
    total: maintenanceTasks.length,
    pending: maintenanceTasks.filter(t => t.status === 'pending').length,
    inProgress: maintenanceTasks.filter(t => t.status === 'in_progress').length,
    completed: maintenanceTasks.filter(t => t.status === 'completed').length,
    totalCost: maintenanceTasks.reduce((sum, t) => sum + (t.cost || 0), 0)
  }

  const response: any = { tasks, stats }

  if (health === 'true') {
    response.systemHealth = systemHealth
  }

  return NextResponse.json(response)
}

// POST - Create maintenance task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, priority, assignedTo, dueDate, cost, notes } = body

    if (!title) {
      return NextResponse.json({ error: 'Titre requis' }, { status: 400 })
    }

    const task: MaintenanceTask = {
      id: `maint_${Date.now()}`,
      title,
      description: description || '',
      category: category || 'preventive',
      priority: priority || 'medium',
      status: 'pending',
      assignedTo,
      dueDate,
      cost: cost || 0,
      notes,
      createdAt: new Date().toISOString()
    }

    maintenanceTasks.push(task)

    return NextResponse.json({
      success: true,
      task,
      message: 'Tâche de maintenance créée'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PATCH - Update task status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, notes, cost } = body

    const index = maintenanceTasks.findIndex(t => t.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 })
    }

    maintenanceTasks[index] = {
      ...maintenanceTasks[index],
      ...(status && { status, completedAt: status === 'completed' ? new Date().toISOString() : undefined }),
      ...(notes && { notes }),
      ...(cost !== undefined && { cost })
    }

    return NextResponse.json({
      success: true,
      task: maintenanceTasks[index]
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Delete task
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 })
  }

  const index = maintenanceTasks.findIndex(t => t.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 })
  }

  maintenanceTasks.splice(index, 1)

  return NextResponse.json({ success: true })
}
