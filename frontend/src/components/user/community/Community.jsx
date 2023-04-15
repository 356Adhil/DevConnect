import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import instance from "../../../axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import CommunityChat from "./CommunityChat";
import { HashLoader } from "react-spinners";

const socket = io.connect("https://api.devconnect.cloud");

function Community() {
  const navigate = useNavigate();
  const [community, setCommunity] = useState([]);
  const [joinedCommunityIds, setJoinedCommunityIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [communityMembers, setCommunityMembers] = useState([]);
  const [communityId,setCommunityId] = useState('')

  const [showChat, setShowChat] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const saveDataToLocalStorage = () => {
    localStorage.setItem("showChat", JSON.stringify(showChat));
    localStorage.setItem("communityId", JSON.stringify(communityId));
  };
  
  useEffect(() => {
    saveDataToLocalStorage();
  }, [showChat, communityId]);

  useEffect(() => {
    const storedShowChat = JSON.parse(localStorage.getItem("showChat"));
    const storedCommunityId = JSON.parse(localStorage.getItem("communityId"));
  
    if (storedShowChat !== null && storedCommunityId !== null) {
      setShowChat(storedShowChat);
      setCommunityId(storedCommunityId);
    }
  }, []);
      

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when the request is sent
    instance
      .get("/community")
      .then((response) => {
        console.log(response.data);
        setCommunity(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false after the request is completed
      });
  }, []);
  
 
  const joinCommunity = (id) => {
    setIsLoading(true); // Set isLoading to true when the request is sent
    instance
      .post(
        `/joinCommunity/${id}`,
        {},
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then((res) => {
        setJoinedCommunityIds([...joinedCommunityIds, id]);
        console.log(res.data);
        const userID = res.data.userData._id;
        const roomID = id;
        setRoom(id);
        setUsername(res.data.userData.fullName);
        console.log(res.data.community);
        setCommunityName(res.data.community.title);
        setCommunityMembers(res.data.community.members)

        if (userID !== "" && roomID !== "") {
          socket.emit("join_room", id);
        }

        setShowChat(true)

        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err);
      toast.error(err);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false after the request is completed
      });
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
        {!showChat ? (
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {community.map((community) => (
              <div
                key={community._id}
                className="p-6 border-2  bg-slate-300 bg-opacity-20 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    <u>{community.title}</u>
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4">
                    {community.description}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    joinCommunity(community._id);
                    setCommunityId(community._id)
                  }}
                  color="green"
                  className="text-white text-sm sm:text-base lg:text-md font-medium py-2 px-4 rounded-full bg-primary bg-opacity-80 hover:bg-primary mt-4 self-end"
                >
                  {joinedCommunityIds.includes(community._id)
                    ? "Open"
                    : community.members.includes(user.user._id)
                    ? "Open"
                    : "Join Now"}
                </Button>
              </div>
            ))}
          </div>
      </div>
        ) : (
          <CommunityChat
            socket={socket}
            username={username}
            room={room}
            communityName={communityName}
            communityMembers={communityMembers}
            communityId={communityId}
          />
        )}
    </>
  );
}

export default Community;
