'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, Key, Globe, MessageSquare, Mail, Cloud, 
  CreditCard, Shield, Save, Eye, EyeOff, Check, AlertCircle,
  Bot, Palette, Share2, Zap, CheckCircle, XCircle
} from 'lucide-react'

interface ApiKeys {
  openai: string
  anthropic: string
  googleAi: string
  cohere: string
  ollama: { baseUrl: string; defaultModel: string }
  facebook: { accessToken: string; pageId: string }
  instagram: { accessToken: string; accountId: string }
  tiktok: { accessToken: string; openId: string }
  youtube: { apiKey: string; channelId: string }
  linkedin: { accessToken: string; organizationId: string }
  twitter: { apiKey: string; apiSecret: string; accessToken: string; accessSecret: string }
  whatsapp: { businessAccountId: string; accessToken: string; phoneNumberId: string }
  telegram: { botToken: string }
  sendgrid: string
  mailgun: string
  resend: string
  aws: { accessKeyId: string; secretAccessKey: string; region: string }
  cloudinary: { cloudName: string; apiKey: string; apiSecret: string }
  googleAnalytics: string
  metaPixel: string
  stripe: { publishableKey: string; secretKey: string }
  paypal: { clientId: string; clientSecret: string }
}

interface Settings {
  general: any
  business: any
  apiKeys: ApiKeys
  socialMedia: any
  agents: any
  ai: {
    enabled: boolean
    provider: 'auto' | 'google' | 'ollama'
    defaultModel: string
    ollamaModel: string
    temperature: number
    maxTokens: number
    enhancedPrompts: boolean
  }
}

const defaultApiKeys: ApiKeys = {
  openai: '',
  anthropic: '',
  googleAi: '',
  cohere: '',
  ollama: { baseUrl: 'http://localhost:11434', defaultModel: 'llama2' },
  facebook: { accessToken: '', pageId: '' },
  instagram: { accessToken: '', accountId: '' },
  tiktok: { accessToken: '', openId: '' },
  youtube: { apiKey: '', channelId: '' },
  linkedin: { accessToken: '', organizationId: '' },
  twitter: { apiKey: '', apiSecret: '', accessToken: '', accessSecret: '' },
  whatsapp: { businessAccountId: '', accessToken: '', phoneNumberId: '' },
  telegram: { botToken: '' },
  sendgrid: '',
  mailgun: '',
  resend: '',
  aws: { accessKeyId: '', secretAccessKey: '', region: 'us-east-1' },
  cloudinary: { cloudName: '', apiKey: '', apiSecret: '' },
  googleAnalytics: '',
  metaPixel: '',
  stripe: { publishableKey: '', secretKey: '' },
  paypal: { clientId: '', clientSecret: '' }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('ai')
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setSettings(data)
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    if (!settings) return
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateApiKey = (path: string, value: string) => {
    if (!settings) return
    const keys = path.split('.')
    const newSettings = { ...settings }
    let current: any = newSettings
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] }
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
    
    setSettings(newSettings)
  }

  const updateAIConfig = (key: string, value: any) => {
    if (!settings) return
    setSettings({
      ...settings,
      ai: {
        ...settings.ai,
        enabled: true,
        provider: settings.ai?.provider || 'auto',
        defaultModel: settings.ai?.defaultModel || 'gemini-1.5-flash',
        ollamaModel: settings.ai?.ollamaModel || 'llama3.2',
        temperature: settings.ai?.temperature || 0.7,
        maxTokens: settings.ai?.maxTokens || 2048,
        enhancedPrompts: settings.ai?.enhancedPrompts ?? true,
        [key]: value
      }
    })
  }

  const toggleShowKey = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const tabs = [
    { id: 'ai', label: 'AI Services', icon: Bot },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'messaging', label: 'Messaging', icon: MessageSquare },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'cloud', label: 'Cloud & Storage', icon: Cloud },
    { id: 'analytics', label: 'Analytics', icon: Key },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'agents', label: 'AI Agents', icon: Zap },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-gold" />
              Configuration API
            </h1>
            <p className="text-gray-400 mt-2">
              Configurez vos clés API pour les services IA, réseaux sociaux et automatisations
            </p>
          </div>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-xl font-semibold hover:bg-gold/90 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                Enregistrement...
              </>
            ) : saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Sauvegardé!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Sauvegarder
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid gap-6">
          {/* AI Services Tab */}
          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-gold" />
                  Services IA
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="OpenAI API Key"
                    description="Pour GPT-4, GPT-3.5 Turbo"
                    value={settings?.apiKeys.openai || ''}
                    onChange={(v) => updateApiKey('apiKeys.openai', v)}
                    placeholder="sk-..."
                    showKey={showKeys.openai}
                    onToggle={() => toggleShowKey('openai')}
                    link="https://platform.openai.com/api-keys"
                  />
                  <ApiKeyInput
                    label="Anthropic API Key"
                    description="Pour Claude 3.5 Sonnet"
                    value={settings?.apiKeys.anthropic || ''}
                    onChange={(v) => updateApiKey('apiKeys.anthropic', v)}
                    placeholder="sk-ant-..."
                    showKey={showKeys.anthropic}
                    onToggle={() => toggleShowKey('anthropic')}
                    link="https://console.anthropic.com"
                  />
                  <ApiKeyInput
                    label="Google AI API Key"
                    description="Pour Gemini Pro"
                    value={settings?.apiKeys.googleAi || ''}
                    onChange={(v) => updateApiKey('apiKeys.googleAi', v)}
                    placeholder="AIza..."
                    showKey={showKeys.googleAi}
                    onToggle={() => toggleShowKey('googleAi')}
                    link="https://aistudio.google.com/app/apikey"
                  />
                  <ApiKeyInput
                    label="Cohere API Key"
                    description="Pour models Cohere"
                    value={settings?.apiKeys.cohere || ''}
                    onChange={(v) => updateApiKey('apiKeys.cohere', v)}
                    placeholder="..."
                    showKey={showKeys.cohere}
                    onToggle={() => toggleShowKey('cohere')}
                    link="https://dashboard.cohere.com"
                  />
                </div>
              </div>

              {/* Ollama Configuration */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-green-400" />
                  Ollama - IA Locale
                </h3>
                <p className="text-gray-400 mb-4">
                  Ollama permet d'exécuter des modèles IA localement (Llama2, Mistral, Codellama, etc.)
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Ollama Base URL"
                    description="URL du serveur Ollama (défaut: http://localhost:11434)"
                    value={settings?.apiKeys.ollama?.baseUrl || 'http://localhost:11434'}
                    onChange={(v) => updateApiKey('apiKeys.ollama.baseUrl', v)}
                    placeholder="http://localhost:11434"
                    showKey={false}
                    onToggle={() => {}}
                  />
                  <ApiKeyInput
                    label="Modèle par défaut"
                    description="Modèle à utiliser (llama2, mistral, codellama, etc.)"
                    value={settings?.apiKeys.ollama?.defaultModel || 'llama2'}
                    onChange={(v) => updateApiKey('apiKeys.ollama.defaultModel', v)}
                    placeholder="llama2"
                    showKey={false}
                    onToggle={() => {}}
                  />
                </div>
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-green-400 text-sm">
                    💡 <strong>Installation:</strong> Téléchargez Ollama depuis <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="underline">ollama.com</a> puis lancez `ollama serve`
                  </p>
                </div>
              </div>

              {/* AI Provider Configuration */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Configuration IA Avancée
                </h3>
                <p className="text-gray-400 mb-4">
                  Configurez le provider IA par défaut et les paramètres de génération pour tous les agents.
                </p>
                
                {/* Provider Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Provider IA Principal
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => updateAIConfig('provider', 'auto')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings?.ai?.provider === 'auto' || !settings?.ai?.provider
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold">🤖 Auto</div>
                      <div className="text-xs mt-1">S'adapte automatiquement</div>
                    </button>
                    <button
                      onClick={() => updateAIConfig('provider', 'google')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings?.ai?.provider === 'google'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold">🔷 Google AI</div>
                      <div className="text-xs mt-1">Gemini (Cloud)</div>
                    </button>
                    <button
                      onClick={() => updateAIConfig('provider', 'ollama')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        settings?.ai?.provider === 'ollama'
                          ? 'border-green-500 bg-green-500/10 text-green-400'
                          : 'border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold">💻 Ollama</div>
                      <div className="text-xs mt-1">IA Locale</div>
                    </button>
                  </div>
                </div>

                {/* Model Selection for Google */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Modèle Google AI
                    </label>
                    <select
                      value={settings?.ai?.defaultModel || 'gemini-1.5-flash'}
                      onChange={(e) => updateAIConfig('defaultModel', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    >
                      <option value="gemini-2.0-flash">Gemini 2.0 Flash (Recommandé)</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                      <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Modèle Ollama
                    </label>
                    <select
                      value={settings?.ai?.ollamaModel || 'llama3.2'}
                      onChange={(e) => updateAIConfig('ollamaModel', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                    >
                      <option value="llama3.2">Llama 3.2</option>
                      <option value="llama3.1">Llama 3.1</option>
                      <option value="qwen2.5">Qwen 2.5 Coder</option>
                      <option value="phi3">Phi 3 Mini</option>
                    </select>
                  </div>
                </div>

                {/* Generation Settings */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Température ({settings?.ai?.temperature || 0.7})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings?.ai?.temperature || 0.7}
                      onChange={(e) => updateAIConfig('temperature', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Précis</span>
                      <span>Créatif</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Longueur max (tokens): {settings?.ai?.maxTokens || 2048}
                    </label>
                    <input
                      type="range"
                      min="256"
                      max="8192"
                      step="256"
                      value={settings?.ai?.maxTokens || 2048}
                      onChange={(e) => updateAIConfig('maxTokens', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Enhanced Prompts Toggle */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => updateAIConfig('enhancedPrompts', !settings?.ai?.enhancedPrompts)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings?.ai?.enhancedPrompts ? 'bg-gold' : 'bg-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings?.ai?.enhancedPrompts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                  <span className="text-sm text-gray-300">
                    Prompts professionnels améliorés (Raisonnement humain)
                  </span>
                </div>

                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-blue-400 text-sm">
                    💡 <strong>Conseil:</strong> Utilisez "Auto" pour bénéficier automatiquement du meilleur provider disponible (Google AI avec clé API configurée, sinon Ollama).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#1877F2]" />
                  Facebook & Instagram
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Facebook Access Token"
                    description="Token d'accès Facebook"
                    value={settings?.apiKeys.facebook.accessToken || ''}
                    onChange={(v) => updateApiKey('apiKeys.facebook.accessToken', v)}
                    placeholder="EAAC..."
                    showKey={showKeys.facebookToken}
                    onToggle={() => toggleShowKey('facebookToken')}
                    link="https://developers.facebook.com"
                  />
                  <ApiKeyInput
                    label="Facebook Page ID"
                    description="ID de votre page"
                    value={settings?.apiKeys.facebook.pageId || ''}
                    onChange={(v) => updateApiKey('apiKeys.facebook.pageId', v)}
                    placeholder="123456789"
                  />
                  <ApiKeyInput
                    label="Instagram Access Token"
                    description="Token Instagram Basic Display"
                    value={settings?.apiKeys.instagram.accessToken || ''}
                    onChange={(v) => updateApiKey('apiKeys.instagram.accessToken', v)}
                    placeholder="IGQV..."
                    showKey={showKeys.instagramToken}
                    onToggle={() => toggleShowKey('instagramToken')}
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-black bg-[#FE2C55] rounded">T</div>
                  TikTok
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="TikTok Access Token"
                    description="Token d'accès TikTok"
                    value={settings?.apiKeys.tiktok.accessToken || ''}
                    onChange={(v) => updateApiKey('apiKeys.tiktok.accessToken', v)}
                    placeholder="..."
                    showKey={showKeys.tiktokToken}
                    onToggle={() => toggleShowKey('tiktokToken')}
                    link="https://developers.tiktok.com"
                  />
                  <ApiKeyInput
                    label="TikTok Open ID"
                    description="Open ID de l'application"
                    value={settings?.apiKeys.tiktok.openId || ''}
                    onChange={(v) => updateApiKey('apiKeys.tiktok.openId', v)}
                    placeholder="..."
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-[#FF0000]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  YouTube
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="YouTube Data API Key"
                    description="Clé API YouTube"
                    value={settings?.apiKeys.youtube.apiKey || ''}
                    onChange={(v) => updateApiKey('apiKeys.youtube.apiKey', v)}
                    placeholder="AIza..."
                    showKey={showKeys.youtubeKey}
                    onToggle={() => toggleShowKey('youtubeKey')}
                    link="https://console.cloud.google.com"
                  />
                  <ApiKeyInput
                    label="YouTube Channel ID"
                    description="ID de votre chaîne"
                    value={settings?.apiKeys.youtube.channelId || ''}
                    onChange={(v) => updateApiKey('apiKeys.youtube.channelId', v)}
                    placeholder="UC..."
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-[#0A66C2]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  LinkedIn
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="LinkedIn Access Token"
                    description="Token d'accès LinkedIn"
                    value={settings?.apiKeys.linkedin.accessToken || ''}
                    onChange={(v) => updateApiKey('apiKeys.linkedin.accessToken', v)}
                    placeholder="AQ..."
                    showKey={showKeys.linkedinToken}
                    onToggle={() => toggleShowKey('linkedinToken')}
                    link="https://www.linkedin.com/developers/apps"
                  />
                  <ApiKeyInput
                    label="Organization ID"
                    description="ID de votre organisation"
                    value={settings?.apiKeys.linkedin.organizationId || ''}
                    onChange={(v) => updateApiKey('apiKeys.linkedin.organizationId', v)}
                    placeholder="..."
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  Twitter / X
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Twitter API Key"
                    description="API Key Twitter"
                    value={settings?.apiKeys.twitter.apiKey || ''}
                    onChange={(v) => updateApiKey('apiKeys.twitter.apiKey', v)}
                    placeholder="..."
                    showKey={showKeys.twitterKey}
                    onToggle={() => toggleShowKey('twitterKey')}
                    link="https://developer.twitter.com"
                  />
                  <ApiKeyInput
                    label="Twitter API Secret"
                    description="API Secret Twitter"
                    value={settings?.apiKeys.twitter.apiSecret || ''}
                    onChange={(v) => updateApiKey('apiKeys.twitter.apiSecret', v)}
                    placeholder="..."
                    showKey={showKeys.twitterSecret}
                    onToggle={() => toggleShowKey('twitterSecret')}
                  />
                  <ApiKeyInput
                    label="Twitter Access Token"
                    description="Access Token"
                    value={settings?.apiKeys.twitter.accessToken || ''}
                    onChange={(v) => updateApiKey('apiKeys.twitter.accessToken', v)}
                    placeholder="..."
                    showKey={showKeys.twitterAccessToken}
                    onToggle={() => toggleShowKey('twitterAccessToken')}
                  />
                  <ApiKeyInput
                    label="Twitter Access Secret"
                    description="Access Secret"
                    value={settings?.apiKeys.twitter.accessSecret || ''}
                    onChange={(v) => updateApiKey('apiKeys.twitter.accessSecret', v)}
                    placeholder="..."
                    showKey={showKeys.twitterAccessSecret}
                    onToggle={() => toggleShowKey('twitterAccessSecret')}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Messaging Tab */}
          {activeTab === 'messaging' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-[#25D366]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  WhatsApp Business
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="WhatsApp Business Account ID"
                    description="ID du compte Business"
                    value={settings?.apiKeys.whatsapp.businessAccountId || ''}
                    onChange={(v) => updateApiKey('apiKeys.whatsapp.businessAccountId', v)}
                    placeholder="..."
                  />
                  <ApiKeyInput
                    label="WhatsApp Access Token"
                    description="Token d'accès WhatsApp"
                    value={settings?.apiKeys.whatsapp.accessToken || ''}
                    onChange={(v) => updateApiKey('apiKeys.whatsapp.accessToken', v)}
                    placeholder="EAAC..."
                    showKey={showKeys.whatsappToken}
                    onToggle={() => toggleShowKey('whatsappToken')}
                    link="https://developers.facebook.com/docs/whatsapp"
                  />
                  <ApiKeyInput
                    label="Phone Number ID"
                    description="ID du numéro de téléphone"
                    value={settings?.apiKeys.whatsapp.phoneNumberId || ''}
                    onChange={(v) => updateApiKey('apiKeys.whatsapp.phoneNumberId', v)}
                    placeholder="..."
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-[#0088CC]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  Telegram
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Telegram Bot Token"
                    description="Token du Bot Telegram"
                    value={settings?.apiKeys.telegram.botToken || ''}
                    onChange={(v) => updateApiKey('apiKeys.telegram.botToken', v)}
                    placeholder="123456789:ABC..."
                    showKey={showKeys.telegramToken}
                    onToggle={() => toggleShowKey('telegramToken')}
                    link="https://t.me/BotFather"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold" />
                  Services Email
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Resend API Key"
                    description="Service d'email recommandé"
                    value={settings?.apiKeys.resend || ''}
                    onChange={(v) => updateApiKey('apiKeys.resend', v)}
                    placeholder="re_..."
                    showKey={showKeys.resend}
                    onToggle={() => toggleShowKey('resend')}
                    link="https://resend.com"
                  />
                  <ApiKeyInput
                    label="SendGrid API Key"
                    description="Clé API SendGrid"
                    value={settings?.apiKeys.sendgrid || ''}
                    onChange={(v) => updateApiKey('apiKeys.sendgrid', v)}
                    placeholder="SG...."
                    showKey={showKeys.sendgrid}
                    onToggle={() => toggleShowKey('sendgrid')}
                    link="https://sendgrid.com"
                  />
                  <ApiKeyInput
                    label="Mailgun API Key"
                    description="Clé API Mailgun"
                    value={settings?.apiKeys.mailgun || ''}
                    onChange={(v) => updateApiKey('apiKeys.mailgun', v)}
                    placeholder="key-..."
                    showKey={showKeys.mailgun}
                    onToggle={() => toggleShowKey('mailgun')}
                    link="https://mailgun.com"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Cloud Tab */}
          {activeTab === 'cloud' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-gold" />
                  AWS Configuration
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="AWS Access Key ID"
                    description="ID d'accès AWS"
                    value={settings?.apiKeys.aws.accessKeyId || ''}
                    onChange={(v) => updateApiKey('apiKeys.aws.accessKeyId', v)}
                    placeholder="AKIA..."
                  />
                  <ApiKeyInput
                    label="AWS Secret Access Key"
                    description="Clé secrète AWS"
                    value={settings?.apiKeys.aws.secretAccessKey || ''}
                    onChange={(v) => updateApiKey('apiKeys.aws.secretAccessKey', v)}
                    placeholder="..."
                    showKey={showKeys.awsSecret}
                    onToggle={() => toggleShowKey('awsSecret')}
                  />
                  <ApiKeyInput
                    label="AWS Region"
                    description="Région AWS"
                    value={settings?.apiKeys.aws.region || 'us-east-1'}
                    onChange={(v) => updateApiKey('apiKeys.aws.region', v)}
                    placeholder="us-east-1"
                  />
                  <ApiKeyInput
                    label="S3 Bucket Name"
                    description="Nom du bucket S3"
                    value={''}
                    onChange={() => {}}
                    placeholder="my-bucket"
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-[#3448C5]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  Cloudinary
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Cloud Name"
                    description="Nom du cloud"
                    value={settings?.apiKeys.cloudinary.cloudName || ''}
                    onChange={(v) => updateApiKey('apiKeys.cloudinary.cloudName', v)}
                    placeholder="mycloud"
                  />
                  <ApiKeyInput
                    label="Cloudinary API Key"
                    description="Clé API"
                    value={settings?.apiKeys.cloudinary.apiKey || ''}
                    onChange={(v) => updateApiKey('apiKeys.cloudinary.apiKey', v)}
                    placeholder="..."
                  />
                  <ApiKeyInput
                    label="Cloudinary API Secret"
                    description="Secret API"
                    value={settings?.apiKeys.cloudinary.apiSecret || ''}
                    onChange={(v) => updateApiKey('apiKeys.cloudinary.apiSecret', v)}
                    placeholder="..."
                    showKey={showKeys.cloudinarySecret}
                    onToggle={() => toggleShowKey('cloudinarySecret')}
                    link="https://cloudinary.com"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-gold" />
                  Analytics
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Google Analytics ID"
                    description="ID GA4 (G-XXXXXXXXXX)"
                    value={settings?.apiKeys.googleAnalytics || ''}
                    onChange={(v) => updateApiKey('apiKeys.googleAnalytics', v)}
                    placeholder="G-XXXXXXXXXX"
                    link="https://analytics.google.com"
                  />
                  <ApiKeyInput
                    label="Meta Pixel ID"
                    description="ID Facebook Pixel"
                    value={settings?.apiKeys.metaPixel || ''}
                    onChange={(v) => updateApiKey('apiKeys.metaPixel', v)}
                    placeholder="1234567890"
                    link="https://facebook.com/events_manager"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#635BFF]" />
                  Stripe
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="Stripe Publishable Key"
                    description="Clé publique"
                    value={settings?.apiKeys.stripe.publishableKey || ''}
                    onChange={(v) => updateApiKey('apiKeys.stripe.publishableKey', v)}
                    placeholder="pk_test_..."
                    showKey={showKeys.stripePublic}
                    onToggle={() => toggleShowKey('stripePublic')}
                    link="https://dashboard.stripe.com"
                  />
                  <ApiKeyInput
                    label="Stripe Secret Key"
                    description="Clé secrète"
                    value={settings?.apiKeys.stripe.secretKey || ''}
                    onChange={(v) => updateApiKey('apiKeys.stripe.secretKey', v)}
                    placeholder="sk_test_..."
                    showKey={showKeys.stripeSecret}
                    onToggle={() => toggleShowKey('stripeSecret')}
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-[#003087]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
                    </svg>
                  </div>
                  PayPal
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ApiKeyInput
                    label="PayPal Client ID"
                    description="Client ID"
                    value={settings?.apiKeys.paypal.clientId || ''}
                    onChange={(v) => updateApiKey('apiKeys.paypal.clientId', v)}
                    placeholder="..."
                    link="https://developer.paypal.com"
                  />
                  <ApiKeyInput
                    label="PayPal Client Secret"
                    description="Client Secret"
                    value={settings?.apiKeys.paypal.clientSecret || ''}
                    onChange={(v) => updateApiKey('apiKeys.paypal.clientSecret', v)}
                    placeholder="..."
                    showKey={showKeys.paypalSecret}
                    onToggle={() => toggleShowKey('paypalSecret')}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Agents Tab */}
          {activeTab === 'agents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gold" />
                  Configuration des Agents IA
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {settings?.agents && Object.entries(settings.agents).map(([key, agent]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium capitalize">{key}</h4>
                        <p className="text-xs text-gray-400">
                          {agent.autoRespond ? 'Auto-réponse activée' : 'Réponse manuelle'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newSettings = { ...settings }
                          // @ts-ignore
                          newSettings.agents[key].enabled = !agent.enabled
                          setSettings(newSettings)
                        }}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          agent.enabled ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          agent.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// API Key Input Component
function ApiKeyInput({
  label,
  description,
  value,
  onChange,
  placeholder,
  showKey,
  onToggle,
  link
}: {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  showKey?: boolean
  onToggle?: () => void
  link?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">{label}</label>
      <p className="text-xs text-gray-400">{description}</p>
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
        />
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gold hover:underline"
        >
          Obtenir une clé →
        </a>
      )}
    </div>
  )
}
