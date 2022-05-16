import "../styles/Search.css";

function Search({ searchCity, cidade, setCidade }) {
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
            type="text"
            placeholder="Digite a cidade desejada"
            onChange={(e) => setCidade(e.target.value)}
            value={cidade}
            onKeyDown={(e) => handleEnter(e)}
          />
          <button onClick={() => searchCity()}>Procurar</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
