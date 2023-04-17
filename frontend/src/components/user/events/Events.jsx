import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import cover1 from "../../../assets/cover1.jpg";
import EventAddModal from "./EventAddModal";
import { useDispatch, useSelector } from "react-redux";
import { setEventData } from "../../../Redux/features/eventSlice";
import instance from "../../../axios";
import EventView from "./EventView";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const [userEvents, setUserEvents] = useState([]);

  function handleAddEvent(newEvent) {
    setUserEvents([...userEvents, newEvent]);
  }

  function handleClick(event) {
    navigate("/single-event", { state: { event } });
  }

  const getUserEvents = (id) => {
    setIsLoading(true); // Set isLoading to true when the request is sent
    try {
      instance.get(`/userEvents/${id}`).then((res) => {
        setUserEvents(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  };

  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.events);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when the request is sent
    try {
      instance
      .get("/events")
      .then((response) => {
        setEvents(response.data);
        dispatch(setEventData(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
    if (userDetails) {
      getUserEvents(userDetails.user._id); // Call getUserEvents on page load
    }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  }, []);

  return (
    <>
      {isLoading && ( // Render the loader when isLoading is true
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 flex justify-center items-center backdrop-filter backdrop-blur-md">
          <div className="rounded-full p-5">
            <HashLoader color="#36D7B7" size={100} />
          </div>
        </div>
      )}
      <div className="container mx-auto md:p-10 sm:p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
          {userDetails && (
            <button
              className="text-white bg-primary p-2 px-3 rounded-lg"
              onClick={() => setShowModal(true)}
            >
              Add Event
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-11">
          {eventData
            ?.filter((event) => event.isApproved)
            .map((event) => (
              <div
                key={event._id}
                onClick={() => handleClick(event)}
                className="bg-white border-y-2 border-x-2 overflow-hidden hover:cursor-pointer"
              >
                <div className="h-48">
                  <img
                    src={event.coverImg}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{event.title}</span>
                    <span className="bg-gray-200 rounded-full py-1 px-2 text-xs text-gray-700">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600 text-sm">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    {event.eventSeats <= 0 && (
                      <span className="text-gray-800 text-sm font-medium bg-yellow-400 rounded-md py-1 px-2 mt-5">
                        Event is already fully booked
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800">{event.description}</p>
                </div>
              </div>
            ))}
        </div>
        {showModal && (
          <EventAddModal
            onClose={() => setShowModal(false)}
            handleAddEvent={handleAddEvent}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {/* ------------------------- */}

        {userDetails && (
          <>
            {userEvents.some((event) => !event.isApproved) && (
              <h1 className="text-3xl font-bold mb-4 mt-12">
                <u>your Events</u>
              </h1>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-11">
              {userEvents
                ?.filter((event) => event.isApproved === false)
                .map((event) => (
                  <div
                    key={event._id}
                    onClick={() => handleClick(event)}
                    className="bg-white border-y-2 border-x-2 overflow-hidden hover:cursor-pointer"
                  >
                    <div className="h-48">
                      <img
                        src={event.coverImg}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{event.title}</span>
                        <span className="bg-gray-200 rounded-full py-1 px-2 text-xs text-gray-700">
                          {event.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-600 text-sm">
                          {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                        <span className="text-gray-800 text-sm bg-yellow-400 rounded-md py-1 px-2">
                          {event.isApproved ? "" : "Pending"}
                        </span>
                      </div>
                      <p className="text-gray-800">{event.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Events;
