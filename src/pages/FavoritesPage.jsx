import React, { useState, useEffect } from "react";
import { getFavoriteHotels, removeFavoriteHotel } from "../utils/localStorage";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    setFavorites(getFavoriteHotels());
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeItem = (id) => {
    removeFavoriteHotel(id);
    loadFavorites(); 
    toast.info("Removed from wishlist.");

   
    const event = new Event("wishlistUpdated");
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
      {favorites.length === 0 ? (
        <p>No favorite hotels yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((hotel) => (
            <li
              key={hotel.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <Link to={`/hostel/${hotel.id}`} className="flex items-center gap-4">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-semibold">{hotel.name}</h2>
                  <p className="text-gray-600">{hotel.location}</p>
                  <p className="text-orange-500 font-bold">
                    Price: {hotel.pricePerNight} BDT/night
                  </p>
                </div>
              </Link>
              <button
                onClick={() => removeItem(hotel.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}

      
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default FavoritesPage;
