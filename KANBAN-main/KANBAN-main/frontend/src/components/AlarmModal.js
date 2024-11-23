import React, { useState } from "react";
import "./AlarmModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";





const AlarmModal = ({ isOpen, setIsOpen, alarms, onSave, onDelete }) => {
  const [formData, setFormData] = useState({ time: "", label: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData, editingIndex);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ time: "", label: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(alarms[index]);
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Botón cerrar */}
        <button className="close-button" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <h2>
  <i class="bi bi-alarm" style={{ marginRight: "10px" }}></i>
  {editingIndex !== null ? "Editar alarma" : "Añadir alarma"}
</h2>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="label"
          value={formData.label}
          onChange={handleInputChange}
          placeholder="Nombre alarma"
        />
        <button onClick={handleSave}>
          {editingIndex !== null ? "Actualizar" : "Guardar"}
        </button>
        <h3>Alarmas existentes:</h3>
        <ul>
          {alarms.map((alarm, index) => (
            <li key={index}>
              <span>
                {alarm.time} - {alarm.label}
              </span>
              <button onClick={() => handleEdit(index)}>Editar</button>
              <button onClick={() => handleDelete(index)}>Borrar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlarmModal;




  
    



