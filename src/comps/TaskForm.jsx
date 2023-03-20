import { useState } from "react";
import config from "../lib/config";
import { sendData } from "../lib/utils";

export default function TaskForm({ onAdd }) {
  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const handleChanges = (e) => {
    const target = e.target;
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData(`${config.apiurl}/tasks/add`, state, {
      success: onAdd,
    });
  };

  return (
    <div className="card card-body p-4 rounded-0 bg-dark text-white">
      <h3>Add a task</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Write a title</label>
        <input
          type="text"
          name="title"
          placeholder="title"
          className="form-control rounded-0 bg-dark text-white"
          onChange={handleChanges}
          value={state.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="description"
          className="form-control rounded-0 bg-dark text-white mb-4"
          onChange={handleChanges}
          value={state.description}
        />
        <button className="btn btn-primary w-100">Save</button>
      </form>
    </div>
  );
}
