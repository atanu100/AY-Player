import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          About AY Player
        </h1>
        <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-lg p-6 rounded-2xl text-white">
          <p className="mb-4">
            AY Player is a modern web-based audio player built with React and Vite, 
            inspired by Spotify and YouTube Music's design.
          </p>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modern UI with glassmorphism design</li>
            <li>Mobile-responsive with touch support</li>
            <li>Audio file upload and playback</li>
            <li>Progress bar with seek functionality</li>
            <li>Volume control with mute option</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About; 