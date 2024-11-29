import React, { useState } from "react";

function DailyPlanner() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    priority: "Low",
  });

  const priorities = ["Low", "Medium", "High"];

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar nueva actividad
  const handleAddActivity = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!newActivity.title || !newActivity.date || !newActivity.time) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Comprobar conflictos de hora y fecha
    const conflict = activities.find(
      (act) => act.date === newActivity.date && act.time === newActivity.time
    );
    if (conflict) {
      alert("Ya existe una actividad programada en esta fecha y hora.");
      return;
    }

    setActivities((prev) => [...prev, newActivity]);
    setNewActivity({ title: "", description: "", date: "", time: "", priority: "Low" });
  };

  // Eliminar actividad
  const handleDeleteActivity = (index) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  // Ordenar actividades por prioridad u hora
  const sortActivities = (criteria) => {
    const sorted = [...activities].sort((a, b) => {
      if (criteria === "priority") {
        return priorities.indexOf(b.priority) - priorities.indexOf(a.priority);
      }
      if (criteria === "time") {
        // Crear objetos Date válidos para comparación
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB; // Ordenar por fecha y hora
      }
      return 0;
    });
    setActivities(sorted);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Planificador Diario</h1>
      {/* Formulario para agregar actividades */}
      <form onSubmit={handleAddActivity} style={{ marginBottom: "20px" }}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={newActivity.title}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={newActivity.description}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={newActivity.date}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            name="time"
            value={newActivity.time}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Prioridad:</label>
          <select
            name="priority"
            value={newActivity.priority}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Agregar Actividad
        </button>
      </form>

      {/* Opciones de Ordenamiento */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => sortActivities("priority")} style={{ marginRight: "10px" }}>
          Ordenar por Prioridad
        </button>
        <button onClick={() => sortActivities("time")}>Ordenar por Hora</button>
      </div>

      {/* Lista de actividades con barra desplazadora */}
      <div
        style={{
          maxHeight: "200px", // Altura máxima fija
          overflowY: "auto", // Habilitar scroll vertical
          border: "1px solid #ddd", // Opcional: para un borde visual
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "#f8f9fa", // Fondo opcional
        }}
      >
        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          {activities.map((activity, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor:
                  activity.priority === "High"
                    ? "#f8d7da"
                    : activity.priority === "Medium"
                    ? "#fff3cd"
                    : "#d4edda",
              }}
            >
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <p>
                <strong>Fecha:</strong> {activity.date}
              </p>
              <p>
                <strong>Hora:</strong> {activity.time}
              </p>
              <p>
                <strong>Prioridad:</strong> {activity.priority}
              </p>
              <button
                onClick={() => handleDeleteActivity(index)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DailyPlanner;

