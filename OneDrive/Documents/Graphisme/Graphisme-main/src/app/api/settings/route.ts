// Settings API - Graphisme by ELECTRON
// Admin settings management with API keys configuration

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json')

// Default settings
const defaultSettings = {
  general: {
    siteName: 'Graphisme by ELECTRON',
    siteDescription: 'Services de graphisme professionnel au Benin',
    currency: 'XOF',
    currencySymbol: 'XOF',
    timezone: 'Africa/Porto-Novo',
    language: 'fr'
  },
  business: {
    companyName: 'ELECTRON',
    email: 'electronbusiness07@gmail.com',
    phone: '+229 01 23 45 67 89',
    address: 'Cotonou, Benin',
    whatsapp: '+229 01 23 45 67 89',
    facebook: 'https://facebook.com/electron',
    instagram: 'https://instagram.com/electron'
  },
  orders: {
    autoProcess: false,
    sendNotifications: true,
    requirePayment: true,
    orderPrefix: 'CMD',
    orderNumberFormat: 'YYYY-NNN'
  },
  emails: {
    orderConfirmation: true,
    orderProcessing: true,
    orderCompleted: true,
    invoiceAttached: true,
    fromEmail: 'noreply@graphisme.electron',
    fromName: 'Graphisme by ELECTRON'
  },
  ai: {
    enabled: true,
    // AI Provider: 'auto' (automatic), 'google' (Gemini), 'ollama' (local)
    provider: 'auto',
    // Default model when using Google AI
    defaultModel: 'gemini-1.5-flash',
    // Ollama model as fallback
    ollamaModel: 'llama3.2',
    // Generation settings
    temperature: 0.7,
    maxTokens: 2048,
    // Enable enhanced prompts for professional reasoning
    enhancedPrompts: true
  },
  automation: {
    enabled: false,
    schedule: '*/5 * * * *',
    processPendingOrders: true
  },
  // API Keys Configuration - User can add their own keys
  apiKeys: {
    // AI Services
    openai: '',
    anthropic: '',
    googleAi: '',
    cohere: '',
    // Social Media APIs
    facebook: {
      accessToken: '',
      pageId: ''
    },
    instagram: {
      accessToken: '',
      accountId: ''
    },
    tiktok: {
      accessToken: '',
      openId: ''
    },
    youtube: {
      apiKey: '',
      channelId: ''
    },
    linkedin: {
      accessToken: '',
      organizationId: ''
    },
    twitter: {
      apiKey: '',
      apiSecret: '',
      accessToken: '',
      accessSecret: ''
    },
    // Messaging
    whatsapp: {
      businessAccountId: '',
      accessToken: '',
      phoneNumberId: ''
    },
    telegram: {
      botToken: ''
    },
    // Email Services
    sendgrid: '',
    mailgun: '',
    resend: '',
    // Cloud Services
    aws: {
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-east-1'
    },
    // Storage
    cloudinary: {
      cloudName: '',
      apiKey: '',
      apiSecret: ''
    },
    // Analytics
    googleAnalytics: '',
    metaPixel: '',
    // Payment
    stripe: {
      publishableKey: '',
      secretKey: ''
    },
    paypal: {
      clientId: '',
      clientSecret: ''
    }
  },
  // Social Media Configuration
  socialMedia: {
    facebook: { enabled: true, pageUrl: 'https://facebook.com', autoPost: false },
    tiktok: { enabled: true, accountUrl: 'https://tiktok.com', autoPost: false },
    instagram: { enabled: true, accountUrl: 'https://instagram.com', autoPost: false },
    youtube: { enabled: true, channelUrl: 'https://youtube.com', autoPost: false },
    whatsapp: { enabled: true, businessNumber: '', businessId: '' },
    linkedin: { enabled: true, companyUrl: 'https://linkedin.com', autoPost: false },
    twitter: { enabled: false, accountUrl: 'https://twitter.com', autoPost: false }
  },
  // AI Agents Configuration
  agents: {
    ceo: { enabled: true, autoRespond: false },
    commercial: { enabled: true, autoRespond: false },
    marketing: { enabled: true, autoRespond: false },
    designer: { enabled: true, autoRespond: false },
    developer: { enabled: true, autoRespond: false },
    motion: { enabled: true, autoRespond: false },
    communityManager: { enabled: true, autoRespond: true },
    finance: { enabled: true, autoRespond: false },
    support: { enabled: true, autoRespond: true },
    devops: { enabled: true, autoRespond: false },
    cyberSecurity: { enabled: true, autoRespond: false },
    dataAnalyst: { enabled: true, autoRespond: false }
  }
}

// Helper to read settings
async function getSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8')
    return { ...defaultSettings, ...JSON.parse(data) }
  } catch {
    // Create default settings file if doesn't exist
    try {
      await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true })
      await fs.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2))
    } catch (e) {
      console.error('Error creating settings file:', e)
    }
    return defaultSettings
  }
}

// Helper to save settings
async function saveSettings(settings: any) {
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json(defaultSettings)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentSettings = await getSettings()
    
    // Merge with current settings
    const updatedSettings = {
      ...currentSettings,
      ...body,
      general: { ...currentSettings.general, ...body.general },
      business: { ...currentSettings.business, ...body.business },
      orders: { ...currentSettings.orders, ...body.orders },
      emails: { ...currentSettings.emails, ...body.emails },
      ai: { ...currentSettings.ai, ...body.ai },
      automation: { ...currentSettings.automation, ...body.automation },
      apiKeys: { ...currentSettings.apiKeys, ...body.apiKeys },
      socialMedia: { ...currentSettings.socialMedia, ...body.socialMedia },
      agents: { ...currentSettings.agents, ...body.agents }
    }

    await saveSettings(updatedSettings)

    return NextResponse.json({
      success: true,
      message: 'Paramètres enregistrés',
      settings: updatedSettings
    })
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    // Reset to defaults
    if (action === 'reset') {
      await saveSettings(defaultSettings)
      return NextResponse.json({
        success: true,
        message: 'Paramètres réinitialisés',
        settings: defaultSettings
      })
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  } catch (error) {
    console.error('Settings POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
