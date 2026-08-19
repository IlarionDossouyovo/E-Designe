import { NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, customer, total } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      )
    }

    if (!customer || !customer.email || !customer.name) {
      return NextResponse.json(
        { error: 'Informations client incomplètes' },
        { status: 400 }
      )
    }

    // Get all orders for order number generation
    const allOrders = orders.getAll()

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order object
    const order = {
      id: orderId,
      orderNumber: `CMD-${new Date().getFullYear()}-${String(allOrders.length + 1).padStart(3, '0')}`,
      items: items.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
        address: customer.address || '',
        city: customer.city || '',
      },
      subtotal: total,
      shipping: 0,
      tax: 0,
      total,
      currency: 'XOF',
      status: 'pending',
      paymentMethod: customer.paymentMethod || 'card',
      paymentStatus: 'pending',
      shippingAddress: {
        street: customer.address || '',
        city: customer.city || '',
        country: 'Bénin'
      },
      notes: customer.note || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save order to database
    try {
      orders.create(order)
      console.log('Order saved to database:', orderId)
      
      // AUTOMATIC NOTIFICATIONS
      // Send confirmation to customer
      try {
        const notifyResponse = await fetch(new URL('/api/notifications/send', request.url), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: customer.email,
            phone: customer.phone,
            template: 'order_confirmation',
            order: {
              orderNumber: order.orderNumber,
              customer: { name: customer.name, email: customer.email },
              total: order.total
            }
          })
        })
        
        if (notifyResponse.ok) {
          console.log('Confirmation sent to customer')
        }
      } catch (notifyError) {
        console.log('Notification not sent (optional)')
      }

      // AUTOMATIC ORDER PROCESSING TRIGGER (only for orders awaiting processing)
      // Start AI workflow for the order
      try {
        const triggerResponse = await fetch(new URL('/api/automation/trigger', request.url), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'process_single', orderId: order.id })
        })
        
        if (triggerResponse.ok) {
          console.log('Auto-processing triggered')
        }
      } catch (autoError) {
        console.log('Auto-processing not triggered (Ollama may not be running)')
      }
      
    } catch (dbError) {
      console.error('Failed to save order:', dbError)
    }

    // Payment options returned to client
    const paymentOptions = {
      stripe: {
        available: true,
        url: `/api/payments/stripe/checkout`,
        note: 'Paiement par carte bancaire'
      },
      mobile: {
        available: true,
        url: `/api/payments/money`,
        providers: ['wave', 'moov', 'mtn', 'orange'],
        note: 'Paiement mobile (Afrique)'
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderNumber,
      message: 'Commande créée. Veuillez procéder au paiement.',
      order,
      paymentOptions,
      nextSteps: [
        'Choisissez votre méthode de paiement',
        'Effectuez le paiement',
        'Votre commande sera traitée automatiquement'
      ]
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la commande' },
      { status: 500 }
    )
  }
}

// Get orders
export async function GET() {
  try {
    const allOrders = orders.getAll()
    return NextResponse.json(allOrders)
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    )
  }
}
