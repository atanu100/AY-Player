import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Player from './pages/Player';
import About from './pages/About';
import NotFound from './pages/NotFound';

/**
 * AY Player - A modern audio player component
 * Features:
 * - Audio file upload and playback
 * - Play/Pause controls
 * - Progress bar with seek functionality
 * - Volume control with mute option
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<Player />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
