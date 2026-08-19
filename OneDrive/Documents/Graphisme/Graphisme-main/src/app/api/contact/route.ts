import { NextRequest, NextResponse } from 'next/server'
import { contacts } from '@/lib/db/json-db'
import { z } from 'zod'

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  autoProcess: z.boolean().optional(),
})

// AI Agent to process contact automatically
async function processContactWithAI(contact: any): Promise<any> {
  const prompt = `Un nouveau client potentiel a soumis une demande de contact:
- Nom: ${contact.name}
- Email: ${contact.email}
- Téléphone: ${contact.phone || 'Non fourni'}
- Entreprise: ${contact.company || 'Non fourni'}
- Service intérêt: ${contact.service || 'Non spécifié'}
- Message: ${contact.message}

En tant que Commercial AI de Graphisme by ELECTRON:
1. Analyse les besoins du client
2. Propose les services adaptés
3. Prépare une réponse personnalisée en français
4. Génère une estimation de prix si possible (en XOF)`

  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:latest',
        messages: [
          { role: 'system', content: 'Tu es Commercial AI de Graphisme by ELECTRON. Tu réponds professionnellement aux demandes clients en français.' },
          { role: 'user', content: prompt }
        ],
        stream: false
      })
    })
    
    if (!response.ok) throw new Error('Ollama error')
    const data = await response.json()
    return { response: data.message?.content, processed: true }
  } catch (error) {
    return { response: null, processed: false, error: 'AI unavailable' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const autoProcess = body.autoProcess !== false // Default: true
    const validatedData = contactSchema.parse(body)

    const contact = contacts.create(validatedData)

    // AUTOMATIC AI PROCESSING
    let aiResult = null
    if (autoProcess) {
      try {
        aiResult = await processContactWithAI(validatedData)
      } catch (aiError) {
        console.error('AI processing error:', aiError)
      }
    }

    return NextResponse.json({
      message: autoProcess ? 'Message envoyé et traité automatiquement par notre IA' : 'Message envoyé avec succès',
      id: contact.id,
      aiProcessed: aiResult?.processed || false
    }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allContacts = contacts.getAll()
    return NextResponse.json(allContacts)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
