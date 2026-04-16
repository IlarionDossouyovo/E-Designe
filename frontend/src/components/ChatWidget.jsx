import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour! Je suis votre assistant Stylhub. Comment puis-je vous aider?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const { data } = await axios.post('/api/ai/chat', { message: input })
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Désolé, une erreur est survenue. Veuillez réessayer.' }])
    }
    setLoading(false)
  }

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="chat-window"
          >
            <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', background: '#19232D', color: 'white' }}>
              <strong>Assistant Stylhub</strong>
            </div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  marginBottom: '0.75rem',
                  textAlign: msg.role === 'user' ? 'right' : 'left'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    background: msg.role === 'user' ? '#4B6CB7' : '#F5F6FA',
                    color: msg.role === 'user' ? 'white' : '#1A202C',
                    maxWidth: '80%'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && <div style={{ opacity: 0.6 }}>En train d'écrire...</div>}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Tapez votre message..."
                style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}
              />
              <button onClick={sendMessage} className="btn btn-primary" style={{ padding: '0.5rem' }}>
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        💬
      </motion.button>
    </div>
  )
}