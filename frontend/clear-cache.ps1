# Clear Next.js cache to fix webpack errors
Write-Host "🧹 Clearing Next.js cache..." -ForegroundColor Yellow

if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✅ Cleared .next folder" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .next folder not found" -ForegroundColor Cyan
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force node_modules/.cache
    Write-Host "✅ Cleared node_modules cache" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Cache cleared! Now restart your dev server:" -ForegroundColor Green
Write-Host "   npm run dev" -ForegroundColor Cyan


