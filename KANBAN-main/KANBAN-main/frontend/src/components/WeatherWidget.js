import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Almacénala de forma segura (ver siguiente sección)

  // Función para obtener los datos del clima
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Ciudad,País&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Error al obtener los datos del clima. Por favor, intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    // Intervalo de actualización (por ejemplo, cada hora)
    const interval = setInterval(() => {
      fetchWeather();
    }, 3600000); // 1 hora en milisegundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px", maxWidth: "300px" }}>
      <h3>Clima en {weatherData.name}</h3>
      <p>Temperatura: {weatherData.main.temp}°C</p>
      <p>Humedad: {weatherData.main.humidity}%</p>
      <p>Estado: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherWidget;
