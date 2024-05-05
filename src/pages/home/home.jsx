import "./home.css";
import Task from "../../components/task/task";
import { useEffect, useState } from "react";

function Home() {
  const [allTasks, setAllTasks] = useState([]);
  const [description, setDescription] = useState("");

  function showAllTasks() {
    fetch("http://localhost:3001/tarefas")
      .then(function (response) {
        response.json().then((json) => {
          setAllTasks(json);
        });
      })

      .catch((erro) => {
        console.log(erro);
      });
  }

  useEffect(() => {
    showAllTasks();
  });

  function addTaks() {
    const json = {
      descricao: description,
      concluido: "N",
    };

    fetch("http://localhost:3001/tarefas", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then(function (response) {
        showAllTasks();
        setDescription("");
      })

      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <>
      <div className="container-task">
        <h1>Minhas Taferas</h1>

        <div className="form-task">
          <input
            className="input-task"
            type="text"
            value={description}
            placeholder="Digite uma tarefa ..."
            onChange={function (e) {
              setDescription(e.target.value);
            }}
          />
          <button onClick={addTaks} className="btn-task">
            Inserir Tarefa
          </button>
        </div>

        <div>
          {allTasks.map((task) => {
            return (
              <Task description={task.descricao} complete={task.concluido} />
            );
          })}
        </div>
      </div>
      <div className="footer">Feit com ❤️ por Henrique</div>
    </>
  );
}

export default Home;
