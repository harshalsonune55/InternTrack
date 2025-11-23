import React, { useState, useEffect } from "react";
import { UserCheck, Calendar } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function AdvisorRequests() {
  const [applications, setApplications] = useState([]);

  // FETCH RAW APPLICATIONS (NO FILTER)
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

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen">
        {/* Heading */}
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCheck size={32} />
          Student Internship Requests
        </h1>

        <p className="text-gray-600 mb-8">
          These are ALL applications coming directly from your API.
        </p>

        {/* If no applications */}
        {applications.length === 0 ? (
          <p className="text-gray-600 text-center">No applications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, i) => (
              <div
                key={i}
                className="bg-white p-6 border rounded-xl space-y-3 shadow-sm"
              >
                <h2 className="text-xl font-semibold">
                  Internship ID: {app.internshipId}
                </h2>

                <p className="text-sm text-gray-700">
                  <strong>Student ID:</strong> {app.studentId}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Company ID:</strong> {app.companyId}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Message:</strong> {app.studentMessage || "—"}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Status:</strong> {app.status}
                </p>

                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar size={16} />
                  Applied on:{" "}
                  {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
