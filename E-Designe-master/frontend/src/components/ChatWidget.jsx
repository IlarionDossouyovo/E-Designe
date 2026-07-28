import { useState, useRef, useEffect } from 'react'
import { chatWithAI } from '../services/ai'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour! Je suis votre assistant E-Designe. Comment puis-je vous aider?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await chatWithAI(input)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Merci pour votre message! Notre equipe vous repondra bientot.' 
      }])
    }
    setLoading(false)
  }

  const quickReplies = [
    'Produits Homme',
    'Prix livraison',
    'Comment commander',
    'Returns & exchanges'
  ]

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)',
          border: 'none',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(75, 108, 183, 0.5)',
          zIndex: 1000,
          transition: 'transform 0.3s, box-shadow 0.3s'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)'
          e.target.style.boxShadow = '0 6px 25px rgba(75, 108, 183, 0.6)'
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)'
          e.target.style.boxShadow = '0 4px 20px rgba(75, 108, 183, 0.5)'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '360px',
          height: '500px',
          background: '#16161f',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          border: '1px solid #2a2a35',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)',
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                🤖
              </div>
              <div>
                <strong>E-Designe IA</strong>
                <p style={{ fontSize: '11px', opacity: 0.85, margin: 0 }}>{loading ? 'En train decrire...' : 'En ligne • 24/7'}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px', padding: '4px' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' 
                    ? 'linear-gradient(135deg, #4B6CB7 0%, #5B7CC7 100%)' 
                    : '#2a2a35',
                  color: '#fff',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: '#2a2a35',
                  color: '#6B8DD6',
                  fontSize: '14px',
                  animation: 'pulse 1s infinite'
                }}>
                  En train denvoyer...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div style={{ padding: '8px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #2a2a35' }}>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => { setInput(reply); setIsOpen(true) }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid #4B6CB7',
                  background: 'transparent',
                  color: '#6B8DD6',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #2a2a35', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tapez votre message..."
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                borderRadius: '24px', 
                border: '1px solid #2a2a35',
                background: '#0a0a0f',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button 
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ 
                width: '44px', 
                height: '44px',
                background: loading ? '#333' : 'linear-gradient(135deg, #4B6CB7 0%, #6B8DD6 100%)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '50%', 
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '18px',
                transition: 'all 0.2s'
              }}
            >
              ➤
            </button>
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
