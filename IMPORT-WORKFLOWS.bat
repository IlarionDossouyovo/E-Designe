@echo off
REM ============================================
REM E-Graphisme - Import Workflows N8n
REM ============================================

echo.
echo ========================================
echo   Import Workflows vers N8n
echo ========================================
echo.

set N8N_URL=http://localhost:5678

echo [1/7] leads.json...
echo A importer manuellement depuis:
echo %N8N_URL%/workflows/leads.json
echo.

echo [2/7] ai-chat.json...
echo A importer manuellement depuis:
echo %N8N_URL%/workflows/ai-chat.json
echo.

echo [3/7] daily-report.json...
echo A importer manuellement depuis:
echo %N8N_URL%/workflows/daily-report.json
echo.

echo [4/7] ai-agent.json...
echo A importer manuellement depuis:
echo %N8N_URL%/workflows/ai-agent.json
echo.

echo [5/7] business.json...
echo A importer manuellement depuis:
echo %N8N_URL%/workflows/business.json
echo.

echo [6/7] enterprise.json...
echo A importer manuellement depuis:
echo %N8N_URL%/workflows/enterprise.json
echo.

echo [7/7] complete.json...
echo A importer manuellement depuis:
echo %N8N_URL%/workflows/complete.json
echo.

echo ========================================
echo Instructions:
echo.
echo 1. Aller sur http://localhost:5678
echo 2. Login avec vos identifiants
echo 3. Cliquer Workflows
echo 4. Import from URL
echo 5. Copier l'URL du workflow
echo ========================================

pause