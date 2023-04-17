import React, { useEffect, useState } from "react";
import profile from "../../../assets/empty-profile.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../Redux/features/userSlice";
import instance from "../../../axios";
import { HashLoader } from "react-spinners";

export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"))
      const navigate = useNavigate();
      const dispatch = useDispatch()
      const [isLoading, setIsLoading] = useState(false);

    const {userDetails} = useSelector((state)=> state.user)

    useEffect(() => {
      setIsLoading(true); // Set isLoading to true when the request is sent
      instance
        .get("/getProfile", {
          headers: {
            Authorization: user.token,
          },
        })
        .then((res) => {
          dispatch(setUserDetails(res.data))
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          setIsLoading(false); // Set isLoading to false after the request is completed
        })
    },[]);
    
    const [showEditProfile,setShowEditProfile] = useState(false)

    function handleEditProfile() {
      setShowEditProfile(!showEditProfile)
    }
    
  return (
    <>
          {isLoading && ( // Render the loader when isLoading is true
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 flex justify-center items-center backdrop-filter backdrop-blur-md">
          <div className="rounded-full p-5">
            <HashLoader color="#36D7B7" size={100} />
          </div>
        </div>
      )}
      
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                    </div>
                      <img
                        alt="..."
                        src={profile}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                      onClick={handleEditProfile}
                        className="bg-primary active:bg-secondary uppercase text-white active:text-primary font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  {showEditProfile &&
                    navigate('/editprofile')
                  }
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          22
                        </span>
                        <span className="text-sm text-gray-500">Articles</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          10
                        </span>
                        <span className="text-sm text-gray-500">Savrd Articles</span>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2 uppercase">
                    {userDetails?.user?.fullName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {'user.user.place'}
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    {userDetails?.user?.email}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      {userDetails?.user?.about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

