import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import instance from "../../../axios";


function Community() {

    const [community, setCommunity] = useState([])

    useEffect(() => {
        instance
          .get("/community")
          .then((response) => {
            console.log(response.data);
            setCommunity(response.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
          {community.map((community) => (
            <div
              key={community._id}
              className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-medium mb-2">
                {community.name}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
                {community.description}
              </p>
              <Button
                color="blue"
                ripple="light"
                className="text-white text-sm sm:text-base lg:text-md font-bold py-2 px-4"
              >
                Join
              </Button>
            </div>
          ))}
        </div>
      );
}

export default Community;
