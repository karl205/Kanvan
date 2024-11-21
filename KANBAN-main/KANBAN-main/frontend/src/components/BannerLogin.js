import React, { useState } from 'react';

export function BannerLogin(props) { 
  const [inicioSesion, setInicioSesion] = useState('');
  const [registro, setRegistro] = useState('');

  const handleInicioSesion = () => {
    props.setIsInicioSesion(true);
    setInicioSesion(''); // Opcional: Resetear el estado
  };

  const handleRegistro = () => {
    props.setIsRegistro(true);
    setRegistro(''); // Opcional: Resetear el estado
  };
  
  return (
    <div className="new-login-container2 flex justify-end p-4">
      <div className="flex justify-center space-x-4">
        <button 
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          onClick={handleInicioSesion}
        >
          inicioSesion
        </button>
        <button 
          className="bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400"
          onClick={handleRegistro}
        >
          Registrate
        </button>
        
      </div>
    </div>
  );
}

export default BannerLogin;