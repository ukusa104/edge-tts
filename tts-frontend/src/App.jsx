import { useState, useRef } from 'react';
import { generateSpeech } from './api';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1.0,
    pitch: 1.0,
    volume: 1.0
  });
  const audioRef = useRef(null);

  const generateSpeechHandler = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setAudioUrl(null); // Clear previous audio
    
    try {
      // Call the API to generate speech
      const audioBlob = await generateSpeech(text, voiceSettings);
      
      // Create a URL for the audio blob so it can be played
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error generating speech:', error);
      alert('Error generating speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleVoiceSettingChange = (setting, value) => {
    setVoiceSettings(prev => ({
      ...prev,
      [setting]: parseFloat(value)
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GLM-TTS Text-to-Speech</h1>
        <p>Convert your text to natural-sounding speech</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <textarea
            className="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            rows="6"
          />
          
          <div className="controls">
            <div className="voice-settings">
              <div className="setting-item">
                <label htmlFor="speed">Speed: {voiceSettings.speed.toFixed(1)}x</label>
                <input
                  id="speed"
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceSettings.speed}
                  onChange={(e) => handleVoiceSettingChange('speed', e.target.value)}
                />
              </div>
              
              <div className="setting-item">
                <label htmlFor="pitch">Pitch: {voiceSettings.pitch.toFixed(1)}</label>
                <input
                  id="pitch"
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={voiceSettings.pitch}
                  onChange={(e) => handleVoiceSettingChange('pitch', e.target.value)}
                />
              </div>
              
              <div className="setting-item">
                <label htmlFor="volume">Volume: {voiceSettings.volume.toFixed(1)}</label>
                <input
                  id="volume"
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={voiceSettings.volume}
                  onChange={(e) => handleVoiceSettingChange('volume', e.target.value)}
                />
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`generate-btn ${isLoading ? 'loading' : ''}`}
                onClick={generateSpeechHandler}
                disabled={isLoading || !text.trim()}
              >
                {isLoading ? 'Generating...' : 'Generate Speech'}
              </button>
              
              {audioUrl && (
                <button className="play-btn" onClick={playAudio}>
                  ▶ Play Audio
                </button>
              )}
            </div>
          </div>
        </div>

        {audioUrl && (
          <div className="audio-section">
            <h3>Generated Audio</h3>
            <audio ref={audioRef} src={audioUrl} controls />
          </div>
        )}

        <div className="examples-section">
          <h3>Example Texts</h3>
          <div className="examples-grid">
            <button 
              className="example-btn"
              onClick={() => setText("Hello! Welcome to the GLM-TTS text-to-speech service. This is a demonstration of natural sounding speech synthesis.")}
            >
              Greeting
            </button>
            <button 
              className="example-btn"
              onClick={() => setText("Artificial intelligence is transforming the way we interact with technology. Modern text-to-speech systems can produce remarkably human-like voices.")}
            >
              Technology
            </button>
            <button 
              className="example-btn"
              onClick={() => setText("The weather today is sunny with a high of 75 degrees. Perfect conditions for outdoor activities and enjoying nature's beauty.")}
            >
              Weather
            </button>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Powered by GLM-TTS Model</p>
      </footer>
    </div>
  );
}

export default App
