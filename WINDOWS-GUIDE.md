# E-DÉSIGNE - GUIDE D'INSTALLATION WINDOWS

## Méthode 1: Cloner depuis GitHub (Recommandée)

```powershell
# Ouvrir PowerShell et exécuter:

# 1. Cloner le projet
git clone https://github.com/IlarionDossouyovo/E-Designe.git
cd E-Designe

# 2. Installer les dépendances
cd frontend
npm install
cd ..
# Server n'a pas besoin de npm install (dépendances déjà dans node_modules)

# 3. Vérifier Ollama
# - Télécharger Ollama: https://ollama.ai
# - Dans un terminal: ollama serve
# - Tester: curl http://localhost:11434/api/tags

# 4. Démarrer le projet
.\start.ps1
# ou double-clicker sur start.bat
```

---

## Méthode 2: Via le dossier existant

Le projet est stocké dans ce conteneur. Pour le récupérer:

### Option A: VS Code Remote
Si tu utilises VS Code avec l'extension "Remote - Containers" ou "SSH", tu peux ouvrir directement ce dossier.

### Option B: Télécharger le ZIP
1. Aller sur: https://github.com/IlarionDossouyovo/E-Designe
2. Bouton vert "Code" → "Download ZIP"
3. Décompresser et suivre les étapes ci-dessus

---

## Prérequis Windows

| Logiciel | URL | Notes |
|---------|-----|-------|
| Node.js 18+ | nodejs.org | LTS recommended |
| Ollama | ollama.ai | Pour l'IA locale |
| Git | git-scm.com | Optionnel |

---

## Dépannage

```powershell
# Si start.ps1 ne fonctionne pas
cd E-Designe
cd server
node index.js

# Dans un autre terminal:
cd frontend
npm run dev
```

---

## Fonctionnalités activées avec Ollama

- 🤖 Chatbot 24/7 (répond en français)
- 🔍 Recherche IA des produits
- 💡 Recommandations personnalisées
- 📊 Analytics avec prédictions

Sans Ollama: le chatbot utilise des réponses prédéfinies.