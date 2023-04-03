import React from "react";
import EventView from "../../../components/user/events/EventView";
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";

function EventSinglePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-24 mb-24">
        <EventView />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default EventSinglePage;
