# GLM-TTS Frontend

A React-based frontend for the GLM-TTS text-to-speech system that provides an intuitive interface for converting text to natural-sounding speech.

## Features

- Text input area for entering text to convert to speech
- Voice parameter controls (speed, pitch, volume)
- Example text templates
- Audio playback controls
- Responsive design for various screen sizes

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd tts-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory to configure the API endpoint:
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Building for Production

To create a production-ready build, run:

```bash
npm run build
```

The optimized build will be placed in the `dist` folder.

## API Integration

The frontend communicates with the GLM-TTS backend via the following endpoints:

- `POST /api/tts` - Generate speech from text
- `GET /api/voices` - Get available voices

Make sure your backend server is running and accessible at the configured API URL.

## Environment Variables

- `REACT_APP_API_URL` - The base URL for the TTS API backend (default: http://localhost:8000)

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── api.js           # API service functions
└── main.jsx         # Entry point
```

## Technologies Used

- React 18
- Vite
- JavaScript ES6+
- CSS3

## Customization

To customize the voice parameters or UI elements:

1. Modify the voice settings in `App.jsx`
2. Adjust the styling in `App.css`
3. Update the API integration in `api.js`

## Troubleshooting

If you encounter CORS issues during development, ensure your backend server includes proper CORS headers or use a proxy configuration.

For build errors, check that all dependencies are properly installed and that environment variables are correctly set.
