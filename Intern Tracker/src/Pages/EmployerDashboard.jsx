import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Briefcase, AlertTriangle } from "lucide-react";

export default function EmployerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [applications, setApplications] = useState([]);

  // 👉 Fetch all applications for this employer
  const loadApplications = async () => {
    const res = await fetch("https://interntrack-server-sptb.onrender.com/internships/employer/" + user._id);
    const data = await res.json();
    if (data.success) setApplications(data.applications);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // 👉 Accept Internship
  const handleAccept = async (id) => {
    await fetch("https://interntrack-server-sptb.onrender.com/advisor/applications/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId: id, message: "Approved by employer" }),
    });

    loadApplications(); // refresh
  };

  // 👉 Reject Internship
  const handleReject = async (id) => {
    await fetch("https://your-backend-url.com/advisor/applications/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId: id, message: "Rejected by employer" }),
    });

    loadApplications(); // refresh
  };

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Review and manage internship applications.
        </p>

        {/* STATS BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Pending Applications" value={applications.length} color="green" />
          <StatCard label="Approved" value={applications.filter(a => a.status === 'approved').length} color="blue" />
          <StatCard label="Rejected" value={applications.filter(a => a.status === 'rejected').length} color="red" />
        </div>

        {/* APPLICATION LIST */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
            <Briefcase size={20} className="text-green-600" />
            Internship Applications
          </h3>

          {applications.length === 0 ? (
            <p className="text-gray-500 text-sm">No applications yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app._id} className="border p-4 rounded-lg bg-gray-50">
                  <h4 className="font-semibold">{app.studentId?.name}</h4>
                  <p className="text-sm text-gray-600">Student ID: {app.studentId?._id}</p>
                  <p className="text-sm text-gray-600">Position: {app.internshipId?.title}</p>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={() => handleAccept(app._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(app._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">{new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* URGENT NOTIFICATIONS */}
        <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
            <AlertTriangle size={20} />
            Urgent Notifications
          </h3>
          <p className="text-red-700 text-sm mt-3">No urgent notifications</p>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-sm bg-${color}-100 border`}>
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-3xl font-bold text-${color}-700 mt-1">{value}</h2>
    </div>
  );
}
