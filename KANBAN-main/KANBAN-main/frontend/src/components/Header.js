import React, { useState, useEffect } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Clock, Sun, User } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({ setIsBoardModalOpen, isBoardModalOpen, user, handleLogout }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const onDeleteBtnClick = () => {
    if (board) {
      dispatch(boardsSlice.actions.deleteBoard(board.id));
      setIsDeleteModalOpen(false);
    }
  };



   

  // Widget Component - Ahora más compacto
  const Widget = ({ icon, title, value }) => (
    <div style={{ display:'flex', flexDirection:'row', marginLeft:'10px', width:'auto', height:'auto', marginRight:'5px', marginTop:'5px' }}>
      <div className="text-[#635fc7]" style={{marginLeft:'10px'}}>
        {icon}
      </div>
      <div className="text-white text-xs font-medium" style={{}}>{value}</div>
    </div>
  );

  // Clock Widget with Hook
  const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <Widget
        icon={<Clock size={14} />}
        value={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      />
    );
  };

  // Weather Widget - Simplificado
  const WeatherWidget = () => (
    <Widget
      icon={<Sun size={16} />}
      value="23°C"
    />
  );

  // User Widget - Simplificado
  const UserWidget = () => (
    <Widget
      icon={<User size={16} />}
      value="Bienvenido"
    />
  );

  

  return (
    <div style={{}}>
       <div style={{width:'100%', backgroundColor:'black',display:'flex',justifyContent:'flex-end', paddingRight:'15px', paddingTop:'15px',paddingBottom:'15px'}}>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginRight:'10px'}}>
          <label style={{color:'white',paddingTop:'5px'}}>
                Hola , {user?.name}
              </label>
              </div>
        <div> 
           <button onClick={handleLogout} style={{padding:'5px'}}>Cerrar sesion</button>
           </div>
           
            </div>
      {/* Widget Bar - Altura reducida y padding ajustado */}
      <div style={{display:'flex', flexDirection:'row', justifyContent: 'center',height:'20px' ,paddingRight:'15px'}} className="dark:bg-[#20212c]">
        <ClockWidget  />
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
          <div className="flex items-center ml-8">
            <h3 className="truncate max-w-[200px] text-xl font-bold text-gray-800 dark:text-white">
              {board?.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="hidden md:block bg-[#635fc7] hover:bg-[#535199] text-white px-4 py-2  text-sm font-medium transition-colors"
            style={{marginRight:'50px', marginTop:'10px', borderRadius:'5px'}}
            onClick={() => setIsTaskModalOpen(true)}
          >
            + Añadir nueva tarea
          </button>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="md:hidden bg-[#635fc7] hover:bg-[#535199] text-white w-8 h-8 rounded-full flex items-center justify-center"
          >
            +
          </button>
        </div>

        {isTaskModalOpen && (
          <AddEditTaskModal
            setIsAddTaskModalOpen={setIsTaskModalOpen}
            type="add"
            device="mobile"
          />
        )}

        {isBoardModalOpen && (
          <AddEditBoardModal
            setBoardType={setBoardType}
            type={boardType}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
        
        {isDeleteModalOpen && (
          <DeleteModal
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="board"
            title={board?.name}
            onDeleteBtnClick={onDeleteBtnClick}
          />
        )}
      </header>
    </div>
  );
};

export default Header;