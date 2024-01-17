import React from "react";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

type GameContextProps = {
  guessedWords: string[] | undefined; // Change the type to string[] instead of string | undefined
};

const GuessedWordsRecipient: React.FC = () => {
  const { guessedWords } = useContext(GameContext) as GameContextProps;

  if (!guessedWords || guessedWords.length === 0) {
    // Handle the case where guessedWords is undefined or an empty array
    return (
      <h1 className="mt-2 mb-1 font-bold text-white">No guessed words yet!</h1>
    );
  }

  return (
    <>
      <h1 className="mt-2 mb-1 font-bold text-white">Guessed words:</h1>

      <aside className="guessedWordsRecipient animate__bounceIn flex flex-col bg-white">
        {guessedWords.map((word: string, index: number) => (
          <figure key={index} className="guessedWord m-2 p-1 bg-slate-300">
            <span>{word}</span>
          </figure>
        ))}
      </aside>
    </>
  );
};

export default GuessedWordsRecipient;
