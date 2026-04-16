import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ category: '', color: '', minPrice: '', maxPrice: '' })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories')
      ])
      setProducts(productsRes.data)
      setCategories(categoriesRes.data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const applyFilters = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.color) params.append('color', filters.color)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (searchQuery) params.append('search', searchQuery)
      
      const { data } = await axios.get(`/api/products?${params}`)
      setProducts(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return
    try {
      const { data } = await axios.post('/api/ai/search', { query: searchQuery })
      setProducts(data.results)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Boutique</h1>
      
      <div className="search-box" style={{ marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Recherche classique ou IA: robe rouge soirée..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
        />
        <button onClick={handleAISearch}>🔍</button>
      </div>

      <div className="filters">
        <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
          <option value="">Toutes catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select value={filters.color} onChange={(e) => setFilters({...filters, color: e.target.value})}>
          <option value="">Toutes couleurs</option>
          <option value="noir">Noir</option>
          <option value="blanc">Blanc</option>
          <option value="rouge">Rouge</option>
          <option value="bleu">Bleu</option>
          <option value="beige">Beige</option>
          <option value="gris">Gris</option>
        </select>
        
        <input 
          type="number" 
          placeholder="Prix min" 
          style={{ padding: '0.5rem', width: '100px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
          value={filters.minPrice}
          onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
        />
        
        <input 
          type="number" 
          placeholder="Prix max" 
          style={{ padding: '0.5rem', width: '100px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
          value={filters.maxPrice}
          onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
        />
      </div>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '3rem' }}>Aucun produit trouvé</p>
      ) : (
        <div className="grid grid-products">
          {products.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="card">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price.toFixed(2)} €</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}