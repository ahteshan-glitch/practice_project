import { useState } from "react";
import "./Whether.css";

function Whether() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whether, setWhether] = useState({
    city: "",
    country: "",
    temperature: "",
    feelsLike: "",
    minTemp: "",
    maxTemp: "",
    condition: "",
    description: "",
    humidity: "",
    windSpeed: "",
    icon: "",
    show: false,
  });

  const URL = import.meta.env.VITE_WEATHER_URL;
  const API = import.meta.env.VITE_WEATHER_API_KEY;

  const getInfo = async () => {
    if (!city.trim()) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${URL}?q=${city}&appid=${API}&units=metric`);
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setWhether({
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          condition: data.weather[0].main,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          show: true,
        });
        setError(false);
      } else {
        throw new Error("City not found");
      }
    } catch (err) {
      setLoading(false);
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
    <div className={`app-container ${whether.condition?.toLowerCase()}`}>
      <div className="card">
        <h1 className="title">🌙 Wyndly</h1>
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

        {loading && <p>🔄 Fetching weather data...</p>}

        {whether.show && !loading && (
          <div className="weather-card">
            <h2>{whether.city}, {whether.country}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${whether.icon}@2x.png`}
              alt={whether.description}
              className="weather-icon"
            />
            <p className="temp">{whether.temperature}°C</p>
            <p>{whether.condition} - {whether.description}</p>
            <div className="details">
              <p>🌡️ Feels Like: {whether.feelsLike}°C</p>
              <p>🔻 Min: {whether.minTemp}°C / 🔺 Max: {whether.maxTemp}°C</p>
              <p>💧 Humidity: {whether.humidity}%</p>
              <p>🌬️ Wind: {whether.windSpeed} m/s</p>
            </div>
          </div>
        )}

        {error && !loading && <p className="error">⚠️ No such place found</p>}
      </div>
    </div>
  );
}

export default Whether;
