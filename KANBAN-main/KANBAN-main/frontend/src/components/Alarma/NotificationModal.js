import React from "react";
import "./NotificationModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const NotificationModal = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-container">
        {/* Botón cerrar */}
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <i i class="bi bi-bell-fill" style={{ marginRight: "10px" }}></i>
        <h2>Notificación de alarma</h2>
        <p>
          <strong>{notification.label}</strong> programada para las <strong>{notification.time}</strong> se ha cumplido.
        </p>
        
      </div>
    </div>
  );
};

export default NotificationModal;
