import '../styles/GameOver.css';

type GameOverProps = {
    highestScore: number;
    overlayStyle: React.CSSProperties;
    modalStyle: React.CSSProperties;
    resetGame: () => void;
  };

export default function GameOver({highestScore, overlayStyle, modalStyle, resetGame}: GameOverProps) {
    return (
        <div id="overlay" style={overlayStyle}>
            <div id="game-over-modal" style={modalStyle}>
                <h2>You lost...</h2>
                <h3>Higherst Score: {highestScore}</h3>
                <p>You clicked the same colour twice.</p>
                <button onClick={resetGame}>Try Again</button>
            </div>
        </div>
    )
}
