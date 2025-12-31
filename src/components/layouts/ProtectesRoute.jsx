import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "config/utils";

export const ProtectedRoute = () => {
  const loginStatus = isLoggedIn();
  console.log("ProtectedRoute → isLoggedIn():", loginStatus);

  return loginStatus ? <Outlet /> : <Navigate to="/login" replace />;
};
