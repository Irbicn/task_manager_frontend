import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Security from "./pages/Security";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Security />}>
      <Route index element={<Home></Home>} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
