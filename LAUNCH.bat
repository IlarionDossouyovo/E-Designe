@echo off
REM E-Graphisme - Launch All Services
REM Lance tous les services E-Graphisme

echo.
echo ========================================
echo E-Graphisme - Demarrage Complet
echo ========================================
echo.

REM === DOCKER ===
echo [1] Verification Docker...
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo    ERREUR: Docker n'est pas demarre
    echo    Lancez Docker Desktop puis reessayez
    pause
    exit /b 1
)
echo    Docker: OK

REM === N8N ===
echo [2] Verification N8n...
docker ps --format "{{.Names}}" | findstr "n8n" >nul
if %errorlevel% equ 0 (
    echo    N8n: Deja en service
) else (
    echo    Demarrage N8n...
    docker run -d --name n8n -p 5678:5678 -v n8n-data:/home/node/.n8n n8nio/n8n
    echo    N8n: Demarre
)

REM === OLLAMA ===
echo [3] Verification Ollama...
netstat -an | findstr ":11434" >nul
if %errorlevel% equ 0 (
    echo    Ollama: Deja en service
) else (
    echo    Demarrage Ollama...
    start "Ollama" cmd /c "ollama serve"
    timeout /t 3 /nobreak >nul
    echo    Ollama: Demarre
)

REM === OPEN WEBUI ===
echo [4] Verification Open WebUI...
docker ps --format "{{.Names}}" | findstr "open-webui" >nul
if %errorlevel% equ 0 (
    echo    Open WebUI: Deja en service
) else (
    echo    Demarrage Open WebUI...
    docker run -d --name open-webui -p 3001:8080 -v ollama:/root/.ollama open-webui/open-webui:latest
    echo    Open WebUI: Demarre
)

REM === SERVEUR WEB E-GRAPHISME ===
echo [5] Demarrage Serveur Web...
start "E-Graphisme Web" cmd /c "cd /d "%~dp0" && py -m http.server 8000 --directory "%~dp0" --bind 127.0.0.1"

echo.
echo ========================================
echo TOUS LES SERVICES SONT LANCES!
echo ========================================
echo.
echo ACCES AUX SERVICES:
echo.
echo   E-Graphisme:    http://127.0.0.1:8000
echo   N8n:           http://localhost:5678
echo   Ollama:        http://localhost:11434
echo   Open WebUI:    http://localhost:3001
echo.
echo ========================================
echo.
echo Appuyez sur une touche pour fermer cette fenetre
echo (Les services continueront de fonctionner)
pause >nul