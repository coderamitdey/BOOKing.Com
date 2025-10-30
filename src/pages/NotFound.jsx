import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 px-4">
      <div className="text-center">
        <FaExclamationTriangle className="text-red-600 text-9xl mb-6 animate-bounce" />
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
        <p className="text-3xl font-semibold text-gray-700 mb-6">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform"
        >
          Back to Home
        </Link>
      </div>
      
    </div>
  );
};

export default NotFound;
