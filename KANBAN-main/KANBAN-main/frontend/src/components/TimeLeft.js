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
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );
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
        backgroundColor: "#1e293b", // Fondo azul oscuro
        color: "#e2e8f0", // Texto gris claro
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Sombra
        maxWidth: "500px",
        margin: "auto",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#38bdf8", // Color azul vibrante
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Sombra de texto
        }}
      >
        ⏳ Tiempo Restante
      </h1>
      {["day", "week", "month", "year"].map((key, index) => (
        <div
          key={index}
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#334155", // Fondo más oscuro para las secciones
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#7dd3fc", // Azul claro
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h2>
          <p style={{ fontSize: "1.25rem" }}>
            {key === "day"
              ? `${timeLeft.day.hours}h : ${timeLeft.day.minutes}m : ${timeLeft.day.seconds}s`
              : `${timeLeft[key].days}d : ${timeLeft[key].hours}h : ${timeLeft[key].minutes}m : ${timeLeft[key].seconds}s`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TimeLeft;

