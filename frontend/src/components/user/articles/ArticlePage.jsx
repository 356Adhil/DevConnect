import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setArticleData } from "../../../Redux/features/articleSlice";
import profile from "../../../assets/Profile.jpg";
import { useNavigate } from "react-router-dom";
import articleCover from "../../../assets/articleCover.webp";
import JoditEditor from "jodit-react";
import instance from "../../../axios";

function ArticlePage() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    contents: "",
  });
  const [formImg, setFormImg] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormImg((prevFormImg) => ({ ...prevFormImg, [name]: value }));
  };

  const handleImageChange = (event) => {
    setFormImg(event.target.files[0]);
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

    if (!formImg) {
      toast.error("Please select an image.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      let form = new FormData();
      form.append("title", formData.title);
      form.append("content", content);
      form.append("image", formImg);

      const response = await instance.post("/articles", form, {
        headers: {
          Authorization: user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      console.log(data);
      dispatch(setArticleData([...articleData, data]));
      setRefresh(!refresh);
      setIsModalOpen(false);
      setFormData({ title: "", content: "" });
      setFormImg(null);
      toast.success("Article created successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    instance.get("/articles").then((res) => {
      const articles = res.data.article;
      dispatch(setArticleData(articles));
    });
  }, [refresh]);

  const articles = articleData;

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-40 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full m-4 md:m-0 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Add Article</h2>
            <form
              className="flex flex-col space-y-4"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <label className="text-sm font-medium" htmlFor="title">
                Title
              </label>
              <input
                required
                className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
              />

              <label className="text-sm font-medium" htmlFor="image">
                Cover Image
              </label>
              <input
                className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  handleImageChange(event);
                }}
                required
              />

              <label className="text-sm font-medium" htmlFor="content">
                Content
              </label>

              <div className="h-64 overflow-y-auto">
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                />
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <button
                  // onClick={() => {
                  //   setRefresh(!refresh);
                  // }}
                  className="bg-primary text-white py-2 px-4 rounded-lg w-full md:w-auto"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg w-full md:w-auto"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ title: "", contents: "" });
                    setContent("");
                  }}
                >
                  Cancel
                </button>
              </div>
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
          <div
            key={article._id}
            className="bg-white shadow-md rounded-md overflow-hidden flex flex-col cursor-pointer"
            onClick={() => handleClick(article)}
          >
            <img
              src={article.coverImg}
              alt="Article Image"
              className="w-full hover:shadow-lg object-cover"
              style={{ height: "200px"}}
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
                  {article.content && article.content.length > 170 &&(
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
