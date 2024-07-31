import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Location from "../pages/Location/Location";

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
      </Routes>
    </>
  );
}

export default RoutesApp;
