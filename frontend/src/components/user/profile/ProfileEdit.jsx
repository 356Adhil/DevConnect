import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data,setData] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/getProfile", {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setData(res.data.user);
      }, []);
  });

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:4000/editprofile",
        {
          fullName: values.fullName,
          email: values.email,
          about: values.about,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      navigate('/profile')
      console.log(response.data);
      // Do something with the response data
    } catch (error) {
      console.log(error.response.data);
      // Do something with the error response data
    }
  };


  const { values, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: '',
        email: '',
        about: "",
      },
      onSubmit,
    });

  return (
    <div className="flex justify-center items-center h-screen">
  <div className="bg-gray-200 px-10 py-5 rounded-xl">
      <Formik>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={values.fullName}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add Your Bio
            </label>
            <textarea  id="about"
              name="about"
              onChange={handleChange}
              value={values.about} className='w-80'></textarea>
          </div>
          <button
          disabled={isSubmitting}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </Formik>
      </div>
</div>
  );
}

export default ProfileEdit;
