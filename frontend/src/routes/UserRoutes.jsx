import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/user/home/Home'
import ArticlePages from '../pages/user/articles/ArticlePage'
import ArticleSinglePage from '../pages/user/articles/ArticleSinglePage'
import AddArticlePage from '../pages/user/articles/AddArticlePage'
import ProfilePage from '../pages/user/profile/ProfilePage'
import Private from '../privateRoutes/userRouter'
import ProfileEditPage from '../pages/user/profile/ProfileEditPage'
import EventPage from '../pages/user/events/EventPage'
import EventSinglePage from '../pages/user/events/EventSinglePage'
import UserCommunityPage from '../pages/user/community/CommunityPage';
import AboutPage from '../pages/user/about/AboutPage';
// import CommunityChatWrapper from '../components/user/community/CommunityChatWrapper'
// import Community from '../components/user/community/Community';

function UserRoutes() {
  return (
    <>
      <Routes>

        <Route path="/" exact element={<Home />} />

        <Route path="/articles" exact element={<ArticlePages />} />
        
        <Route path="/single-article" exact element={<ArticleSinglePage />} />

        <Route path="/addArticle" exact element={<AddArticlePage />} />

        <Route path="/profile" exact element={<Private> <ProfilePage /> </Private>} />

        <Route path="/editprofile" exact element={<ProfileEditPage />} />

        <Route path="/events" exact element={<EventPage />} />
        
        <Route path="/single-event" exact element={<EventSinglePage />} />

        <Route path="/community" exact element={<UserCommunityPage />} />
        
        <Route path="/about" exact element={<AboutPage />} />

      </Routes>
    </>
  )
}

export default UserRoutes
