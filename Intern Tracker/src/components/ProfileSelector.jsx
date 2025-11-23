import React from "react";       
import EmployerProfile from "../Pages/EmployerProfile";
import StudentProfile from "../Pages/StudentProfile";

export default function ProfileSelector() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.userType === "employer") {
    return <EmployerProfile />;
  }

  return <StudentProfile />;
}
