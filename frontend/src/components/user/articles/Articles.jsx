import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Articles() {
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

  const posts = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      image: "https://picsum.photos/id/1018/300/200",
      caption: "Beautiful flowers in my garden",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      image: "https://picsum.photos/id/1025/300/200",
      caption: "Lush greenery in the park",
    },
    {
      id: 3,
      user: {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      image: "https://picsum.photos/id/1035/300/200",
      caption: "Succulent plants on my windowsill",
    },
    {
      id: 4,
      user: {
        name: "Samantha Lee",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      image: "https://picsum.photos/id/1043/300/200",
      caption: "A walk in the forest",
    },
    {
      id: 5,
      user: {
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      image: "https://picsum.photos/id/1052/300/200",
      caption: "Colorful blooms in the flowerbed",
    },
  ];

  return (
    <>
      <div className="  flex  w-full py-5  flex-col bg-secondory overflow-hidden">
        <h1 className=" flex  px-5 pt-4 text-3xl font-bold font-philosephor  text-third md:mx-20 md:px-10">
          Latest Articles
        </h1>
        <div className="container mx-auto mt-8 p-5">
          <Slider {...settings}>
            {posts.map((post) => (
              <div key={post.id} className="px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img className="w-full" src={post.image} alt={post.caption} />
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={post.user.avatar}
                        alt={post.user.name}
                      />
                      <h2 className="text-lg font-medium">{post.user.name}</h2>
                    </div>
                    <p className="text-gray-600">{post.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Articles;