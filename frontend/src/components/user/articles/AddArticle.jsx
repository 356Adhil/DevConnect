import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setArticleData } from "../../../Redux/features/articleSlice";
import { Navigate, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import instance from "../../../axios";
import { HashLoader } from "react-spinners";

function AddArticle() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    contents: "",
  });

  const navigate = useNavigate();

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
      setIsLoading(true); // Set isLoading to true when the request is sent
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
      setFormData({ title: "", contents: "" });
      setFormImg(null);
      setContent("");
      navigate("/articles");
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
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  };

  return (
    <>
      {isLoading && ( // Render the loader when isLoading is true
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 flex justify-center items-center">
          <div className="rounded-full p-5">
            <HashLoader color="#36D7B7" size={100} />
          </div>
        </div>
      )}
      
      <div className="flex flex-col h-screen">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg m-4 md:m-0">
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

            {!isLoading && (
  <div className="flex-1">
    <JoditEditor
      ref={editor}
      value={content}
      onChange={(newContent) => setContent(newContent)}
      style={{ height: "100%" }}
    />
  </div>
)}


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
                  setFormData({ title: "", contents: "" });
                  setContent("");
                  setFormImg(null);
                  navigate("/articles");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddArticle;
