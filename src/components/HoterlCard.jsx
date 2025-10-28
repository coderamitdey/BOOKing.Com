import React from "react";

const HotelCard = ({ hotel }) => {
  return (
    <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={hotel.image_url}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{hotel.name}</h2>
        <p className="text-gray-600">{hotel.location}</p>
        <p className="mt-2 text-gray-700">{hotel.description}</p>

        <p className="mt-2 font-semibold">Rating: {hotel.rating}</p>

        <p className="mt-1 text-orange-500 font-bold">
          Price: ৳{hotel.pricePerNight}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {hotel.amenities.map((a, idx) => (
            <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
