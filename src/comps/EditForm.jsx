import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../lib/config";
import { sendData } from "../lib/utils";

export default function EditForm({
  title,
  description,
  id,
  onError = (err) => {
    console.error(err);
  },
}) {
  const nav = useNavigate();
  const [state, setState] = useState({
    title,
    description,
  });

  const onSubmit = ({ task }) => {
    if (task) {
      nav("/");
    }
  };

  const handleChanges = (e) => {
    const target = e.target;
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData(`${config.apiurl}/tasks/edit/${id}`, state, {
      success: onSubmit,
      error: onError,
    });
  };
  return (
    <div className="card card-body bg-dark p-4 text-white">
      <h1>Update a task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChanges}
          className="form-control rounded-0 bg-dark text-white mb-3"
          value={state.title}
        />
        <textarea
          name="description"
          placeholder="description"
          className="form-control rounded-0 bg-dark text-white mb-3"
          onChange={handleChanges}
          value={state.description}
        />
        <button className="btn btn-primary w-100">Save</button>
      </form>
    </div>
  );
}
