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
if not exist php\logs mkdir php\logs
if not exist api mkdir api

echo [1/4] Demarrage du serveur Web...
start "E-Graphisme Web" cmd /c "python -m http.server 8000"
timeout /t 2 /nobreak >nul
echo     OK - Port 8000

echo [2/4] Demarrage API Server...
start "E-Graphisme API" cmd /c "python api\contact.py"
timeout /t 2 /nobreak >nul
echo     OK - Port 8001

echo [3/4] Verification Ollama...
netstat -an | findstr ":11434" >nul
if %errorlevel% neq 0 (
    echo     ATTENTION: Ollama pas demarre
    echo     -> Executer: ollama serve
) else (
    echo     OK - Ollama sur port 11434
)

echo [4/4] Ouverture du Dashboard...
start http://127.0.0.1:8000/dashboard.html

echo.
echo ========================================
echo   E-Graphisme Pret!
echo ========================================
echo.
echo   [URLs]
echo   Dashboard:   http://127.0.0.1:8000/dashboard.html
echo   API:        http://127.0.0.1:8001/api/contact
echo   Ollama:      http://localhost:11434
echo.
echo   [Commandes Manuelles]
echo   python -m http.server 8000
echo   python api\contact.py
echo.
echo ========================================

pause