import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Location from "../pages/Location/Location";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Private from "./Private";
import Reservation from "../pages/Reservation/Reservation";

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
        <Route
          path="/login"
          element={
            <Private>
              <Login />
            </Private>
          }
        />
        <Route
          path="/register"
          element={
            <Private>
              <Register />
            </Private>
          }
        />
        <Route
          path="/reservation"
          element={
            <Private isReservationPath={true}>
              <Reservation />
            </Private>
          }
        />
      </Routes>
    </>
  );
}

export default RoutesApp;
