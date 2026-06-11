@echo off
REM E-Graphisme - Lance le serveur avec Python
cd /d "%~dp0"

echo.
echo ========================================
echo E-Graphisme - Serveur Python
echo ========================================
echo.
echo Ouvrez dans votre navigateur:
echo   http://localhost:8000
echo   http://localhost:8000/index.html
echo   http://localhost:8000/portfolio.html
echo   http://localhost:8000/studio.html
echo.
echo ========================================
echo.

py -m http.server 8000 --directory .

pause