import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  FileText,
  Bell,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // contains userType

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ⭐ STUDENT MENU
  const studentNav = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "Companies", icon: <Building2 size={18} />, path: "/companies" },
    { label: "Upload Documents", icon: <FileText size={18} />, path: "/upload" },
    { label: "Internships", icon: <Briefcase size={18} />, path: "/internships" },
    { label: "My Profile", icon: <FileText size={18} />, path: "/profile" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ];

  // ⭐ EMPLOYER MENU
  const employerNav = [
    { label: "Employer Dashboard", icon: <LayoutDashboard size={18} />, path: "/employer-dashboard" },
    { label: "Employer Portal", icon: <Building2 size={18} />, path: "/employer" },
    // { label: "Advisor Portal", icon: <GraduationCap size={18} />, path: "/advisor" },
    // { label: "Internships", icon: <Briefcase size={18} />, path: "/internships" },
    { label: "My Profile", icon: <FileText size={18} />, path: "/profile" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ];

  // ⭐ ADVISOR MENU (NEW)
  const advisorNav = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "Advisor", icon: <GraduationCap size={18} />, path: "/advisor" },
    { label: "All Students", icon: <Users size={18} />, path: "/students" },
    { label: "Internships", icon: <Briefcase size={18} />, path: "/advisor/requests" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ];

  // ⭐ Select correct menu based on ROLE
  let navItems = studentNav;
  if (user?.userType === "employer") navItems = employerNav;
  if (user?.userType === "advisor") navItems = advisorNav;

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r p-6 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.png" className="w-10 h-10" alt="Logo" />
          <div>
            <h1 className="text-xl font-bold">Intern<span className="text-green-600">Track</span></h1>
            <p className="text-gray-500 text-xs">Placement Management</p>
          </div>
        </div>

        <p className="text-gray-400 text-xs mb-3">Navigation</p>

        <nav className="space-y-2">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                location.pathname === item.path
                  ? "bg-green-50 text-green-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* USER INFO */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50 mb-3">
          <div className="w-9 h-9 bg-green-600 text-white rounded-full flex justify-center items-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-600">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-600 bg-red-100 p-2 rounded-lg"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
