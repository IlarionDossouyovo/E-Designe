# ============================================
# E-DÉSIGNE - COMMANDES DE MISE À JOUR COMPLÈTES
# Pour Windows (PowerShell)
# ============================================

# ============================================
# SECTION 1: DÉMARRAGE LOCAL
# ============================================

# --- Option A: Démarrer en mode développement ---
# Ouvre le frontend sur http://localhost:5173

cd .\frontend\
npm run dev


# --- Option B: Démarrer avec le serveur API ---
# Ouvre le frontend + API (nécessite Node.js)

# Terminal 1 - API:
cd .\server\
node index.js

# Terminal 2 - Frontend:
cd .\frontend\
npm run dev


# ============================================
# SECTION 2: BUILD & DÉPLOIEMENT
# ============================================

# --- Build du frontend ---
cd .\frontend\
npm run build

# Le build crée un dossier `dist`


# ============================================
# SECTION 3: DÉPLOIEMENT VERCEL
# ============================================

# --- Installer Vercel CLI (une fois) ---
npm install -g vercel

# --- Déployer vers Vercel ---
vercel --prod

# --- Avec variables d'environnement ---
vercel --prod --env-file=.env


# ============================================
# SECTION 4: COMMANDES NPM UTILES
# ============================================

# --- Installer les dépendances ---
npm install

# --- Mettre à jour les dépendances ---
npm update

# --- Vérifier les dépendances obsolètes ---
npm outdated

# --- Nettoyer le cache ---
npm cache clean --force


# ============================================
# SECTION 5: VARIABLES D'ENVIRONNEMENT
# ============================================

# Créer un fichier .env dans le dossier frontend avec:

# Stripe (Paiements)
$env:STRIPE_SECRET_KEY = "sk_test_..."
$env:STRIPE_PUBLIC_KEY = "pk_test_..."

# PayPal
$env:PAYPAL_CLIENT_ID = "..."
$env:PAYPAL_CLIENT_SECRET = "..."

# Resend (Emails)
$env:RESEND_API_KEY = "re_Dj8diRCn_CJ1eDHXVtSKWdbYRw5TRz4ok"

# Firebase
$env:VITE_FIREBASE_API_KEY = "..."
$env:VITE_FIREBASE_PROJECT_ID = "..."


# ============================================
# SECTION 6: COMMANDES RAPIDES
# ============================================

# Tout-en-un: Installer + Build + Déployer
npm install
cd frontend
npm run build
vercel --prod


# ============================================
# SECTION 7: CONFIGURATION MANUELLE REQUISE
# ============================================

# Ces étapes doivent être faites MANUELLEMENT:

# 1. Vercel - Désactiver le mot de passe:
# https://vercel.com/electrons-projects-7ac943c4/project/settings/general

# 2. Stripe - Obtenir les clés API:
# https://dashboard.stripe.com

# 3. PayPal - Obtenir les clés API:
# https://developer.paypal.com

# 4. Firebase - Créer un projet:
# https://console.firebase.google.com


# ============================================
# COMMANDES SÉPARÉES (À COPIER-COLLER)
# ============================================

# 1. Installer les dépendances
npm install

# 2. Build du frontend
cd frontend
npm run build

# 3. Déployer vers Vercel
vercel --prod
