import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faThermometerEmpty,
  faThermometerFull,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Forecast.css";

function Forecast({ dados }) {
  return (
    <div className="forecast">
      {dados.forecast.forecastday.map((i, key) => (
        <div key={key} className="forecast-day">
          <div className="forecast-date">
            <p data-cy={`forecast${key}`}>
              {i.date.slice(8, 10)}/{i.date.slice(5, 7)}
            </p>
          </div>
          <div className="forecast-details">
            <div className="forecast-image">
              <img src={i.day.condition.icon} alt="icon" />
            </div>
            <div className="forecast-temp">
              <div className="temps">
                <div className="temp-max">
                  <FontAwesomeIcon icon={faThermometerFull} />
                  <span>{i.day.maxtemp_c}°C</span>
                </div>
                <div className="temp-min">
                  <FontAwesomeIcon icon={faThermometerEmpty} />
                  <span>{i.day.mintemp_c}°C</span>
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
  );
}

export default Forecast;
