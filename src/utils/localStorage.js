import { getAuth } from "firebase/auth";

const getUserKey = () => {
  const user = getAuth().currentUser;
  return user ? `booked_${user.email}` : "booked_guest";
};

export const saveBookedHotels = (hotels) => {
  const key = getUserKey();
  localStorage.setItem(key, JSON.stringify(hotels));
};

export const getBookedHotels = () => {
  const key = getUserKey();
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
