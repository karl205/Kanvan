import React, { useState } from 'react';
import YouTube from 'react-youtube';

const YoutubeComponent = () => {
  const [videoId, setVideoId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // Validar URL de YouTube y extraer el ID del video
  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|)([\w-]{11})|youtu\.be\/([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractVideoId(inputValue);

    if (id) {
      setVideoId(id);
      setError('');
    } else {
      setError('Por favor, ingresa una URL válida de YouTube.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Reproductor de YouTube</h2>

      {/* Formulario para ingresar la URL */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Ingresa la URL del video de YouTube"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#FF0000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Reproducir
        </button>
      </form>

      {/* Mostrar error si la URL no es válida */}
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {/* Reproductor de YouTube */}
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={{
            height: '390',
            width: '100%',
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
            },
          }}
          onError={() => setError('Error al cargar el video.')}
          onReady={() => setError('')}
        />
      )}
    </div>
  );
};

export default YoutubeComponent;
