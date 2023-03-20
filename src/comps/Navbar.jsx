import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Task manager
        </Link>
        {token ? (
          <button className="btn btn-primary" onClick={logout}>
            logout
          </button>
        ) : (
          <div>
            <Link className="btn btn-primary" to="/login">
              login
            </Link>
            <Link className="btn btn-primary" to="/register">
              register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
