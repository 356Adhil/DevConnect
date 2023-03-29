import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [showbar, setShowbar] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate('/admin')
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-primary border-b border-gray-200 dark:bg-third dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => {
                  setShowbar(!showbar);
                }}
                type="button"
                className="inline-flex md:hidden items-center p-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path

                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ml-24  md:mr-24">
                <div className="bg-primary rounded-md">
                  <img
                    src="/images/nav-logo.png"
                    className="w-14 "
                    alt="Logo"
                  />
                </div>
                <span className="self-center ml-3  text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  DevConnect
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={` ${
          showbar ? "flex" : "hidden"
        }    fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform md:flex bg-primary border-r border-gray-200 sm:translate-x-0 dark:bg-third dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primary dark:bg-third">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:dark:text-primary hover:font-semibold hover:bg-secondary"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 transition duration-75 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <Link
                to={"/admin/posts"}
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:dark:text-primary hover:font-semibold hover:bg-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="flex-shrink-0 w-6 h-6 transition duration-75"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Posts</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/plans"}
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:dark:text-primary hover:font-semibold hover:bg-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="flex-shrink-0 w-6 h-6 transition duration-75"

                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Plans</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/admin/usermanage"}
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:dark:text-primary hover:font-semibold hover:bg-secondary"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/diarymanage"} className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:dark:text-primary hover:font-semibold hover:bg-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-shrink-0 w-6 h-6 transition duration-75"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                    />
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap">Diaries</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:dark:text-primary hover:font-semibold hover:bg-secondary"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="flex-shrink-0 w-6 h-6 transition duration-75 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>

                <span className="flex ml-3 whitespace-nowrap">Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;