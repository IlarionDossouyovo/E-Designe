# 🛍️ E-DÉSIGNE - Plateforme E-Commerce avec IA

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://e-designe.vercel.app)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18-green)](https://nodejs.org)

Plateforme e-commerce premium pour mode occidentale et africaine avec intelligence artificielle intégrée.

---

## 🚀 Fonctionnalités

### Commerce
- Catalogue 30+ produits
- Panier persistent
- Paiement Stripe + PayPal
- Suivi commande
- Wishlist utilisateur
- Avis et notes

### Pages (16)
- Home, Produits, Produit détail
- Africain (8 produits)
- Bébé (6 produits)  
- Revendeurs (affiliation)
- Blog, About, Contact
- Account, Login, Register
- Cart, Checkout
- Wishlist, OrderTracking
- Suppliers

### IA
- Chatbot 24/7
- Recherche intelligente
- Recommandations produits
- Analytics prédictions

---

## 🏗️ Architecture

```
E-Designe/
├── api/index.js         ← API Serverless Vercel
├── frontend/           ← React + Vite
│   ├── src/pages/      ← 16 pages
│   ├── components/    ← Composants
│   └── assets/        ← Logos
├── vercel.json        ← Config
└── README.md
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Site | `https://e-designe.vercel.app` |
| API | `https://e-designe.vercel.app/api/*` |

---

## 📡 API Endpoints

### Produits
- `GET /api/products` - Liste produits
- `GET /api/products/:id` - Produit détail
- `GET /api/products?category=X` - Filtre

### IA
- `POST /api/ai/chatbot` - Chat 24/7
- `POST /api/ai/search` - Recherche IA
- `GET /api/ai/recommendations` - Recommandés
- `GET /api/analytics/predictions` - KPIs

### Paiement
- `POST /api/payment/stripe/create-payment-intent`
- `POST /api/payment/paypal/create-order`

---

## 🛠️ Installation

```bash
git clone https://github.com/IlarionDossouyovo/E-Designe.git
cd E-Designe

# Frontend
cd frontend && npm install && npm run dev

# API (autre terminal)  
cd ../api && node index.js
```

---

## 📝 Licence

MIT - 2026 E-Désigne<!-- redeploy -->
Force refresh
