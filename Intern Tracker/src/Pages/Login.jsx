import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If user already logged in → skip login page
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await fetch("https://interntrack-server-sptb.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("Response Data:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server unreachable");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          className="border p-3 rounded-lg w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-green-600 cursor-pointer font-semibold"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}
