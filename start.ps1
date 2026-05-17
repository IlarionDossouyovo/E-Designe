# E-Désigne - Démarrage Local (PowerShell)
# Copier ce fichier dans le dossier du projet

Write-Host "🎀 E-DÉSIGNE - Démarrage Local" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host ""

# Vérifier Node.js
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "⚠ Node.js non trouvé. Installez depuis nodejs.org" -ForegroundColor Red
    exit 1
}

# Vérifier Ollama
$ollamaCheck = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
if ($ollamaCheck) {
    Write-Host "✓ Ollama est en cours d'exécution" -ForegroundColor Green
    Write-Host "  Modèles disponibles:" -ForegroundColor Cyan
    $models = (Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing | ConvertFrom-Json).models
    $models | ForEach-Object { Write-Host "    - $($_.name)" -ForegroundColor Gray }
} else {
    Write-Host "⚠ Ollama non détecté sur port 11434" -ForegroundColor Yellow
    Write-Host "  Pour démarrer: 'ollama serve' dans un terminal" -ForegroundColor Yellow
    Write-Host "  Télécharger: https://ollama.ai" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Démarrage du serveur API..." -ForegroundColor Cyan

# Start API server
$apiPath = Join-Path $PSScriptRoot "server\index.js"
$apiProcess = Start-Process -FilePath "node" -ArgumentList $apiPath -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 2

if ($apiProcess.HasExited) {
    Write-Host "✗ Échec du démarrage du serveur API" -ForegroundColor Red
    exit 1
}

Write-Host "✓ API server sur http://localhost:3000" -ForegroundColor Green

# Start Frontend
Write-Host ""
Write-Host "🎨 Démarrage du Frontend..." -ForegroundColor Cyan

$frontendPath = Join-Path $PSScriptRoot "frontend"
$frontendProcess = Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory $frontendPath -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 3

Write-Host "✓ Frontend sur http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "============================" -ForegroundColor Green
Write-Host "🎀 E-DÉSIGNE EST PRÊT!" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host ""
Write-Host "📱 URLs:" -ForegroundColor Cyan
Write-Host "  API:     http://localhost:3000"
Write-Host "  Front:  http://localhost:5173"
Write-Host "  Health: http://localhost:3000/api/health"
Write-Host ""

# Test chatbot
Write-Host "🤖 Test du chatbot Ollama..." -ForegroundColor Cyan
$testResp = Invoke-WebRequest -Uri "http://localhost:3000/api/ai/chatbot" -Method Post -Body (@{message="Bonjour"} | ConvertTo-Json) -ContentType "application/json" -UseBasicParsing -TimeoutSec 10 -ErrorAction SilentlyContinue

if ($testResp) {
    $respObj = $testResp.Content | ConvertFrom-Json
    Write-Host "  Réponse: $($respObj.response.Substring(0, [Math]::Min(100, $respObj.response.Length)))" -ForegroundColor Gray
    Write-Host "  Source: $($respObj.source)" -ForegroundColor Green
} else {
    Write-Host "  fallback (Ollama non disponible)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arrêter les serveurs" -ForegroundColor Yellow

# Wait for user interrupt
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host ""
    Write-Host "🛑 Arrêt des serveurs..." -ForegroundColor Yellow
    Stop-Process $apiProcess.Id -Force -ErrorAction SilentlyContinue
    Stop-Process $frontendProcess.Id -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Terminé" -ForegroundColor Green
}