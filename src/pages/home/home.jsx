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
    if (description === "") {alert("Descrição da tarefa vazia!"); return;}

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

  function deleteTask(id_task) {
    fetch("http://localhost:3001/tarefas/" + id_task, {
      method: "DELETE",
    })
      .then(function (response) {
        showAllTasks();
      })

      .catch((erro) => {
        console.log(erro);
      });
  }

  function updateTask(id_task, description, complete) {
    const json = {
      descricao: description,
      concluido: complete === true ? "S" : "N",
    };

    fetch("http://localhost:3001/tarefas/" + id_task, {
      method: "PUT",
      body: JSON.stringify(json),
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then(function (response) {
        showAllTasks();
      })

      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <>
      <div className="container-task">
        <h1>Minhas Taferas</h1>

        {/* Form: Input e Button */}
        <div className="form-task">
          <input
            required={true}
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

        {/* Listagem das tarefas */}
        <div className="all-tasks">
          {allTasks.map((task) => {
            return (
              <Task
                key={task.id_tarefa}
                id_task={task.id_tarefa}
                description={task.descricao}
                complete={task.concluido}
                onClickDelete={deleteTask}
                onClickUpdate={updateTask}
              />
            );
          })}
        </div>
      </div>

      {/* Rodapé */}
      <div className="footer">Feito com ❤️ por Henrique</div>
    </>
  );
}

export default Home;
