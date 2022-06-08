import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/TempsToday.css";

function TempsToday({ changeHour, hourTemp }) {
  return (
    <div className="container-today" data-cy="temps-today">
      <div
        onClick={() => changeHour(true)}
        className="today-arrow"
        data-cy="arrow-left"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className="today-info">
        <div className="today-details">
          <p className="today-hour" data-cy="hour">
            {hourTemp.time.slice(-5)}
          </p>
          <p className="today-temp">{hourTemp.temp_c}°C</p>
        </div>
        <img src={hourTemp.condition.icon} alt="condition" />
      </div>
      <div onClick={() => changeHour(false)} className="today-arrow">
        <FontAwesomeIcon icon={faArrowRight} data-cy="arrow-right" />
      </div>
    </div>
  );
}

export default TempsToday;
