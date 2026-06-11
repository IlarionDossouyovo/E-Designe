@echo off
REM ============================================
REM E-Graphisme - Arreter Tous les Services
REM ============================================

echo.
echo ========================================
echo   Arret des Services
echo ========================================
echo.

echo [1/4] Arret du serveur Web...
taskkill /F /FI "WINDOWTITLE eq E-Graphisme Web*" >nul 2>&1
echo     OK

echo [2/4] Arret N8n (Docker)...
docker stop n8n >nul 2>&1
echo     OK

echo [3/4] Arret Open WebUI (Docker)...
docker stop open-webui >nul 2>&1
echo     OK

echo [4/4] Arret Ollama...
taskkill /F /IM ollama.exe >nul 2>&1
echo     OK

echo.
echo ========================================
echo   Tous les services arretes!
echo ========================================

pause