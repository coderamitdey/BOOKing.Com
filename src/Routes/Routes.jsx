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
import BookedHotels from "../pages/BookedHotels";
import Help from "../pages/Help";
import FavoritesPage from "../pages/FavoritesPage"; 

import PrivateRoute from "../utils/PrivateRoute";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/help", element: <Help /> },

      {
        path: "/hostel/:id",
        element: (
          <PrivateRoute>
            <HotelDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/booked-hotels",
        element: (
          <PrivateRoute>
            <BookedHotels />
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        ),
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
