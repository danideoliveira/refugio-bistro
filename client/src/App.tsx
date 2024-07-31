import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/Routes";
import Header from "./components/Header/Header";
import GlobalStyles from "./globalStyles";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <RoutesApp />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
