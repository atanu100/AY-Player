import React from 'react';
import Player from '../components/Player';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          AY Player
        </h1>
        <Player />
      </div>
    </div>
  );
}

export default Home; 