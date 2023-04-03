import React from "react";
import Navbar from "../../../components/user/navbar/Navbar";
import Profile from "../../../components/user/profile/Profile";
import Footer from "../../../components/user/footer/Footer";

function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mb-24">
        <Profile />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ProfilePage;
