// Loyalty Program API - Graphisme by ELECTRON
// Manage points and rewards

import { NextRequest, NextResponse } from 'next/server'

interface Reward {
  id: string
  name: string
  description: string
  points: number
  image?: string
  active: boolean
}

interface PointsTransaction {
  id: string
  userId: string
  type: 'earn' | 'redeem'
  points: number
  description: string
  createdAt: string
}

interface UserPoints {
  userId: string
  email: string
  totalPoints: number
  lifetimePoints: number
  transactions: PointsTransaction[]
}

// In-memory storage
let usersPoints: UserPoints[] = []
let rewards: Reward[] = [
  { id: '1', name: 'Logo Gratuit', description: 'Un logo basic gratuit', points: 5000, active: true },
  { id: '2', name: 'Site Web -10%', description: '10% de réduction sur site web', points: 3000, active: true },
  { id: '3', name: 'Consultation Gratuite', description: '30min de consultation gratuite', points: 2000, active: true },
  { id: '4', name: 'T-shirt Graphisme', description: 'T-shirt personnalisé', points: 1500, active: true },
  { id: '5', name: '5% Reduction', description: '5% sur prochaine commande', points: 1000, active: true },
]

// Points rules
const pointsPerXOF = 1 // 1 point per XOF spent

// GET - Get user points or rewards
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const type = searchParams.get('type')

  if (type === 'rewards') {
    return NextResponse.json({
      rewards: rewards.filter(r => r.active)
    })
  }

  if (userId) {
    let user = usersPoints.find(u => u.userId === userId)
    if (!user) {
      // Create new user
      user = {
        userId,
        email: `${userId}@example.com`,
        totalPoints: 0,
        lifetimePoints: 0,
        transactions: []
      }
      usersPoints.push(user)
    }
    return NextResponse.json(user)
  }

  return NextResponse.json({
    message: 'API fidélité',
    rewards: rewards.filter(r => r.active),
    rules: {
      pointsPerXOF,
      welcomeBonus: 100,
      referralBonus: 500
    }
  })
}

// POST - Earn or redeem points
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, points, description, amount } = body

    if (!userId || !type || !points) {
      return NextResponse.json(
        { error: 'Paramètres requis' },
        { status: 400 }
      )
    }

    let user = usersPoints.find(u => u.userId === userId)
    if (!user) {
      user = {
        userId,
        email: `${userId}@example.com`,
        totalPoints: 0,
        lifetimePoints: 0,
        transactions: []
      }
      usersPoints.push(user)
    }

    const transaction: PointsTransaction = {
      id: `tx_${Date.now()}`,
      userId,
      type,
      points,
      description: description || (type === 'earn' ? 'Points gagnés' : 'Points utilisés'),
      createdAt: new Date().toISOString()
    }

    if (type === 'earn') {
      // Calculate points from amount
      const earnedPoints = amount ? Math.floor(amount * pointsPerXOF) : points
      user.totalPoints += earnedPoints
      user.lifetimePoints += earnedPoints
      transaction.points = earnedPoints
    } else if (type === 'redeem') {
      if (user.totalPoints < points) {
        return NextResponse.json(
          { error: 'Points insuffisants' },
          { status: 400 }
        )
      }
      user.totalPoints -= points
    }

    user.transactions.unshift(transaction)

    return NextResponse.json({
      success: true,
      user,
      transaction,
      message: type === 'earn' ? 'Points gagnés!' : 'Réclamation réussie!'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}

// PUT - Update reward
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { rewardId, active } = body

    const reward = rewards.find(r => r.id === rewardId)
    if (!reward) {
      return NextResponse.json({ error: 'Récompense non trouvée' }, { status: 404 })
    }

    if (active !== undefined) reward.active = active

    return NextResponse.json({ success: true, reward })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
