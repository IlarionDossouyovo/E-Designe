// Support Tickets API - Graphisme by ELECTRON
// Manage support tickets

import { NextRequest, NextResponse } from 'next/server'

interface Message {
  id: string
  content: string
  from: 'user' | 'support'
  createdAt: string
}

interface Ticket {
  id: string
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'pending' | 'resolved' | 'closed'
  userEmail: string
  userName: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

let tickets: Ticket[] = []

const categories = [
  'Technique',
  'Facturation',
  'Commande',
  'Autre'
]

// GET - Get tickets
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const status = searchParams.get('status')

  let result = [...tickets]

  if (email) {
    result = result.filter(t => t.userEmail === email)
  }

  if (status) {
    result = result.filter(t => t.status === status)
  }

  result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  return NextResponse.json({
    tickets: result,
    categories,
    stats: {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      pending: tickets.filter(t => t.status === 'pending').length,
      resolved: tickets.filter(t => t.status === 'resolved').length
    }
  })
}

// POST - Create ticket or add message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketId, subject, category, priority, userEmail, userName, message } = body

    // If ticketId provided, add message to existing ticket
    if (ticketId) {
      const ticket = tickets.find(t => t.id === ticketId)
      if (!ticket) {
        return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 })
      }

      ticket.messages.push({
        id: `msg_${Date.now()}`,
        content: message,
        from: 'user',
        createdAt: new Date().toISOString()
      })
      ticket.updatedAt = new Date().toISOString()
      ticket.status = 'pending'

      return NextResponse.json({
        success: true,
        ticket,
        message: 'Message ajouté'
      })
    }

    // Otherwise create new ticket
    if (!subject || !category || !userEmail || !userName) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    const ticket: Ticket = {
      id: `ticket_${Date.now()}`,
      subject,
      category,
      priority: priority || 'medium',
      status: 'open',
      userEmail,
      userName,
      messages: message ? [{
        id: `msg_${Date.now()}`,
        content: message,
        from: 'user',
        createdAt: new Date().toISOString()
      }] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    tickets.push(ticket)

    return NextResponse.json({
      success: true,
      ticket,
      message: 'Ticket créé. Notre équipe vous répondra sous 24h.'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}

// PUT - Update ticket status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketId, status } = body

    const ticket = tickets.find(t => t.id === ticketId)
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 })
    }

    ticket.status = status
    ticket.updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      ticket,
      message: `Ticket ${status}`
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
