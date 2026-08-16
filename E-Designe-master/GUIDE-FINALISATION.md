# 🔧 GUIDE DE FINALISATION - ÉTAPES MANUELLES

## ✅ CE QUI A ÉTÉ FAIT AUTOMATIQUEMENT

1. **Design Tokens intégrés** - Les fichiers `design-tokens.css` et `logo.css` sont maintenant importés
2. **Google Fonts ajoutés** - Playfair Display et Inter configurés
3. **SEO optimisé** - Meta tags, sitemap.xml et robots.txt créés
4. **Fichiers de configuration créés** - `.env.example` et `firebase-config.json`

---

## 🔴 ÉTAPES À FAIRE MANUELLEMENT

### 1. DÉSACTIVER LA PROTECTION MOT DE PASSE VERCEL

**URL:** https://vercel.com/electrons-projects-7ac943c4/project/settings/general

**Marche à suivre:**
1. Se connecter à Vercel
2. Aller dans Settings > General
3. Chercher "Password Protection"
4. Désactiver ou supprimer
5. Cliquer "Save Changes"

---

### 2. CONFIGURER STRIPE

**URL:** https://dashboard.stripe.com

**Marche à suivre:**
1. Créer un compte Stripe (gratuit)
2. Aller dans Developers > API keys
3. Copier les clés:
   - **Publishable key** (commence par `pk_`) → `STRIPE_PUBLIC_KEY`
   - **Secret key** (commence par `sk_`) → `STRIPE_SECRET_KEY`
4. Aller dans Webhooks > Add endpoint
5. URL: `https://project-6ny5f9mw8-electrons-projects-7ac943c4.vercel.app/api/payment/stripe/webhook`
6. Sélectionner événements: `checkout.session.completed`, `payment_intent.succeeded`
7. Copier le webhook secret → `STRIPE_WEBHOOK_SECRET`

**Dans Vercel:**
1. Aller dans Settings > Environment Variables
2. Ajouter:
   - `STRIPE_SECRET_KEY` = votre clé secrète
   - `STRIPE_PUBLIC_KEY` = votre clé publique
   - `STRIPE_WEBHOOK_SECRET` = votre secret webhook
3. Redéployer le projet

---

### 3. CONFIGURER PAYPAL

**URL:** https://developer.paypal.com

**Marche à suivre:**
1. Se connecter avec un compte PayPal
2. Aller dans Dashboard > My Apps & Credentials
3. Créer une app (Sandbox ou Live)
4. Copier:
   - **Client ID** → `PAYPAL_CLIENT_ID`
   - **Secret** → `PAYPAL_CLIENT_SECRET`

**Dans Vercel:**
1. Ajouter les variables:
   - `PAYPAL_CLIENT_ID` = votre client ID
   - `PAYPAL_CLIENT_SECRET` = votre secret
   - `PAYPAL_MODE` = `sandbox` (ou `live`)

---

### 4. CONFIGURER FIREBASE

**URL:** https://console.firebase.google.com

**Marche à suivre:**
1. Créer un projet Firebase
2. Dans "Build" > "Authentication" > "Get Started"
3. Activer "Email/Password" et "Google"
4. Aller dans Settings (⚙️) > General > Your apps
5. Cliquer sur l'icône Web (</>)
6. Copier la config Firebase:
   - `apiKey` → `VITE_FIREBASE_API_KEY`
   - `projectId` → `VITE_FIREBASE_PROJECT_ID`
   - `authDomain` → `VITE_FIREBASE_AUTH_DOMAIN`
   - `storageBucket` → `VITE_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `VITE_FIREBASE_APP_ID`

**Dans Vercel:**
1. Ajouter toutes les variables `VITE_FIREBASE_*`
2. Redéployer

---

### 5. COMMANDES DE DÉPLOIEMENT

```bash
# Installer les dépendances
cd /workspace/project/E-Designe/E-Designe-master
npm install

# Tester en local
cd frontend
npm run dev

# Build de production
npm run build

# Déployer vers Vercel
vercel --prod
```

---

## 📋 CHECKLIST FINALE

- [ ] Protection mot de passe Vercel désactivée
- [ ] Stripe configuré (clé API ajoutée)
- [ ] PayPal configuré (clé API ajoutée)
- [ ] Firebase configuré (authentification activée)
- [ ] Test de paiement en mode bac à sable
- [ ] Site accessible publiquement

---

*Document généré le 16 août 2026*
