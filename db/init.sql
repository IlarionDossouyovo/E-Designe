-- E-Graphisme Database Schema
-- Initialisation de la base de données

-- Table users (Utilisateurs)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('founder', 'admin', 'client', 'guest') DEFAULT 'client',
    company VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

-- Table services (Services proposés)
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category ENUM('design', 'web', 'video', 'content', 'marketing', 'other') DEFAULT 'design',
    price DECIMAL(10, 2),
    duration_days INT,
    features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Table projects (Projets)
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('draft', 'pending', 'in_progress', 'review', 'completed', 'cancelled') DEFAULT 'draft',
    budget DECIMAL(10, 2),
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

-- Table leads (Prospects)
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    company VARCHAR(255),
    phone VARCHAR(50),
    source VARCHAR(100),
    status ENUM('new', 'contacted', 'qualified', 'proposal', 'won', 'lost') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table orders (Commandes)
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'processing', 'completed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Table messages (Messages)
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    type ENUM('inbound', 'outbound', 'system') DEFAULT 'inbound',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table ai_conversations (Conversations AI)
CREATE TABLE IF NOT EXISTS ai_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    agent_type VARCHAR(50),
    prompt TEXT NOT NULL,
    response TEXT,
    tokens_used INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table analytics (Analytique)
CREATE TABLE IF NOT EXISTS analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    event_data JSON,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default founder user (password: egraphisme2026)
INSERT INTO users (email, password, name, role, company) VALUES 
('founder@e-graphisme.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Founder', 'founder', 'E-Graphisme By ELECTRON')
ON DUPLICATE KEY UPDATE name=name;

-- Insert default services
INSERT INTO services (name, slug, description, category, price, duration_days, features, status) VALUES 
('Logo Design', 'logo-design', 'Création de logo professionnel et identité visuelle', 'design', 150.00, 7, '["Logo principal", "Variations de couleurs", "Charte graphique", "Fichiers sources"]', 'active'),
('Website Creation', 'website-creation', 'Création de site web professionnel', 'web', 500.00, 30, '["Site responsive", "SEO intégré", "Formulaire de contact", "Analytics"]', 'active'),
('Video Production', 'video-production', 'Production vidéo professionnelle', 'video', 800.00, 14, '["Script", "Montage", "Musique", "Sous-titres"]', 'active'),
('Content Writing', 'content-writing', 'Rédaction de contenu SEO', 'content', 100.00, 5, '["Article SEO", "Images", "Meta tags"]', 'active'),
('Digital Marketing', 'digital-marketing', 'Stratégie marketing digital', 'marketing', 300.00, 15, '["Audit", "Stratégie", "Rapport", "Recommandations"]', 'active'),
('SEO Optimization', 'seo-optimization', 'Optimisation SEO complète', 'web', 250.00, 10, '["Audit technique", "Keywords", "Backlinks", "Rapport"]', 'active')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample lead
INSERT INTO leads (email, name, company, source, status) VALUES 
('demo@example.com', 'Demo User', 'Demo Company', 'website', 'new')
ON DUPLICATE KEY UPDATE email=email;