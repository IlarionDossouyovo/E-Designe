@echo off
REM ============================================
REM E-Graphisme - DEMARRAGE AUTOMATIQUE COMPLET
REM ============================================

setlocal enabledelayedexpansion

color 1F
title E-Graphisme - Demarrage

echo.
echo ========================================
echo   E-Graphisme - Demarrage Automatique
echo ========================================
echo.

REM ============================================
REM CONFIGURATION
REM ============================================
set WEB_PORT=8000
set N8N_PORT=5678
set OLLAMA_PORT=11434
set WEBUI_PORT=3001

REM Dossiers
set DB_DIR=db
set LOGS_DIR=logs

REM ============================================
REM VERIFICATIONS ET PREPARATION
REM ============================================

echo [ETAPE 1] Preparation des dossiers...
if not exist %DB_DIR% mkdir %DB_DIR%
if not exist %LOGS_DIR% mkdir %LOGS_DIR%
if not exist %DB_DIR%\contacts.json echo [] > %DB_DIR%\contacts.json
echo     OK - Dossiers prets

echo.
echo [ETAPE 2] Verification Docker...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo     ATTENTION: Docker n'est pas demarre!
    echo     -> Veuillez demarrer Docker Desktop
    echo.
    pause
    exit /b 1
)
echo     OK - Docker actif

REM ============================================
REM DEMARRAGE DES SERVICES
REM ============================================

echo.
echo [ETAPE 3] Demarrage du serveur Web...
netstat -an | findstr ":%WEB_PORT%" >nul
if %errorlevel% neq 0 (
    start "E-Graphisme Web" cmd /c "python -m http.server %WEB_PORT%"
    timeout /t 2 /nobreak >nul
    echo     OK - Web Server demarre (port %WEB_PORT%)
) else (
    echo     OK - Web Server deja actif
)

echo.
echo [ETAPE 4] Demarrage N8n...
netstat -an | findstr ":%N8N_PORT%" >nul
if %errorlevel% neq 0 (
    echo     Demarrage de N8n...
    docker run -d --name egraphisme-n8n -p %N8N_PORT%:5678 -v "%CD%\data:/home/node/.n8n" n8nio/n8n
    timeout /t 5 /nobreak >nul
    echo     OK - N8n demarre
) else (
    echo     OK - N8n deja actif
)

echo.
echo [ETAPE 5] Demarrage Ollama...
netstat -an | findstr ":%OLLAMA_PORT%" >nul
if %errorlevel% neq 0 (
    echo     Verification Ollama...
    where ollama >nul 2>&1
    if %errorlevel% equ 0 (
        start cmd /c "ollama serve"
        timeout /t 3 /nobreak >nul
        echo     OK - Ollama demarre
    ) else (
        echo     ATTENTION: Ollama non installe
        echo     -> Installer: ollama.ai/download
    )
) else (
    echo     OK - Ollama deja actif
)

echo.
echo [ETAPE 6] Demarrage Open WebUI...
netstat -an | findstr ":%WEBUI_PORT%" >nul
if %errorlevel% neq 0 (
    echo     Demarrage de Open WebUI...
    docker run -d --name egraphisme-webui -p %WEBUI_PORT%:8080 -e OLLAMA_BASE_URL=http://host.docker.internal:11434 openwebui/open-webui
    timeout /t 5 /nobreak >nul
    echo     OK - Open WebUI demarre
) else (
    echo     OK - Open WebUI deja actif
)

REM ============================================
REM VERIFICATION FINALE
REM ============================================

echo.
echo ========================================
echo   VERIFICATION DES SERVICES
echo ========================================
echo.

timeout /t 3 /nobreak >nul

echo [1] Web Server : 
netstat -an | findstr ":%WEB_PORT%" >nul && echo     EN LIGNE || echo     HORS LIGNE

echo [2] N8n : 
netstat -an | findstr ":%N8N_PORT%" >nul && echo     EN LIGNE || echo     HORS LIGNE

echo [3] Ollama : 
netstat -an | findstr ":%OLLAMA_PORT%" >nul && echo     EN LIGNE || echo     HORS LIGNE

echo [4] Open WebUI : 
netstat -an | findstr ":%WEBUI_PORT%" >nul && echo     EN LIGNE || echo     HORS LIGNE

REM ============================================
REM OUVERTURE DES URLS
REM ============================================

echo.
echo ========================================
echo   E-Graphisme Pret!
echo ========================================
echo.
echo   URLs disponibles:
echo   ----------------------
echo   Dashboard:   http://127.0.0.1:%WEB_PORT%/dashboard.html
echo   N8n:        http://localhost:%N8N_PORT%
echo   Ollama:      http://localhost:%OLLAMA_PORT%
echo   Open WebUI:  http://localhost:%WEBUI_PORT%
echo.
echo ========================================

timeout /t 2 /nobreak >nul

echo Ouverture du Dashboard...
start http://127.0.0.1:%WEB_PORT%/dashboard.html

echo.
echo Termine! Appuyez sur une touche pour fermer...
pause >nul