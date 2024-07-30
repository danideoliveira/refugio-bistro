import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/Routes";
import Header from "./components/Header/Header";
import GlobalStyles from "./globalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <RoutesApp />
      </BrowserRouter>
    </>
  );
}

export default App;
