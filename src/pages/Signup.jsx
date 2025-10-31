// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handle = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pw);
      navigate("/dashboard");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="container max-w-md">
      <div className="card">
        <h2 className="text-xl font-bold mb-3">Signup</h2>
        <input className="p-2 border rounded w-full mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="p-2 border rounded w-full mb-2" placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={handle} className="bg-green-600 text-white px-4 py-2 rounded">Signup</button>
          <Link to="/login" className="px-4 py-2 border rounded">Login</Link>
        </div>
      </div>
    </div>
  );
}
