import { useState } from "react";
import axios from "axios";
import Key from "./Key.tsx";
import "../styles/Search.css";

function Search() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState();

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${Key}&q=${cidade}&days=6&aqi=no&alerts=no`;

  function handleSearch() {
    const call = axios
      .get(url)
      .then((response) => setDados(response.data.forecast.forecastday));
  }

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Digite a cidade"
          onChange={(e) => setCidade(e.target.value)}
        />
        <button onClick={handleSearch}>Procurar</button>
      </div>
      <div className="forecast-container">
        {dados ? (
          <>
            <div className="forecast-cidade">
              <p>Previsão para {cidade.toUpperCase()} nos próximos dias</p>
            </div>
            <div className="forecast">
              {dados.map((i, key) => (
                <div key={key} className="forecast-day">
                  <img src={i.day.condition.icon} alt="temp" />
                  <p>{i.date}</p>
                  <div className="forecast-temp">
                    <span>MIN: {i.day.mintemp_c}°C</span>
                    <span>MAX: {i.day.maxtemp_c}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
