import React, { createContext, useEffect, useState } from "react";
import { gameLetters } from "../utils/letters";
import { gameWords } from "../utils/words";

type Letter = {
  id: number;
  value: string;
}

export interface GameContextProps {
  setMatch: () => void;
  matchLetters: { id: number; value: string }[];
  matchWords: string[];
  selectedLetters: Letter[];
  guessedWords: string[];
  clueCounter: number;
  clueWord: string | null;
  guessingAttempts: number;
  percentCompleted: number;
  handleClickLetterBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickMergeLetters: () => void;
  handleClickClueBtn: () => void;
  error: string | null;
}


export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  const [matchLetters, setMatchLetters] = useState<Letter[]>([]);
  const [matchWords, setMatchWords] = useState<string[]>([]);

  const [selectedLetters, setSelectedLetters] = useState<Letter[]>([]);

  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  const [percentCompleted, setPercentCompleted] = useState<number>(0);

  const [clueCounter, setClueCounter] = useState<number>(3);
  const [clueWord, setClueWord] = useState<string | null>(null);

  const [guessingAttempts, setGuessingAttempts] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const setMatch = () => {
    setMatchLetters([]);
    setMatchWords([]);
    setGuessedWords([]);
    setSelectedLetters([]);
    setGuessingAttempts(0);
    setClueCounter(3);
    setClueWord(null);
    setError(null);
    setPercentCompleted(0);

    const randInt = Math.floor(Math.random() * 5);
    let objectLetters: Letter[] = [];
    gameLetters[randInt].forEach((letter, index) => {
      objectLetters.push({ id: index, value: letter });
    });

    setMatchLetters(objectLetters);

    let upperCasedWords: string[] = [];
    gameWords[randInt].forEach((word) => {
      upperCasedWords.push(word.toUpperCase());
    });

    setMatchWords(upperCasedWords);
  };

  const resetError = () => {
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  useEffect(() => {
    setMatch();
  }, []);

  useEffect(() => {}, [error]);

  const handleClickLetterBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.value);
    let letter = matchLetters.find((letter) => letter.id === id);
    console.log(letter);
    if (letter && !selectedLetters.includes(letter)) {
      setSelectedLetters([...selectedLetters, letter]);
    } else {
      if (letter) {
        const index = selectedLetters.findIndex((selectedLetter) => selectedLetter.id === id);
        const updatedSelectedLetters = [...selectedLetters];
        updatedSelectedLetters.splice(index, 1);
        setSelectedLetters(updatedSelectedLetters);
      }
    }
  };

  const handleClickMergeLetters = () => {
    let lettersValues: string[] = [];
    selectedLetters.forEach((letter) => lettersValues.push(letter.value));
    console.log(lettersValues);
    let formedWord = lettersValues.join("");
    console.log(formedWord);
    if (matchWords.includes(formedWord)) {
      if (guessedWords.includes(formedWord)) {
        setSelectedLetters([]);
        setError("Word already guessed!");
        resetError();
        setGuessingAttempts(guessingAttempts + 1);
      } else {
        setError(null);
        setSelectedLetters([]);
        setGuessedWords([...guessedWords, formedWord]);
        setPercentCompleted(percentCompleted + 5);
      }
    } else {
      setSelectedLetters([]);
      setError("Incorrect word!");
      resetError();
      setGuessingAttempts(guessingAttempts + 1);
    }
  };

  const handleClickClueBtn = () => {
    if (clueCounter > 0) {
      let randInt = Math.floor(Math.random() * matchWords.length);

      if (guessedWords.includes(matchWords[randInt])) {
        randInt -= 1;
        setClueWord(matchWords[randInt]);
      } else {
        setClueWord(matchWords[randInt]);
      }

      setClueCounter(clueCounter - 1);
    }
  };

  return (
    <GameContext.Provider
      value={{
        setMatch,
        matchLetters,
        matchWords,
        selectedLetters,
        guessedWords,
        clueCounter,
        clueWord,
        guessingAttempts,
        percentCompleted,
        handleClickLetterBtn,
        handleClickMergeLetters,
        handleClickClueBtn,
        error,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
