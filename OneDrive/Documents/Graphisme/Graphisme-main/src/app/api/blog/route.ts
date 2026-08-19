// Blog API - Graphisme by ELECTRON
// Manage blog posts

import { NextRequest, NextResponse } from 'next/server'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  image?: string
  author: string
  published: boolean
  views: number
  createdAt: string
  updatedAt: string
}

// Sample blog posts
let posts: BlogPost[] = [
  {
    id: '1',
    title: 'Comment créer une identité visuelle mémorable',
    slug: 'creer-identite-visuelle',
    excerpt: 'Découvrez les étapes clés pour créer une marque qui reste en mémoire.',
    content: 'L\'identité visuelle est bien plus qu\'un logo...',
    category: 'Design',
    tags: ['design', 'branding', 'logo'],
    author: 'Graphisme by ELECTRON',
    published: true,
    views: 1250,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Pourquoi votre entreprise a besoin d\'un site web',
    slug: 'pourquoi-site-web',
    excerpt: 'Dans l\'ère numérique, avoir une présence en ligne est essentiel.',
    content: 'De nos jours, les clients recherchent...',
    category: 'Web',
    tags: ['web', 'marketing', 'digital'],
    author: 'Graphisme by ELECTRON',
    published: true,
    views: 890,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Les tendances du marketing digital en 2024',
    slug: 'tendances-marketing-2024',
    excerpt: 'Restez ahead avec ces tendances émergentes.',
    content: 'Le marketing digital évolue rapidement...',
    category: 'Marketing',
    tags: ['marketing', 'digital', 'IA'],
    author: 'Graphisme by ELECTRON',
    published: true,
    views: 2100,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  }
]

const categories = ['Design', 'Web', 'Marketing', 'IA', 'Actualités']

// GET - Get posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')
  const published = searchParams.get('published')

  let result = [...posts]

  if (category) {
    result = result.filter(p => p.category === category)
  }

  if (slug) {
    const post = posts.find(p => p.slug === slug)
    if (post) {
      // Increment views
      post.views += 1
      return NextResponse.json(post)
    }
    return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
  }

  if (published === 'true') {
    result = result.filter(p => p.published)
  }

  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({
    posts: result,
    categories,
    stats: {
      total: posts.length,
      published: posts.filter(p => p.published).length,
      totalViews: posts.reduce((sum, p) => sum + p.views, 0)
    }
  })
}

// POST - Create post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, tags, image } = body

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Titre, contenu et catégorie requis' },
        { status: 400 }
      )
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const post: BlogPost = {
      id: `post_${Date.now()}`,
      title,
      slug,
      excerpt: excerpt || content.substring(0, 150) + '...',
      content,
      category,
      tags: tags || [],
      image,
      author: 'Graphisme by ELECTRON',
      published: false,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    posts.push(post)

    return NextResponse.json({
      success: true,
      post,
      message: 'Article créé'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}

// PUT - Update post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, ...updates } = body

    const post = posts.find(p => p.id === postId)
    if (!post) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
    }

    Object.assign(post, updates, { updatedAt: new Date().toISOString() })

    return NextResponse.json({ success: true, post })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
