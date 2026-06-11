# E-Graphisme - N8n Workflow Import Script
# Run in PowerShell as: powershell -ExecutionPolicy Bypass -File import-n8n.ps1

$N8N_URL = "http://localhost:5678"
$WORKFLOW_FILE = "http://127.0.0.1:8000/n8n-workflow-e-graphisme.json"

Write-Host "E-Graphisme - N8n Workflow Import" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check if N8n is running
try {
    $response = Invoke-RestMethod -Uri "$N8N_URL" -Method Get -TimeoutSec 5
    Write-Host "[OK] N8n is running" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] N8n is not accessible" -ForegroundColor Red
    Write-Host "Please ensure N8n is running at http://localhost:5678" -ForegroundColor Yellow
    exit 1
}

# Download workflow file
Write-Host "[...] Downloading workflow..." -ForegroundColor Yellow
try {
    $workflow = Invoke-RestMethod -Uri $WORKFLOW_FILE -Method Get
    Write-Host "[OK] Workflow downloaded" -ForegroundColor Green
    Write-Host "    Name: $($workflow.name)" -ForegroundColor Cyan
} catch {
    Write-Host "[ERROR] Cannot download workflow" -ForegroundColor Red
    Write-Host "Make sure the web server is running" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Go to http://localhost:5678" -ForegroundColor White
Write-Host "2. Login with your credentials" -ForegroundColor White
Write-Host "3. Click 'Workflows' in the sidebar" -ForegroundColor White
Write-Host "4. Click 'Import from URL'" -ForegroundColor White
Write-Host "5. Enter: $WORKFLOW_FILE" -ForegroundColor White
Write-Host ""
Write-Host "OR use 'Import from File' and select:" -ForegroundColor White
Write-Host "   n8n-workflow-e-graphisme.json" -ForegroundColor White
Write-Host ""