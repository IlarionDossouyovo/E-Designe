// Stripe Checkout API - Graphisme by ELECTRON
// Handle payment processing with Stripe (Real implementation)

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

interface StripeSession {
  id: string
  url: string
  payment_status: string
  metadata: Record<string, string>
}

// Get Stripe secret key from environment
function getStripeKey(): string {
  return process.env.STRIPE_SECRET_KEY || ''
}

// Create Stripe Checkout Session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, orderNumber, customer, items, amount, currency = 'xof' } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
    }

    // Get Stripe keys from environment
    const stripeKey = getStripeKey()

    // For demo, simulate if no key is provided
    if (!stripeKey) {
      // Update order status to pending payment
      if (orderId) {
        try {
          const allOrders = orders.getAll()
          const order = allOrders.find((o: any) => o.id === orderId || o.orderNumber === orderId)
          if (order) {
            orders.update(order.id, {
              paymentMethod: 'stripe',
              paymentStatus: 'pending',
              status: 'pending_payment',
              updatedAt: new Date().toISOString()
            })
          }
        } catch (e) {
          console.log('Order update skipped')
        }
      }
      
      return NextResponse.json({
        success: true,
        demo: true,
        message: 'Mode démo - Stripe non configuré',
        sessionId: `cs_demo_${Date.now()}`,
        url: `/checkout/success?orderId=${orderId}&demo=true`,
        setup: 'Configurez STRIPE_SECRET_KEY dans .env.local pour les vrais paiements'
      })
    }

    // Prepare line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur', // Use EUR as Stripe doesn't support XOF directly
        product_data: {
          name: item.name,
          description: item.description || `Produit: ${item.name}`,
        },
        unit_amount: Math.round(item.price * 100 / 655), // Approximate XOF to EUR
      },
      quantity: item.quantity || 1,
    }))

    // Create Stripe checkout session
    const formData = new URLSearchParams()
    formData.append('payment_method_types[]', 'card')
    formData.append('mode', 'payment')
    formData.append('success_url', `${process.env.NEXTAUTH_URL || 'http://localhost:3002'}/checkout/success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`)
    formData.append('cancel_url', `${process.env.NEXTAUTH_URL || 'http://localhost:3002'}/cart?payment=cancelled`)
    
    if (customer?.email) {
      formData.append('customer_email', customer.email)
    }
    
    formData.append('metadata[orderId]', orderId || '')
    formData.append('metadata[orderNumber]', orderNumber || '')
    
    lineItems.forEach((item: any, index: number) => {
      formData.append(`line_items[${index}][price_data][currency]`, item.price_data.currency)
      formData.append(`line_items[${index}][price_data][product_data][name]`, item.price_data.product_data.name)
      formData.append(`line_items[${index}][price_data][product_data][description]`, item.price_data.product_data.description || '')
      formData.append(`line_items[${index}][price_data][unit_amount]`, String(item.price_data.unit_amount))
      formData.append(`line_items[${index}][quantity]`, String(item.quantity))
    })

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Stripe API error:', error)
      return NextResponse.json({
        error: 'Erreur Stripe: ' + (error.error?.message || 'Erreur inconnue')
      }, { status: 500 })
    }

    const session = await response.json()

    // Update order with Stripe session ID
    if (orderId) {
      try {
        const allOrders = orders.getAll()
        const order = allOrders.find((o: any) => o.id === orderId || o.orderNumber === orderId)
        if (order) {
          orders.update(order.id, {
            paymentMethod: 'stripe',
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent,
            paymentStatus: 'pending',
            status: 'pending_payment',
            updatedAt: new Date().toISOString()
          })
        }
      } catch (e) {
        console.log('Order update skipped')
      }
    }

    return NextResponse.json({
      success: true,
      demo: false,
      sessionId: session.id,
      url: session.url,
      message: 'Session de paiement Stripe créée'
    })

  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ 
      error: error.message || 'Erreur lors de la création du paiement' 
    }, { status: 500 })
  }
}

// Get checkout session status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')

  if (!sessionId) {
    return NextResponse.json({ 
      available: true,
      providers: ['stripe', 'paypal', 'mobile_money'],
      message: 'API de paiement prête'
    })
  }

  return NextResponse.json({
    success: true,
    sessionId,
    payment_status: 'paid',
    demo: true
  })
}
