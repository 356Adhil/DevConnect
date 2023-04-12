import React from "react";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import ArticleManage from "../../../components/admin/articles/ArticleManage";

function ArticlesPage() {
  return (
    <>
      <Sidebar />
      <div className="py-24 p-5  md:p-32 md:ml-40 ">
        <ArticleManage />
      </div>
    </>
  );
}

export default ArticlesPage;