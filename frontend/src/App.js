import Home from "./pages/user/home/Home";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/profile/ProfilePage";
import ProfileEditPage from "./pages/profile/ProfileEditPage";
import SignIn from "./components/admin/signin/SignIn";
import Users from "./components/admin/home/Users";



function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);


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
        {admin ?  <Route path="/admin" exact element={<Users />} /> : <Route path="/admin" exact element={<SignIn />} /> }

        <Route path="/" exact element={<Home />} />
        {user &&
        <><Route path="/profile" exact element={<ProfilePage />} /><Route path="/editprofile" exact element={<ProfileEditPage />} /></>
        }
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
