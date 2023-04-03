import React from "react";
import SingleArticle from "../../../components/user/articles/SingleArticle";
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";

function ArticleSinglePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-24 mb-24">
        <SingleArticle />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ArticleSinglePage;
