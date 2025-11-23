import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Building2, Pencil, X } from "lucide-react";

export default function EmployerProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const employerId = user?._id;

  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    employerId,
    companyName: "",
    hrName: "",
    hrEmail: user?.email,
    phone: "",
    industry: "",
    companySize: "",
    address: "",
  });

  // ⬇️ Load existing profile when page loads
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`https://interntrack-server-sptb.onrender.com/api/employer/${employerId}`);
        const data = await res.json();
        if (data.success && data.profile) {
          setProfile(data.profile);
          setFormData(data.profile);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, [employerId]);

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // SAVE PROFILE
  const saveProfile = async () => {
    try {
      const res = await fetch("https://interntrack-server-sptb.onrender.com/api/employer/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Profile updated!");
        setProfile(formData); // Update UI
        setEditOpen(false); // Close modal
      } else {
        alert("Could not save");
      }
    } catch (err) {
      console.error(err);
      alert("Server unreachable");
    }
  };

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-10 min-h-screen">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 size={32} /> Employer Profile
        </h1>
        <p className="text-gray-600 mb-8">
          Company information and contact details
        </p>

        {/* If profile exists, show VIEW MODE */}
        {profile ? (
          <div className="bg-white p-8 rounded-xl border shadow-sm max-w-4xl">

            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Company Details</h2>
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                <Pencil size={16} /> Edit
              </button>
            </div>

            <ProfileRow label="Company Name" value={profile.companyName} />
            <ProfileRow label="HR Name" value={profile.hrName} />
            <ProfileRow label="HR Email" value={profile.hrEmail} />
            <ProfileRow label="Phone" value={profile.phone} />
            <ProfileRow label="Industry" value={profile.industry} />
            <ProfileRow label="Company Size" value={profile.companySize} />
            <ProfileRow label="Address" value={profile.address} />
          </div>
        ) : (
          // No profile? Show the form directly
          <>
            <h2 className="text-xl font-bold mb-4">Add Your Company Info</h2>
            <EmployerForm
              formData={formData}
              handleChange={handleChange}
              saveProfile={saveProfile}
            />
          </>
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

              <EmployerForm
                formData={formData}
                handleChange={handleChange}
                saveProfile={saveProfile}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* VIEW COMPONENT */
function ProfileRow({ label, value }) {
  return (
    <p className="mb-2">
      <span className="font-semibold">{label}: </span>
      {value || "Not provided"}
    </p>
  );
}

/* FORM COMPONENT */
function EmployerForm({ formData, handleChange, saveProfile }) {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input label="Company Name *" name="companyName" value={formData.companyName} onChange={handleChange} />
      <Input label="HR Name *" name="hrName" value={formData.hrName} onChange={handleChange} />

      <Input label="HR Email" name="hrEmail" value={formData.hrEmail} onChange={handleChange} />
      <Input label="Phone *" name="phone" value={formData.phone} onChange={handleChange} />

      <Input label="Industry *" name="industry" value={formData.industry} onChange={handleChange} />
      <Input label="Company Size" name="companySize" value={formData.companySize} onChange={handleChange} />
      <Input label="Address" name="address" value={formData.address} onChange={handleChange} />

 
    </div>
         <button
         onClick={saveProfile}
         className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold mt-4"
       >
         Save Changes
       </button>
    </>
  );
}

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
