import React from "react";
import { Link } from "react-router";

const HotelCard = ({ hotel }) => {
  return (
    <Link to={`/hostel/${hotel.id}`}>
      <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="p-3">
          <img
            src={hotel.image_url}
            alt={hotel.name}
            className="w-full h-48 rounded-md object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{hotel.name}</h2>
          <p className="text-gray-600">{hotel.location}</p>

          <p className="mt-2 font-semibold">Rating: {hotel.rating}</p>

          <p className="text-gray-300">------------------------------</p>

          <p className="mt-1 text-red-500 font-bold">
            Price : {hotel.pricePerNight} BDT(1/night)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {/* {hotel.amenities.map((a, idx) => (
              <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">
                {a}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
