import { getAuth } from "firebase/auth";

// ----- BOOKED HOTELS -----
const getUserKey = (prefix = "booked") => {
  const user = getAuth().currentUser;
  return user ? `${prefix}_${user.email}` : `${prefix}_guest`;
};

export const saveBookedHotels = (hotels) => {
  const key = getUserKey("booked");
  localStorage.setItem(key, JSON.stringify(hotels));
};

export const getBookedHotels = () => {
  const key = getUserKey("booked");
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const addBookedHotel = (hotel) => {
  const hotels = getBookedHotels();
  if (!hotels.find((h) => h.id === hotel.id)) {
    hotels.push(hotel);
    saveBookedHotels(hotels);
  }
};

export const removeBookedHotel = (hotelId) => {
  const hotels = getBookedHotels().filter((h) => h.id !== hotelId);
  saveBookedHotels(hotels);
};

// ----- FAVORITES / WISHLIST -----
export const saveFavoriteHotels = (hotels) => {
  const key = getUserKey("favorites");
  localStorage.setItem(key, JSON.stringify(hotels));
};

export const getFavoriteHotels = () => {
  const key = getUserKey("favorites");
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const addFavoriteHotel = (hotel) => {
  const hotels = getFavoriteHotels();
  if (!hotels.find((h) => h.id === hotel.id)) {
    hotels.push(hotel);
    saveFavoriteHotels(hotels);
  }
};

export const removeFavoriteHotel = (hotelId) => {
  const hotels = getFavoriteHotels().filter((h) => h.id !== hotelId);
  saveFavoriteHotels(hotels);
};

// REVIEWS
export const getHotelReviews = (hotelId) => {
  const key = getUserKey("reviews");
  const allReviews = JSON.parse(localStorage.getItem(key)) || {};
  return allReviews[hotelId] || [];
};

export const addHotelReview = (hotelId, review) => {
  const key = getUserKey("reviews");
  const allReviews = JSON.parse(localStorage.getItem(key)) || {};
  if (!allReviews[hotelId]) allReviews[hotelId] = [];
  allReviews[hotelId].push({
    id: Date.now(), // unique ID for delete
    rating: review.rating,
    comment: review.comment,
    date: new Date().toISOString(),
  });
  localStorage.setItem(key, JSON.stringify(allReviews));
};

export const removeHotelReview = (hotelId, reviewId) => {
  const key = getUserKey("reviews");
  const allReviews = JSON.parse(localStorage.getItem(key)) || {};
  if (!allReviews[hotelId]) return;
  allReviews[hotelId] = allReviews[hotelId].filter(r => r.id !== reviewId);
  localStorage.setItem(key, JSON.stringify(allReviews));
};

