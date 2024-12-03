import React, { useState } from "react";
import { DeepChat } from "deep-chat-react";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Configuración del chatbot
  const config = {
    chatGPT: {
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: "Bearer",
        "Content-Type": "application/json",
      },
      body: {
        model: "gpt-3.5-turbo", // Ajusta el modelo según sea necesario
      },
    },
  };

  return (
    <div>
      {/* Botón para abrir/cerrar el chat */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3.5 py-3.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300 flex items-center justify-center"
        style={{
          zIndex: 1000,
          fontSize: "15px",
        }}
      >
        {isChatOpen ? "✖ Cerrar" : "💬 Ayuda"}
      </button>

      {/* Mostrar el chat solo si isChatOpen es true */}
      {isChatOpen && (
        <div
          className="fixed bottom-20 right-4 w-[350px] h-[500px] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden transition-transform transform scale-95 animate-fade-in"
          style={{
            zIndex: 1000,
          }}
        >
          {/* Header del chat */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 text-center font-bold text-lg">
            Chat de Ayuda
          </div>

          {/* Componente del chat */}
          <div className="p-4 h-[400px] overflow-auto">
            <DeepChat config={config} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;





