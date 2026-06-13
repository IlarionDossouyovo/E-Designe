# 🚀 Guide de Déploiement E-Graphisme

## 📦 Installation Locale

### Prérequis
- [Node.js](https://nodejs.org/) (v18+)
- [PHP](https://www.php.net/) (v8.0+)
- [Git](https://git-scm.com/)

### Étape 1: Cloner le projet

```bash
# Via terminal/commande invite
cd C:\Users\AUGUSTIN\Documents\Projets

git clone https://github.com/IlarionDossouyovo/E-Graphisme.git
cd E-Graphisme
```

### Étape 2: Mettre à jour depuis GitHub

```bash
# Si déjà cloné
cd C:\Users\AUGUSTIN\Documents\Projets\E-Graphisme

git pull origin mai
```

### Étape 3: Lancer le serveur local

#### Option A: Python (recommandé)
```bash
# Ouvrir terminal dans le dossier projet
python -m http.server 8080
```

#### Option B: PHP
```bash
# Ouvrir terminal dans le dossier projet
php -S localhost:8080
```

#### Option C: VS Code
- Installer extension "Live Server"
- Clic droit sur index.html > "Open with Live Server"

### Accéder au site local
```
http://localhost:8080
```

---

## 🌐 Déploiement en Ligne

### Option 1: Vercel (Gratuit - Recommandé)

1. Créer compte sur [vercel.com](https://vercel.com)
2. Installer Vercel CLI:
```bash
npm i -g vercel
```

3. Déployer:
```bash
vercel login
vercel --prod
```

### Option 2: Netlify (Gratuit)

1. Créer compte sur [netlify.com](https://netlify.com)
2. Glisser le dossier projet sur Netlify
3. Ou via CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=.
```

### Option 3: GitHub Pages

```bash
# Dans le dossier projet
git checkout -b gh-pages
git push origin gh-pages
```

Aller dans Settings > Pages sur GitHub

### Option 4: Hébergement Traditionnel

1. Acheter domaine sur [Namecheap](https://namecheap.com) ou [OVH](https://ovh.com)
2. Transférer fichiers par FTP (FileZilla)
3. Configurer DNS

---

## 🔧 Configuration

### Variables d'environnement

Créer fichier `.env`:
```env
# API Keys (optionnel)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3
N8N_WEBHOOK_URL=votre_webhook_n8n

# Base de données (optionnel - sinon JSON local)
DB_PATH=./db
```

### Configuration N8N

1. Installer N8N:
```bash
npm i -g n8n
n8n
```

2. Créer webhooks dans N8N:
- `/webhook/analyze-brand`
- `/webhook/generate-prompt`
- `/webhook/generate-image`

### Configuration Ollama

1. Installer Ollama:
```bash
# macOS/Linux
brew install ollama

# Windows (via WSL)
```

2. Démarrer:
```bash
ollama serve
ollama pull llama3
```

---

## 📱 Commandes Utiles

| Action | Commande |
|--------|---------|
| Mettre à jour | `git pull origin mai` |
| Server local | `php -S localhost:8080` |
| Status Git | `git status` |
| Voir commits | `git log --oneline` |

---

## 🆘 Dépannage

### Erreur PHP non installé
```bash
# Windows (via Chocolatey)
choco install php

# macOS
brew install php
```

### Erreur CORS
Ajouter en haut de `php/auth.php`:
```php
header('Access-Control-Allow-Origin: *');
```

### Mettre à jour le thème ELECTRON
Les couleurs sont dans `css/style.css`:
```css
:root {
    --primary: #00D4FF;      /* Bleu cyan */
    --secondary: #7B2FFF;    /* Violet */
    --accent: #FF006E;         /* Rose néon */
}
```

---

## 📞 Support

- Email: electronbusiness07@gmail.com
- WhatsApp: +229 01 977 003 47
- Site: https://e-graphisme.com

---

**Dernière mise à jour:** $(date)