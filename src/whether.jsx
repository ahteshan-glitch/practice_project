import { useState } from "react";
import "./Whether.css";

function Whether() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [whether, setWhether] = useState({
    city: "",
    country: "",
    temperature: "",
    condition: "",
    description: "",
    humidity: "",
    windSpeed: "",
    show: false,
  });

  const URL = import.meta.env.VITE_WEATHER_URL;
  const API = import.meta.env.VITE_WEATHER_API_KEY;

  const getInfo = async () => {
    try {
      const response = await fetch(`${URL}?q=${city}&appid=${API}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWhether({
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          condition: data.weather[0].main,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          show: true,
        });
        setError(false);
      } else {
        throw new Error("City not found");
      }
    } catch (err) {
      setError(true);
      setWhether((prev) => ({ ...prev, show: false }));
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getInfo();
    setCity("");
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">🌙 Weather App</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            value={city}
            type="text"
            placeholder="Enter city"
            onChange={handleChange}
            required
          />
          <button type="submit">Check</button>
        </form>

        {whether.show && (
          <div className="weather-card">
            <h2>{whether.city}, {whether.country}</h2>
            <p className="temp">{whether.temperature}°C</p>
            <p>{whether.condition} - {whether.description}</p>
            <div className="details">
              <p>💧 Humidity: {whether.humidity}%</p>
              <p>🌬️ Wind: {whether.windSpeed} m/s</p>
            </div>
          </div>
        )}

        {error && <p className="error">⚠️ No such place found</p>}
      </div>
    </div>
  );
}

export default Whether;
