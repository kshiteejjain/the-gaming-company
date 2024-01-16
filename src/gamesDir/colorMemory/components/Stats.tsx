import '../styles/Stats.css';

type StatsProps = {
    level: number;
    score: number;
    highestScore: number;
  };

export default function Stats({level, score, highestScore}:StatsProps) {
    
    return (
        <div id="stats">
            <h2>Level: {level}</h2>
            <div>
                <h3>Score: {score}</h3>
                <h3>Highest Score: {highestScore}</h3>
            </div>
            <hr/>
        </div>
    )
}