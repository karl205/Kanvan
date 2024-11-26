import React, { useState, useEffect } from "react";
import Logo from "../assets/logo-mobile.svg";
import HeaderDropDown from "./HeaderDropDown";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import AlarmModal from "./Alarma/AlarmModal"; // Incluido desde archivo compartido
import NotificationModal from "./Alarma/NotificationModal"; // Incluido desde archivo compartido
import { Clock, Sun, User } from "lucide-react";
import TimeLeft from "./TimeLeft"; // Importar TimeLeft

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
  const WeatherWidget = () => (
    <Widget icon={<Sun size={18} />} value="23°C" />
  );

  // User Widget
  const UserWidget = () => (
    <Widget
      icon={<User size={18} />}
      value="Cronómetros"
      onClick={() => setIsUserModalOpen(true)} // Abre el modal para UserWidget
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
    </div>
  );
};

export default Header;

