import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";  // Importa Routes, Route y Navigate
import boardsSlice from "./redux/boardsSlice";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from './components/EmptyBoard';
import Services from './components/Services';
import Products from './components/Products';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Home1 from './components/Home1';

import YouTubeComponent from './components/YoutubeComponent';
import ReproductorComponent from './components/ReproductorComponent';




import './App.css';

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('youtube');

  

  // Hooks de Auth0
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  // Si no hay una tabla activa y hay tablas disponibles, activa la primera
  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  // Asegúrate de que el componente no intente renderizar antes de saber si está autenticado
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Función de logout
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <Router>
      <div>
        {/* Si no está autenticado, mostrar login */}
        {!isAuthenticated ? (
          <div>
            {/* Solo mostrar el navbar si el usuario no está autenticado */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home1 />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sign-up" element={<SignUp />} />
              {/* Redirigir a home si ya está logueado */}
              <Route path="/login" element={<Navigate to="/" />} />
            </Routes>
            
          </div>
        ) : (
          <div>
           
          
            <Header setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} user={user} handleLogout={handleLogout} />
            <div className="overflow-hidden overflow-x-scroll" style={{backgroundColor:'blue'}}>
              {boards.length > 0 ? (
                <Home setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
              ) : (
                <EmptyBoard type="add" />
              )}
            </div>
            
                <div >
                <div className="divContenedor">
          <button className="button youtube" onClick={() => setActiveComponent('youtube')}>YouTube</button>
          <button className="button reproductor" onClick={() => setActiveComponent('reproductor')}>Reproductor</button>
          </div>
          <div className={`fade-in`}>
            {activeComponent === 'youtube' && <YouTubeComponent />}
            {activeComponent === 'reproductor' && <ReproductorComponent />}
          </div>
        </div>
        
              
              
              </div>
              
          
        )}
      </div>
    </Router>
  );
}

export default App;

