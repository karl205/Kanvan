import React, { useState, useEffect } from "react";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Tiempo inicial: 25 minutos
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true); // Alterna entre trabajo y descanso
  const [workDuration, setWorkDuration] = useState(25); // Duración del trabajo en minutos
  const [breakDuration, setBreakDuration] = useState(5); // Duración del descanso en minutos

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handlePeriodEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handlePeriodEnd = () => {
    const nextMode = !isWorkMode;
    const nextDuration = nextMode ? breakDuration : workDuration;

    setIsWorkMode(nextMode);
    setTimeLeft(nextDuration * 60);
    setIsRunning(false);

    // Mostrar notificación
    const modeText = nextMode ? "Descanso" : "Trabajo";
    if (Notification.permission === "granted") {
      new Notification(`¡Hora de ${modeText}!`);
    } else {
      alert(`¡Hora de ${modeText}!`);
    }
  };

  const handleStartPause = () => {
    if (!isRunning) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
    setIsWorkMode(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleDurationChange = (type, value) => {
    const minutes = Math.max(1, Math.min(60, Number(value))); // Rango entre 1 y 60 minutos
    if (type === "work") {
      setWorkDuration(minutes);
      if (isWorkMode) setTimeLeft(minutes * 60);
    } else {
      setBreakDuration(minutes);
      if (!isWorkMode) setTimeLeft(minutes * 60);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-700">
        Pomodoro {isWorkMode ? "Trabajo" : "Descanso"}
      </h1>
      <p className="text-5xl font-bold text-indigo-600 my-6">
        {formatTime(timeLeft)}
      </p>

      <div className="space-x-4">
        <button
          onClick={handleStartPause}
          className={`px-6 py-3 rounded-full text-white font-bold shadow-md transition ${
            isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-full bg-gray-500 text-white font-bold shadow-md hover:bg-gray-600 transition"
        >
          Reiniciar
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-700">Configuración</h2>
        <div className="flex justify-center space-x-4 mt-4">
          <div>
            <label className="block text-sm font-bold text-gray-600">
              Trabajo (min)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={workDuration}
              onChange={(e) => handleDurationChange("work", e.target.value)}
              className="w-16 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600">
              Descanso (min)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={breakDuration}
              onChange={(e) => handleDurationChange("break", e.target.value)}
              className="w-16 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
