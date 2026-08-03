-- =====================================================
-- E-DÉSIGNE - EXTENSION BASE DE DONNÉES COMPLÈTE
-- Marketing, Réseaux Sociaux, Marketplaces, Automation
-- =====================================================

-- =====================================================
-- TABLES CANAUX DE VENTE & RÉSEAUX SOCIAUX
-- =====================================================

-- 6. Social Media Accounts
CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL, -- whatsapp, facebook, instagram, tiktok, pinterest, linkedin, twitter
  account_name TEXT,
  account_id TEXT,
  access_token TEXT,
  refresh_token TEXT,
  webhook_url TEXT,
  is_active BOOLEAN DEFAULT true,
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Social Media Posts
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  media_urls TEXT[],
  scheduled_at TIMESTAMP WITH TIME ZONE,
  posted_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'draft', -- draft, scheduled, published, failed
  engagement_likes INTEGER DEFAULT 0,
  engagement_shares INTEGER DEFAULT 0,
  engagement_comments INTEGER DEFAULT 0,
  external_post_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. WhatsApp Campaigns
CREATE TABLE IF NOT EXISTS whatsapp_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message_template TEXT,
  media_url TEXT,
  recipients TEXT[],
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_count INTEGER DEFAULT 0,
  read_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLES MARKETPLACES
-- =====================================================

-- 9. Marketplace Connections
CREATE TABLE IF NOT EXISTS marketplace_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL, -- amazon, shopify, ebay, etsy, woocommerce
  store_name TEXT,
  api_key TEXT,
  api_secret TEXT,
  access_token TEXT,
  refresh_token TEXT,
  webhook_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Marketplace Products (sync status)
CREATE TABLE IF NOT EXISTS marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  local_product_id INTEGER,
  marketplace TEXT NOT NULL,
  external_product_id TEXT,
  sync_status TEXT DEFAULT 'pending', -- pending, synced, error
  last_sync TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Marketplace Orders
CREATE TABLE IF NOT EXISTS marketplace_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marketplace TEXT NOT NULL,
  external_order_id TEXT NOT NULL,
  local_order_id TEXT,
  customer JSONB,
  items JSONB,
  total DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  sync_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLES MARKETING & AUTOMATION
-- =====================================================

-- 12. Email Campaigns
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT,
  template_id TEXT,
  recipients JSONB,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. SMS Campaigns
CREATE TABLE IF NOT EXISTS sms_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  recipients TEXT[],
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Marketing Automation
CREATE TABLE IF NOT EXISTS marketing_automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  trigger_event TEXT NOT NULL, -- order_placed, product_viewed, cart_abandoned, etc.
  actions JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. Push Notifications
CREATE TABLE IF NOT EXISTS push_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  icon_url TEXT,
  action_url TEXT,
  recipients TEXT[], -- user IDs or segments
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLES CRM & CLIENTS
-- =====================================================

-- 16. Customers (Extended)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  phone TEXT,
  first_name TEXT,
  last_name TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  segment TEXT, -- vip, regular, new, at_risk
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. Customer Activity
CREATE TABLE IF NOT EXISTS customer_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  activity_type TEXT NOT NULL, -- viewed_product, added_to_cart, purchased, etc.
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLES ANALYTICS AVANCÉES
-- =====================================================

-- 18. Product Views
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id INTEGER,
  user_id UUID,
  session_id TEXT,
  referrer TEXT,
  device_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19. Cart Events
CREATE TABLE IF NOT EXISTS cart_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT,
  product_id INTEGER,
  event_type TEXT NOT NULL, -- added, removed, updated
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 20. Revenue Analytics
CREATE TABLE IF NOT EXISTS revenue_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  revenue DECIMAL(10,2) DEFAULT 0,
  orders_count INTEGER DEFAULT 0,
  average_order_value DECIMAL(10,2) DEFAULT 0,
  new_customers INTEGER DEFAULT 0,
  returning_customers INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLES INNOVATION & FEATURES
-- =====================================================

-- 21. AI Features Usage
CREATE TABLE IF NOT EXISTS ai_features_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_name TEXT NOT NULL,
  user_id UUID,
  input_data JSONB,
  output_data JSONB,
  model_used TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 22. Product Recommendations Cache
CREATE TABLE IF NOT EXISTS recommendations_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  product_id INTEGER,
  recommended_products INTEGER[],
  model_version TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_features_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations_cache ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES (Public read, Auth write)
-- =====================================================

CREATE POLICY "public_read_social" ON social_accounts FOR SELECT USING (true);
CREATE POLICY "public_read_posts" ON social_posts FOR SELECT USING (true);
CREATE POLICY "public_read_whatsapp" ON whatsapp_campaigns FOR SELECT USING (true);
CREATE POLICY "public_read_marketplaces" ON marketplace_connections FOR SELECT USING (true);
CREATE POLICY "public_read_products_sync" ON marketplace_products FOR SELECT USING (true);
CREATE POLICY "public_read_marketplace_orders" ON marketplace_orders FOR SELECT USING (true);
CREATE POLICY "public_read_email_campaigns" ON email_campaigns FOR SELECT USING (true);
CREATE POLICY "public_read_sms_campaigns" ON sms_campaigns FOR SELECT USING (true);
CREATE POLICY "public_read_automations" ON marketing_automations FOR SELECT USING (true);
CREATE POLICY "public_read_push" ON push_notifications FOR SELECT USING (true);
CREATE POLICY "public_read_customers" ON customers FOR SELECT USING (true);
CREATE POLICY "public_read_activities" ON customer_activities FOR SELECT USING (true);
CREATE POLICY "public_read_views" ON product_views FOR SELECT USING (true);
CREATE POLICY "public_read_cart_events" ON cart_events FOR SELECT USING (true);
CREATE POLICY "public_read_revenue" ON revenue_analytics FOR SELECT USING (true);
CREATE POLICY "public_read_ai_usage" ON ai_features_usage FOR SELECT USING (true);
CREATE POLICY "public_read_recommendations" ON recommendations_cache FOR SELECT USING (true);

-- =====================================================
-- INSERT DEFAULT MARKETING AUTOMATIONS
-- =====================================================

INSERT INTO marketing_automations (name, trigger_event, actions, is_active) VALUES
('Welcome Email', 'user_registered', '{"email": {"template": "welcome", "delay": 0}}', true),
('Abandoned Cart Reminder', 'cart_abandoned', '{"email": {"template": "cart_reminder", "delay": 3600}, "whatsapp": {"template": "cart_reminder", "delay": 7200}}', true),
('Order Confirmation', 'order_placed', '{"email": {"template": "order_confirmation", "delay": 0}}', true),
('Post-Purchase Followup', 'order_delivered', '{"email": {"template": "review_request", "delay": 86400}}', true),
('VIP Customer Reward', 'vip_reached', '{"email": {"template": "vip_bonus", "delay": 0}, "push": {"title": "Félicitations!", "body": "Vous êtes devenu client VIP!"}}', true),
('Win-Back Campaign', 'inactive_30_days', '{"email": {"template": "we_miss_you", "delay": 0}, "sms": {"template": "come_back", "delay": 3600}}', true);

-- =====================================================
-- INSERT DEFAULT SOCIAL ACCOUNTS
-- =====================================================

INSERT INTO social_accounts (platform, account_name, is_active) VALUES
('whatsapp', 'E-Désigne Official', true),
('facebook', 'E-Designe', true),
('instagram', '@e_designe_official', true),
('tiktok', '@e_designe', true),
('pinterest', 'e-designe', true),
('linkedin', 'E-Désigne Company', true),
('twitter', '@EDesigneOfficial', false);

-- =====================================================
-- INSERT DEFAULT MARKETPLACE CONNECTIONS
-- =====================================================

INSERT INTO marketplace_connections (platform, store_name, is_active) VALUES
('shopify', 'E-Désigne Shopify', false),
('amazon', 'E-Désigne Amazon', false),
('ebay', 'E-Designe Store', false),
('etsy', 'E-Désigne Etsy', false),
('woocommerce', 'E-Désigne WooCommerce', false);

-- =====================================================
-- CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_social_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_status ON whatsapp_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_platform ON marketplace_connections(platform);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_local ON marketplace_products(local_product_id);
CREATE INDEX IF NOT EXISTS idx_email_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_customers_segment ON customers(segment);
CREATE INDEX IF NOT EXISTS idx_activities_customer ON customer_activities(customer_id);
CREATE INDEX IF NOT EXISTS idx_views_product ON product_views(product_id);
CREATE INDEX IF NOT EXISTS idx_revenue_date ON revenue_analytics(date);
CREATE INDEX IF NOT EXISTS idx_ai_feature ON ai_features_usage(feature_name);
