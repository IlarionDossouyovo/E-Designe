// Announcements API - Graphisme by ELECTRON
// Company announcements and notifications management

import { NextRequest, NextResponse } from 'next/server'

interface Announcement {
  id: string
  title: string
  content: string
  type: 'info' | 'success' | 'warning' | 'error' | 'promotion' | 'event'
  priority: 'low' | 'medium' | 'high'
  author: string
  categories: string[]
  image?: string
  active: boolean
  scheduledFor?: string
  expiresAt?: string
  views: number
  createdAt: string
}

let announcements: Announcement[] = [
  {
    id: 'ann_001',
    title: 'Nouvelle Agence à Cotonou',
    content: 'Nous avons ouvert une nouvelle agence à Cotonou pour mieux servir nos clients de la région.',
    type: 'success',
    priority: 'high',
    author: 'Direction',
    categories: ['Entreprise', 'Expansion'],
    active: true,
    views: 245,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'ann_002',
    title: 'Promotion Hiver -20%',
    content: 'Profitez de -20% sur tous nos services de design jusqu\'au 28 février!',
    type: 'promotion',
    priority: 'medium',
    author: 'Marketing',
    categories: ['Promotions', 'Offres'],
    active: true,
    views: 523,
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'ann_003',
    title: 'Formation IA pour les entreprises',
    content: 'Découvrez notre nouvelle formation sur l\'intelligence artificielle appliquée aux businesses.',
    type: 'event',
    priority: 'medium',
    author: 'Éducation',
    categories: ['Formation', 'IA'],
    active: true,
    views: 189,
    createdAt: '2024-01-10T14:00:00Z'
  },
  {
    id: 'ann_004',
    title: 'Maintenance serveur prévue',
    content: 'Une maintenance est prévue ce samedi de 2h à 6h du matin. Tous les services seront temporairement indisponibles.',
    type: 'warning',
    priority: 'high',
    author: 'Technique',
    categories: ['Technique', 'Maintenance'],
    active: true,
    views: 78,
    createdAt: '2024-01-25T16:00:00Z'
  }
]

// GET - Get announcements
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const category = searchParams.get('category')
  const active = searchParams.get('active')

  let result = [...announcements]

  if (active === 'true') result = result.filter(a => a.active)
  if (type) result = result.filter(a => a.type === type)
  if (category) result = result.filter(a => a.categories.includes(category))

  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const categories = Array.from(new Set(announcements.flatMap(a => a.categories)))

  return NextResponse.json({
    announcements: result,
    categories,
    stats: {
      total: announcements.length,
      active: announcements.filter(a => a.active).length,
      totalViews: announcements.reduce((sum, a) => sum + a.views, 0)
    }
  })
}

// POST - Create announcement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, type, priority, author, categories, image, scheduledFor, expiresAt } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 })
    }

    const announcement: Announcement = {
      id: `ann_${Date.now()}`,
      title,
      content,
      type: type || 'info',
      priority: priority || 'medium',
      author: author || 'Système',
      categories: categories || ['General'],
      image,
      active: true,
      scheduledFor,
      expiresAt,
      views: 0,
      createdAt: new Date().toISOString()
    }

    announcements.push(announcement)

    return NextResponse.json({
      success: true,
      announcement,
      message: 'Annonce créée avec succès'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PATCH - Update announcement
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const index = announcements.findIndex(a => a.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Annonce non trouvée' }, { status: 404 })
    }

    announcements[index] = { ...announcements[index], ...updates }

    return NextResponse.json({
      success: true,
      announcement: announcements[index]
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Delete announcement
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 })
  }

  const index = announcements.findIndex(a => a.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Annonce non trouvée' }, { status: 404 })
  }

  announcements.splice(index, 1)

  return NextResponse.json({ success: true, message: 'Annonce supprimée' })
}
