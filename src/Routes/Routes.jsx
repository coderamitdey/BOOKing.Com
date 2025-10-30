import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import MyProfile from "../pages/MyProfile";
import UpdateProfile from "../pages/UpdateProfile";
import NotFound from "../pages/NotFound";
import HotelDetails from "../pages/HotelDetails";

import { useAuth } from "../contexts/AuthContext";
import BookedHotels from "../pages/BookedHotels";
import Help from "../pages/Help";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Loading state, spinner optional

  return user ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/help", element: <Help></Help> },
      {
        path: "/hostel/:id",
        element: <PrivateRoute element={<HotelDetails />} />,
      },
      {
        path: "/my-profile",
        element: <PrivateRoute element={<MyProfile />} />,
      },
      {
        path: "/update-profile",
        element: <PrivateRoute element={<UpdateProfile />} />,
      },

      {
        path: "/booked-hotels",
        element: <PrivateRoute element={<BookedHotels />} />,
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
