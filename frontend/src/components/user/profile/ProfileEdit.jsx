import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import instance from "../../../axios";
import { HashLoader } from "react-spinners";

function ProfileEdit() {
  const user = JSON.parse(localStorage.getItem("user"));
  const {userDetails} = useSelector((state)=> state.user)
  const [data,setData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when the request is sent
    instance
      .get("/getProfile", {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
        setIsLoading(false); // Set isLoading to false after the request is completed
      })
  },[]);

  const onSubmit = async (values, actions) => {
    setIsLoading(true); // Set isLoading to true when the request is sent
    try {
      const response = await instance.post(
        "/editprofile",
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
      // Do something with the response data
    } catch (error) {
      // Do something with the error response data
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  };


  const { values, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: userDetails.fullName,
        email: userDetails.email,
        about: userDetails.about,
      },
      onSubmit,
    });

  return (
    <>
          {isLoading && ( // Render the loader when isLoading is true
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 flex justify-center items-center backdrop-filter backdrop-blur-md">
          <div className="rounded-full p-5">
            <HashLoader color="#36D7B7" size={100} />
          </div>
        </div>
      )}

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
</>
  );
}

export default ProfileEdit;
