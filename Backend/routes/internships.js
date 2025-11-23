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
      advisorId: advisorId || null,  // if no advisor, it becomes null
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

module.exports = router;
