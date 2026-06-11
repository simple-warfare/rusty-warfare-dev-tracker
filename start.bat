@echo off
REM Quick start script for Rusty Warfare Dev Tracker

echo ======================================
echo Rusty Warfare Dev Tracker Setup
echo ======================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/3] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error: npm install failed
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
) else (
    echo [1/3] Dependencies already installed
    echo.
)

echo [2/3] Starting dev server...
echo.
echo Open your browser to: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
echo Available languages:
echo - Chinese: http://localhost:5173/zh/
echo - English: http://localhost:5173/en/
echo.

call npm run docs:dev
