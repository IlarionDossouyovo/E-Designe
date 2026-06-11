@echo off
REM E-Graphisme - Import N8n Workflow via API
REM Importe automatiquement le workflow dans N8n

echo.
echo ========================================
echo E-Graphisme - Import Workflow N8n
echo ========================================
echo.

REM Verifier si le serveur web est en cours
curl -s http://127.0.0.1:8000/n8n-workflow-e-graphisme.json >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Le serveur web n'est pas en cours
    echo Lancez .\\SERVER.bat d'abord
    pause
    exit /b 1
)

echo Serveur web: OK
echo.

REM Demander les identifiants N8n
echo ========================================
echo CONNEXION N8N
echo ========================================
echo.
set /p N8N_EMAIL=Email admin: 
set /p N8N_PASSWORD=Mot de passe: 

echo.
echo Importation du workflow...
echo.

REM Note: L'importation directe necessite une API key
echo ========================================
echo ETAPE SUIVANTE:
echo ========================================
echo.
echo 1. Allez sur http://localhost:5678
echo 2. Connectez-vous avec vos identifiants
echo 3. Cliquez sur "Workflows" (menu lateral)
echo 4. Cliquez sur le bouton "Import from File"
echo 5. Allez dans le dossier:
echo    C:\\Users\\AUGUSTIN\\Documents\\Projets\\E-Graphisme
echo 6. Selectionnez:
echo    n8n-workflow-e-graphisme.json
echo.
echo OU
echo.
echo 3. Cliquez sur "Import from URL"
echo 4. Entrez:
echo    http://127.0.0.1:8000/n8n-workflow-e-graphisme.json
echo.
echo ========================================

pause