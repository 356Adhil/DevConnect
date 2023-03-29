import React, { useEffect, useState } from "react";
import instance from "../../../axios";
import Articles from "../../../components/user/articles/Articles";
import Cover from "../../../components/user/cover/Cover";
import Navbar from "../../../components/user/navbar/Navbar";


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
    <div>
      <Cover />
      <Articles />
      <Navbar />
    </div>
  );
}

export default Home;
