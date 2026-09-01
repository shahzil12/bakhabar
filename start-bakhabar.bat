@echo off
echo =========================================================================
echo               STARTING BAKHABAR (باخبر) URDU NEWS PORTAL
echo =========================================================================
echo.

echo [1/2] Starting Next.js Frontend Server on http://localhost:3000...
start "Bakhabar Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo [2/2] Starting Laravel REST API Server on http://localhost:8000...
start "Bakhabar Laravel Backend" cmd /k "cd /d %~dp0backend && php artisan serve --port=8000"

echo.
echo =========================================================================
echo  Bakhabar Portal is now running!
echo  - Frontend: http://localhost:3000
echo  - REST API:  http://localhost:8000/api/v1/articles/breaking
echo =========================================================================
pause
