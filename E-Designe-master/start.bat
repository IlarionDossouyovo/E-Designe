@echo off
REM E-Désigne - Start Script for Windows
REM Double-click this file or run from command prompt

echo.
echo 🎀 E-DÉSIGNE - Démarrage Local
echo ============================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠ Node.js non trouvé. Installez depuis nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js trouvé

REM Check Ollama
curl -s http://localhost:11434/api/tags >nul 2>&1
if errorlevel 1 (
    echo ⚠ Ollama non detecte sur port 11434
    echo   Pour demarrer: ollama serve
    echo   Telecharger: https://ollama.ai
) else (
    echo ✓ Ollama en cours d'execution
)

echo.
echo 🚀 Demarrage du serveur API...
cd /d "%~dp0server"
start /b node index.js >nul 2>&1
timeout /t 2 /nobreak >nul

echo ✓ API sur http://localhost:3000

echo.
echo 🎨 Demarrage du Frontend...
cd /d "%~dp0frontend"
start /b npm run dev >nul 2>&1
timeout /t 3 /nobreak >nul

echo ✓ Frontend sur http://localhost:5173
echo.
echo ============================
echo 🎀 E-DÉSIGNE EST PRET!
echo ============================
echo.
echo 📱 URLs:
echo   API:    http://localhost:3000
echo   Front: http://localhost:5173
echo.
echo Appuyez sur une touche pour ouvrir dans le navigateur...
pause >nul

start http://localhost:5173

echo.
echo Les serveurs sont en cours d'execution.
echo Appuyez sur Ctrl+C dans ce terminal pour arreter.
echo.
pause