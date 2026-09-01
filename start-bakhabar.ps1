Write-Host "=========================================================================" -ForegroundColor Green
Write-Host "              STARTING BAKHABAR (باخبر) URDU NEWS PORTAL" -ForegroundColor Yellow
Write-Host "=========================================================================" -ForegroundColor Green
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "[1/2] Starting Next.js Frontend Server on http://localhost:3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptDir\frontend'; npm run dev"

Write-Host "[2/2] Starting Laravel REST API Server on http://localhost:8000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptDir\backend'; php artisan serve --port=8000"

Write-Host ""
Write-Host "Bakhabar Portal is now running!" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "- REST API:  http://localhost:8000/api/v1/articles/breaking" -ForegroundColor Yellow
