import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "student", // default selection
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://interntrack-server-sptb.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registered Successfully ✔");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Server not reachable. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md space-y-6">

        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {/* Full Name */}
        <input
          className="border p-3 rounded-lg w-full"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          className="border p-3 rounded-lg w-full"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          className="border p-3 rounded-lg w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* USER TYPE DROPDOWN */}
        <div>
          <label className="text-sm font-semibold">Registering As</label>
          <select
            className="border p-3 rounded-lg w-full mt-1"
            value={form.userType}
            onChange={(e) => setForm({ ...form, userType: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="employer">Employer</option>
            <option value="advisor">Advisor</option> {/* ⭐ NEW OPTION */}
          </select>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-sm">
          Already have an account?
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {" "}
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
