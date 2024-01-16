import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ColorMemory from './colorMemory/ColorMemory';
import Tenzies from './tenzies/Tenzies';
import ColorGuesses from './colorGuesses/ColorGuesses';
import TicTacToe from './ticTacToe/TicTacToe';

import './App.css'

function App() {

  return (
    <>
      <React.StrictMode>
      <Router>
      <Routes>
          <Route path="/" element={<ColorMemory />} />
          <Route path="/Tenzies" element={<Tenzies />} />
          <Route path="/ColorGuesses" element={<ColorGuesses />} />
          <Route path="/TicTacToe" element={<TicTacToe />} />
        </Routes>
      </Router>
    </React.StrictMode>
    </>
  )
}

export default App
