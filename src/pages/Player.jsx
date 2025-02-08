import React from 'react';
import AudioPlayer from '../components/AudioPlayer';

function Player() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Audio Player
      </h1>
      <AudioPlayer />
    </div>
  );
}

export default Player; 