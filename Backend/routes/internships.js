const express = require("express");
const router = express.Router();
const InternshipApplication = require("../models/InternshipApplication");

/* ------------------------------------------
   STUDENT APPLIES FOR INTERNSHIP
---------------------------------------------*/
router.post("/apply", async (req, res) => {
  try {
    const { studentId, internshipId, companyId, studentMessage, advisorId } = req.body;

    if (!studentId || !companyId || !internshipId) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const application = await InternshipApplication.create({
      studentId,
      internshipId,
      companyId,
      advisorId: advisorId || null,
      studentMessage: studentMessage || "",
      status: "pending",
    });

    res.json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

  } catch (err) {
    console.error("Apply Error:", err);
    res.status(500).json({
      success: false,
      message: "Error submitting application",
    });
  }
});



/* ------------------------------------------
   FETCH STUDENT APPLICATIONS
---------------------------------------------*/
router.get("/student/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const apps = await InternshipApplication.find({ studentId })
      .populate("companyId", "name")          // FIX
      .populate("internshipId", "title")      // FIX
      .populate("studentId", "name email");   // For display

    res.json({
      success: true,
      applications: apps,
    });

  } catch (err) {
    console.error("Fetch Applications Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



/* ------------------------------------------
   FETCH ALL APPLICATIONS FOR EMPLOYER
---------------------------------------------*/
router.get("/employer/:employerId", async (req, res) => {
  try {
    const apps = await InternshipApplication.find()
      .populate("studentId", "name email")      // Show student info
      .populate("companyId", "name")            // Show company name instead of ObjectId
      .populate("internshipId", "title");       // Show internship title

    res.json({ success: true, applications: apps });

  } catch (err) {
    console.error("Employer Fetch Error:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
