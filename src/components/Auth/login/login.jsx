import React, { useState, useEffect, useRef } from "react";
import "./login.scss";
import Cookies from "js-cookie";
import { StudentLogin } from "services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "components/Loader/loader";

const Login = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const registerRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false); // 🔥 Loading state

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("tab") === "register") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.search]);

  useEffect(() => {
    const box = registerRef.current;
    if (!box) return;

    const onScroll = () => {
      if (box.scrollTop > 20) setShowArrow(false);
      else setShowArrow(true);
    };

    box.addEventListener("scroll", onScroll);
    return () => box.removeEventListener("scroll", onScroll);
  }, []);

  const scrollDown = () => {
    if (registerRef.current) {
      registerRef.current.scrollBy({
        top: 1000,
        behavior: "smooth",
      });
    }
  };

  // ---------------- LOGIN API CALL ---------------- //
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔥 Start loader

    try {
      const payload = {
        username,
        password,
      };

      const res = await StudentLogin(payload);

      if (res?.code === 200) {
        const user = res.data;

        // Save cookies
        Cookies.set("access_token", user.access_token, { expires: 7 });
        Cookies.set("token_type", user.token_type, { expires: 7 });
        Cookies.set("name", user.name, { expires: 7 });
        Cookies.set("email", user.email, { expires: 7 });
        Cookies.set("mobile", user.mobile, { expires: 7 });

        // 🔥 SUCCESS TOAST
        toast.success(res.message || "Login successful!");

        // FINAL FIX — SAFE REDIRECT
        navigate("/student-dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Login Failed:", err);

      // 🔥 ERROR TOAST
      toast.error(
        err?.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false); // 🔥 Stop loader
    }
  };

  return (
    <div className="login-wrapper">
      <div className={`container ${active ? "active" : ""}`}>

        {/* ===================== LOGIN FORM ===================== */}
        <div className="form-box login">
          <form action="#" className="form-login" onSubmit={handleLogin}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? <Loader size={20} color="#F59E0B" /> : "Login"} 
            </button>
          </form>
        </div>

        {/* ===================== REGISTER FORM ===================== */}
        <div className="form-box register" ref={registerRef}>
          {showArrow && (
            <button
              className="scroll-indicator"
              onClick={() => scrollDown()}
              type="button"
            >
              ↓
            </button>
          )}
          <form action="#" className="form-register">
            <h1>Registration</h1>

            <div className="register-grid">
              <div className="input-box">
                <input type="text" placeholder="Full Name" required />
                <i className="bx bxs-user"></i>
              </div>

              <div className="input-box">
                <input type="tel" placeholder="Mobile Number" required />
                <i className="bx bxs-phone"></i>
              </div>

              <div className="input-box">
                <input type="email" placeholder="Email" required />
                <i className="bx bxs-envelope"></i>
              </div>

              <div className="input-box">
                <input type="password" placeholder="Password" required />
                <i className="bx bxs-lock-alt"></i>
              </div>

              <div className="input-box">
                <input type="text" placeholder="City" required />
                <i className="bx bxs-city"></i>
              </div>

              <div className="input-box">
                <input type="text" placeholder="State" required />
                <i className="bx bxs-map"></i>
              </div>

              <div className="input-box full-width">
                <input type="text" placeholder="Full Address" required />
                <i className="bx bxs-home"></i>
              </div>

              <div className="input-box full-width date-input-wrapper">
                <input
                  type="text"
                  placeholder="Admission Date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  required
                />
                <i className="bx bxs-calendar"></i>
              </div>
            </div>

            <button type="submit" className="btn">
              Register Now
            </button>
          </form>
        </div>

        {/* ===================== TOGGLE PANEL ===================== */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button
              className="btn register-btn"
              onClick={() => setActive(true)}
            >
              Register
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => setActive(false)}>
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
