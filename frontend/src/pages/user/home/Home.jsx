import React, { useEffect, useState } from "react";
import instance from "../../../axios";
import Articles from "../../../components/user/articles/Articles";
import Cover from "../../../components/user/cover/Cover";
import Navbar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";

function Home() {
  // const user = JSON.parse(localStorage.getItem("user"))
  // const [isBlock,setIsBlock] = useState(Boolean)
  // useEffect(() => {
  //   instance
  //     .get("/getProfile", {
  //       headers: {
  //         Authorization: user.token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.user.isBlock)
  //       setIsBlock(res.data.user.isBlock)
  //     });
  // },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow mt-10 mb-24">
        <Cover />
        <Articles />
      </div>
      <Navbar />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
