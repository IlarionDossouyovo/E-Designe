@echo off
REM ============================================
REM E-DÉSIGNE - COMMANDES DE MISE À JOUR
REM Pour Windows (Invite de commandes)
REM ============================================

echo.
echo ========================================
echo   E-DÉSIGNE - COMMANDES DE MISE A JOUR
echo ========================================
echo.

REM ============================================
REM COMMANDES DE BASE
REM ============================================

echo [1] Installer les dependances...
cd frontend
npm install

echo.
echo [2] Build du frontend...
npm run build

echo.
echo [3] Executer en local (dev)...
npm run dev

echo.
echo ========================================
echo TERMINES!
echo ========================================
pause
