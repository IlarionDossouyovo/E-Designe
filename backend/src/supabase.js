// Supabase Database Service - E-DÉSIGNE
// Ce fichier initialise la connexion à Supabase PostgreSQL

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Configuration Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Initialize Supabase client
let supabase = null;
let supabaseAdmin = null;
let isConnected = false;

if (supabaseUrl && supabaseAnonKey && supabaseAnonKey.startsWith('eyJ')) {
  // Admin client (service role key)
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  });
  
  // Public client (anon key)  
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  console.log('✅ Supabase Connected');
  isConnected = true;
} else if (supabaseUrl && supabaseAnonKey) {
  // Fallback to anon key only
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('⚠️ Supabase: Mode lecture seule (clé anon)')
  isConnected = true;
} else {
  console.log('⚠️ Supabase: Non configuré - mode in-memory');
}

// Tables à créer (SQL)
export const createTablesSQL = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  color TEXT,
  sizes TEXT[],
  images TEXT[],
  hover_image TEXT,
  is_new BOOLEAN DEFAULT false,
  is_sale BOOLEAN DEFAULT false,
  old_price DECIMAL(10,2),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping JSONB,
  payment JSONB,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  products INTEGER[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  user_id TEXT,
  user_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics visits table
CREATE TABLE IF NOT EXISTS analytics_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE DEFAULT CURRENT_DATE,
  visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics conversions table
CREATE TABLE IF NOT EXISTS analytics_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE DEFAULT CURRENT_DATE,
  orders INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_color ON products(color);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
`;

// Helper functions Supabase
export const supabaseHelpers = {
  // Products
  async getProducts(filters = {}) {
    if (!supabase) return [];
    let query = supabase.from('products').select('*');
    
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.color) {
      query = query.eq('color', filters.color);
    }
    if (filters.isNew) {
      query = query.eq('is_new', true);
    }
    if (filters.isSale) {
      query = query.eq('is_sale', true);
    }
    
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    return data;
  },

  async getProduct(id) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    return error ? null : data;
  },

  async createProduct(product) {
    if (!supabase) return product;
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    return error ? product : data;
  },

  async updateProduct(id, updates) {
    if (!supabase) return updates;
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return error ? updates : data;
  },

  // Users
  async getUser(email) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    return error ? null : data;
  },

  async createUser(user) {
    if (!supabase) return { id: 'mock-' + Date.now(), ...user };
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();
    return error ? { id: 'mock-' + Date.now(), ...user } : data;
  },

  async updateUser(id, updates) {
    if (!supabase) return updates;
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return error ? updates : data;
  },

  // Orders
  async getOrders(userId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return error ? [] : data;
  },

  async createOrder(order) {
    if (!supabase) return { id: 'ORD-' + Date.now(), ...order };
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    return error ? { id: 'ORD-' + Date.now(), ...order } : data;
  },

  async updateOrderStatus(id, status) {
    if (!supabase) return { id, status };
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return error ? { id, status } : data;
  },

  // Wishlists
  async getWishlist(userId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('wishlists')
      .select('products')
      .eq('user_id', userId)
      .single();
    return error ? [] : (data?.products || []);
  },

  async addToWishlist(userId, productId) {
    if (!supabase) return [productId];
    
    const { data: existing } = await supabase
      .from('wishlists')
      .select('products')
      .eq('user_id', userId)
      .single();
    
    let products = existing?.products || [];
    if (!products.includes(productId)) {
      products.push(productId);
    }
    
    const { error } = await supabase
      .from('wishlists')
      .upsert({ user_id: userId, products, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    
    return error ? [] : products;
  },

  async removeFromWishlist(userId, productId) {
    if (!supabase) return [];
    
    const { data: existing } = await supabase
      .from('wishlists')
      .select('products')
      .eq('user_id', userId)
      .single();
    
    let products = (existing?.products || []).filter(p => p !== productId);
    
    await supabase
      .from('wishlists')
      .upsert({ user_id: userId, products, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    
    return products;
  },

  // Reviews
  async getReviews(productId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    return error ? [] : data;
  },

  async createReview(review) {
    if (!supabase) return { id: 'REV-' + Date.now(), ...review };
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    return error ? { id: 'REV-' + Date.now(), ...review } : data;
  },

  // Analytics
  async logVisit(page) {
    if (!supabaseAdmin) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const { data: existing } = await supabaseAdmin
      .from('analytics_visits')
      .select('*')
      .eq('date', today)
      .single();
    
    if (existing) {
      await supabaseAdmin
        .from('analytics_visits')
        .update({ 
          visitors: (existing.visitors || 0) + 1,
          page_views: (existing.page_views || 0) + 1 
        })
        .eq('date', today);
    } else {
      await supabaseAdmin
        .from('analytics_visits')
        .insert({ date: today, visitors: 1, page_views: 1 });
    }
  },

  async logConversion(orderTotal) {
    if (!supabaseAdmin) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const { data: existing } = await supabaseAdmin
      .from('analytics_conversions')
      .select('*')
      .eq('date', today)
      .single();
    
    if (existing) {
      await supabaseAdmin
        .from('analytics_conversions')
        .update({ 
          orders: (existing.orders || 0) + 1,
          revenue: (existing.revenue || 0) + orderTotal 
        })
        .eq('date', today);
    } else {
      await supabaseAdmin
        .from('analytics_conversions')
        .insert({ date: today, orders: 1, revenue: orderTotal });
    }
  },
};

export { supabase, supabaseAdmin };
export default supabaseHelpers;