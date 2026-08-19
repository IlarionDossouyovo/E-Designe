// Payment Webhook - Graphisme by ELECTRON
// Confirme automatiquement les paiements et traite les commandes

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'

// Process order after payment confirmation
async function processPaidOrder(order: any) {
  // Update order status
  orders.update(order.id, {
    paymentStatus: 'paid',
    status: 'processing'
  } as any)

  // Send confirmation notification
  try {
    await fetch(new URL('/api/notifications/send', 'http://localhost:3000'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: order.customer?.email,
        phone: order.customer?.phone,
        template: 'order_completed',
        order: {
          orderNumber: order.orderNumber,
          customer: order.customer,
          total: order.total
        }
      })
    })
  } catch (e) {
    console.log('Notification not sent (Ollama may not be running)')
  }

  // Trigger AI workflow
  try {
    await fetch(new URL('/api/automation/trigger', 'http://localhost:3000'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'process_single',
        orderId: order.id
      })
    })
  } catch (e) {
    console.log('Automation not triggered')
  }

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.orderNumber,
    status: 'processing'
  }
}

// Webhook for Stripe payments
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, paymentId, orderId, status, amount, paymentMethod } = body

    // Find the order
    let order = null
    
    if (orderId) {
      order = orders.getById(orderId)
    } else if (paymentId) {
      // Find by payment reference
      const allOrders = orders.getAll() as any[]
      order = allOrders.find((o: any) => o.paymentRef === paymentId)
    }

    if (!order) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
    }

    // Process based on event type
    switch (event) {
      case 'payment.success':
      case 'payment.paid':
      case 'payment.completed':
        if (order.paymentStatus !== 'paid') {
          const result = await processPaidOrder(order)
          return NextResponse.json({
            message: 'Paiement confirmé, commande en cours de traitement',
            ...result
          })
        }
        return NextResponse.json({ message: 'Paiement déjà confirmé' })

      case 'payment.failed':
      case 'payment.cancelled':
        orders.update(order.id, {
          paymentStatus: 'failed',
          status: 'cancelled'
        })
        return NextResponse.json({
          success: true,
          message: 'Paiement annulé',
          orderId: order.id
        })

      case 'payment.pending':
        orders.update(order.id, {
          paymentStatus: 'pending'
        })
        return NextResponse.json({
          success: true,
          message: 'Paiement en attente',
          orderId: order.id
        })

      default:
        return NextResponse.json({ error: 'Event non reconnu' }, { status: 400 })
    }

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Erreur webhook' }, { status: 500 })
  }
}

// Manual payment confirmation
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, paymentStatus, paymentMethod, transactionId } = body

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID requis' }, { status: 400 })
    }

    const order = orders.getById(orderId)
    if (!order) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
    }

    // Update payment
    const updateData: any = {
      paymentStatus: paymentStatus || 'paid',
      paymentMethod: paymentMethod || 'manual',
      transactionId: transactionId || `MANUAL-${Date.now()}`
    }

    if (paymentStatus === 'paid') {
      updateData.status = 'processing'
      updateData.paidAt = new Date().toISOString()
    }

    orders.update(orderId, updateData)

    // If paid, trigger processing
    if (paymentStatus === 'paid') {
      await processPaidOrder(order)
    }

    return NextResponse.json({
      success: true,
      message: 'Paiement confirmé',
      order: { id: order.id, orderNumber: order.orderNumber, paymentStatus: updateData.paymentStatus }
    })

  } catch (error) {
    console.error('Confirm error:', error)
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}

// Get payment status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')

  if (!orderId) {
    return NextResponse.json({
      status: 'ready',
      events: ['payment.success', 'payment.failed', 'payment.pending'],
      methods: ['stripe', 'mobile_money', 'paypal', 'manual']
    })
  }

  const order = orders.getById(orderId)
  if (!order) {
    return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
  }

  return NextResponse.json({
    orderId: order.id,
    orderNumber: order.orderNumber,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    amount: order.total,
    currency: order.currency
  })
}
