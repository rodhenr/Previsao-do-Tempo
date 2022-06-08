import "../styles/Search.css";

function Search({ searchCity, cidade, cityInput }) {
  function handleEnter(event) {
    if (event.keyCode === 13) {
      searchCity();
    } else {
      return;
    }
  }

  return (
    <div className="search">
      <div className="name-search">
        <div className="site-name">
          <h1>Previsão do Tempo</h1>
        </div>
        <div className="search-bar">
          <input
            data-cy="search-input"
            type="text"
            placeholder="Digite a cidade desejada"
            onChange={cityInput}
            value={cidade}
            onKeyDown={(e) => handleEnter(e)}
          />
          <button onClick={() => searchCity()} data-cy="search-button">
            Procurar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
