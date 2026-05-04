// Search Service
// Enhanced search with filters

import { allProducts } from '../data/products'

export const search = {
  // Full-text search
  query(text, filters = {}) {
    if (!text) return []
    
    const searchText = text.toLowerCase()
    let results = allProducts.filter(p => 
      p.name.toLowerCase().includes(searchText) ||
      p.category.toLowerCase().includes(searchText) ||
      p.sub.toLowerCase().includes(searchText) ||
      p.quality.toLowerCase().includes(searchText)
    )

    // Apply filters
    if (filters.category) {
      results = results.filter(p => p.category === filters.category)
    }
    if (filters.quality) {
      results = results.filter(p => p.quality === filters.quality)
    }
    if (filters.minPrice) {
      results = results.filter(p => p.price >= filters.minPrice)
    }
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= filters.maxPrice)
    }

    return results
  },

  // Get suggestions
  getSuggestions(text) {
    if (!text || text.length < 2) return []
    
    const searchText = text.toLowerCase()
    const products = allProducts.filter(p => 
      p.name.toLowerCase().includes(searchText)
    ).map(p => p.name)

    const categories = [...new Set(
      allProducts
        .filter(p => p.category.toLowerCase().includes(searchText))
        .map(p => p.category)
    )]

    return { products, categories }
  },

  // Get popular searches
  getPopular() {
    return ['Costume', 'Robe', 'Chemise', 'Pantalon', 'Bebe', 'Africain']
  },

  // Get related products
  getRelated(product, limit = 4) {
    return allProducts
      .filter(p => 
        p.id !== product.id && 
        (p.category === product.category || p.sub === product.sub)
      )
      .slice(0, limit)
  }
}

export default search
