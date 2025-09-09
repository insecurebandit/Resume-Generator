@echo off
echo ====================================
echo Resume Generator - GitHub Pages Deploy
echo ====================================
echo.
echo This will deploy to: https://insecurebandit.github.io/resumeGenerator
echo.

echo Step 1: Initialize Git repository
git init
echo.

echo Step 2: Add all files to Git
git add .
echo.

echo Step 3: Commit files
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg="Deploy Resume Generator web app"
git commit -m "%commit_msg%"
echo.

echo Step 4: Set main branch and add remote
git branch -M main
git remote add origin https://github.com/insecurebandit/resumeGenerator.git 2>nul
echo.

echo Step 5: Push to GitHub
echo Pushing to GitHub...
git push -u origin main
echo.

if %ERRORLEVEL% == 0 (
    echo ✅ SUCCESS! Files pushed to GitHub
    echo.
    echo Next steps:
    echo 1. Go to: https://github.com/insecurebandit/resumeGenerator
    echo 2. Click Settings ^> Pages
    echo 3. Select "Deploy from branch" ^> "main" ^> "/ (root)"
    echo 4. Save and wait 5-10 minutes
    echo 5. Your app will be live at: https://insecurebandit.github.io/resumeGenerator
) else (
    echo ❌ Push failed. Make sure:
    echo - Repository exists: https://github.com/insecurebandit/resumeGenerator
    echo - You have write access to the repository
    echo - Git credentials are configured
)

echo.
pause
