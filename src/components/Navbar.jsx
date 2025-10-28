import { Link } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-sm px-4">
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
            <ul className="absolute left-0 top-full mt-2 bg-base-100 rounded-box w-52 p-2 shadow z-50">
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
        <div>
          <Link to="/" className="text-3xl font-bold text-orange-500">
            BOOKing.Com
          </Link>
        </div>

        {/* Center menu (lg+) */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-6 text-lg font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>

        {/* Auth buttons / Profile */}
        <div className="ml-auto flex items-center space-x-2">
          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/4pDNDk1/default-user.png"
                  }
                  alt={user.displayName || user.email}
                  title={user.displayName || user.email}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
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
