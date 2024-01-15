import { useEffect, useState } from 'react';
import '../styles/Cards.css';

type Color = {
    hex: string;
    name: string;
    isClicked: boolean;
  };

  type CardsProps = {
    level: number;
    gameState: string;
    setGameState: React.Dispatch<React.SetStateAction<string>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    score: number;
  };

  function Card({ hexCode, name, handleClick }: { hexCode: string; name: string; handleClick: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    return (
        <div className="card" data-color={hexCode} onClick={handleClick}>
            <div className="color" style={{backgroundColor : hexCode}}></div>
            <p className="color-text" style={{color : hexCode}}>{name}</p>
        </div>
    )
}

const randomBetween = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

const shuffleArray = (arr: Color[]) => {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

export default function Cards({level, gameState, setGameState, setScore, score}: CardsProps) {
    const [colorsArray, setColorsArray] = useState<Color[]>([]);

    const generateColorsArray = async (level: number): Promise<void> => {
        let newColors: Color[] = [];
        let previousRGBs: string[] = [];
        for (let i = 0; i < level + 3; i++) {
            let r = randomBetween(0, 254);
            let g = randomBetween(0, 254);
            let b = randomBetween(0, 254);
            let rgb = `${r},${g},${b}`;
            while(previousRGBs.includes(rgb)) {
                r = randomBetween(0, 254);
                g = randomBetween(0, 254);
                b = randomBetween(0, 254);
                rgb = `${r},${g},${b}`;
            }
            previousRGBs.push(rgb);
            const response = await fetch(`https://www.thecolorapi.com/id?rgb=${r},${g},${b}`);
            const data = await response.json();
            newColors = [...newColors, {hex: data.hex.value, name: data.name.value, isClicked: false}];
        }
        setColorsArray(newColors);
    }

    const handleCardClick = (e: any) => {
        const hexCode = e.currentTarget.dataset.color;
        const array = [...colorsArray];
        array.map((color) => {
            if (color.hex === hexCode) {
                if (color.isClicked) {
                    setGameState('game over');
                } else {
                    color.isClicked = true;
                    setScore(score + 1);
                }
            }
        })
        setColorsArray(shuffleArray(array));
        (checkIfAllAreClicked()) && setGameState('next level');
    }

    const checkIfAllAreClicked = () => {
        for(let i = 0; i < colorsArray.length; i++) {
            if (!colorsArray[i].isClicked) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        generateColorsArray(level);
    }, [level]);

    useEffect(() => {
        (gameState === 'new game') && generateColorsArray(level);

        return () => {
            setGameState('');
        }
    }, [gameState, level, setGameState]);

    return (
        <div id="cards">
            {colorsArray.map((color) => {
                return <Card key={color.hex} 
                hexCode={color.hex} 
                name={color.name}
                handleClick={handleCardClick}/>;
            })}
        </div>
    )
}