// Forgot Password API - Graphisme by ELECTRON
// Handles password reset requests

import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/lib/db/json-db'
import crypto from 'crypto'

// In-memory store for reset tokens (in production, use Redis or database)
const resetTokens = new Map<string, { email: string; expires: Date }>()

// Generate reset token
function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Send reset email (using Resend or other email service)
async function sendResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3002'}/reset-password?token=${token}`
  
  const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: #0A0A0A; color: #fff; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; padding: 40px; }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo span { color: #FFD700; font-size: 24px; font-weight: bold; }
        h1 { color: #fff; text-align: center; }
        p { color: #aaa; line-height: 1.6; }
        .button { display: inline-block; background: #FFD700; color: #000; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <span>Graphisme</span> by ELECTRON
        </div>
        <h1>Réinitialisation de mot de passe</h1>
        <p>Bonjour,</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe:</p>
        <p style="text-align: center;">
          <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
        </p>
        <p>Ou copiez ce lien dans votre navigateur: ${resetUrl}</p>
        <p>Ce lien expire dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
        <div class="footer">
          <p>© 2026 Graphisme by ELECTRON - Cotonou, Benin</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Try to send via Resend if configured
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'noreply@graphisme.electron',
          to: email,
          subject: 'Réinitialisation de votre mot de passe - Graphisme by ELECTRON',
          html: emailContent
        })
      })
      
      if (!response.ok) {
        const error = await response.text()
        console.error('Resend error:', error)
        return false
      }
      return true
    } catch (error) {
      console.error('Email send error:', error)
      return false
    }
  }
  
  // If no email service configured, log the email (development)
  console.log(`📧 Password reset email would be sent to: ${email}`)
  console.log(`🔗 Reset link: ${resetUrl}`)
  return true
}

// POST: Request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Find user
    const user = users.getByEmail(email)
    
    // Don't reveal if user exists or not (security)
    if (!user) {
      return NextResponse.json(
        { message: 'Si cet email existe, un lien de réinitialisation a été envoyé' }
      )
    }

    // Generate reset token
    const token = generateResetToken()
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Store token
    resetTokens.set(token, { email, expires })

    // Send reset email
    const sent = await sendResetEmail(email, token)

    if (!sent) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email de réinitialisation' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Lien de réinitialisation envoyé' }
    )
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// Verify token validity
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      { valid: false, error: 'Token manquant' },
      { status: 400 }
    )
  }

  const tokenData = resetTokens.get(token)
  
  if (!tokenData) {
    return NextResponse.json(
      { valid: false, error: 'Token invalide' },
      { status: 400 }
    )
  }

  if (tokenData.expires < new Date()) {
    resetTokens.delete(token)
    return NextResponse.json(
      { valid: false, error: 'Token expiré' },
      { status: 400 }
    )
  }

  return NextResponse.json({
    valid: true,
    email: tokenData.email
  })
}
