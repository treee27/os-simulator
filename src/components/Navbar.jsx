// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) { console.error(e); }
  };

  return (
    <nav className="bg-white shadow">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="font-bold text-lg">OS-Sim</Link>
          <Link to="/cpu" className="text-sm text-gray-600">CPU Scheduler</Link>
          <Link to="/memory" className="text-sm text-gray-600">Page Replacement</Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{user.email}</span>
              <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-blue-600">Login</Link>
              <Link to="/signup" className="text-sm text-blue-600">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
