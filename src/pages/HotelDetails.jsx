import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addBookedHotel,
  removeBookedHotel,
  getBookedHotels,
  addFavoriteHotel,
  removeFavoriteHotel,
  getFavoriteHotels,
  getHotelReviews,
  addHotelReview,
  removeHotelReview,
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
  Cell,
} from "recharts";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [booked, setBooked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const initialReviewData = [
    { star: "5⭐", reviews: 10 },
    { star: "4⭐", reviews: 7 },
    { star: "3⭐", reviews: 5 },
    { star: "2⭐", reviews: 2 },
    { star: "1⭐", reviews: 1 },
  ];

  useEffect(() => {
    setLoading(true);
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((h) => h.id === parseInt(id));
        setHotel(selected);

        const bookedHotels = getBookedHotels();
        if (bookedHotels.find((h) => h.id === parseInt(id))) setBooked(true);

        const favHotels = getFavoriteHotels();
        if (favHotels.find((h) => h.id === parseInt(id))) setFavorite(true);

        if (selected) {
          const userReviews = getHotelReviews(selected.id);
          setReviews(userReviews);
          updateReviewData(userReviews);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates.", { position: "top-right" });
      return;
    }
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    addBookedHotel({ ...hotel, checkIn, checkOut, nights });
    setBooked(true);
    toast.success(`Booked for ${nights} night(s)!`, { position: "top-right" });
  };

  const handleDeleteBooking = () => {
    removeBookedHotel(hotel.id);
    setBooked(false);
    toast.info("Booking removed.", { position: "top-right" });
  };

  const handleFavorite = () => {
    if (favorite) {
      removeFavoriteHotel(hotel.id);
      setFavorite(false);
      toast.info("Removed from favorites.", { position: "top-right" });
    } else {
      addFavoriteHotel(hotel);
      setFavorite(true);
      toast.success("Added to favorites!", { position: "top-right" });
    }
  };

  const submitReview = () => {
    if (!newReview.comment.trim()) {
      toast.error("Comment cannot be empty.", { position: "top-right" });
      return;
    }
    addHotelReview(hotel.id, newReview);
    const updatedReviews = getHotelReviews(hotel.id);
    setReviews(updatedReviews);
    setNewReview({ rating: 5, comment: "" });
    toast.success("Review submitted!", { position: "top-right" });
    updateReviewData(updatedReviews);
  };

  const deleteReview = (reviewId) => {
    removeHotelReview(hotel.id, reviewId);
    const updatedReviews = getHotelReviews(hotel.id);
    setReviews(updatedReviews);
    updateReviewData(updatedReviews);
    toast.info("Review deleted.", { position: "top-right" });
  };

  const updateReviewData = (userReviews) => {
    const counts = [1, 2, 3, 4, 5].map((star) => {
      const initial = initialReviewData.find(r => r.star === `${star}⭐`)?.reviews || 0;
      const userCount = userReviews.filter(r => r.rating === star).length;
      return { star: `${star}⭐`, reviews: initial + userCount };
    });
    setReviewData(counts.reverse());
  };

  useEffect(() => {
    updateReviewData(reviews);
  }, [reviews]);

  const getColor = (star) => {
    switch (star) {
      case "5⭐": return "#10b981";
      case "4⭐": return "#3b82f6";
      case "3⭐": return "#facc15";
      case "2⭐": return "#f97316";
      case "1⭐": return "#ef4444";
      default: return "#4f46e5";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!hotel) return <div className="text-center py-24">Hotel not found.</div>;

  const nights = checkIn && checkOut ? Math.ceil((checkOut - checkIn)/(1000*60*60*24)) : 0;
  const totalPrice = nights * (hotel.pricePerNight || 0);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 relative">
          <img
            src={hotel.image_url}
            alt={hotel.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={handleFavorite}
            className="absolute top-4 right-4 text-2xl"
          >
            {favorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-white" />}
          </button>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600">{hotel.location}</p>
          <p className="text-yellow-500 font-semibold">Rating: {hotel.rating}</p>
          <p>Rooms: {hotel.rooms}</p>
          <p className="text-orange-500 font-bold">
            Price: {hotel.pricePerNight} BDT / night
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {hotel.amenities.map((a, idx) => (
              <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">{a}</span>
            ))}
          </div>

          <p className="mt-4">{hotel.description}</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              placeholderText="Check-in"
              className="input input-bordered w-full sm:w-auto"
            />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn}
              placeholderText="Check-out"
              className="input input-bordered w-full sm:w-auto"
            />

            {!booked ? (
              <button onClick={handleBooking} className="btn btn-primary">
                Book Now {nights > 0 ? `(${totalPrice} BDT)` : ""}
              </button>
            ) : (
              <button
                onClick={handleDeleteBooking}
                className="btn btn-error flex items-center gap-2"
              >
                <FaTrash /> Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews chart */}
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
              <Bar dataKey="reviews">
                {reviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.star)} />
                ))}
                <LabelList dataKey="reviews" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Submit review */}
      <div className="bg-base-200 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
        <div className="flex flex-col gap-3">
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            className="select select-bordered w-full sm:w-32"
          >
            <option value={5}>5⭐</option>
            <option value={4}>4⭐</option>
            <option value={3}>3⭐</option>
            <option value={2}>2⭐</option>
            <option value={1}>1⭐</option>
          </select>
          <textarea
            placeholder="Write your comment..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="textarea textarea-bordered w-full"
          />
          <button onClick={submitReview} className="btn btn-primary w-32">
            Submit
          </button>
        </div>

        {reviews.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">All Reviews:</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="p-2 border rounded flex justify-between items-center"
                >
                  <span>
                    <span className="font-semibold">{r.rating}⭐</span>: {r.comment}
                  </span>
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default HotelDetails;
