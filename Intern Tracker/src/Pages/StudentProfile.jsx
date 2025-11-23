import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { UserRound, Pencil, X, Upload, ExternalLink } from "lucide-react";

export default function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?._id;

  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const [formData, setFormData] = useState({
    studentId,
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    department: "",
    year: "",
    gpa: "",
    skills: [],
    resumeUrl: ""
  });

  const [skillInput, setSkillInput] = useState("");

  // LOAD PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(
          `https://interntrack-server-sptb.onrender.com/api/student/profile/${studentId}`
        );
        const data = await res.json();

        if (data.success && data.profile) {
          setProfile(data.profile);
          setFormData(data.profile);
          setResumeUploaded(!!data.profile.resumeUrl);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, [studentId]);

  // INPUT HANDLER
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ADD SKILL
  const addSkill = () => {
    if (skillInput.trim() === "") return;

    setFormData({
      ...formData,
      skills: [...(formData.skills || []), skillInput],
    });

    setSkillInput("");
  };

  // SAVE PROFILE
  const saveProfile = async () => {
    try {
      const res = await fetch(
        "https://interntrack-server-sptb.onrender.com/api/student/save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setProfile(formData);
        setEditOpen(false);
      } else {
        alert("Error saving profile");
      }
    } catch (err) {
      alert("Server unreachable");
    }
  };

  // UPLOAD RESUME
  const uploadResume = async () => {
    if (!resumeFile) return alert("Please choose a file");

    const formDataUpload = new FormData();
    formDataUpload.append("resume", resumeFile);
    formDataUpload.append("studentId", studentId);

    try {
      const res = await fetch(
        "https://interntrack-server-sptb.onrender.com/api/student/uploadResume",
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const result = await res.json();

      if (result.success) {
        setResumeUploaded(true);
        setFormData({ ...formData, resumeUrl: result.url });

        setProfile((prev) => ({
          ...prev,
          resumeUrl: result.url,
        }));
      } else {
        alert(result.message || "Upload failed");
      }
    } catch (err) {
      alert("Resume upload failed");
    }
  };

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-10 min-h-screen">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserRound size={32} /> Student Profile
        </h1>
        <p className="text-gray-600 mb-8">Manage your student information</p>

        {/* VIEW MODE */}
        {profile ? (
          <div className="bg-white p-8 rounded-xl border shadow-sm max-w-4xl">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Your Details</h2>
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                <Pencil size={16} /> Edit
              </button>
            </div>

            <Row label="Full Name" value={profile.fullName} />
            <Row label="Email" value={profile.email} />
            <Row label="Phone" value={profile.phone} />
            <Row label="Department" value={profile.department} />
            <Row label="Academic Year" value={profile.year} />
            <Row label="GPA" value={profile.gpa} />
            <Row label="Skills" value={(profile.skills || []).join(", ")} />

            <h2 className="text-xl font-bold mt-6 mb-2">Resume</h2>

            {profile.resumeUrl ? (
              <div>
                <p className="text-green-600 font-semibold">Resume uploaded ✔</p>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  <ExternalLink size={18} /> View Resume
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No resume uploaded</p>
            )}
          </div>
        ) : (
          <StudentForm
            formData={formData}
            handleChange={handleChange}
            saveProfile={saveProfile}
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            addSkill={addSkill}
            uploadResume={uploadResume}
            setResumeFile={setResumeFile}
            resumeFile={resumeFile}
            resumeUploaded={resumeUploaded}
          />
        )}

        {/* EDIT MODAL */}
        {editOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl relative">
              <button
                onClick={() => setEditOpen(false)}
                className="absolute top-4 right-4 text-gray-700"
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <StudentForm
                formData={formData}
                handleChange={handleChange}
                saveProfile={saveProfile}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                addSkill={addSkill}
                uploadResume={uploadResume}
                setResumeFile={setResumeFile}
                resumeFile={resumeFile}
                resumeUploaded={resumeUploaded}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// SIMPLE ROW COMPONENT
function Row({ label, value }) {
  return (
    <p className="mb-2">
      <span className="font-semibold">{label}: </span>
      {value || "Not provided"}
    </p>
  );
}

// FORM COMPONENT
function StudentForm({
  formData,
  handleChange,
  saveProfile,
  skillInput,
  setSkillInput,
  addSkill,
  uploadResume,
  setResumeFile,
  resumeFile,
  resumeUploaded,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input label="Full Name *" name="fullName" value={formData.fullName} onChange={handleChange} />
      <Input label="Email *" name="email" value={formData.email} onChange={handleChange} />
      <Input label="Phone *" name="phone" value={formData.phone} onChange={handleChange} />
      <Input label="Department *" name="department" value={formData.department} onChange={handleChange} />
      <Input label="Academic Year *" name="year" value={formData.year} onChange={handleChange} />
      <Input label="GPA" name="gpa" value={formData.gpa} onChange={handleChange} />

      {/* SKILLS */}
      <div>
        <label className="text-sm font-semibold">Skills</label>
        <div className="flex gap-2 mt-1">
          <input
            className="border p-3 rounded-lg flex-1"
            placeholder="Add a skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button onClick={addSkill} className="bg-green-600 text-white px-4 rounded-lg">
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {(formData.skills || []).map((s, i) => (
            <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* RESUME UPLOAD */}
      <div className="mt-4 col-span-2">
        <label className="text-sm font-semibold">Upload Resume</label>

        <label className="mt-2 flex items-center gap-3 border p-3 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <Upload size={18} className="text-green-600" />
          <span>{resumeFile ? resumeFile.name : "Choose Resume (PDF/DOCX)"}</span>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </label>

        <button
          onClick={uploadResume}
          className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Upload Resume
        </button>

        {resumeUploaded && formData.resumeUrl && (
          <a
            href={formData.resumeUrl}
            target="_blank"
            className="text-blue-600 underline block mt-2"
            rel="noopener noreferrer"
          >
            View Current Resume
          </a>
        )}
      </div>

      <button
        onClick={saveProfile}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold mt-4 col-span-2"
      >
        Save Changes
      </button>
    </div>
  );
}

// INPUT COMPONENT
function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="border p-3 rounded-lg w-full mt-1"
      />
    </div>
  );
}
