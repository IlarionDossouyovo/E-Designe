# 🚀 E-Designe - Configuration Docker & AI

## Nouvelles Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    E-DESIGNE 360°                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + Vite)                                  │
│  https://votre-site.vercel.app                            │
├─────────────────────────────────────────────────────────────┤
│                    Docker Stack                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │PostgreSQL│  │   n8n   │  │  API   │  │ Redis  │    │
│  │   :5432 │  │  :5678  │  │ :3000  │  │ :6379 │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    Services AI                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐     ┌─────────────────┐           │
│  │   Groq API     │     │    Ollama       │           │
│  │ (Cloud AI)     │     │  (Local LLM)   │           │
│  └─────────────────┘     └─────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Démarrage Rapide

### 1. Prérequis

- Docker Desktop installé
- Git installé
- Compte Groq API (gratuit): https://console.groq.com

### 2. Cloner le projet

```bash
git clone https://github.com/IlarionDossouyovo/E-Designe.git
cd E-Designe
```

### 3. Configuration

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env et ajouter votre clé Groq
# GROQ_API_KEY=votre_cle_api
```

### 4. Lancer Docker

```bash
# Lancer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f
```

### 5. Accéder aux services

| Service | URL | Identifiants |
|---------|-----|--------------|
| **API** | http://localhost:3000 | - |
| **n8n** | http://localhost:5678 | admin / edesigne2024 |
| **PostgreSQL** | localhost:5432 | edesigne / edesigne_password_2024 |
| **Redis** | localhost:6379 | - |

---

## 🔧 Configuration des Services

### Groq API

1. Allez sur https://console.groq.com
2. Créez un compte gratuit
3. Générez une clé API
4. Ajoutez-la dans `.env`:
   ```
   GROQ_API_KEY=gsk_xxxxx
   ```

### Ollama (Optionnel - Local)

```bash
# Installer Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Télécharger un modèle
ollama pull llama3

# Le service sera sur http://localhost:11434
```

---

## 📦 Services Inclus

### PostgreSQL (Base de données)
- **Port:** 5432
- **Base:** edesigne_db
- **Utilisateur:** edesigne

### n8n (Automatisations)
- **Port:** 5678
- **Identifiants:** admin / edesigne2024
- **Workflows:** 9 workflows inclus dans `/n8n-workflows`

### API REST
- **Port:** 3000
- **Endpoints:** /api/produits, /api/commandes, /api/contact

### Redis (Cache)
- **Port:** 6379

---

## 🔌 Workflows n8n

Importer depuis `/n8n-workflows/`:

1. **chatbot-ia.json** - Chatbot AI
2. **emails.json** - Gestion emails
3. **orders.json** - Commandes
4. **support-ia.json** - Support AI
5. **inventory.json** - Stock
6. **analytics.json** - Analytiques
7. **recommendations.json** - Recommandations
8. **fraud detection.json** - Détection fraude
9. **social-media.json** - Réseaux sociaux

---

## 🌐 Déploiement Frontend

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd frontend
vercel deploy --prod
```

### Local

```bash
cd frontend
npm install
npm run build
serve dist
```

---

## 📞 Support

- Email: electronbusiness07@gmail.com
- WhatsApp: +229 01 977 003 47

---

## ✅ Checklist Final

- [ ] Docker installé et lancé
- [ ] Clé Groq API configurée
- [ ] PostgreSQL démarré
- [ ] n8n accessible
- [ ] Frontend déployé
- [ ] Workflows importés dans n8n
- [ ] Ollama configuré (optionnel)

---

*Dernière mise à jour: 2026-05-29*
*E-Designe by ELECTRON*