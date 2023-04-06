import React from 'react';
import Navbar from '../../../components/user/navbar/Navbar';
import Community from '../../../components/user/community/Community';
import Footer from '../../../components/user/footer/Footer';

function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-400 to-blue-500 pt-20">
      <div className="flex-grow px-4 mx-auto max-w-7xl pb-20">
        <h1 className="text-4xl font-bold text-white mt-10 mb-16 text-center">
          Join Our Community
        </h1>
        <Community />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default CommunityPage;
