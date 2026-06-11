@echo off
REM E-Graphisme - Delete Old and Import New N8n Workflows

echo.
echo ========================================
echo E-Graphisme - Import N8n Workflows
echo ========================================
echo.
echo ANCIENS WORKFLOWS A SUPPRIMER:
echo   - Tous les workflows existants
echo.
echo NOUVEAUX WORKFLOWS:
echo   1. leads.json        - Gestion des leads
echo   2. ai-chat.json     - Chat IA Ollama
echo   3. daily-report.json - Rapport quotidien
echo   4. ai-agent.json    - Agent IA
echo.
echo ========================================
echo.
echo ETAPES DANS N8n:
echo.
echo 1. Allez sur http://localhost:5678
echo.
echo 2. SUPPRIMER anciens workflows:
echo    - Cliquez sur chaque workflow
echo    - Cliquez sur "Delete" en haut a droite
echo.
echo 3. Importer NOUVEAUX:
echo    - Cliquez "Workflows" dans le menu
echo    - Cliquez "Import from URL"
echo.
echo    POUR CHAQUE workflow:
echo    ===================
echo.
echo    [A] leads.json
echo    URL: http://127.0.0.1:8000/workflows/leads.json
echo.
echo    [B] ai-chat.json  
echo    URL: http://127.0.0.1:8000/workflows/ai-chat.json
echo.
echo    [C] daily-report.json
echo    URL: http://127.0.0.1:8000/workflows/daily-report.json
echo.
echo    [D] ai-agent.json
echo    URL: http://127.0.0.1:8000/workflows/ai-agent.json
echo.
echo ========================================
echo.
echo 4. ACTIVER chaque workflow:
echo    - Cliquez sur le workflow
echo    - Cliquez sur le bouton ACTIVE (toggle)
echo.
echo ========================================

pause