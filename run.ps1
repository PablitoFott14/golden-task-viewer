# Golden Task Viewer — one-command launcher (Windows / PowerShell)
#
# Google Drive's virtual filesystem cannot host a node_modules folder
# (npm fails with EBADF / ENOTEMPTY, and junctions aren't allowed on it).
# This script mirrors the project to a fast local disk folder, installs
# dependencies there once, and starts the dev server.
#
# Usage:  Right-click > Run with PowerShell   — or —   .\run.ps1

$ErrorActionPreference = "Stop"
$proj  = $PSScriptRoot
$local = Join-Path $env:LOCALAPPDATA "golden-task-viewer"

Write-Host ""
Write-Host "Golden Task Viewer" -ForegroundColor Yellow
Write-Host "Syncing project to local disk:" -ForegroundColor Cyan
Write-Host "  $local"

# /MIR mirrors the tree; /XD excludes node_modules + dist so they survive.
robocopy $proj $local /MIR /XD node_modules dist .git /NFL /NDL /NJH /NJS /NP | Out-Null

Set-Location $local

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies (first run only, ~30s)..." -ForegroundColor Cyan
    npm install --no-audit --no-fund
}

Write-Host ""
Write-Host "Starting dev server at http://localhost:5173/  (Ctrl+C to stop)" -ForegroundColor Green
Write-Host ""
npm run dev
