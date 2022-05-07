import { useState } from "react";
import axios from "axios";
import Key from "./Key.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faThermometerEmpty,
  faThermometerFull,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Search.css";

function Search() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState();

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${Key}&q=${cidade}&days=6&aqi=no&alerts=no`;

  function handleSearch() {
    const call = axios.get(url).then((response) => setDados(response.data));
  }

  return (
    <div className="container">
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
            <div className="forecast-current">
              <div className="current-name">
                <p>Agora em </p>
                <p>
                  {dados.location.name}, {dados.location.country}
                </p>
              </div>
              <div className="current-temp">
                <img src={dados.current.condition.icon} alt="icon" />
                <p>{dados.current.temp_c}°</p>
              </div>
              <div className="current-hour">
                <p>Horário Local: {dados.location.localtime.slice(10)}h</p>
                <p>Sensação Térmica: {dados.current.feelslike_c}°</p>
              </div>
              <hr />
              <div className="current-details">
                <div className="details-rain">
                  <span>Chuva: {dados.current.precip_mm}mm</span>
                </div>
                <hr />
                <div className="details-wind">
                  <span>Vento: {dados.current.wind_kph}kph</span>
                </div>
              </div>
            </div>
            <div className="forecast-text">
              <p>Previsão para os próximos dias</p>
            </div>
            <div className="forecast">
              {dados.forecast.forecastday.map((i, key) => (
                <div key={key} className="forecast-day">
                  <div className="forecast-image">
                    <img src={i.day.condition.icon} alt="temp" />
                    <p>{i.date.slice(5).replace("-", "/")}</p>
                  </div>
                  <div className="forecast-details">
                    <div className="forecast-temp">
                      <span>Temperatura:</span>
                      <div className="temp-container">
                        <div className="temp-min">
                          <FontAwesomeIcon icon={faThermometerEmpty} />
                          <span>{i.day.mintemp_c}°</span>
                        </div>
                        <div className="temp-max">
                          <FontAwesomeIcon icon={faThermometerFull} />
                          <span>{i.day.maxtemp_c}°</span>
                        </div>
                      </div>
                    </div>
                    <div className="forecast-rain">
                      <span>Chuva: </span>
                      <div className="rain-details">
                        <FontAwesomeIcon icon={faDroplet} />
                        <span>
                          {i.day.totalprecip_mm}mm |{" "}
                          {i.day.daily_chance_of_rain}%
                        </span>
                      </div>
                    </div>
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
