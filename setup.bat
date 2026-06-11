@echo off
REM E-Graphisme - Complete Setup
REM Lance tous les services: Web, N8n, Ollama

echo.
echo ========================================
echo E-Graphisme - Configuration Complete
echo ========================================
echo.
echo 1. Serveur Web E-Graphisme
echo 2. N8n Automation  
echo 3. Ollama IA
echo 4. Docker Dashboard
echo.
echo ========================================
echo.

REM Demarrer le serveur web
echo [1/4] Demarrage du serveur Web...
start "E-Graphisme Web" cmd /c "cd /d "%~dp0" && py -m http.server 8000"

REM Verifier si N8n est installe
where n8n >nul 2>&1
if %errorlevel% equ 0 (
    echo [2/4] Demarrage de N8n...
    start "E-Graphisme N8n" cmd /c "n8n start"
) else (
    echo [2/4] N8n non installe - Installez avec: npm install -g n8n
)

REM Verifier si Ollama est installe  
where ollama >nul 2>&1
if %errorlevel% equ 0 (
    echo [3/4] Demarrage de Ollama...
    start "E-Graphisme Ollama" cmd /c "ollama serve"
) else (
    echo [3/4] Ollama non installe - Telechargez sur: ollama.com
)

REM Ouvrir Docker Dashboard
where docker >nul 2>&1
if %errorlevel% equ 0 (
    echo [4/4] Docker detecte
    start docker dashboard
) else (
    echo [4/4] Docker non installe
)

echo.
echo ========================================
echo Services demarres!
echo.
echo Acces:
echo   - Web: http://localhost:8000
echo   - N8n: http://localhost:5678
echo   - Ollama: http://localhost:11434
echo ========================================
echo.

pause