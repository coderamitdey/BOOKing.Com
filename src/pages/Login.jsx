import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();


  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must have at least 1 uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must have at least 1 lowercase letter");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate(from, { replace: true }))
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setError("No user found with this email.");
        } else if (err.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError(err.message);
        }
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => navigate(from, { replace: true })) 
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 p-6 shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-base-content">
          Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3 flex items-center justify-center gap-2 hover:bg-base-100 transition-colors"
        >
          <FaGoogle /> Login with Google
        </button>

        <p className="mt-4 text-center text-base-content/70">
          Don’t have an account?{" "}
          <Link to="/register" className="underline text-primary">
            Register
          </Link>
        </p>

        <p className="mt-2 text-center text-base-content/70">
          <Link
            to="/forgot-password"
            state={{ email }}
            className="underline text-primary"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
