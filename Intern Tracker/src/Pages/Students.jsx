import React, { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Phone,
  Star,
  Search,
  FileDown,
  ExternalLink,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [studentsFromDB, setStudentsFromDB] = useState([]);
  const navigate = useNavigate();

  const stats = [
    { label: "Total Students", value: 7, color: "bg-blue-600" },
    { label: "Placed", value: 2, color: "bg-green-600" },
    { label: "Seeking", value: 2, color: "bg-orange-500" },
    { label: "Interviewing", value: 3, color: "bg-purple-600" },
  ];

  /* -------------------------
   HARD CODED STUDENTS (UNCHANGED)
  --------------------------- */
  const hardcodedStudents = [
    { name: "Fatima Al Mansoori", id: "DXB001", status: "interviewing", email: "fatima.mansoori@dubaiuni.ae", phone: "0501234567", gpa: "3.92" },

    // ... rest of your 50 Dubai students ...

    {
      name: "Grade Mate",
      id: "HYUJJ",
      status: "interviewing",
      email: "grademateuae@gmail.com",
      phone: "856432567",
      gpa: "5.00",
    },
    {
      name: "Ayesha Alzarooni",
      id: "U22123456",
      status: "placed",
      department: "Computer Science",
      year: "4th Year",
      email: "ayesha.h@university.uos",
      phone: "0501234567",
      gpa: "3.70",
      skills: ["Digital Marketing", "Social Media", "Analytics"],
    },
    {
      name: "Mashaer Ahmed",
      id: "U22100100",
      status: "seeking",
      department: "Computer Science",
      year: "4th Year",
      email: "mashaer.a@university.uos",
      phone: "0501212121",
      gpa: "3.60",
      skills: ["Java", "Python", "Web Development"],
    },
  ];

  /* -------------------------
     FETCH DATABASE STUDENTS
  --------------------------- */
  useEffect(() => {
    const loadDBStudents = async () => {
      try {
        const res = await fetch(
          "https://interntrack-server-sptb.onrender.com/api/student/all"
        );
        const data = await res.json();

        if (data.success) {
          setStudentsFromDB(
            data.students.map((s) => ({
              name: s.fullName,
              id: s.studentId || "N/A",
              status: s.status || "pending",
              email: s.email,
              phone: s.phone,
              gpa: s.gpa,
              resumeUrl: s.resumeUrl || null, // ⭐ FIXED — use Cloudinary URL
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load students:", err);
      }
    };

    loadDBStudents();
  }, []);

  /* -------------------------
       MERGE HARDCODED + DB
  --------------------------- */
  const allStudents = [...hardcodedStudents, ...studentsFromDB];

  /* -------------------------
        SEARCH FILTER
  --------------------------- */
  const filteredStudents = allStudents.filter((s) =>
    `${s.name} ${s.id} ${s.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* -------------------------
       RESUME DOWNLOAD
  --------------------------- */
  const handleDownload = (filePath) => {
    if (!filePath) return alert("No resume uploaded!");

    const link = document.createElement("a");
    link.href = filePath;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users size={32} /> Student Management
        </h1>
        <p className="text-gray-600 mb-8">
          Track and manage student profiles and placement status
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} text-white p-6 rounded-xl`}>
              <h3 className="text-sm">{s.label}</h3>
              <h2 className="text-4xl font-bold mt-2">{s.value}</h2>
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search students by name, email, or student ID..."
              className="w-full text-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select className="border bg-white p-3 rounded-xl text-sm"><option>All Departments</option></select>
          <select className="border bg-white p-3 rounded-xl text-sm"><option>All Years</option></select>
          <select className="border bg-white p-3 rounded-xl text-sm"><option>All Status</option></select>
        </div>

        {/* STUDENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStudents.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border shadow-sm space-y-3">

              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="text-sm text-gray-600">ID: {s.id}</p>

              <StatusBadge status={s.status} />

              <p className="flex items-center gap-2 text-sm">
                <Mail size={16} /> {s.email}
              </p>

              <p className="flex items-center gap-2 text-sm">
                <Phone size={16} /> {s.phone}
              </p>

              <p className="flex items-center gap-2 text-sm">
                <Star size={16} /> GPA: {s.gpa}
              </p>

              {/* RESUME ACTIONS */}
              <div className="flex gap-3 pt-2">

{/* View Resume */}
<button
  className="flex items-center gap-2 text-green-700 border border-green-400 px-3 py-2 rounded-lg text-sm font-semibold"
  onClick={() =>
    navigate("/viewer", {
      state: {
        pdfUrl: s.resume ? s.resume : "/sampleResume.pdf",
      },
    })
  }
>
  <ExternalLink size={16} /> View Resume
</button>

{/* Download Resume */}
<button
  className="flex items-center gap-2 text-gray-700 border px-3 py-2 rounded-lg text-sm"
  onClick={() =>
    handleDownload(s.resume ? s.resume : "/sampleResume.pdf")
  }
>
  <FileDown size={16} /> Export CV
</button>

</div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  const style =
    status === "placed"
      ? "bg-green-100 text-green-700"
      : status === "interviewing"
      ? "bg-blue-100 text-blue-700"
      : status === "selected"
      ? "bg-purple-100 text-purple-700"
      : status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
