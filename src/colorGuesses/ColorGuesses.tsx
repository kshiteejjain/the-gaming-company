import React, { useEffect, useState } from "react";
import "./ColorGuesses.css";

type ColorGuessesProps = {};

type ColorGuessable = string[];

const ColorGuesses: React.FC<ColorGuessesProps> = () => {
  const [randomColors, setRandomColors] = useState<ColorGuessable>([]);
  const [guessColor, setGuessColor] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<string>("");
  const [newGame, setNewGame] = useState<boolean>(false);

  useEffect(() => {
    const newGameHandler = () => {
      const guessableColor = generateRandomColor();
      const randomNumber = Math.floor(Math.random() * 3);

      setGuessColor(guessableColor[randomNumber]);
      setRandomColors(guessableColor);
    };

    const timeoutId = setTimeout(() => {
      setIsCorrect("");
      newGameHandler();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [newGame]);

  // Functions
  const handleColorGuess = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedColor = e.currentTarget.value;

    if (selectedColor === guessColor) {
      setIsCorrect("yes");
      setNewGame((prev) => !prev);
    } else {
      setIsCorrect("no");
    }
  };

  const generateRandomColor = (): ColorGuessable => {
    const colorArray: ColorGuessable = [];

    for (let i = 0; i < 3; i++) {
      const color =
        "#" +
        Math.floor(Math.random() * (256 * 256 * 256))
          .toString(16)
          .padStart(6, "0");
      colorArray.push(color);
    }
    return colorArray;
  };

  return (
    <div className="App">
      <h1>Guess the color</h1>
      <div className="color-cont" style={{ backgroundColor: guessColor }}></div>
      <div className="button-group-cont">
        {randomColors.map((color, idx) => (
          <button
            value={color}
            key={idx}
            onClick={handleColorGuess}
          >
            {color}
          </button>
        ))}
      </div>
      <h4 className="lbl-guess-checker">
        {isCorrect === "yes" ? "Correct! ✅" : isCorrect === "no" ? "Bad guess ❌" : null}
      </h4>
    </div>
  );
};

export default ColorGuesses;
