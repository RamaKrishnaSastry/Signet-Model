#!/bin/bash

# SigNet Development Setup Script

echo "🚀 Setting up SigNet Development Environment..."

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Copy environment file
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "Created .env file from .env.example"
fi

cd ..

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd frontend

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Copy environment file
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "Created .env file from .env.example"
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Start the backend: cd backend && source venv/bin/activate && python app.py"
echo "2. Start the frontend: cd frontend && npm start"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For more information, check the README.md file"
