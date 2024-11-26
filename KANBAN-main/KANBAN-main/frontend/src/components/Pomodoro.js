import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25); // Tiempo de trabajo por defecto
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      if (seconds === 0 && minutes === 0) {
        clearInterval(interval);
        setIsActive(false);
        alert("¡Tiempo terminado!");
      } else {
        interval = setInterval(() => {
          if (seconds === 0) {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds(prevSeconds => prevSeconds - 1);
          }
        }, 1000);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="pomodoro-timer">
      <h1>Pomodoro Timer</h1>
      <div>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button onClick={startTimer}>Iniciar</button>
      <button onClick={stopTimer}>Detener</button>
      <button onClick={resetTimer}>Reiniciar</button>
    </div>

    
  );
};

export default Pomodoro;