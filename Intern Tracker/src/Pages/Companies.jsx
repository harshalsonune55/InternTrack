import React, { useState } from "react";
import {
  Building2,
  Users,
  Briefcase,
  GraduationCap,
  FileText,
  Bell,
  Mail,
  Phone,
  Globe,
  Search,
  Filter,
  UsersRound,
} from "lucide-react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Companies() {
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Partners", value: 9, color: "bg-green-600" },
    { label: "Active Partners", value: 9, color: "bg-blue-600" },
    { label: "Available Positions", value: 35, color: "bg-purple-600" },
  ];

  const companies = [
    {
      name: "ADNOC",
      contact: "Mohammed Al Dhaheri",
      status: "active",
      industry: "Energy",
      size: "1000+ employees",
      email: "mohammed@adnoc.ae",
      phone: "+971502345678",
      address: "Abu Dhabi National Oil Company, Abu Dhabi",
      positions: 5,
      about: "Abu Dhabi National Oil Company – leading energy company in the UAE",
      website: "#",
    },
    {
        name: "ADNOC",
        contact: "Mohammed Al Dhaheri",
        status: "active",
        industry: "Energy",
        size: "1000+ employees",
        email: "mohammed@adnoc.ae",
        phone: "+971502345678",
        address: "Abu Dhabi National Oil Company, Abu Dhabi",
        positions: 5,
        about: "Abu Dhabi National Oil Company – leading energy company in the UAE",
        website: "#",
      },
      {
        name: "ADNOC",
        contact: "Mohammed Al Dhaheri",
        status: "active",
        industry: "Energy",
        size: "1000+ employees",
        email: "mohammed@adnoc.ae",
        phone: "+971502345678",
        address: "Abu Dhabi National Oil Company, Abu Dhabi",
        positions: 5,
        about: "Abu Dhabi National Oil Company – leading energy company in the UAE",
        website: "#",
      },
    {
      name: "Etisalat",
      contact: "Fatima Al Shamsi",
      status: "active",
      industry: "Technology",
      size: "1000+ employees",
      email: "fatima@etisalat.ae",
      phone: "+971503456789",
      address: "Emirates Telecommunications Group Company",
      positions: 4,
      about: "Leading telecommunications company in the Middle East",
      website: "#",
    },
    {
      name: "SEWA",
      contact: "Ahmed Al Mansoori",
      status: "active",
      industry: "Government",
      size: "1000+ employees",
      email: "ahmed@sewa.gov.ae",
      phone: "+971501234567",
      address: "Sharjah Electricity, Water and Gas Authority",
      positions: 3,
      about: "Provides essential energy services in Sharjah",
      website: "#",
    },
  ];
  const navigate = useNavigate();


  // ---- FILTER BASED ON SEARCH ----
  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 min-h-screen">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 size={32} />
          Company Management
        </h1>
        <p className="text-gray-600 mb-8">Manage partner companies and internship opportunities</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} text-white p-6 rounded-xl`}>
              <UsersRound size={30} className="mb-2" />
              <h3 className="text-sm">{s.label}</h3>
              <h2 className="text-4xl font-bold mt-2">{s.value}</h2>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex gap-3 mb-6 items-center">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl border flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search companies by name, contact person, or email..."
              className="w-full outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Filter size={18} className="text-gray-500" />
          <select className="border bg-white p-3 rounded-xl text-sm"><option>All Industries</option></select>
          <select className="border bg-white p-3 rounded-xl text-sm"><option>All Sizes</option></select>
          <select className="border bg-white p-3 rounded-xl text-sm"><option>All Status</option></select>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((c, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border shadow-sm space-y-3 h-full flex flex-col">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-gray-600 text-sm">{c.contact}</p>

                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {c.status}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {c.industry}
                  </span>
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{c.size}</span>
                </div>

                <p className="flex items-center gap-2 text-sm"><Mail size={16} /> {c.email}</p>
                <p className="flex items-center gap-2 text-sm"><Phone size={16} /> {c.phone}</p>

                <p className="flex items-center gap-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  <Building2 size={16} /> {c.address}
                </p>

                <p className="flex items-center gap-2 text-sm"><Briefcase size={16} /> {c.positions} available positions</p>

                <a href={c.website} className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                  <Globe size={16} /> Visit Website
                </a>

                <p className="text-sm text-gray-600">{c.about}</p>

                <button
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 mt-auto"
                    onClick={() => navigate("/apply", { state: { company: c } })}
                >
                 Apply to Company
                </button>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No companies found</p>
          )}
        </div>
      </main>
    </div>
  );
}
