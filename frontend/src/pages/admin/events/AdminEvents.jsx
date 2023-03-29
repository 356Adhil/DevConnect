import React from "react";
import EventManage from "../../../components/admin/events/EventManage";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

function AdminEvents() {
  return (
    <>
      <Sidebar />
      <div className="py-24 p-5  md:p-32 md:ml-40 ">
        <EventManage />
      </div>
    </>
  );
}

export default AdminEvents;
