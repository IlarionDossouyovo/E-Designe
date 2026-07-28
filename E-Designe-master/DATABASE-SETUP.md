# Guide de Configuration Supabase - E-DÉSIGNE

## Statut Actuel

✅ **Projet déployé**: https://project-6ny5f9mw8-electrons-projects-7ac943c4.vercel.app
✅ **API fonctionnelle**: https://project-6ny5f9mw8-electrons-projects-7ac943c4.vercel.app/api/health
✅ **Service Supabase**: Créé (`backend/src/supabase.js`)

⚠️ **Supabase**: Non configuré (actuellement en mode in-memory)

---

## Configuration Supabase (PostgreSQL)

### 1. Créer un projet Supabase
1. Aller sur https://supabase.com/dashboard
2. Cliquer "New Project"
3. Remplir:
   - **Name**: e-designe
   - **Database Password**: (choisir un mot de passe fort)
   - **Region**: closest to you
4. Attendre 2-3 minutes pour le provisioning

### 2. Obtenir les URLs et clés
1. **Settings** → **API**
2. Copier:
   - `Project URL` → SUPABASE_URL
   - `anon public` key → SUPABASE_ANON_KEY
   - `service_role` key → SUPABASE_SERVICE_KEY

### 3. Créer les tables (SQL Editor)
Aller dans **SQL Editor** et exécuter:

```sql
-- Users table
CREATE TABLE users (
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
CREATE TABLE products (
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
CREATE TABLE orders (
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
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  products INTEGER[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  user_id TEXT,
  user_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics tables
CREATE TABLE analytics_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE DEFAULT CURRENT_DATE,
  visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE analytics_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE DEFAULT CURRENT_DATE,
  orders INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample products
INSERT INTO products (name, description, price, category, color, sizes, is_new, is_sale) VALUES
('Robe Élégante Noire', 'Robe élégante en mousseline noire, parfaite pour vos soirées.', 89.99, 'robes', 'noir', ARRAY['S','M','L','XL'], true, false),
('Chemise Blanche Classique', 'Chemise blanche en coton égyptien, coupe slim.', 49.99, 'chemises', 'blanc', ARRAY['S','M','L','XL'], false, false),
('Pantalon Chino Beige', 'Pantalon chino en coton premium, coupe droite.', 59.99, 'pantalons', 'beige', ARRAY['28','30','32','34'], false, true),
('Veste en Jean Bleu', 'Veste en denim Lavage medium, style vintage.', 79.99, 'vestes', 'bleu', ARRAY['S','M','L','XL'], false, false),
('Robe Rouge Soirée', 'Robe longue rouge en satin, appropriée pour les grands événements.', 129.99, 'robes', 'rouge', ARRAY['S','M','L'], true, false);

-- Create indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_color ON products(color);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_product ON reviews(product_id);
```

### 4. Mettre à jour les variables d'environnement

Dans `/workspace/project/E-Designe/backend/.env`:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Redéployer

```bash
cd /workspace/project/E-Designe
vercel --env-file=backend/.env
```

---

## Schéma des Tables

```
┌─────────────┐       ┌─────────────┐
│   users     │       │  products   │
├─────────────┤       ├─────────────┤
│ id (UUID)   │       │ id (SERIAL) │
│ email       │       │ name        │
│ name       │       │ price      │
│ password   │       │ category   │
│ phone      │       │ color     │
│ address    │       │ ...
└─────────────┘       └─────────────┘
       │                     │
       ▼                     ▼
┌─────────────┐       ┌─────────────┐
│   orders    │       │ wishlists   │
├─────────────┤       ├─────────────┤
│ id          │       │ user_id    │
│ user_id     │◄────►│ products[] │
│ items       │       └─────────────┘
│ total       │
│ status     │
│ shipping   │
└─────────────┘
```

---

## Statut des Services

| Service | Status | Configuration |
|---------|--------|-------------|
| Frontend | ✅ Déployé | Vercel |
| Backend API | ✅ Fonctionnel | Local |
| Stripe | ✅ Prêt (test) | Clé needed |
| PayPal | ✅ Prêt (test) | Clé needed |
| **Supabase** | ⚠️ Ready | **URLs + clés needed** |
| SendGrid | ✅ Ready | API key needed |
| OpenAI | ⚠️ Placeholder | API key needed |

---

## Prochaines Étapes

1. **Créer projet Supabase** (gratuit - https://supabase.com)
2. **Exécuter SQL** pour créer les tables
3. **Ajouter clés** dans `.env`
4. **Redéployer** Vercel avec les nouvelles variables