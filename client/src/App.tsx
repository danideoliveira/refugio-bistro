import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/Routes";
import Header from "./components/Header/Header";
import GlobalStyles from "./globalStyles";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{
              fontSize: "1.5rem",
            }}
          />
          <Header />
          <RoutesApp />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
