# PowerShell script to reorganize app directory into route groups
# Run this AFTER stopping the dev server (Ctrl+C on npm run dev)

$appDir = "e:\Mine\Turorials\storychain_fe\storychain_fe\app"

# Create route group directories if they don't exist
New-Item -ItemType Directory -Force -Path "$appDir\(protected)"

# Move protected routes into (protected) group
$protectedRoutes = @("dashboard", "stories", "profile", "builder", "how-to-use", "pricing")

foreach ($route in $protectedRoutes) {
    $source = "$appDir\$route"
    $destination = "$appDir\(protected)\$route"
    
    if (Test-Path $source) {
        Write-Host "Moving $route to (protected)..."
        Move-Item -Path $source -Destination $destination -Force
    }
}

# Delete old sign-in and sign-up directories (already recreated in (auth))
$authRoutes = @("sign-in", "sign-up")

foreach ($route in $authRoutes) {
    $source = "$appDir\$route"
    if (Test-Path $source) {
        Write-Host "Removing old $route directory..."
        Remove-Item -Path $source -Recurse -Force
    }
}

Write-Host "`nDone! Route groups created:"
Write-Host "  (auth)      - sign-in, sign-up (no navbar)"
Write-Host "  (public)    - home page (with navbar)"
Write-Host "  (protected) - dashboard, stories, profile, etc. (with navbar, auth required)"
