#!/bin/bash

echo "Starting GLM-TTS Application..."

# Start the backend server in the background
echo "Starting backend server..."
cd /workspace
python tts_backend.py > backend.log 2>&1 &

# Wait a moment for the backend to start
sleep 3

# Start the frontend development server
echo "Starting frontend development server..."
cd /workspace/tts-frontend

# Install frontend dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install > frontend-install.log 2>&1
fi

# Start the development server
npm run dev > frontend.log 2>&1 &

echo "Application started!"
echo "Backend server running at http://localhost:8000"
echo "Frontend server running at http://localhost:5173"

# Keep the script running
wait