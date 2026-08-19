# Graphisme Backup Script
# Sauvegarde complète du projet

param(
    [string]$BackupPath = "$env:USERPROFILE\OneDrive\Backups\Graphisme",
    [switch]$CleanOld = $false
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GRAPHISME BACKUP SYSTEM" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Créer le dossier de sauvegarde
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupDir = Join-Path $BackupPath $timestamp

if (!(Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
}

Write-Host "[1/5] Création du dossier de sauvegarde..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

# Dossiers et fichiers à sauvegarder
$itemsToBackup = @(
    "src",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.js",
    "tsconfig.json",
    "tailwind.config.js",
    ".env.example",
    "README.md",
    "CONFIGURATION.md"
)

Write-Host "[2/5] Copie des fichiers du projet..." -ForegroundColor Yellow
foreach ($item in $itemsToBackup) {
    if (Test-Path $item) {
        $dest = Join-Path $backupDir $item
        if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
        Copy-Item -Path $item -Destination $dest -Recurse -Force
        Write-Host "  ✓ $item" -ForegroundColor Green
    }
}

Write-Host "[3/5] Création de l'archive ZIP..." -ForegroundColor Yellow
$zipPath = "$BackupPath\Graphisme_$timestamp.zip"
Compress-Archive -Path "$backupDir\*" -DestinationPath $zipPath -Force

Write-Host "  ✓ Archive créée: $zipPath" -ForegroundColor Green

Write-Host "[4/5] Nettoyage des anciennes sauvegardes..." -ForegroundColor Yellow
if ($CleanOld) {
    $oldBackups = Get-ChildItem -Path $BackupPath -Filter "Graphisme_*.zip" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) }
    foreach ($old in $oldBackups) {
        Remove-Item $old.FullName -Force
        Write-Host "  ✓ Supprimé: $($old.Name)" -ForegroundColor Gray
    }
}

Write-Host "[5/5] Résumé de la sauvegarde..." -ForegroundColor Yellow
$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SAUVEGARDE TERMINÉE AVEC SUCCÈS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Archive: $zipPath" -ForegroundColor White
Write-Host "Taille: $([math]::Round($zipSize, 2)) MB" -ForegroundColor White
Write-Host "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
Write-Host ""

# Sauvegarde dans OneDrive si disponible
$oneDrivePath = "$env:USERPROFILE\OneDrive\Documents\Graphisme_Backups"
if (Test-Path $oneDrivePath) {
    Write-Host "Copie vers OneDrive..." -ForegroundColor Yellow
    Copy-Item $zipPath -Destination $oneDrivePath -Force
    Write-Host "  ✓ Copié vers OneDrive" -ForegroundColor Green
}

Write-Host ""
Write-Host "Opération terminée!" -ForegroundColor Green
