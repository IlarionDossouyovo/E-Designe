// Webhook API for External Orders - Graphisme by ELECTRON
// Receives orders from external sources (forms, social media, APIs)
// and automatically processes them with AI agents

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'

// Full automation workflow
const FULL_WORKFLOW = [
  { name: 'Analyse de la commande', agent: 'CEO' },
  { name: 'Preparation du devis', agent: 'Commercial' },
  { name: 'Validation technique', agent: 'Developer' },
  { name: 'Generation de la facture', agent: 'Finance' },
  { name: 'Notification client', agent: 'Support' }
]

async function callAgent(agentName: string, prompt: string, model = 'llama3.2:latest'): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: getSystemPrompt(agentName) },
          { role: 'user', content: prompt }
        ],
        stream: false
      })
    })
    if (!response.ok) throw new Error(`Ollama error: ${response.statusText}`)
    const data = await response.json()
    return data.message?.content || 'Pas de reponse'
  } catch (error) {
    return `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
  }
}

function getSystemPrompt(agentName: string): string {
  const prompts: Record<string, string> = {
    CEO: 'Tu es CEO AI de Graphisme by ELECTRON. Analyse cette commande et determine le type de service, la complexite et les ressources. Reponds en francais.',
    Commercial: 'Tu es Commercial AI. Prepare un devis detaille et identifie les besoins. Reponds en francais avec prix en XOF.',
    Developer: 'Tu es Developer AI. Evalue la faisabilite technique et les technologies necessaires. Reponds en francais.',
    Finance: 'Tu es Finance AI. Genere une facture detaillee avec conditions de paiement en XOF.',
    Support: 'Tu es Support AI. Prepare un message de confirmation professionnel en francais.'
  }
  return prompts[agentName] || 'Tu es un assistant IA.'
}

function getAgentModel(agentName: string): string {
  const models: Record<string, string> = {
    CEO: 'llama3.2:latest',
    Commercial: 'llama3.2:latest',
    Developer: 'qwen2.5-coder:7b',
    Finance: 'llama3.1:8b',
    Support: 'llama3.2:latest'
  }
  return models[agentName] || 'llama3.2:latest'
}

// Process order automatically with AI workflow
async function processOrderAutomatically(order: any): Promise<{ success: boolean; steps: any[]; error?: string }> {
  const context = `Commande #${order.orderNumber}\nClient: ${order.customer?.name || 'Inconnu'}\nEmail: ${order.customer?.email || 'Inconnu'}\nArticles: ${order.items?.map((i: any) => i.name + ' x' + i.quantity).join(', ') || order.description || 'Service'}\nTotal: ${order.total || 0} XOF`

  const results: any[] = []

  // Update status to processing
  orders.update(order.id, { status: 'processing' })

  // Process each workflow step
  for (let i = 0; i < FULL_WORKFLOW.length; i++) {
    const step = FULL_WORKFLOW[i]
    const model = getAgentModel(step.agent)
    const result = await callAgent(step.agent, context, model)

    results.push({
      step: i + 1,
      agent: step.agent,
      name: step.name,
      result: result.substring(0, 500),
      status: 'completed'
    })
  }

  // Update final status
  orders.update(order.id, { status: 'completed' })

  return { success: true, steps: results }
}

// POST - Receive order from external source
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, customer, items, service, description, budget, autoProcess = true } = body

    if (!customer || !customer.email) {
      return NextResponse.json({ error: 'Email client requis' }, { status: 400 })
    }

    const allOrders = orders.getAll()
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const order = {
      id: orderId,
      orderNumber: `CMD-${new Date().getFullYear()}-${String(allOrders.length + 1).padStart(3, '0')}`,
      items: items || [{ name: service || description || 'Service', quantity: 1, price: budget || 0 }],
      customer: {
        name: customer.name || customer.email.split('@')[0],
        email: customer.email,
        phone: customer.phone || '',
        address: customer.address || '',
        city: customer.city || '',
      },
      subtotal: budget || 0,
      total: budget || 0,
      currency: 'XOF',
      status: 'pending',
      paymentMethod: 'pending',
      paymentStatus: 'pending',
      source: source || 'webhook',
      description: description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.create(order)

    let automationResult = null
    if (autoProcess) {
      try {
        automationResult = await processOrderAutomatically(order)
      } catch (e) {
        automationResult = { success: false, error: 'Erreur traitement auto' }
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderNumber,
      message: autoProcess ? 'Commande creee et traitee automatiquement' : 'Commande creee',
      order: { id: order.id, orderNumber: order.orderNumber, customer: order.customer, total: order.total, status: autoProcess ? 'completed' : 'pending' },
      automation: automationResult
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Erreur lors du traitement' }, { status: 500 })
  }
}

// GET - Check webhook status
export async function GET() {
  return NextResponse.json({
    status: 'active',
    sources: ['form', 'api', 'social', 'whatsapp', 'telegram'],
    features: ['automatic_order_creation', 'ai_agent_processing', 'auto_devis', 'auto_invoice'],
    message: 'Webhook pret'
  })
}
