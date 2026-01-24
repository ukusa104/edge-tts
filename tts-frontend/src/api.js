// api.js - API service for TTS functionality

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Generate speech from text using the GLM-TTS backend
 * @param {string} text - Input text to convert to speech
 * @param {Object} voiceSettings - Voice parameters (speed, pitch, etc.)
 * @returns {Promise<Blob>} - Audio blob
 */
export const generateSpeech = async (text, voiceSettings = {}) => {
  try {
    // In a real implementation, you would send the text and settings to your backend
    // For now, we'll simulate an API call
    const response = await fetch(`${API_BASE_URL}/api/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice_settings: voiceSettings
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Return the audio data as a blob
    const audioBlob = await response.blob();
    return audioBlob;
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
};

/**
 * Get available voices from the backend
 * @returns {Promise<Array>} - List of available voices
 */
export const getAvailableVoices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/voices`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw error;
  }
};