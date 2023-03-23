import React from "react";
import Slider from "react-slick";
import profile from "../../../assets/Profile.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import articleCover from "../../../assets/articleCover.webp";
import { useNavigate } from "react-router-dom";


function Articles() {

  const {articleData} = useSelector((state)=> state.article)

  function handleClick(article) {
    navigate('/single-article', { state: { article } });
  }

  const navigate = useNavigate();


  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const articles = articleData
  

  return (
    <>
      <div className="  flex  w-full py-5  flex-col bg-secondory overflow-hidden">
        <h1 className=" flex  px-5 pt-4 text-3xl font-bold font-philosephor  text-third md:mx-20 md:px-10">
          Latest Articles
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8 p-8">
  {articles.map((article) => (
    <div key={article._id} className="bg-white shadow-md rounded-md overflow-hidden flex flex-col cursor-pointer" onClick={()=> handleClick(article)}>
      <img src={articleCover} alt="Article Image" className="w-full" />
      <div className="px-4 py-3 flex-grow">
        <h2 className="text-xl font-medium mb-2">{article.title}</h2>
        <div className="h-20 overflow-hidden">
        <p className="text-gray-700 text-base mb-4">
          {article.content.length > 150
            ? article.content.slice(0, 150) + "... "
            : article.content}
          {article.content.length > 150 && (
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={()=> handleClick(article)}
            >
              See More
            </button>
          )}
        </p>
        </div>
      </div>
      <div className="mt-auto px-4 py-3">
        <div className="flex items-center">
          <img
            src={profile}
            alt="Author Image"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="text-gray-900 font-medium">{article.userName}</p>
            <p className="text-gray-600 text-sm">
              Published on {article.createdDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  );
}

export default Articles;