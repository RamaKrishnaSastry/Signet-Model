@echo off
echo 🚀 Starting SigNet Development Servers...

REM Start backend
echo 📦 Starting Backend Server...
cd backend
start "Backend Server" cmd /k "venv\Scripts\activate && python app.py"
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /k "npm start"
cd ..

echo ✅ Both servers started!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo.
echo Check the new console windows for server logs
pause
