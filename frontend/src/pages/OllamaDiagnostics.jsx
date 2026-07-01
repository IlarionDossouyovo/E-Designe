import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Import de la configuration IA
import { OLLAMA_CONFIG, AGENT_PROMPTS, checkOllamaStatus, callOllama } from '../services/aiConfig'

export default function OllamaDiagnostics() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)
  const [testResults, setTestResults] = useState({})

  // Vérifier le statut Ollama au chargement
  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    setLoading(true)
    const result = await checkOllamaStatus()
    setStatus(result)
    setLoading(false)
  }

  // Tester un agent spécifique
  const testAgent = async (agentType) => {
    setTesting(true)
    setTestResults(prev => ({ ...prev, [agentType]: { loading: true } }))
    
    const result = await callOllama(agentType, 'Bonjour, présente-toi!')
    
    setTestResults(prev => ({ 
      ...prev, 
      [agentType]: { loading: false, ...result }
    }))
    setTesting(false)
  }

  // Tester tous les agents
  const testAllAgents = async () => {
    const agents = Object.keys(OLLAMA_CONFIG.models)
    for (const agent of agents) {
      await testAgent(agent)
      await new Promise(r => setTimeout(r, 1000)) // Attendre entre chaque test
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', background: '#0a0a0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
          <p style={{ color: '#fff' }}>Vérification de la connexion Ollama...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '20px', padding: '30px', marginBottom: '30px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem' }}>🧠</div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>DIAGNOSTIC OLLAMA</h1>
              <p style={{ opacity: 0.9, margin: '5px 0 0' }}>Vérification des modèles IA installés</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={checkStatus} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              🔄 Actualiser
            </button>
            <Link to="/agents" style={{ padding: '12px 24px', background: '#fff', color: '#22c55e', border: 'none', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', fontWeight: 'bold' }}>
              ← Retour
            </Link>
          </div>
        </div>
      </div>

      {/* Statut de connexion */}
      <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35', marginBottom: '30px' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>
          {status?.connected ? '✅ Ollama Connecté' : '❌ Ollama Déconnecté'}
        </h2>
        
        {status?.connected ? (
          <>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
              Modèles détectés: <strong style={{ color: '#22c55e' }}>{status.models.length}</strong>
            </p>
            
            {/* Modèles installés */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
              {status.models.map(model => (
                <div key={model} style={{ background: '#0a0a0f', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#22c55e' }}>✓</span>
                  <span style={{ color: '#fff', fontFamily: 'monospace' }}>{model}</span>
                </div>
              ))}
            </div>

            {/* Modèles manquants */}
            {status.missing?.length > 0 && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '8px', border: '1px solid #ef4444' }}>
                <p style={{ color: '#ef4444', marginBottom: '10px' }}>⚠️ Modèles manquants:</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {status.missing.map(model => (
                    <code key={model} style={{ background: '#0a0a0f', padding: '6px 12px', borderRadius: '6px', color: '#f59e0b' }}>
                      ollama pull {model}
                    </code>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '8px' }}>
            <p style={{ color: '#ef4444' }}>Erreur: {status?.error || 'Connexion impossible'}</p>
            <p style={{ color: '#9ca3af', marginTop: '10px' }}>
              Assurez-vous qu'Ollama est installé et en cours d'exécution:
              <br />
              <code style={{ background: '#0a0a0f', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', marginTop: '8px' }}>
                ollama serve
              </code>
            </p>
          </div>
        )}
      </div>

      {/* Tester les agents */}
      <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#fff', margin: 0 }}>🧪 Tester les Agents</h2>
          <button 
            onClick={testAllAgents} 
            disabled={testing || !status?.connected}
            style={{ padding: '12px 24px', background: testing ? '#6B7280' : '#4B6CB7', color: '#fff', border: 'none', borderRadius: '8px', cursor: testing ? 'not-allowed' : 'pointer' }}
          >
            {testing ? '⏳ Test en cours...' : '🚀 Tester tous les agents'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {Object.entries(OLLAMA_CONFIG.models).map(([agentType, config]) => (
            <div key={agentType} style={{ background: '#0a0a0f', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ color: '#fff', margin: 0, textTransform: 'capitalize' }}>{agentType}</h3>
                  <span style={{ color: '#6B8DD6', fontSize: '0.85rem' }}>{config.displayName}</span>
                </div>
                <button 
                  onClick={() => testAgent(agentType)}
                  disabled={testing || !status?.connected}
                  style={{ padding: '8px 16px', background: '#4B6CB7', color: '#fff', border: 'none', borderRadius: '6px', cursor: testing ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}
                >
                  Test
                </button>
              </div>
              
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 12px' }}>{config.purpose}</p>
              
              {/* Résultat du test */}
              {testResults[agentType] && (
                <div style={{ 
                  background: testResults[agentType].success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                  padding: '12px', 
                  borderRadius: '8px',
                  border: `1px solid ${testResults[agentType].success ? '#22c55e' : '#ef4444'}`
                }}>
                  {testResults[agentType].loading ? (
                    <p style={{ color: '#9ca3af', margin: 0 }}>⏳ Test en cours...</p>
                  ) : testResults[agentType].success ? (
                    <div>
                      <p style={{ color: '#22c55e', margin: '0 0 8px', fontSize: '0.85rem' }}>✅ Réponse reçue</p>
                      <p style={{ color: '#fff', margin: 0, fontSize: '0.8rem', whiteSpace: 'pre-wrap', maxHeight: '100px', overflow: 'auto' }}>
                        {testResults[agentType].response?.substring(0, 200)}...
                      </p>
                    </div>
                  ) : (
                    <p style={{ color: '#ef4444', margin: 0, fontSize: '0.85rem' }}>❌ {testResults[agentType].error}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Configuration des prompts */}
      <div style={{ background: '#16161f', padding: '24px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>📝 Instructions des Agents</h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {Object.entries(AGENT_PROMPTS).map(([agentType, prompt]) => (
            <details key={agentType} style={{ background: '#0a0a0f', borderRadius: '8px', overflow: 'hidden' }}>
              <summary style={{ padding: '16px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', textTransform: 'capitalize' }}>
                {agentType} - {OLLAMA_CONFIG.models[agentType]?.displayName}
              </summary>
              <pre style={{ padding: '16px', margin: 0, color: '#9ca3af', fontSize: '0.85rem', whiteSpace: 'pre-wrap', background: '#0a0a0f' }}>
{prompt}
              </pre>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
