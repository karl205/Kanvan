import React, { useState } from "react";
import { FaExclamationCircle, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

function DailyPlanner() {
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    priority: "Low",
  });
  const [editingActivity, setEditingActivity] = useState(null);
  const [error, setError] = useState("");

  const priorities = ["Low", "Medium", "High"];

  const saveToLocalStorage = (data) => {
    localStorage.setItem("activities", JSON.stringify(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = (e) => {
    e.preventDefault();

    if (!newActivity.title || !newActivity.date || !newActivity.time) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const conflict = activities.find(
      (act) => act.date === newActivity.date && act.time === newActivity.time
    );
    if (conflict) {
      setError("Ya existe una actividad programada en esta fecha y hora.");
      return;
    }

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    saveToLocalStorage(updatedActivities);
    setNewActivity({ title: "", description: "", date: "", time: "", priority: "Low" });
    setError("");
  };

  const handleDeleteActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    saveToLocalStorage(updatedActivities);
  };

  const handleEditActivity = (index) => {
    setEditingActivity({ ...activities[index], index });
  };

  const handleUpdateActivity = () => {
    const updatedActivities = activities.map((activity, i) =>
      i === editingActivity.index ? editingActivity : activity
    );
    setActivities(updatedActivities);
    saveToLocalStorage(updatedActivities);
    setEditingActivity(null);
  };

  const sortActivities = (criteria) => {
    const sorted = [...activities].sort((a, b) => {
      if (criteria === "priority") {
        return priorities.indexOf(b.priority) - priorities.indexOf(a.priority);
      }
      if (criteria === "time") {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      }
      return 0;
    });
    setActivities(sorted);
    saveToLocalStorage(sorted);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Planificador Diario</h1>

      {/* Formulario para agregar actividades */}
      <form onSubmit={handleAddActivity} style={{ marginBottom: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
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

      {/* Lista de actividades */}
      <div
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
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
              <h3>
                {activity.title}{" "}
                {activity.priority === "High" && <FaExclamationCircle color="red" />}
                {activity.priority === "Medium" && <FaInfoCircle color="orange" />}
                {activity.priority === "Low" && <FaCheckCircle color="green" />}
              </h3>
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
                onClick={() => handleEditActivity(index)}
                style={{
                  background: "#ffc107",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Editar
              </button>
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

      {/* Modal para editar actividades */}
      {editingActivity && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "80%",
            }}
          >
            <h3>Editar Actividad</h3>
            <input
              type="text"
              name="title"
              value={editingActivity.title}
              onChange={(e) =>
                setEditingActivity((prev) => ({ ...prev, title: e.target.value }))
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <textarea
              name="description"
              value={editingActivity.description}
              onChange={(e) =>
                setEditingActivity((prev) => ({ ...prev, description: e.target.value }))
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="date"
              name="date"
              value={editingActivity.date}
              onChange={(e) =>
                setEditingActivity((prev) => ({ ...prev, date: e.target.value }))
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="time"
              name="time"
              value={editingActivity.time}
              onChange={(e) =>
                setEditingActivity((prev) => ({ ...prev, time: e.target.value }))
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <select
              name="priority"
              value={editingActivity.priority}
              onChange={(e) =>
                setEditingActivity((prev) => ({ ...prev, priority: e.target.value }))
              }
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <button
              onClick={handleUpdateActivity}
              style={{
                width: "100%",
                padding: "10px",
                background: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setEditingActivity(null)}
              style={{
                width: "100%",
                padding: "10px",
                background: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyPlanner;



