// Social Media Schedule API - Graphisme by ELECTRON
// Schedule and manage social media posts

import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo (use database in production)
let scheduledPosts: any[] = []

// Generate unique ID
function generateId() {
  return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// GET - Get all scheduled posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  let posts = [...scheduledPosts]
  
  if (status) {
    posts = posts.filter(p => p.status === status)
  }

  // Sort by creation date (newest first)
  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({
    posts,
    total: posts.length,
    byStatus: {
      draft: posts.filter(p => p.status === 'draft').length,
      scheduled: posts.filter(p => p.status === 'scheduled').length,
      published: posts.filter(p => p.status === 'published').length,
      failed: posts.filter(p => p.status === 'failed').length
    }
  })
}

// POST - Create new scheduled post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, platforms, scheduledAt, media } = body

    if (!content || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Contenu et plateformes requis' },
        { status: 400 }
      )
    }

    const now = new Date()
    const scheduled = scheduledAt ? new Date(scheduledAt) : null
    
    const post: any = {
      id: generateId(),
      content,
      platforms,
      media: media || [],
      scheduledAt: scheduledAt || null,
      status: scheduled && scheduled > now ? 'scheduled' : 'draft',
      createdAt: now.toISOString(),
      publishedAt: null
    }

    scheduledPosts.push(post)

    // If scheduled for immediate publishing
    if (!scheduled || scheduled <= now) {
      // In production, this would trigger actual publishing
      post.status = 'published'
      post.publishedAt = now.toISOString()
    }

    return NextResponse.json({
      success: true,
      post,
      message: post.status === 'scheduled' ? 'Post programmé' : 'Post créé'
    })

  } catch (error) {
    console.error('Schedule error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 })
  }
}

// PUT - Update scheduled post
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('id')
    
    const body = await request.json()
    const { content, platforms, scheduledAt, media, status } = body

    if (!postId) {
      return NextResponse.json({ error: 'Post ID requis' }, { status: 400 })
    }

    const postIndex = scheduledPosts.findIndex(p => p.id === postId)
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post non trouvé' }, { status: 404 })
    }

    const now = new Date()
    const scheduled = scheduledAt ? new Date(scheduledAt) : null

    scheduledPosts[postIndex] = {
      ...scheduledPosts[postIndex],
      ...(content && { content }),
      ...(platforms && { platforms }),
      ...(media && { media }),
      ...(scheduledAt && { 
        scheduledAt,
        status: scheduled && scheduled > now ? 'scheduled' : 'draft'
      }),
      ...(status && { status }),
      updatedAt: now.toISOString()
    }

    return NextResponse.json({
      success: true,
      post: scheduledPosts[postIndex]
    })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}

// DELETE - Delete scheduled post
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('id')

    if (!postId) {
      return NextResponse.json({ error: 'Post ID requis' }, { status: 400 })
    }

    const postIndex = scheduledPosts.findIndex(p => p.id === postId)
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post non trouvé' }, { status: 404 })
    }

    scheduledPosts.splice(postIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Post supprimé'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}
