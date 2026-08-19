// Mobile Money Payment API - Graphisme by ELECTRON
// Support for Wave, Moov (Benin), Orange, MTN

import { NextRequest, NextResponse } from 'next/server'

interface MobileMoneyProvider {
  id: string
  name: string
  country: string
  color: string
}

// Supported mobile money providers in Africa
const PROVIDERS: MobileMoneyProvider[] = [
  { id: 'wave', name: 'Wave', country: 'Sénégal, Mali', color: '#00D4FF' },
  { id: 'moov', name: 'Moov Money', country: 'Bénin, Togo', color: '#FF6B35' },
  { id: 'mtn', name: 'MTN MoMo', country: 'Afrique', color: '#FFCC00' },
  { id: 'orange', name: 'Orange Money', country: 'Afrique', color: '#FF7900' },
  { id: 'airtel', name: 'Airtel Money', country: 'Afrique', color: '#E60000' },
]

// Create payment request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, phone, amount, orderId, orderNumber, customer } = body

    if (!provider || !phone || !amount) {
      return NextResponse.json(
        { error: 'Provider, téléphone et montant requis' },
        { status: 400 }
      )
    }

    // Validate provider
    const validProvider = PROVIDERS.find(p => p.id === provider)
    if (!validProvider) {
      return NextResponse.json(
        { error: 'Provider invalide', validProviders: PROVIDERS.map(p => p.id) },
        { status: 400 }
      )
    }

    // Format phone number
    const formattedPhone = phone.replace(/\D/g, '')
    
    // Generate payment reference
    const paymentRef = `GFX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // In production, you would integrate with actual APIs:
    // - Wave: https://api.wave.com/
    // - Moov: https://developer.moov.ci/
    // For now, we create a mock payment

    const payment = {
      id: paymentRef,
      provider: validProvider.id,
      providerName: validProvider.name,
      phone: formattedPhone,
      amount,
      currency: 'XOF',
      status: 'pending',
      orderId,
      orderNumber,
      customerName: customer?.name,
      customerEmail: customer?.email,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      instructions: getPaymentInstructions(validProvider.id, formattedPhone, amount)
    }

    // Store payment (in production, save to database)
    // For demo, we return the payment details

    return NextResponse.json({
      success: true,
      payment,
      message: `Paiement ${validProvider.name} créé. Instructions ci-dessous.`,
      nextSteps: [
        'Ouvrez votre application ' + validProvider.name,
        'Allez dans "Envoyer de l\'argent" ou "Paiement"',
        'Entrez le numéro indiqué dans les instructions',
        'Confirmez le paiement'
      ]
    })

  } catch (error) {
    console.error('Mobile money error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}

// Get payment status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('paymentId')

  if (paymentId) {
    // In production, check payment status with provider API
    return NextResponse.json({
      success: true,
      paymentId,
      status: 'pending',
      message: 'En attente de confirmation'
    })
  }

  return NextResponse.json({
    providers: PROVIDERS,
    message: 'API Mobile Money prête',
    usage: {
      method: 'POST',
      body: {
        provider: 'wave | moov | mtn | orange | airtel',
        phone: '229XXXXXXXX',
        amount: 10000,
        orderId: 'order-123',
        orderNumber: 'CMD-2026-001',
        customer: { name: 'Client', email: 'client@email.com' }
      }
    }
  })
}

// Get payment instructions based on provider
function getPaymentInstructions(provider: string, phone: string, amount: number): string {
  const instructions: Record<string, string> = {
    wave: `Envoyer ${amount} XOF au ${phone} via Wave`,
    moov: `Envoyer ${amount} XOF au ${phone} via Moov Money`,
    mtn: `Envoyer ${amount} XOF au ${phone} via MTN MoMo`,
    orange: `Envoyer ${amount} XOF au ${phone} via Orange Money`,
    airtel: `Envoyer ${amount} XOF au ${phone} via Airtel Money`
  }
  return instructions[provider] || `Paiement de ${amount} XOF`
}
