import React from "react";
import ArticlePage from "../../../components/user/articles/ArticlePage";
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";

function ArticlePages() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-24 mb-24">
        <ArticlePage />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ArticlePages;
