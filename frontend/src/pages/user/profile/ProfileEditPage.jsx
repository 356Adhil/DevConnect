import React from "react";
import Navbar from "../../../components/user/navbar/Navbar";
import ProfileEdit from "../../../components/user/profile/ProfileEdit";
import Footer from "../../../components/user/footer/Footer";

function ProfileEditPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-24 mb-24">
        <ProfileEdit />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ProfileEditPage;
