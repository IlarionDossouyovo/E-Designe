@echo off
REM ============================================
REM E-Graphisme - AUTO-IMPORT Workflows
REM ============================================

echo.
echo ========================================
echo   E-Graphisme - Import Automatique
echo ========================================
echo.

set N8N_URL=http://localhost:5678
set SERVER_URL=http://127.0.0.1:8000

echo [ETAPE 1] Verification N8n...
netstat -an | findstr ":5678" >nul
if %errorlevel% neq 0 (
    echo ERREUR: N8n n'est pas demarre!
    echo Veuillez d'abord executer AUTO-START.bat
    pause
    exit /b 1
)
echo     OK

echo.
echo [ETAPE 2] Verification serveur Web...
netstat -an | findstr ":8000" >nul
if %errorlevel% neq 0 (
    echo ERREUR: Le serveur Web n'est pas demarre!
    echo Veuillez d'abord executer AUTO-START.bat
    pause
    exit /b 1
)
echo     OK

echo.
echo ========================================
echo   Workflows a importer:
echo ========================================
echo.
echo Copiez ces URLs dans N8n:
echo.
echo [1] Business:
echo    %SERVER_URL%/workflows/business.json
echo.
echo [2] Enterprise:
echo    %SERVER_URL%/workflows/enterprise.json
echo.
echo [3] Complete:
echo    %SERVER_URL%/workflows/complete.json
echo.
echo ========================================
echo.
echo INSTRUCTIONS:
echo 1. Aller sur http://localhost:5678
echo 2. Se connecter
echo 3. Cliquer "Workflows"
echo 4. Cliquer "Import from URL"
echo 5. Coller une URL ci-dessus
echo 6. Cliquer "Import"
echo 7. Repetrer pour chaque workflow
echo.
echo ========================================

pause