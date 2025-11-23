import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Internships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const companyMap = {
    "cmp1": "DU Telecom",
    "cmp2": "ENOC",
    "cmp3": "EY",
    "cmp4": "Al Futtaim",
    "cmp5": "ADIB Bank",
    "cmp6": "Sharjah Municipality",
    "cmp7": "Sajaya Young Ladies",
    "cmp8": "SIB Bank",
  };

  const stats = [
    { label: "Total Submitted", value: applications.length, color: "bg-blue-600" },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "pending").length,
      color: "bg-amber-500",
    },
    {
      label: "Approved",
      value: applications.filter((a) => a.status === "approved").length,
      color: "bg-green-600",
    },
    {
      label: "Rejected",
      value: applications.filter((a) => a.status === "rejected").length,
      color: "bg-red-600",
    },
  ];

  // Fetch applications for logged-in student
  useEffect(() => {
    if (!user?._id) return;

    fetch(`https://interntrack-server-sptb.onrender.com/internships/student/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApplications(data.applications);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // Filter applications
  const filteredApplications = applications.filter(
    (app) =>
      app.companyId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentMessage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Briefcase size={32} /> My Internship Applications
            </h1>
            <p className="text-gray-600 mb-8">
              Track all your internship submissions and their approval status.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} text-white p-6 rounded-xl`}>
              <h3 className="text-sm">{s.label}</h3>
              <h2 className="text-4xl font-bold mt-2">{s.value}</h2>
            </div>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="flex gap-3 items-center mb-6">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              className="w-full text-sm outline-none"
              placeholder="Search by company, status, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Filter size={18} className="text-gray-500" />
        </div>

        {/* APPLICATION CARDS */}
        {filteredApplications.length === 0 ? (
          <p className="text-gray-600 text-center">No applications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredApplications.map((app, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border shadow-sm space-y-3"
              >
                <h3 className="text-lg font-semibold">
  {companyMap[app.companyId] || "Unknown Company"}
</h3>


                <p className="text-sm">
                  <strong>Status: </strong>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>

                <p className="text-sm">
                  <strong>Your Message:</strong> {app.studentMessage || "—"}
                </p>

                <p className="text-sm flex gap-2 items-center text-gray-600">
                  <Calendar size={16} />
                  Applied On: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
