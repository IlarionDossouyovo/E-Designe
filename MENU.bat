@echo off
REM ============================================
REM E-Graphisme - MENU PRINCIPAL
REM ============================================

:menu
color 1F
title E-Graphisme - Menu Principal

echo.
echo ========================================
echo.
echo      E-GRAPHISME - MENU
echo.
echo ========================================
echo.
echo   1. Demarrer tout (AUTO-START)
echo   2. Importer workflows (AUTO-IMPORT)
echo   3. Arreter tout (AUTO-STOP)
echo.
echo   4. Dashboard E-Graphisme
echo   5. Interface N8n
echo   6. Open WebUI
echo.
echo   0. Quitter
echo.
echo ========================================
echo.

set /p choix=Votre choix: 

if "%choix%"=="1" goto start
if "%choix%"=="2" goto import
if "%choix%"=="3" goto stop
if "%choix%"=="4" goto dashboard
if "%choix%"=="5" goto n8n
if "%choix%"=="6" goto webui
if "%choix%"=="0" goto quit

echo.
echo ERREUR: Choix invalide!
echo.
pause
goto menu

:start
echo.
echo Lancement de E-Graphisme...
call AUTO-START.bat
goto menu

:import
echo.
echo Import des workflows...
call AUTO-IMPORT.bat
goto menu

:stop
echo.
echo Arret des services...
call AUTO-STOP.bat
goto menu

:dashboard
start http://127.0.0.1:8000/dashboard.html
goto menu

:n8n
start http://localhost:5678
goto menu

:webui
start http://localhost:3001
goto menu

:quit
echo.
echo Au revoir!
echo.
exit