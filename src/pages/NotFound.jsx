import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound; 