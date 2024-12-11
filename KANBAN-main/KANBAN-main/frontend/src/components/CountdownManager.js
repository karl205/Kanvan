import React, { useState, useEffect } from "react";

const CountdownManager = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [newEvent, setNewEvent] = useState({ name: "", date: "" });

  // Calcula el tiempo restante para un evento
  const calculateTimeLeft = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const difference = eventDate - now;

    if (difference <= 0) {
      return "Evento finalizado";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Guardar eventos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Actualiza automáticamente los contadores
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          const updatedTimeLeft = calculateTimeLeft(event.date);

          // Mostrar alerta cuando el evento finalice
          if (updatedTimeLeft === "Evento finalizado" && event.timeLeft !== "Evento finalizado") {
            alert(`El evento "${event.name}" ha finalizado.`);
          }

          return { ...event, timeLeft: updatedTimeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Manejar el envío del formulario
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.name && newEvent.date) {
      setEvents([
        ...events,
        { ...newEvent, id: Date.now(), timeLeft: calculateTimeLeft(newEvent.date) },
      ]);
      setNewEvent({ name: "", date: "" });
    }
  };

  // Manejar la edición de un evento
  const handleEditEvent = (id) => {
    const updatedName = prompt("Nuevo nombre del evento:");
    const updatedDate = prompt("Nueva fecha del evento (YYYY-MM-DD HH:mm):");

    if (updatedName && updatedDate) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id
            ? { ...event, name: updatedName, date: updatedDate, timeLeft: calculateTimeLeft(updatedDate) }
            : event
        )
      );
    }
  };

  // Manejar la eliminación de un evento
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Gestor de Cuentas Regresivas</h1>
      <form onSubmit={handleAddEvent} style={{ marginBottom: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Nombre del evento"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            style={{ padding: "10px", marginRight: "10px", width: "200px" }}
          />
          <input
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            style={{ padding: "10px", marginRight: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 15px", background: "green", color: "white", border: "none" }}>
            Añadir
          </button>
        </div>
      </form>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {events.map((event) => (
          <li
            key={event.id}
            style={{
              background: "#f9f9f9",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{event.name}</h3>
            <p>Fecha: {new Date(event.date).toLocaleString()}</p>
            <p>{event.timeLeft}</p>
            <button
              onClick={() => handleEditEvent(event.id)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                background: "orange",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteEvent(event.id)}
              style={{
                padding: "5px 10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountdownManager;


