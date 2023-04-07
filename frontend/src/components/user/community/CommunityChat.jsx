import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const CommunityChat = ({
  socket,
  username,
  room,
  communityName,
  communityMembers,
}) => {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const chatContainerRef = useRef(null); // Create a reference to the chat container

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever a new message is added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messageList]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="bg-white shadow-md rounded-lg lg:max-w-3xl lg:mx-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h1 className="text-lg font-semibold text-gray-800">
            {communityName} Group
          </h1>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v1h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h1V4zm2 2v8h8V6H6zm2 2a1 1 0 00-1 1v1a1 1 0 001 1h4a1 1 0 001-1V9a1 1 0 00-1-1H8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-600">{communityMembers.length}</span>
          </div>
        </div>
        <div
          className="px-4 py-2"
          style={{ height: "400px", maxHeight: "400px", overflowY: "auto" }}
          ref={chatContainerRef}
        >
          {messageList.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col mb-4 ${
                username === message.author ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`${
                  username === message.author
                    ? "bg-green-600 text-white"
                    : "bg-gray-600 text-white"
                } rounded-lg px-4 py-2 max-w-2/3 break-all`}
              >
                {message.message}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {message.author} - {message.time}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-100 border-t border-gray-300">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              className="flex-1 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Type your message here"
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
            >
              Send
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-100 border-t border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">
            Community Members
          </h2>
          <ul className="mt-2">
            {communityMembers.map((member) => (
              <li key={member.id} className="text-gray-700">
                Member
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
