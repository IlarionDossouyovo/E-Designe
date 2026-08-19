// Newsletter API - Graphisme by ELECTRON
// Send email campaigns to subscribers

import { NextRequest, NextResponse } from 'next/server'

// Email templates for newsletters
const newsletterTemplates = {
  welcome: {
    subject: 'Bienvenue chez Graphisme by ELECTRON!',
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 30px; text-align: center;">
          <h1 style="color: #000; margin: 0;">Graphisme by ELECTRON</h1>
          <p style="color: #333;">Créons ensemble l'impossible</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333;">Bienvenue ${name || 'cher client'}! 🎉</h2>
          <p>Nous sommes ravis de vous avoir parmi nos abonnés!</p>
          <p>Découvrez nos services:</p>
          <ul>
            <li>🎨 Design Graphique</li>
            <li>💻 Développement Web</li>
            <li>📱 Applications Mobiles</li>
            <li>🎬 Production Vidéo</li>
          </ul>
          <a href="https://graphisme.electron" style="display: inline-block; background: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Découvrir nos services</a>
        </div>
      </div>
    `
  },
  
  new_product: {
    subject: 'Nouveau service disponible!',
    html: (name: string, data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 30px; text-align: center;">
          <h1 style="color: #000; margin: 0;">🆕 Nouveau!</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333;">Nous avons quelque chose de nouveau pour vous!</h2>
          <p>Bonjour ${name || 'cher client'},</p>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #000;">${data?.title || 'Nouveau Service'}</h3>
            <p>${data?.description || 'Découvrez notre nouveau service de création visuelle.'}</p>
          </div>
          <a href="https://graphisme.electron/shop" style="display: inline-block; background: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Voir le service</a>
        </div>
      </div>
    `
  },
  
  promotion: {
    subject: 'Offre Spéciale - Ne manquez pas!',
    html: (name: string, data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF4444, #FF6B35); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">🔥 OFFRE SPÉCIALE</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <p>Bonjour ${name || 'cher client'},</p>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <p style="font-size: 24px;">🎁 <strong>${data?.discount || '20%'} de réduction</strong></p>
            <p>sur ${data?.service || 'tous nos services'}</p>
            <p style="color: #666;">Valable jusqu'au ${data?.validUntil || 'fin du mois'}</p>
          </div>
          <a href="https://graphisme.electron/contact" style="display: inline-block; background: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Profiter de l'offre</a>
        </div>
      </div>
    `
  },
  
  order_confirmation: {
    subject: 'Confirmation de votre commande',
    html: (name: string, data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 30px; text-align: center;">
          <h1 style="color: #000; margin: 0;">✅ Commande Confirmée</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <p>Bonjour ${name || 'cher client'},</p>
          <p>Nous avons bien reçu votre commande!</p>
          <div style="background: white; padding: 15px; border-radius: 10px;">
            <p><strong>Commande:</strong> ${data?.orderNumber || '#'}</p>
            <p><strong>Total:</strong> ${data?.total || 0} XOF</p>
          </div>
          <p>Notre équipe va traiter votre commande dans les plus brefs délais.</p>
        </div>
      </div>
    `
  }
}

// Get subscribers list
async function getSubscribers() {
  try {
    // In production, fetch from database
    // For demo, return sample subscribers
    return [
      { email: 'client1@example.com', name: 'Client 1', subscribed: true },
      { email: 'client2@example.com', name: 'Client 2', subscribed: true },
    ]
  } catch {
    return []
  }
}

// Send single email
async function sendEmail(to: string, subject: string, html: string, settings: any) {
  const emailKey = settings?.apiKeys?.resend || settings?.apiKeys?.sendgrid
  
  if (!emailKey) {
    console.log('Email service not configured')
    return { success: false, error: 'Email not configured' }
  }

  try {
    if (settings?.apiKeys?.resend) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKeys.resend}`
        },
        body: JSON.stringify({
          from: settings.emails?.fromEmail || 'noreply@graphisme.electron',
          to: to,
          subject: subject,
          html: html
        })
      })
      
      if (response.ok) return { success: true, provider: 'resend' }
    }

    if (settings?.apiKeys?.sendgrid) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKeys.sendgrid}`
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: settings.emails?.fromEmail || 'noreply@graphisme.electron' },
          subject: subject,
          content: [{ type: 'text/html', value: html }]
        })
      })
      
      if (response.ok || response.status === 202) return { success: true, provider: 'sendgrid' }
    }

    return { success: false, error: 'Email service failed' }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// GET - Get newsletter status
export async function GET() {
  const subscribers = await getSubscribers()
  
  return NextResponse.json({
    status: 'ready',
    subscribers: subscribers.filter(s => s.subscribed).length,
    templates: Object.keys(newsletterTemplates),
    usage: {
      sendCampaign: {
        method: 'POST',
        body: {
          type: 'welcome | new_product | promotion | order_confirmation | custom',
          subject: 'Sujet du邮件',
          content: 'Contenu HTML ou texte',
          recipients: 'all | specific emails'
        }
      }
    }
  })
}

// POST - Send newsletter campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, subject, content, htmlContent, recipients, data } = body

    // Get settings for API keys
    let settings = null
    try {
      const settingsRes = await fetch(new URL('/api/settings', request.url))
      settings = await settingsRes.json()
    } catch {}

    const subscribers = await getSubscribers()
    const targetRecipients = recipients === 'all' 
      ? subscribers.filter(s => s.subscribed)
      : Array.isArray(recipients) 
        ? recipients.map(e => ({ email: e, name: e.split('@')[0] }))
        : [{ email: recipients, name: recipients.split('@')[0] }]

    if (targetRecipients.length === 0) {
      return NextResponse.json({ error: 'Aucun destinataire' }, { status: 400 })
    }

    const results: any[] = []

    // Send to each recipient
    for (const recipient of targetRecipients) {
      let emailHtml = htmlContent || content || ''
      let emailSubject = subject

      // Use template if specified
      if (type && newsletterTemplates[type as keyof typeof newsletterTemplates]) {
        const template = newsletterTemplates[type as keyof typeof newsletterTemplates]
        emailSubject = template.subject
        emailHtml = template.html(recipient.name || '', data)
      }

      const result = await sendEmail(recipient.email, emailSubject, emailHtml, settings)
      results.push({
        email: recipient.email,
        ...result
      })

      // Small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    const successCount = results.filter(r => r.success).length

    return NextResponse.json({
      success: successCount > 0,
      sent: successCount,
      total: results.length,
      results: results.slice(0, 10) // Return first 10 for brevity
    })

  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
  }
}
