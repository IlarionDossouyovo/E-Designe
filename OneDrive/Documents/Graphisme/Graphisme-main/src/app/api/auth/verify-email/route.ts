// Email Verification API - Graphisme by ELECTRON
// Handles email verification with token-based system

import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/lib/db/json-db'
import crypto from 'crypto'

// In-memory store for verification tokens (in production, use Redis or database)
const verificationTokens = new Map<string, { email: string; expires: Date }>()

// Generate verification token
function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Send verification email (using Resend or other email service)
async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3002'}/verify-email?token=${token}`
  
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
        <h1>Vérification de votre email</h1>
        <p>Bonjour,</p>
        <p>Merci de vous être inscrit sur Graphisme by ELECTRON. Veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous:</p>
        <p style="text-align: center;">
          <a href="${verifyUrl}" class="button">Vérifier mon email</a>
        </p>
        <p>Ou copiez ce lien dans votre navigateur: ${verifyUrl}</p>
        <p>Ce lien expire dans 24 heures.</p>
        <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
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
          subject: 'Vérification de votre email - Graphisme by ELECTRON',
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
  console.log(`📧 Verification email would be sent to: ${email}`)
  console.log(`🔗 Verification link: ${verifyUrl}`)
  return true
}

// POST: Request email verification
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
    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        { message: 'Si cet email existe, un lien de vérification a été envoyé' }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Cet email est déjà vérifié' }
      )
    }

    // Generate verification token
    const token = generateVerificationToken()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Store token
    verificationTokens.set(token, { email, expires })

    // Send verification email
    const sent = await sendVerificationEmail(email, token)

    if (!sent) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email de vérification' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Lien de vérification envoyé' }
    )
  } catch (error) {
    console.error('Verification request error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// GET: Verify email with token
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/verify-email?error=no-token', request.url))
  }

  // Check if token exists and is valid
  const tokenData = verificationTokens.get(token)
  
  if (!tokenData) {
    return NextResponse.redirect(new URL('/verify-email?error=invalid-token', request.url))
  }

  if (tokenData.expires < new Date()) {
    verificationTokens.delete(token)
    return NextResponse.redirect(new URL('/verify-email?error=expired', request.url))
  }

  // Find user and mark as verified
  const user = users.getByEmail(tokenData.email)
  
  if (!user) {
    return NextResponse.redirect(new URL('/verify-email?error=user-not-found', request.url))
  }

  // Update user as verified
  users.update(user.id, {
    emailVerified: new Date().toISOString()
  })

  // Delete token
  verificationTokens.delete(token)

  // Redirect to success page
  return NextResponse.redirect(new URL('/verify-email?success=true', request.url))
}
