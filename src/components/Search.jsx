import { useState } from "react";
import axios from "axios";
import Key from "./Key.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faDroplet,
  faThermometerEmpty,
  faThermometerFull,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Search.css";

function Search() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState();
  const [today, setToday] = useState();
  const [hourTemp, setHourTemp] = useState();
  const [details, setDetails] = useState(false);
  const date = new Date();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${Key}&q=${cidade}&days=6&aqi=no&alerts=no`;

  function handleSearch() {
    axios.get(url).then((response) => setDados(response.data));
    setCidade("");
    setDetails(false);
  }

  function showDetails() {
    setDetails(true);
    const hour = Number(dados.location.localtime.slice(-5, -3));
    setToday(dados.forecast.forecastday[0].hour);
    if (hour <= 22) {
      setHourTemp(dados.forecast.forecastday[0].hour[hour + 1]);
    } else {
      setHourTemp(dados.forecast.forecastday[0].hour[0]);
    }
  }

  function changeHour(esquerda) {
    const hour = Number(hourTemp.time.slice(-5, -3));
    if (hour >= 1 && esquerda) {
      setHourTemp(today[hour - 1]);
    } else if (hour === 0 && esquerda) {
      setHourTemp(today[23]);
    } else if (hour <= 22 && !esquerda) {
      setHourTemp(today[hour + 1]);
    } else if (hour === 23 && !esquerda) {
      setHourTemp(today[0]);
    }
  }

  return (
    <div className="container">
      <div className="name-search">
        <div className="site-name">
          <h1>Previsão do Tempo</h1>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Digite a cidade desejada"
            onChange={(e) => setCidade(e.target.value)}
            value={cidade}
          />
          <button onClick={handleSearch}>Procurar</button>
        </div>
      </div>

      <div className="forecast-container">
        {dados ? (
          <>
            <div className="forecast-current">
              <div className="current-city">
                <p>
                  {dados.location.name}, {dados.location.country}
                </p>
                <p>
                  {date.getDate()} de {months[date.getMonth()]}
                </p>
              </div>
              <div className="current-details">
                <div className="current-info">
                  <p className="info-hour">
                    Agora {dados.location.localtime.slice(10)}
                  </p>
                  <p className="info-temp">{dados.current.temp_c}°C</p>
                  <p className="info-plus">
                    Sensação: {dados.current.feelslike_c}°C
                  </p>
                  <p className="info-plus">Chuva: {dados.current.humidity}%</p>
                </div>
                <div className="current-image">
                  <img src={dados.current.condition.icon} alt="icon" />
                </div>
              </div>

              {!details && (
                <div onClick={showDetails} className="temp-verMais">
                  <p>Ver Mais</p>
                </div>
              )}
              {details && (
                <div className="container-today">
                  <div onClick={() => changeHour(true)} className="today-arrow">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>

                  <div className="today-info">
                    <div className="today-details">
                      <p className="today-hour">{hourTemp.time.slice(-5)}</p>
                      <p className="today-temp">{hourTemp.temp_c}°C</p>
                    </div>
                    <img src={hourTemp.condition.icon} alt="condition" />
                  </div>

                  <div
                    onClick={() => changeHour(false)}
                    className="today-arrow"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              )}
            </div>

            <div className="forecast">
              {dados.forecast.forecastday.map((i, key) => (
                <div key={key} className="forecast-day">
                  <div className="forecast-date">
                    <p>{i.date.slice(5).replace("-", "/")}</p>
                  </div>
                  <div className="forecast-details">
                    <div className="forecast-image">
                      <img src={i.day.condition.icon} alt="temp" />
                    </div>
                    <div className="forecast-temp">
                      <div className="temps">
                        <div className="temp-min">
                          <FontAwesomeIcon icon={faThermometerEmpty} />
                          <span>{i.day.mintemp_c}°C</span>
                        </div>
                        <div className="temp-max">
                          <FontAwesomeIcon icon={faThermometerFull} />
                          <span>{i.day.maxtemp_c}°C</span>
                        </div>
                      </div>
                      <div className="rain-details">
                        <FontAwesomeIcon icon={faDroplet} />
                        <span>{i.day.daily_chance_of_rain}%</span>
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
