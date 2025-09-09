@echo off
echo ====================================
echo Resume Generator - Web App Deployment
echo ====================================
echo.

echo Step 1: Initialize Git repository (if not already done)
git init 2>nul
echo.

echo Step 2: Add all files
git add .
echo.

echo Step 3: Commit changes
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg="Deploy Resume Generator web app"
git commit -m "%commit_msg%"
echo.

echo Step 4: Add GitHub origin (replace with your repository URL)
echo Please run manually:
echo   git remote add origin https://github.com/your-username/resumeGenerator.git
echo   git push -u origin main
echo.

echo Step 5: Enable GitHub Pages
echo 1. Go to your GitHub repository
echo 2. Click Settings ^> Pages
echo 3. Select "Deploy from a branch" ^> "main" branch
echo 4. Your app will be live at: https://your-username.github.io/resumeGenerator
echo.

echo Your web app is ready for deployment!
echo.
echo Files included:
dir /b *.html *.css *.js *.json *.svg *.md
echo.

pause
