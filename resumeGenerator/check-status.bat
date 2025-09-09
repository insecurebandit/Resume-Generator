@echo off
echo ====================================
echo Resume Generator - Deployment Status
echo ====================================
echo.

echo Checking file structure...
echo.

if exist "index.html" (
    echo ✅ index.html exists
) else (
    echo ❌ index.html missing
)

if exist "styles.css" (
    echo ✅ styles.css exists
) else (
    echo ❌ styles.css missing
)

if exist "script.js" (
    echo ✅ script.js exists
) else (
    echo ❌ script.js missing
)

if exist "manifest.json" (
    echo ✅ manifest.json exists (PWA support)
) else (
    echo ❌ manifest.json missing
)

if exist "favicon.svg" (
    echo ✅ favicon.svg exists
) else (
    echo ❌ favicon.svg missing
)

if exist ".nojekyll" (
    echo ✅ .nojekyll exists (GitHub Pages optimization)
) else (
    echo ❌ .nojekyll missing
)

echo.
echo File sizes:
for %%f in (index.html styles.css script.js) do (
    for %%s in ("%%f") do echo   %%f - %%~zs bytes
)

echo.
echo Ready for deployment to: https://insecurebandit.github.io/resumeGenerator
echo (Will serve index.html as the main page - the Resume Generator app)
echo.

echo To deploy, run: deploy.bat
echo.
pause
