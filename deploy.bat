@echo off
echo Building and deploying portfolio to Vercel...
echo.

echo Step 1: Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please fix the errors and try again.
    pause
    exit /b %errorlevel%
)

echo.
echo Step 2: Deploying to Vercel production...
call vercel --prod

echo.
echo Step 3: Setting up domain alias...
call vercel alias set %1 joellaggui.vercel.app

echo.
echo Deployment complete! Your portfolio is live at:
echo https://joellaggui.vercel.app
echo.
pause
