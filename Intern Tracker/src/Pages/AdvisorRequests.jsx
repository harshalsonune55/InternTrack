import React, { useState, useEffect } from "react";
import { UserCheck, Search, Filter, Calendar } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function AdvisorRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")); // advisor login

  // FETCH APPLICATIONS FOR THE ADVISOR
  useEffect(() => {
    fetch(`https://interntrack-server-sptb.onrender.com/advisor/applications/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApplications(data.applications);
        }
      })
      .catch((err) => console.error("Advisor Fetch Error:", err));
  }, []);
  

  // Stats
  const stats = [
    { label: "Total Requests", value: applications.length, color: "bg-blue-600" },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "pending").length,
      color: "bg-yellow-500",
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

  // Search filter
  const filtered = applications.filter((app) => {
    const student = app.studentId?.name?.toLowerCase() || "";
    const company = app.companyId?.name?.toLowerCase() || "";
    const internship = app.internshipId?.title?.toLowerCase() || "";
    const status = app.status?.toLowerCase() || "";

    return (
      student.includes(searchTerm.toLowerCase()) ||
      company.includes(searchTerm.toLowerCase()) ||
      internship.includes(searchTerm.toLowerCase()) ||
      status.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen">
        {/* Heading */}
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCheck size={32} />
          Student Internship Requests
        </h1>
        <p className="text-gray-600 mb-8">Review and manage internship applications submitted by students.</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} text-white p-6 rounded-xl`}>
              <h3 className="text-sm">{s.label}</h3>
              <h2 className="text-4xl font-bold mt-1">{s.value}</h2>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              className="w-full text-sm outline-none"
              placeholder="Search by student, company, status, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Filter size={18} className="text-gray-500" />
        </div>

        {/* Request Cards */}
        {filtered.length === 0 ? (
          <p className="text-gray-600 text-center">No requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((app, i) => (
              <div key={i} className="bg-white p-6 border rounded-xl space-y-3 shadow-sm">
                <h2 className="text-xl font-semibold">
                  {app.internshipId?.title || "Unknown Role"}
                </h2>

                <p className="text-sm text-gray-700">
                  <strong>Student:</strong> {app.studentId?.name} ({app.studentId?.email})
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Company:</strong> {app.companyId?.name}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Message:</strong> {app.studentMessage || "—"}
                </p>

                <p className="text-sm">
                  <strong>Status:</strong>{" "}
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

                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar size={16} />
                  Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
