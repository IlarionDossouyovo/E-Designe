// Testimonials API - Graphisme by ELECTRON
// Manage client testimonials

import { NextRequest, NextResponse } from 'next/server'

interface Testimonial {
  id: string
  name: string
  company?: string
  role?: string
  avatar?: string
  content: string
  rating: number
  service: string
  approved: boolean
  createdAt: string
}

let testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    company: 'TechCorp Benin',
    role: 'PDG',
    content: 'Graphisme by ELECTRON a créé notre logo et notre site web. Service professionnel et rapide. Je recommande fortement!',
    rating: 5,
    service: 'Logo + Site Web',
    approved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Marie Kouassi',
    company: 'Fashion House',
    role: 'Fondatrice',
    content: 'Excellent travail sur notre identité visuelle. L\'équipe est très réactive et créative.',
    rating: 5,
    service: 'Identité Visuelle',
    approved: true,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    name: 'Pierre Alassan',
    company: 'StartUp Africa',
    role: 'CEO',
    content: 'Notre application mobile a été livrée dans les délais. Très satisfaits du résultat final.',
    rating: 4,
    service: 'Application Mobile',
    approved: true,
    createdAt: '2024-01-05T10:00:00Z'
  }
]

// GET - Get testimonials
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const approved = searchParams.get('approved')

  let result = [...testimonials]

  if (approved === 'true') {
    result = result.filter(t => t.approved)
  }

  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const stats = {
    total: testimonials.length,
    averageRating: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
  }

  return NextResponse.json({
    testimonials: result,
    stats
  })
}

// POST - Add testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, role, content, rating, service } = body

    if (!name || !content || !rating) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      )
    }

    const testimonial: Testimonial = {
      id: `test_${Date.now()}`,
      name,
      company: company || '',
      role: role || '',
      content,
      rating,
      service: service || '',
      approved: false,
      createdAt: new Date().toISOString()
    }

    testimonials.push(testimonial)

    return NextResponse.json({
      success: true,
      message: 'Merci pour votre témoignage! Il sera publié après modération.'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
