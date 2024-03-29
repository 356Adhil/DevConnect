import React, { useEffect, useState } from "react";
import profile from "../../../assets/Profile.jpg";
import instance from "../../../axios";

function UserManage() {
  const [users, setUsers] = useState([]);

  const handleBlock = (id) => {
    instance.get(`/admin/blockuser/${id}`).then(() => {
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isBlock: !user.isBlock } : user
        )
      );
    });
  };

  useEffect(() => {
    instance.get("/admin/getusers").then((res) => {
      if (res.data) {
        setUsers(res.data);
      }
    });
  }, []);

  return (
    <>
    <h1 className="text-2xl font-bold mb-4"><u>Users</u></h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-400 uppercase bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Bio
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr
                className="bg-gray-800 hover:bg-gray-700 text-gray-400"
                  key={user._id}
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {profile ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={profile}
                        alt="user profile"
                      />
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full"
                        src="/images/user-default.png"
                        alt="user profile"
                      />
                    )}
                    <div className="pl-3">
                      <div className="text-base text-gray-300 font-semibold">
                        {user.fullName}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.about}</td>
                  <td className="px-6 py-4">
                    {user.isBlock ? (
                      <div className="flex items-center">
                        <div className=" text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="currentColor"
                            className="bi bi-dot"
                            viewBox="0 0 16 16"
                          >
                            {" "}
                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />{" "}
                          </svg>
                        </div>
                        <div>Blocked</div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className=" text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="currentColor"
                            className="bi bi-dot"
                            viewBox="0 0 16 16"
                          >
                            {" "}
                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />{" "}
                          </svg>
                        </div>
                        <div>Unblocked</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.isBlock ? (
                      <button
                        onClick={() => handleBlock(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(user._id)}
                        className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-md text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserManage;
