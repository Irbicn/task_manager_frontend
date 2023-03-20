import { Outlet } from "react-router-dom";
import Navbar from "../comps/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
