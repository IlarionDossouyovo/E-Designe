@echo off
title E-Graphisme Server
cd /d "%~dp0"
echo.
echo ========================================
echo E-Graphisme - Server starting...
echo ========================================
echo.
echo Dossier: %CD%
echo.
echo Ouvrez ces adresses dans votre navigateur:
echo.
echo   http://localhost:8000
echo   http://localhost:8000/index.html
echo   http://localhost:8000/portfolio.html
echo   http://localhost:8000/services.html
echo   http://localhost:8000/studio.html
echo.
echo ========================================
echo.
echo Appuyez sur Ctrl+C pour arreter
echo.
php -S 0.0.0.0:8000
pause