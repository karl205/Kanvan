import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null); // Datos del clima
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Errores
  const [manualInput, setManualInput] = useState(false); // Modo entrada manual
  const [manualLocation, setManualLocation] = useState(""); // Entrada manual de ubicación
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Función para obtener datos de clima por coordenadas
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=es`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Error al obtener datos del clima. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener datos de clima por nombre de ciudad
  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=es`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("No se pudo obtener el clima para esa ubicación.");
    } finally {
      setLoading(false);
    }
  };

  // Solicitar permiso de ubicación y obtener coordenadas
  const requestGeolocation = () => {
    setError(null);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          setError("Permiso de ubicación denegado. Usa la entrada manual.");
          setManualInput(true);
        }
      );
    } else {
      setError("Geolocalización no soportada por este navegador.");
      setManualInput(true);
    }
  };

  // Solicitar ubicación al cargar el componente
  useEffect(() => {
    requestGeolocation();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#2c2f38",
        color: "white",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginBottom: "10px", fontSize: "18px" }}>Clima Actual</h2>

      {/* Estado de carga */}
      {loading && <p>Cargando...</p>}

      {/* Mostrar errores */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar datos del clima */}
      {weatherData && !loading && (
        <div>
          <h3 style={{ fontSize: "16px" }}>{weatherData.name}</h3>
          <p style={{ fontSize: "14px", margin: "5px 0" }}>
            <strong>Temperatura:</strong> {weatherData.main.temp}°C
          </p>
          <p style={{ fontSize: "14px", margin: "5px 0" }}>
            <strong>Condiciones:</strong> {weatherData.weather[0].description}
          </p>
          <p style={{ fontSize: "14px", margin: "5px 0" }}>
            <strong>Humedad:</strong> {weatherData.main.humidity}%
          </p>
          <p style={{ fontSize: "14px", margin: "5px 0" }}>
            <strong>Viento:</strong> {weatherData.wind.speed} m/s
          </p>
        </div>
      )}

      {/* Entrada manual */}
      {manualInput && (
        <div style={{ marginTop: "10px" }}>
          <label>
            Ingresa tu ubicación:
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Ciudad o país"
              style={{ width: "100%", padding: "5px", marginTop: "5px" }}
            />
          </label>
          <button
            onClick={() => fetchWeatherByCity(manualLocation)}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Buscar
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;





