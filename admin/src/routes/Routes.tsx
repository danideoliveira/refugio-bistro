import { Route, Routes } from "react-router-dom";
import Private from "./Private";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Header from "../components/Header/Header";

function RoutesApp(): JSX.Element {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Private reversePrivate={true}>
              <Header />
              <Dashboard />
            </Private>
          }
        />
        <Route
          path="/login"
          element={
            <Private reversePrivate={false}>
              <Login />
            </Private>
          }
        />
      </Routes>
    </>
  );
}

export default RoutesApp;
