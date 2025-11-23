import React, { useState } from "react";
import {
  Briefcase,
  TrendingUp,
  Clock,
  UsersRound,
  BriefcaseBusiness,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function EmployerPortal() {
  const [showModal, setShowModal] = useState(false);

  const stats = [
    { label: "Posted Internships", value: 0, color: "bg-blue-600", icon: <BriefcaseBusiness size={28} /> },
    { label: "Active Positions", value: 0, color: "bg-green-600", icon: <TrendingUp size={28} /> },
    { label: "Pending Approvals", value: 0, color: "bg-purple-600", icon: <Clock size={28} /> },
    { label: "Applied Students", value: 0, color: "bg-orange-500", icon: <UsersRound size={28} /> },
  ];

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome – Manage your internship postings</p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} text-white p-6 rounded-xl flex flex-col`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">{s.label}</h3>
                {s.icon}
              </div>
              <h2 className="text-4xl font-bold">{s.value}</h2>
            </div>
          ))}
        </div>

        <button
          className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold flex items-center gap-2 mb-6 hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          + Post New Internship
        </button>

        {/* EMPTY STATE */}
        <div className="bg-white border rounded-xl p-12 text-center shadow-sm">
          <BriefcaseBusiness size={60} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-lg font-semibold">No internships posted yet</h2>
          <p className="text-gray-600 text-sm mt-1">
            Click the button above to post your first internship opportunity
          </p>
        </div>
      </main>

      {/* ADD INTERNSHIP MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 p-6 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Post New Internship</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={26} />
              </button>
            </div>

            <form className="grid grid-cols-2 gap-4">
              <Input label="Internship Title" />
              <Input label="Company Name" />
              <Input label="Mode (Remote / On-site / Hybrid)" />
              <Input label="Duration (Weeks)" />
              <Input label="Start Date" type="date" />
              <Input label="End Date" type="date" />
              <Input label="Department" />
              <Input label="Supervisor Name" />
              <Input label="Supervisor Email" />
              <div className="col-span-2">
                <label className="text-sm font-semibold">Objectives</label>
                <textarea className="border p-3 rounded-lg w-full mt-1" rows="3" placeholder="Write internship description here..." />
              </div>
            </form>

            <button
              className="w-full mt-5 bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700"
              onClick={() => {
                alert("Internship Posted Successfully ✔");
                setShowModal(false);
              }}
            >
              Save & Publish Internship
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input type={type} className="border p-3 rounded-lg w-full mt-1" />
    </div>
  );
}
