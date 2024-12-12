import React, { useState, useEffect } from "react";
import axios from "axios";

const Clima = () => {
  const [location, setLocation] = useState(null); // Ubicación actual
  const [weatherData, setWeatherData] = useState(null); // Datos del clima
  const [manualLocation, setManualLocation] = useState(""); // Entrada manual
  const [error, setError] = useState(null); // Manejo de errores

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Reemplaza con tu clave de API

  // Obtener clima por coordenadas
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Error al obtener los datos del clima.");
    }
  };

  // Obtener clima por ciudad ingresada manualmente
  const fetchWeatherByCity = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Ciudad no encontrada o error al obtener el clima.");
    }
  };

  // Solicitar permiso para acceder a la ubicación del usuario
  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          setError("Permiso de ubicación denegado.");
        }
      );
    }
  }, [location]);

  // Manejar el formulario de ubicación manual
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualLocation.trim() !== "") {
      fetchWeatherByCity(manualLocation);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px", margin: "auto" }}>
      <h2>Clima</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData ? (
        <div>
          <h4>{weatherData.name}</h4>
          <p>
            <strong>Temperatura:</strong> {weatherData.main.temp}°C
          </p>
          <p>
            <strong>Condición:</strong> {weatherData.weather[0].description}
          </p>
          <p>
            <strong>Humedad:</strong> {weatherData.main.humidity}%
          </p>
          <p>
            <strong>Viento:</strong> {weatherData.wind.speed} m/s
          </p>
        </div>
      ) : (
        <p>Cargando datos del clima...</p>
      )}

      <form onSubmit={handleManualSubmit} style={{ marginTop: "20px" }}>
        <label htmlFor="location">Ingresar ubicación manualmentehhhhh:</label>
        <input
          type="text"
          id="location"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
          placeholder="Ej. Ciudad, País"
          style={{ margin: "10px 0", padding: "8px", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px 20px", background:"Green" }}>Consultar Clima</button>
      </form>
    </div>
  );
};

export default Clima;
