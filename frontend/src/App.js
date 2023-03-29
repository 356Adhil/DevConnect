// import HomeAdmin from "./components/admin/home/Home";
import Home from './pages/user/home/Home'
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
import AdminUsers from "./pages/admin/home/AdminUsers";
import AdminPrivate from './privateRoutes/adminRouter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminEvents from './pages/admin/events/AdminEvents';


function App() {
  // const user = useSelector((state) => state.user);
  // const admin = useSelector((state) => state.admin);

  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
      <Routes>
         <Route path="/admin" exact element={<AdminPrivate> <SignIn /> </AdminPrivate>} /> 

         <Route path="/admin-users" exact element={<AdminPrivate> <AdminUsers /> </AdminPrivate>} /> 

         <Route path="/admin/events" exact element={ <AdminEvents/> } /> 

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
