import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products
export const getProducts = (params) => api.get('/products', { params })
export const getProduct = (id) => api.get(`/products/${id}`)
export const getCategories = () => api.get('/categories')

// AI
export const searchWithAI = (query) => api.post('/ai/search', { query })
export const getRecommendations = (userId, viewedProducts) => 
  api.post('/ai/recommend', { userId, viewedProducts })
export const chatWithAI = (message, context) => 
  api.post('/ai/chat', { message, context })

// Payment
export const createStripeIntent = (amount, currency) => 
  api.post('/payment/stripe/create-intent', { amount, currency })
export const createPayPalOrder = (amount, currency) => 
  api.post('/payment/paypal/create-order', { amount, currency })

// User
export const register = (data) => api.post('/users/register', data)
export const login = (data) => api.post('/users/login', data)

// Orders
export const createOrder = (data) => api.post('/orders', data)
export const getOrders = (userId) => api.get(`/orders/${userId}`)

export default api