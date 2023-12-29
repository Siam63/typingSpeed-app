import React, { useState, useEffect, useRef } from 'react';
import { generate } from 'random-words';
import './App.css';

function App() {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setWords(generate(50));
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    const currentWord = words[wordIndex];
    const isCorrect = currentWord.startsWith(value);
    inputRef.current.style.color = isCorrect ? 'green' : 'red';

    if (isCorrect && value === currentWord) {
      setWordIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
    }
  };

  const handleStart = () => {
    setWordIndex(0);
    setStartTime(new Date());
    setInputValue('');
    inputRef.current.focus();
  };

  const handleReset = () => {
    setWordIndex(0);
    setStartTime(null);
    setInputValue('');
  };

  const calculateSpeed = () => {
    if (!startTime) return 0;

    const endTime = new Date();
    const elapsedTime = (endTime - startTime) / 1000;
    const wordsPerMinute = (wordIndex / elapsedTime) * 60;

    return wordsPerMinute.toFixed(2);
  };

  return (
    <div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p>Words Per Minute: {calculateSpeed()}</p>
      <div>
        {words.map((word, index) => (
          <span key={index}>{index === wordIndex && <span ref={inputRef}>{word}</span>}</span>
        ))}
      </div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </div>
  );
};

export default App;
