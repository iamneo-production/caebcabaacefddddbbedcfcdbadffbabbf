import React, { useState, useEffect } from "react";
import './Stopwatch.css';
const Stopwatch = () => {
  // state to track the elapsed time
  const [disable, setDisable] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isStarted,setIsStarted]=useState(false);
  const removeVisible = ()=>{
    setVisible((prev)=>!prev);
  }
  const removeDisable= ()=>{
    setDisable(false);
  }
  const enableDisable= ()=>{
    setDisable(true);
  }

  const [time, setTime] = useState(0);
  // state to track whether the stopwatch is running
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    removeDisable();
    removeVisible();
    setIsRunning(true);
    setIsStarted(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setTime(0);
    removeVisible();
    setIsRunning(false);
    enableDisable();
    setIsStarted(false);
  };

  const formattedTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className = "watch_container">
      <h1 align="center">React Stopwatch</h1>
      {/* display the elapsed time */}
      <div className="time_style">
      <h1 data-testid="time" className="timefont">{formattedTime()}</h1></div>
      <div className = "button_con">
      {/* start button */}
        {visible &&(
            <button data-testid="start" onClick={handleStart}>
              Start
            </button>
        )}
        {/* pause button */}
      {isRunning && (
        <button data-testid="pause" onClick={handlePause}>
          Pause
        </button>
      )}
      {/* resume button */}
      {!isRunning && isStarted && (
        <button data-testid="resume" onClick={handleResume}>
          Resume
        </button>
      )}
      { (
        <button data-testid="reset" onClick={handleReset} disabled={disable} className="leftbtn">
            Reset
        </button>
      )}

        </div>
    </div>
  );
};

export default Stopwatch;