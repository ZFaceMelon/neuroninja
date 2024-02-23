import React, { useState, useEffect } from 'react';

const ReactionGame: React.FC = () => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFrozen, setGameFrozen] = useState(false); // New state variable
    const [boxColor, setBoxColor] = useState('green');
    const [message, setMessage] = useState('');

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (gameStarted && boxColor !== 'blue' && !gameFrozen) { // Check if the game is not frozen
            const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
            timer = setTimeout(() => {
                if (Date.now() - time > 750) { // Check if more than 0.75 seconds have passed
                    setBoxColor('red');
                    setTime(Date.now());
                }
            }, randomTime);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [gameStarted, boxColor, gameFrozen]);

    const handleClick = () => {
        if (boxColor === 'red') {
            const reactionTime = Date.now() - time;
            setScore(reactionTime);
            setBoxColor('green');
            setMessage('');
            setGameFrozen(true); // Freeze the game
        } else if (!gameStarted) {
            setGameStarted(true);
        } else if (boxColor === 'green') {
            setBoxColor('blue');
            setMessage('Too Soon!');
        }
    };

    const resetGame = () => {
        setScore(0);
        setTime(0);
        setGameStarted(false);
        setGameFrozen(false); // Unfreeze the game
        setBoxColor('green');
        setMessage('');
    };

    return (
        <div style={{ 
            fontFamily: 'Arial', 
            textAlign: 'center', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // This makes the container take up the full viewport height
            fontSize: '3em' // Increase the text size 3 times
        }}>
            <h1><b>Reaction Game</b></h1>
            <p><b>Score: {score} ms</b></p>
            {!gameStarted ? (
                <button style={{ fontWeight: 'bold' }} onClick={handleClick}>Start Game</button>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '300px', // Increase the width 3 times
                        height: '300px', // Increase the height 3 times
                        backgroundColor: boxColor,
                    }}
                    onClick={handleClick}
                >
                    {message}
                </div>
            )}
            {gameStarted && (
                <div>
                    <button style={{ fontWeight: 'bold' }} onClick={resetGame}>Reset Game</button>
                    {gameFrozen && <p></p>} {/* Display game frozen message */}
                </div>
            )}
        </div>
    );
};

export default ReactionGame;