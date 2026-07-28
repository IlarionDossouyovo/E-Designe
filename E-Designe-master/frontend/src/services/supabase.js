// Supabase Client for E-Designe
// Authentication and database connection

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmjasjoyqqanphrkbjop.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MzUyNjgxMDB9.wPWoudH_UYxjl6KpyysxmA_J5HaUEj'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export const auth = {
  // Inscription
  signUp: async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    })
    if (error) throw error
    return data
  },

  // Connexion
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  // Déconnexion
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtenir l'utilisateur actuel
  getUser: () => supabase.auth.getUser(),

  // Écouter les changements d'auth
  onAuthStateChanged: (callback) => supabase.auth.onAuthStateChanged(callback)
}

// Database functions
export const db = {
  // Products
  products: {
    getAll: () => supabase.from('products').select('*'),
    getById: (id) => supabase.from('products').select('*').eq('id', id).single(),
    getByCategory: (category) => supabase.from('products').select('*').eq('category', category),
    create: (product) => supabase.from('products').insert(product),
    update: (id, product) => supabase.from('products').update(product).eq('id', id),
    delete: (id) => supabase.from('products').delete().eq('id', id)
  },

  // Orders
  orders: {
    getAll: () => supabase.from('orders').select('*'),
    getById: (id) => supabase.from('orders').select('*').eq('id', id).single(),
    getByUser: (userId) => supabase.from('orders').select('*').eq('user_id', userId),
    create: (order) => supabase.from('orders').insert(order),
    update: (id, order) => supabase.from('orders').update(order).eq('id', id)
  },

  // Users
  users: {
    getById: (id) => supabase.from('users').select('*').eq('id', id).single(),
    getByEmail: (email) => supabase.from('users').select('*').eq('email', email).single(),
    create: (user) => supabase.from('users').insert(user),
    update: (id, user) => supabase.from('users').update(user).eq('id', id)
  },

  // Wishlists
  wishlists: {
    getByUser: (userId) => supabase.from('wishlists').select('*').eq('user_id', userId).single(),
    create: (userId) => supabase.from('wishlists').insert({ user_id: userId, products: [] }),
    update: (userId, products) => supabase.from('wishlists').update({ products }).eq('user_id', userId)
  },

  // Reviews
  reviews: {
    getByProduct: (productId) => supabase.from('reviews').select('*').eq('product_id', productId),
    getByUser: (userId) => supabase.from('reviews').select('*').eq('user_id', userId),
    create: (review) => supabase.from('reviews').insert(review)
  }
}

export default { supabase, auth, db }