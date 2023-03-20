import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../lib/config";
import { sendData } from "../lib/utils";

export default function UserForm({ register = false }) {
  const nav = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSubmit = ({ token }) => {
    if (token) {
      localStorage.setItem("token", token);
      nav("/");
    }
  };

  const handleChanges = (e) => {
    const target = e.target;
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (register) {
      return sendData(`${config.apiurl}/users/add`, state, {
        success: onSubmit,
        error: () => {},
      });
    }
    sendData(`${config.apiurl}/auth/login`, state, {
      success: onSubmit,
      error: () => {},
    });
  };
  return (
    <div className="card card-body bg-dark p-4 text-white">
      <h1>{register ? "Register" : "login"}</h1>
      <form onSubmit={handleSubmit}>
        {register && (
          <>
            <label>Username</label>
            <input
              name="username"
              placeholder="username"
              className="form-control rounded-0 bg-dark text-white mb-3"
              onChange={handleChanges}
              value={state.username}
            />
          </>
        )}
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChanges}
          className="form-control rounded-0 bg-dark text-white mb-3"
          value={state.email}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control rounded-0 bg-dark text-white mb-3"
          onChange={handleChanges}
          value={state.password}
        />

        <button className="btn btn-primary w-100">
          {register ? "Register" : "login"}
        </button>
      </form>
    </div>
  );
}
