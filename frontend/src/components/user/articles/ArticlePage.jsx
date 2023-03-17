import React, { useState } from "react";
// import { Button } from "@material-tailwind/react";
// import AddArticle from "./AddArticle";
// import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import swal from 'sweetalert';

function Articles() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/articles', formData);
      console.log(response)
      setIsModalOpen(false);
      swal("Yaay!", "Article Added Successfully", "success");
      setFormData({ title: '', content: '' });
    } catch (error) {
      console.error(error);
      alert('Error adding article. Please try again later.');
    }
  };

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
        <button
          className="text-white bg-primary p-2 px-3 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Add Article
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 p-6 justify-center">
        <div className="">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-slate-500 text-white uppercase font-mono font-semibold text-lg p-4">
              Article Name
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img
                  className="h-6 w-6 rounded-full mr-2"
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt="Jane Smith"
                />
                <h2 className="text-sm font-medium">Jane Smith</h2>
              </div>
              <p className="text-gray-600">Colorful blooms in the flowerbed</p>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Articles;
