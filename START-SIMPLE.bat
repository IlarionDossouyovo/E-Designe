@echo off
REM ============================================
REM E-Graphisme - DEMARRAGE SIMPLE (SANS DOCKER)
REM ============================================

color 1F
title E-Graphisme - Demarrage Simple

echo.
echo ========================================
echo   E-Graphisme - Demarrage Simple
echo ========================================
echo.

set PORT=8000

REM ============================================
REM VERIFICATION PHP
REM ============================================

echo [1] Verification PHP...
where php >nul 2>&1
if %errorlevel% equ 0 (
    echo     OK - PHP installe
) else (
    echo     ERREUR: PHP non installe
    echo     -> Installer PHP: https://windows.php.net/download/
    pause
    exit /b 1
)

echo.
echo [2] Demarrage du serveur Web...

REM Verifier si le port est deja utilise
netstat -an | findstr ":%PORT%" >nul
if %errorlevel% neq 0 (
    start "E-Graphisme" cmd /c "php -S 127.0.0.1:8000 -t ."
    timeout /t 2 /nobreak >nul
    echo     OK - Serveur demarre sur port 8000
) else (
    echo     OK - Serveur deja actif sur port 8000
)

echo.
echo [3] Demarrage N8N (si installe)...

set N8N_PORT=5678
netstat -an | findstr ":%N8N_PORT%" >nul
if %errorlevel% neq 0 (
    where n8n >nul 2>&1
    if %errorlevel% equ 0 (
        start "E-Graphisme N8N" cmd /c "n8n start"
        echo     OK - N8N demarre
    ) else (
        echo     ATTENTION: N8N non installe
        echo     -> npm install -g n8n
    )
) else (
    echo     OK - N8N deja actif
)

echo.
echo ========================================
echo   VERIFICATION FINALE
echo ========================================
echo.

timeout /t 2 /nobreak >nul

echo [Web Server] 
netstat -an | findstr ":8000" >nul && echo     EN LIGNE || echo     HORS LIGNE

echo [N8N] 
netstat -an | findstr ":5678" >nul && echo     EN LIGNE || echo     HORS LIGNE

echo.
echo ========================================
echo   E-Graphisme Pret!
echo ========================================
echo.
echo   Site Web:    http://127.0.0.1:8000
echo   N8N:        http://127.0.0.1:5678
echo   GitHub:      https://ilariondossouyovo.github.io/E-Graphisme/
echo.
echo ========================================

echo.
echo Ouverture du site...
start http://127.0.0.1:8000

echo.
pause