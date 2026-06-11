# E-Graphisme Server Startup
Write-Host "Starting E-Graphisme Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser to:" -ForegroundColor Cyan
Write-Host "  http://localhost:8000/index.html"
Write-Host "  http://localhost:8000/portfolio.html"
Write-Host "  http://localhost:8000/services.html"
Write-Host "  http://localhost:8000/studio.html"
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

php -S localhost:8000 -t $PSScriptRoot