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
      _id: "cmp1",
      internshipId: "int1",
      name: "du Telecom",
      contact: "Hamad Al Mansoori",
      status: "active",
      industry: "Telecommunications",
      size: "5000+ employees",
      email: "careers@du.ae",
      phone: "+971504567890",
      address: "du HQ, Dubai Media City, Dubai",
      positions: 4,
      about: "du is one of the leading telecom operators in the UAE, providing mobile, broadband and enterprise services.",
      website: "https://www.du.ae"
    },
  
    {
      _id: "cmp2",
      internshipId: "int2",
      name: "ENOC",
      contact: "Mohammed Al Qassimi",
      status: "active",
      industry: "Energy",
      size: "9000+ employees",
      email: "careers@enoc.com",
      phone: "+971503445667",
      address: "ENOC Complex, Dubai",
      positions: 6,
      about: "ENOC Group is a global energy player operating across the oil and gas value chain.",
      website: "https://www.enoc.com"
    },
  
    {
      _id: "cmp3",
      internshipId: "int3",
      name: "EY (Ernst & Young)",
      contact: "Sarah Al Marri",
      status: "active",
      industry: "Consulting",
      size: "300,000+ employees worldwide",
      email: "recruitment@ae.ey.com",
      phone: "+971504567321",
      address: "EY MENA HQ, Dubai International Financial Centre",
      positions: 8,
      about: "EY is a global leader in assurance, consulting, strategy, and tax services.",
      website: "https://www.ey.com"
    },
  
    {
      _id: "cmp4",
      internshipId: "int4",
      name: "Al-Futtaim Group",
      contact: "Fatima Al Shehhi",
      status: "active",
      industry: "Business Group",
      size: "35,000+ employees",
      email: "careers@alfuttaim.com",
      phone: "+971505556667",
      address: "Dubai Festival City, Dubai",
      positions: 10,
      about: "Al-Futtaim is a large business group operating in automotive, retail, real estate, and finance sectors.",
      website: "https://www.alfuttaim.com"
    },
  
    {
      _id: "cmp5",
      internshipId: "int5",
      name: "ADIB Bank",
      contact: "Ahmed Al Hammadi",
      status: "active",
      industry: "Banking",
      size: "2500+ employees",
      email: "careers@adib.com",
      phone: "+971507778899",
      address: "ADIB HQ, Abu Dhabi",
      positions: 7,
      about: "ADIB is a leading Islamic bank offering Shariah-compliant financial solutions in the UAE.",
      website: "https://www.adib.ae"
    },
  
    {
      _id: "cmp6",
      internshipId: "int6",
      name: "Sharjah Municipality",
      contact: "Latifa Al Suwaidi",
      status: "active",
      industry: "Government",
      size: "6000+ employees",
      email: "info@shjmun.gov.ae",
      phone: "+97165330000",
      address: "Sharjah Municipality Building, Sharjah",
      positions: 5,
      about: "Sharjah Municipality oversees public services, infrastructure, and urban planning in the emirate.",
      website: "https://www.shjmun.gov.ae"
    },
  
    {
      _id: "cmp7",
      internshipId: "int7",
      name: "Sajaya Young Ladies of Sharjah",
      contact: "Maryam Al Zarouni",
      status: "active",
      industry: "Youth Development",
      size: "200+ employees",
      email: "info@sajaya.ae",
      phone: "+97165064466",
      address: "Sajaya HQ, Sharjah",
      positions: 3,
      about: "Sajaya is dedicated to empowering young Emirati women through leadership and skill-building programs.",
      website: "https://www.sajaya.ae"
    },
  
    {
      _id: "cmp8",
      internshipId: "int8",
      name: "Sharjah Islamic Bank (SIB)",
      contact: "Omar Al Breiki",
      status: "active",
      industry: "Banking",
      size: "3000+ employees",
      email: "careers@sib.ae",
      phone: "+97165160000",
      address: "Sharjah Islamic Bank HQ, Sharjah",
      positions: 6,
      about: "SIB is a Shariah-compliant bank offering modern banking solutions across the UAE.",
      website: "https://www.sib.ae"
    }
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
  onClick={() =>
    navigate("/apply", {
      state: {
        company: c,
        internshipId: c.internshipId,  // ⭐⭐ THIS IS THE FIX ⭐⭐
      },
    })
  }
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
