@echo off
:: =============================================
:: E-DESIGNE - Script de Synchronisation OneDrive
:: =============================================

echo.
echo ==============================================
echo    E-DESIGNE - Synchronisation OneDrive
echo ==============================================
echo.

:: Vérifier si onedrive est installé
where onedrive >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] OneDrive non detecte, utilisation de la synchronisation manuelle...
    echo.
)

echo [1/4] Verification des fichiers modifies...
git status --short
echo.

echo [2/4] Ajout des fichiers au staging...
git add -A
echo.

echo [3/4] Commit des modifications...
git commit -m "feat: Configuration Resend emails transactionnels

- Integration API Resend pour emails transactionnels
- 5 templates email (welcome, order_confirmation, shipping_update, password_reset, contact_confirmation)
- Endpoints API: /api/contact, /api/password/reset
- Automatisation emailsBienvenue et confirmation commande
- Mise a jour .env.example

Co-authored-by: openhands ^<openhands@all-hands.dev^>"
echo.

echo [4/4] Push vers le depot distant...
git push origin master
echo.

echo.
echo ==============================================
echo    Synchronisation terminee avec succes!
echo ==============================================
echo.
echo Prochaines etapes:
echo 1. Mettre a jour le dossier Documents\OneDrive\E-Designe
echo 2. Redeployer sur Vercel
echo.
pause
