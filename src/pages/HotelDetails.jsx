import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addBookedHotel,
  removeBookedHotel,
  getBookedHotels,
} from "../utils/localStorage";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [booked, setBooked] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((h) => h.id === parseInt(id));
        setHotel(selected);

        const bookedHotels = getBookedHotels();
        if (bookedHotels.find((h) => h.id === parseInt(id))) {
          setBooked(true);
        }

        if (selected) {
          // Generate dynamic review data based on rating
          const rating = selected.rating || 0;
          const tempData = [1, 2, 3, 4, 5].map((star) => ({
            star: `${star}⭐`,
            reviews: Math.max(
              0,
              Math.round(Math.random() * 20 + (star <= rating ? 30 : 5))
            ),
          }));
          setReviewData(tempData);
        }
      });
  }, [id]);

  if (!hotel) return <div className="text-center py-24">Hotel not found.</div>;

  const handleBooking = () => {
    addBookedHotel(hotel);
    setBooked(true);
    toast.success("Booking successful!", { position: "top-right" });
  };

  const handleDelete = () => {
    removeBookedHotel(hotel.id);
    setBooked(false);
    toast.info("Booking removed.", { position: "top-right" });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Top: Hotel Info */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <img
            src={hotel.image_url}
            alt={hotel.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600">{hotel.location}</p>
          <p className="text-yellow-500 font-semibold">
            Rating: {hotel.rating}
          </p>
          <p>Rooms: {hotel.rooms}</p>
          <p className="text-orange-500 font-bold">
            Price: {hotel.pricePerNight} BDT / night
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {hotel.amenities.map((a, idx) => (
              <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">
                {a}
              </span>
            ))}
          </div>

          <p className="mt-4">{hotel.description}</p>

          <div className="flex items-center gap-3 mt-6">
            {!booked ? (
              <button onClick={handleBooking} className="btn btn-primary">
                Book Now
              </button>
            ) : (
              <button
                onClick={handleDelete}
                className="btn btn-error flex items-center gap-2"
              >
                <FaTrash /> Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Reviews Distribution</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={reviewData}
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="star" />
              <Tooltip />
              <Bar dataKey="reviews" fill="#4f46e5">
                <LabelList dataKey="reviews" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default HotelDetails;
