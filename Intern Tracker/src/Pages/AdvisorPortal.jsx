import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  FileText,
  Bell,
  LogOut,
  Search,
} from "lucide-react";
import Sidebar from "../components/Sidebar";   // ✨ Global Sidebar Import

export default function AdvisorPortal() {

  const stats = [
    { label: "Total Students", value: 7, color: "bg-blue-600" },
    { label: "Active Internships", value: 1, color: "bg-green-600" },
    { label: "Pending Approvals", value: 0, color: "bg-purple-600" },
  ];

  const students = [
    
      { name: "Ayesha Alzarooni", id: "U22123456", status: "placed", dept: "Computer Science", year: "4th Year", gpa: "3.70" },
      { name: "Fatima Al Ketbi", id: "U22111234", status: "placed", dept: "Information Security", year: "4th Year", gpa: "3.65" },
      { name: "Maryam Al Kamali", id: "U22100987", status: "placed", dept: "Software Engineering", year: "4th Year", gpa: "3.72" },
      { name: "Aaliyah Al Falasi", id: "U22104567", status: "placed", dept: "Computer Science", year: "4th Year", gpa: "3.68" },
    
      { name: "Mashaer Ahmed", id: "U22100100", status: "seeking", dept: "Computer Science", year: "4th Year", gpa: "3.60" },
      { name: "Hessa Al Suwaidi", id: "U22099888", status: "seeking", dept: "Artificial Intelligence", year: "3rd Year", gpa: "3.40" },
      { name: "Najla Al Mehairi", id: "U22099555", status: "seeking", dept: "Cybersecurity", year: "3rd Year", gpa: "3.30" },
      { name: "Ayesha Jamal", id: "U22000123", status: "seeking", dept: "Business Administration", year: "3rd Year", gpa: "3.20" },
    
      { name: "Meera Saeed", id: "U22000511", status: "interviewing", dept: "Engineering", year: "4th Year", gpa: "3.10" },
      { name: "Hind Al Kaabi", id: "U22123490", status: "interviewing", dept: "Information Systems", year: "4th Year", gpa: "3.25" },
      { name: "Reem Al Ali", id: "U22111122", status: "interviewing", dept: "Finance", year: "3rd Year", gpa: "3.15" },
      { name: "Sara Al Shehhi", id: "U22077895", status: "interviewing", dept: "Marketing", year: "3rd Year", gpa: "3.22" },
    
      { name: "Abdulla Al Marri", id: "U22055001", status: "placed", dept: "Computer Engineering", year: "4th Year", gpa: "3.50" },
      { name: "Rashed Al Mansoori", id: "U22066331", status: "seeking", dept: "Mechanical Engineering", year: "3rd Year", gpa: "3.00" },
      { name: "Saeed Al Hammadi", id: "U22088990", status: "interviewing", dept: "Electrical Engineering", year: "4th Year", gpa: "3.18" },
      { name: "Khalifa Al Nuaimi", id: "U22012345", status: "placed", dept: "Business Management", year: "4th Year", gpa: "3.48" },
    
      { name: "Mansoor Al Shamsi", id: "U22156781", status: "seeking", dept: "Civil Engineering", year: "3rd Year", gpa: "2.95" },
      { name: "Omar Al Zaabi", id: "U22100990", status: "interviewing", dept: "Computer Science", year: "4th Year", gpa: "3.12" },
      { name: "Latifa Al Daheri", id: "U22133445", status: "placed", dept: "Software Engineering", year: "4th Year", gpa: "3.78" },
      { name: "Noora Al Mazrouei", id: "U22155667", status: "seeking", dept: "Accounting", year: "3rd Year", gpa: "3.05" }
    
    
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50">
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <h1 className="text-3xl font-bold">Academic Advisor Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, Grade Mate – Monitor and guide your students</p>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} text-white p-6 rounded-xl`}>
              <h3 className="text-sm">{s.label}</h3>
              <h2 className="text-4xl font-bold mt-2">{s.value}</h2>
            </div>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-xl border mb-6">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search students by name or ID..."
            className="w-full text-sm outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* STUDENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="text-sm text-gray-700">{s.id}</p>
                <StatusBadge status={s.status} />
                <p><strong>Department:</strong> {s.dept}</p>
                <p><strong>Year:</strong> {s.year}</p>
                <p><strong>GPA:</strong> {s.gpa}</p>
                <p className="text-sm text-gray-600">📄 0 Internships</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No students found</p>
          )}
        </div>
      </main>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  const color =
    status === "placed"
      ? "bg-green-100 text-green-700"
      : status === "interviewing"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{status}</span>;
}
