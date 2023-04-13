import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminPrivate from '../privateRoutes/adminRouter'
import SignIn from '../components/admin/signin/SignIn';
import AdminUsers from '../pages/admin/home/AdminUsers';
import AdminEvents from '../pages/admin/events/AdminEvents';
import CommunityPage from '../pages/admin/community/CommunityPage';
import ArticlesPage from '../pages/admin/articles/ArticlesPage';

function AdminRoutes() {
  return (
    <>
      <Routes>
        
        <Route path="/" exact element={<AdminPrivate> <SignIn /> </AdminPrivate>} /> 

        <Route path="/users" exact element={<AdminPrivate> <AdminUsers /> </AdminPrivate>} /> 

        <Route path="/events" exact element={ <AdminEvents /> } /> 
                
        <Route path="/community" exact element={<CommunityPage />} />
        
        <Route path="/articles" exact element={<ArticlesPage />} />

      </Routes>
    </>
  )
}

export default AdminRoutes
