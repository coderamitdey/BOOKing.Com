import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await updateProfile(user, { displayName: name, photoURL });
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/"), 2000); // redirect to Home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 p-6 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

        {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
