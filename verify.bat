@echo off
REM E-Graphisme - Verify Services Status
REM Verifie tous les services installees

echo.
echo ========================================
echo E-Graphisme - Verification des Services
echo ========================================
echo.

REM === DOCKER ===
echo [1] Docker
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    docker version --format "  Docker: {{.Server.Version}}"
    docker ps >nul 2>&1 && echo  Container: EN SERVICE || echo  Container: ARRETE
) else (
    echo  Non installe
)
echo.

REM === OLLAMA ===
echo [2] Ollama
ollama --version >nul 2>&1
if %errorlevel% equ 0 (
    echo  Ollama: EN SERVICE
    echo  Modeles disponibles:
    ollama list 2>nul | findstr /v "NAME"
) else (
    echo  Non installe
)
echo.

REM === N8N ===
echo [3] N8n
where n8n >nul 2>&1
if %errorlevel% equ 0 (
    echo  N8n: EN SERVICE
) else (
    npx n8n --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo  N8n (npx): EN SERVICE
    ) else (
        echo  Non installe
    )
)
echo.

REM === PHP ===
echo [4] PHP
php --version >nul 2>&1
if %errorlevel% equ 0 (
    php --version | findstr "PHP"
) else (
    echo  Non installe
)
echo.

REM === NODE ===
echo [5] Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    node --version | findstr "v"
    npm --version | findstr "npm"
) else (
    echo  Non installe
)
echo.

REM === SERVEUR WEB ===
echo [6] Serveur Web E-Graphisme
netstat -an | findstr ":8000" >nul
if %errorlevel% equ 0 (
    echo  Port 8000: EN SERVICE
) else (
    echo  Port 8000: ARRETE - Lancez .\\SERVER.bat
)
echo.

echo ========================================
echo.
echo COMMANDES UTILES:
echo.
echo Lancer Web:     .\\SERVER.bat
echo Lancer N8n:    n8n start
echo Lancer Ollama:  ollama serve
echo Docker:        docker start
echo.
echo URLs:
echo  Web:     http://localhost:8000
echo  N8n:     http://localhost:5678
echo  Ollama:  http://localhost:11434
echo ========================================

pause