import { useEffect, useState } from "react";
import Table from "../comps/Table";
import TaskForm from "../comps/TaskForm";
import config from "../lib/config";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateTask = (newData) => {
    const idx = tasks.findIndex((obj) => obj._id === newData._id);
    tasks[idx] = newData;
  };

  const deleteTask = (id) => {
    const newTasks = [...tasks];
    const idx = tasks.findIndex((obj) => obj._id === id);
    newTasks.splice(idx, 1);
    setTasks(newTasks);
  };
  const addTask = ({ savedTask }) => {
    if (!savedTask) {
      return;
    }
    const newTasks = [...tasks];
    newTasks.push(savedTask);
    setTasks(newTasks);
  };

  useEffect(() => {
    fetch(`${config.apiurl}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setTasks(res.allTasks))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <TaskForm onAdd={addTask} />
        </div>
        <div className="col-md-7">
          <Table
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}
