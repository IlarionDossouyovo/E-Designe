import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Department icons and colors
const departmentConfig = {
  support: { icon: '🎧', color: '#4B6CB7', label: 'Support Client' },
  marketing: { icon: '📢', color: '#F59E0B', label: 'Marketing' },
  orders: { icon: '📦', color: '#10B981', label: 'Commandes' },
  catalog: { icon: '🏷️', color: '#8B5CF6', label: 'Catalogue' },
  analytics: { icon: '📊', color: '#EC4899', label: 'Analytique' },
  security: { icon: '🔒', color: '#EF4444', label: 'Sécurité' },
  inventory: { icon: '📋', color: '#06B6D4', label: 'Inventaire' },
  social: { icon: '📱', color: '#3B82F6', label: 'Réseaux Sociaux' }
}

export default function AIDashboard() {
  const navigate = useNavigate()
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  
  // New agent form
  const [newAgent, setNewAgent] = useState({
    name: '',
    department: 'support',
    description: '',
    instructions: '',
    capabilities: '',
    model: 'llama2'
  })

  // Check if user is admin
  const user = JSON.parse(localStorage.getItem('e-designe-user') || 'null')
  const isAdmin = user?.role === 'admin' || user?.email === 'admin@e-designe.com'

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ai/agents')
      const data = await response.json()
      setAgents(data)
    } catch (error) {
      // Fallback to demo data
      setAgents([
        { id: 1, name: 'Service Client IA', department: 'support', description: 'Assistant virtuel 24/7', capabilities: ['FAQ', 'Suivi commandes', 'Retours'], status: 'active' },
        { id: 2, name: 'Assistant Marketing', department: 'marketing', description: 'Gestion marketing automatisé', capabilities: ['Analyse données', 'Contenu', 'Rapports'], status: 'active' },
        { id: 3, name: 'Gestionnaire Commandes', department: 'orders', description: 'Coordinateur logistique', capabilities: ['Validation', 'Suivi', 'Retours'], status: 'active' },
        { id: 4, name: 'Gestionnaire Catalogue', department: 'catalog', description: 'Gestion produits', capabilities: ['Ajout produits', 'Stocks', 'Prix'], status: 'active' },
        { id: 5, name: 'Analyste Données', department: 'analytics', description: 'Expert analytique', capabilities: ['Rapports', 'Prévisions', 'KPIs'], status: 'active' },
        { id: 6, name: 'Détective Fraude', department: 'security', description: 'Détection fraudes', capabilities: ['Analyse', 'Alertes', 'Prévention'], status: 'active' },
        { id: 7, name: 'Expert Stocks', department: 'inventory', description: 'Gestion inventaire', capabilities: ['Surveillance', 'Alertes', 'Prévisions'], status: 'active' },
        { id: 8, name: 'Assistant Social', department: 'social', description: 'Réseaux sociaux', capabilities: ['Posts', 'Planification', 'Engagement'], status: 'active' }
      ])
    }
    setLoading(false)
  }

  const sendMessage = async () => {
    if (!chatMessage.trim() || !selectedAgent) return
    
    const userMessage = chatMessage
    setChatMessage('')
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    try {
      const response = await fetch('http://localhost:3000/api/ai/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: `[Agent: ${selectedAgent.name}] ${userMessage}`,
          agent: selectedAgent.department
        })
      })
      const data = await response.json()
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response || data.message || 'Réponse de l\'agent...' }])
    } catch (error) {
      // Demo response
      const demoResponses = {
        support: "Je suis votre assistant Support E-Désigne. Je suis là pour vous aider avec vos questions sur les commandes, livraisons et retours.",
        marketing: "Je suis votre Assistant Marketing. Je peux vous aider avec les analyses de données, la création de contenus et les stratégies de croissance.",
        orders: "Je gère vos commandes E-Désigne. Je peux valider, suivre et gérer les retours de vos commandes.",
        catalog: "Je gère le catalogue produits. Je peux ajouter des produits, mettre à jour les prix et gérer les stocks.",
        analytics: "Je suis votre Analyste de données. Je peux générer des rapports détaillés et des prédictions basées sur vos données.",
        security: "Je suis le Détective Fraude. J'analyse les transactions pour détecter les activités suspectes.",
        inventory: "Je suis l'Expert Stocks. Je surveille vos niveaux d'inventaire et génère des alertes.",
        social: "Je gère vos réseaux sociaux. Je peux créer des posts, planifier des publications et analyser l'engagement."
      }
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: demoResponses[selectedAgent.department] || "Comment puis-je vous aider?" 
      }])
    }
    setIsTyping(false)
  }

  const handleAddAgent = async () => {
    const agentData = {
      ...newAgent,
      capabilities: newAgent.capabilities.split(',').map(c => c.trim())
    }
    
    try {
      await fetch('http://localhost:3000/api/ai/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agentData)
      })
    } catch (error) {
      // Demo mode
    }
    
    setShowAddModal(false)
    setNewAgent({ name: '', department: 'support', description: '', instructions: '', capabilities: '', model: 'llama2' })
    fetchAgents()
  }

  const toggleAgentStatus = async (agent) => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active'
    try {
      await fetch(`http://localhost:3000/api/ai/agents/${agent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
    } catch (error) {}
    fetchAgents()
  }

  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{ 
          textAlign: 'center', 
          background: '#1a1a2e', 
          padding: '3rem', 
          borderRadius: '16px',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Accès Réservé</h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>
            Cette page est exclusivement réservée au fondateur d'E-Désigne.
          </p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              background: '#4B6CB7',
              color: '#fff',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0f 0%, #16161f 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #2a2a3e'
      }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.5rem' }}>
            🤖 Centre de Commande IA
          </h1>
          <p style={{ color: '#888' }}>
            Gérez tous vos agents IA d'E-Désigne
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          style={{
            background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ➕ Nouvel Agent
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Left Panel - Agent List */}
        <div style={{ 
          background: '#16161f', 
          borderRadius: '16px', 
          padding: '1.5rem',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>📋 Agents ({agents.length})</h3>
          
          {loading ? (
            <p style={{ color: '#888' }}>Chargement...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {agents.map(agent => {
                const config = departmentConfig[agent.department] || { icon: '🤖', color: '#666', label: agent.department }
                return (
                  <div
                    key={agent.id}
                    onClick={() => { setSelectedAgent(agent); setChatHistory([]); setEditMode(false); }}
                    style={{
                      background: selectedAgent?.id === agent.id ? '#2a2a3e' : '#1a1a2e',
                      border: selectedAgent?.id === agent.id ? `2px solid ${config.color}` : '2px solid transparent',
                      borderRadius: '12px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        fontSize: '2rem',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${config.color}20`,
                        borderRadius: '12px'
                      }}>
                        {config.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#fff', marginBottom: '0.25rem' }}>{agent.name}</h4>
                        <p style={{ color: config.color, fontSize: '0.85rem' }}>{config.label}</p>
                      </div>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: agent.status === 'active' ? '#10B981' : '#6B7280'
                      }} />
                    </div>
                    <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                      {agent.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      {(agent.capabilities || []).slice(0, 3).map((cap, i) => (
                        <span key={i} style={{ 
                          background: '#2a2a3e', 
                          color: '#aaa', 
                          padding: '2px 8px', 
                          borderRadius: '4px',
                          fontSize: '0.75rem'
                        }}>
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Panel - Chat/Edit */}
        <div style={{ 
          background: '#16161f', 
          borderRadius: '16px', 
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {selectedAgent ? (
            <>
              {/* Agent Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #2a2a3e'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    fontSize: '2.5rem',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${departmentConfig[selectedAgent.department]?.color || '#4B6CB7'}20`,
                    borderRadius: '16px'
                  }}>
                    {departmentConfig[selectedAgent.department]?.icon || '🤖'}
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', marginBottom: '0.25rem' }}>{selectedAgent.name}</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                      {departmentConfig[selectedAgent.department]?.label || selectedAgent.department}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setEditMode(!editMode)}
                    style={{
                      background: '#2a2a3e',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    {editMode ? '💬 Chat' : '✏️ Éditer'}
                  </button>
                  <button 
                    onClick={() => toggleAgentStatus(selectedAgent)}
                    style={{
                      background: selectedAgent.status === 'active' ? '#EF4444' : '#10B981',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    {selectedAgent.status === 'active' ? '⏸️ Pause' : '▶️ Activer'}
                  </button>
                </div>
              </div>

              {editMode ? (
                /* Edit Mode */
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Nom de l'agent</label>
                    <input 
                      type="text" 
                      value={selectedAgent.name}
                      onChange={(e) => setSelectedAgent({...selectedAgent, name: e.target.value})}
                      style={{
                        width: '100%',
                        background: '#1a1a2e',
                        border: '1px solid #2a2a3e',
                        color: '#fff',
                        padding: '12px',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <textarea 
                      value={selectedAgent.description}
                      onChange={(e) => setSelectedAgent({...selectedAgent, description: e.target.value})}
                      rows={3}
                      style={{
                        width: '100%',
                        background: '#1a1a2e',
                        border: '1px solid #2a2a3e',
                        color: '#fff',
                        padding: '12px',
                        borderRadius: '8px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Instructions</label>
                    <textarea 
                      value={selectedAgent.instructions || 'Aucune instruction définie'}
                      onChange={(e) => setSelectedAgent({...selectedAgent, instructions: e.target.value})}
                      rows={6}
                      style={{
                        width: '100%',
                        background: '#1a1a2e',
                        border: '1px solid #2a2a3e',
                        color: '#fff',
                        padding: '12px',
                        borderRadius: '8px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Capacités (séparées par virgule)</label>
                    <input 
                      type="text" 
                      value={(selectedAgent.capabilities || []).join(', ')}
                      onChange={(e) => setSelectedAgent({...selectedAgent, capabilities: e.target.value.split(',').map(c => c.trim())})}
                      style={{
                        width: '100%',
                        background: '#1a1a2e',
                        border: '1px solid #2a2a3e',
                        color: '#fff',
                        padding: '12px',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Modèle IA</label>
                    <select 
                      value={selectedAgent.model || 'llama2'}
                      onChange={(e) => setSelectedAgent({...selectedAgent, model: e.target.value})}
                      style={{
                        width: '100%',
                        background: '#1a1a2e',
                        border: '1px solid #2a2a3e',
                        color: '#fff',
                        padding: '12px',
                        borderRadius: '8px'
                      }}
                    >
                      <option value="llama2">Llama 2 (Général)</option>
                      <option value="mistral">Mistral (Rapide)</option>
                      <option value="codellama">CodeLlama (Code)</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Configuration sauvegardée!')
                      setEditMode(false)
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #4B6CB7 0%, #182848 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 32px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    💾 Sauvegarder
                  </button>
                </div>
              ) : (
                /* Chat Mode */
                <>
                  <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                    {chatHistory.length === 0 ? (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        color: '#888'
                      }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                          {departmentConfig[selectedAgent.department]?.icon || '🤖'}
                        </div>
                        <p>Commencez une conversation avec {selectedAgent.name}</p>
                      </div>
                    ) : (
                      chatHistory.map((msg, i) => (
                        <div 
                          key={i}
                          style={{
                            display: 'flex',
                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            marginBottom: '1rem'
                          }}
                        >
                          <div style={{
                            maxWidth: '70%',
                            background: msg.role === 'user' ? '#4B6CB7' : '#1a1a2e',
                            color: '#fff',
                            padding: '1rem',
                            borderRadius: '12px',
                            borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px',
                            borderBottomLeftRadius: msg.role === 'assistant' ? '2px' : '12px'
                          }}>
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    {isTyping && (
                      <div style={{ color: '#888', fontStyle: 'italic' }}>
                        ⏳ L'agentIA réflexion...
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input 
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder={`Envoyer un message à ${selectedAgent.name}...`}
                      style={{
                        flex: 1,
                        background: '#1a1a2e',
                        border: '1px solid #2a2a3e',
                        color: '#fff',
                        padding: '12px 16px',
                        borderRadius: '8px'
                      }}
                    />
                    <button 
                      onClick={sendMessage}
                      disabled={!chatMessage.trim()}
                      style={{
                        background: '#4B6CB7',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        cursor: chatMessage.trim() ? 'pointer' : 'not-allowed',
                        opacity: chatMessage.trim() ? 1 : 0.5
                      }}
                    >
                      ➤
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#888'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👈</div>
                <p>Sélectionnez un agent pour commencer</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Agent Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#16161f',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>➕ Nouvel Agent IA</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Nom</label>
              <input 
                type="text"
                value={newAgent.name}
                onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                style={{
                  width: '100%',
                  background: '#1a1a2e',
                  border: '1px solid #2a2a3e',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Département</label>
              <select 
                value={newAgent.department}
                onChange={(e) => setNewAgent({...newAgent, department: e.target.value})}
                style={{
                  width: '100%',
                  background: '#1a1a2e',
                  border: '1px solid #2a2a3e',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px'
                }}
              >
                {Object.entries(departmentConfig).map(([key, val]) => (
                  <option key={key} value={key}>{val.icon} {val.label}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Description</label>
              <textarea 
                value={newAgent.description}
                onChange={(e) => setNewAgent({...newAgent, description: e.target.value})}
                rows={3}
                style={{
                  width: '100%',
                  background: '#1a1a2e',
                  border: '1px solid #2a2a3e',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Instructions</label>
              <textarea 
                value={newAgent.instructions}
                onChange={(e) => setNewAgent({...newAgent, instructions: e.target.value})}
                rows={4}
                placeholder="Instructions spécifiques pour l'agent..."
                style={{
                  width: '100%',
                  background: '#1a1a2e',
                  border: '1px solid #2a2a3e',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '0.5rem' }}>Capacités (séparées par virgule)</label>
              <input 
                type="text"
                value={newAgent.capabilities}
                onChange={(e) => setNewAgent({...newAgent, capabilities: e.target.value})}
                placeholder="Capacité 1, Capacité 2, Capacité 3"
                style={{
                  width: '100%',
                  background: '#1a1a2e',
                  border: '1px solid #2a2a3e',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  background: '#2a2a3e',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button 
                onClick={handleAddAgent}
                disabled={!newAgent.name}
                style={{
                  flex: 1,
                  background: '#4B6CB7',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: newAgent.name ? 'pointer' : 'not-allowed',
                  opacity: newAgent.name ? 1 : 0.5
                }}
              >
                Créer l'agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
