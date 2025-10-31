// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CPUScheduler from "./pages/CPUScheduler";
import PageReplacement from "./pages/PageReplacement";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import './index.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-6">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/cpu"
            element={
              <PrivateRoute>
                <CPUScheduler />
              </PrivateRoute>
            }
          />

          <Route
            path="/memory"
            element={
              <PrivateRoute>
                <PageReplacement />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
