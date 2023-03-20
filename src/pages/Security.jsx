import { Navigate, useLocation } from "react-router-dom";
import Layout from "./Layout";

export default function Security() {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const unlogged = !token && pathname !== "/login" && pathname !== "/register";
  const logged =
    (!!token && pathname === "/login") || (!!token && pathname === "/register");

  if (logged) {
    return <Navigate to="/" />;
  }
  if (unlogged) {
    return <Navigate to="/login" />;
  }
  return <Layout />;
}
