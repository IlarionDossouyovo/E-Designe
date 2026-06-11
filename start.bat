@echo off
cd /d "%~dp0"
echo Starting E-Graphisme Server...
echo.
echo Open your browser to:
echo   - http://localhost:8000/index.html
echo   - http://localhost:8000/portfolio.html
echo   - http://localhost:8000/services.html
echo   - http://localhost:8000/studio.html
echo.
echo Press Ctrl+C to stop the server
echo.
php -S localhost:8000 -t "%~dp0"