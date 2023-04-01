import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import cover1 from "../../../assets/cover1.jpg";
import EventAddModal from "./EventAddModal";
import { useDispatch, useSelector } from "react-redux";
import { setEventData } from "../../../Redux/features/eventSlice";
import instance from "../../../axios";
import EventView from "./EventView";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [showModal, setShowModal] = useState(false);

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
    instance.get(`/userEvents/${id}`).then((res) => {
      console.log(res.data);
      setUserEvents(res.data);
    });
  };

  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.events);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    instance
      .get("/events")
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
        dispatch(setEventData(response.data));
        console.log(eventData);
      })
      .catch((err) => {
        console.log(err);
      });
    if (userDetails) {
      console.log(userDetails)
      getUserEvents(userDetails.user._id); // Call getUserEvents on page load
    }
  }, []);

  return (
    <>
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
                  <p className="text-gray-600 text-sm mb-2">
                    {event.eventDate}
                  </p>
                  <p className="text-gray-800">{event.description}</p>
                </div>
              </div>
            ))}
          {eventData &&
            eventData.filter((event) => event.isApproved).length === 0 && (
              <p>No events to display</p>
            )}
          {(!eventData || eventData.length === 0) && (
            <p>No events to display</p>
          )}
        </div>
        {showModal && (
          <EventAddModal
            onClose={() => setShowModal(false)}
            handleAddEvent={handleAddEvent}
          />
        )}

        {/* ------------------------- */}

        {userDetails && (
          <>
            {userEvents.some((event) => !event.isApproved) && (
              <h1 className="text-3xl font-bold mb-4 mt-12">
                <u>Pending your Events</u>
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
                          {event.eventDate}
                        </p>
                        <span className="text-gray-800 text-sm bg-yellow-400 rounded-md py-1 px-2">
                          {event.isApproved ? "" : "Pending"}
                        </span>
                      </div>
                      <p className="text-gray-800">{event.description}</p>
                    </div>
                  </div>
                ))}

              {eventData &&
                eventData.filter((event) => event.isApproved).length === 0 && (
                  <p>No events to display</p>
                )}
              {(!eventData || eventData.length === 0) && (
                <p>No events to display</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Events;
