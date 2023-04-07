import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {

  return (
      <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>

          <Route exact path="/admin/*" element={<AdminRoutes />} />

          <Route exact path="/*" element={<UserRoutes />} />

        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
