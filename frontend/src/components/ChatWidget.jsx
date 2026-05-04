import { useState } from 'react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour! Je suis votre assistant E-Designe. Comment puis-je vous aider?' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    
    // Simple mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Merci pour votre message! Notre equipe vous repondra bientot. Pour des produits, voyez la page Boutique.' 
      }])
    }, 1000)
    
    setInput('')
  }

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#4B6CB7',
          border: 'none',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(75, 108, 183, 0.4)',
          zIndex: 1000
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '450px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            background: '#19232D',
            color: '#fff',
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>E-Designe Assistant</strong>
              <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>En ligne</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: '12px',
                textAlign: msg.role === 'user' ? 'right' : 'left'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: msg.role === 'user' ? '#4B6CB7' : '#f5f6fa',
                  color: msg.role === 'user' ? '#fff' : '#333',
                  maxWidth: '80%'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tapez votre message..."
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <button 
              onClick={sendMessage}
              style={{ padding: '10px 16px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
