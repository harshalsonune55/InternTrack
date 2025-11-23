import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, Mail, Phone, Star, ExternalLink, FileDown, User } from "lucide-react";

export default function StudentDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const s = state?.student;

  if (!s) return <p>No data found</p>;

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <button
          className="flex items-center gap-2 text-gray-700 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User size={32} /> {s.name}
          </h1>

          <p className="text-sm text-gray-600">Student ID: {s.id}</p>
          <p className="flex items-center gap-2 text-sm"><Mail size={16} /> {s.email}</p>
          <p className="flex items-center gap-2 text-sm"><Phone size={16} /> {s.phone}</p>
          <p className="flex items-center gap-2 text-sm"><Star size={16} /> GPA: {s.gpa}</p>

          <h3 className="text-lg font-semibold mt-4">Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {s.skills?.map((skill, i) => (
              <span key={i} className="bg-green-100 px-3 py-1 text-green-700 rounded-full text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-5">
            <button
              className="flex items-center gap-2 text-green-700 border border-green-400 px-4 py-2 rounded-lg text-sm font-semibold"
              onClick={() => navigate("/viewer", { state: { pdfUrl: "/sampleResume.pdf" } })}
            >
              <ExternalLink size={16} /> View Resume
            </button>

            <button
              className="flex items-center gap-2 text-gray-700 border px-4 py-2 rounded-lg text-sm"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/sampleResume.pdf";
                link.download = `${s.name}_Resume.pdf`;
                link.click();
              }}
            >
              <FileDown size={16} /> Download Resume
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
