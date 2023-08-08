import React, { useState, useRef } from 'react';
import "./Stopwatch.css";

const Stopwatch = () => {

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const formatTime = (time) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1000);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1000);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return (
    <div className="stopwatch-container">
    <h1>React Stopwatch</h1>
      <div className="stopwatch-timer">
      
        <h1 data-testid="time">{formatTime(timer)}</h1>
      </div>
      <div className="stopwatch-buttons">
        {!isActive && (
          <button data-testid="start" onClick={handleStart}>
            Start
          </button>
        )}
        {isActive && !isPaused && (
          <button data-testid="pause" onClick={handlePause}>
            Pause
          </button>
        )}
        {isActive && isPaused && (
          <button data-testid="resume" onClick={handleResume}>
            Resume
          </button>
        )}
        <button data-testid="reset" onClick={handleReset} disabled={!isActive}
        style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;