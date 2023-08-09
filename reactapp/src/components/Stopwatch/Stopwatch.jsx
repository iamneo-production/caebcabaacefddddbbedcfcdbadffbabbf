import React, { useState, useEffect } from 'react';
import "./Stopwatch.css"

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pausedTime, setPausedTime] = useState(null);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((Date.now() - startTime) + (pausedTime || 0));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime, pausedTime]);

  const handleStart = () => {
    setStartTime(Date.now());
    setPausedTime(null);
    setIsRunning(true);
  };

  const handlePause = () => {
    setPausedTime(time);
    setIsRunning(false);
  };

  const handleResume = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
    setPausedTime(null);
    setTime(0);
  };

  const formattedTime = new Date(time).toISOString().substr(11, 8);

  return (
    <div className='over-all'>
        <h1>React Stopwatch</h1>
      <p data-testid="time">{formattedTime}</p>
      <div className="buttons">
      {isRunning ? 
        <button data-testid="pause" onClick={handlePause}>Pause</button> :
        startTime ? 
          <button data-testid="resume" onClick={handleResume}>Resume</button> : 
          <button data-testid="start" onClick={handleStart}>Start</button>
      }
      <button data-testid="reset" onClick={handleReset} disabled={!startTime}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;