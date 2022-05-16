import { useState } from "react";
import axios from "axios";
import Key from "./components/Key.tsx";
import TempsToday from "./components/TempsToday";
import "./styles/App.css";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
import Search from "./components/Search";

function App() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState();
  const [today, setToday] = useState();
  const [loading, setLoading] = useState(false);
  const [hourTemp, setHourTemp] = useState();
  const [details, setDetails] = useState(false);

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${Key}&q=${cidade}&days=6&aqi=no&alerts=no`;

  function searchCity() {
    setLoading(true);
    axios.get(url).then((response) => setDados(response.data));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
    <div>
      <Search searchCity={searchCity} cidade={cidade} setCidade={setCidade} />
      <div className="forecast-container">
        {dados && !loading ? (
          <>
            <div className="forecast-current">
              <Current dados={dados} />
              {!details ? (
                <div onClick={showDetails} className="temp-verMais">
                  <p>Ver Mais</p>
                </div>
              ) : (
                <TempsToday changeHour={changeHour} hourTemp={hourTemp} />
              )}
            </div>
            <Forecast dados={dados} />
          </>
        ) : (
          <div>
            {loading ? (
              <div className="loading-container">
                <div className="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="no-results">
                <p>Nenhuma cidade pesquisada/encontrada</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
