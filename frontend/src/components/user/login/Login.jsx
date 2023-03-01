import React from "react";
import { useFormik } from "formik";
import { basicSchema } from "../../../schemas";

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};


function Login() {
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
      fullName: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <div className="flex justify-center mx-96 my-10 rounded-lg py-6 text-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm shadow-xl px-4 py-5 rounded-lg border"
      >
        <div className="text-gray-500 font-bold flex justify-center pb-14 pt-3 text-2xl">
          <h1>Sign Up</h1>
        </div>

        {/* Full Name */}

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              placeholder="Enter Your Name"
              className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${
                touched.fullName && errors.fullName
                  ? "border-red-500"
                  : "focus:border-purple-500"
              }`}
              id="fullName"
              type="text"
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName && (
              <p className="text-red-500 text-xs italic">{errors.fullName}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Phone
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              placeholder="Enter Your Phone Number"
              className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${
                touched.phone && errors.phone
                  ? "border-red-500"
                  : "focus:border-purple-500"
              }`}
              id="phone"
              type="tel"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
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
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
