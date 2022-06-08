import "../styles/Current.css";

function Current({ dados }) {
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

  return (
    <>
      <div className="current-city">
        <p data-cy="city-name">
          {dados.location.name}, {dados.location.country}
        </p>
        <p data-cy="time">
          {date.getDate()} de {months[date.getMonth()]}
        </p>
      </div>
      <div className="current-details">
        <div className="current-info">
          <p className="info-hour">
            Agora {dados.location.localtime.slice(10)}
          </p>
          <p className="info-temp">{dados.current.temp_c}°C</p>
          <p className="info-plus">Sensação: {dados.current.feelslike_c}°C</p>
          <p className="info-plus">Chuva: {dados.current.humidity}%</p>
        </div>
        <div className="current-image">
          <img src={dados.current.condition.icon} alt="icon" />
        </div>
      </div>
    </>
  );
}

export default Current;
