import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const MainLayout = () => {
  const location = useLocation();

  
  const noBannerRoutes = [
    "/update-profile",
    "/my-profile",
    "/about",
    "/hostel/:id", 
  ];


  const showBanner = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {showBanner && <Banner />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
