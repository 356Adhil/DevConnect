import Home from "./pages/user/home/Home";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/user/profile/ProfilePage";
import ProfileEditPage from "./pages/user/profile/ProfileEditPage";
import SignIn from "./components/admin/signin/SignIn";
import Users from "./components/admin/home/Users";
import AdminHome from "./pages/admin/home/AdminHome";
import Private from './privateRoutes/userRouter'
import ArticlePages from "./pages/user/articles/ArticlePage";
import AddArticlePage from "./pages/user/articles/AddArticlePage";


function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);

  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/admin" exact element={<Users />} /> */}
         <Route path="/admin" exact element={<SignIn />} /> 

        <Route path="/" exact element={<Home />} />

        <Route path="/articles" exact element={<ArticlePages />} />

        <Route path="/addarticle" exact element={<AddArticlePage />} />
        
        <Route path="/profile" exact element={<Private> <ProfilePage /> </Private>} />

        <Route path="/editprofile" exact element={<ProfileEditPage />} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
