import React, { useState, useEffect } from "react";

const AlarmModal = ({ isOpen, setIsOpen, alarms, setAlarms }) => {
  const [newAlarm, setNewAlarm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [activeAlarm, setActiveAlarm] = useState(null);

  // Agregar o editar alarma
  const addOrEditAlarm = () => {
    if (newAlarm.trim()) {
      if (editIndex !== null) {
        // Editar alarma
        const updatedAlarms = [...alarms];
        updatedAlarms[editIndex] = newAlarm;
        setAlarms(updatedAlarms);
        setEditIndex(null);
      } else {
        // Agregar nueva alarma
        setAlarms([...alarms, newAlarm]);
      }
      setNewAlarm("");
    }
  };

  // Eliminar una alarma
  const deleteAlarm = (index) => {
    const updatedAlarms = alarms.filter((_, i) => i !== index);
    setAlarms(updatedAlarms);
  };

  // Revisar si alguna alarma coincide con la hora actual
  useEffect(() => {
    const checkAlarms = () => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const alarm = alarms.find((alarm) => alarm === currentTime);
      if (alarm) {
        setActiveAlarm(alarm); // Mostrar notificación
        deleteAlarm(alarms.indexOf(alarm)); // Eliminar alarma cumplida
      }
    };

    const interval = setInterval(checkAlarms, 1000); // Revisar cada segundo
    return () => clearInterval(interval);
  }, [alarms]);

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
          <div>
            <input
              type="time"
              value={newAlarm}
              onChange={(e) => setNewAlarm(e.target.value)}
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <button
              onClick={addOrEditAlarm}
              style={{
                padding: "5px 10px",
                backgroundColor: "#635fc7",
                color: "white",
                borderRadius: "4px",
              }}
            >
              {editIndex !== null ? "Guardar" : "Agregar"}
            </button>
          </div>

          {/* Lista de alarmas */}
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
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <span>{alarm}</span>
                    <div>
                      <button
                        onClick={() => {
                          setNewAlarm(alarm);
                          setEditIndex(index);
                        }}
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
                      <button
                        onClick={() => deleteAlarm(index)}
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
          <p style={{ fontSize: "16px" }}>Es la hora: {activeAlarm}</p>
          <button
            onClick={() => setActiveAlarm(null)}
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

const ParentComponent = () => {
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [alarms, setAlarms] = useState([]);

  return (
    <div>
      <button onClick={() => setIsAlarmModalOpen(true)}>Abrir Alarmas</button>
      <AlarmModal
        isOpen={isAlarmModalOpen}
        setIsOpen={setIsAlarmModalOpen}
        alarms={alarms}
        setAlarms={setAlarms}
      />
    </div>
  );
};

export default ParentComponent;
