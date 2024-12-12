import React, { useState, useEffect } from "react";

const Pomodoro = () => {
  const [workTime, setWorkTime] = useState(() => {
    const savedWorkTime = localStorage.getItem("pomodoroWorkTime");
    return savedWorkTime ? JSON.parse(savedWorkTime) : 25; // minutos de trabajo
  });
  const [breakTime, setBreakTime] = useState(() => {
    const savedBreakTime = localStorage.getItem("pomodoroBreakTime");
    return savedBreakTime ? JSON.parse(savedBreakTime) : 5; // minutos de descanso
  });
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const savedTimeRemaining = localStorage.getItem("pomodoroTimeRemaining");
    return savedTimeRemaining ? JSON.parse(savedTimeRemaining) : 25 * 60; // tiempo restante en segundos
  });
  const [isWorking, setIsWorking] = useState(() => {
    const savedIsWorking = localStorage.getItem("pomodoroIsWorking");
    return savedIsWorking ? JSON.parse(savedIsWorking) : true;
  });
  const [isActive, setIsActive] = useState(() => {
    const savedIsActive = localStorage.getItem("pomodoroIsActive");
    return savedIsActive ? JSON.parse(savedIsActive) : false;
  });

  // Guardar estado en localStorage
  useEffect(() => {
    localStorage.setItem("pomodoroWorkTime", JSON.stringify(workTime));
    localStorage.setItem("pomodoroBreakTime", JSON.stringify(breakTime));
    localStorage.setItem("pomodoroTimeRemaining", JSON.stringify(timeRemaining));
    localStorage.setItem("pomodoroIsWorking", JSON.stringify(isWorking));
    localStorage.setItem("pomodoroIsActive", JSON.stringify(isActive));
  }, [workTime, breakTime, timeRemaining, isWorking, isActive]);

  // Manejar temporizador
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Mostrar mensaje en ventana emergente
            alert(`Terminó su tiempo de ${isWorking ? "trabajo" : "descanso"}`);
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
      <h2>{isWorking ? "Tiempo de Trabajo" : "Tiempo de Descanso"}</h2>
      <div>
        {Math.floor(timeRemaining / 60)}:
        {("0" + (timeRemaining % 60)).slice(-2)}
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
      <button onClick={handleStart} disabled={isActive}>
        Iniciar
      </button>
      <button onClick={handlePause} disabled={!isActive}>
        Pausar
      </button>
      <button onClick={handleReset}>Reiniciar</button>
    </div>
  );
};

export default Pomodoro;

