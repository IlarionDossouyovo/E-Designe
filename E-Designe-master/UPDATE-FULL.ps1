# =====================================================
# 🎯 E-DÉSIGNE - MISE À JOUR COMPLÈTE (Windows)
# =====================================================

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "🎯 MISE À JOUR COMPLÈTE E-DÉSIGNE" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# =====================================================
# ÉTAPE 1: METTRE À JOUR DEPUIS GITHUB
# =====================================================

Write-Host "`n📥 ÉTAPE 1: Mise à jour depuis GitHub" -ForegroundColor Yellow

Write-Host @"

Commandes PowerShell (ENTREZ CHAQUE LIGNE SÉPARÉMENT):
-------------------
cd C:\workspace\E-Designe\E-Designe-master
git pull origin master

"@ -ForegroundColor White

# =====================================================
# ÉTAPE 2: INSTALLER LES DÉPENDANCES
# =====================================================

Write-Host "`n📦 ÉTAPE 2: Installation des dépendances" -ForegroundColor Yellow

Write-Host @"

⚠️ IMPORTANT: Entrez ces commandes UNE PAR UNE (pas avec &&):

Commandes PowerShell:
-------------------
npm install

cd frontend
npm install
cd ..

"@ -ForegroundColor White

# =====================================================
# ÉTAPE 3: ARRÊTER LES CONTENEURS
# =====================================================

Write-Host "`n🛑 ÉTAPE 3: Arrêter les conteneurs Docker" -ForegroundColor Yellow

Write-Host @"

⚠️ Docker Desktop doit être installé et lancé!

Commandes PowerShell:
-------------------
docker compose down

"@ -ForegroundColor White

# =====================================================
# ÉTAPE 4: RECRÉER LES CONTENEURS
# =====================================================

Write-Host "`n🐳 ÉTAPE 4: Recréer les conteneurs" -ForegroundColor Yellow

Write-Host @"

Commandes PowerShell:
-------------------
docker compose up -d

"@ -ForegroundColor White

# =====================================================
# ÉTAPE 5: VÉRIFIER LES SERVICES
# =====================================================

Write-Host "`n✅ ÉTAPE 5: Vérification" -ForegroundColor Yellow

Write-Host @"

Commandes PowerShell:
-------------------
# Voir les conteneurs
docker ps

# Tester l'API
Invoke-WebRequest -Uri "http://localhost:3000/api/health"

# Voir les produits
Invoke-WebRequest -Uri "http://localhost:3000/api/products"

"@ -ForegroundColor White

# =====================================================
# ÉTAPE 6: LANCER LE FRONTEND
# =====================================================

Write-Host "`n🚀 ÉTAPE 6: Lancer le Frontend" -ForegroundColor Yellow

Write-Host @"

Commandes PowerShell:
-------------------
cd frontend
npm run dev

"@ -ForegroundColor White

# =====================================================
# VERSION COMPLÈTE AUTOMATIQUE
# =====================================================

Write-Host "`n⚡ VERSION COMPLÈTE AUTOMATIQUE" -ForegroundColor Green

Write-Host @"

Copiez-collez cette commande complète dans PowerShell:
---------------------------------------------

# 1. Aller dans le dossier
cd C:\workspace\E-Designe\E-Designe-master

# 2. Mettre à jour depuis GitHub
git pull origin master

# 3. Installer les dépendances racine
npm install

# 4. Installer les dépendances frontend
cd frontend
npm install
cd ..

# 5. Relancer Docker (si installé)
docker compose down
docker compose up -d

# 6. Attendre que les services démarrent
Start-Sleep -Seconds 10

# 7. Tester l'API
Invoke-WebRequest -Uri "http://localhost:3000/api/health"

# 8. Lancer le frontend
cd frontend
npm run dev

"@ -ForegroundColor White

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "✅ MISE À JOUR TERMINÉE!" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan
