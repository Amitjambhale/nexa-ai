import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const didLogout = useRef(false); // ✅ prevent double execution

  useEffect(() => {
    if (didLogout.current) return; // already logged out, skip
    didLogout.current = true;

    // Remove ALL auth-related cookies
    Cookies.remove("access_token");
    Cookies.remove("token_type");
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("mobile");

    // If you stored more cookies, remove them here also
    // Cookies.remove("role");
    // Cookies.remove("userid");
    // Cookies.remove("rolename");

    toast.success("Logout successful!");

    // Redirect to home page (or login page)
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
