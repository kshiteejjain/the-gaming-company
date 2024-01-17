import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ColorMemory from './gamesDir/colorMemory/ColorMemory';
import Tenzies from './gamesDir/tenzies/Tenzies';
import ColorGuesses from './gamesDir/colorGuesses/ColorGuesses';
import TicTacToe from './gamesDir/ticTacToe/TicTacToe';
import BlackJackCards from './gamesDir/blackJackCards/BlackJackCards';
import ArticulateWords from './gamesDir/articulateWords/ArticulateWords';

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
          <Route path="/BlackJackCards" element={<BlackJackCards />} />
          <Route path="/ArticulateWords" element={<ArticulateWords />} />
        </Routes>
      </Router>
    </React.StrictMode>
    </>
  )
}

export default App
