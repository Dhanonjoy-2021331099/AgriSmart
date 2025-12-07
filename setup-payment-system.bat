@echo off
REM Online Payment System - Quick Setup Script
REM AgriSmart Project

echo.
echo ================================================
echo   Online Payment System Setup
echo ================================================
echo.

REM Check if we're in the right directory
if not exist "frontend" (
    echo ERROR: frontend directory not found
    echo Please run this script from the project root directory (SmartAgri)
    pause
    exit /b 1
)

if not exist "backend" (
    echo ERROR: backend directory not found
    echo Please run this script from the project root directory (SmartAgri)
    pause
    exit /b 1
)

echo Installing frontend dependencies...
cd frontend
call npm install jspdf

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install jsPDF
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ================================================
echo   Installation Complete!
echo ================================================
echo.
echo Next Steps:
echo   1. Update payment numbers in:
echo      frontend\src\pages\Checkout.jsx
echo.
echo   2. Restart your development server:
echo      cd frontend
echo      npm run dev
echo.
echo   3. Test the online payment flow
echo.
echo For detailed documentation, see:
echo   ONLINE_PAYMENT_SYSTEM_GUIDE.md
echo.
echo You're ready to accept online payments!
echo.
pause
