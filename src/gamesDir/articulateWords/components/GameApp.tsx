import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import FormingWordLettersRecipient from "./FormingWordLettersRecipient";
import GuessedWordsRecipient from "./GuessedWordsRecipient";
import MatchLettersRecipient from "./MatchLettersRecipient";
import StatsChart from "./StatsChart";
import SubmitButton from "./SubmitButton";

type GameContextProps = {
  setMatch: () => void;
  percentCompleted: number;
  clueCounter: number;
  clueWord: string | null;
  handleClickClueBtn: () => void;
  // Add other properties as needed
};

export default function GameApp() {
  const {
    setMatch,
    percentCompleted,
    clueCounter,
    clueWord,
    handleClickClueBtn,
  } = useContext(GameContext) as GameContextProps;

  const [revealHelp, setRevealHelp] = useState(false);
  return (
    <>
      <main className="flex flex-col pb-3">
        <header className="animate__bounceIn flex flex-col items-center w-full pb-6 text-white">
          <h2 className="text-2xl font-bold">Articulate Words</h2>
          <h3 className="text-base">Created by Kshiteej Jain</h3>
        </header>

        {percentCompleted === 100 ? (
          <>
            <menu className="animate__bounceIn mb-3 self-center">
              <button
                onClick={setMatch}
                className="p-2 bg-green-500 text-white rounded"
              >
                <i className="bi bi-plus" />
                Play new match
              </button>
            </menu>
            <StatsChart />
          </>
        ) : (
          <>
            <section className="statsSection animate__bounceIn flex flex-col">
              <p className="text-white">{percentCompleted}% completed</p>
              <menu className="flex flex-col mt-2 ">
                <p className="remainingClues text-white">
                  Remaining clues: {clueCounter}/3
                </p>
                <div className="flex mt-2">
                  <button
                    onClick={handleClickClueBtn}
                    className="w-28 p-2 text-white bg-green-500  rounded"
                  >
                    <i className="bi bi-search" /> Get clue
                  </button>
                  {clueWord ? (
                    <p className="animate__bounceIn ml-3 p-2 rounded bg-white text-center">
                      <i className="bi bi-chat-text" /> {clueWord}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </menu>
            </section>

            <section className="gameplaySection flex justify-between">
              <section className="sectionA flex flex-col mr-6">
                <GuessedWordsRecipient />
              </section>

              <section className="sectionB flex flex-col justify-around">
                <FormingWordLettersRecipient />
                <MatchLettersRecipient />
                <SubmitButton />
              </section>
            </section>

            <section
              className={`howToSection flex flex-col mt-6 bg-white p-2 rounded transition ease-in-out`}
              style={{ maxWidth: "500px" }}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-900">
                  How to play:{" "}
                </h1>
                <i
                title="Click to reveal"
                  onClick={() => setRevealHelp(!revealHelp)}
                  className={`bi bi-chevron-${revealHelp ?"up" : "down"} bg-blue-600 text-white rounded p-1 hover:cursor-pointer `
                  }
                ></i>
              </div>

              {revealHelp ? (
                <>
                  <hr className="my-2" />

                  <p>
                    The player is given six jumbled letters, and must arrange
                    the letters in the jumble to form as many words of three or
                    more letters as they can.
                  </p>
                  <h1 className="mt-3 text-xl font-bold text-blue-900">
                    Rules:
                  </h1>

                  <h2 className="font-bold text-blue-900">
                    The game will accept:
                  </h2>
                  <ul className="list-disc ml-3">
                    <li>Plural versions of already used words</li>
                  </ul>

                  <h2 className="font-bold mt-3 text-blue-900">
                    The game will not accept:
                  </h2>
                  <ul className="list-disc ml-3">
                    <li>Profanity</li>
                    <li>Words with less than three letters</li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
