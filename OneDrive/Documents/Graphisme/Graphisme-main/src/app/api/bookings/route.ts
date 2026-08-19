// Bookings API - Graphisme by ELECTRON
// Manage service reservations

import { NextRequest, NextResponse } from 'next/server'

interface Booking {
  id: string
  service: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

let bookings: Booking[] = []

// Available services
const services = [
  { id: 'consultation', name: 'Consultation', duration: 30, price: 5000 },
  { id: 'logo', name: 'Création Logo', duration: 60, price: 25000 },
  { id: 'website', name: 'Site Web', duration: 120, price: 150000 },
  { id: 'video', name: 'Production Vidéo', duration: 180, price: 100000 },
  { id: 'maintenance', name: 'Maintenance', duration: 60, price: 20000 },
]

// GET - Get bookings
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const date = searchParams.get('date')

  let result = [...bookings]

  if (status) {
    result = result.filter(b => b.status === status)
  }

  if (date) {
    result = result.filter(b => b.date === date)
  }

  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({
    bookings: result,
    services,
    stats: {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length
    }
  })
}

// POST - Create booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, clientName, clientEmail, clientPhone, date, time, notes } = body

    if (!service || !clientName || !clientEmail || !date || !time) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    const serviceInfo = services.find(s => s.id === service)

    const booking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      service: serviceInfo?.name || service,
      clientName,
      clientEmail,
      clientPhone: clientPhone || '',
      date,
      time,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    bookings.push(booking)

    return NextResponse.json({
      success: true,
      booking,
      message: 'Réservation créée avec succès'
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 })
  }
}

// PUT - Update booking status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, status } = body

    const booking = bookings.find(b => b.id === bookingId)
    if (!booking) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 })
    }

    booking.status = status

    return NextResponse.json({
      success: true,
      booking,
      message: `Statut mis à jour: ${status}`
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}

// DELETE - Cancel booking
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const bookingId = searchParams.get('id')

  const index = bookings.findIndex(b => b.id === bookingId)
  if (index === -1) {
    return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 })
  }

  bookings.splice(index, 1)

  return NextResponse.json({ success: true, message: 'Réservation annulée' })
}
