import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25); // minutos de trabajo
  const [breakTime, setBreakTime] = useState(5); // minutos de descanso
  const [timeRemaining, setTimeRemaining] = useState(workTime * 60); // tiempo restante en segundos
  const [isWorking, setIsWorking] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Mostrar mensaje en ventana emergente
            alert(`Terminó su tiempo de ${isWorking ? 'trabajo' : 'descanso'}`);
            setIsWorking(!isWorking);
            return isWorking ? breakTime * 60 : workTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive && timeRemaining !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, isWorking, workTime, breakTime]);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsWorking(true);
    setTimeRemaining(workTime * 60);
  };

  return (
    <div>
      <h2>{isWorking ? 'Tiempo de Trabajo' : 'Tiempo de Descanso'}</h2>
      <div>
        {Math.floor(timeRemaining / 60)}:{('0' + (timeRemaining % 60)).slice(-2)}
      </div>
      
      {/* Inputs para editar los intervalos de trabajo y descanso */}
      <div>
        <label>
          Tiempo de trabajo (min):
          <input 
            type="number" 
            value={workTime} 
            min="1" 
            onChange={(e) => setWorkTime(Number(e.target.value))} 
          />
        </label>
        <label>
          Tiempo de descanso (min):
          <input 
            type="number" 
            value={breakTime} 
            min="1" 
            onChange={(e) => setBreakTime(Number(e.target.value))} 
          />
        </label>
      </div>
      
      {/* Botones de control */}
      <button onClick={handleStart} disabled={isActive}>Iniciar</button>
      <button onClick={handlePause} disabled={!isActive}>Pausar</button>
      <button onClick={handleReset}>Reiniciar</button>
    </div>
  );
};

export default PomodoroTimer;