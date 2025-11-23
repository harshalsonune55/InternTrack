import React from "react";
import Sidebar from "../components/Sidebar";
import { Upload as UploadIcon } from "lucide-react";

export default function Upload() {
  const uploadBoxes = [
    { label: "Weekly Reports" },
    { label: "Final Internship Report" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-10">
        <h1 className="text-3xl font-bold mb-8">Upload Your Documents</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {uploadBoxes.map((box, index) => (
            <div key={index}>
              <p className="text-lg font-semibold mb-3">{box.label}:</p>

              <label className="cursor-pointer">
                <div className="bg-white border rounded-2xl shadow p-10 flex flex-col items-center justify-center hover:shadow-lg transition">
                  <UploadIcon size={60} className="text-gray-700 mb-5" />
                  <p className="text-gray-700 font-medium">Upload Document Here:</p>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      alert(`${box.label} Uploaded: ${e.target.files[0].name}`)
                    }
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
