@echo off
REM E-Graphisme - Test server
cd /d "%~dp0"

echo Current directory: %CD%
echo.
dir *.html | findstr /i "html"
echo.
echo Starting server on port 8000...
echo.

py -m http.server 8000 --bind 127.0.0.1

pause