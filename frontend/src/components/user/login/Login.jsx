import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { basicSchema } from "../../../schemas";

const onSubmit = async (values, actions) => {
  try {
    const response = await axios.post('http://localhost:4000/login', values);
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }

  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

function Login() {
  const [showModal, setShowModal] = useState(true);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <div className="px-8 md:flex md:justify-center lg:mx-96 md:mx-20 md:my-20 xl:my-10 xl:rounded-xl xl:py-6 text-sm">
      {showModal ? (
        <form
          onSubmit={handleSubmit}
          className="w-80 md:w-full md:max-w-sm shadow-xl px-4 py-5 rounded-lg border bg-white fixed "
        >
          
          <button
            className="float-right ml-auto  border-0 p-1  text-xl font-semibold leading-none text-black outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          <div className="text-gray-500 font-bold flex justify-center pb-14 pt-3 text-2xl">
            <h1><u>Login</u></h1>
          </div>

          {/* Email */}

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "focus:border-purple-500"
                }`}
                placeholder="Enter Your Email"
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password */}

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${
                  touched.password && errors.password
                    ? "border-red-500"
                    : "focus:border-purple-500"
                }`}
                id="inline-password"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center justify-center">
            <div className="">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default Login;
