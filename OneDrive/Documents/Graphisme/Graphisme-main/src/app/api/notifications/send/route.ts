// Notifications API - Graphisme by ELECTRON
// Send automatic notifications to clients (Email, WhatsApp, Telegram)

import { NextRequest, NextResponse } from 'next/server'

// Get settings with API keys
async function getSettings() {
  try {
    const res = await fetch(new URL('/api/settings', 'http://localhost:3000'), { 
      method: 'GET' 
    })
    return await res.json()
  } catch {
    return null
  }
}

// Email notification function
async function sendEmail(to: string, subject: string, html: string, settings: any) {
  const emailKey = settings?.apiKeys?.resend || settings?.apiKeys?.sendgrid || settings?.apiKeys?.mailgun
  
  if (!emailKey) {
    console.log('Email service not configured, skipping email')
    return { success: false, error: 'Email not configured' }
  }

  try {
    // Try Resend first (recommended)
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
      
      if (response.ok) {
        return { success: true, type: 'email', provider: 'resend' }
      }
    }
    
    // Try SendGrid
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
      
      if (response.ok || response.status === 202) {
        return { success: true, type: 'email', provider: 'sendgrid' }
      }
    }

    return { success: false, error: 'Email service failed' }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// WhatsApp notification function
async function sendWhatsApp(phone: string, message: string, settings: any) {
  const whatsappKey = settings?.apiKeys?.whatsapp?.accessToken
  const phoneId = settings?.apiKeys?.whatsapp?.phoneNumberId
  
  if (!whatsappKey || !phoneId) {
    console.log('WhatsApp not configured, skipping')
    return { success: false, error: 'WhatsApp not configured' }
  }

  try {
    const formattedPhone = phone.replace(/\D/g, '')
    const fullPhone = formattedPhone.startsWith('229') ? formattedPhone : `229${formattedPhone}`

    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${whatsappKey}`
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: fullPhone,
        type: 'text',
        text: { body: message }
      })
    })

    if (response.ok) {
      return { success: true, type: 'whatsapp' }
    }
    return { success: false, error: 'WhatsApp send failed' }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// Telegram notification function
async function sendTelegram(chatId: string, message: string, settings: any) {
  const botToken = settings?.apiKeys?.telegram?.botToken
  
  if (!botToken) {
    console.log('Telegram not configured, skipping')
    return { success: false, error: 'Telegram not configured' }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })

    if (response.ok) {
      return { success: true, type: 'telegram' }
    }
    return { success: false, error: 'Telegram send failed' }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// Email templates
const templates: Record<string, (order: any) => { subject: string; html: string }> = {
  order_confirmation: (order) => ({
    subject: `Confirmation de commande #${order.orderNumber} - Graphisme by ELECTRON`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 20px; text-align: center;">
          <h1 style="color: #000; margin: 0;">Graphisme by ELECTRON</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">Confirmation de commande</h2>
          <p>Bonjour <strong>${order.customer?.name || 'Client'}</strong>,</p>
          <p>Nous avons bien reçu votre commande.</p>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Numéro:</strong> ${order.orderNumber}</p>
            <p><strong>Total:</strong> ${order.total?.toLocaleString() || 0} XOF</p>
          </div>
          <p>Notre équipe va traiter votre commande.</p>
        </div>
      </div>
    `
  }),
  
  invoice: (order) => ({
    subject: `Facture #${order.orderNumber} - Graphisme by ELECTRON`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h1>FACTURE #${order.orderNumber}</h1>
        <p>Montant: ${order.total?.toLocaleString() || 0} XOF</p>
        <p>Échéance: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('fr-FR')}</p>
      </div>
    `
  }),

  order_completed: (order) => ({
    subject: `Commande #${order.orderNumber} terminée - Graphisme by ELECTRON`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h1>✅ Commande Terminée</h1>
        <p>Votre commande #${order.orderNumber} a été traitée avec succès!</p>
      </div>
    `
  })
}

// POST - Send notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, to, phone, telegramChatId, order, template, customMessage } = body

    const settings = await getSettings()
    const results: any[] = []

    // Send email
    if (to && (template || customMessage)) {
      let subject = ''
      let html = ''
      
      if (template && templates[template]) {
        const t = templates[template](order)
        subject = t.subject
        html = t.html
      } else {
        subject = 'Message de Graphisme by ELECTRON'
        html = `<p>${customMessage || 'Bonjour!'}</p>`
      }

      const emailResult = await sendEmail(to, subject, html, settings)
      results.push(emailResult)
    }

    // Send WhatsApp
    if (phone) {
      let message = ''
      
      if (template === 'order_confirmation') {
        message = `🛒 *Graphisme by ELECTRON*\n\nCommande #${order?.orderNumber} confirmee!\nTotal: ${order?.total?.toLocaleString() || 0} XOF\n\nMerci!`
      } else if (template === 'order_completed') {
        message = `✅ *Graphisme by ELECTRON*\n\nCommande #${order?.orderNumber} terminee!`
      } else if (customMessage) {
        message = customMessage
      }

      if (message) {
        const whatsappResult = await sendWhatsApp(phone, message, settings)
        results.push(whatsappResult)
      }
    }

    // Send Telegram
    if (telegramChatId) {
      let message = ''
      
      if (template === 'order_confirmation') {
        message = `🛒 *NOUVELLE COMMANDE*\n\n#${order?.orderNumber}\nClient: ${order?.customer?.name}\nTotal: ${order?.total?.toLocaleString() || 0} XOF`
      } else if (customMessage) {
        message = customMessage
      }

      if (message) {
        const telegramResult = await sendTelegram(telegramChatId, message, settings)
        results.push(telegramResult)
      }
    }

    const successCount = results.filter(r => r.success).length

    return NextResponse.json({
      success: successCount > 0,
      sent: successCount,
      total: results.length,
      results
    })

  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ error: 'Erreur lors de envoi' }, { status: 500 })
  }
}

// GET - Get notification status
export async function GET() {
  const settings = await getSettings()
  
  return NextResponse.json({
    status: 'ready',
    configured: {
      email: !!(settings?.apiKeys?.resend || settings?.apiKeys?.sendgrid),
      whatsapp: !!(settings?.apiKeys?.whatsapp?.accessToken),
      telegram: !!(settings?.apiKeys?.telegram?.botToken)
    },
    templates: Object.keys(templates)
  })
}
