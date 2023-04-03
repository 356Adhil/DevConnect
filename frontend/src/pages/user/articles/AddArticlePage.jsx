import React from "react";
import AddArticle from "../../../components/user/articles/AddArticle";
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";

function AddArticlePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-24 mb-24">
        <AddArticle />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default AddArticlePage;
