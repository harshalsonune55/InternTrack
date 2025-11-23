import React, { useState } from "react";
import {
  Bell,
  Plus,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Notifications() {
  const [showModal, setShowModal] = useState(false);

  // STATE FOR NOTIFICATIONS
  const [notifications, setNotifications] = useState([
    {
      title: "Application Deadline Reminder",
      message:
        "TechCorp Solutions internship applications are due in 3 days. Make sure all students have submitted their applications.",
      tags: ["warning", "high priority", "advisors", "Action Required"],
      date: "Sep 9, 2025 4:07 AM",
      due: "Jun 10, 2026",
      icon: <AlertTriangle size={26} className="text-gray-500" />,
    },
  ]);

  // FORM DATA
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    due: "",
    audience: "",
    priority: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNotification = {
      title: formData.title,
      message: formData.message,
      due: formData.due,
      date: new Date().toLocaleString(),
      tags: [formData.priority, formData.audience],
      icon: <Bell size={26} className="text-green-600" />,
    };

    setNotifications([newNotification, ...notifications]);
    setShowModal(false);
  };

  // STATS BOXES (UNCHANGED)
  const stats = [
    { label: "Total", value: notifications.length, color: "bg-blue-600" },
    { label: "Unread", value: 0, color: "bg-red-500" },
    { label: "Urgent", value: 1, color: "bg-orange-500" },
    { label: "Action Required", value: 3, color: "bg-amber-600" },
    { label: "This Week", value: 0, color: "bg-purple-600" },
  ];

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell size={32} /> Notification Center
          </h1>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg">
              <CheckCircle size={18} /> Mark All Read
            </button>

            <button
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              onClick={() => setShowModal(true)}
            >
              <Plus size={20} /> Add Notification
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-8">Manage and track all system notifications</p>

        {/* 🟦 STATS BOXES (KEPT AS BEFORE) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} text-white p-6 rounded-xl`}>
              <h3 className="text-sm">{s.label}</h3>
              <h2 className="text-4xl font-bold mt-2">{s.value}</h2>
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 items-center mb-6">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search notifications by title or message..."
              className="w-full outline-none text-sm"
            />
          </div>
          <Filter size={20} className="text-gray-600" />
        </div>

        {/* NOTIFICATION LIST */}
        <div className="space-y-5">
          {notifications.map((n, i) => (
            <div key={i} className="bg-white rounded-xl border p-6 shadow-sm space-y-3">
              <div className="flex gap-3 items-center">
                {n.icon}
                <h3 className="text-lg font-semibold">{n.title}</h3>
              </div>

              <p className="text-gray-700">{n.message}</p>

              {n.tags && (
                <div className="flex gap-2 flex-wrap">
                  {n.tags.map((t, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-900"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-500 text-sm mt-1">
                {n.date} — <span className="text-red-600 font-semibold">Due: {n.due}</span>
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 p-6 rounded-xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Notification</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={26} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Title" name="title" onChange={handleChange} />
              <TextArea label="Message" name="message" onChange={handleChange} />
              <Input label="Priority" name="priority" onChange={handleChange} />
              <Input label="Audience" name="audience" onChange={handleChange} />
              <Input label="Due Date" type="date" name="due" onChange={handleChange} />

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Send Notification
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, name, type = "text", onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input name={name} type={type} onChange={onChange} className="border p-3 rounded-lg w-full mt-1" />
    </div>
  );
}

function TextArea({ label, name, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <textarea rows="3" name={name} onChange={onChange} className="border p-3 rounded-lg w-full mt-1" />
    </div>
  );
}
