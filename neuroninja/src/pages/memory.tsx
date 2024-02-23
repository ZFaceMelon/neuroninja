import React, { useState, useEffect } from 'react';

const Grid = () => {
    const [sequence, setSequence] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const [round, setRound] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        generateSequence();
    }, []);

    const generateSequence = () => {
        const newSequence = [];
        for (let i = 1; i <= round; i++) {
            newSequence.push(Math.floor(Math.random() * 9) + 1);
        }
        setSequence(newSequence);
        setUserInput([]);
        setMessage('Watch the sequence!');
        setTimeout(() => {
            setMessage('Your turn!');
        }, round * 1000 + 1000);
    };

    const handleSquareClick = (num: number) => {
        setUserInput((prevInput) => [...prevInput, num]);
    };

    useEffect(() => {
        if (userInput.length === round) {
            checkUserInput();
        }
    }, [userInput]);

    const checkUserInput = () => {
        for (let i = 0; i < round; i++) {
            if (userInput[i] !== sequence[i]) {
                setMessage('Game over! Try again.');
                setRound(1);
                return;
            }
        }
        setMessage('Correct! Next round.');
        setRound((prevRound) => prevRound + 1);
        setTimeout(() => {
            generateSequence();
        }, 2000);
    };

    return (
        <div>
            <div className="grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div
                        key={num}
                        className={`square ${sequence.includes(num) ? 'lit' : ''}`}
                        onClick={() => handleSquareClick(num)}
                        style={{ backgroundColor: sequence.includes(num) ? 'green' : 'red' }}
                    >
                        {num}
                    </div>
                ))}
            </div>
            <div className="message">{message}</div>
        </div>
    );
};

export default Grid;