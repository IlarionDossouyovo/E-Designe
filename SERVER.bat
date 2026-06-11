@echo off
REM E-Graphisme - Lance le serveur PHP
REM Usage: Double-cliquez sur ce fichier

cd /d "%~dp0"

echo.
echo ========================================
echo E-Graphisme - Demarrage du serveur
echo ========================================
echo.
echo Ouvrez dans votre navigateur:
echo   http://localhost:8000
echo.
echo Liste des pages disponibles:
echo   - index.html     (Accueil)
echo   - portfolio.html (Portfolio)
echo   - services.html  (Services)
echo   - studio.html    (E-Studio)
echo   - contact.html   (Contact)
echo.
echo ========================================
echo.
echo Serveur en cours... (Ctrl+C pour arreter)
echo.

php -S localhost:8000 -t "C:\Users\AUGUSTIN\Documents\Projets\E-Graphisme"

pause