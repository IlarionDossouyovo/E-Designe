@echo off
setlocal
set "DIR=%~dp0"
set "DIR=%DIR:~0,-1%"
echo ========================================
echo E-Graphisme Server
echo ========================================
echo.
echo Open in browser:
echo   http://localhost:8000/index.html
echo   http://localhost:8000/portfolio.html
echo   http://localhost:8000/services.html
echo   http://localhost:8000/studio.html
echo.
echo ========================================
echo.
php -S localhost:8000 -t %DIR% router.php