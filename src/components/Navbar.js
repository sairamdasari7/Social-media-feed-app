import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, googleLogin, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Social Feed</h1>
      {user ? (
        <div className="flex items-center space-x-4">
          <p>{user.displayName}</p>
          <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={googleLogin} className="bg-blue-500 text-white px-3 py-1 rounded">
          Login with Google
        </button>
      )}
    </nav>
  );
};

export default Navbar;
