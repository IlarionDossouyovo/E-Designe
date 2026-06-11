@echo off
REM E-Graphisme - Verify and Connect Services

echo.
echo ========================================
echo E-Graphisme - Verification Services
echo ========================================
echo.

REM === SERVEUR WEB ===
echo [1] Serveur Web...
curl -s http://127.0.0.1:8000 >nul 2>&1
if %errorlevel% equ 0 (
    echo   Web: OK - http://127.0.0.1:8000
) else (
    echo   Web: ARRETE
    echo   Lancez: py -m http.server 8000
)
echo.

REM === N8N ===
echo [2] N8n Automation...
curl -s http://localhost:5678 >nul 2>&1
if %errorlevel% equ 0 (
    echo   N8n: OK - http://localhost:5678
) else (
    echo   N8n: ARRETE
)
echo.

REM === OLLAMA ===
echo [3] Ollama IA...
curl -s http://localhost:11434 >nul 2>&1
if %errorlevel% equ 0 (
    echo   Ollama: OK - http://localhost:11434
    curl -s http://localhost:11434/api/tags >nul 2>&1
    if %errorlevel% equ 0 (
        echo   Models: AVAILABLE
    )
) else (
    echo   Ollama: ARRETE
)
echo.

REM === OPEN WEBUI ===
echo [4] Open WebUI...
curl -s http://localhost:3001 >nul 2>&1
if %errorlevel% equ 0 (
    echo   Open WebUI: OK - http://localhost:3001
) else (
    echo   Open WebUI: ARRETE
)
echo.

REM === DOCKER ===
echo [5] Docker...
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    docker version --format "   Docker: {{.Server.Version}}"
    docker ps --format "   Containers: {{.Status}}" 2>nul
) else (
    echo   Docker: ARRETE
)
echo.

echo ========================================
echo RESULTAT:
echo ========================================
echo.
echo   Web:       http://127.0.0.1:8000/dashboard.html
echo   Web:       http://127.0.0.1:8000/test-dashboard.html
echo   N8n:       http://localhost:5678
echo   Ollama:     http://localhost:11434
echo   OpenUI:    http://localhost:3001
echo.
echo ========================================

pause