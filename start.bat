@echo off
cd /d "%~dp0"
echo ========================================
echo E-Graphisme Server
echo ========================================
echo.
echo Open in browser (with .html extension):
echo   http://localhost:8000/index.html
echo   http://localhost:8000/portfolio.html
echo   http://localhost:8000/services.html
echo   http://localhost:8000/studio.html
echo.
echo ========================================
echo.
php -S localhost:8000 -t "%~dp0" router.php