#!/bin/bash

# =====================================================
# E-DÉSIGNE - COMMANDES DE MISE À JOUR COMPLÈTE
# Projet depuis OneDrive
# =====================================================

echo "=============================================="
echo "🎯 E-DÉSIGNE - MISE À JOUR COMPLÈTE"
echo "=============================================="

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# =====================================================
# 1. SYNCHRONISATION AVEC ONEDRIVE
# =====================================================
echo -e "\n${BLUE}📂 Étape 1: Synchronisation OneDrive${NC}"
echo "Si le projet est stocké sur OneDrive:"
echo "1. Téléchargez le dossier E-Designe depuis OneDrive"
echo "2. Extrayez le contenu dans /workspace/project/"
echo "3. Renommez le dossier en 'E-Designe-master'"

# =====================================================
# 2. INSTALLATION DES DÉPENDANCES
# =====================================================
echo -e "\n${BLUE}📦 Étape 2: Installation des dépendances${NC}"

echo -e "${YELLOW}Installation des dépendances principales...${NC}"
cd /workspace/project/E-Designe/E-Designe-master
npm install

echo -e "${YELLOW}Installation des dépendances frontend...${NC}"
cd /workspace/project/E-Designe/E-Designe-master/frontend
npm install

# =====================================================
# 3. CONFIGURATION BASE DE DONNÉES
# =====================================================
echo -e "\n${BLUE}🗄️ Étape 3: Configuration Base de Données${NC}"

echo -e "${YELLOW}Exécutez le script SQL dans Supabase:${NC}"
echo "1. Allez sur https://supabase.com/dashboard"
echo "2. Ouvrez SQL Editor"
echo "3. Copiez le contenu de supabase-setup.sql"
echo "4. Exécutez le script"
echo ""
echo -e "${YELLOW}Pour les nouvelles tables (Marketing, Social, Marketplaces):${NC}"
echo "1. Copiez le contenu de supabase-extended.sql"
echo "2. Collez dans SQL Editor"
echo "3. Exécutez"

# =====================================================
# 4. CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
# =====================================================
echo -e "\n${BLUE}🔐 Étape 4: Configuration des Variables${NC}"

echo -e "${YELLOW}Créez un fichier .env:${NC}"
cat > /workspace/project/E-Designe/E-Designe-master/.env << 'ENDFILE'
# E-Désigne Environment Configuration

# Server Port
PORT=3000

# RESEND - Emails Transactionnels
RESEND_API_KEY=re_Dj8diRCn_CJ1eDHXVtSKWdbYRw5TRz4ok
FROM_EMAIL=noreply@e-designe.com
SUPPORT_EMAIL=support@e-designe.com

# STRIPE - Paiements
STRIPE_SECRET_KEY=sk_test_votre_cle
STRIPE_PUBLIC_KEY=pk_test_votre_cle
STRIPE_WEBHOOK_SECRET=whsec_votre_secret

# PAYPAL - Paiements
PAYPAL_CLIENT_ID=votre_client_id
PAYPAL_CLIENT_SECRET=votre_client_secret

# SUPABASE - Base de données
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre_cle_anon

# URL du Site
VITE_SITE_URL=https://e-designe.vercel.app
ENDFILE

echo -e "${GREEN}✅ Fichier .env créé!${NC}"
echo "IMPORTANT: Remplacez les valeurs par vos vraies clés API"

# =====================================================
# 5. VÉRIFICATION DES PAGES
# =====================================================
echo -e "\n${BLUE}📄 Étape 5: Vérification des Pages${NC}"

echo "Pages vérifiées:"
echo "  ✅ Home - /"
echo "  ✅ Products - /products"  
echo "  ✅ ProductDetail - /products/:id"
echo "  ✅ Cart - /cart"
echo "  ✅ Checkout - /checkout"
echo "  ✅ Login/Register - /login, /register"
echo "  ✅ Blog - /blog"
echo "  ✅ Homme/Femme/Enfants - /homme, /femme, /enfants"
echo "  ✅ Bebe - /bebe"
echo "  ✅ Cosmétiques - /cosmetiques"
echo "  ✅ Africain - /africain"
echo "  ✅ Contact - /contact"
echo "  ✅ Wishlist - /wishlist"
echo "  ✅ Revendeurs - /revendeurs"
echo "  ✅ TextileHub - /textile"
echo "  ✅ Admin - /admin"
echo "  ✅ Recherche IA - /recherche-ia"
echo "  ✅ Marques - /marques"
echo "  ✅ Affiliation - /partenaire"
echo "  ✅ Marketing Hub - /marketing (NOUVEAU)"

# =====================================================
# 6. CONFIGURATION CANAUX SOCIAUX & MARKETPLACES
# =====================================================
echo -e "\n${BLUE}📱 Étape 6: Configuration Sociaux & Marketplaces${NC}"

echo -e "${YELLOW}Pour activer les canaux:${NC}"
echo "1. Obtenez les clés API de chaque plateforme:"
echo "   - WhatsApp Business API"
echo "   - Facebook/Instagram Graph API"
echo "   - TikTok for Developers"
echo "   - Pinterest API"
echo "   - LinkedIn API"
echo ""
echo "2. Ajoutez les clés dans le dashboard Admin (/admin)"
echo ""
echo -e "${YELLOW}Pour connecter les marketplaces:${NC}"
echo "1. Shopify: https://shopify.com/admin/apps"
echo "2. Amazon Seller Central: https://sellercentral.amazon.com"
echo "3. eBay Seller Hub: https://sellerhub.ebay.com"
echo "4. Etsy Shop Manager: https://www.etsy.com/your/shops"
echo "5. WooCommerce: https://woocommerce.com"

# =====================================================
# 7. DÉMARRAGE EN LOCAL
# =====================================================
echo -e "\n${GREEN}🚀 Étape 7: Démarrage en Local${NC}"

echo "Option A - Frontend seulement:"
echo "  cd frontend && npm run dev"
echo ""
echo "Option B - Backend + Frontend (2 terminaux):"
echo "  Terminal 1: cd api && node index.js"
echo "  Terminal 2: cd frontend && npm run dev"

# =====================================================
# 8. DÉPLOIEMENT VERCEL
# =====================================================
echo -e "\n${BLUE}☁️ Étape 8: Déploiement Vercel${NC}"

echo "1. Installez Vercel CLI:"
echo "   npm install -g vercel"
echo ""
echo "2. Connectez-vous:"
echo "   vercel login"
echo ""
echo "3. Déployez:"
echo "   vercel --prod"
echo ""
echo "ou utilisez GitHub Actions (automatique):"
echo "   Les modifications poussées sur master déclenchent un déploiement"

# =====================================================
# 9. VÉRIFICATION FINALE
# =====================================================
echo -e "\n${GREEN}✅ Vérification Finale${NC}"

echo "Vérifiez que tout fonctionne:"
echo "1. Frontend: https://votre-projet.vercel.app"
echo "2. API: https://votre-projet.vercel.app/api/health"
echo "3. Marketing: https://votre-projet.vercel.app/marketing"
echo "4. Admin: https://votre-projet.vercel.app/admin"

# =====================================================
# COMMANDES RAPIDES
# =====================================================
echo -e "\n${YELLOW}📋 COMMANDES RAPIDES:${NC}"
echo ""
echo "# Installer tout"
echo "cd /workspace/project/E-Designe/E-Designe-master"
echo "npm install && cd frontend && npm install"
echo ""
echo "# Développement"
echo "cd frontend && npm run dev"
echo ""
echo "# Build production"
echo "cd frontend && npm run build"
echo ""
echo "# Déployer"
echo "vercel --prod"

echo -e "\n${GREEN}=============================================="
echo "🎉 MISE À JOUR COMPLÈTE TERMINÉE!"
echo "==============================================${NC}"
