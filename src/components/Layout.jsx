import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <nav className="bg-black/60 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              AY Player
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link to="/player" className="text-white hover:text-blue-400 transition-colors">
                Player
              </Link>
              <Link to="/about" className="text-white hover:text-blue-400 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default Layout; 