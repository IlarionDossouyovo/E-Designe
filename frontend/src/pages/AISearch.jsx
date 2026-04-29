import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
export default function AISearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ category: '', color: '' })
  const categories = ['robes', 'chemises', 'pantalons', 'vestes', 'africain', 'bebe', 'accessoires']
  const colors = ['noir', 'blanc', 'rouge', 'bleu', 'vert', 'multicolore']
  const searchAI = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const { data } = await axios.post('/api/ai/search', { query, ...filters })
      setResults(data.results || [])
    } catch (error) { console.error('Search error:', error) }
    setLoading(false)
  }
  useEffect(() => {
    const timer = setTimeout(() => { if (query) searchAI() }, 500)
    return () => clearTimeout(timer)
  }, [query, filters])
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#19232D', marginBottom: '20px' }}>🔍 Recherche IA Intelligente</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Essayez: 'robe rouge soirée taille M'" value={query} onChange={e => setQuery(e.target.value)} style={{ flex: 1, minWidth: '200px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })} style={{ padding: '12px', borderRadius: '8px' }}>
          <option value="">Toutes catégories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filters.color} onChange={e => setFilters({ ...filters, color: e.target.value })} style={{ padding: '12px', borderRadius: '8px' }}>
          <option value="">Toutes couleurs</option>
          {colors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {loading && <p style={{ textAlign: 'center' }}>🔄 Recherche en cours...</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {results.map(product => (
          <motion.div key={product.id} whileHover={{ scale: 1.02 }} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '16px' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4B6CB7' }}>{product.price}€</span>
                {product.isNew && <span style={{ background: '#4B6CB7', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Nouveau</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {!loading && results.length === 0 && query && <p style={{ textAlign: 'center', color: '#666' }}>Aucun résultat pour "{query}"</p>}
    </div>
  )
}