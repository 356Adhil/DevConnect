import React from "react";
import Cover from "../../components/user/cover/Cover";
import Login from "../../components/user/login/Login";
import Navbar from "../../components/user/navbar/Navbar";

function Home() {
  return (
    <div>
      <Cover />
      <Navbar />
      <Login />
    </div>
  );
}

export default Home;
