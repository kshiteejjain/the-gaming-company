import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { Die } from "./components";
import Header from "../components/header/Header";

import './css/style.css';

type DieType = {
  value: number;
  isHeld: boolean;
  id: string;
};

function App(): JSX.Element {
  const [dice, setDice] = useState<DieType[]>(allNewDice());

  const [tenzies, setTenzies] = useState<boolean>(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);

    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("YOU WON !!");
    }
  }, [dice]);

  // Helper Function :
  function generateNewDice(): DieType {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice(): DieType[] {
    const newDice: DieType[] = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : generateNewDice()))
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id: string) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <>
      <Header />
      <main>
        <h1 className="title">Tenzies</h1>
        {tenzies === true && <Confetti />}
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElement}</div>

        <button onClick={rollDice} className="roll-dice">
          {tenzies === true ? "New Game" : "Roll the Dice"}
        </button>
      </main>
    </>
  );
}

export default App;
