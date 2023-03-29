import axios from "../../../axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEventData } from '../../../Redux/features/eventSlice'
import instance from "../../../axios";
import { toast } from 'react-toastify';

function EventAddModal({ onClose }) {

  const dispatch = useDispatch()
  const [eventData, setEventDatas] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventDatas((prevEventData) => ({ ...prevEventData, [name]: value }));
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await instance.post("/events", eventData, {
        headers: {
          Authorization: user.token,
        },
      });
      const response = await instance.get("/events");
      console.log(response.data, "ggggggg");
      dispatch(setEventData(response.data));
      onClose();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      console.log(error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg overflow-hidden sm:w-1/2">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Add Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                name="title"
                value={eventData?.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                name="category"
                value={eventData?.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                name="date"
                value={eventData?.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={eventData?.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventAddModal;
