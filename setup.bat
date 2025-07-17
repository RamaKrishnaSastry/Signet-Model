@echo off
echo 🚀 Setting up SigNet Development Environment...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Setup Backend
echo 📦 Setting up Backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Copy environment file
if not exist ".env" (
    copy .env.example .env
    echo Created .env file from .env.example
)

cd ..

REM Setup Frontend
echo 🎨 Setting up Frontend...
cd frontend

REM Install Node.js dependencies
echo Installing Node.js dependencies...
npm install

REM Copy environment file
if not exist ".env" (
    copy .env.example .env
    echo Created .env file from .env.example
)

cd ..

echo ✅ Setup complete!
echo.
echo 🎯 Next steps:
echo 1. Start the backend: cd backend ^&^& venv\Scripts\activate ^&^& python app.py
echo 2. Start the frontend: cd frontend ^&^& npm start
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📖 For more information, check the README.md file
pause
