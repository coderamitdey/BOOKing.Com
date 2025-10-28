import React, { useEffect, useState } from "react";
import HotelCard from "../components/HoterlCard";

const FILTER_BUTTONS = [
  { key: "all", label: "All Hotels" },
  { key: "popular", label: "Most Popular" },
  { key: "luxury", label: "Most Luxurious" },
  { key: "nearby", label: "Nearby" },
];

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data || []);
        setFilteredHotels(data || []);
      })
      .catch((err) => {
        console.error("Failed to load hotels.json", err);
        setHotels([]);
        setFilteredHotels([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setSortBy("default");

    if (category === "all") {
      setFilteredHotels(hotels);
    } else if (category === "popular") {
      // Most Popular -> highest rating
      const sorted = [...hotels].sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
      setFilteredHotels(sorted);
    } else if (category === "luxury") {
      // Most Luxurious -> highest price
      const sorted = [...hotels].sort(
        (a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0)
      );
      setFilteredHotels(sorted);
    } else if (category === "nearby") {
      // Nearby -> location = Chittagong
      const filtered = hotels.filter((h) =>
        h.location.toLowerCase().includes("chittagong")
      );
      setFilteredHotels(filtered);
    }
  };

  const handleSort = (value) => {
    setSortBy(value);
    const arr = [...filteredHotels];

    if (value === "priceLowHigh")
      arr.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
    else if (value === "priceHighLow")
      arr.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
    else if (value === "ratingHighLow")
      arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (value === "roomsHighLow")
      arr.sort((a, b) => (b.rooms || 0) - (a.rooms || 0));
    else if (value === "default") handleCategory(selectedCategory);

    setFilteredHotels(arr);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
        <h1 className="font-bold text-4xl">Total Hostels<span className="text-red-500">({hotels.length})</span></h1>
      <div className="flex gap-6">
        {/* Left sidebar */}
        <aside className="w-60 bg-base-200 hidden md:flex flex-col gap-3 sticky top-0">
          {FILTER_BUTTONS.map((b) => (
            <button
              key={b.key}
              onClick={() => handleCategory(b.key)}
              className={`btn text-sm justify-start ${
                selectedCategory === b.key ? "btn-primary" : "btn-ghost"
              }`}
            >
              {b.label}
            </button>
          ))}
        </aside>

        {/* Main area */}
        <div className="flex-1">
          {/* top row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            {/* small screen horizontal filter buttons */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-1">
              {FILTER_BUTTONS.map((b) => (
                <button
                  key={b.key}
                  onClick={() => handleCategory(b.key)}
                  className={`btn btn-sm ${
                    selectedCategory === b.key ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Sort dropdown right side */}
            <div className="flex items-center gap-3 justify-end md:justify-end w-full md:w-auto">
              <label className="text-sm text-gray-600 hidden md:block">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="select select-bordered select-sm w-full md:w-48"
              >
                <option value="default">Default</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="ratingHighLow">Rating: High to Low</option>
                <option value="roomsHighLow">Rooms: High to Low</option>
              </select>
            </div>
          </div>

          {/* content */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No hotels found for this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
