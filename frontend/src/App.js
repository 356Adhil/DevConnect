import Home from "./pages/user/home/Home";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/user/profile/ProfilePage";
import ProfileEditPage from "./pages/user/profile/ProfileEditPage";
import SignIn from "./components/admin/signin/SignIn";
import Private from './privateRoutes/userRouter'
import ArticlePages from "./pages/user/articles/ArticlePage";
import ArticleSinglePage from "./pages/user/articles/ArticleSinglePage";
import EventPage from "./pages/user/events/EventPage";


function App() {
  // const user = useSelector((state) => state.user);
  // const admin = useSelector((state) => state.admin);

  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/admin" exact element={<Users />} /> */}
         <Route path="/admin" exact element={<SignIn />} /> 

        <Route path="/" exact element={<Home />} />

        <Route path="/articles" exact element={<ArticlePages />} />
        
        <Route path="/single-article" exact element={<ArticleSinglePage />} />

        <Route path="/profile" exact element={<Private> <ProfilePage /> </Private>} />

        <Route path="/editprofile" exact element={<ProfileEditPage />} />

        <Route path="/events" exact element={<EventPage />} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
