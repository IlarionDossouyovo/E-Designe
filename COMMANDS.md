# 📚 Guide des Commandes - E-Graphisme

Ce guide contient toutes les commandes nécessaires pour installer, mettre à jour et déployer le projet E-Graphisme.

---

## 🖥️ Installation Locale

### 1. Cloner le projet depuis GitHub

```bash
# Cloner le dépôt
git clone https://github.com/IlarionDossouyovo/E-Graphisme.git

# Entrer dans le dossier
cd E-Graphisme
```

### 2. Installer les dépendances (optionnel)

```bash
# Avec npm (si vous voulez utiliser serve)
npm install

# Ou avec Python (déjà installé sur la plupart des machines)
# Pas d'installation nécessaire!
```

---

## 🔄 Mettre à jour depuis GitHub

### Option 1: Pull les dernières modifications

```bash
# Aller dans le dossier du projet
cd E-Graphisme

# Récupérer les dernières modifications
git pull origin main
```

### Option 2: Si vous avez des modifications locales

```bash
cd E-Graphisme

# Sauvegarder vos modifications locales
git stash

# Pull les mises à jour
git pull origin main

# Récupérer vos modifications
git stash pop
```

### Option 3: Forcer un clean reset

```bash
cd E-Graphisme

# ATTENTION: Cela efface toutes vos modifications locales!
git fetch origin
git reset --hard origin/main
```

---

## 🚀 Lancer le projet en local

### Option 1: Python (Recommandé - déjà installé)

```bash
cd E-Graphisme
python3 -m http.server 8000
```

Puis ouvrez: **http://localhost:8000**

### Option 2: Python sur un autre port

```bash
cd E-Graphisme
python3 -m http.server 3000
```

Puis ouvrez: **http://localhost:3000**

### Option 3: Avec Node.js

```bash
cd E-Graphisme
npx serve .
```

### Option 4: Avec PHP

```bash
cd E-Graphisme
php -S localhost:8000
```

---

## 📤 Déployer sur GitHub

### 1. Vérifier le statut

```bash
cd E-Graphisme
git status
```

### 2. Ajouter les modifications

```bash
git add .
```

### 3. Créer un commit

```bash
git commit -m "Description de vos modifications"
```

### 4. Pousser vers GitHub

```bash
git push origin main
```

### 5. Créer une Pull Request (PR)

```bash
# Via GitHub CLI
gh pr create --title "Titre" --body "Description"

# Ou via le navigateur
# https://github.com/IlarionDossouyovo/E-Graphisme/compare
```

---

## 🔧 Commandes Utiles

### Voir les branches

```bash
git branch
```

### Créer une nouvelle branche

```bash
git checkout -b nom-branche
```

### Basculer de branche

```bash
git checkout main
```

### Fusionner les changements

```bash
git merge nom-branche
```

### Voir l'historique

```bash
git log --oneline
```

### Annuler les modifications

```bash
# Avant commit
git checkout -- .

# Après commit
git revert HEAD
```

---

## 📋 Résumé des Commandes

| Action | Commande |
|--------|---------|
| **Cloner** | `git clone https://github.com/IlarionDossouyovo/E-Graphisme.git` |
| **Mettre à jour** | `git pull origin mai` |
| **Lancer (PHP)** | `php -S 127.0.0.1:8000 -t .` |
| **Lancer N8N** | `n8n start` |
| **Auto-start** | `./AUTO-START-SYSTEM.sh` |
| **Commit** | `git add . && git commit -m "msg" && git push origin mai` |
| **Statut** | `git status` |

---

## 🌐 Accès au site

| Service | URL |
|---------|-----|
| **Site Local** | http://127.0.0.1:8000 |
| **N8N Local** | http://127.0.0.1:5678 |
| **GitHub Pages** | https://ilariondossouyovo.github.io/E-Graphisme/ |

---

## 🔄 Mise à Jour Complete

```bash
# 1. Mettre à jour le code
cd E-Graphisme
git pull origin mai

# 2. Démarrer tous les services
./AUTO-START-SYSTEM.sh

# 3. Tester
curl http://127.0.0.1:8000
curl http://127.0.0.1:5678
```

---

## 🤖 Import Workflows N8N

Dans N8N (http://127.0.0.1:5678):
1. Login: admin@e-graphisme.com / egraphisme2026
2. Workflows → Import from URL

```
https://raw.githubusercontent.com/IlarionDossouyovo/E-Graphisme/mai/workflows/ai-chat.json
https://raw.githubusercontent.com/IlarionDossouyovo/E-Graphisme/mai/workflows/ai-agent.json
https://raw.githubusercontent.com/IlarionDossouyovo/E-Graphisme/mai/workflows/business.json
https://raw.githubusercontent.com/IlarionDossouyovo/E-Graphisme/mai/workflows/leads.json
https://raw.githubusercontent.com/IlarionDossouyovo/E-Graphisme/mai/workflows/enterprise.json
https://raw.githubusercontent.com/IlarionDossouyovo/E-Graphisme/mai/workflows/daily-report.json
https://raw.githubusercontent.com/IlarionDossouyovo/E-Graphisme/mai/workflows/ai-complete.json
```

---

**Questions?** Ouvrez une issue sur GitHub: https://github.com/IlarionDossouyovo/E-Graphisme/issues