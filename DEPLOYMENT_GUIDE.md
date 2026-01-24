# GLM-TTS Deployment Guide

This guide explains how to set up, run, and deploy the GLM-TTS text-to-speech application with a React frontend and Python backend.

## Overview

The GLM-TTS application consists of:
- **Backend**: Python Flask server that interfaces with the GLM-TTS model
- **Frontend**: React application providing the user interface
- **Model**: GLM-TTS text-to-speech model

## Local Development Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/zai-org/GLM-TTS.git
   cd GLM-TTS
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r backend_requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd tts-frontend
   npm install
   ```

4. **Run the application**
   ```bash
   # From the workspace directory
   ./start_app.sh
   ```

### Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Backend API endpoints**:
  - `POST /api/tts` - Convert text to speech
  - `GET /api/voices` - Get available voices
  - `GET /` - Health check

## Configuration

### Environment Variables

Create a `.env` file in the `tts-frontend` directory:

```
REACT_APP_API_URL=http://localhost:8000
```

## Model Integration

The current implementation includes a placeholder for the GLM-TTS model. To integrate the actual model:

1. Update the `initialize_model()` function in `tts_backend.py`
2. Replace the `generate_audio_from_text()` function with actual model inference
3. Make sure to handle text preprocessing and audio post-processing appropriately

## Production Deployment

### Backend Deployment Options

1. **Using Gunicorn**:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:8000 tts_backend:app
   ```

2. **Using Docker** (recommended):
   Create a Dockerfile for containerized deployment

3. **Cloud Platforms**:
   - Deploy to Heroku, AWS, Google Cloud, or Azure
   - Use serverless options like AWS Lambda or Google Cloud Functions

### Frontend Deployment Options

1. **Static Hosting**:
   - Build the frontend: `npm run build`
   - Host the `dist` folder on CDN or static hosting service

2. **Integration with Backend**:
   - Configure proxy settings if needed
   - Set up proper CORS policies

## Architecture

```
Internet
  ↓
Load Balancer (optional)
  ↓
Frontend (React App)
  ↓
Backend API (Flask)
  ↓
GLM-TTS Model
  ↓
Generated Audio
```

## Security Considerations

- Implement rate limiting to prevent abuse
- Validate and sanitize all inputs
- Use HTTPS in production
- Implement proper authentication if needed
- Sanitize text input to prevent injection attacks

## Performance Optimization

- Implement caching for repeated requests
- Optimize model inference with batching
- Use CDN for static assets
- Implement audio compression if needed
- Consider using GPU acceleration for model inference

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure Flask-CORS is properly configured
2. **Model loading failures**: Check model paths and dependencies
3. **Memory issues**: Monitor resource usage during audio generation
4. **Port conflicts**: Check if ports 8000 and 5173 are available

### Logs

- Backend logs: Check the console output or backend.log
- Frontend logs: Check browser console and npm build output

## Updating the Application

1. Pull latest changes
2. Update dependencies if needed
3. Rebuild the frontend if changes affect the UI
4. Restart services

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support, please open an issue in the GitHub repository or contact the development team.