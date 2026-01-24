# GLM-TTS Web Application

A complete web application for the GLM-TTS text-to-speech system featuring a React frontend and Python backend.

## Overview

This project provides a complete solution for deploying the GLM-TTS text-to-speech model with:
- An intuitive React-based frontend interface
- A Python Flask backend that interfaces with the GLM-TTS model
- Real-time text-to-speech conversion
- Voice customization options (speed, pitch, volume)

## Features

### Frontend
- Modern React interface with Vite
- Text input area with example templates
- Voice parameter controls (speed, pitch, volume)
- Audio playback functionality
- Responsive design for all devices
- Real-time feedback

### Backend
- Flask API server
- RESTful endpoints for TTS conversion
- CORS support for frontend communication
- Audio file generation and delivery
- Voice parameter processing

## Project Structure

```
/workspace/
├── GLM-TTS/                 # Original GLM-TTS repository
├── tts-frontend/            # React frontend application
│   ├── src/
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # Application styles
│   │   └── api.js          # API service functions
│   └── ...
├── tts_backend.py           # Python Flask backend server
├── backend_requirements.txt # Backend Python dependencies
├── start_app.sh             # Startup script
├── DEPLOYMENT_GUIDE.md      # Complete deployment documentation
└── README.md               # This file
```

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Installation

1. **Install Python dependencies**:
   ```bash
   pip install -r backend_requirements.txt
   ```

2. **Set up the frontend**:
   ```bash
   cd tts-frontend
   npm install
   ```

3. **Start the application**:
   ```bash
   ./start_app.sh
   ```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

## Usage

1. Enter text in the input field
2. Adjust voice parameters (speed, pitch, volume) as needed
3. Click "Generate Speech" to convert text to audio
4. Use the play button to listen to the generated audio
5. Try example texts for quick demonstrations

## Customization

### Frontend
- Modify `tts-frontend/src/App.jsx` to change UI components
- Update `tts-frontend/src/App.css` for styling changes
- Edit `tts-frontend/src/api.js` for API integration updates

### Backend
- Update `tts_backend.py` to integrate with the actual GLM-TTS model
- Add new API endpoints as needed
- Modify voice processing logic

## Deployment

For production deployment, refer to the complete guide in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## Technologies Used

- **Frontend**: React, Vite, JavaScript, CSS
- **Backend**: Python, Flask, Transformers
- **Model**: GLM-TTS (placeholder implementation included)
- **Audio Processing**: NumPy, SciPy, LibROSA

## Next Steps for Full Implementation

1. Replace the placeholder model in `tts_backend.py` with the actual GLM-TTS model
2. Implement proper text preprocessing for the GLM-TTS model
3. Add voice selection capabilities
4. Implement audio quality improvements
5. Add user authentication if needed
6. Set up proper logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

See the original GLM-TTS repository for licensing information.

## Support

For issues with this specific implementation, please open an issue in this repository.
For GLM-TTS model-specific questions, refer to the original repository.
