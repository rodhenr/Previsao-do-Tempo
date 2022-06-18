import { useState } from "react";
import axios from "axios";

import TempsToday from "./components/TempsToday";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
import Search from "./components/Search";

import "./styles/App.css";

function App() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState();
  const [today, setToday] = useState();
  const [loading, setLoading] = useState(false);
  const [hourTemp, setHourTemp] = useState();
  const [details, setDetails] = useState(false);
  const [mensagem, setMensagem] = useState("Nenhuma consulta para exibir");

  function cityInput(e) {
    setCidade(e.target.value);
  }

  async function searchCity() {
    setLoading(true);
    await axios
      .get("https://backend-weather-rod.herokuapp.com/search", {
        params: {
          cidade,
        },
      })
      .then((resp) => {
        setDados(resp.data);
        setCidade("");
        setDetails(false);
        setLoading(false);
      })
      .catch(() => {
        setMensagem(`A cidade ${cidade} não foi encontrada`);
        setLoading(false);
        setDados("");
      });
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
      <Search searchCity={searchCity} cidade={cidade} cityInput={cityInput} />
      <div>
        {dados ? (
          <div className="forecast-container" data-cy="data">
            <div className="forecast-current">
              <Current dados={dados} />
              {!details ? (
                <div
                  onClick={showDetails}
                  className="temp-verMais"
                  data-cy="see-more"
                >
                  <p>Ver Mais</p>
                </div>
              ) : (
                <TempsToday changeHour={changeHour} hourTemp={hourTemp} />
              )}
            </div>
            <Forecast dados={dados} />
          </div>
        ) : loading ? (
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
            <p data-cy="message">{mensagem}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
