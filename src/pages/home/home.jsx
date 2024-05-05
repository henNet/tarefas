import "./home.css";
import Task from "../../components/task/task";
import { useEffect, useState } from "react";

function Home() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tarefas")
      .then(function (response) {
        response.json().then((json) => {
          setAllTasks(json);
        });
      })

      .catch((erro) => {
        console.log(erro);
      });
  });

  // useEffect(()=>{
  //   setAllTasks(apiFake);
  //   console.log("Aqui");
  // });

  return (
    <>
      <div className="container-task">
        <h1>Minhas Taferas</h1>

        <div className="form-task">
          <input
            className="input-task"
            type="text"
            placeholder="Digite uma tarefa ..."
          />
          <button className="btn-task">Inserir Tarefa</button>
        </div>

        <div>
          {allTasks.map((task) => {
            return <Task description={task.descricao} />;
          })}
        </div>
      </div>
      <div className="footer">Feit com ❤️ por Henrique</div>
    </>
  );
}

export default Home;
