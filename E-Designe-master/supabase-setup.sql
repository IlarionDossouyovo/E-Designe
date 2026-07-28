-- =====================================================
-- E-DÉSIGNE - CRÉATION DES TABLES SUPABASE
-- Exécuter ce SQL dans Supabase SQL Editor
-- =====================================================

-- 1. Users table
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

-- 2. Products table
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping JSONB,
  payment JSONB,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  products INTEGER[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 5. Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  user_id TEXT,
  user_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);
CREATE POLICY "public_read_orders" ON orders FOR SELECT USING (true);
CREATE POLICY "public_read_users" ON users FOR SELECT USING (true);
CREATE POLICY "public_read_wishlists" ON wishlists FOR SELECT USING (true);
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT USING (true);

-- Allow authenticated insert/update
CREATE POLICY "auth_insert_products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "auth_update_products" ON products FOR UPDATE USING (true);

-- Insert sample products
INSERT INTO products (name, description, price, category, color, sizes, is_new, is_sale) VALUES
('Robe Élégante Noire', 'Robe élégante en mousseline noire, parfaite pour vos soirées.', 89.99, 'robes', 'noir', ARRAY['S','M','L','XL'], true, false),
('Chemise Blanche Classique', 'Chemise blanche en coton égyptien, coupe slim.', 49.99, 'chemises', 'blanc', ARRAY['S','M','L','XL'], false, false),
('Pantalon Chino Beige', 'Pantalon chino en coton premium, coupe droite.', 59.99, 'pantalons', 'beige', ARRAY['28','30','32','34'], false, true),
('Veste en Jean Bleu', 'Veste en denim Lavage medium, style vintage.', 79.99, 'vestes', 'bleu', ARRAY['S','M','L','XL'], false, false),
('Robe Rouge Soirée', 'Robe longue rouge en satin, appropriée pour les grands événements.', 129.99, 'robes', 'rouge', ARRAY['S','M','L'], true, false),
('Pullovers Gris', 'Pull en laine mérinos, douceur extrême.', 39.99, 'pullovers', 'gris', ARRAY['S','M','L','XL'], false, false),
('Jupe Noire Mini', 'Jupe noire plissée, style moderne.', 45.99, 'jupes', 'noir', ARRAY['S','M','L'], false, false),
('T-Shirt Blanc Basic', 'T-shirt en coton bio, coupe regular.', 19.99, 't-shirts', 'blanc', ARRAY['S','M','L','XL'], false, false);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_color ON products(color);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);