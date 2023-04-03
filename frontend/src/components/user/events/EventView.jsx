import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faBook,
  faUserFriends,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const EventView = () => {
  const location = useLocation();
  const event = location.state.event;

  const guests = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4">
        <img
          className="h-64 w-full object-cover"
          src={event.coverImg}
          alt={event.title}
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center text-gray-500 mb-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            <p className="text-lg">{new Date(event.eventDate).toLocaleDateString()}</p>
            <FontAwesomeIcon icon={faClock} className="ml-8 mr-2" />
            <p className="text-lg">{event.eventTime}</p>
            <FontAwesomeIcon icon={faUserFriends} className="ml-8 mr-2" />
            <p className="text-lg">{guests.length} Guests</p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-8 mr-2" />
            <p className="text-lg">{event.location}</p>
          </div>
          <div className="text-lg text-gray-700 mb-4">{event.description}</div>
          <div className="text-gray-500 mb-4">
            <p className="text-lg font-medium">Category: {event.category}</p>
          </div>
          {event.isApproved === false && (
            <div className=" mb-4">
              <span className="text-gray-800 text-sm bg-yellow-400 rounded-md py-1 px-2">
                {event.isApproved ? "" : "Pending"}
              </span>
            </div>
          )}
          {event.isApproved && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Book Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventView;
