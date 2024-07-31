import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Location from "../pages/Location/Location";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function RoutesApp() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Menu />
              <Location />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default RoutesApp;
