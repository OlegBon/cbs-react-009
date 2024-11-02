import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("Київ");

  const key = "5ff38d9e9184737ccd4a920d989f42f9";
  // &lang=uk не все переведено
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=uk&units=metric&appid=${key}`;

  const searchWeather = (e) => {
    if (e.key === "Enter") {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  };

  // For "Київ"
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Київ&lang=uk&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          onKeyDown={searchWeather}
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            {data.sys && (
              <p>
                {data.name}, {data.sys.country}
              </p>
            )}
          </div>
          <div className="temp">
            {/* {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null} */}
            {data.main && <h1>{data.main.temp.toFixed()} °C</h1>}
          </div>
          <div className="desk">
            {data.weather && (
              <p>
                {data.weather[0].main}, {data.weather[0].description}
              </p>
            )}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="footer">
            <div className="feels">
              {data.name && (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              )}
              <p>Відчувається як</p>
            </div>
            <div className="temp">
              {data.name && (
                <p className="bold">{data.main.temp_min.toFixed()} °C</p>
              )}
              <p>Мінімальна</p>
            </div>
            <div className="temp">
              {data.name && (
                <p className="bold">{data.main.temp_max.toFixed()} °C</p>
              )}
              <p>Максимальна</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity} %</p>}
              <p>Вологість</p>
            </div>
            <div className="wind">
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()} м/с</p>
              )}
              <p>Вітер</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
