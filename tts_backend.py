"""
Backend server for GLM-TTS frontend
Provides API endpoints for text-to-speech conversion
"""
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
import os
import torch
from transformers import AutoTokenizer, AutoModel
import soundfile as sf
import numpy as np
from scipy.io.wavfile import write
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize the GLM-TTS model (placeholder - actual implementation may vary)
# Note: This is a simplified example - actual GLM-TTS integration would differ
def initialize_model():
    """
    Initialize the GLM-TTS model
    This is a placeholder implementation
    """
    print("Initializing GLM-TTS model...")
    # In a real implementation, you would load the actual GLM-TTS model here
    # model = AutoModel.from_pretrained("glm-tts-model")
    # tokenizer = AutoTokenizer.from_pretrained("glm-tts-model")
    # return model, tokenizer
    return None, None

# Global model and tokenizer (in production, consider using a model manager)
model, tokenizer = initialize_model()

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    """
    Convert text to speech using GLM-TTS model
    Expected payload: {"text": "...", "voice_settings": {...}}
    """
    try:
        data = request.get_json()
        text = data.get('text', '')
        voice_settings = data.get('voice_settings', {})
        
        if not text.strip():
            return jsonify({'error': 'Text is required'}), 400
        
        # Apply voice settings (speed, pitch, volume)
        speed = voice_settings.get('speed', 1.0)
        pitch = voice_settings.get('pitch', 1.0)
        volume = voice_settings.get('volume', 1.0)
        
        print(f"Converting text to speech: '{text[:50]}...' with settings: speed={speed}, pitch={pitch}, volume={volume}")
        
        # Placeholder: Generate audio from text using GLM-TTS model
        # In a real implementation, you would call the actual model here
        audio_data = generate_audio_from_text(text, speed, pitch, volume)
        
        # Create a temporary file to store the audio
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
        write(temp_file.name, 22050, audio_data)
        
        # Send the audio file back to the frontend
        return send_file(
            temp_file.name,
            mimetype='audio/wav',
            as_attachment=True,
            download_name='generated_speech.wav'
        )
        
    except Exception as e:
        print(f"Error in text-to-speech: {str(e)}")
        return jsonify({'error': f'Text-to-speech conversion failed: {str(e)}'}), 500

def generate_audio_from_text(text, speed=1.0, pitch=1.0, volume=1.0):
    """
    Generate audio from text using GLM-TTS model
    This is a placeholder implementation
    """
    # In a real implementation, you would use the actual GLM-TTS model
    # For now, we'll return a placeholder audio array
    # This creates a simple tone that gets modified based on the input parameters
    
    duration = len(text) * 0.1  # Approximate duration based on text length
    sample_rate = 22050
    
    # Create a simple tone as a placeholder
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Base frequency (adjust based on pitch)
    base_freq = 440.0 * pitch  # A4 note adjusted by pitch
    
    # Create a complex waveform combining multiple sine waves
    wave = (
        0.3 * np.sin(2 * np.pi * base_freq * t) +
        0.2 * np.sin(2 * np.pi * base_freq * 2 * t) +
        0.1 * np.sin(2 * np.pi * base_freq * 0.5 * t)
    )
    
    # Apply speed adjustment by resampling
    if speed != 1.0:
        # Simple resampling by taking every nth sample
        step = int(1.0 / speed)
        if step < 1:
            step = 1
        wave = wave[::step]
        # Trim to original length approximation
        target_length = int(len(wave) / speed) if speed > 0 else len(wave)
        if target_length > 0:
            wave = np.resize(wave, target_length)
    
    # Apply volume
    wave *= volume
    
    # Normalize to prevent clipping
    wave = np.clip(wave, -1.0, 1.0)
    
    # Convert to 16-bit integers
    audio_data = (wave * 32767).astype(np.int16)
    
    return audio_data

@app.route('/api/voices', methods=['GET'])
def get_voices():
    """
    Get available voices
    """
    voices = [
        {
            'id': 'default',
            'name': 'Default Voice',
            'language': 'English',
            'gender': 'Neutral',
            'description': 'Standard GLM-TTS voice'
        },
        {
            'id': 'male',
            'name': 'Male Voice',
            'language': 'English',
            'gender': 'Male',
            'description': 'Natural male voice'
        },
        {
            'id': 'female',
            'name': 'Female Voice',
            'language': 'English',
            'gender': 'Female',
            'description': 'Natural female voice'
        }
    ]
    return jsonify(voices)

@app.route('/', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({'status': 'healthy', 'service': 'GLM-TTS Backend'})

if __name__ == '__main__':
    print("Starting GLM-TTS backend server...")
    print("Server will be available at http://localhost:8000")
    app.run(host='0.0.0.0', port=8000, debug=True)