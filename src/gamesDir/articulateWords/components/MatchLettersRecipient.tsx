import { Key, useContext } from "react"
import { GameContext, } from "../context/GameContext"
import MatchLetterButton from "./MatchLetterButton";


export default function MatchLettersRecipient() {

    const gameContext = useContext(GameContext);

    if (!gameContext) {
        // Handle the case when context is not available
        return null;
    }

    const { matchLetters } = gameContext;
    return (
        <>
            <div className="matchLettersRecipient grid grid-cols-3 grid-rows-2 gap-4">
                {matchLetters.map((letter: { id: number; value: string; }, index: Key | null | undefined) => (
                    <MatchLetterButton letter={letter} key={index} />
                ))}

            </div>
        </>
    )
}