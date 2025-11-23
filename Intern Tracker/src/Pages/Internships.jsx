import React, { useState } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Edit,
  Calendar,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Internships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const stats = [
    { label: "Total", value: 3, color: "bg-blue-600" },
    { label: "Active", value: 1, color: "bg-green-600" },
    { label: "Pending", value: 0, color: "bg-amber-500" },
    { label: "Completed", value: 0, color: "bg-purple-600" },
  ];

  const internships = [
    {
      title: "Data Science Intern",
      studentId: "U22123454",
      company: "DataFlow Analytics",
      status: "accepted",
      mode: "remote",
      duration: "14 weeks",
      startDate: "Jun 15, 2026",
      endDate: "Jul 24, 2026",
      department: "Analytics",
      supervisor: "Dr. Maria Garcia",
      objectives: "Work on machine learning models",
    },
    {
      title: "Financial Analyst Intern",
      studentId: "U22098564",
      company: "Global Financial Services",
      status: "accepted",
      mode: "on-site",
      duration: "11 weeks",
      startDate: "Jun 10, 2026",
      endDate: "Jul 19, 2026",
      department: "Investment Banking",
      supervisor: "James Wilson",
      objectives: "Support financial analysis",
    },
  ];

  const filteredInternships = internships.filter((i) =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Briefcase size={32} /> Internship Tracking
            </h1>
            <p className="text-gray-600 mb-8">
              Monitor and manage all internship placements
            </p>
          </div>

          {/* <button
            className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700"
            onClick={() => setShowModal(true)}
          >
            + Add Internship
          </button> */}
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

        {/* SEARCH BAR + FILTERS */}
        <div className="flex gap-3 items-center mb-6">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              className="w-full text-sm outline-none"
              placeholder="Search internships by title, student, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Filter size={18} className="text-gray-500" />
          <select className="border bg-white p-3 rounded-xl text-sm">
            <option>All Status</option>
          </select>
          <select className="border bg-white p-3 rounded-xl text-sm">
            <option>All Locations</option>
          </select>
          <select className="border bg-white p-3 rounded-xl text-sm">
            <option>All Companies</option>
          </select>
        </div>

        {/* INTERNSHIP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInternships.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border shadow-sm space-y-3 relative">
              <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
                <Edit size={18} />
              </button>

              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-700">
                👤 {item.studentId} &nbsp; 🏢 {item.company}
              </p>

              <div className="grid grid-cols-2 text-sm gap-3">
                <p><Calendar size={16} /> Start: {item.startDate}</p>
                <p><Calendar size={16} /> End: {item.endDate}</p>
              </div>

              <p className="text-sm"><strong>Department:</strong> {item.department}</p>
              <p className="text-sm"><strong>Supervisor:</strong> {item.supervisor}</p>
              <p className="text-sm text-gray-700"><strong>Objectives:</strong> {item.objectives}</p>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL FOR ADD INTERNSHIP */}
      {/* MODAL FOR ADD NEW COMPANY */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white w-1/2 p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add New Internship / Company Listing</h2>
        <button onClick={() => setShowModal(false)}>
          <X size={26} />
        </button>
      </div>

      <form className="grid grid-cols-2 gap-4">

        <Input label="Company Name" />
        <Input label="Contact Person" />
        
        <div>
          <label className="text-sm font-semibold">Status</label>
          <select className="border p-3 rounded-lg w-full mt-1">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <Input label="Industry" />
        <Input label="Company Size (e.g. 1000+ employees)" />
        <Input label="Email" />
        <Input label="Phone" />
        <Input label="Available Positions" />
        
        <div className="col-span-2">
          <Input label="Website" />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold">Address</label>
          <textarea className="border p-3 rounded-lg w-full mt-1" rows="2" placeholder="Full Address" />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold">About Company</label>
          <textarea className="border p-3 rounded-lg w-full mt-1" rows="3" placeholder="Company description / overview" />
        </div>

      </form>

      <button
        className="w-full mt-5 bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700"
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
