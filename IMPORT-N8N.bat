@echo off
REM E-Graphisme - Import N8n Workflow
REM Importe le workflow E-Graphisme dans N8n

echo.
echo ========================================
echo E-Graphisme - Import Workflow N8n
echo ========================================
echo.

REM Verifier si N8n est en service
docker ps --format "{{.Names}}" | findstr "n8n" >nul
if %errorlevel% neq 0 (
    echo ERREUR: N8n n'est pas en service
    echo Lancez N8n puis reessayez
    pause
    exit /b 1
)

echo N8n detecte!
echo.
echo ========================================
echo ETAPES POUR IMPORTER LE WORKFLOW:
echo ========================================
echo.
echo 1. Ouvrez http://localhost:5678
echo 2. Connectez-vous avec vos identifiants
echo 3. Cliquez sur "Workflows" dans le menu
echo 4. Cliquez sur "Import from File"
echo 5. Selectionnez: n8n-workflow-e-graphisme.json
echo.
echo OU
echo.
echo 1. Allez dans Settings > API Key
echo 2. Creez une API key si besoin
echo 3. Utilisez l'API pour importer
echo.
echo ========================================
echo.
echo Fichier workflow: n8n-workflow-e-graphisme.json
echo.
echo URL API N8n: http://localhost:5678
echo.

pause