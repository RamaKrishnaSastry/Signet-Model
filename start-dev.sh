#!/bin/bash

# Start both backend and frontend in development mode

echo "🚀 Starting SigNet Development Servers..."

# Start backend in background
echo "📦 Starting Backend Server..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend Server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "✅ Both servers started!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Function to cleanup processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ All servers stopped"
    exit 0
}

# Set up signal handling
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
