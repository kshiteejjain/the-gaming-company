import React from 'react';

type CardProps = {
  value: string;
  suit: string;
  hidden: boolean;
};

const Card: React.FC<CardProps> = ({ value, suit, hidden }) => {
  const getColor = () => {
    if (suit === '♠' || suit === '♣') {
      return 'black'; // Use string directly for color class
    } else {
      return 'red'; // Use string directly for color class
    }
  };

  const getCard = () => {
    if (hidden) {
      return <div className="hiddenCard" />; // Use string directly for class name
    } else {
      return (
        <div className="card">
          <div className={getColor()}>
            <h1 className="value">{value}</h1>
            <h1 className="suit">{suit}</h1>
          </div>
        </div>
      );
    }
  };

  return <>{getCard()}</>;
};

export default Card;
