import React from "react";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img
        src={user.photoURL}
        alt="profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
