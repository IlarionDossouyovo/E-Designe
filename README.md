# E-Designe By ELECTRON 🛍️

Plateforme e-commerce internationale avec Intelligence Artificielle intégrée.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-yellow)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![License](https://img.shields.io/badge/License-MIT-purple)

## ✨ Fonctionnalités

- 🛒 **E-commerce complet** - Panier, checkout, paiement (Stripe + PayPal)
- 🤖 **Intelligence Artificielle** - Recherche intelligente, recommandations, chatbot
- 📱 **Responsive Design** - Adapté mobile, tablette et desktop
- ✨ **Animations premium** - Transitions fluides avec Framer Motion
- 👥 **Authentification** - Inscription/connexion utilisateur
- 📦 **Catalogue produits** - Filtres, catégories, recherche IA
- 📝 **Blog intégré** - Articles mode, beauté, conseils
- 👨‍👩‍👧‍👦 **Fournisseurs** - Pages dédiées Homme, Femme, Enfants, Cosmétiques

## 🚀 Installation

```bash
# Cloner le projet
git clone https://github.com/IlarionDossouyovo/E-Designe.git
cd E-Designe

# Installer les dépendances frontend
cd frontend
npm install

# Installer les dépendances backend
cd ../backend
npm install
```

## ▶️ Lancement

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

## 🌐 Déploiement Vercel

1. Aller sur [Vercel.com](https://vercel.com)
2. Importer le repository GitHub
3. Vercel détecte automatiquement Vite
4. Variable d'environnement: `VITE_API_URL`

## 📁 Structure

```
E-Designe/
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── components/ # Header, Footer, ChatWidget, ProductCard
│   │   ├── pages/      # Home, Products, Cart, Checkout, Blog, etc.
│   │   ├── services/   # API service
│   │   └── index.css   # Styles globaux
│   ├── vercel.json     # Config Vercel
│   └── package.json
├── backend/            # Express API
│   ├── src/server.js   # API principale
│   └── package.json
└── README.md
```

## 🔧 Technologies

- **Frontend:** React 18, Vite, Framer Motion, React Router
- **Backend:** Node.js, Express
- **Paiements:** Stripe, PayPal
- **IA:** OpenAI (extensible)
- **Hébergement:** Vercel, Firebase (optionnel)

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

Créé avec ❤️ par E-Designe By ELECTRON