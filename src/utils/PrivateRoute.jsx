import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

 
  if (loading) {
    return <div className="py-24 text-center">Loading...</div>;
  }

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};

export default PrivateRoute;
