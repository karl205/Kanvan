import React, { useState, useEffect } from "react";

const TimeLeft = () => {
  const [timeLeft, setTimeLeft] = useState({
    year: {},
    month: {},
    week: {},
    day: {},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();

    // Tiempo restante para el final del día
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const dayDiff = endOfDay - now;

    // Tiempo restante para el final de la semana
    const dayOfWeek = now.getDay(); // 0 (domingo) a 6 (sábado)
    const endOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (7 - dayOfWeek),
      0,
      0,
      0,
      0
    );
    const weekDiff = endOfWeek - now;

    // Tiempo restante para el final del mes
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const monthDiff = endOfMonth - now;

    // Tiempo restante para el final del año
    const endOfYear = new Date(now.getFullYear() + 1, 0, 0, 23, 59, 59);
    const yearDiff = endOfYear - now;

    setTimeLeft({
      day: {
        hours: Math.floor(dayDiff / (1000 * 60 * 60)),
        minutes: Math.floor((dayDiff / (1000 * 60)) % 60),
        seconds: Math.floor((dayDiff / 1000) % 60),
      },
      week: {
        days: Math.floor(weekDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((weekDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((weekDiff / (1000 * 60)) % 60),
        seconds: Math.floor((weekDiff / 1000) % 60),
      },
      month: {
        days: Math.floor(monthDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((monthDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((monthDiff / (1000 * 60)) % 60),
        seconds: Math.floor((monthDiff / 1000) % 60),
      },
      year: {
        days: Math.floor(yearDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((yearDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((yearDiff / (1000 * 60)) % 60),
        seconds: Math.floor((yearDiff / 1000) % 60),
      },
    });
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "'Roboto', Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#121212",
        color: "#f5f5f5",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#03dac5" }}>
        ⏳ Tiempo Restante
      </h1>
      <div style={{ marginBottom: "15px" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#bb86fc" }}>Hoy</h2>
        <p style={{ fontSize: "1.25rem" }}>
          {timeLeft.day.hours}h : {timeLeft.day.minutes}m : {timeLeft.day.seconds}s
        </p>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#bb86fc" }}>Semana</h2>
        <p style={{ fontSize: "1.25rem" }}>
          {timeLeft.week.days}d : {timeLeft.week.hours}h : {timeLeft.week.minutes}m : {timeLeft.week.seconds}s
        </p>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#bb86fc" }}>Mes</h2>
        <p style={{ fontSize: "1.25rem" }}>
          {timeLeft.month.days}d : {timeLeft.month.hours}h : {timeLeft.month.minutes}m : {timeLeft.month.seconds}s
        </p>
      </div>
      <div>
        <h2 style={{ fontSize: "1.5rem", color: "#bb86fc" }}>Año</h2>
        <p style={{ fontSize: "1.25rem" }}>
          {timeLeft.year.days}d : {timeLeft.year.hours}h : {timeLeft.year.minutes}m : {timeLeft.year.seconds}s
        </p>
      </div>
    </div>
  );
};

export default TimeLeft;

