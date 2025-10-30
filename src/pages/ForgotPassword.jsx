import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email first!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset email resent successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card bg-base-100 p-6 shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-base-content">
          Forgot Password
        </h2>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleReset} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Send Reset Email
          </button>
        </form>

        <button onClick={handleResend} className="btn btn-link w-full mt-3">
          Resend Email
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
