import React, { useState, useEffect } from 'react';

const Game: React.FC = () => {
    const [targets, setTargets] = useState<{ x: number; y: number }[]>([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        // Generate 20 random targets with x and y coordinates
        const newTargets = Array.from({ length: 20 }, () => ({
            x: Math.random() * (window.innerWidth - 100) + 50,
            y: Math.random() * (window.innerHeight - 125) + 25, // Adjusted y coordinate
        }));
        setTargets(newTargets);
    }, []);

    useEffect(() => {
        // Start the timer if the game is not over
        if (!isGameOver) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime + 100); // Increase time by 100 milliseconds
            }, 100);

            // Clean up the timer
            return () => clearInterval(timer);
        }
    }, [isGameOver]);

    const handleClick = (targetIndex: number) => {
        // Remove the clicked target from the list
        setTargets((prevTargets) => prevTargets.filter((_, index) => index !== targetIndex));

        // Increase the score
        setScore((prevScore) => prevScore + 1);

        // Check if all targets are clicked
        if (score + 1 === 20) {
            setIsGameOver(true);
        }
    };

    const handleReset = () => {
        // Reset the game state
        setScore(0);
        setTime(0);
        setIsGameOver(false);

        // Recreate the targets with new random locations
        const newTargets = Array.from({ length: 20 }, () => ({
            x: Math.random() * (window.innerWidth - 100) + 50,
            y: Math.random() * (window.innerHeight - 125) + 25, // Adjusted y coordinate
        }));
        setTargets(newTargets);
    };

    const formatTime = (time: number) => {
        const seconds = Math.floor(time / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h1>Click the Targets!</h1>
            <p>Score: {score}</p>
            <p>Time: {formatTime(time)} seconds</p>
            <div style={{ position: 'relative' }}>
                {targets.map((target, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: target.x,
                            top: target.y,
                            width: '50px',
                            height: '50px',
                            background: 'red',
                            margin: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
            {isGameOver && (
                <button onClick={handleReset}>Reset</button>
            )}
        </div>
    );
};

export default Game;