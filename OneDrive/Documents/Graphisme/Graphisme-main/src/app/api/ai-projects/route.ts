// AI Project Manager - Graphisme by ELECTRON
// Automated project management and task orchestration

import { NextRequest, NextResponse } from 'next/server'

interface ProjectTask {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  assignee?: string
  dueDate?: string
  createdAt: string
}

interface Project {
  id: string
  name: string
  client: string
  clientEmail: string
  description: string
  service: string
  status: 'new' | 'analysis' | 'in_progress' | 'review' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  budget?: number
  deadline?: string
  tasks: ProjectTask[]
  aiAgent?: string
  createdAt: string
  updatedAt: string
}

// Demo projects data
let projects: Project[] = [
  {
    id: 'proj_001',
    name: 'Site Web Corporate',
    client: 'Jean Dupont',
    clientEmail: 'jean@techcorp.bj',
    description: 'Création site web corporate avec vitrine et blog',
    service: 'Web Development',
    status: 'in_progress',
    priority: 'high',
    budget: 350000,
    deadline: '2024-03-15',
    aiAgent: 'ProjectManager',
    tasks: [
      { id: 't1', title: 'Analyse des besoins', description: 'Réunion avec client', priority: 'high', status: 'completed', createdAt: '2024-01-10' },
      { id: 't2', title: 'Maquettes', description: 'Création des wireframes', priority: 'high', status: 'in_progress', createdAt: '2024-01-15' },
      { id: 't3', title: 'Développement', description: 'Intégration Next.js', priority: 'medium', status: 'pending', createdAt: '2024-01-20' }
    ],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-25T14:30:00Z'
  },
  {
    id: 'proj_002',
    name: 'Logo & Identité Visuelle',
    client: 'Marie Kouassi',
    clientEmail: 'marie@fashion.bj',
    description: 'Design logo et charte graphique complète',
    service: 'Design',
    status: 'review',
    priority: 'medium',
    budget: 150000,
    deadline: '2024-02-28',
    aiAgent: 'CreativeDirector',
    tasks: [
      { id: 't4', title: 'Recherche créative', description: 'Moodboard et inspirations', priority: 'high', status: 'completed', createdAt: '2024-01-05' },
      { id: 't5', title: 'Concepts logo', description: '3 propositions', priority: 'high', status: 'completed', createdAt: '2024-01-12' },
      { id: 't6', title: 'Charte graphique', description: 'Couleurs, typographies', priority: 'medium', status: 'in_progress', createdAt: '2024-01-20' }
    ],
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-28T11:00:00Z'
  }
]

// AI Agent configurations
const aiAgents = [
  { id: 'ProjectManager', name: 'Project Manager AI', role: 'Gestion de projet', status: 'active', tasksCompleted: 45 },
  { id: 'CreativeDirector', name: 'Creative Director AI', role: 'Direction artistique', status: 'active', tasksCompleted: 32 },
  { id: 'DeveloperBot', name: 'Developer Bot', role: 'Développement', status: 'active', tasksCompleted: 28 },
  { id: 'SupportAgent', name: 'Support Agent', role: 'Support client', status: 'active', tasksCompleted: 156 },
  { id: 'ContentWriter', name: 'Content Writer AI', role: 'Rédaction contenu', status: 'active', tasksCompleted: 67 },
  { id: 'MarketingBot', name: 'Marketing Bot', role: 'Marketing digital', status: 'active', tasksCompleted: 23 }
]

// GET - Get all projects or single project
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const status = searchParams.get('status')
  const agent = searchParams.get('agent')

  let result = [...projects]

  if (id) {
    const project = projects.find(p => p.id === id)
    if (!project) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
    }
    return NextResponse.json(project)
  }

  if (status) {
    result = result.filter(p => p.status === status)
  }

  if (agent) {
    result = result.filter(p => p.aiAgent === agent)
  }

  // Get statistics
  const stats = {
    total: projects.length,
    new: projects.filter(p => p.status === 'new').length,
    inProgress: projects.filter(p => p.status === 'in_progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    aiAgents: aiAgents
  }

  return NextResponse.json({ projects: result, stats })
}

// POST - Create new project or assign AI agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, client, clientEmail, description, service, priority, budget, deadline, action, taskId, taskStatus, projectId } = body

    // Create new project
    if (action === 'create') {
      const newProject: Project = {
        id: `proj_${Date.now()}`,
        name,
        client,
        clientEmail,
        description,
        service: service || 'Design',
        status: 'new',
        priority: priority || 'medium',
        budget: budget || 0,
        deadline,
        aiAgent: 'ProjectManager',
        tasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      projects.push(newProject)

      return NextResponse.json({
        success: true,
        project: newProject,
        message: 'Projet créé et assigné à Project Manager AI'
      })
    }

    // Update task status
    if (action === 'updateTask' && projectId && taskId) {
      const project = projects.find(p => p.id === projectId)
      if (!project) {
        return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
      }

      const task = project.tasks.find(t => t.id === taskId)
      if (task) {
        task.status = taskStatus || task.status
        project.updatedAt = new Date().toISOString()

        return NextResponse.json({
          success: true,
          task,
          message: 'Tâche mise à jour'
        })
      }

      return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 })
    }

    // Assign AI agent to project
    if (action === 'assignAgent' && projectId) {
      const project = projects.find(p => p.id === projectId)
      if (!project) {
        return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
      }

      project.aiAgent = body.agentId || 'ProjectManager'
      project.updatedAt = new Date().toISOString()

      return NextResponse.json({
        success: true,
        project,
        message: `Projet assigné à ${project.aiAgent}`
      })
    }

    // Get AI recommendations
    if (action === 'recommend') {
      const recommendations = {
        suggestedAgent: 'ProjectManager',
        estimatedTimeline: '2-3 semaines',
        requiredTasks: [
          'Analyse des besoins',
          'Conception',
          'Développement',
          'Tests',
          'Déploiement'
        ],
        riskFactors: ['Disponibilité client', 'Retours tardifs'],
        nextSteps: [
          'Contacter le client pour kickoff',
          'Préparer le calendrier',
          'Assigner les ressources'
        ]
      }

      return NextResponse.json(recommendations)
    }

    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Delete project
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 })
  }

  const index = projects.findIndex(p => p.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
  }

  projects.splice(index, 1)

  return NextResponse.json({ success: true, message: 'Projet supprimé' })
}
