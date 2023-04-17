import React, { useState } from "react";
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
import BookEvent from "./BookEvent";
import { useSelector } from "react-redux";

const EventView = () => {
  const [showBookEvent, setShowBookEvent] = useState(false);

  const handleBookEventClick = () => {
    setShowBookEvent(true);
  };
  const location = useLocation();
  const event = location.state.event;

  const { userDetails } = useSelector((state) => state.user);

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
            <p className="text-lg">
              {new Date(event.eventDate).toLocaleDateString()}
            </p>
            <FontAwesomeIcon icon={faClock} className="ml-8 mr-2" />
            <p className="text-lg">{event.eventTime}</p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-8 mr-2" />
            <p className="text-lg">{event.location}</p>
          </div>
          {event.eventSeats > 0 && (
            <div className="text-lg text-gray-700 mb-4">
              {event.eventSeats} Seats
            </div>
          )}
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
            <div>
              {event.eventSeats <= 0 ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  This Event is already fully booked 
                </button>
              ) : (
                <button
                onClick={handleBookEventClick} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Book Event
                </button>
              )}

              {showBookEvent && (
                <BookEvent
                  userId={userDetails.user._id}
                  eventId={event._id}
                  onClose={() => setShowBookEvent(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventView;
