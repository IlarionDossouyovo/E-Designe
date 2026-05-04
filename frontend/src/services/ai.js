// AI Service for connecting to Ollama or other LLM APIs
// 
// Configuration: Set your Ollama endpoint in environment variables
// REACT_APP_OLLAMA_URL=http://localhost:11434/api/generate
// REACT_APP_OLLAMA_MODEL=llama2 (or mistral, codellama, etc.)

const OLLAMA_URL = process.env.REACT_APP_OLLAMA_URL || 'http://localhost:11434/api/generate'
const OLLAMA_MODEL = process.env.REACT_APP_OLLAMA_MODEL || 'llama2'
const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY || null

// Mock responses when no AI is available
const mockResponses = [
  "Merci pour votre question! Notre equipe vous repondra bientot.",
  "Je suis la pour vous aider. Precisez votre demande s'il vous plait.",
  "Pour plus d'informations, consultez notre page produits.",
  "N'hesitez pas a parcourir nos categories pour trouver ce que vous cherchez.",
  "Notre equipe est disponible pour vous accompagner dans vos achats."
]

// Get random mock response
const getMockResponse = () => mockResponses[Math.floor(Math.random() * mockResponses.length)]

// Chat with Ollama
export async function chatWithAI(message, context = {}) {
  try {
    // Try Ollama first
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `Tu es un assistant commercial pour E-Designe, une boutique de mode. 
Reponds de maniere concise et aimable.
Contexte: ${JSON.stringify(context)}
Question: ${message}`,
        stream: false
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.response
    }
  } catch (error) {
    console.log('Ollama not available, trying OpenAI...')
  }

  // Try OpenAI if key is available
  if (OPENAI_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Tu es un assistant commercial pour E-Designe, une boutique de mode au Benin.' },
            { role: 'user', content: message }
          ]
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        return data.choices[0].message.content
      }
    } catch (error) {
      console.log('OpenAI not available')
    }
  }

  // Fallback to mock
  return getMockResponse()
}

// Product recommendation AI
export async function recommendProduct(userPreferences) {
  const prompt = `Based on these preferences: ${JSON.stringify(userPreferences)}, 
suggest a product from our catalog with reasons.`
  
  return chatWithAI(prompt, { type: 'recommendation' })
}

// Search assistance AI  
export async function assistSearch(query) {
  const prompt = `The user is searching for: "${query}"
Suggest relevant categories and products.`
  
  return chatWithAI(prompt, { type: 'search' })
}

export default { chatWithAI, recommendProduct, assistSearch }
