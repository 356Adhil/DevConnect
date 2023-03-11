
import Home from "./pages/home/Home";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/profile/ProfilePage";



function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const admin = JSON.parse(localStorage.getItem("admin"))
    if (user) {
      dispatch({ type: "USER_LOGIN", payload: user })
    }
    if (admin) {
      dispatch({ type: "ADMIN_LOGIN", payload: admin })
    }
  },[dispatch])

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {user &&
        <Route path="/profile" exact element={<ProfilePage />} />
        }
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
