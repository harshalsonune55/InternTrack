import React from "react";
import {
  Building2,
  Users,
  Briefcase,
  Bell,
  LayoutDashboard,
  GraduationCap,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Sidebar from "../components/Sidebar"; // ⬅ IMPORT FIXED SIDEBAR

export default function Dashboard() {
  const stats = [
    { label: "Partner Companies", value: 9, icon: Building2 },
    { label: "Active Internships", value: 1, icon: Briefcase },
    { label: "Pending Applications", value: 0, icon: Bell },
  ];

  const recentInternships = [
    { title: "Data Science Intern", studentId: "U22123454", company: "DataFlow Analytics", status: "accepted", date: "Sep 9" },
    { title: "Financial Analyst Intern", studentId: "U22098564", company: "Global Financial Services", status: "accepted", date: "Sep 9" },
    { title: "Marketing Intern", studentId: "U22105765", company: "Creative Marketing Agency", status: "active", date: "Sep 9" },
  ];

  return (
    <div className="flex bg-gray-50">
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT - now spaced right */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back! Here's your internship program overview.</p>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="text-green-600" size={28} />
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
              <h2 className="text-3xl font-bold">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* RECENT ACTIVITY */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <Briefcase size={20} className="text-green-600" /> Recent Internship Activity
            </h3>

            <div className="space-y-4">
              {recentInternships.map((item, i) => (
                <div key={i} className="flex items-center justify-between border p-4 rounded-lg bg-gray-50">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">Student ID: {item.studentId}</p>
                    <p className="text-sm text-gray-600">Company: {item.company}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* URGENT NOTIFICATIONS */}
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
              <AlertTriangle size={20} />
              Urgent Notifications
            </h3>
            <p className="text-red-700 text-sm mt-3">No urgent notifications</p>
          </div>
        </div>
      </main>
    </div>
  );
}
