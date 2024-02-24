import React, { useState, useEffect } from 'react';

const passages = [
    'The quick brown fox jumps over the lazy dog.',
    'Sphinx of black quartz, judge my vow.',
    'Pack my box with five dozen liquor jugs.',
    'How vexingly quick daft zebras jump!',
    'Bright vixens jump; dozy fowl quack.',
];

const TypingSpeedTest: React.FC = () => {
    const [currentPassage, setCurrentPassage] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);

    useEffect(() => {
        generatePassage();
    }, []);

    const generatePassage = () => {
        const randomIndex = Math.floor(Math.random() * passages.length);
        setCurrentPassage(passages[randomIndex]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUserInput(value);

        if (value === currentPassage && !isTimerStarted) {
            setEndTime(Date.now());
            clearInterval(timer!);
        } else if (value !== '' && !isTimerStarted) {
            setStartTime(Date.now());
            setIsTimerStarted(true);
            setTimer(setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000));
        } else if (value === '' && isTimerStarted) {
            setIsTimerStarted(false);
            clearInterval(timer!);
        }
    };

    const handleStartTest = () => {
        setStartTime(Date.now());
        setEndTime(0);
        setUserInput('');
        generatePassage();
        clearInterval(timer!); // Reset the timer
        setElapsedTime(0); // Reset the elapsed time
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (userInput === currentPassage) {
                setEndTime(Date.now());
                clearInterval(timer!);
            }
        }
    };

    useEffect(() => {
        if (endTime > 0) {
            const timeInSeconds = (endTime - startTime) / 1000;
            console.log(`Time taken: ${timeInSeconds} seconds`);
        }
    }, [endTime]);

    return (
        <div>
            <h1>Typing Speed Test</h1>
            <p>{currentPassage}</p>
            <input type="text" value={userInput} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <p>Elapsed Time: {elapsedTime} seconds</p>
            <button onClick={handleStartTest}>Start Test</button>
        </div>
    );
};

export default TypingSpeedTest;