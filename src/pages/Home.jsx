import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Welcome to AY Player
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl">
        A modern web-based audio player with a beautiful interface, inspired by 
        Spotify and YouTube Music's design.
      </p>
      <div className="flex gap-4">
        <Link 
          to="/player" 
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
        >
          Try Player
        </Link>
        <Link 
          to="/about" 
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Home; 