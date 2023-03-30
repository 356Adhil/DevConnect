import React from "react";
import CommunityManage from "../../../components/admin/community/CommunityManage";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

function CommunityPage() {
  return (
    <>
      <Sidebar />
      <div className="py-24 p-5  md:p-32 md:ml-40 ">
        <CommunityManage />
      </div>
    </>
  );
}

export default CommunityPage;