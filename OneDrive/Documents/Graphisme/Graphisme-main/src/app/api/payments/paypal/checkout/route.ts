// PayPal Checkout API - Graphisme by ELECTRON
// Creates PayPal orders for payments

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

// Get PayPal credentials
function getPayPalCredentials(): { clientId: string; clientSecret: string } {
  return {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || ''
  }
}

// Get PayPal access token
async function getPayPalAccessToken(): Promise<string | null> {
  const { clientId, clientSecret } = getPayPalCredentials()
  
  if (!clientId || !clientSecret) {
    return null
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    
    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      console.error('PayPal token error:', await response.text())
      return null
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('PayPal auth error:', error)
    return null
  }
}

// Create PayPal order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, items, customer, amount, currency = 'EUR' } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
    }

    const { clientId } = getPayPalCredentials()

    // If no PayPal credentials, return demo mode
    if (!clientId) {
      if (orderId) {
        try {
          const allOrders = orders.getAll()
          const order = allOrders.find((o: any) => o.id === orderId || o.orderNumber === orderId)
          if (order) {
            orders.update(order.id, {
              paymentMethod: 'paypal',
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
        message: 'Mode démo - PayPal non configuré',
        orderId: `PP_demo_${Date.now()}`,
        approvalUrl: `/checkout/success?orderId=${orderId}&demo=true&provider=paypal`,
        setup: 'Configurez PAYPAL_CLIENT_ID et PAYPAL_CLIENT_SECRET dans .env.local'
      })
    }

    const accessToken = await getPayPalAccessToken()
    
    if (!accessToken) {
      return NextResponse.json({ error: 'Erreur authentification PayPal' }, { status: 500 })
    }

    const paypalOrder = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: orderId,
        description: `Commande Graphisme - ${orderId}`,
        amount: { currency_code: currency, value: amount.toFixed(2) },
        custom_id: orderId
      }],
      payer: customer?.email ? {
        email_address: customer.email,
        name: { given_name: customer.name?.split(' ')[0] || 'Customer', surname: customer.name?.split(' ').slice(1).join(' ') || '' }
      } : undefined
    }

    const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(paypalOrder)
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error: 'Erreur PayPal: ' + error }, { status: 500 })
    }

    const paypalResponse = await response.json()

    if (orderId) {
      try {
        const allOrders = orders.getAll()
        const order = allOrders.find((o: any) => o.id === orderId || o.orderNumber === orderId)
        if (order) {
          orders.update(order.id, {
            paymentMethod: 'paypal',
            paypalOrderId: paypalResponse.id,
            paymentStatus: 'pending',
            status: 'pending_payment',
            updatedAt: new Date().toISOString()
          })
        }
      } catch (e) { console.log('Order update skipped') }
    }

    const approvalUrl = paypalResponse.links?.find((link: any) => link.rel === 'approve')?.href

    return NextResponse.json({ success: true, demo: false, orderId: paypalResponse.id, approvalUrl, message: 'Ordre PayPal créé' })
  } catch (error: any) {
    console.error('PayPal checkout error:', error)
    return NextResponse.json({ error: error.message || 'Erreur PayPal' }, { status: 500 })
  }
}

// Capture PayPal payment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, paypalOrderId } = body

    if (!paypalOrderId) {
      return NextResponse.json({ error: 'ID PayPal requis' }, { status: 400 })
    }

    const { clientId } = getPayPalCredentials()

    if (!clientId) {
      try {
        const allOrders = orders.getAll()
        const order = allOrders.find((o: any) => o.id === orderId || o.orderNumber === orderId || o.paypalOrderId === paypalOrderId)
        if (order) {
          orders.update(order.id, {
            paymentStatus: 'paid',
            paymentMethod: 'paypal',
            paypalCaptureId: `demo_capture_${Date.now()}`,
            status: 'processing',
            paidAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }
      } catch (e) { console.log('Order update skipped') }
      return NextResponse.json({ success: true, demo: true, message: 'Paiement simulé' })
    }

    const accessToken = await getPayPalAccessToken()
    if (!accessToken) {
      return NextResponse.json({ error: 'Erreur authentification PayPal' }, { status: 500 })
    }

    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypalOrderId}/capture`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error: 'Erreur PayPal: ' + error }, { status: 500 })
    }

    const captureResponse = await response.json()

    if (orderId && captureResponse.status === 'COMPLETED') {
      try {
        const allOrders = orders.getAll()
        const order = allOrders.find((o: any) => o.id === orderId || o.orderNumber === orderId || o.paypalOrderId === paypalOrderId)
        if (order) {
          orders.update(order.id, {
            paymentStatus: 'paid',
            paymentMethod: 'paypal',
            paypalCaptureId: captureResponse.purchase_units?.[0]?.payments?.captures?.[0]?.id,
            status: 'processing',
            paidAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }
      } catch (e) { console.log('Order update skipped') }
    }

    return NextResponse.json({ success: true, status: captureResponse.status, message: captureResponse.status === 'COMPLETED' ? 'Paiement réussi' : 'En attente' })
  } catch (error: any) {
    console.error('PayPal capture error:', error)
    return NextResponse.json({ error: error.message || 'Erreur PayPal' }, { status: 500 })
  }
}
