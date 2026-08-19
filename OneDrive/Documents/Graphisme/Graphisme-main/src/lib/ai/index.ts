// ==============================================
// AI Module Exports - Graphisme by ELECTRON
// ==============================================

// Ollama (Local AI)
export * from './ollama'

// Google AI (Cloud AI)
export * from './google-ai'

// Re-export types
export type { AIAgent } from './ollama'
export type { 
  AISettings, 
  AIProvider, 
  GoogleAIConfig,
  GeminiModel 
} from './google-ai'

// Default export for convenience
import { AGENTS, chatWithAgent, generateQuote } from './ollama'
import { 
  loadAISettings, 
  saveAISettings, 
  unifiedChat, 
  generateAIQuote,
  DEFAULT_AI_SETTINGS 
} from './google-ai'

export default {
  AGENTS,
  chatWithAgent,
  generateQuote,
  loadAISettings,
  saveAISettings,
  unifiedChat,
  generateAIQuote,
  DEFAULT_AI_SETTINGS
}
