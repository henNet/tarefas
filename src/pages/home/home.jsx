import "./home.css";

function Home() {
  return (
    <div className="container-task">
      <h1>Minhas Taferas</h1>

      <div className="form-task">
        <input
          className="input-task"
          type="text"
          placeholder="Digite uma tarefa ..."
        />
        <button className="btn-task">
            Inserir Tarefa
        </button>
      </div>
    </div>
  );
}

export default Home;
