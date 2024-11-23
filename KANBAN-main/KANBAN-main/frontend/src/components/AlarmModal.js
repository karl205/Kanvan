import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/alarms"; // Cambia esto por tu endpoint.

const AlarmModal = ({ isOpen, setIsOpen }) => {
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [activeAlarm, setActiveAlarm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar alarmas desde la API al montar el componente.
  useEffect(() => {
    if (isOpen) {
      fetchAlarms();
    }
  }, [isOpen]);

  const fetchAlarms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setAlarms(response.data); // Asume que el API devuelve un array de alarmas.
    } catch (err) {
      setError("Error al cargar las alarmas. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAlarm = async () => {
    if (!newAlarm.trim()) return;

    try {
      // Suponiendo que 'message' sea algo fijo o lo puedes tomar de algún lado.
    const response = await axios.post(API_URL, { time: newAlarm, message: "Alarma programada" });
    setAlarms([...alarms, response.data]); // Agrega la nueva alarma devuelta por la API.
    setNewAlarm("");
  } catch (err) {
    setError("Error al agregar la alarma. Inténtalo de nuevo.");
  }
  };

  const handleUpdateAlarm = async (index) => {
    const updatedAlarm = alarms[index];
    try {
      await axios.put(`${API_URL}/${updatedAlarm.id}`, updatedAlarm);
      setEditIndex(null);
    } catch (err) {
      setError("Error al actualizar la alarma. Inténtalo de nuevo.");
    }
  };

  const handleDeleteAlarm = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setAlarms(alarms.filter((alarm) => alarm.id !== id));
    } catch (err) {
      setError("Error al eliminar la alarma. Inténtalo de nuevo.");
    }
  };

  const handleCloseNotification = () => {
    setActiveAlarm(null);
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Gestionar Alarmas</h2>

          {/* Mostrar errores */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Input para nueva alarma */}
          <div>
            <input
              type="time"
              value={newAlarm}
              onChange={(e) => setNewAlarm(e.target.value)}
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <button
              onClick={handleAddAlarm}
              style={{
                padding: "5px 10px",
                backgroundColor: "#635fc7",
                color: "white",
                borderRadius: "4px",
              }}
            >
              Agregar
            </button>
          </div>

          {/* Lista de alarmas */}
          {loading ? (
            <p>Cargando alarmas...</p>
          ) : (
            <>
              {alarms.length > 0 && (
                <>
                  <h3
                    style={{
                      marginTop: "15px",
                      marginBottom: "10px",
                      color: "#333",
                      fontSize: "16px",
                    }}
                  >
                    Alarmas existentes:
                  </h3>
                  <ul style={{ marginTop: "5px" }}>
                    {alarms.map((alarm, index) => (
                      <li
                        key={alarm.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "5px",
                        }}
                      >
                        {editIndex === index ? (
                          <input
                            type="time"
                            value={alarm.time}
                            onChange={(e) => {
                              const updatedAlarms = [...alarms];
                              updatedAlarms[index].time = e.target.value;
                              setAlarms(updatedAlarms);
                            }}
                          />
                        ) : (
                          <span>{alarm.time}</span>
                        )}
                        <div>
                          {editIndex === index ? (
                            <button
                              onClick={() => handleUpdateAlarm(index)}
                              style={{
                                marginRight: "10px",
                                color: "green",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                              }}
                            >
                              Guardar
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditIndex(index)}
                              style={{
                                marginRight: "10px",
                                color: "blue",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                              }}
                            >
                              Editar
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteAlarm(alarm.id)}
                            style={{
                              color: "red",
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}

          <button
            onClick={() => setIsOpen(false)}
            style={{
              marginTop: "20px",
              padding: "5px 10px",
              backgroundColor: "#635fc7",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Modal de notificación */}
      {activeAlarm && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>¡Alarma!</h2>
          <p style={{ fontSize: "16px" }}>Es la hora: {activeAlarm.time}</p>
          <button
            onClick={handleCloseNotification}
            style={{
              marginTop: "20px",
              padding: "5px 10px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Cerrar y eliminar alarma
          </button>
        </div>
      )}
    </>
  );
};

export default AlarmModal;

  
    



