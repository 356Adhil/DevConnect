import React, { useEffect, useState } from "react";
// import { Button } from "@material-tailwind/react";
// import AddArticle from "./AddArticle";
// import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setArticleData } from "../../../Redux/features/articleSlice";
import profile from "../../../assets/Profile.jpg";
import { useNavigate } from "react-router-dom";
import articleCover from "../../../assets/articleCover.webp";

function ArticlePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const { articleData } = useSelector((state) => state.article);
  const { userDetails } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  function handleClick(article) {
    navigate("/single-article", { state: { article } });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/articles",
        formData,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      const data = response.data;
      console.log(data);

      // dispatch(setArticleData(data));
      setIsModalOpen(false);
      setFormData({ title: "", content: "" });
      window.location.reload();
    } catch (error) {
      console.error(error);
      swal("Oops!", "Error adding article. Please try again", "error");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:4000/articles").then((res) => {
      const articles = res.data.article;
      dispatch(setArticleData(articles));
    });
  }, [refresh]);

  const articles = articleData;

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-40 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Add Article</h2>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <label className="text-sm font-medium" htmlFor="title">
                Title
              </label>
              <input
                className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <label className="text-sm font-medium" htmlFor="content">
                Content
              </label>
              <textarea
                className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                name="content"
                rows="5"
                placeholder="Enter article content"
                value={formData.content}
                onChange={handleInputChange}
              ></textarea>
              <button
                onClick={() => {
                  setRefresh(!refresh);
                }}
                className="bg-primary text-white py-2 px-4 rounded-lg"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
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
            onClick={() => setIsModalOpen(true)}
          >
            Add Article
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
  {articles.map((article) => (
    <div key={article._id} className="bg-white shadow-md rounded-md overflow-hidden flex flex-col cursor-pointer" onClick={()=> handleClick(article)}>
      <img src={articleCover} alt="Article Image" className="w-full hover:shadow-lg" />
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

    </>
  );
}

export default ArticlePage;
