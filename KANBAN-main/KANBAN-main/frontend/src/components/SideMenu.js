import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";


import "react-calendar/dist/Calendar.css";
import './SideMenu.css';


const SideMenu = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [events, setEvents] = useState([]); // Lista de eventos
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: "", time: "" });
  const [closestEvent, setClosestEvent] = useState(null);

  // Abrir el calendario
  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  // Manejo de cambios en el formulario de eventos
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Agregar un evento
  const addEvent = () => {
    if (newEvent.title.trim() && newEvent.time.trim()) {
      setEvents([
        ...events,
        { ...newEvent, date: selectedDate.toISOString().split("T")[0] },
      ]);
      setNewEvent({ title: "", time: "" }); // Limpiar el formulario
    }
  };

  // Eliminar un evento
  const deleteEvent = (indexToDelete) => {
    setEvents(events.filter((_, index) => index !== indexToDelete));
  };

  // Buscar el evento más próximo
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const futureEvents = events
      .filter((event) => event.date >= today)
      .sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA - dateTimeB;
      });
    setClosestEvent(futureEvents[0] || null);
  }, [events]);

  return (
    <>
      {/* Menú flotante */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "10px 0 0 10px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <button onClick={toggleCalendar} style={{ padding: "10px 20px" }}>
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </button>
        {closestEvent ? (
          <div
            style={{
              marginTop: "5px",
              textAlign: "center",
              fontSize: "12px",
              color: "#555",
            }}
          >
            <strong>Próximo evento:</strong>
            <p>{closestEvent.title}</p>
            <p>
              {new Date(closestEvent.date).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              a las {closestEvent.time}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: "12px", color: "#555" }}>Sin eventos próximos</p>
        )}
      </div>

      {/* Calendario */}
      {calendarVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <h2>Calendario</h2>
          <Calendar
            onClickDay={(value) => setSelectedDate(value)}
            tileContent={({ date }) => {
              const dateString = date.toISOString().split("T")[0];
              const event = events.find((event) => event.date === dateString);
              return event ? (
                <div
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  {event.title[0]}
                </div>
              ) : null;
            }}
          />
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f2",
            }}
          >
            <h3>Eventos del día</h3>
            {events
              .filter(
                (event) => event.date === selectedDate.toISOString().split("T")[0]
              )
              .map((event, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px",
                    padding: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  <span>
                    {event.title} a las {event.time}
                  </span>
                  <button
                    onClick={() => deleteEvent(events.indexOf(event))}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#d9534f",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
          </div>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>Agregar Evento</h3>
            <p>
              Fecha seleccionada:{" "}
              {selectedDate.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <input
              type="text"
              name="title"
              placeholder="Título del evento"
              value={newEvent.title}
              onChange={handleEventChange}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <input
              type="time"
              name="time"
              placeholder="Hora del evento"
              value={newEvent.time}
              onChange={handleEventChange}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={addEvent}
              style={{
                padding: "8px 16px",
                backgroundColor: "#2d89ef",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Guardar Evento
            </button>
          </div>
          <button
  onClick={toggleCalendar}
  style={{
    position: "absolute", // Posiciona el botón dentro del contenedor
    top: "10px", // Separación desde la parte superior
    right: "10px", // Separación desde la parte derecha
    padding: "8px 16px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  X
</button>
        </div>
      )}
    </>
  );
};

export default SideMenu;





