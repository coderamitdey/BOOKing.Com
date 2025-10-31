import React from "react";

const FilterControls = ({ search, setSearch, rating, setRating, price, setPrice }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or location"
        className="input input-bordered w-full md:w-64"
      />

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="select select-bordered w-full md:w-48"
      >
        <option value={0}>Any Rating</option>
        <option value={5}>5⭐ & Up</option>
        <option value={4}>4⭐ & Up</option>
        <option value={3}>3⭐ & Up</option>
      </select>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <label className="text-sm">Max Price:</label>
        <input
          type="range"
          min="0"
          max="3000" 
          step="500"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="range range-primary"
        />
        <span className="ml-2 font-semibold">{price} BDT</span>
      </div>
    </div>
  );
};

export default FilterControls;
