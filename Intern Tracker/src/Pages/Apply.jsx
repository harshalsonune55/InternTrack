import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Globe,
  UsersRound,
  MapPin,
  CheckCircle,
  X
} from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Apply() {
  const { state } = useLocation();
  const company = state?.company;
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    // You can add API call later
    setShowSuccess(true);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        {/* BACK BUTTON */}
        <button
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-2">Apply to {company?.name}</h1>
        <p className="text-gray-600 mb-6">
          Fill the form below to submit your internship application
        </p>

        <div className="bg-white rounded-xl border shadow-sm p-8 max-w-4xl">
          {/* DETAILS SECTION */}
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
            <p className="flex items-center gap-2">
              <Building2 size={18} className="text-green-600" /> <strong>Name:</strong>{" "}
              {company?.name}
            </p>
            <p className="flex items-center gap-2">
              <UsersRound size={18} className="text-green-600" />{" "}
              <strong>Contact Person:</strong> {company?.contact}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} /> <strong>Email:</strong> {company?.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} /> <strong>Phone:</strong> {company?.phone}
            </p>
            <p className="flex items-center gap-2 col-span-2">
              <MapPin size={18} /> <strong>Location:</strong> {company?.address}
            </p>
            <p className="flex items-center gap-2">
              <Briefcase size={18} /> <strong>Available Positions:</strong>{" "}
              {company?.positions}
            </p>
            <p className="flex items-center gap-2">
              <Globe size={18} /> <strong>Industry:</strong> {company?.industry}
            </p>
            <p>
              <strong>Company Size:</strong> {company?.size}
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            <strong>About Company:</strong> {company?.about}
          </p>

          {/* APPLICATION FORM */}
          <h2 className="text-xl font-semibold mb-4">Application Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input placeholder="Full Name" className="border p-3 rounded-lg" />
            <input placeholder="Student ID" className="border p-3 rounded-lg" />
            <input placeholder="Email Address" className="border p-3 rounded-lg" />
            <input placeholder="Phone Number" className="border p-3 rounded-lg" />
          </div>

          <textarea
            placeholder="Write a short message / cover note for this application..."
            className="border p-3 rounded-lg w-full mt-6 h-32"
          />

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Submit Application
          </button>
        </div>
      </main>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full relative text-center">

            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              <X size={22} />
            </button>

            <CheckCircle size={80} className="text-green-600 mx-auto mb-4" />

            <h2 className="text-2xl font-bold mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Your application has been successfully submitted to <strong>{company?.name}</strong>.
            </p>

            <button
              onClick={() => navigate("/internships")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-green-700"
            >
              Done
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
