// WhatsApp Bot Webhook - Graphisme by ELECTRON
// Handle incoming WhatsApp messages and respond automatically

import { NextRequest, NextResponse } from 'next/server'

// WhatsApp Bot responses
const botResponses: Record<string, { keywords: string[]; response: string }> = {
  greeting: {
    keywords: ['bonjour', 'hello', 'salut', 'hi', 'coucou', 'start', 'menu'],
    response: `🎉 *Bienvenue chez Graphisme by ELECTRON!*

Je suis votre assistant virtuel. Je peux vous aider avec:

📦 *Services*
- Design Graphique
- Développement Web
- Applications Mobiles
- Production Vidéo

💰 *Tarifs*
- Demander un devis

🛒 *Commander*
- Passer une commande

💬 *Contact*
- Parler à un conseiller

Tapez le numéro de votre choix ou décrivez votre besoin!`
  },
  
  services: {
    keywords: ['service', 'services', 'design', 'web', 'site', 'application', 'video', 'production'],
    response: `🎨 *Nos Services*

1️⃣ *Design Graphique*
- Logo, Identité visuelle
- Affiches, Flyers
- Cartes de visite
- Packaging

2️⃣ *Développement Web*
- Sites vitrines
- E-commerce
- Applications web
- Maintenance

3️⃣ *Applications Mobiles*
- iOS & Android
- PWA

4️⃣ *Production Vidéo*
- Publicités
- Clips
- Documentaires

💬 Envoyez "devis" pour une estimation gratuite!`
  },
  
  pricing: {
    keywords: ['prix', 'tarif', 'devis', 'cout', 'cher', 'pas cher', 'estimation', 'quote'],
    response: `💰 *Demande de Devis*

Pour obtenir un devis gratuit, envoyez-moi:
- 📋 Type de projet (logo, site web, etc.)
- 📝 Description brève
- 💵 Budget approximatif

Notre équipe vous répondra sous 24h avec une proposition personnalisée!`
  },
  
  order: {
    keywords: ['commander', 'commande', 'acheter', 'achat', 'order', 'buy'],
    response: `🛒 *Passer une Commande*

Pour commander:
1. Visitez notre boutique: /shop
2. Ajoutez vos produits au panier
3. Validez votre commande

Ou dites-moi simplement ce que vous voulez et je vous guide!`
  },
  
  contact: {
    keywords: ['contact', 'telephone', 'phone', 'appel', 'whatsapp', 'adresse', 'where', 'ou'],
    response: `📍 *Nos Coordonnées*

📱 WhatsApp: +229 XX XX XX XX
📧 Email: contact@graphisme.electron
🌐 Site: graphisme.electron
📍 Adresse: Cotonou, Bénin

Heures d'ouverture:
Lun-Ven: 8h-18h
Sam: 9h-14h`
  },
  
  thanks: {
    keywords: ['merci', 'thanks', 'thank you', 'bravo', 'super', 'genial', 'parfait'],
    response: `🙏 *Merci a vous!*

C'est un plaisir de vous aider!

N'hesitez pas si vous avez d'autres questions.
Bonne journee! 👋`
  },
  
  default: {
    keywords: [],
    response: `🤔 *Je n'ai pas bien compris votre message.*

Tapez "menu" pour voir toutes les options disponibles.

Ou decrivez votre besoin et je ferai de mon mieux pour vous aider!`
  }
}

// Find matching response based on message
function findResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  for (const [key, data] of Object.entries(botResponses)) {
    if (key === 'default') continue
    
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword)) {
        return data.response
      }
    }
  }
  
  return botResponses.default.response
}

// GET - Verify webhook for WhatsApp
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'graphisme_verify_token'
  
  if (mode === 'subscribe' && token === verifyToken) {
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

// POST - Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const messaging = changes?.value?.messages?.[0]
    
    if (!messaging) {
      return NextResponse.json({ message: 'No message found' })
    }

    const from = messaging.from
    const messageText = messaging.text?.body || ''
    
    console.log(`WhatsApp message from ${from}: ${messageText}`)

    let settings = null
    try {
      const settingsRes = await fetch(new URL('/api/settings', request.url))
      settings = await settingsRes.json()
    } catch {}

    const whatsappConfig = settings?.apiKeys?.whatsapp
    const accessToken = whatsappConfig?.accessToken
    const phoneNumberId = whatsappConfig?.phoneNumberId

    const responseText = findResponse(messageText)

    if (accessToken && phoneNumberId) {
      try {
        await sendWhatsAppMessage(from, responseText, accessToken, phoneNumberId)
      } catch (error) {
        console.error('Failed to send WhatsApp reply:', error)
      }
    } else {
      console.log(`Would send to ${from}: ${responseText}`)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}

// Send WhatsApp message via Meta API
async function sendWhatsAppMessage(to: string, message: string, accessToken: string, phoneNumberId: string) {
  const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: message }
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }

  return response.json()
}
