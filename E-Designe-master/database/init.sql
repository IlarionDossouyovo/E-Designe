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

-- =====================================================
-- TABLES CANAUX DE VENTE & RÉSEAUX SOCIAUX
-- =====================================================

-- Social Media Accounts
CREATE TABLE IF NOT EXISTS social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL,
    account_name VARCHAR(255),
    account_id VARCHAR(255),
    access_token TEXT,
    refresh_token TEXT,
    webhook_url TEXT,
    is_active BOOLEAN DEFAULT true,
    followers_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Social Media Posts
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    media_urls TEXT[],
    scheduled_at TIMESTAMP,
    posted_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'draft',
    engagement_likes INTEGER DEFAULT 0,
    engagement_shares INTEGER DEFAULT 0,
    engagement_comments INTEGER DEFAULT 0,
    external_post_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- WhatsApp Campaigns
CREATE TABLE IF NOT EXISTS whatsapp_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    message_template TEXT,
    media_url TEXT,
    recipients TEXT[],
    status VARCHAR(50) DEFAULT 'draft',
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    delivered_count INTEGER DEFAULT 0,
    read_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TABLES MARKETPLACES
-- =====================================================

-- Marketplace Connections
CREATE TABLE IF NOT EXISTS marketplace_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL,
    store_name VARCHAR(255),
    api_key TEXT,
    api_secret TEXT,
    access_token TEXT,
    webhook_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_sync TIMESTAMP,
    settings JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Marketplace Products
CREATE TABLE IF NOT EXISTS marketplace_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    local_product_id UUID,
    marketplace VARCHAR(50) NOT NULL,
    external_product_id VARCHAR(255),
    sync_status VARCHAR(50) DEFAULT 'pending',
    last_sync TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TABLES MARKETING & AUTOMATION
-- =====================================================

-- Email Campaigns
CREATE TABLE IF NOT EXISTS email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT,
    template_id VARCHAR(100),
    recipients JSONB,
    status VARCHAR(50) DEFAULT 'draft',
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    open_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- SMS Campaigns
CREATE TABLE IF NOT EXISTS sms_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    recipients TEXT[],
    status VARCHAR(50) DEFAULT 'draft',
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    delivered_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Marketing Automation
CREATE TABLE IF NOT EXISTS marketing_automations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    trigger_event VARCHAR(100) NOT NULL,
    actions JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Push Notifications
CREATE TABLE IF NOT EXISTS push_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    icon_url VARCHAR(500),
    action_url VARCHAR(500),
    recipients TEXT[],
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    delivered_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TABLES CRM & CLIENTS
-- =====================================================

-- Customers
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    segment VARCHAR(50),
    tags TEXT[],
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Customer Activity
CREATE TABLE IF NOT EXISTS customer_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id),
    activity_type VARCHAR(100) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TABLES ANALYTICS
-- =====================================================

-- Product Views
CREATE TABLE IF NOT EXISTS product_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID,
    user_id UUID,
    session_id VARCHAR(255),
    referrer VARCHAR(500),
    device_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Cart Events
CREATE TABLE IF NOT EXISTS cart_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    session_id VARCHAR(255),
    product_id UUID,
    event_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Revenue Analytics
CREATE TABLE IF NOT EXISTS revenue_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    revenue DECIMAL(10,2) DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    new_customers INTEGER DEFAULT 0,
    returning_customers INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INSERT DEFAULT AUTOMATIONS
-- =====================================================

INSERT INTO marketing_automations (name, trigger_event, actions, is_active) VALUES
('Welcome Email', 'user_registered', '{"email": {"template": "welcome", "delay": 0}}', true),
('Abandoned Cart Reminder', 'cart_abandoned', '{"email": {"template": "cart_reminder", "delay": 3600}, "whatsapp": {"template": "cart_reminder", "delay": 7200}}', true),
('Order Confirmation', 'order_placed', '{"email": {"template": "order_confirmation", "delay": 0}}', true),
('Post-Purchase Followup', 'order_delivered', '{"email": {"template": "review_request", "delay": 86400}}', true),
('VIP Customer Reward', 'vip_reached', '{"email": {"template": "vip_bonus", "delay": 0}}', true),
('Win-Back Campaign', 'inactive_30_days', '{"email": {"template": "we_miss_you", "delay": 0}}', true);

-- =====================================================
-- INSERT DEFAULT SOCIAL ACCOUNTS
-- =====================================================

INSERT INTO social_accounts (platform, account_name, is_active, followers_count) VALUES
('whatsapp', 'E-Désigne Official', true, 1250),
('facebook', 'E-Designe', true, 5420),
('instagram', '@e_designe_official', true, 8750),
('tiktok', '@e_designe', true, 15600),
('pinterest', 'e-designe', true, 890),
('linkedin', 'E-Désigne Company', true, 1250);

-- =====================================================
-- INSERT DEFAULT MARKETPLACE CONNECTIONS
-- =====================================================

INSERT INTO marketplace_connections (platform, store_name, is_active) VALUES
('shopify', 'E-Désigne Shopify', false),
('amazon', 'E-Désigne Amazon', false),
('ebay', 'E-Designe Store', false),
('etsy', 'E-Désigne Etsy', false),
('woocommerce', 'E-Désigne WooCommerce', false);