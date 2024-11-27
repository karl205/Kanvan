import React, { useState, useEffect } from "react";
import Logo from "../assets/logo-mobile.svg";
import HeaderDropDown from "./HeaderDropDown";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import AlarmModal from "./Alarma/AlarmModal";
import NotificationModal from "./Alarma/NotificationModal";
import { Clock, Sun, User } from "lucide-react";
import TimeLeft from "./TimeLeft";

const Header = ({ setIsBoardModalOpen, isBoardModalOpen, user, handleLogout }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [notification, setNotification] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [manualCity, setManualCity] = useState(""); // Estado para la ciudad ingresada manualmente
  const [showManualForm, setShowManualForm] = useState(false);

  // Función para guardar una alarma
  const handleSaveAlarm = (alarm, index) => {
    if (index !== null) {
      setAlarms((prev) => prev.map((a, i) => (i === index ? alarm : a)));
    } else {
      setAlarms((prev) => [...prev, alarm]);
    }
  };

  // Función para eliminar una alarma
  const handleDeleteAlarm = (index) => {
    setAlarms((prev) => prev.filter((_, i) => i !== index));
  };

  // Función para obtener el clima basado en coordenadas
  const fetchWeather = async (latitude, longitude) => {
    try {
      const API_KEY = "9a854d96475ac00ee5b04cda605433de"; // Tu API Key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
      );
      const data = await response.json();
      setWeatherData({
        temp: data.main.temp,
        city: data.name,
        condition: data.weather[0].description,
      });
    } catch (error) {
      console.error("Error obteniendo clima:", error);
      setWeatherError("No se pudo obtener el clima.");
    }
  };

  // Función para obtener el clima basado en la ciudad ingresada manualmente
  const fetchWeatherByCity = async (city) => {
    if (!city) {
      setWeatherError("Por favor, ingresa una ciudad válida.");
      return;
    }
    try {
      const API_KEY = "9a854d96475ac00ee5b04cda605433de"; // Tu API Key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
      if (!response.ok) {
        throw new Error("No se encontró la ciudad.");
      }
      const data = await response.json();
      setWeatherData({
        temp: data.main.temp,
        city: data.name,
        condition: data.weather[0].description,
      });
      setWeatherError(null); // Limpia cualquier error previo
      setShowManualForm(false); // Oculta el formulario después de obtener el clima
    } catch (error) {
      console.error("Error obteniendo clima por ciudad:", error);
      setWeatherError("No se pudo obtener el clima para la ciudad ingresada. Verifica el nombre.");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        console.error("Error obteniendo ubicación:", err);
        setWeatherError("No se pudo obtener la ubicación.");
        setShowManualForm(true); // Muestra el formulario si el usuario niega el permiso
      }
    );
  }, []);

  // Widget Component
  const Widget = ({ icon, title, value, onClick }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "10px",
        width: "auto",
        height: "auto",
        marginRight: "5px",
        marginTop: "5px",
        cursor: "pointer",
      }}
    >
      <div className="text-[#635fc7]" style={{ marginLeft: "10px" }}>
        {icon}
      </div>
      <div className="text-white font-medium" style={{ fontSize: "17px" }}>
        {value}
      </div>
    </div>
  );

  // Clock Widget
  const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <Widget
        icon={<Clock size={18} />}
        value={time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        onClick={() => setIsAlarmModalOpen(true)}
      />
    );
  };

  // Weather Widget
  const WeatherWidget = () => {
    if (weatherError) {
      return <Widget icon={<Sun size={18} />} value={weatherError} />;
    }

    if (!weatherData) {
      return <Widget icon={<Sun size={18} />} value="Cargando..." />;
    }

    return (
      <Widget
        icon={<Sun size={18} />}
        value={`${weatherData.temp}°C, ${weatherData.condition} en ${weatherData.city}`}
      />
    );
  };

  // User Widget
  const UserWidget = () => (
    <Widget
      icon={<User size={18} />}
      value="Cronómetros"
      onClick={() => setIsUserModalOpen(true)} // Abre el modal para UserWidget
    />
  );

  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "flex-end",
          padding: "15px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px" }}>
          <label style={{ color: "white", paddingTop: "5px" }}>
            Hola , {user?.name}
          </label>
        </div>
        <div>
          <button onClick={handleLogout} style={{ padding: "5px" }}>
            Cerrar sesión
          </button>
        </div>
      </div>
      {/* Widget Bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "20px",
          paddingRight: "15px",
        }}
        className="dark:bg-[#20212c]"
      >
        <ClockWidget />
        <WeatherWidget />
        <UserWidget />
      </div>

      {/* Formulario para ciudad manual (solo si se requiere) */}
      {showManualForm && (
        <div
          style={{
            marginTop: "15px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#20212c",
            borderRadius: "8px",
            maxWidth: "400px",
            margin: "auto",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)", // Sombra para destacar el formulario
            border: "1px solid #2d2e3a", // Borde oscuro
          }}
        >
          <p
            style={{
              color: "#ffffff",
              marginBottom: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            No se pudo obtener tu ubicación. Ingresa tu ciudad manualmente:
          </p>
          <input
            type="text"
            placeholder="Ejemplo: Tegucigalpa"
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            style={{
              padding: "10px",
              width: "80%",
              borderRadius: "5px",
              border: "1px solid #635fc7",
              marginBottom: "10px",
              color: "#ffffff",
              backgroundColor: "#2d2e3a",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <br />
          <button
            onClick={() => fetchWeatherByCity(manualCity)}
            style={{
              padding: "8px 15px",
              backgroundColor: "#635fc7",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Actualizar Clima
          </button>
          {weatherError && (
            <div
              style={{
                color: "red",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              {weatherError}
            </div>
          )}
        </div>
      )}

      {/* Modales */}
      {isAlarmModalOpen && (
        <AlarmModal
          isOpen={isAlarmModalOpen}
          setIsOpen={setIsAlarmModalOpen}
          alarms={alarms}
          onSave={handleSaveAlarm}
          onDelete={handleDeleteAlarm}
        />
      )}

      {isUserModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
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
              width: "90%",
            }}
          >
            <button
              onClick={() => setIsUserModalOpen(false)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                float: "right",
              }}
            >
              X
            </button>
            <TimeLeft /> {/* Renderiza TimeLeft dentro del modal */}
          </div>
        </div>
      )}

      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      <NotificationModal notification={notification} onClose={() => setNotification(null)} />
    </div>
  );
};

export default Header;
