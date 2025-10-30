import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import bookingLogo from "../assets/booking.jpg";
import { getBookedHotels } from "../utils/localStorage";
import { GrCart } from "react-icons/gr";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getBookedHotels().length);
    const interval = setInterval(() => {
      setCartCount(getBookedHotels().length);
    }, 1000); // update count if booking changes
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-base-100 px-4 mb-3">
      <div className="max-w-[1280px] mx-auto flex items-center h-16 relative">
        {/* Hamburger (sm/md) */}
        <div className="lg:hidden ml-2 relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute left-0 top-full mt-2 bg-orange-50 rounded-box w-52 p-2 shadow z-50">
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/help" onClick={() => setIsOpen(false)}>
                  Help
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Logo */}
        <img
          className="h-15 w-15 p-1 rounded-full bg-red-400 mr-2"
          src={bookingLogo}
          alt=""
        />
        <div>
          <Link to="/" className="text-3xl font-bold text-blue-600">
            BOOKing.Com
          </Link>
        </div>

        {/* Center menu (lg+) */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-6 text-lg font-medium">
            <li className="hover:bg-pink-200 rounded-xl p-2">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:bg-pink-200 rounded-xl p-2">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:bg-pink-200 rounded-xl p-2">
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>

        {/* Auth buttons / Profile */}
        <div className="ml-auto flex items-center space-x-2">
          {user ? (
            <>
              <Link to="/update-profile">
                <img
                  src={
                    user.photoURL ||
                    "https://img.icons8.com/?size=48&id=81139&format=png"
                  }
                  alt={user.displayName || user.email}
                  title={user.displayName || user.email}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </Link>

              {/* Booked Hotels Cart */}
              <Link
                to="/booked-hotels"
                className="relative btn btn-sm btn-primary"
                title="Booked Hotels"
              > <GrCart></GrCart>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={logout}
                className="btn btn-sm btn-error hover:scale-105 transition-transform flex items-center gap-1"
              >
                Logout <IoIosLogOut />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-success hover:scale-105 transition-transform flex items-center gap-1"
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm btn-warning hover:scale-105 transition-transform flex items-center gap-1"
              >
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
