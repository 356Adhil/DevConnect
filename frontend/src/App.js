
import Home from "./pages/home/Home";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
