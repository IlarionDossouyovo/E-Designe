@echo off
REM ============================================
REM E-Graphisme - Systeme de Demarrage Complet
REM ============================================

echo.
echo ========================================
echo   E-Graphisme - Demarrage Automatique
echo ========================================
echo.

REM Creer les dossiers necessaires
if not exist db mkdir db
if not exist logs mkdir logs
if not exist db\contacts.json echo [] > db\contacts.json

echo [1/6] Demarrage du serveur Web...
start "E-Graphisme Web" cmd /c "python -m http.server 8000"
timeout /t 2 /nobreak >nul
echo     OK - Port 8000

echo [2/6] Verification N8n...
netstat -an | findstr ":5678" >nul
if %errorlevel% neq 0 (
    echo     ATTENTION: N8n pas demarre
    echo     -> Executer: docker run -d -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
) else (
    echo     OK - N8n sur port 5678
)

echo [3/6] Verification Ollama...
netstat -an | findstr ":11434" >nul
if %errorlevel% neq 0 (
    echo     ATTENTION: Ollama pas demarre
    echo     -> Executer: ollama serve
) else (
    echo     OK - Ollama sur port 11434
)

echo [4/6] Verification Open WebUI...
netstat -an | findstr ":3001" >nul
if %errorlevel% neq 0 (
    echo     ATTENTION: Open WebUI pas demarre
    echo     -> Executer: docker run -d -p 3001:8080 openwebui/open-webui
) else (
    echo     OK - Open WebUI sur port 3001
)

echo [5/6] Verification Docker...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo     ATTENTION: Docker pas demarre
) else (
    echo     OK - Docker actif
)

echo [6/6]Ouverture du Dashboard...
start http://127.0.0.1:8000/dashboard.html

echo.
echo ========================================
echo   E-Graphisme Pret!
echo ========================================
echo.
echo   [URLs]
echo   Dashboard:   http://127.0.0.1:8000/dashboard.html
echo   N8n:        http://localhost:5678
echo   Ollama:      http://localhost:11434
echo   Open WebUI:  http://localhost:3001
echo.
echo   [Commandes Manuelles]
echo   N8n:        docker run -d -p 5678:5678 n8nio/n8n
echo   Open WebUI: docker run -d -p 3001:8080 openwebui/open-webui
echo.
echo ========================================

pause