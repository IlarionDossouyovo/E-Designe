@echo off
REM ============================================
REM E-Graphisme - AUTO-STOP
REM Arret automatique de tous les services
REM ============================================

color 1F
title E-Graphisme - Arret

echo.
echo ========================================
echo   E-Graphisme - Arret des Services
echo ========================================
echo.

echo [ETAPE 1] Arret du serveur Web...
taskkill /F /FI "WINDOWTITLE eq E-Graphisme Web*" >nul 2>&1
echo     OK

echo [ETAPE 2] Arret N8n...
docker stop egraphisme-n8n >nul 2>&1
docker rm egraphisme-n8n >nul 2>&1
echo     OK

echo [ETAPE 3] Arret OpenHands...
docker stop egraphisme-openhands >nul 2>&1
docker rm egraphisme-openhands >nul 2>&1
echo     OK

echo [ETAPE 4] Arret Ollama...
taskkill /F /IM ollama.exe >nul 2>&1
echo     OK

echo [ETAPE 5] Arret Python...
taskkill /F /IM python.exe >nul 2>&1
echo     OK

echo.
echo ========================================
echo   Tous les services sont arretes!
echo ========================================

pause