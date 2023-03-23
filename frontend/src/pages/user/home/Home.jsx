import React from "react";
import Articles from "../../../components/user/articles/Articles";
import Cover from "../../../components/user/cover/Cover";
import Navbar from "../../../components/user/navbar/Navbar";

function Home() {
  return (
    <div>
      <Cover />
      <Articles />
      <Navbar />
    </div>
  );
}

export default Home;
