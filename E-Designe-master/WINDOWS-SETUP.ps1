# =====================================================
# 🎯 E-DÉSIGNE - GUIDE WINDOWS (PowerShell)
# =====================================================

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "🎯 E-DÉSIGNE - CONFIGURATION WINDOWS" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# =====================================================
# ÉTAPE 1: VÉRIFIER LA STRUCTURE
# =====================================================

Write-Host "`n📂 Étape 1: Vérification de la structure..." -ForegroundColor Yellow

if (Test-Path "C:\workspace\E-Designe\E-Designe-master") {
    Set-Location "C:\workspace\E-Designe\E-Designe-master"
    Write-Host "   ✅ Dossier trouvé: C:\workspace\E-Designe\E-Designe-master" -ForegroundColor Green
} elseif (Test-Path ".\E-Designe-master") {
    Set-Location ".\E-Designe-master"
    Write-Host "   ✅ Dossier trouvé: .\E-Designe-master" -ForegroundColor Green
} else {
    Write-Host "   ❌ Dossier non trouvé. Vérifiez l'emplacement." -ForegroundColor Red
    Write-Host "   Utilisez: cd C:\chemin\vers\E-Designe\E-Designe-master" -ForegroundColor White
    exit
}

# Lister les fichiers
Write-Host "`n   📁 Fichiers racine:"
Get-ChildItem | Select-Object -First 10 Name

# =====================================================
# ÉTAPE 2: INSTALLER LES DÉPENDANCES
# =====================================================

Write-Host "`n📦 Étape 2: Installation des dépendances..." -ForegroundColor Yellow

# Vérifier si package.json existe
if (Test-Path "package.json") {
    Write-Host "   → Installation dépendances racine..." -ForegroundColor White
    npm install
} else {
    Write-Host "   ⚠️ Pas de package.json à la racine" -ForegroundColor Yellow
}

# Installer frontend
if (Test-Path ".\frontend\package.json") {
    Set-Location ".\frontend"
    Write-Host "   → Installation dépendances frontend..." -ForegroundColor White
    npm install
    Set-Location ".."
} else {
    Write-Host "   ❌ frontend/package.json non trouvé" -ForegroundColor Red
}

# =====================================================
# ÉTAPE 3: DOCKER (Optionnel)
# =====================================================

Write-Host "`n🐳 Étape 3: Docker..." -ForegroundColor Yellow

# Vérifier si Docker est installé
$dockerVersion = docker --version 2>$null
if ($dockerVersion) {
    Write-Host "   ✅ Docker installé: $dockerVersion" -ForegroundColor Green
    
    Write-Host "   → Lancement des conteneurs..." -ForegroundColor White
    docker compose up -d
    
    Write-Host "`n   📊 Conteneurs actifs:" -ForegroundColor White
    docker ps
} else {
    Write-Host "   ⚠️ Docker non installé ou pas démarré" -ForegroundColor Yellow
    Write-Host "   Pour installer: https://www.docker.com/products/docker-desktop/" -ForegroundColor White
}

# =====================================================
# ÉTAPE 4: TESTER L'API
# =====================================================

Write-Host "`n✅ Étape 4: Test de l'API..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -UseBasicParsing -TimeoutSec 5
    Write-Host "   ✅ API responds: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️ API non accessible (normal si Docker pas lancé)" -ForegroundColor Yellow
}

# =====================================================
# ÉTAPE 5: DÉMARRER LE FRONTEND
# =====================================================

Write-Host "`n🚀 Étape 5: Pour démarrer le frontend..." -ForegroundColor Yellow
Write-Host @"

   Dans un NOUVEAU terminal PowerShell:

   cd C:\workspace\E-Designe\E-Designe-master\frontend
   npm run dev

   Puis ouvrez: http://localhost:5173

"@ -ForegroundColor White

# =====================================================
# RÉSUMÉ
# =====================================================

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "🎉 CONFIGURATION TERMINÉE!" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

Write-Host @"

📍 LIENS:
   🌐 Frontend:  http://localhost:5173
   🔌 API:       http://localhost:3000
   🗄️  PgAdmin:   http://localhost:5050
                   admin@e-designe.com / admin123

📝 COMMANDES QUICK:
   # Installer
   npm install
   cd frontend; npm install; cd ..

   # Lancer Docker
   docker compose up -d

   # Lancer frontend
   cd frontend
   npm run dev

"@ -ForegroundColor White
