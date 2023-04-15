import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArticleData } from "../../../Redux/features/articleSlice";
import profile from "../../../assets/Profile.jpg";
import { useNavigate } from "react-router-dom";
import instance from "../../../axios";
import { HashLoader } from "react-spinners";


function ArticlePage() {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { articleData } = useSelector((state) => state.article);
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();

  function handleClick(article) {
    setIsLoading(true); // Set isLoading to true when the request is sent
    try {
      navigate("/single-article", { state: { article } });
    } catch (error) {
      console.log(error)
    }  finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  }

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when the request is sent
    try {
      instance.get("/articles").then((res) => {
        const articles = res.data.article;
        dispatch(setArticleData(articles));
      });
    } catch (error) {
      console.log(error)
    }  finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  }, [refresh]);

  const articles = articleData;

  return (
    <>
          {isLoading && ( // Render the loader when isLoading is true
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 flex justify-center items-center">
          <div className="rounded-full p-5">
            <HashLoader color="#36D7B7" size={100} />
          </div>
        </div>
      )}

      <div className="flex justify-between md:p-10 p-6">
        <h1 className="flex text-3xl font-bold font-philosephor text-third">
          Articles
        </h1>
        {userDetails && (
          <button
            className="text-white bg-primary p-2 px-3 rounded-lg"
            onClick={() => navigate("/addArticle")}
          >
            Add Article
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
        {articles?.filter((article) => article.isApproved).map((article) => (
          <div
            key={article._id}
            className="bg-white shadow-md rounded-md overflow-hidden flex flex-col cursor-pointer"
            onClick={() => handleClick(article)}
          >
            <img
              src={article.coverImg}
              alt="Article Image"
              className="w-full hover:shadow-lg object-cover"
              style={{ height: "200px" }}
            />
            <div className="px-4 py-3 flex-grow">
              <h2 className="text-xl font-medium mb-2">{article.title}</h2>
              <div className="h-20 overflow-hidden">
                <div className="text-gray-700 text-base mb-4">
                  {article.content && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${article.content.substring(0, 170)}...`,
                      }}
                    ></div>
                  )}
                  {article.content && article.content.length > 170 && (
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => handleClick(article)}
                    >
                      See More
                    </button>
                  )}
                </div>
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
                  <p className="text-gray-900 font-medium">
                    {article.userName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Published on {article.createdDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ArticlePage;
