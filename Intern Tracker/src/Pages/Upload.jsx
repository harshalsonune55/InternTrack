import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Upload as UploadIcon, CheckCircle } from "lucide-react";

export default function Upload() {
  const uploadBoxes = [
    { id: "weekly", label: "Weekly Reports" },
    { id: "final", label: "Final Internship Report" },
  ];

  // Track upload status
  const [uploaded, setUploaded] = useState({
    weekly: false,
    final: false,
  });

  const handleUpload = (id, file) => {
    if (file) {
      setUploaded((prev) => ({ ...prev, [id]: true }));
      alert(`${id} uploaded: ${file.name}`);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-10">
        <h1 className="text-3xl font-bold mb-8">Upload Your Documents</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {uploadBoxes.map((box) => (
            <div key={box.id}>
              <p className="text-lg font-semibold mb-3 flex items-center gap-2">
                {box.label}

                {/* ✔ SHOW GREEN TICK IF UPLOADED */}
                {uploaded[box.id] && (
                  <CheckCircle className="text-green-600" size={22} />
                )}
              </p>

              <label className="cursor-pointer">
                <div className="bg-white border rounded-2xl shadow p-10 flex flex-col items-center justify-center hover:shadow-lg transition">
                  <UploadIcon size={60} className="text-gray-700 mb-5" />

                  {/* Change text if uploaded */}
                  <p className="text-gray-700 font-medium">
                    {uploaded[box.id] ? "Document Uploaded ✔" : "Upload Document Here"}
                  </p>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleUpload(box.id, e.target.files[0])}
                  />
                </div>
              </label>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
