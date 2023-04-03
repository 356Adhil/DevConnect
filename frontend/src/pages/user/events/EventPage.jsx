import React from "react";
import Events from "../../../components/user/events/Events";
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";

function EventPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-24 mb-24">
        <Events />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default EventPage;
