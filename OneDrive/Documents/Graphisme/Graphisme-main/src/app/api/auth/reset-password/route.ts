// Reset Password API - Graphisme by ELECTRON
// Handles actual password reset with token

import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/lib/db/json-db'
import bcrypt from 'bcryptjs'

// Reference to the reset tokens (same as forgot-password)
const resetTokens = new Map<string, { email: string; expires: Date }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token et nouveau mot de passe requis' },
        { status: 400 }
      )
    }

    // Verify token
    const tokenData = resetTokens.get(token)
    
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Token de réinitialisation invalide' },
        { status: 400 }
      )
    }

    if (tokenData.expires < new Date()) {
      resetTokens.delete(token)
      return NextResponse.json(
        { error: 'Le lien de réinitialisation a expiré' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = users.getByEmail(tokenData.email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password
    users.update(user.id, {
      password: hashedPassword,
      updatedAt: new Date().toISOString()
    })

    // Delete the used token
    resetTokens.delete(token)

    return NextResponse.json(
      { message: 'Mot de passe réinitialisé avec succès' }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la réinitialisation du mot de passe' },
      { status: 500 }
    )
  }
}
