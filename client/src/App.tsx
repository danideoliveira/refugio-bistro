import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesApp from "./routes/Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </>
  );
}

export default App;
