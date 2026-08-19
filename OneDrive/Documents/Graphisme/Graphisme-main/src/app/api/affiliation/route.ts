// Affiliation API - Graphisme by ELECTRON
// Manage referral program and commissions

import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo
interface Referral {
  id: string
  referrerId: string
  referredId: string
  referrerEmail: string
  referredEmail: string
  commission: number
  status: 'pending' | 'approved' | 'paid'
  orderId?: string
  createdAt: string
}

let referrals: Referral[] = []

// Generate unique code
function generateCode(length = 8): string {
  return Math.random().toString(36).substr(2, length).toUpperCase()
}

// GET - Get affiliation stats
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const type = searchParams.get('type')

  // Get all referrals
  if (type === 'all') {
    return NextResponse.json({
      referrals,
      stats: {
        total: referrals.length,
        pending: referrals.filter(r => r.status === 'pending').length,
        approved: referrals.filter(r => r.status === 'approved').length,
        paid: referrals.filter(r => r.status === 'paid').length,
        totalCommission: referrals.reduce((sum, r) => sum + r.commission, 0)
      }
    })
  }

  // Get user's referrals
  if (userId) {
    const userRefs = referrals.filter(r => r.referrerId === userId)
    return NextResponse.json({
      referrals: userRefs,
      stats: {
        total: userRefs.length,
        pending: userRefs.filter(r => r.status === 'pending').length,
        approved: userRefs.filter(r => r.status === 'approved').length,
        totalEarnings: userRefs
          .filter(r => r.status === 'approved' || r.status === 'paid')
          .reduce((sum, r) => sum + r.commission, 0)
      }
    })
  }

  return NextResponse.json({
    message: 'API prête',
    usage: {
      GET_affiliates: '/api/affiliation?userId=xxx',
      GET_all: '/api/affiliation?type=all',
      POST_referral: '{ referrerId, referredEmail }'
    }
  })
}

// POST - Create new referral
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referrerId, referrerEmail, referredEmail, orderId, amount } = body

    if (!referrerId || !referredEmail) {
      return NextResponse.json(
        { error: 'Referrer ID et email du filleul requis' },
        { status: 400 }
      )
    }

    // Check if already referred
    const existing = referrals.find(r => 
      r.referrerId === referrerId && 
      r.referredEmail === referredEmail
    )

    if (existing) {
      return NextResponse.json(
        { error: 'Ce client a déjà été parrainé' },
        { status: 400 }
      )
    }

    // Calculate commission (10% by default)
    const commission = amount ? Math.round(amount * 0.1) : 5000 // Default 5000 XOF

    const referral: Referral = {
      id: `ref_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      referrerId,
      referredId: `referred_${Date.now()}`,
      referrerEmail,
      referredEmail,
      commission,
      status: 'pending',
      orderId,
      createdAt: new Date().toISOString()
    }

    referrals.push(referral)

    return NextResponse.json({
      success: true,
      referral,
      message: 'Parrainage enregistré',
      commission: `${commission.toLocaleString()} XOF`
    })

  } catch (error) {
    console.error('Referral error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 })
  }
}

// PUT - Update referral status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { referralId, status } = body

    if (!referralId) {
      return NextResponse.json({ error: 'Referral ID requis' }, { status: 400 })
    }

    const referral = referrals.find(r => r.id === referralId)
    if (!referral) {
      return NextResponse.json({ error: 'Parrainage non trouvé' }, { status: 404 })
    }

    referral.status = status

    return NextResponse.json({
      success: true,
      referral,
      message: `Statut mis à jour: ${status}`
    })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}
