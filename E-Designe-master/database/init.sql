-- E-Designe Database Schema
-- Remplace Supabase par PostgreSQL local

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Utilisateurs
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Produits
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    image VARCHAR(500),
    images TEXT[],
    stock INTEGER DEFAULT 0,
    sku VARCHAR(50) UNIQUE,
    brand VARCHAR(100),
    sizes TEXT[],
    colors TEXT[],
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Commandes
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending',
    total DECIMAL(10,2) NOT NULL,
    shipping_address TEXT,
    shipping_phone VARCHAR(50),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    tracking_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Articles de commande
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Revendeurs
CREATE TABLE resellers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    country VARCHAR(100),
    commission DECIMAL(5,2) DEFAULT 10.00,
    verified BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Fournisseurs
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    specialties TEXT[],
    certification VARCHAR(100),
    dropship BOOLEAN DEFAULT false,
    lead_time INTEGER,
    min_order INTEGER,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Marques
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    country VARCHAR(100),
    commission DECIMAL(5,2),
    products_count INTEGER DEFAULT 0,
    dropship BOOLEAN DEFAULT false,
    website VARCHAR(500),
    min_order INTEGER,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Messages de contact
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions utilisateur
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Insertion des données de demo
INSERT INTO products (name, description, price, category, stock, sku) VALUES
('Robe Elegante Noire', 'Robe elegante pour occasion speciale', 89.99, 'Robes', 50, 'ROB-001'),
('Chemise Blanche Classique', 'Chemise blanche en coton bio', 49.99, 'Chemises', 100, 'CHE-001'),
('Pantalon Chino Beige', 'Pantalon chino comfortable', 59.99, 'Pantalons', 75, 'PAN-001'),
('Costume Bleu Marine', 'Costume elegante pour professionnel', 199.99, 'Costumes', 25, 'COS-001'),
('Robe Africaine Colorée', 'Robe traditionnel africain', 129.99, 'Africain', 40, 'AFR-001');

INSERT INTO suppliers (name, country, specialties, certification, dropship, lead_time, min_order) VALUES
('EuroTissus France', 'France', ARRAY['Coton', 'Lin', 'Soie'], 'Oeko-Tex', true, 7, 50),
('China Silk Co', 'Chine', ARRAY['Soie', 'Satin'], 'ISO 9001', true, 21, 200),
('Inde Cotton Mills', 'Inde', ARRAY['Coton bio', 'Museline'], 'GOTS', true, 14, 100);

INSERT INTO brands (name, category, country, commission, products_count, dropship, min_order) VALUES
('Gucci', 'Luxe', 'Italie', 15.00, 45, true, 5),
('Louis Vuitton', 'Luxe', 'France', 18.00, 52, true, 2),
('Nike', 'Sport', 'USA', 10.00, 120, true, 10);

INSERT INTO resellers (name, email, phone, country, commission, verified) VALUES
('Fashion Africa Co', 'contact@fashionafrica.com', '+221771234567', 'Sénégal', 15.00, true),
('EuroStyle Wholesale', 'contact@eurostyle.fr', '+33123456789', 'France', 12.00, true),
('Benin Mode', 'contact@beninmode.bj', '+2290197700347', 'Bénin', 16.00, true);