import GameApp from "./components/GameApp";
import Header from "../../components/header/Header";

import './ArticulateWords.css';

import { GameProvider } from "./context/GameContext";


function ArticulateWords() {
  return (
    <><Header />
      <GameProvider>
        <div className="articulateWords">
          <GameApp />
        </div>
      </GameProvider>
    </>
  );
}

export default ArticulateWords;
