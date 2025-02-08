import React, { useState, useRef } from 'react';
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/solid';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

/**
 * AY Player - A modern audio player component
 * Features:
 * - Audio file upload and playback
 * - Play/Pause controls
 * - Progress bar with seek functionality
 * - Volume control with mute option
 */
function App() {
  // State management for audio player
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Reference to audio element
  const audioRef = useRef(null);

  // Cleanup audio URL on unmount or file change
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (audioFile) {
          URL.revokeObjectURL(audioFile);
        }
      }
    };
  }, [audioFile]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is audio
      if (!file.type.startsWith('audio/')) {
        setError('Please upload an audio file');
        return;
      }
      
      if (audioFile) {
        URL.revokeObjectURL(audioFile);
      }
      setIsLoading(true);
      setError(null);
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Error handling
  const handleError = (e) => {
    setError('Error playing audio file. Please try another file.');
    setIsLoading(false);
    setIsPlaying(false);
  };

  // Playback controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          setError('Error playing audio: ' + error.message);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Time update handler
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Metadata loaded handler
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    setIsLoading(false);
  };

  // Progress bar control
  const handleProgressChange = (e) => {
    const time = e.target.value;
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  // Volume control
  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    audioRef.current.volume = value;
    setIsMuted(value === 0);
  };

  // Mute toggle
  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Time format utility
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Router>
      <div>
        <nav className="bg-black/60 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-white hover:text-blue-400 transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-white hover:text-blue-400 transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
