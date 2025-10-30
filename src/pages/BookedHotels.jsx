import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBookedHotels, removeBookedHotel } from "../utils/localStorage";

const BookedHotels = () => {
  const [bookedHotels, setBookedHotels] = useState([]);

  useEffect(() => {
    setBookedHotels(getBookedHotels());
  }, []);

  const handleDelete = (id) => {
    removeBookedHotel(id);
    setBookedHotels(getBookedHotels());
    toast.info("Booking removed.", { position: "top-right" });
  };

  if (bookedHotels.length === 0)
    return <div className="text-center py-24">No booked hotels yet.</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Booked Hotels</h1>
      <div className="flex flex-col gap-6">
        {bookedHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex flex-col md:flex-row gap-4 bg-base-200 p-4 rounded-lg shadow-md items-center"
          >
            <img
              src={hotel.image_url}
              alt={hotel.name}
              className="w-full md:w-1/3 h-48 object-cover rounded-lg"
            />
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="text-yellow-500 font-semibold">
                Rating: {hotel.rating}
              </p>
              <p className="text-orange-500 font-bold">
                Price: {hotel.pricePerNight} BDT / night
              </p>
            </div>
            <button
              onClick={() => handleDelete(hotel.id)}
              className="btn btn-error flex items-center gap-2 mt-2 md:mt-0"
            >
              <FaTrash /> Cancel Booking
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookedHotels;
