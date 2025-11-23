import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import Companies from "./Pages/Companies";
import Internships from "./Pages/Internships";
import Notifications from "./Pages/Notifications";
// import MyProfile from "./Pages/MyProfile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import EmployerPortal from "./Pages/EmployerPortal";
import AdvisorPortal from "./Pages/AdvisorPortal";
import PdfViewer from "./Pages/PDFViewer";
import Apply from "./Pages/Apply";
import ProfileSelector from "./components/ProfileSelector";
import Upload from "./Pages/Upload";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        }/>

        <Route path="/students" element={
          <ProtectedRoute><Students /></ProtectedRoute>
        }/>

        <Route path="/companies" element={
          <ProtectedRoute><Companies /></ProtectedRoute>
        }/>

        <Route path="/internships" element={
          <ProtectedRoute><Internships /></ProtectedRoute>
        }/>

        <Route path="/notifications" element={
          <ProtectedRoute><Notifications /></ProtectedRoute>
        }/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfileSelector />
    </ProtectedRoute>
  }
/>
        <Route path="/employer" element={
          <ProtectedRoute><EmployerPortal /></ProtectedRoute>
        }/>
        {/* <Route path="/advisor" element={
          <ProtectedRoute><AdvisorPortal /></ProtectedRoute>
        }/> */}
                <Route path="/viewer" element={
          <ProtectedRoute><PdfViewer /></ProtectedRoute>
        }/>
                <Route path="/apply" element={
          <ProtectedRoute><Apply /></ProtectedRoute>
        }/>
        <Route 
  path="/upload"
  element={
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  }
/>
                        <Route path="/advisor" element={
          <ProtectedRoute><AdvisorPortal /></ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
