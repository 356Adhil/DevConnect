import React from "react";
import Articles from "../../../components/user/articles/Articles";
import SingleArticle from "../../../components/user/articles/SingleArticle";
import Cover from "../../../components/user/cover/Cover";
import Navbar from "../../../components/user/navbar/Navbar";

function Home() {
  return (
    <div>
      <Cover />
      <Articles />
      <SingleArticle />
      <Navbar />
    </div>
  );
}

export default Home;
