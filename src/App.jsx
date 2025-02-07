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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/5">
        {/* Album art and upload section */}
        <div className="mb-8 flex items-center justify-center">
          {audioFile ? (
            <div className="relative group">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-xl">
                <SpeakerWaveIcon className="w-24 h-24 text-white/50" />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer">
                <ArrowUpTrayIcon className="w-12 h-12 text-white" />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <label className="w-48 h-48 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
              <ArrowUpTrayIcon className="w-12 h-12 text-white/50 mb-2" />
              <span className="text-white/50 text-sm">Upload Music</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Error and loading states */}
        {error && (
          <div className="text-red-400 text-sm text-center mb-6">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-blue-400 text-sm text-center mb-6">
            Loading audio...
          </div>
        )}

        {/* Audio player controls */}
        {audioFile && (
          <div className="space-y-6">
            <audio
              ref={audioRef}
              src={audioFile}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleError}
            />

            {/* Song info */}
            <div className="text-center">
              <h2 className="text-white text-lg font-semibold truncate">
                {audioFile.split('/').pop().split('.')[0]}
              </h2>
              <p className="text-white/60 text-sm">Unknown Artist</p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  hover:[&::-webkit-slider-thumb]:bg-blue-500"
              />
              <div className="flex justify-between text-xs text-white/60">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center space-x-6">
              <button className="text-white/60 hover:text-white transition-colors">
                <BackwardIcon className="w-8 h-8" />
              </button>
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <PauseIcon className="w-7 h-7 text-black" />
                ) : (
                  <PlayIcon className="w-7 h-7 text-black ml-1" />
                )}
              </button>
              <button className="text-white/60 hover:text-white transition-colors">
                <ForwardIcon className="w-8 h-8" />
              </button>
            </div>

            {/* Volume control */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white/60 hover:text-white transition-colors"
              >
                {isMuted ? (
                  <SpeakerXMarkIcon className="w-5 h-5" />
                ) : (
                  <SpeakerWaveIcon className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  hover:[&::-webkit-slider-thumb]:bg-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
