# Guide de Mise à Jour - Graphisme by ELECTRON

Ce guide explique comment garder votre projet à jour lorsqu'il est synchronisé avec OneDrive.

---

## 🚀 Commandes de Mise à Jour Rapides

### 1. Mettre à jour le code depuis GitHub

```powershell
# Ouvrir PowerShell dans le dossier OneDrive
cd C:\Users\VOTRE_NOM\OneDrive\Graphisme

# Sauvegarder vos modifications locales (si nécessaire)
git add .
git commit -m "Sauvegarde avant mise à jour"

# Récupérer les dernières modifications
git pull origin main

# Si conflit, resolver puis:
git add .
git commit -m "Résolution conflits"
```

### 2. Mettre à jour les dépendances

```powershell
# Mettre à jour npm
npm install

# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour vers les dernières versions majeures
npm install next@latest react@latest react-dom@latest
```

### 3. Rebuild et démarrage

```powershell
# Nettoyer le cache
rmdir /s /q .next

# Reconstruire le projet
npm run build

# Lancer le serveur
npm run dev
```

---

## 🔄 Script Automatisé (PowerShell)

Créez un fichier `update.ps1` dans le dossier du projet:

```powershell
# update.ps1 - À placer dans le dossier du projet

Write-Host "🔄 Mise à jour de Graphisme by ELECTRON" -ForegroundColor Cyan

# 1. Sauvegarder les fichiers de données
Write-Host "📦 Sauvegarde des données..." -ForegroundColor Yellow
Copy-Item -Path "src\lib\db\data" -Destination "src\lib\db\data_backup" -Recurse -Force

# 2. Mettre à jour depuis Git
Write-Host "📥 Mise à jour depuis GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Sauvegarde automatique"
git pull origin main

# 3. Mettre à jour les dépendances
Write-Host "📚 Mise à jour des dépendances..." -ForegroundColor Yellow
npm install

# 4. Reconstruire
Write-Host "🏗️ Reconstruction du projet..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }
npm run build

Write-Host "✅ Mise à jour terminée!" -ForegroundColor Green
Write-Host "Lancez 'npm run dev' pour démarrer" -ForegroundColor Cyan
```

Pour exécuter:
```powershell
.\update.ps1
```

---

## 📋 Checklist de Mise à Jour

### Avant chaque mise à jour:
- [ ] Vérifier que OneDrive a synchronisé tous les fichiers
- [ ] Vérifier la connexion internet
- [ ] Sauvegarder les fichiers importants

### Après chaque mise à jour:
- [ ] `npm install` (si package.json a changé)
- [ ] `npm run build` (vérifier qu'il n'y a pas d'erreurs)
- [ ] Tester l'application avec `npm run dev`

---

## 🛠️ Commandes Utiles

### Nettoyer le projet
```powershell
# Supprimer node_modules et réinstaller
rmdir /s /q node_modules
rmdir /s /q .next
npm install
npm run build
```

### Vérifier les erreurs
```powershell
npm run lint
```

### Mettre à jour spécifiques packages
```powershell
# Next.js
npm install next@latest

# React
npm install react@latest react-dom@latest

# Tailwind
npm install tailwindcss@latest postcss@latest autoprefixer@latest

# Tous les packages
npm update
```

---

## ⚠️ Résolution des Problèmes

### Conflits de fusion (Merge Conflicts)
```powershell
# Voir les fichiers en conflit
git status

# Après avoir résolu les conflits
git add .
git commit -m "Résolution conflits de fusion"
```

### OneDrive ne synchronise pas
1. Vérifier l'icône OneDrive dans la barre des tâches
2. Cliquez sur l'icône et vérifiez "Synchronisé"
3. Forcer la synchronisation si nécessaire

### Erreurs de build
```powershell
# Nettoyer complètement
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json

# Réinstaller depuis zéro
npm install
npm run dev
```

---

## 📝 Notes pour OneDrive

1. **Attendez la synchronisation**: Après chaque modification, attendez que OneDrive affiche "Synchronisé" avant de fermer le dossier

2. **Fichiers à ne pas synchroniser** (ajouter à .gitignore):
   - `.next/`
   - `node_modules/`
   - `*.log`
   - `.env.local`

3. **Sauvegarde recommandée**: Régulièrement, copiez le dossier `src/lib/db/data` ailleurs car il contient vos données

---

## 🔧 Commandes Complètes pour une Mise à Jour

```powershell
# 1. Ouvrir le dossier
cd C:\Users\VOTRE_NOM\OneDrive\Graphisme

# 2. Vérifier l'état de Git
git status

# 3. Sauvegarder
git add .
git commit -m "Sauvegarde"

# 4. Mettre à jour
git pull origin main

# 5. Installer les dépendances
npm install

# 6. Reconstruire
npm run build

# 7. Lancer
npm run dev
```

---

Dernière mise à jour: 2026-08-04
