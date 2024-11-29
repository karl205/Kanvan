import React, { useState } from "react";
import axios from "axios";

const ReproductorComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchTracks = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&media=music&limit=10`
      );
      setTracks(response.data.results);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Reproductor de Música</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar música..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            marginRight: "10px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={searchTracks}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#282c34",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {isLoading && <p>Cargando...</p>}

      <div>
        {tracks.map((track) => (
          <div
            key={track.trackId}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
            onClick={() => setCurrentTrack(track)}
          >
            <img
              src={track.artworkUrl100}
              alt={track.trackName}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
                {track.trackName}
              </h3>
              <p style={{ margin: "0", color: "gray", fontSize: "14px" }}>
                {track.artistName}
              </p>
            </div>
          </div>
        ))}
      </div>

      {currentTrack && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "#282c34",
            color: "white",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={currentTrack.artworkUrl100}
              alt={currentTrack.trackName}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div>
              <h4 style={{ margin: "0", fontSize: "16px" }}>
                {currentTrack.trackName}
              </h4>
              <p style={{ margin: "0", fontSize: "14px", color: "gray" }}>
                {currentTrack.artistName}
              </p>
            </div>
          </div>
          <audio
            controls
            src={currentTrack.previewUrl}
            style={{ width: "300px" }}
          >
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}
    </div>
  );
};

export default ReproductorComponent;

