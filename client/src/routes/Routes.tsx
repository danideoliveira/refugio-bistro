import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";

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
            </>
          }
        />
      </Routes>
    </>
  );
}

export default RoutesApp;
