import { useState, useEffect, useContext, MouseEvent } from "react";
import { GameContext } from "../context/GameContext"; // Import GameContextProps if you have it defined.

type Letter = {
  id: number;
  value: string;
};

type MatchLetterButtonProps = {
  letter: Letter;
};

export default function MatchLetterButton({ letter }: MatchLetterButtonProps) {
  const { selectedLetters, handleClickLetterBtn, error } =
    useContext(GameContext)!; // Use non-null assertion here.
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedLetters.includes(letter)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedLetters, letter]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    handleClickLetterBtn(e);
  };

  return (
    <>
      <button
        value={letter.id}
        onClick={handleClick}
        disabled={error ? true : false}
        className={`matchLetter animate__bounceIn transition ease-in-out text-white
          ${isSelected ? "bg-blue-800" : "bg-blue-500"}
          ${error ? "letterDisabled" : ""}
        `}
      >
        {letter.value}
      </button>
    </>
  );
}
