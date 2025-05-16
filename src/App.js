import React, { useState } from 'react';
import './App.css';

const API_KEY = 'a9a0b48888014bedb44163424251405';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' or 'F'
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const toggleUnit = () => {
    setUnit(prev => (prev === 'C' ? 'F' : 'C'));
  };

  const convertTemp = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  return (
    <div className="app">
      <h1>Weather App 🌤️</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={toggleUnit}>
          {unit === 'C' ? 'Switch to °F' : 'Switch to °C'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p><strong>Temperature:</strong> {convertTemp(weather.current.temp_c).toFixed(1)}°{unit}</p>
          <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default App;
