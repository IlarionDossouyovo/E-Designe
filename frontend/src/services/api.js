// API Service for E-Designe
// Handles all backend communications

const API_BASE = process.env.REACT_APP_API_URL || ''

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error)
    throw error
  }
}

// Products API
export const productsAPI = {
  getAll: () => apiCall('/api/products'),
  getById: (id) => apiCall(`/api/products/${id}`),
  getByCategory: (cat) => apiCall(`/api/products?category=${cat}`),
  search: (query) => apiCall(`/api/products/search?q=${encodeURIComponent(query)}`),
  get Featured: () => apiCall('/api/products?featured=true')
}

// Cart API
export const cartAPI = {
  get: () => apiCall('/api/cart'),
  add: (product) => apiCall('/api/cart', { method: 'POST', body: JSON.stringify(product) }),
  update: (id, qty) => apiCall(`/api/cart/${id}`, { method: 'PUT', body: JSON.stringify({ quantity: qty }) }),
  remove: (id) => apiCall(`/api/cart/${id}`, { method: 'DELETE' }),
  clear: () => apiCall('/api/cart', { method: 'DELETE' })
}

// Orders API
export const ordersAPI = {
  create: (orderData) => apiCall('/api/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getById: (id) => apiCall(`/api/orders/${id}`),
  getByUser: (userId) => apiCall(`/api/orders?user=${userId}`),
  getAll: () => apiCall('/api/orders')
}

// User API
export const userAPI = {
  login: (credentials) => apiCall('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiCall('/api/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  logout: () => apiCall('/api/auth/logout', { method: 'POST' }),
  getProfile: () => apiCall('/api/users/me'),
  updateProfile: (data) => apiCall('/api/users/me', { method: 'PUT', body: JSON.stringify(data) })
}

// Wishlist API
export const wishlistAPI = {
  get: () => apiCall('/api/wishlist'),
  add: (productId) => apiCall('/api/wishlist', { method: 'POST', body: JSON.stringify({ productId }) }),
  remove: (productId) => apiCall(`/api/wishlist/${productId}`, { method: 'DELETE' })
}

// Blog API
export const blogAPI = {
  getAll: () => apiCall('/api/blog'),
  getById: (id) => apiCall(`/api/blog/${id}`),
  getByCategory: (cat) => apiCall(`/api/blog?category=${cat}`)
}

// Export default with all APIs
export default {
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  user: userAPI,
  wishlist: wishlistAPI,
  blog: blogAPI
}
