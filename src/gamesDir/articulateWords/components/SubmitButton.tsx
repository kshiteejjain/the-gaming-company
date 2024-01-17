import { useContext } from "react";
import { GameContext } from "../context/GameContext";

// Define your own type for the context
interface GameContextProps {
  handleClickMergeLetters: () => void;
  error: boolean; // Adjust the type based on your actual context properties
}

export default function SubmitButton() {
  const context = useContext(GameContext) as GameContextProps | undefined;

  if (!context) {
    // Handle the case when the context is not available
    return null;
  }

  const { handleClickMergeLetters, error } = context;

  return (
    <>
      <button
        onClick={handleClickMergeLetters}
        disabled={error ? true : false}
        className={`animate__bounceIn w-full p-2 mt-3 bg-white rounded ${
          error ? "btnDisabled" : ""
        }`}
      >
        Submit
      </button>
    </>
  );
}
