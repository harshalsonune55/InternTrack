import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";  // ← GLOBAL SIDEBAR
import { ArrowLeft } from "lucide-react";

export default function PdfViewer() {
  const location = useLocation();
  const navigate = useNavigate();

  const pdfUrl = location.state?.pdfUrl || "/sampleResume.pdf"; // fallback

  return (
    <div className="flex bg-gray-50">
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* MAIN PDF VIEWER SECTION */}
      <main className="flex-1 ml-64 h-screen flex flex-col">
        <div className="p-4 bg-black flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white px-4 py-2 bg-green-600 rounded-lg flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <h2 className="text-white text-lg font-semibold">
            Resume Preview
          </h2>
        </div>

        <iframe
          src={pdfUrl}
          className="w-full flex-1"
          style={{ height: "100%" }}
          title="PDF Viewer"
        ></iframe>
      </main>
    </div>
  );
}
