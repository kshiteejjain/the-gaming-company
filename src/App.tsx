import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ColorMemory from './colorMemory/ColorMemory';

import './App.css'

function App() {

  return (
    <>
      <React.StrictMode>
      <Router>
      <Routes>
          <Route path="/" element={<ColorMemory />} />
        </Routes>
      </Router>
    </React.StrictMode>
    </>
  )
}

export default App
