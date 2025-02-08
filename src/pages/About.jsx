import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        About AY Player
      </h1>
      <div className="bg-black/40 backdrop-blur-lg p-8 rounded-2xl">
        <p className="text-lg mb-6">
          AY Player is a modern web-based audio player built with React and Vite, 
          inspired by Spotify and YouTube Music's design.
        </p>
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>Modern UI with glassmorphism design</li>
          <li>Mobile-responsive with touch support</li>
          <li>Audio file upload and playback</li>
          <li>Progress bar with seek functionality</li>
          <li>Volume control with mute option</li>
          <li>Error handling and loading states</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">Tech Stack</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>React 18 with Vite</li>
          <li>Tailwind CSS for styling</li>
          <li>React Router for navigation</li>
          <li>HeroIcons for icons</li>
        </ul>
      </div>
    </div>
  );
}

export default About; 