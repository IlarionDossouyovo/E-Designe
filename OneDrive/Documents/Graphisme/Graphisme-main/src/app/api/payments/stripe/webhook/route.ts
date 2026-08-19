// Stripe Webhook Handler - Graphisme by ELECTRON
// Handles payment confirmation events from Stripe

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    const stripeKey = process.env.STRIPE_SECRET_KEY || ''
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

    // If no webhook secret configured, just log the event
    if (!webhookSecret || !stripeKey) {
      console.log('📝 Stripe webhook received (no webhook secret configured):')
      console.log(body.substring(0, 500))
      
      // Try to parse and handle basic events without verification
      try {
        const event = JSON.parse(body)
        await handleStripeEvent(event)
      } catch (parseError) {
        console.error('Failed to parse webhook:', parseError)
      }
      
      return NextResponse.json({ received: true, demo: true })
    }

    // In production, verify the signature
    // For now, we'll just parse and handle the event
    const event = JSON.parse(body)
    await handleStripeEvent(event)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleStripeEvent(event: any) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const orderId = session.metadata?.orderId
      
      if (orderId) {
        console.log(`✅ Payment completed for order: ${orderId}`)
        
        try {
          const allOrders = orders.getAll()
          const order = allOrders.find((o: any) => 
            o.id === orderId || 
            o.orderNumber === orderId ||
            o.stripeSessionId === session.id
          )
          
          if (order) {
            orders.update(order.id, {
              paymentStatus: 'paid',
              paymentMethod: 'stripe',
              stripePaymentStatus: session.payment_status,
              status: 'processing',
              paidAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            })
            console.log(`Order ${order.orderNumber || orderId} marked as PAID`)
          }
        } catch (error) {
          console.error('Failed to update order:', error)
        }
      }
      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object
      const orderId = session.metadata?.orderId
      
      if (orderId) {
        console.log(`⏰ Payment expired for order: ${orderId}`)
        
        try {
          const allOrders = orders.getAll()
          const order = allOrders.find((o: any) => 
            o.id === orderId || 
            o.orderNumber === orderId
          )
          
          if (order) {
            orders.update(order.id, {
              paymentStatus: 'expired',
              status: 'cancelled',
              updatedAt: new Date().toISOString()
            })
          }
        } catch (error) {
          console.error('Failed to update expired order:', error)
        }
      }
      break
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      console.log(`✅ PaymentIntent succeeded: ${paymentIntent.id}`)
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      console.log(`❌ Payment failed: ${paymentIntent.id}`)
      break
    }

    default:
      console.log(`📝 Unhandled Stripe event: ${event.type}`)
  }
}
