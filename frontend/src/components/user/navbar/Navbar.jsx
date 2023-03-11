import React, { useState, useEffect } from "react";
import Logo from "../../../assets/NDevConnect.svg";
import LogoN from "../../../assets/devconnect.svg";
import "./Navbar.css";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";



function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [hamburg, setHamburg] = useState(true);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function HandleLogout(){
    localStorage.removeItem("user");
    dispatch({type:"USER_LOGOUT"});
    navigate('/')
  };
  
  function handleHamburg() {
    if (hamburg) {
      setHamburg(false);
    } else {
      setHamburg(true);
    }
  }

  function handleProfile() {
    navigate('/profile');
  }

  function handleSignup() {
    if (showSignup) {
      setShowSignup(false);
      setHamburg(true);
      setShowLogin(false);
    } else {
      setShowLogin(false);
      setShowSignup(true);
      setHamburg(true);
    }
  }

  function handleLogin() {
    if (showLogin) {
      setShowLogin(false);
      setHamburg(true);
      setShowSignup(false);
    } else {
      setShowSignup(false);
      setShowLogin(true);
      setHamburg(true);
    }
  }

  

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div >
      <nav
        className={`bg-primary font-bold text-sm text-white ${
          scroll ? "navbar-scroll" : ""
        }`}
      >
        <div className="flex justify-between md:items-center p-5">
          <div>
            <img src={scroll ? Logo : LogoN} alt="" />
          </div>

          <div className={`${hamburg ? "hidden md:block" : "block"}`}>
            <ul className="md:flex gap-6 xl:gap-11 text-xs md:text-sm">
              <li onClick={()=>{navigate('/')}} className="md:hover:text-secondary-200 py-2 cursor-pointer">
                <span>Home</span>
              </li>
              <li className="hover:text-secondary-200 py-2 cursor-pointer">
                <span>Community</span>
              </li>
              <li className="hover:text-secondary-200 py-2 cursor-pointer">
                <span>Events</span>
              </li>
              <li className="hover:text-secondary-200 py-2 cursor-pointer">
                <span>Articles</span>
              </li>
              <li className="hover:text-secondary-200 py-2 cursor-pointer">
                <span>About Us</span>
              </li>
            </ul>
          </div>

          <div
            className={`${hamburg ? "hidden md:block" : " flex items-center"}`}
          >
            <ul className="flex gap-3 items-center">
              {!user &&
              <li onClick={handleLogin}>
                <button className="border-transparent items-center border-2 bg-secondary hover:bg-primary text-primary hover:border-white hover:text-white md:py-2 md:pr-5 md:pl-5 py-1 pr-4 pl-4 rounded-full">
                  Login
                </button>
              </li>
              }
              {!user &&
              <li onClick={handleSignup}>
                <button>Sign Up</button>
              </li>
              }

              {user &&
              <li onClick={HandleLogout}>
                <button>Logout</button>
              </li>
              }
              {user &&
              <li onClick={handleProfile}>
                <button>Profile</button>
              </li>
              }
            </ul>
          </div>

          {hamburg && (
            <div className="md:hidden cursor-pointer" onClick={handleHamburg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          )}
          {!hamburg && (
            <div className="md:hidden cursor-pointer" onClick={handleHamburg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>
      </nav>
      <div className="absolute inset-y-0 md:mx-80 md:my-28 flex my-28 ml-1">
        {showSignup ? <Signup /> : ""}
      </div>

      <div className="absolute inset-y-0 md:mx-80 md:my-28 flex my-28 ml-1">
        {showLogin ? <Login /> : ""}
      </div>
    </div>
  );
}

export default Navbar;
