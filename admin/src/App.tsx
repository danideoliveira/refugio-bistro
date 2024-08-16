import { ToastContainer } from "react-toastify";
import AdminProvider from "./contexts/authAdmin";
import GlobalStyles from "./globalStyles";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/Routes";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <AdminProvider>
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

          <GlobalStyles />
          <RoutesApp />
        </AdminProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
