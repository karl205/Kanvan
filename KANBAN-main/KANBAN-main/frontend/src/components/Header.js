import React, { useState, useEffect } from "react";
import Logo from "../assets/logo-mobile.svg";
import HeaderDropDown from "./HeaderDropDown";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import AlarmModal from "./Alarma/AlarmModal"; // Incluido desde archivo compartido
import NotificationModal from "./Alarma/NotificationModal"; // Incluido desde archivo compartido
import { Clock, Sun, User, AlarmCheck } from "lucide-react";
import TimeLeft from "./TimeLeft"; // Importar TimeLeft
import DailyPlanner from "./DailyPlanner";
import Pomodoro from "./Pomodoro"; 
import CountdownManager from "./CountdownManager";

const Header = ({ setIsBoardModalOpen, isBoardModalOpen, user, handleLogout }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false); // Estado para UserWidget
  const [alarms, setAlarms] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isCountdownManagerOpen, setIsCountdownManagerOpen] = useState(false);

  

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const handleSaveAlarm = (alarm, index) => {
    if (index !== null) {
      setAlarms((prev) => prev.map((a, i) => (i === index ? alarm : a)));
    } else {
      setAlarms((prev) => [...prev, alarm]);
    }
  };

  const handleDeleteAlarm = (index) => {
    setAlarms((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const checkAlarms = () => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const triggeredAlarm = alarms.find((alarm) => alarm.time === currentTime);
      if (triggeredAlarm) {
        setNotification(triggeredAlarm);
        setAlarms((prev) => prev.filter((alarm) => alarm.time !== triggeredAlarm.time));
      }
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  const Widget = ({ icon, title, value, onClick }) => {
    return (
      <div
        onClick={onClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          margin: "10px",
          width: "90px",
          height: "70px",
          background: "linear-gradient(135deg, #635fc7, #2c3e50)", // Fondo inicial con tu color
          borderRadius: "15px", // Bordes suaves
          boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)", // Sombra elegante
          cursor: "pointer",
          transition: "all 0.3s ease-in-out", // Transiciones suaves
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #2c3e50, #4ca1af)"; // Cambio a un degradado moderno
          e.currentTarget.style.transform = "scale(1.1)"; // Zoom suave
          e.currentTarget.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.3)"; // Sombra más pronunciada
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #635fc7, #2c3e50)"; // Restaurar fondo con tu color
          e.currentTarget.style.transform = "scale(1)"; // Restaurar tamaño
          e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)"; // Restaurar sombra
        }}
      >
        <div
          style={{
            fontSize: "20px",
            marginBottom: "5px",
            color: "#ffffff", // Icono blanco
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#ffffff", // Texto blanco
            textAlign: "center",
          }}
        >
          {value}
        </div>
      </div>
    );
  };

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
  const WeatherWidget = () => (
    <Widget icon={<Sun size={18} />} value="23°C" />
  );

  // User Widget
  const UserWidget = () => (
    <Widget
      icon={<AlarmCheck size={18} />}
      value="Cronómetro"
      onClick={() => setIsUserModalOpen(true)} // Abre el modal para UserWidget
    />
  );
  const Planificacion = () => (
    <Widget
      icon={<User size={18} />}
      value="Planificacion"
      onClick={() => setIsWeatherModalOpen(true)} // Abre el modal para UserWidget
    />
  );
  const Otro = () => (
    <Widget
      icon={<User size={18} />}
      value="Cuentaregresiva"
      onClick={() => setIsCountdownManagerOpen(true)} // Abre el modal para UserWidget
    />
  );
  const Otro1 = () => (
    <Widget
      icon={<User size={18} />}
      value="Otro1"
      onClick={() => setIsUserModalOpen(true)} // Abre el modal para UserWidget
    />
  );
  const Otro2 = () => (
    <Widget
      icon={<User size={18} />}
      value="Pomodoro"
      onClick={() => setIsPomodoroOpen(true)} // Abre el Pomodoro para UserWidget
    />
  );

  return (
    <div style={{}}>
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
        <Planificacion />
        <Otro />
        <Otro1 />
        <Otro2 />
      </div>

      {/* Main Header */}
      <header className="dark:bg-[#20212c] flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans text-xl text-gray-800 dark:text-white ml-4">
            kanban
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="hidden md:block bg-[#635fc7] hover:bg-[#535199] text-white px-4 py-2 text-sm font-medium transition-colors"
            style={{ marginRight: "50px", marginTop: "10px", borderRadius: "5px" }}
            onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
          >
            + Añadir nueva tarea
          </button>
          <button
            onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>
        </div>
      </header>

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
      {isWeatherModalOpen && (
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
      zIndex: 1000,
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
      <button
        onClick={() => setIsWeatherModalOpen(false)}
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
      <DailyPlanner /> {/* Renderiza DailyPlanner dentro del modal */}
    </div>
  </div>
)}

{isPomodoroOpen && (
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
      zIndex: 1000,
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
      <button
        onClick={() => setIsPomodoroOpen(false)}
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
      <Pomodoro /> {/* Renderiza DailyPlanner dentro del modal */}
    </div>
  </div>
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
      {isWeatherModalOpen && (
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
      zIndex: 1000,
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
      <button
        onClick={() => setIsWeatherModalOpen(false)}
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
      <DailyPlanner /> {/* Renderiza DailyPlanner dentro del modal */}
    </div>
  </div>
)}

{isCountdownManagerOpen && (
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
      zIndex: 1000,
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
      <button
        onClick={() => setIsCountdownManagerOpen(false)}
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
      <CountdownManager /> {/* Renderiza DailyPlanner dentro del modal */}
    </div>
  </div>
)}
    </div>
  );
};

export default Header;

