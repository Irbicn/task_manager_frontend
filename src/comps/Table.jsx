import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../lib/config";

export default function Table({ tasks = [], updateTask, deleteTask }) {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const toggleDone = (id) => {
    setLoading(true);
    fetch(`${config.apiurl}/tasks/done/${id}`)
      .then((res) => res.json())
      .then((data) => updateTask(data.task))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  const handleUpdate = (id) => {
    nav(`/edit/${id}`);
  };
  const handleDelete = (id) => {
    deleteTask(id);
    fetch(`${config.apiurl}/tasks/delete/${id}`)
      .then(() => deleteTask(id))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <table className="table table-bordered table-hover table-dark">
        <thead>
          <tr>
            <th>N°</th>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(({ title, description, _id, done }, idx) => (
            <tr key={_id}>
              <td>{idx + 1}</td>
              <td>{title}</td>
              <td>{description}</td>
              <td className="d-flex">
                <button
                  disabled={loading}
                  onClick={() => toggleDone(_id)}
                  className={`btn ${!done ? "btn-success" : "btn-dark"}`}
                >
                  {done ? "undone" : "done"}
                </button>
                <button
                  disabled={loading}
                  onClick={() => handleDelete(_id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button
                  disabled={loading}
                  onClick={() => handleUpdate(_id)}
                  className="btn btn-info"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!tasks[0] && (
        <h3 className="text-center bg-dark text-white">No Tasks</h3>
      )}
    </>
  );
}
